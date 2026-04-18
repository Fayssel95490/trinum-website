"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function AdminShell({
  activeTab,
  onTabChange,
  children,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const tabs = [
    { id: "home", label: "Accueil" },
    { id: "projects", label: "Projets" },
    { id: "contact", label: "Contact & Calendly" },
    { id: "site", label: "Infos société" },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      toast.success("Déconnecté");
      router.push("/admin/login");
      router.refresh();
    } catch {
      toast.error("Erreur lors de la déconnexion");
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-20 border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            <span className="font-serif text-xl text-foreground">
              Trinum
            </span>
            <span className="text-sm text-muted-foreground">
              Administration
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
        <nav className="border-t border-border bg-background">
          <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 md:px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">{children}</main>
    </div>
  );
}
