import Image from "next/image";

export function FullWidthImage() {
  return (
    <section className="relative w-full">
      <div className="relative aspect-[16/9] md:aspect-[21/9]">
        <Image
          src="/images/projects/industrial-fullwidth.png"
          alt="Installation industrielle CVSE — tuyauterie et chaufferie"
          fill
          className="object-cover"
          loading="lazy"
        />
      </div>
    </section>
  );
}
