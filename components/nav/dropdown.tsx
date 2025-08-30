import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MenuIcon, LayoutDashboard, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Dropdown() {
  const path = usePathname();
  let redirectTo = "";
  if (path.startsWith("/chatbot")) {
    redirectTo = "/chatbot/dashboard";
  } else if (path.startsWith("/imageGen")) {
    redirectTo = "/imageGen/dashboard";
  } else if (path.startsWith("/shortVideoGen")) {
    redirectTo = "/shortVideoGen/dashboard";
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 py-2 rounded-md text-gray-800 hover:text-gray-600 dark:text-gray-50 dark:hover:text-gray-200 transition-colors cursor-pointer focus:outline-none focus:ring-0">
        <MenuIcon className="w-5 h-5" />
        <span className="text-sm font-medium">Explore</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link
            href={redirectTo}
            className="flex items-center gap-2 text-sm cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm cursor-pointer"
          >
            <Home className="w-4 h-4" />
            AI Hub
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
