import AboutMe from "@/components/Homepage/AboutMe";
import Contact from "@/components/Homepage/Contact";
import Education from "@/components/Homepage/Education";
import HeroSection from "@/components/Homepage/HeroSection";
import MyProjects from "@/components/Homepage/MyProjects";
import Skills from "@/components/Homepage/Skills";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Education />
      <Skills />
      <MyProjects />
      <AboutMe />
      <Contact />
    </main>
  );
}
