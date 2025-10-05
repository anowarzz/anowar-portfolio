"use client";

import { useEffect, useState } from "react";
import { IAdminStats, IAdminStatsResponse } from "../../types";

export async function getAdminStats(): Promise<IAdminStatsResponse> {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/admin/stats`;
    console.log("Admin Stats API URL:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch admin stats: ${response.status}`);
    }

    const stats: IAdminStatsResponse = await response.json();
    return stats;
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    throw error;
  }
}

export function useAdminStats() {
  const [stats, setStats] = useState<IAdminStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAdminStats();
        setStats(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error, refetch: () => window.location.reload() };
}
