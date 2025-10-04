"use client";

import { BlogCard } from "@/components/ui/BlogCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogs } from "@/services/blogService/getAllBlogPost";

const AllBlogs = () => {
  const { blogs, loading, error } = useBlogs();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              All {" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Blogs
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover insights, tutorials, and thoughts on web development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="max-w-lg w-full">
                <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 shadow-xl rounded-lg overflow-hidden">
                  <Skeleton className="h-48 md:h-64 bg-gray-800" />
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-6 bg-gray-800" />
                    <Skeleton className="h-4 bg-gray-800" />
                    <Skeleton className="h-4 bg-gray-800 w-2/3" />
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-16 bg-gray-800 rounded-full" />
                      <Skeleton className="h-6 w-16 bg-gray-800 rounded-full" />
                    </div>
                    <Skeleton className="h-10 bg-gray-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Oops!
          </h1>
          <p className="text-xl text-red-400 mb-4">{error}</p>
          <p className="text-lg text-gray-400">Please try again later.</p>
        </div>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            All Blogs
          </h1>
          <div className="text-xl md:text-2xl text-gray-300 mb-8">
            � No blogs yet
          </div>
          <p className="text-lg text-gray-400 max-w-md mx-auto">
            Exciting blog posts are on their way! Stay tuned for insights,
            tutorials, and thoughts on web development.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            All Blogs
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover insights, tutorials, and thoughts on web development
          </p>
          <div className="mt-6">
            <span className="text-lg text-blue-400 font-semibold">
              {blogs.length} {blogs.length === 1 ? "Post" : "Posts"} Available
            </span>
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
