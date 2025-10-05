import { Button } from "@/components/ui/button";
import { IBlogPost } from "@/types";
import { ArrowLeft, Calendar, Clock, Eye, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next/types";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = true;

// meta data
export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${resolvedParams.slug}`,
      {
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      return {
        title: "Blog Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    const data = await res.json();
    const blog = data.data as IBlogPost;

    return {
      title: `${blog.title} | Anowar's Portfolio`,
      description: blog.excerpt,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog | Anowar's Portfolio",
      description: "Read the latest blog posts and insights.",
    };
  }
}

// Generate static params for ISR
export async function generateStaticParams() {
  try {
    // Fetch all blog slugs at build time for pre-generation
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/all?limit=100`,
      {
        next: { revalidate: 3600 }, // Revalidate slug list every hour
      }
    );

    if (!res.ok) {
      console.error("Failed to fetch blogs for generateStaticParams");
      return [];
    }

    const data = await res.json();
    const blogs = data.data as IBlogPost[];

    // Return array of params for static generation
    return blogs.map((blog) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

const BlogDetailPage = async ({ params }: BlogDetailPageProps) => {
  let blog: IBlogPost | null = null;
  let error: string | null = null;

  try {
    const resolvedParams = await params;
    console.log("Blog detail page received slug:", resolvedParams.slug);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${resolvedParams.slug}`,
      {
        next: { revalidate: 300 }, // ISR: Revalidate individual blog every 5 minutes
      }
    );

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error("Blog post not found");
      }
      throw new Error(`Failed to fetch blog: ${res.status}`);
    }

    const data = await res.json();
    blog = data.data as IBlogPost;
  } catch (err) {
    console.error("Error in blog detail page:", err);
    error = err instanceof Error ? err.message : "An error occurred";
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Handle error state for server components
  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Oops!
          </h1>
          <p className="text-xl text-red-400 mb-4">
            {error || "Blog post not found"}
          </p>
          <p className="text-lg text-gray-400 mb-8">
            The blog post you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link href="/blogs">
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Blogs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/blogs">
            <Button
              variant="outline"
              className="border-2 border-blue-500/50 text-blue-300 bg-black/20 hover:bg-blue-500/10 hover:text-blue-200 hover:border-blue-400/80 backdrop-blur-sm transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Blogs
            </Button>
          </Link>
        </div>

        {/* Blog Header */}
        <div className="mb-12">
          {/* Category and Featured Badge */}
          <div className="flex items-center gap-4 mb-4">
            <span className="px-4 py-2 text-sm font-semibold text-white bg-gray-800/90 backdrop-blur-sm rounded-full border border-gray-600/50">
              {blog.category}
            </span>
            {blog.isFeatured && (
              <span className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 backdrop-blur-sm rounded-full border border-white/20 shadow-lg">
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {blog.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-6">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="font-medium">{blog.authorUsername}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>Published {formatDate(blog.createdAt)}</span>
            </div>
            {blog.updatedAt !== blog.createdAt && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>Updated {formatDateTime(blog.updatedAt)}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              <span>{blog.views} views</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mb-6">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 text-sm bg-gray-800/80 text-gray-300 rounded-full border border-gray-600/50 font-medium hover:bg-gray-700/80 transition-colors duration-300"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Excerpt */}
          <p className="text-xl text-gray-300 leading-relaxed mb-8 font-light italic border-l-4 border-blue-500 pl-6 bg-gray-800/20 py-4 rounded-r-lg">
            {blog.excerpt}
          </p>
        </div>

        {/* Featured Image */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-12 bg-gray-800/20 border border-gray-700/30">
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            width={1200}
            height={600}
            className="w-full h-96 object-cover"
            priority
          />
        </div>

        {/* Blog Content */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8 mb-12">
          <div
            className="text-gray-300 leading-relaxed text-lg max-w-none
              [&>h1]:text-white [&>h1]:font-bold [&>h1]:text-4xl [&>h1]:mb-6 [&>h1]:mt-8
              [&>h2]:text-white [&>h2]:font-bold [&>h2]:text-3xl [&>h2]:mb-4 [&>h2]:mt-6
              [&>h3]:text-white [&>h3]:font-bold [&>h3]:text-2xl [&>h3]:mb-3 [&>h3]:mt-5
              [&>h4]:text-white [&>h4]:font-semibold [&>h4]:text-xl [&>h4]:mb-2 [&>h4]:mt-4
              [&>p]:text-gray-300 [&>p]:leading-relaxed [&>p]:mb-4
              [&>a]:text-blue-400 [&>a]:no-underline hover:[&>a]:text-blue-300 hover:[&>a]:underline
              [&>strong]:text-white [&>strong]:font-semibold
              [&>em]:text-gray-200 [&>em]:italic
              [&>ul]:text-gray-300 [&>ul]:mb-4 [&>ul]:pl-6
              [&>ol]:text-gray-300 [&>ol]:mb-4 [&>ol]:pl-6
              [&>li]:text-gray-300 [&>li]:mb-1
              [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:bg-gray-800/30 [&>blockquote]:text-gray-300 [&>blockquote]:pl-6 [&>blockquote]:py-4 [&>blockquote]:my-4
              [&>code]:text-cyan-400 [&>code]:bg-gray-800 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm
              [&>pre]:bg-gray-800 [&>pre]:border [&>pre]:border-gray-600 [&>pre]:p-4 [&>pre]:rounded [&>pre]:overflow-x-auto [&>pre]:my-4
              [&>pre>code]:bg-transparent [&>pre>code]:text-gray-300 [&>pre>code]:p-0
              [&>img]:rounded-lg [&>img]:shadow-lg [&>img]:my-6
              [&>hr]:border-gray-600 [&>hr]:my-8
            "
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* Blog Footer */}
        <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Author Info */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {blog.author.username}
                </h3>
                <p className="text-gray-400">{blog.author.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
