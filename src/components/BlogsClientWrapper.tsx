"use client";

import { BlogFiltersComponent } from "@/components/BlogFilters";
import { Pagination } from "@/components/Pagination";
import { BlogCard } from "@/components/ui/BlogCard";
import { Skeleton } from "@/components/ui/skeleton";
import { BlogFilters, useBlogs } from "@/services/blogService/getAllBlogPost";
import { IBlogPost, IPagination } from "@/types";
import { useState } from "react";

interface BlogsClientWrapperProps {
  initialBlogs: IBlogPost[];
  initialPagination: IPagination | undefined;
}

const BlogsClientWrapper = ({
  initialBlogs,
  initialPagination,
}: BlogsClientWrapperProps) => {
  const [filters, setFilters] = useState<BlogFilters>({ page: 1, limit: 9 });
  const { blogs, loading, error, pagination } = useBlogs(filters);

  // Use initial ISR data for first render, then switch to filtered data
  const hasActiveFilters =
    filters.page !== 1 || filters.search || filters.isFeatured !== undefined;
  const displayBlogs = hasActiveFilters
    ? blogs
    : loading
    ? initialBlogs
    : blogs || initialBlogs;
  const displayPagination = hasActiveFilters
    ? pagination
    : loading
    ? initialPagination
    : pagination || initialPagination;

  const handleFiltersChange = (newFilters: BlogFilters) => {
    setFilters({ ...newFilters, limit: 9 });
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
  };

  if (loading && hasActiveFilters) {
    return (
      <>
        <BlogFiltersComponent
          onFiltersChange={handleFiltersChange}
          initialFilters={filters}
        />
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
      </>
    );
  }

  if (error) {
    return (
      <>
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
      </>
    );
  }

  if (!displayBlogs || displayBlogs.length === 0) {
    const hasFilters = filters.search || filters.isFeatured !== undefined;

    return (
      <>
        <BlogFiltersComponent
          onFiltersChange={handleFiltersChange}
          initialFilters={filters}
        />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {hasFilters ? "No blogs match your filters" : "No blogs yet"}
            </h2>
            <p className="text-lg text-gray-400 max-w-md mx-auto">
              {hasFilters
                ? "Try adjusting your search criteria or clear the filters to see all available blogs."
                : "Exciting blog posts are on their way! Stay tuned for insights, tutorials, and thoughts on web development."}
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <BlogFiltersComponent
        onFiltersChange={handleFiltersChange}
        initialFilters={filters}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {displayBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
      {displayPagination && displayPagination.totalPages > 1 && (
        <Pagination
          pagination={displayPagination}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default BlogsClientWrapper;
