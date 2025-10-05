"use client";

import TiptapEditor from "@/components/dashboard/TiptapEditor";
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
import { Skeleton } from "@/components/ui/skeleton";
import { IBlogPost } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Plus, Save, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Zod Schema for edit blog (image is optional since blog already has image)
const editBlogSchema = z.object({
  title: z
    .string()
    .min(1, "Blog title is required")
    .max(200, "Title must be less than 200 characters"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().optional(),
  category: z
    .string()
    .min(1, "Category is required")
    .max(50, "Category must be less than 50 characters"),
  tags: z
    .array(z.string().min(1, "Tag name is required"))
    .min(1, "At least one tag is required"),
  isFeatured: z.boolean(),
  featuredImage: z.instanceof(File).nullable().optional(),
});

type EditBlogFormData = z.infer<typeof editBlogSchema>;

const EditBlog = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const [currentTag, setCurrentTag] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [blog, setBlog] = useState<IBlogPost | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditBlogFormData>({
    resolver: zodResolver(editBlogSchema),
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      category: "",
      tags: [],
      isFeatured: false,
      featuredImage: undefined,
    },
  });

  const tags = watch("tags");

  //
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  // Fetch blog data on mount
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const resolvedParams = await params;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/id/${resolvedParams.id}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch blog: ${response.status}`);
        }

        const blogResponse = await response.json();
        const blogData = blogResponse.data;
        setBlog(blogData);

        // Set form values with existing blog data
        reset({
          title: blogData.title,
          content: blogData.content,
          excerpt: blogData.excerpt || "",
          category: blogData.category,
          tags: blogData.tags,
          isFeatured: blogData.isFeatured,
          featuredImage: undefined,
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching blog:", error);
        toast.error("Failed to load blog data");
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [params, reset]);

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setValue("tags", [...tags, currentTag.trim().toLowerCase()]);
      setCurrentTag("");
    }
  };

  const removeTag = (index: number) => {
    setValue(
      "tags",
      tags.filter((_, i) => i !== index)
    );
  };

  const handleFeaturedImageChange = (file: File | null) => {
    setValue("featuredImage", file || undefined);
  };

  const handleContentChange = (content: string) => {
    setValue("content", content);
  };

  // Submit form to update blog
  const onSubmit = async (data: EditBlogFormData) => {
    try {
      // Create FormData for file upload
      const formData = new FormData();

      // Add text fields
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("excerpt", data.excerpt || "");
      formData.append("category", data.category);
      formData.append("tags", JSON.stringify(data.tags));
      formData.append("isFeatured", String(data.isFeatured));

      // Add featured image only if a new one is selected
      if (data.featuredImage) {
        formData.append("featuredImage", data.featuredImage);
      }

      // Update blog in the database
      const resolvedParams = await params;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/id/${resolvedParams.id}`,
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

      toast.success("Blog post updated successfully!");
      console.log("Blog updated:", result);

      // Navigate back to all blogs page
      router.push("/admin-control/all-blogs");
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog post");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 p-2 sm:p-4 md:p-6 max-w-4xl w-full mx-auto">
        {/* Header Skeleton */}
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-40" />
        </div>
        <Skeleton className="h-5 w-1/2 mb-6" />

        {/* Blog Info Card Skeleton */}
        <div className="mb-6">
          <Skeleton className="h-20 w-full rounded-lg" />
        </div>

        {/* Form Card Skeleton */}
        <div className="bg-black/40 border-white/10 backdrop-blur rounded-lg p-6 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
          {/* Category & Featured */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-6 w-32" />
            </div>
          </div>
          {/* Image Upload */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-32 w-full" />
          </div>
          {/* Excerpt */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-20 w-full" />
          </div>
          {/* Tags */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-10 w-full" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
          {/* Content Editor */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-40 w-full" />
          </div>
          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Blog Post Not Found
          </h2>
          <p className="text-white/70 mb-4">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button
            onClick={() => router.push("/admin-control/all-blogs")}
            className="bg-gradient-to-r from-blue-500 to-cyan-500"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back to Blogs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-2 sm:p-4 md:p-6 max-w-4xl w-full mx-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Button
              onClick={() => router.push("/admin-control/all-blogs")}
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
                Blog Post
              </span>
            </h1>
          </div>
          <p className="text-white/70">
            Update your blog post information and content
          </p>
        </div>
      </div>

      {/* Current Blog Info */}
      <Card className="bg-black/40 border-white/10 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <Image
              src={blog.featuredImage}
              alt={blog.title}
              width={48}
              height={48}
              className="w-12 h-12 rounded-lg object-cover"
            />
            {blog.title}
          </CardTitle>
          <CardDescription className="text-white/70">
            Currently editing: {blog.category} • Created{" "}
            {new Date(blog.createdAt).toLocaleDateString()} • Views:{" "}
            {blog.views}
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Form Section */}
      <Card className="bg-black/40 border-white/10 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-white">Blog Post Information</CardTitle>
          <CardDescription className="text-white/70">
            Update the details for your blog post. Leave image field empty if
            you don&apos;t want to change the featured image.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="title" className="text-white">
                  Blog Title *
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter blog title"
                  {...register("title")}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                />
                {errors.title && (
                  <p className="text-red-400 text-sm">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-white">
                  Category *
                </Label>
                <select
                  id="category"
                  {...register("category")}
                  className="w-full  border border-white/20 text-black bg-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  <option value="technology">Technology</option>
                  <option value="web-development">Web Development</option>
                  <option value="programming">Programming</option>
                  <option value="tutorial">Tutorial</option>
                  <option value="personal">Personal</option>
                  <option value="react">React</option>
                  <option value="nextjs">Next.js</option>
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                </select>
                {errors.category && (
                  <p className="text-red-400 text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-white flex items-center gap-2">
                  <input
                    type="checkbox"
                    {...register("isFeatured")}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  Mark as Featured Post
                </Label>
              </div>
            </div>

            {/* Featured Image Upload */}
            <div className="space-y-2">
              <Label className="text-white">Featured Image</Label>
              <div className="[&_.bg-white\/5]:bg-black/30 [&_.bg-background]:bg-black/30 [&_.border-input]:border-white/20 [&_.text-muted-foreground]:text-white/50 [&_.hover\:bg-accent\/50]:hover:bg-white/10 [&_.data-\[dragging\=true\]\:bg-accent\/50]:data-[dragging=true]:bg-white/10 [&>div]:hover:bg-black/40 [&>div]:hover:border-white/30 [&>div]:transition-all [&>div]:duration-300 [&>div]:hover:shadow-lg [&>div]:hover:shadow-blue-500/10 cursor-pointer">
                <SingleImageUploader
                  onImageChange={handleFeaturedImageChange}
                  initialImageUrl={blog.featuredImage}
                  initialImageName={blog.title}
                />
              </div>
              <p className="text-white/50 text-xs">
                Click the X to remove current image, or upload a new one to
                replace it
              </p>
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <Label htmlFor="excerpt" className="text-white">
                Excerpt
              </Label>
              <textarea
                id="excerpt"
                placeholder="Brief summary of your blog post..."
                {...register("excerpt")}
                rows={4}
                className="w-full bg-white/5 border border-white/20 rounded-md px-3 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              />
              {errors.excerpt && (
                <p className="text-red-400 text-sm">{errors.excerpt.message}</p>
              )}
            </div>

            {/* Tags */}
            <div className="space-y-4">
              <Label className="text-white">Tags *</Label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Add a tag (e.g., React, JavaScript) and press Enter"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addTag())
                  }
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                />
                <Button
                  type="button"
                  onClick={addTag}
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-cyan-800 hover:bg-white/10 hover:text-white"
                >
                  <Plus className="size-4" />
                </Button>
              </div>
              {errors.tags && (
                <p className="text-red-400 text-sm">{errors.tags.message}</p>
              )}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="ml-1 hover:bg-red-500/20 rounded-full p-0.5"
                      >
                        <X className="size-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Content Editor */}
            <div className="space-y-2">
              <Label className="text-white">Content *</Label>
              <div className="rounded-xl border border-white/20 overflow-hidden bg-white/5">
                <TiptapEditor
                  content={watch("content")}
                  onChange={handleContentChange}
                  placeholder="Start editing your blog content here..."
                />
              </div>
              {errors.content && (
                <p className="text-red-400 text-sm">{errors.content.message}</p>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin-control/all-blogs")}
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
                    Updating Blog...
                  </>
                ) : (
                  <>
                    <Save className="size-4 mr-2" />
                    Update Blog Post
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Custom styles for TiptapEditor */}
      <style jsx global>{`
        .tiptap {
          min-height: 300px;
          background: transparent !important;
          border: none !important;
          padding: 16px !important;
          color: #ffffff !important;
          outline: none !important;
        }

        .tiptap:focus {
          outline: none !important;
          box-shadow: none !important;
        }

        .tiptap p {
          color: #ffffff;
          margin: 0.5rem 0;
        }

        .tiptap h1,
        .tiptap h2,
        .tiptap h3 {
          color: #ffffff;
          margin: 1rem 0 0.5rem 0;
        }

        .tiptap ul,
        .tiptap ol {
          padding-left: 1.5rem;
          color: #ffffff;
        }

        .tiptap li {
          color: #ffffff;
        }

        .tiptap strong {
          color: #ffffff;
        }

        .tiptap em {
          color: #ffffff;
        }

        .tiptap code {
          background: rgba(255, 255, 255, 0.1);
          color: #60a5fa;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
        }

        .tiptap pre {
          background: rgba(0, 0, 0, 0.3);
          color: #ffffff;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
        }

        .tiptap blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1rem;
          margin: 1rem 0;
          color: #d1d5db;
          font-style: italic;
        }

        .tiptap a {
          color: #60a5fa;
          text-decoration: underline;
        }

        .tiptap img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }

        .tiptap .is-empty::before {
          content: attr(data-placeholder);
          color: rgba(255, 255, 255, 0.5);
          pointer-events: none;
          height: 0;
          float: left;
        }
      `}</style>
    </div>
  );
};

export default EditBlog;
