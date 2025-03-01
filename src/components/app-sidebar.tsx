"use client";
import {
  Calendar,
  Home,
  Inbox,
  Calendar1Icon,
  LogOutIcon,
  BotMessageSquareIcon,
  User2Icon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Tab = {
  title: string;
  url: string;
  icon: React.ComponentType;
  disabled: boolean;
  hidden: boolean;
  onClick?: () => void;
};

type ISidebarMenuItem = {
  title: string;
  icon: React.ComponentType;
  disabled: boolean;
  hidden: boolean;
  category: string;
  tabs: Tab[];
};

export function AppSidebar({ isOnboarded }: { isOnboarded: boolean }) {
  const path = usePathname();
  const sidebarMenuItem: {
    studentCategory: ISidebarMenuItem;
    mentorCategory: ISidebarMenuItem;
    footerCategory: ISidebarMenuItem;
  } = {
    studentCategory: {
      title: "Student",
      icon: Home,
      disabled: !isOnboarded,
      hidden: !isOnboarded,
      category: "content",
      tabs: [
        {
          title: "Home",
          url: "/mentor/dashboard",
          icon: Home,
          disabled: !isOnboarded,
          hidden: !isOnboarded,
        },
        {
          title: "Sessions",
          url: "/mentor/sessions",
          icon: Calendar1Icon,
          disabled: !isOnboarded,
          hidden: !isOnboarded,
        },
      ],
    },
    mentorCategory: {
      title: "Mentor",
      icon: Home,
      disabled: false,
      hidden: false,
      category: "content",
      tabs: [
        {
          title: "Profile",
          url: "/mentor/profile",
          icon: User2Icon,
          disabled: isOnboarded,
          hidden: isOnboarded,
        },
        {
          title: "Availability",
          url: "/mentor/availability",
          icon: Calendar,
          disabled: !isOnboarded,
          hidden: !isOnboarded,
        },
        {
          title: "Profile",
          url: "/mentor/profile",
          icon: User2Icon,
          disabled: !isOnboarded,
          hidden: !isOnboarded,
        },
        {
          title: "Billings",
          url: "/mentor/billable",
          icon: Inbox,
          disabled: !isOnboarded,
          hidden: !isOnboarded,
        },
      ],
    },
    footerCategory: {
      title: "Your Profile",
      icon: Home,
      disabled: false,
      hidden: false,
      category: "footer",
      tabs: [
        {
          title: "Help",
          url: "/help",
          icon: BotMessageSquareIcon,
          disabled: false,
          hidden: false,
        },
        {
          title: "Logout",
          url: "#",
          onClick: () => {
            localStorage.clear();
            window.location.href = "/auth";
          },
          icon: LogOutIcon,
          disabled: false,
          hidden: false,
        },
      ],
    },
  };

  return (
    <Sidebar key={path}>
      <SidebarHeader>
        <h1 className="text-2xl font-semibold px-2">Project Clay</h1>
      </SidebarHeader>
      <SidebarContent>
        {Object.values(sidebarMenuItem).map((sidebarItem) => {
          const tabs = sidebarItem.tabs.filter((tab) => !tab.hidden);
          if (tabs.length === 0)
            return <SidebarGroup key={sidebarItem.title} />;
          if (sidebarItem?.category === "content") {
            return (
              <SidebarGroup key={sidebarItem.title}>
                 <SidebarSeparator />
                <SidebarGroupLabel>{sidebarItem.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {tabs.map((tab) => (
                      <SidebarMenuItem
                        key={tab.title}
                        className={`${
                          path === tab.url ? "bg-gray-200 rounded-md" : ""
                        } :hover:bg-gray-100`}
                      >
                        <SidebarMenuButton asChild>
                          <Link href={tab.url}>
                            <tab.icon />
                            <span>{tab.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            );
          }
          return (
            <div key={sidebarItem.title}>
              <div className="flex-1" />
              <SidebarSeparator />
              <SidebarFooter key={sidebarItem.title}>
                <SidebarGroupLabel>{sidebarItem.title}</SidebarGroupLabel>
                <SidebarMenu>
                  {tabs.map((tab) => (
                    <SidebarMenuItem key={tab.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={tab.url}
                          onClick={(e) => {
                            if (tab.disabled) {
                              e.preventDefault();
                            }
                            if (tab.onClick) {
                              tab.onClick();
                            }
                          }}
                        >
                          <tab.icon />
                          <span>{tab.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarFooter>
            </div>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}
