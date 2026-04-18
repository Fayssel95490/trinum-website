import Image from "next/image";
import home from "@/data/home.json";

export function HeroSection() {
  return (
    <section className="bg-background px-4 pb-16 pt-20 md:px-6 md:pb-24 md:pt-28">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="heading-xl">{home.hero.title}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          {home.hero.subtitle}
        </p>
        <div className="relative mx-auto mt-12 aspect-video max-w-[800px] overflow-hidden rounded-xl">
          <Image
            src={home.hero.image}
            alt={home.hero.imageAlt}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
