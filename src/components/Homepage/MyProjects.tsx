import { ProjectCard } from "@/components/ui/ProjectCard";
import { IProject } from "@/types";
import { ArrowBigRight } from "lucide-react";
import Link from "next/link";

const MyProjects = async () => {
  let projects: IProject[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/projects`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch projects: ${res.status}`);
    }

    const data = await res.json();
    projects = data.data as IProject[];
  } catch (err) {
    console.error("Error fetching projects:", err);
    error = err instanceof Error ? err.message : "Failed to load projects";
  }

  // Handle error state for server components
  if (error) {
    return (
      <section className="w-full relative bg-black py-16">
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.15), transparent 70%), #000000",
          }}
        />
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              My{"  "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Projects
              </span>{" "}
            </h2>
          </div>
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-center bg-red-500/10 border border-red-500/20 rounded-lg p-8 max-w-md">
              <p className="text-red-400 text-lg mb-4">{error}</p>
              <p className="text-white/60 text-sm">
                Please refresh the page or try again later
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className=" w-full relative bg-black py-16">
      {/* Blue Gradient Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.15), transparent 70%), #000000",
        }}
      />

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl  font-bold text-white mb-6">
            My{"  "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Projects
            </span>{" "}
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Some Of My Notable Projects Include:
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects?.slice(0, 4).map((project, index) => (
            <div
              key={project.id}
              className="flex justify-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        {projects.length > 0 && (
          <div className="text-center mt-12">
            <Link
              href="/all-projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-myBlue to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View All Projects
              <ArrowBigRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyProjects;
