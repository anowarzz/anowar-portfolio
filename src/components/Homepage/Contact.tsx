"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import emailjs from "@emailjs/browser";
import { Mail, Phone } from "lucide-react";
import React, { useRef, useState } from "react";
import Swal from "sweetalert2";

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) return;

    setIsLoading(true);

    emailjs
      .sendForm(
        "service_he4n0jr",
        "template_5rl5byi",
        form.current,
        "x9WHQtmknZ9jm0Yi6"
      )
      .then(
        (result) => {
          console.log(result.text);
          Swal.fire({
            title: "Thank You",
            text: "Your message has been submitted, I will get back to you soon.",
            icon: "success",
            confirmButtonColor: "#10b981",
          });
          form.current?.reset();
          setIsLoading(false);
        },
        (error) => {
          console.log(error.text);
          Swal.fire({
            title: "Error",
            text: "Something went wrong. Please try again.",
            icon: "error",
          });
          setIsLoading(false);
        }
      );
  };

  return (
    <section
      id="contact"
      className="relative py-20 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.15), transparent 70%), #000000",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Contact
            </span>{" "}
            Me
          </h2>
          <p className="text-white/80 text-lg mb-12">
            Let&apos;s work together! Send me a message and I&apos;ll get back
            to you as soon as possible.
          </p>

          {/* Contact Information */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <div className="flex-1 flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/20 text-center">
              <div className="flex-shrink-0">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <a
                href="mailto:anowarhosen444@gmail.com"
                className="text-white hover:text-blue-400 transition-colors font-medium"
              >
                anowarhosen444@gmail.com
              </a>
            </div>

            <div className="flex-1 flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 border border-white/20 text-center">
              <div className="flex-shrink-0">
                <Phone className="w-5 h-5 text-blue-400" />
              </div>
              <a
                href="tel:+8801612446397"
                className="text-white hover:text-blue-400 transition-colors font-medium"
              >
                +880 1612 446397
              </a>
            </div>
          </div>

          <form ref={form} onSubmit={sendEmail} className="space-y-6 relative">
            {isLoading && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p className="text-white font-semibold">
                    Sending your message...
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="user_name" className="text-white">
                Your Name
              </Label>
              <Input
                id="user_name"
                name="user_name"
                type="text"
                placeholder="Enter your name"
                required
                disabled={isLoading}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="user_email" className="text-white">
                Your Email
              </Label>
              <Input
                id="user_email"
                name="user_email"
                type="email"
                placeholder="Enter your email"
                required
                disabled={isLoading}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-white">
                Message
              </Label>
              <textarea
                id="message"
                name="message"
                placeholder="Enter your message"
                required
                disabled={isLoading}
                className="flex min-h-[120px] w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-base text-white placeholder:text-white/50 shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-white/50 focus-visible:ring-white/20 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                rows={5}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
