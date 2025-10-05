import ImageGalleryWrapper from "@/components/ImageGalleryWrapper";
import { IProject } from "@/types";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import "./image-gallery-custom.css";

interface ProjectDetailsPageProps {
  params: Promise<{ id: string }>;
}

const ProjectDetailsPage = async ({ params }: ProjectDetailsPageProps) => {
  let project: IProject | null = null;
  let error: string | null = null;

  try {
    const resolvedParams = await params;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/projects/${resolvedParams.id}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error("Project not found");
      } else {
        throw new Error(`Failed to fetch project: ${res.status}`);
      }
    }

    const data = await res.json();
    project = data.data as IProject;
  } catch (err) {
    console.error("Error fetching project:", err);
    error = err instanceof Error ? err.message : "Failed to load project";
  }

  // Handle error state for server components
  if (error || !project) {
    return (
      <section className="min-h-screen w-full relative bg-black pt-8 pb-16">
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.15), transparent 70%), #000000",
          }}
        />
        <div className="relative z-10 container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-400 text-lg mb-4">
                {error || "Project not found"}
              </p>
              <Link
                href="/all-projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const allImages = [project.image, ...project.images];

  return (
    <section className="min-h-screen w-full relative bg-black pt-8 pb-16">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.15), transparent 70%), #000000",
        }}
      />

      <div className="relative z-10 container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/all-projects"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to All Projects
          </Link>
        </div>

        {/* Project Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <span className="text-sm font-medium text-blue-400">
              {project.projectType}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            {project.projectSummary}
          </p>
        </div>

        {/* Project Gallery */}
        <div className="mb-12">
          <div className="max-w-4xl mx-auto">
            <ImageGalleryWrapper
              images={allImages}
              projectTitle={project.title}
            />
          </div>
        </div>

        {/* Technologies Used */}
        <div className="max-w-6xl mx-auto mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">
            Technologies Used
          </h3>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-lg text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Project Details */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-6">
            Project Details
          </h3>
          <div className="space-y-4">
            {project.details.map((detail, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                <p className="text-white/80 leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          {project.liveSiteLink && (
            <a
              href={project.liveSiteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ExternalLink className="w-5 h-5" />
              View Live Site
            </a>
          )}

          {project.gitHubLink && (
            <a
              href={project.gitHubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-blue-500/50 text-blue-300 bg-black/20 hover:bg-blue-500/10 hover:text-blue-200 hover:border-blue-400/80 backdrop-blur-sm rounded-lg transition-all duration-300"
            >
              <Github className="w-5 h-5" />
              View Source Code
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectDetailsPage;
