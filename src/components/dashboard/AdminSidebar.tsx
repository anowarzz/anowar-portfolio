import anowarzzLogo from "@/assets/images/anowar-dash-logo.svg";
import { BookOpen, Eye, FileText, Folder, FolderPlus } from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      items: [
        {
          title: "Overview",
          url: "/admin-control",
          icon: Eye,
          isActive: false,
        },
      ],
    },
    {
      title: "Projects Management",
      items: [
        {
          title: "Add New Project",
          url: "/admin-control/add-project",
          icon: FolderPlus,
          isActive: false,
        },
        {
          title: "All Projects",
          url: "/admin-control/all-projects",
          icon: Folder,
          isActive: false,
        },
      ],
    },
    {
      title: "Blogs Management",
      items: [
        {
          title: "Add New Blog",
          url: "/admin-control/add-blog-post",
          icon: FileText,
          isActive: false,
        },
        {
          title: "All Blogs",
          url: "/admin-control/all-blogs",
          icon: BookOpen,
          isActive: false,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href="/">
          <Image
            src={anowarzzLogo}
            height={60}
            width={100}
            alt="Anowarzz Logo"
            className="mx-auto"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <Link href={item.url}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
