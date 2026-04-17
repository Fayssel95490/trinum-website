import Image from "next/image";
import siteData from "@/data/site.json";

export function TrustedBy() {
  return (
    <section className="bg-background px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-6xl">
        <p className="mb-5 text-center text-sm font-bold text-muted-foreground">
          Trusted by :
        </p>
        <div className="grid grid-cols-2 place-items-center gap-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-10">
          {siteData.trustedBy.map((partner) => (
            <div
              key={partner.name}
              className="relative h-14 w-28 opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:h-16 md:w-32"
            >
              <Image
                src={partner.logo}
                alt={`Logo ${partner.name}`}
                fill
                className="object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
