import { HeroSection } from "@/components/home/HeroSection";
import { TrustedBy } from "@/components/home/TrustedBy";
import { WhyTrinum } from "@/components/home/WhyTrinum";
import { FullWidthImage } from "@/components/home/FullWidthImage";
import { StepByStep } from "@/components/home/StepByStep";
import { ProjectsPreview } from "@/components/home/ProjectsPreview";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import home from "@/data/home.json";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustedBy />
      <WhyTrinum />
      <FullWidthImage />
      <StepByStep />
      <ProjectsPreview />

      <section className="bg-background px-4 py-20 text-center md:px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-serif text-3xl text-foreground md:text-4xl">
            {home.cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-foreground/90">
            {home.cta.description}
          </p>
          <Button asChild className="mt-8">
            <Link href={home.cta.buttonHref}>{home.cta.buttonLabel}</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
