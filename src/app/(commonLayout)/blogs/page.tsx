import BlogsClientWrapper from "@/components/BlogsClientWrapper";
import { IBlogPost, IPagination } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Blogs | Anowar's Portfolio",
  description: "Discover insights, tutorials, and thoughts on web development",
};

const AllBlogs = async () => {
  let blogs: IBlogPost[] = [];
  let pagination: IPagination | undefined = undefined;
  let error: string | null = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs/all`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch blogs: ${res.status}`);
    }

    const data = await res.json();
    blogs = data.data as IBlogPost[];
    pagination = data.pagination;
  } catch (err) {
    console.error("Error fetching blogs:", err);
    error = err instanceof Error ? err.message : "Failed to load blogs";
  }

  // Handle error state for server components
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              All{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Blogs
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover insights, tutorials, and thoughts on web development
            </p>
          </div>
          <div className="flex items-center justify-center py-20">
            <div className="text-center bg-red-500/10 border border-red-500/20 rounded-lg p-8 max-w-md mx-auto">
              <p className="text-red-400 text-lg mb-4">{error}</p>
              <p className="text-white/60 text-sm">
                Please refresh the page or try again later
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            All{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Blogs
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover insights, tutorials, and thoughts on web development
          </p>
          {pagination && (
            <div className="mt-6">
              <span className="text-lg text-blue-400 font-semibold">
                {pagination.total} {pagination.total === 1 ? "Post" : "Posts"}{" "}
                Available
              </span>
            </div>
          )}
        </div>

        <BlogsClientWrapper
          initialBlogs={blogs}
          initialPagination={pagination}
        />
      </div>
    </div>
  );
};

export default AllBlogs;
