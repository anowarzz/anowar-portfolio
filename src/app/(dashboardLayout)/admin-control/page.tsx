"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminStats } from "@/services/adminService/getAdminStats";
import {
  AlertCircle,
  BarChart3,
  Eye,
  FileText,
  FolderKanban,
  Plus,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const { stats, loading, error } = useAdminStats();
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="bg-red-500/10 border-red-500/20 p-6">
          <div className="flex items-center gap-3 text-red-400">
            <AlertCircle className="size-5" />
            <div>
              <h3 className="font-semibold">Error loading dashboard</h3>
              <p className="text-sm opacity-80">{error}</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="space-y-4">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Welcome back,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Anowar
            </span>
          </h1>
          <p className="text-white/70 text-lg mt-2">
            Manage your portfolio content and track your progress
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Button
            asChild
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0"
          >
            <Link
              href="/admin-control/add-project"
              className="flex items-center gap-2"
            >
              <Plus className="size-4" />
              Add New Project
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-white/20 text-cyan-500  hover:bg-white/90 hover:text-cyan-700"
          >
            <Link
              href="/admin-control/add-blog-post"
              className="flex items-center gap-2"
            >
              <Plus className="size-4" />
              Add New Blog
            </Link>
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/80">
              Total Projects
            </CardTitle>
            <FolderKanban className="h-5 w-5 text-blue-400" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16 bg-white/10" />
            ) : (
              <div className="text-3xl font-bold text-white">
                {stats?.overview.totalProjects || 0}
              </div>
            )}
            <p className="text-xs text-cyan-400 flex items-center gap-1 mt-1">
              <BarChart3 className="size-3" />
              {loading ? (
                <Skeleton className="h-3 w-20 bg-white/10" />
              ) : (
                `${stats?.projects.recentCount || 0} recent`
              )}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/80">
              Total Blogs
            </CardTitle>
            <FileText className="h-5 w-5 text-cyan-400" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16 bg-white/10" />
            ) : (
              <div className="text-3xl font-bold text-white">
                {stats?.overview.totalBlogs || 0}
              </div>
            )}
            <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
              <Star className="size-3" />
              {loading ? (
                <Skeleton className="h-3 w-20 bg-white/10" />
              ) : (
                `${stats?.blogs.featured || 0} featured`
              )}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/80">
              Total Views
            </CardTitle>
            <Eye className="h-5 w-5 text-purple-400" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16 bg-white/10" />
            ) : (
              <div className="text-3xl font-bold text-white">
                {stats?.overview.totalViews || 0}
              </div>
            )}
            <p className="text-xs text-purple-300 flex items-center gap-1 mt-1">
              <TrendingUp className="size-3" />
              {loading ? (
                <Skeleton className="h-3 w-20 bg-white/10" />
              ) : (
                `${stats?.blogs.totalViews || 0} blog views`
              )}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/80">
              Top Blog
            </CardTitle>
            <Users className="h-5 w-5 text-orange-400" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-8 w-16 bg-white/10" />
            ) : (
              <div className="text-3xl font-bold text-white">
                {stats?.blogs.topViewed.views || 0}
              </div>
            )}
            <p className="text-xs text-orange-300 flex items-center gap-1 mt-1">
              <Eye className="size-3" />
              {loading ? (
                <Skeleton className="h-3 w-20 bg-white/10" />
              ) : (
                "views on top blog"
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Overview */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Blog Analytics */}
        <Card className="bg-white/5 backdrop-blur border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="size-5 text-cyan-400" />
              Blog Analytics
            </CardTitle>
            <CardDescription className="text-white/60">
              Blog performance overview
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full bg-white/10" />
                <Skeleton className="h-4 w-3/4 bg-white/10" />
                <Skeleton className="h-4 w-1/2 bg-white/10" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Total Blogs</span>
                  <span className="text-white font-semibold">
                    {stats?.blogs.total || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Featured</span>
                  <span className="text-cyan-400 font-semibold">
                    {stats?.blogs.featured || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Total Views</span>
                  <span className="text-purple-400 font-semibold">
                    {stats?.blogs.totalViews || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Recent Posts</span>
                  <span className="text-green-400 font-semibold">
                    {stats?.blogs.recentCount || 0}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Performing Blog */}
        <Card className="bg-white/5 backdrop-blur border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Star className="size-5 text-yellow-400" />
              Top Performing
            </CardTitle>
            <CardDescription className="text-white/60">
              Most viewed blog post
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full bg-white/10" />
                <Skeleton className="h-3 w-3/4 bg-white/10" />
                <Skeleton className="h-3 w-1/2 bg-white/10" />
              </div>
            ) : stats?.blogs.topViewed ? (
              <div className="space-y-3">
                <h4 className="text-white font-medium text-sm leading-tight">
                  {stats.blogs.topViewed.title}
                </h4>
                <p className="text-white/60 text-xs">
                  Slug: {stats.blogs.topViewed.slug}
                </p>
                <div className="flex items-center gap-2 text-purple-400">
                  <Eye className="size-4" />
                  <span className="font-semibold">
                    {stats.blogs.topViewed.views} views
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-white/60 text-sm">No blog data available</p>
            )}
          </CardContent>
        </Card>

        {/* Project Summary */}
        <Card className="bg-white/5 backdrop-blur border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FolderKanban className="size-5 text-blue-400" />
              Project Summary
            </CardTitle>
            <CardDescription className="text-white/60">
              Project portfolio overview
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full bg-white/10" />
                <Skeleton className="h-4 w-2/3 bg-white/10" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Total Projects</span>
                  <span className="text-blue-400 font-semibold">
                    {stats?.projects.total || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70 text-sm">Recent Projects</span>
                  <span className="text-green-400 font-semibold">
                    {stats?.projects.recentCount || 0}
                  </span>
                </div>
                <Link
                  href="/admin-control/all-projects"
                  className="inline-flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>Manage Projects</span>
                  <span>→</span>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Management */}
      <div className="grid gap-6 lg:grid-cols-1">
        {/* Quick Management */}
        <Card className="bg-white/5 backdrop-blur border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              Quick Management
              <Button
                onClick={() => window.location.reload()}
                variant="ghost"
                size="sm"
                className="text-white/60 hover:text-white hover:bg-white/10"
              >
                <TrendingUp className="size-4" />
              </Button>
            </CardTitle>
            <CardDescription className="text-white/60">
              Manage your content efficiently
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link
              href="/admin-control/all-projects"
              className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <FolderKanban className="size-5 text-blue-400" />
                <div className="flex flex-col">
                  <span className="text-white font-medium">
                    Manage Projects
                  </span>
                  {loading ? (
                    <Skeleton className="h-3 w-20 bg-white/10 mt-1" />
                  ) : (
                    <span className="text-white/60 text-xs">
                      {stats?.projects.total || 0} total projects
                    </span>
                  )}
                </div>
              </div>
              <div className="text-white/60 group-hover:text-white transition-colors">
                →
              </div>
            </Link>

            <Link
              href="/admin-control/all-blogs"
              className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <FileText className="size-5 text-cyan-400" />
                <div className="flex flex-col">
                  <span className="text-white font-medium">Manage Blogs</span>
                  {loading ? (
                    <Skeleton className="h-3 w-20 bg-white/10 mt-1" />
                  ) : (
                    <span className="text-white/60 text-xs">
                      {stats?.blogs.total || 0} total blogs
                    </span>
                  )}
                </div>
              </div>
              <div className="text-white/60 group-hover:text-white transition-colors">
                →
              </div>
            </Link>

            <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
              <div className="flex items-center gap-3">
                <Eye className="size-5 text-purple-400" />
                <div className="flex flex-col flex-1">
                  <span className="text-white font-medium">
                    Total Portfolio Views
                  </span>
                  {loading ? (
                    <Skeleton className="h-4 w-16 bg-white/10 mt-1" />
                  ) : (
                    <span className="text-purple-300 font-bold text-lg">
                      {stats?.overview.totalViews || 0}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
