import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit, Eye, FileText, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

const AllBlogs = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">All Blogs</h1>
          <p className="text-gray-400 mt-2">
            Manage and view all your blog posts
          </p>
        </div>
        <Link href="/admin-control/add-blog-post">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Blog
          </Button>
        </Link>
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sample Blog Card - Replace with actual data */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Sample Blog Post 1</CardTitle>
            <CardDescription>
              A brief description of the blog post
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <span className="text-sm text-gray-400">Published</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Sample Blog Post 2</CardTitle>
            <CardDescription>Another blog post description</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <span className="text-sm text-gray-400">Draft</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Empty State (show when no blogs) */}
      <Card className="bg-gray-800/50 border-gray-700 text-center py-12">
        <CardContent>
          <div className="text-gray-400">
            <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No Blog Posts Found
            </h3>
            <p className="mb-4">
              Get started by creating your first blog post.
            </p>
            <Link href="/admin-control/add-blog-post">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Blog Post
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AllBlogs;
