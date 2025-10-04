"use client";

import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBlogs } from "@/services/blogService/getAllBlogPost";
import {
  BookOpen,
  Edit,
  Eye,
  FileText,
  Plus,
  Star,
  Trash2,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const AllBlogs = () => {
  const { blogs, loading, error } = useBlogs();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDeleteBlog = async (blogId: string) => {
    setDeletingId(blogId);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${blogId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete blog: ${response.status}`);
      }

      toast.success("Blog post deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog post");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">All Blog Posts</h1>
            <p className="text-gray-400 mt-2">Loading blog posts...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card
              key={i}
              className="bg-gray-800/50 border-gray-700 animate-pulse"
            >
              <CardHeader>
                <div className="h-48 bg-gray-600 rounded mb-4"></div>
                <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-600 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-20 bg-gray-600 rounded mb-4"></div>
                <div className="flex space-x-2">
                  <div className="h-6 bg-gray-600 rounded w-16"></div>
                  <div className="h-6 bg-gray-600 rounded w-16"></div>
                </div>
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
            <h1 className="text-3xl font-bold text-white">All Blog Posts</h1>
            <p className="text-red-400 mt-2">Error: {error}</p>
          </div>
          <Link href="/admin-control/add-blog-post">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Blog Post
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
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-500" />
            All Blog Posts
          </h1>
          <p className="text-gray-400 mt-2">
            Manage and view all your blog posts ({blogs.length} total)
          </p>
        </div>
        <Link href="/admin-control/add-blog-post">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Blog Post
          </Button>
        </Link>
      </div>

      {blogs.length > 0 ? (
        /* Blog Posts Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Card
              key={blog.id}
              className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors"
            >
              {/* Featured Image */}
              {blog.featuredImage && (
                <div className="relative w-full h-40 rounded-t-lg overflow-hidden">
                  <Image
                    src={blog.featuredImage}
                    alt={blog.title}
                    fill
                    className="object-contain transition-transform hover:scale-105"
                  />
                  {blog.isFeatured && (
                    <Badge
                      variant="default"
                      className="absolute top-2 left-2 bg-yellow-500 text-black"
                    >
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
              )}

              <CardHeader className="pb-3">
                <CardTitle className="text-white text-base line-clamp-2 leading-tight">
                  {blog.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0 pb-4">
                <div className="space-y-2">
                  {/* Category and Stats */}
                  <div className="flex items-center justify-between text-xs">
                    <Badge
                      variant="outline"
                      className="text-blue-400 border-blue-400/30"
                    >
                      {blog.category}
                    </Badge>
                    <div className="flex items-center gap-2 text-gray-400">
                      <span>{blog.views || 0} views</span>
                      <span>•</span>
                      <span>{formatDate(blog.createdAt)}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {blog.tags.slice(0, 2).map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs bg-gray-600/30 text-gray-300 border-none"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {blog.tags.length > 2 && (
                        <span className="text-xs text-gray-400">
                          +{blog.tags.length - 2}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-600/30">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <User className="w-3 h-3" />
                      <span>{blog.authorUsername}</span>
                    </div>

                    <div className="flex space-x-1">
                      <Link href={`/blogs/${blog.slug || blog.id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          title="View Blog Post"
                          className="h-7 w-7 p-0"
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                      </Link>
                      <Link href={`/admin-control/edit-blog/${blog.id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          title="Edit Blog Post"
                          className="h-7 w-7 p-0"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                      </Link>
                      <ConfirmationDialog
                        description={`Are you sure you want to delete "${blog.title}"? This action cannot be undone and will permanently remove the blog post.`}
                        onConfirm={() => handleDeleteBlog(String(blog.id))}
                        isLoading={deletingId === String(blog.id)}
                        title="Delete Blog Post"
                        confirmText="Delete Blog Post"
                        loadingText="Deleting..."
                      >
                        <Button
                          size="sm"
                          variant="destructive"
                          title="Delete Blog Post"
                          className="h-7 w-7 p-0"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </ConfirmationDialog>
                    </div>
                  </div>

                  {blog.isDeleted && (
                    <Badge variant="destructive" className="text-xs w-fit">
                      Deleted
                    </Badge>
                  )}
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
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-white mb-2">
                No Blog Posts Found
              </h3>
              <p className="mb-4 text-gray-300">
                Get started by creating your first blog post to share your
                thoughts and insights.
              </p>
              <Link href="/admin-control/add-blog-post">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Write Your First Blog Post
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AllBlogs;
