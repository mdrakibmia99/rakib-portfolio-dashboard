"use client";

import { FolderKanban, HomeIcon, BookOpen, UserCog, BadgeCheck } from "lucide-react";
// import logo from '@/assets/sLogo.png';
// import smLogo from '@/assets/smLogo.png';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Link from "next/link";

// import { Icon, Logo } from '@/assets/Logo';
// import Image from 'next/image';
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar> & { collapsed?: boolean }) {
  const data = {
    navMain: [
      {
        title: "Home",
        url: "/",
        icon: HomeIcon,
      },
      // {
      //   title: 'Dashboard',
      //   url: `/dashboard`,
      //   icon: LayoutDashboard,
      //   isActive: true,
      // },
      {
        title: "Projects",
        url: "/",
        icon: FolderKanban,
        items: [
          {
            title: "Add Project",
            url: "/add-project",
          },
          {
            title: "All Projects",
            url: "/projects",
          },
        ],
      },
      {
        title: "Blogs",
        url: "/",
        icon: BookOpen,
        items: [
          {
            title: "Add Blog",
            url: "/add-blog",
          },
          {
            title: "All Blogs",
            url: "/blogs",
          },
        ],
      },
      {
        title: "Skills",
        url: "/",
        icon: BadgeCheck,
        items: [
          {
            title: "Add Skill",
            url: "/add-skill",
          },
          {
            title: "All Skills",
            url: "/skills",
          },
        ],
      },
      {
        title: "Profile",
        url: "/profile",
        icon: UserCog,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                {/* <div className="grid flex-1 text-left text-sm leading-tight">
                  {collapsed ? <Icon /> : <Logo />}
                </div> */}
                <div className="w-full flex items-center justify-center gap-0.5">
                  <p>Md Rakib Mia</p>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
