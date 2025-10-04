"use client";

import { useEffect, useState } from "react";
import { IBlogListResponse, IBlogPost } from "../../types";

export async function getAllBlogs(): Promise<IBlogListResponse> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/blogs`);

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

export function useBlogs() {
  const [blogs, setBlogs] = useState<IBlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllBlogs();
      setBlogs(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const refetch = () => {
    fetchBlogs();
  };

  return { blogs, loading, error, refetch };
}
