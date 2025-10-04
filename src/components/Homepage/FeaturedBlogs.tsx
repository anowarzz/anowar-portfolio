"use client";
import { BlogCard } from "@/components/ui/BlogCard";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useBlogs } from "@/services/blogService/getAllBlogPost";
import { ArrowBigRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const FeaturedBlogs = () => {
  const { blogs, loading, error } = useBlogs();

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading Blogs" />;
  }

  if (error) {
    return (
      <section className="min-h-screen w-full relative bg-black py-16">
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
              <p className="text-red-400 text-lg mb-4">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-myBlue text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full relative bg-black py-16">
      {/* Blue Gradient Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.15), transparent 70%), #000000",
        }}
      />

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Featured{"  "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Blogs
            </span>{" "}
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Discover my latest thoughts, insights, and technical articles
          </p>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {blogs?.slice(0, 4).map((blog, index) => (
            <div
              key={blog.id}
              className="flex justify-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>

        {/* View All Blogs Button */}
        {blogs.length > 0 && (
          <div className="text-center mt-12">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-myBlue to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View All Blogs
              <ArrowBigRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedBlogs;
