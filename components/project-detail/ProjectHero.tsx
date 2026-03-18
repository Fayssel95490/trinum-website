import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface ProjectHeroProps {
  title: string;
  tags: string[];
  heroImage: string;
}

export function ProjectHero({ title, tags, heroImage }: ProjectHeroProps) {
  return (
    <section className="bg-background px-4 pb-12 pt-20 md:px-6">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="heading-xl">{title}</h1>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="border-primary text-primary"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="relative mx-auto mt-10 aspect-video max-w-4xl overflow-hidden rounded-xl">
          <Image
            src={heroImage}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
