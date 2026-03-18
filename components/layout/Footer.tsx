import Link from "next/link";
import { Linkedin } from "lucide-react";
import siteData from "@/data/site.json";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-xl text-foreground">Trinum</span>
            <span className="text-sm text-muted-foreground">Ingénierie</span>
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            {siteData.tagline}
          </p>
        </div>

        <nav className="flex flex-col gap-2">
          <Link
            href="/projets"
            className="text-sm text-foreground hover:text-primary"
          >
            Projets
          </Link>
          <Link
            href="/contact"
            className="text-sm text-foreground hover:text-primary"
          >
            Contact
          </Link>
          <Link
            href="/mentions-legales"
            className="text-sm text-foreground hover:text-primary"
          >
            Mentions légales
          </Link>
        </nav>

        <div className="flex items-start">
          <a
            href={siteData.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Trinum Ingénierie"
            className="rounded-md p-2 text-foreground transition-colors hover:bg-muted hover:text-primary"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Trinum Ingénierie
      </div>
    </footer>
  );
}
