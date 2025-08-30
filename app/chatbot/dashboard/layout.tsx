"use client";

import React from "react";
import SideNav from "@/components/chatbot/side-nav";
import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarToggleButton from "@/components/chatbot/sidebar-toggle-button";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SideNav />
      <main className="flex-1 min-h-screen">
        <SidebarToggleButton />
        <div>{children}</div>
      </main>
    </SidebarProvider>
  );
}
