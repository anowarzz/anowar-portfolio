import { useEffect, useState } from "react";
import { IProject } from "../../types";

export async function getAllProjects(): Promise<IProject[]> {
  try {
    const response = await fetch(
      "https://anowarzz-portfolio-backend.vercel.app/api/projects"
    );

    if (!response.ok) {
      throw new Error(`Something went wrong: ${response.status}`);
    }

    const projects: IProject[] = await response.json();
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

export function useProjects() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAllProjects();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
}
