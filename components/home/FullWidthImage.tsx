import Image from "next/image";
import home from "@/data/home.json";

export function FullWidthImage() {
  return (
    <section className="relative w-full">
      <div className="relative aspect-[16/9] md:aspect-[21/9]">
        <Image
          src={home.fullWidthImage.src}
          alt={home.fullWidthImage.alt}
          fill
          className="object-cover"
          loading="lazy"
        />
      </div>
    </section>
  );
}
