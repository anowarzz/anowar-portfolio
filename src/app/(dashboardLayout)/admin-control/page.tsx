import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  Eye,
  FileText,
  FolderKanban,
  Plus,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
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
              href="/admin-control/add-blog"
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
            <div className="text-3xl font-bold text-white">8</div>
            <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
              <TrendingUp className="size-3" />
              +2 this month
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
            <div className="text-3xl font-bold text-white">12</div>
            <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
              <TrendingUp className="size-3" />
              +4 this month
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
            <div className="text-3xl font-bold text-white">2.4K</div>
            <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
              <TrendingUp className="size-3" />
              +12% this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/80">
              Visitors
            </CardTitle>
            <Users className="h-5 w-5 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">1.8K</div>
            <p className="text-xs text-green-400 flex items-center gap-1 mt-1">
              <TrendingUp className="size-3" />
              +8% this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Quick Links */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card className="bg-white/5 backdrop-blur border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="size-5" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-white/60">
              Your latest portfolio updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
              <div className="size-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <FolderKanban className="size-4 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">
                  Project "E-commerce Platform" updated
                </p>
                <p className="text-white/60 text-xs">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
              <div className="size-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <FileText className="size-4 text-cyan-400" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">
                  New blog post published
                </p>
                <p className="text-white/60 text-xs">1 day ago</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
              <div className="size-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Eye className="size-4 text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">
                  Portfolio reached 1K views
                </p>
                <p className="text-white/60 text-xs">3 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Management */}
        <Card className="bg-white/5 backdrop-blur border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Quick Management</CardTitle>
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
                <span className="text-white font-medium">Manage Projects</span>
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
                <span className="text-white font-medium">Manage Blogs</span>
              </div>
              <div className="text-white/60 group-hover:text-white transition-colors">
                →
              </div>
            </Link>

            <Link
              href="/admin-control/settings"
              className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="size-5 rounded bg-orange-400/20 flex items-center justify-center">
                  <span className="text-orange-400 text-xs">⚙</span>
                </div>
                <span className="text-white font-medium">Settings</span>
              </div>
              <div className="text-white/60 group-hover:text-white transition-colors">
                →
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
