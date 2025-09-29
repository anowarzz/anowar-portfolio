"use client";

import navLogo from "@/assets/images/anowarzz-logo.svg";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Github, Linkedin, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/all-projects", label: "Projects" },
    { href: "/#contact", label: "Contact Me" },
    { href: "/#about", label: "About Me" },
    { href: "/blogs", label: "Blogs" },
  ];

  return (
    <nav className="w-full  backdrop-blur bg-white  border-b z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-18 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl sm:text-2xl font-bold text-foreground hover:text-primary transition-colors"
            >
              <Image src={navLogo} alt="Anowarzz Logo" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://www.linkedin.com/in/anowarzz/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/anowarzz"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-accent"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[350px] p-0">
              <div className="flex flex-col h-full">
                <SheetHeader className="px-6 py-4 border-b">
                  <SheetTitle className="text-left text-xl">
                    <Image src={navLogo} alt="Anowarzz Logo" />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex-1 px-6 py-6">
                  <div className="flex flex-col space-y-6">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors duration-200 py-2 px-3 rounded-md hover:bg-accent/50 -mx-3"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="px-6 py-4 border-t bg-muted/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Connect with me
                    </span>
                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        size="icon"
                        asChild
                        className="hover:scale-105 transition-transform"
                      >
                        <a
                          href="https://www.linkedin.com/in/anowarzz/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Linkedin className="h-5 w-5" />
                          <span className="sr-only">LinkedIn</span>
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        asChild
                        className="hover:scale-105 transition-transform"
                      >
                        <a
                          href="https://github.com/anowarzz"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-5 w-5" />
                          <span className="sr-only">GitHub</span>
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
