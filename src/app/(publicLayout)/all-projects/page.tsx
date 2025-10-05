import { ProjectCard } from "@/components/ui/ProjectCard";
import { IProject, IProjectResponse } from "@/types";

const getAllProjectsISR = async (): Promise<IProject[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/projects`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch projects");
    const data: IProjectResponse = await res.json();
    return data.data;
  } catch (err) {
    console.error("Error fetching projects:", err);
    return [];
  }
};

const AllProjects = async () => {
  const projects = await getAllProjectsISR();

  return (
    <section className="min-h-screen w-full relative bg-black py-16">
      {/* Background Gradient */}
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            All <span className="text-blue-400">Projects</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            List of the projects that showcase my skills and expertise in web
            development:
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project) => (
              <div key={project.id} className="flex justify-center">
                <ProjectCard key={project.id} project={project} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-white/70 text-lg">No projects found.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProjects;
