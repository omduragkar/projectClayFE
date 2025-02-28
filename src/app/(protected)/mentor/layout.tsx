"use client";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/app-sidebar";
import userStore, { IUserStore } from "@/store/user";
import { RoleEnum } from "@/constants/enum/role";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = userStore((state: IUserStore) => state);
  const link = useRouter();

  useEffect(() => {
    if (
      user?.userInfo &&
      user?.sessionInfo &&
      Object.keys(user?.userInfo).length > 0 &&
      Object.keys(user?.sessionInfo).length > 0 &&
      user?.role
    ) {
      if (user?.role !== RoleEnum.MENTOR) {
        redirect("/dashboard");
      } else {
        if (!user?.isOnboarded) {
          link.push("/mentor/profile");
        }
      }
    } else {
      redirect("/auth");
    }
  }, [user, link]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 w-screen">
      <SidebarProvider>
        <div className="hidden md:flex md:flex-shrink-0">
          <AppSidebar isOnboarded={user?.userInfo?.isOnboarded ?? false} />
        </div>
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <header className="bg-white shadow">
            <SidebarTrigger />
          </header>
          <main
            className="flex-1 overflow-y-auto focus:outline-none"
            tabIndex={0}
          >
            <div className="px-8 py-4">{children}</div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
