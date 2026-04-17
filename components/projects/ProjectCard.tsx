import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  slug: string;
  image: string;
  title: string;
  subtitle: string;
  highlights: string[];
  tags: string[];
  ctaLabel?: string;
}

export function ProjectCard({
  slug,
  image,
  title,
  subtitle,
  highlights,
  ctaLabel = "Voir l\u2019\u00e9tude de cas",
}: ProjectCardProps) {
  const projectHref = `/projets/${slug}`;

  return (
    <Card className="flex flex-col overflow-hidden border-border">
      <Link
        href={projectHref}
        className="relative block aspect-[4/3] overflow-hidden outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          loading="lazy"
        />
      </Link>
      <CardContent className="flex flex-1 flex-col p-5">
        <h3 className="mb-1 text-lg font-bold text-foreground">{title}</h3>
        <p className="mb-4 text-sm text-muted-foreground">{subtitle}</p>
        <ul className="mt-auto space-y-2">
          {highlights.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Button asChild className="w-full">
          <Link href={`/projets/${slug}`}>{ctaLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
