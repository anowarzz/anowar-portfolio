import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import { GraduationCap } from "lucide-react";

const items = [
  {
    id: 1,
    date: "December 31, 2023",
    title: "Bachelor of Business Administration",
    university: "National University of Bangladesh",
    cgpa: "2.98",
    description:
      "Completed my graduation in Business Administration, focusing on foundational business principles, economics, and management practices.",
  },
  {
    id: 2,
    date: "June 04, 2025",
    title: "Masters of Business Administration",
    university: "National University of Bangladesh",
    cgpa: "3.13",
    description:
      "Successfully completed my Masters in Business Administration, gaining advanced knowledge in strategic management, finance, and leadership.",
  },
];

export default function Education() {
  return (
    <section id="education" className="relative py-16 overflow-hidden">
      {/* Dark Gradient Background like Hero */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.15), transparent 70%), #000000",
        }}
      />

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-white mb-4">
            Educational Background
          </h3>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Equipped with business knowledge and skills.
          </p>
        </div>

        <Timeline defaultValue={2} className="max-w-4xl mx-auto">
          {items.map((item) => (
            <TimelineItem
              key={item.id}
              step={item.id}
              className="group-data-[orientation=vertical]/timeline:sm:ms-32 hover:bg-white/5 transition-colors duration-300"
            >
              <TimelineHeader>
                <TimelineSeparator />
                <TimelineDate className="group-data-[orientation=vertical]/timeline:sm:absolute group-data-[orientation=vertical]/timeline:sm:-left-32 group-data-[orientation=vertical]/timeline:sm:w-20 group-data-[orientation=vertical]/timeline:sm:text-right text-white/60">
                  {item.date}
                </TimelineDate>
                <TimelineTitle className="sm:-mt-0.5 text-xl font-semibold text-white">
                  {item.title}
                </TimelineTitle>
                <div className="text-sm text-white/70 mb-2">
                  <p>{item.university}</p>
                  <p>CGPA: {item.cgpa}</p>
                </div>
                <TimelineIndicator className="bg-blue-500 border-blue-500">
                  <GraduationCap className="h-3 w-3 text-white" />
                </TimelineIndicator>
              </TimelineHeader>
              <TimelineContent className="text-white/80 leading-relaxed">
                {item.description}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </section>
  );
}
