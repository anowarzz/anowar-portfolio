"use client";

import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/ui/terminal";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";

const HeroSection = () => {
  return (
    <section className="relative flex items-center justify-center pb-8 overflow-hidden">
      {/* Indigo Cosmos Background with Top Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.25), transparent 70%), #000000",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Section */}
            <div className="text-center lg:text-left space-y-8">
              {/* Greeting */}
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                  <span className="text-sm font-medium text-white/80">
                    👋 Hello World, I am
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  Anowar{" "}
                  <span className="inline text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                    Hosen
                  </span>
                </h1>
              </div>

              {/* Typewriter Effect */}
              <div className="space-y-4">
                <p className="text-xl md:text-2xl text-white/80 font-light">
                  I am a{" "}
                  <span className="text-myBlue font-semibold">
                    <TypeAnimation
                      sequence={[
                        "Web Developer",
                        2000,
                        "Full Stack Developer",
                        2000,
                        "MERN Stack Developer",
                        2000,
                      ]}
                      wrapper="span"
                      cursor={true}
                      repeat={Infinity}
                      className="text-[#1A5CDF]"
                    />
                  </span>
                </p>

                <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
                  Passionate about creating beautiful, functional, and
                  user-centered digital experiences. I love turning ideas into
                  reality through clean code and innovative solutions.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-row gap-2 justify-center lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="w-fit bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Link href="/#contact" className="flex items-center gap-2">
                    Get In Touch
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-fit border-2 border-white/50 text-white bg-black/20 hover:bg-white/10 hover:text-blue-600 hover:border-white/80 backdrop-blur-sm transition-all duration-300 group font-semibold"
                >
                  <a
                    href="https://drive.google.com/uc?export=download&id=1L91axf8PlFcvxvf1w7pQkncPGr89xCeB"
                    download="anowar_resume.pdf"
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4 group-hover:translate-y-[-2px] transition-transform" />
                    Download Resume
                  </a>
                </Button>
              </div>
            </div>

            {/* Terminal Section */}
            <div className="relative flex justify-center">
              <div className="relative flex justify-center">
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl blur-3xl scale-110"></div>

                <Terminal className="relative overflow-x-auto border-white/20 bg-black/50 backdrop-blur-sm text-white w-[350px] sm:w-full max-w-md mx-auto">
                  <TypingAnimation>&gt; whoami</TypingAnimation>
                  <AnimatedSpan className="text-green-400">
                    Anowar Hosen
                  </AnimatedSpan>
                  <TypingAnimation>
                    &gt; echo &quot;Welcome to my portfolio&quot;
                  </TypingAnimation>
                  <AnimatedSpan className="text-blue-400">
                    &quot;Welcome to my portfolio&quot;
                  </AnimatedSpan>
                  <TypingAnimation>&gt; cat skills.txt</TypingAnimation>
                  <AnimatedSpan className="text-yellow-400">
                    Web Developer | MERN Stack | Full Stack Developer
                  </AnimatedSpan>
                  <TypingAnimation>&gt; _</TypingAnimation>
                </Terminal>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
