// get single project details

import { ISingleProjectResponse } from "@/types";

export async function getSingleProject(
  id: string
): Promise<ISingleProjectResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/projects/${id}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Project not found");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    const project: ISingleProjectResponse = await response.json();
    return project;
  } catch (error) {
    console.error("Error fetching single project:", error);
    throw error;
  }
}
