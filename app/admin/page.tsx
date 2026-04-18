"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { HomeTab, type HomeData } from "@/components/admin/tabs/HomeTab";
import {
  ContactTab,
  type ContactData,
} from "@/components/admin/tabs/ContactTab";
import { SiteTab, type SiteData } from "@/components/admin/tabs/SiteTab";
import {
  ProjectsTab,
  type ProjectsData,
} from "@/components/admin/tabs/ProjectsTab";
import { SaveBar } from "@/components/admin/fields";

type TabId = "home" | "projects" | "contact" | "site";

const FILE_MAP: Record<TabId, string> = {
  home: "data/home.json",
  projects: "data/projects.json",
  contact: "data/contact.json",
  site: "data/site.json",
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabId>("home");

  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [projectsData, setProjectsData] = useState<ProjectsData | null>(null);
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [siteData, setSiteData] = useState<SiteData | null>(null);

  const [dirty, setDirty] = useState<Record<TabId, boolean>>({
    home: false,
    projects: false,
    contact: false,
    site: false,
  });
  const [loading, setLoading] = useState<Record<TabId, boolean>>({
    home: true,
    projects: true,
    contact: true,
    site: true,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      const tabs: TabId[] = ["home", "projects", "contact", "site"];
      await Promise.all(
        tabs.map(async (tab) => {
          try {
            const res = await fetch(
              `/api/admin/content?file=${encodeURIComponent(FILE_MAP[tab])}`,
              { cache: "no-store" }
            );
            const data = await res.json();
            if (!res.ok) {
              toast.error(
                `Erreur chargement ${FILE_MAP[tab]} : ${data.error}`
              );
              return;
            }
            switch (tab) {
              case "home":
                setHomeData(data.content);
                break;
              case "projects":
                setProjectsData(data.content);
                break;
              case "contact":
                setContactData(data.content);
                break;
              case "site":
                setSiteData(data.content);
                break;
            }
          } catch {
            toast.error(`Erreur réseau lors du chargement de ${tab}`);
          } finally {
            setLoading((l) => ({ ...l, [tab]: false }));
          }
        })
      );
    };
    loadAll();
  }, []);

  const handleSave = async () => {
    const file = FILE_MAP[activeTab];
    const content =
      activeTab === "home"
        ? homeData
        : activeTab === "projects"
        ? projectsData
        : activeTab === "contact"
        ? contactData
        : siteData;

    if (!content) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file, content }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Échec de l'enregistrement");
        return;
      }
      setDirty((d) => ({ ...d, [activeTab]: false }));
      toast.success(
        "Modifications publiées. Visibles sur le site dans environ 1 minute."
      );
    } catch {
      toast.error("Erreur réseau lors de l'enregistrement");
    } finally {
      setSaving(false);
    }
  };

  const isLoadingCurrent = loading[activeTab];

  return (
    <AdminShell
      activeTab={activeTab}
      onTabChange={(t) => setActiveTab(t as TabId)}
    >
      {isLoadingCurrent ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Chargement du contenu...
        </div>
      ) : (
        <>
          {activeTab === "home" && homeData && (
            <HomeTab
              data={homeData}
              onChange={(next) => {
                setHomeData(next);
                setDirty((d) => ({ ...d, home: true }));
              }}
            />
          )}
          {activeTab === "projects" && projectsData && (
            <ProjectsTab
              data={projectsData}
              onChange={(next) => {
                setProjectsData(next);
                setDirty((d) => ({ ...d, projects: true }));
              }}
            />
          )}
          {activeTab === "contact" && contactData && (
            <ContactTab
              data={contactData}
              onChange={(next) => {
                setContactData(next);
                setDirty((d) => ({ ...d, contact: true }));
              }}
            />
          )}
          {activeTab === "site" && siteData && (
            <SiteTab
              data={siteData}
              onChange={(next) => {
                setSiteData(next);
                setDirty((d) => ({ ...d, site: true }));
              }}
            />
          )}

          <SaveBar
            onSave={handleSave}
            saving={saving}
            dirty={dirty[activeTab]}
          />
        </>
      )}
    </AdminShell>
  );
}
