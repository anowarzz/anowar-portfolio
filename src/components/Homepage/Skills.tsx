import { BoxIcon, HouseIcon, PanelsTopLeftIcon } from "lucide-react";

import {
  allSkills,
  backendSkills,
  databaseSkills,
  frontendSkills,
} from "@/app/data/skills";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SkillCard from "../ui/skill-card";

export default function Skills() {
  return (
    <section className="w-full relative bg-black py-16">
      {/* Arctic Lights Background with Top Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34, 197, 94, 0.25), transparent 70%), #000000",
        }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Technologies I work with to bring ideas to life.
          </p>
        </div>

        <Tabs defaultValue="tab-1" className="w-full">
          <div className="flex justify-center mb-8">
            <ScrollArea className="w-auto">
              <TabsList className="bg-black/50 backdrop-blur-sm border border-white/10 h-auto -space-x-px p-0 shadow-lg rtl:space-x-reverse inline-flex">
                <TabsTrigger
                  value="tab-1"
                  className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400 data-[state=active]:after:bg-green-500 relative overflow-hidden rounded-none border border-white/10 py-3 px-4 md:px-8 lg:px-12 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e text-white hover:bg-white/5 transition-colors"
                >
                  <HouseIcon
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="tab-2"
                  className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400 data-[state=active]:after:bg-green-500 relative overflow-hidden rounded-none border border-white/10 py-3 px-4 md:px-8 lg:px-12 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e text-white hover:bg-white/5 transition-colors"
                >
                  <PanelsTopLeftIcon
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  Frontend
                </TabsTrigger>
                <TabsTrigger
                  value="tab-3"
                  className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400 data-[state=active]:after:bg-green-500 relative overflow-hidden rounded-none border border-white/10 py-3 px-4 md:px-8 lg:px-12 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e text-white hover:bg-white/5 transition-colors"
                >
                  <BoxIcon
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  Backend
                </TabsTrigger>
                <TabsTrigger
                  value="tab-4"
                  className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400 data-[state=active]:after:bg-green-500 relative overflow-hidden rounded-none border border-white/10 py-3 px-4 md:px-8 lg:px-12 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 first:rounded-s last:rounded-e text-white hover:bg-white/5 transition-colors"
                >
                  <BoxIcon
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  Database
                </TabsTrigger>
              </TabsList>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          <TabsContent value="tab-1">
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-6">
              {allSkills.map((skill, index) => (
                <SkillCard key={index} skill={skill} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tab-2">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {frontendSkills.map((skill, index) => (
                <SkillCard key={index} skill={skill} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tab-3">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {backendSkills.map((skill, index) => (
                <SkillCard key={index} skill={skill} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tab-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {databaseSkills.map((skill, index) => (
                <SkillCard key={index} skill={skill} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
