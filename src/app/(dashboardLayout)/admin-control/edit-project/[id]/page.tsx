"use client";

import MultipleImageUploader from "@/components/multipleImageUploader";
import SingleImageUploader from "@/components/singleImageUploader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSingleProject } from "@/services/projectService/getSingleProjects";
import { IProject } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Plus, Save, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Zod Schema for edit project (image is optional since project already has images)
const editProjectSchema = z.object({
  title: z
    .string()
    .min(1, "Project title is required")
    .max(100, "Title must be less than 100 characters"),
  projectType: z
    .string()
    .min(1, "Project type is required")
    .max(50, "Project type must be less than 50 characters"),
  projectSummary: z
    .string()
    .min(10, "Summary must be at least 10 characters")
    .max(500, "Summary must be less than 500 characters"),
  gitHubLink: z.string().url("Must be a valid GitHub URL"),
  liveSiteLink: z.string().url("Must be a valid live site URL"),
  technologies: z
    .array(z.string().min(1, "Technology name is required"))
    .min(1, "At least one technology is required"),
  details: z
    .array(z.string().min(1, "Detail cannot be empty"))
    .min(1, "At least one project detail is required"),
  image: z.instanceof(File).nullable().optional(),
  images: z.array(z.instanceof(File)).optional(),
});

type EditProjectFormData = z.infer<typeof editProjectSchema>;

