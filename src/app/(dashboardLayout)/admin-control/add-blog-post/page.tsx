"use client";

import TiptapEditor from "@/components/TiptapEditor";
import SingleImageUploader from "@/components/singleImageUploader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";

// Zod schema for blog post validation
type BlogPostFormData = {
  title: string;
  content: string;
  excerpt?: string;
  category: string;
  tags: string[];
  isFeatured: boolean;
};

const blogPostSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be under 200 characters"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()),
  isFeatured: z.boolean(),
}) satisfies z.ZodType<BlogPostFormData>;

const AddBlogPost = () => {
  const router = useRouter();

  const form = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      isFeatured: false,
      tags: [],
      category: "",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const [tagInput, setTagInput] = useState("");
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);

  const handleImageChange = (file: File | null) => {
    setFeaturedImageFile(file);
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase();
      const currentTags = watch("tags");
      if (!currentTags.includes(newTag)) {
        setValue("tags", [...currentTags, newTag]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = watch("tags");
    setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove)
    );
  };

  //
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const onSubmit = async (data: BlogPostFormData) => {
    // Show loading toast
    const loadingToast = toast.loading("Creating blog post...");

    try {
      // Prepare form data
      const formDataToSend = new FormData();

      // Append text fields
      formDataToSend.append("title", data.title);
      formDataToSend.append("content", data.content);
      formDataToSend.append("excerpt", data.excerpt || "");
      formDataToSend.append("category", data.category);
      formDataToSend.append("isFeatured", String(data.isFeatured)); // Send as string: "true" or "false"
      formDataToSend.append("tags", JSON.stringify(data.tags));
      formDataToSend.append("authorUsername", "anowarzz");

      // Append image file if exists
      if (featuredImageFile) {
        formDataToSend.append("featuredImage", featuredImageFile);
      }

      // Send data to API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/blogs`,
        {
          method: "POST",
          body: formDataToSend,
          credentials: "include",
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to create blog post");
      }

      // Dismiss loading toast and show success
      toast.dismiss(loadingToast);
      toast.success("Blog post created successfully!", {
        duration: 3000,
        icon: "🎉",
      });

      // Reset form and clear image
      reset();
      setTagInput("");
      setFeaturedImageFile(null);

      // Redirect to all-blogs page after a short delay
      setTimeout(() => {
        router.push("/admin-control/all-blogs");
      }, 1500);
    } catch (error) {
      console.error("Error creating blog post:", error);

      // Dismiss loading toast and show error
      toast.dismiss(loadingToast);
      toast.error(
        error instanceof Error
          ? error.message
          : "Error creating blog post. Please try again.",
        {
          duration: 5000,
        }
      );
    }
  };

  return (
    <>
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#4ade80",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-800">
                Create New Blog Post
              </h1>
            </div>
            <p className="text-gray-600">
              Share your thoughts and insights with your audience
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                Basic Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Blog Title *
                  </label>
                  <input
                    type="text"
                    onKeyDown={handleKeyDown}
                    {...register("title")}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.title ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="Enter an engaging title for your blog post"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    {...register("category")}
                    onKeyDown={handleKeyDown}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                      errors.category ? "border-red-500" : "border-gray-200"
                    }`}
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
                    <p className="text-red-500 text-sm mt-1">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image
                  </label>
                  <SingleImageUploader
                    onImageChange={handleImageChange}
                    initialImageUrl={undefined}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Type a tag and press Enter"
                  />
                  <div className="flex flex-wrap gap-2 mt-3">
                    {watch("tags").map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      {...register("isFeatured")}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Mark as Featured Post
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Excerpt */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <div className="w-2 h-6 bg-gradient-to-b from-green-500 to-blue-500 rounded-full"></div>
                Excerpt
              </h2>

              <textarea
                {...register("excerpt")}
                onKeyDown={handleKeyDown}
                rows={4}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                  errors.excerpt ? "border-red-500" : "border-gray-200"
                }`}
                placeholder="Write a brief summary of your blog post (optional)"
              />
              {errors.excerpt && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.excerpt.message}
                </p>
              )}
            </div>

            {/* Content Editor */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <div className="w-2 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                Content *
              </h2>

              <TiptapEditor
                content={watch("content")}
                onChange={(content) => setValue("content", content)}
                placeholder="Start writing your blog content here..."
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.content.message}
                </p>
              )}
            </div>

            {/* Action Button */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting || !watch("title")}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="hidden sm:inline">Creating Post...</span>
                      <span className="sm:hidden">Creating...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                      <span className="hidden sm:inline">Create Blog Post</span>
                      <span className="sm:hidden">Create Post</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        <style jsx global>{`
          .ql-editor {
            min-height: 300px;
          }
          .ql-toolbar {
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
            border-color: #e5e7eb;
          }
          .ql-container {
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px;
            border-color: #e5e7eb;
          }
        `}</style>
      </div>
    </>
  );
};

export default AddBlogPost;
