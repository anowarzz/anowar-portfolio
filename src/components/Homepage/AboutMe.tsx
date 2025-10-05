import anowarCutout from "@/assets/images/cutout.jpg";
import { IAboutMeData } from "@/data/aboutMe";
import Image from "next/image";

interface AboutMeProps {
  aboutData: IAboutMeData;
}

const AboutMe = ({ aboutData }: AboutMeProps) => {
  return (
    <section id="about" className="w-full relative bg-black py-16">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.15), transparent 70%), #000000",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {aboutData.title.split(" ")[0]}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              {aboutData.title.split(" ")[1]}
            </span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {aboutData.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 lg:gap-2 items-center">
          {/* Image Section */}
          <div className="flex items-center justify-center lg:justify-start">
            <div className="relative">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full blur-3xl scale-110"></div>
              <Image
                className="relative object-cover bg-transparent rounded-full w-64 h-64 lg:w-80 lg:h-80 border-4 border-white/20 shadow-2xl"
                src={anowarCutout}
                alt={aboutData.imageAlt}
                width={320}
                height={320}
                data-aos="zoom-in-up"
                data-aos-duration="800"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6" data-aos="zoom-in" data-aos-duration="800">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-sm font-medium text-white/80">
                {aboutData.badgeText}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              {aboutData.whoAmITitle}
            </h3>

            {aboutData.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-white/80 text-base leading-relaxed"
              >
                {paragraph}
              </p>
            ))}

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <h4 className="text-blue-400 font-semibold">
                  {aboutData.details.location.title}
                </h4>
                <p className="text-white/70">
                  {aboutData.details.location.value}
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <h4 className="text-blue-400 font-semibold">
                  {aboutData.details.education.title}
                </h4>
                <p className="text-white/70">
                  {aboutData.details.education.value}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
