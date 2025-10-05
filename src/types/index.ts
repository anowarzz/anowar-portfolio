import { ReactNode } from "react";
export interface IProject {
  id: number;
  title: string;
  image: string;
  projectType: string;
  projectSummary: string;
  gitHubLink: string;
  liveSiteLink: string;
  technologies: string[];
  details: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IProjectResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: IProject[];
}

export interface ISingleProjectResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: IProject;
}

export interface IBlogAuthor {
  id: number;
  username: string;
  email: string;
}

export interface IBlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  isFeatured: boolean;
  isDeleted: boolean;
  views: number;
  tags: string[];
  category: string;
  authorUsername: string;
  createdAt: string;
  updatedAt: string;
  author: IBlogAuthor;
}

export interface IPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IBlogListResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: IBlogPost[];
  pagination?: IPagination;
}

export interface ISingleBlogResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: IBlogPost;
}

export interface ConfirmationDialogProps {
  children: ReactNode;
  description: string;
  onConfirm: () => void;
  isLoading?: boolean;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  loadingText?: string;
}

export interface IAdminStats {
  overview: {
    totalBlogs: number;
    totalProjects: number;
    totalViews: number;
  };
  blogs: {
    total: number;
    featured: number;
    totalViews: number;
    recentCount: number;
    topViewed: {
      id: number;
      title: string;
      slug: string;
      views: number;
    };
  };
  projects: {
    total: number;
    recentCount: number;
  };
}

export interface IAdminStatsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: IAdminStats;
}
