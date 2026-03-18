import Image from "next/image";

export function HeroSection() {
  return (
    <section className="bg-background px-4 pb-16 pt-20 md:px-6 md:pb-24 md:pt-28">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="heading-xl">Vos projets CVSE en toute agilité</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Un bureau d&apos;ingénieurs réactif, cadré et facile à activer — tout
          sans complexification du projet.
        </p>
        <div className="relative mx-auto mt-12 aspect-video max-w-[800px] overflow-hidden rounded-xl">
          <Image
            src="/images/projects/hero-laptop.png"
            alt="Projet CVSE présenté sur un écran laptop"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