const EditProject = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [currentTechnology, setCurrentTechnology] = useState("");
  const [currentDetail, setCurrentDetail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [project, setProject] = useState<IProject | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditProjectFormData>({
    resolver: zodResolver(editProjectSchema),
    defaultValues: {
      title: "",
      projectType: "",
      projectSummary: "",
      gitHubLink: "",
      liveSiteLink: "",
      technologies: [],
      details: [],
      images: undefined,
    },
  });

  // Watch the arrays to display them
  const technologies = watch("technologies");
  const details = watch("details");

  // Fetch project data on mount
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await getSingleProject(params.id);
        const projectData = response.data;
        setProject(projectData);

        // Set form values with existing project data
        reset({
          title: projectData.title,
          projectType: projectData.projectType,
          projectSummary: projectData.projectSummary,
          gitHubLink: projectData.gitHubLink,
          liveSiteLink: projectData.liveSiteLink,
          technologies: projectData.technologies,
          details: projectData.details,
          image: undefined,
          images: undefined,
        });

        // Initialize remaining gallery images
        setRemainingInitialImages(projectData.images || []);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching project:", error);
        toast.error("Failed to load project data");
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [params.id, reset]);

  const addTechnology = () => {
    if (
      currentTechnology.trim() &&
      !technologies.includes(currentTechnology.trim())
    ) {
      setValue("technologies", [...technologies, currentTechnology.trim()]);
      setCurrentTechnology("");
    }
  };

  const removeTechnology = (index: number) => {
    setValue(
      "technologies",
      technologies.filter((_, i) => i !== index)
    );
  };

  const addDetail = () => {
    if (currentDetail.trim()) {
      setValue("details", [...details, currentDetail.trim()]);
      setCurrentDetail("");
    }
  };

  const removeDetail = (index: number) => {
    setValue(
      "details",
      details.filter((_, i) => i !== index)
    );
  };

  const handleMainImageChange = (file: File | null) => {
    setValue("image", file || undefined);
  };

  const [remainingInitialImages, setRemainingInitialImages] = useState<
    string[]
  >([]);

  const handleGalleryChange = (files: File[], remainingImages: string[]) => {
    setValue("images", files);
    setRemainingInitialImages(remainingImages);
  };

  // Submit form to update project
  const onSubmit = async (data: EditProjectFormData) => {
    try {
      // Create FormData for file upload
      const formData = new FormData();

      // Add text fields
      formData.append("title", data.title);
      formData.append("projectType", data.projectType);
      formData.append("projectSummary", data.projectSummary);
      formData.append("gitHubLink", data.gitHubLink);
      formData.append("liveSiteLink", data.liveSiteLink);
      formData.append("technologies", JSON.stringify(data.technologies));
      formData.append("details", JSON.stringify(data.details));

      // Add main image only if a new one is selected
      if (data.image) {
        formData.append("coverImage", data.image);
      }

      // Add gallery images only if new ones are selected
      data.images?.forEach((image) => {
        formData.append("galleryImages", image);
      });

      // Send information about which initial images to keep
      if (remainingInitialImages.length > 0) {
        formData.append(
          "keepGalleryImages",
          JSON.stringify(remainingInitialImages)
        );
      }

      // Update project in the database
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/projects/${params.id}`,
        {
          method: "PATCH",
          body: formData,
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      toast.success("Project updated successfully!");
      console.log("Project updated:", result);

      // Navigate back to all projects page
      router.push("/admin-control/all-projects");
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Project Not Found
          </h2>
          <p className="text-white/70 mb-4">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button
            onClick={() => router.push("/admin-control/all-projects")}
            className="bg-gradient-to-r from-blue-500 to-cyan-500"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Button
              onClick={() => router.push("/admin-control/all-projects")}
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="size-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-white">
              Edit{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Project
              </span>
            </h1>
          </div>
          <p className="text-white/70">
            Update your project information and details
          </p>
        </div>
      </div>

      {/* Current Project Info */}
      <Card className="bg-black/40 border-white/10 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <Image
              src={project.image}
              alt={project.title}
              width={48}
              height={48}
              className="w-12 h-12 rounded-lg object-cover"
            />
            {project.title}
          </CardTitle>
          <CardDescription className="text-white/70">
            Currently editing: {project.projectType} • Created{" "}
            {new Date(project.createdAt).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Form Section */}
      <Card className="bg-black/40 border-white/10 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-white">Project Information</CardTitle>
          <CardDescription className="text-white/70">
            Update the details for your project. Leave image fields empty if you
            don&apos;t want to change them.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">
                  Project Title *
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter project title"
                  {...register("title")}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                />
                {errors.title && (
                  <p className="text-red-400 text-sm">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectType" className="text-white">
                  Project Type *
                </Label>
                <Input
                  id="projectType"
                  type="text"
                  placeholder="e.g., Web Application, Mobile App"
                  {...register("projectType")}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                />
                {errors.projectType && (
                  <p className="text-red-400 text-sm">
                    {errors.projectType.message}
                  </p>
                )}
              </div>
            </div>

            {/* Main Image Upload */}
            <div className="space-y-2">
              <Label className="text-white">Main Project Image</Label>
              <div className="[&_.bg-white\/5]:bg-black/30 [&_.bg-background]:bg-black/30 [&_.border-input]:border-white/20 [&_.text-muted-foreground]:text-white/50 [&_.hover\:bg-accent\/50]:hover:bg-white/10 [&_.data-\[dragging\=true\]\:bg-accent\/50]:data-[dragging=true]:bg-white/10 [&>div]:hover:bg-black/40 [&>div]:hover:border-white/30 [&>div]:transition-all [&>div]:duration-300 [&>div]:hover:shadow-lg [&>div]:hover:shadow-blue-500/10 cursor-pointer">
                <SingleImageUploader
                  onImageChange={handleMainImageChange}
                  initialImageUrl={project.image}
                  initialImageName={project.title}
                />
              </div>
              <p className="text-white/50 text-xs">
                Click the X to remove current image, or upload a new one to
                replace it
              </p>
            </div>

            {/* Project Summary */}
            <div className="space-y-2">
              <Label htmlFor="projectSummary" className="text-white">
                Project Summary *
              </Label>
              <textarea
                id="projectSummary"
                placeholder="Brief description of your project..."
                {...register("projectSummary")}
                rows={4}
                className="w-full bg-white/5 border border-white/20 rounded-md px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              />
              {errors.projectSummary && (
                <p className="text-red-400 text-sm">
                  {errors.projectSummary.message}
                </p>
              )}
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="gitHubLink" className="text-white">
                  GitHub Repository URL *
                </Label>
                <Input
                  id="gitHubLink"
                  type="url"
                  placeholder="https://github.com/username/repo"
                  {...register("gitHubLink")}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                />
                {errors.gitHubLink && (
                  <p className="text-red-400 text-sm">
                    {errors.gitHubLink.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="liveSiteLink" className="text-white">
                  Live Site URL *
                </Label>
                <Input
                  id="liveSiteLink"
                  type="url"
                  placeholder="https://your-project.com"
                  {...register("liveSiteLink")}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                />
                {errors.liveSiteLink && (
                  <p className="text-red-400 text-sm">
                    {errors.liveSiteLink.message}
                  </p>
                )}
              </div>
            </div>

            {/* Technologies */}
            <div className="space-y-4">
              <Label className="text-white">Technologies Used *</Label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Add a technology (e.g., React, Node.js) and press Enter"
                  value={currentTechnology}
                  onChange={(e) => setCurrentTechnology(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addTechnology())
                  }
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                />
                <Button
                  type="button"
                  onClick={addTechnology}
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-cyan-800  hover:bg-white/10 hover:text-white"
                >
                  <Plus className="size-4" />
                </Button>
              </div>
              {errors.technologies && (
                <p className="text-red-400 text-sm">
                  {errors.technologies.message}
                </p>
              )}
              {technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechnology(index)}
                        className="ml-1 hover:bg-red-500/20 rounded-full p-0.5"
                      >
                        <X className="size-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Project Details */}
            <div className="space-y-4">
              <Label className="text-white">Project Details *</Label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Add a project feature and press Enter"
                  value={currentDetail}
                  onChange={(e) => setCurrentDetail(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addDetail())
                  }
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                />
                <Button
                  type="button"
                  onClick={addDetail}
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-cyan-800  hover:bg-white/10 hover:text-white"
                >
                  <Plus className="size-4" />
                </Button>
              </div>
              {errors.details && (
                <p className="text-red-400 text-sm">{errors.details.message}</p>
              )}
              {details.length > 0 && (
                <div className="space-y-2">
                  {details.map((detail, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-md border border-white/10"
                    >
                      <span className="text-white text-sm">{detail}</span>
                      <Button
                        type="button"
                        onClick={() => removeDetail(index)}
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:bg-red-500/20 rounded-full p-1"
                      >
                        <X className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Gallery Images Upload */}
            <div className="space-y-2">
              <Label className="text-white">Gallery Images</Label>
              <div className="[&_.bg-white\/5]:bg-black/30 [&_.bg-background]:bg-black/30 [&_.border-input]:border-white/20 [&_.text-muted-foreground]:text-white/50 [&_.hover\:bg-accent\/50]:hover:bg-white/10 [&_.data-\[dragging\=true\]\:bg-accent\/50]:data-[dragging=true]:bg-white/10 [&>div]:hover:bg-black/40 [&>div]:hover:border-white/30 [&>div]:transition-all [&>div]:duration-300 [&>div]:hover:shadow-lg [&>div]:hover:shadow-blue-500/10 cursor-pointer">
                <MultipleImageUploader
                  onFilesChange={handleGalleryChange}
                  maxFiles={6}
                  maxSizeMB={3}
                  initialImages={project.images || []}
                />
              </div>
              <p className="text-white/50 text-xs">
                You can remove current images using the X button, or add new
                images to the gallery
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin-control/all-projects")}
                className="border-white/20 text-cyan-500 hover:text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 px-8"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating Project...
                  </>
                ) : (
                  <>
                    <Save className="size-4 mr-2" />
                    Update Project
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProject;
