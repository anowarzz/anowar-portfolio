"use client";

import { Button } from "@/components/ui/button";
import { ArrowBigRight, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Project {
  _id: string;
  title: string;
  image: string;
  projectType: string;
  projectSummary: string;
  gitHubLink: string;
  liveSiteLink: string;
  technologies: string[];
  details: string[];
  images: string[];
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="max-w-lg w-full group">
      <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 shadow-xl   transition-all duration-300 ">
        {/* Project Image */}
        <div className="relative overflow-hidden h-48 md:h-64">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Project Type Badge */}
          {/* <div className="absolute top-4 left-4">
            <span className="px-4 py-2 text-sm font-semibold text-white bg-myBlue/90 backdrop-blur-sm rounded-full border border-white/20 shadow-lg">
              {project.projectType}
            </span>
          </div> */}
        </div>

        {/* Content */}
        <div className="p-7">
          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-myBlue transition-colors duration-300">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-300 text-base leading-relaxed mb-5 line-clamp-3">
            {project.projectSummary}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-3 mb-6">
            {project.technologies.slice(0, 4).map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-4 py-2 text-sm bg-gray-800/80 text-gray-200 rounded-lg border border-gray-600/50 font-medium"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-4 py-2 text-sm bg-gray-800/80 text-gray-200 rounded-lg border border-gray-600/50 font-medium">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Link href={`/projects/${project._id}`} className="flex-1">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 py-3 cursor-pointer">
                <ArrowBigRight className="w-5 h-5 mr-2" />
                Details
              </Button>
            </Link>

            <a
              href={project.liveSiteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button
                variant="outline"
                className="w-full border-2 border-blue-500/50 text-blue-300 bg-black/20 hover:bg-blue-500/10 hover:text-blue-200 hover:border-blue-400/80 backdrop-blur-sm transition-all duration-300 py-3 cursor-pointer"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Live
              </Button>
            </a>

            {project.gitHubLink && (
              <a
                href={project.gitHubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="border-2 border-blue-500/50 text-blue-300 bg-black/20 hover:bg-blue-500/10 hover:text-blue-200 hover:border-blue-400/80 backdrop-blur-sm transition-all duration-300 p-3 cursor-pointer"
                >
                  <Github className="w-5 h-5" />
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
