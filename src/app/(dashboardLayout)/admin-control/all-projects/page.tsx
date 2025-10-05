"use client";

import { ConfirmationDialog } from "@/components/dashboard/ConfirmationDialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProjects } from "@/services/projectService/getAllProjects";
import { Edit, Eye, FolderKanban, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const AllProjects = () => {
  const { projects, loading, error, refetch } = useProjects();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDeleteProject = async (projectId: string) => {
    setDeletingId(projectId);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/projects/${projectId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete project: ${response.status}`);
      }

      toast.success("Project deleted successfully!");

      // Refresh the projects list
      refetch();
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">All Projects</h1>
            <p className="text-gray-400 mt-2">Loading projects...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card
              key={i}
              className="bg-gray-800/50 border-gray-700 animate-pulse"
            >
              <CardHeader>
                <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-600 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-600 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">All Projects</h1>
            <p className="text-red-400 mt-2">Error: {error}</p>
          </div>
          <Link href="/admin-control/add-project">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Project
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">All Projects</h1>
          <p className="text-gray-400 mt-2">
            Manage and view all your projects ({projects.length} total)
          </p>
        </div>
        <Link href="/admin-control/add-project">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Project
          </Button>
        </Link>
      </div>

      {projects.length > 0 ? (
        /* Projects Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-center">
                  {project.title}
                </CardTitle>
                <div className="flex justify-center mb-4">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={200}
                    height={120}
                    className="object-cover rounded-md w-48 h-28"
                  />
                </div>
                <CardDescription className="line-clamp-2 text-center">
                  {project.projectSummary}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Project Type */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded">
                      {project.projectType}
                    </span>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-600/30 text-gray-300 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs text-gray-400">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex space-x-2">
                      <Link href={`/projects/${project.id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          title="View Project"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin-control/edit-project/${project.id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          title="Edit Project"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <ConfirmationDialog
                        description={`Are you sure you want to delete "${project.title}"? This action cannot be undone and will permanently remove the project from your portfolio.`}
                        onConfirm={() =>
                          handleDeleteProject(String(project.id))
                        }
                        isLoading={deletingId === String(project.id)}
                        title="Delete Project"
                        confirmText="Delete Project"
                        loadingText="Deleting..."
                      >
                        <Button
                          size="sm"
                          variant="destructive"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </ConfirmationDialog>
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Empty State */
        <Card className="bg-gray-800/50 border-gray-700 text-center py-12">
          <CardContent>
            <div className="text-gray-400">
              <FolderKanban className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No Projects Found
              </h3>
              <p className="mb-4">
                Get started by creating your first project.
              </p>
              <Link href="/admin-control/add-project">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Project
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AllProjects;
