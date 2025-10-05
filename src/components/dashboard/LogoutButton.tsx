"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Logout failed");
      }

      toast.success("Logged out successfully!");
      router.push("/admin-login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  return (
    <Button
      onClick={handleLogOut}
      variant="destructive"
      size="sm"
      aria-label="Log Out"
      title="Log Out"
      className="mr-4"
    >
      Logout
      <LogOut />
    </Button>
  );
}
