"use client";

import { useEffect, useState } from "react";
import { IBlogListResponse, IBlogPost } from "../../types";

export interface BlogFilters {
  page?: number;
  limit?: number;
  search?: string;
  isFeatured?: boolean;
}

export async function getAllBlogs(
  filters: BlogFilters = {}
): Promise<IBlogListResponse> {
  try {
    const { page = 1, limit = 10, search, isFeatured } = filters;

    const queryParams = new URLSearchParams();
    queryParams.append("page", page.toString());
    queryParams.append("limit", limit.toString());

    if (search) {
      queryParams.append("search", search);
    }

    if (typeof isFeatured === "boolean") {
      queryParams.append("isFeatured", isFeatured.toString());
    }

    const url = `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/blogs/all?${queryParams.toString()}`;
    console.log("API URL:", url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Something went wrong: ${response.status}`);
    }

    const blogs: IBlogListResponse = await response.json();

    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
}

export function useBlogs(filters: BlogFilters = {}, refresh?: boolean) {
  const [blogs, setBlogs] = useState<IBlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<{
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(null);

        const currentFilters: BlogFilters = {
          page: filters.page || 1,
          limit: filters.limit || 10,
          search: filters.search,
          isFeatured: filters.isFeatured,
        };

        const data = await getAllBlogs(currentFilters);
        setBlogs(data.data);
        if (data.pagination) {
          setPagination(data.pagination);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [
    filters.page,
    filters.limit,
    filters.search,
    filters.isFeatured,
    refresh,
  ]);

  return { blogs, loading, error, pagination };
}
