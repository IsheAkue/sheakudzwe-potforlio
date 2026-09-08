import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Process from "@/components/process/Process";
import WorkGallery from "@/components/work/WorkGallery";
import Services from "@/components/services/Services";
import FAQ from "@/components/faq/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Process />
      <WorkGallery />
      <Services />
      <FAQ />
    </>
  );
}
