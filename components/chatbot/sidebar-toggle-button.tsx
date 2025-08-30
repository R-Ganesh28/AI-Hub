"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftClose, PanelRightClose } from "lucide-react";

export default function SidebarToggleButton() {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <button
      onClick={toggleSidebar}
      className={`fixed z-40 p-2 shadow-md transition-all border rounded-lg bg-transparent dark:border-gray-700 cursor-pointer
        ${isCollapsed ? "left-4 bottom-3" : "left-[250px] bottom-3"}`}
    >
      {isCollapsed ? (
        <PanelRightClose className="h-5 w-5 text-gray-700 dark:text-gray-200" />
      ) : (
        <PanelLeftClose className="h-5 w-5 text-gray-700 dark:text-gray-200" />
      )}
    </button>
  );
}
