"use client";

import { Button } from "@/components/ui/button";
import { IBlogPost } from "@/types";
import { Calendar, Clock, Eye, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  blog: IBlogPost;
}

export function BlogCard({ blog }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-lg w-full group">
      <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 shadow-xl rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-blue-500/30">
        {/* Featured Image */}
        <div className="relative overflow-hidden h-48 md:h-64">
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Featured Badge */}
          {blog.isFeatured && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 backdrop-blur-sm rounded-full border border-white/20 shadow-lg">
                Featured
              </span>
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 text-xs font-semibold text-white bg-gray-800/90 backdrop-blur-sm rounded-full border border-gray-600/50">
              {blog.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300 overflow-hidden">
            <span className="block truncate">
              {blog.title.length > 60
                ? `${blog.title.substring(0, 60)}...`
                : blog.title}
            </span>
          </h3>

          {/* Excerpt */}
          <p className="text-gray-300 text-sm leading-relaxed mb-4 overflow-hidden">
            <span className="block">
              {blog.excerpt.length > 120
                ? `${blog.excerpt.substring(0, 120)}...`
                : blog.excerpt}
            </span>
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs bg-gray-800/80 text-gray-300 rounded-full border border-gray-600/50 font-medium"
              >
                #{tag}
              </span>
            ))}
            {blog.tags.length > 3 && (
              <span className="px-3 py-1 text-xs bg-gray-800/80 text-gray-300 rounded-full border border-gray-600/50 font-medium">
                +{blog.tags.length - 3}
              </span>
            )}
          </div>

          {/* Meta Information */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{blog.authorUsername}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(blog.createdAt)}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>{blog.views} views</span>
            </div>
          </div>

          {/* Read More Button */}
          <Link href={`/blogs/${blog.slug}`} className="block">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 py-2.5">
              <Clock className="w-4 h-4 mr-2" />
              Read More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
