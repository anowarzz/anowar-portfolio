import { AppSidebar } from "@/components/AdminSidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.15), transparent 70%), #000000",
      }}
    >
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <main className="flex-1">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b border-white/10 backdrop-blur bg-black/20 px-6">
              <SidebarTrigger className="-ml-1 text-white hover:bg-white" />
              <Separator
                orientation="vertical"
                className="mr-2 h-2 bg-white/10"
              />
              <div className="flex w-full items-center justify-between gap-2">
                <h2 className="text-lg font-semibold text-white">
                  Admin Dashboard
                </h2>
                <div className="flex items-center gap-4">
                  <Link
                    href="/"
                    aria-label="Home Page"
                    title="Back To Home Page"
                  >
                    <Button variant="outline" size="sm">
                      Home Page
                    </Button>
                  </Link>
                  <Button
                    // onClick={handleLogOut}
                    variant="destructive"
                    size="sm"
                    aria-label="Log Out"
                    title="Log Out"
                    className="mr-4"
                  >
                    Logout
                    <LogOut />
                  </Button>
                </div>
              </div>
            </header>
            <div className="p-6">{children}</div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
