import {
  Calendar,
  Home,
  Inbox,
  Search,
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
} from "@/components/ui/sidebar";

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
          title: "Upcoming Sessions",
          url: "#",
          icon: Calendar1Icon,
          disabled: !isOnboarded,
          hidden: !isOnboarded,
        },
        {
          title: "Past Sessions",
          url: "#",
          icon: Search,
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
          title: "Onboarding",
          url: "/mentor/profile",
          icon: Home,
          disabled: isOnboarded,
          hidden: isOnboarded,
        },
        {
          title: "Availability",
          url: "#",
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
          url: "#",
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
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-2xl font-semibold">Project Clay</h1>
      </SidebarHeader>
      <SidebarContent>
        {Object.values(sidebarMenuItem).map((sidebarItem) => {
          const tabs = sidebarItem.tabs.filter((tab) => !tab.hidden);
          if (tabs.length === 0)
            return <SidebarGroup key={sidebarItem.title} />;
          if (sidebarItem?.category === "content") {
            return (
              <SidebarGroup key={sidebarItem.title}>
                <SidebarGroupLabel>{sidebarItem.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {tabs.map((tab) => (
                      <SidebarMenuItem key={tab.title}>
                        <SidebarMenuButton asChild>
                          <a href={tab.url}>
                            <tab.icon />
                            <span>{tab.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            );
          }
          return (
            <SidebarFooter key={sidebarItem.title}>
              <SidebarMenu>
                {tabs.map((tab) => (
                  <SidebarMenuItem key={tab.title}>
                    <SidebarMenuButton asChild>
                      <a
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
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarFooter>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}
