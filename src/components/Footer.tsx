import { Facebook, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative py-12 overflow-hidden">
      {/* Background with gradient similar to HeroSection */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.15), transparent 70%), #000000",
        }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Brand/Logo Section */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">
               Md Anowar{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Hosen
                </span>
              </h3>
              <p className="text-white/70 text-sm">
                Full Stack Web Developer
              </p>
            </div>

            {/* Navigation Links */}
            <div className="text-center">
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <div className="flex flex-col space-y-2">
                <Link
                  href="/"
                  className="text-white/70 hover:text-white transition-colors duration-200"
                >
                  Home
                </Link>
                <Link
                  href="/all-projects"
                  className="text-white/70 hover:text-white transition-colors duration-200"
                >
                  Projects
                </Link>
                <Link
                  href="/#contact"
                  className="text-white/70 hover:text-white transition-colors duration-200"
                >
                  Contact
                </Link>
                <Link
                  href="/#about"
                  className="text-white/70 hover:text-white transition-colors duration-200"
                >
                  About
                </Link>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="text-center md:text-right">
              <h4 className="text-white font-semibold mb-4">Connect With Me</h4>
              <div className="flex justify-center md:justify-end space-x-4">
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.linkedin.com/in/anowarzz/"
                  className="text-white/70 hover:text-blue-400 transition-colors duration-200 text-xl"
                  aria-label="LinkedIn"
                >
                  <Linkedin />
                </a>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://github.com/anowarzz"
                  className="text-white/70 hover:text-white transition-colors duration-200 text-xl"
                  aria-label="GitHub"
                >
                  <Github />
                </a>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://www.facebook.com/anowarzz/"
                  className="text-white/70 hover:text-blue-600 transition-colors duration-200 text-xl"
                  aria-label="Facebook"
                >
                  <Facebook />
                </a>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href="https://twitter.com/anowarzz_"
                  className="text-white/70 hover:text-blue-400 transition-colors duration-200 text-xl"
                  aria-label="Twitter"
                >
                  <Twitter />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-white/60 text-sm">
              © {year} Anowar Hosen. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
