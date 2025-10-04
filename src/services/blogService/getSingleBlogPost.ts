import { ISingleBlogResponse } from "../../types";

export async function getSingleBlog(
  slug: string
): Promise<ISingleBlogResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${slug}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Blog post not found");
      }

      throw new Error(`Something went wrong: ${response.status}`);
    }

    const blog: ISingleBlogResponse = await response.json();
    return blog;
  } catch (error) {
    console.error("Error fetching single blog post:", error);
    throw error;
  }
}
