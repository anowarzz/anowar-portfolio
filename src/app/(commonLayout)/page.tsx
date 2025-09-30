import AboutMe from "@/components/Homepage/AboutMe";
import Education from "@/components/Homepage/Education";
import HeroSection from "@/components/Homepage/HeroSection";
import Skills from "@/components/Homepage/Skills";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Education />
      <Skills />
      <AboutMe />
    </main>
  );
}
