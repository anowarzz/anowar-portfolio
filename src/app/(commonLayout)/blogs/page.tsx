"use client";

import { BlogFiltersComponent } from "@/components/BlogFilters";
import { Pagination } from "@/components/Pagination";
import { BlogCard } from "@/components/ui/BlogCard";
import { Skeleton } from "@/components/ui/skeleton";
import { BlogFilters, useBlogs } from "@/services/blogService/getAllBlogPost";
import { useState } from "react";

const AllBlogs = () => {
  const [filters, setFilters] = useState<BlogFilters>({ page: 1, limit: 9 });
  const { blogs, loading, error, pagination } = useBlogs(filters);

  const handleFiltersChange = (newFilters: BlogFilters) => {
    setFilters({ ...newFilters, limit: 9 });
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
  };

  if (loading) {
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
          <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 mb-8">
            <Skeleton className="h-6 w-24 bg-gray-800 mb-4" />
            <div className="space-y-4">
              <div>
                <Skeleton className="h-4 w-16 bg-gray-800 mb-2" />
                <Skeleton className="h-10 bg-gray-800" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="max-w-lg w-full">
                <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 shadow-xl rounded-lg overflow-hidden">
                  <Skeleton className="h-48 md:h-64 bg-gray-800" />
                  <div className="p-6 space-y-4">
                    <Skeleton className="h-6 bg-gray-800" />
                    <Skeleton className="h-4 bg-gray-800" />
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              All Blogs
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover insights, tutorials, and thoughts on web development
            </p>
          </div>
          <BlogFiltersComponent
            onFiltersChange={handleFiltersChange}
            initialFilters={filters}
          />
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Oops!
              </h1>
              <p className="text-xl text-red-400 mb-4">{error}</p>
              <p className="text-lg text-gray-400">Please try again later.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    const hasActiveFilters = filters.search || filters.isFeatured !== undefined;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              All Blogs
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover insights, tutorials, and thoughts on web development
            </p>
          </div>
          <BlogFiltersComponent
            onFiltersChange={handleFiltersChange}
            initialFilters={filters}
          />
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {hasActiveFilters
                  ? "No blogs match your filters"
                  : "No blogs yet"}
              </h2>
              <p className="text-lg text-gray-400 max-w-md mx-auto">
                {hasActiveFilters
                  ? "Try adjusting your search criteria or clear the filters to see all available blogs."
                  : "Exciting blog posts are on their way! Stay tuned for insights, tutorials, and thoughts on web development."}
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
            All Blogs
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
        <BlogFiltersComponent
          onFiltersChange={handleFiltersChange}
          initialFilters={filters}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
        {pagination && pagination.totalPages > 1 && (
          <Pagination pagination={pagination} onPageChange={handlePageChange} />
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
