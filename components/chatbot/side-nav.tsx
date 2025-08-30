"use client";

import React from "react";
import { LayoutDashboard, FileClock, WalletCards } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Usage from "@/components/chatbot/usage";
import MembershipPopupModal from "./modal/membership-popup-modal";

export default function SideNav() {
  const path = usePathname();

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/chatbot/dashboard" },
    { name: "History", icon: FileClock, path: "/chatbot/dashboard/history" },
    { name: "Billing", icon: WalletCards, path: "/chatbot/dashboard/billing" },
  ];

  return (
    <Sidebar className="mt-16 z-30">
      <SidebarContent className="bg-white/70 dark:bg-zinc-900/60">
        <SidebarGroup className="flex flex-col justify-between min-h-screen">
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.map((item, index) => (
                <div
                  key={index}
                  className={`flex m-2 mr-2 p-2 rounded-lg cursor-pointer transition-colors duration-100 ease-in-out ${
                    path === item.path
                      ? "bg-primary dark:bg-primary text-primary-foreground dark:text-black"
                      : "hover:bg-primary dark:hover:bg-primary hover:text-primary-foreground dark:hover:text-black"
                  }`}
                >
                  <Link
                    href={item.path}
                    className="flex items-center w-full h-full"
                  >
                    <item.icon /> <span className="ml-2">{item.name}</span>
                  </Link>
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupContent>
            <div className="py-0 md:py-25">
              <Usage />
              <MembershipPopupModal />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
