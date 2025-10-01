// get single project details

import { IProject } from "@/types";

export async function getSingleProject(id: string): Promise<IProject> {
  try {
    const response = await fetch(
      `https://anowarzz-portfolio-backend.vercel.app/api/projects/${id}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Project not found");
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    const project: IProject = await response.json();
    return project;
  } catch (error) {
    console.error("Error fetching single project:", error);
    throw error;
  }
}
