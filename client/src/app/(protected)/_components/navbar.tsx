"use client";

import Link from "next/link";
import { Bell, ChevronDown, Menu, Search } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { UserButton } from "~/components/auth/userButton";
import { useCurrentRole } from "~/hooks/use-current-role";
import { usePathname } from "next/navigation";
import { UserRole } from "@prisma/client";

export default function Navbar() {
  const pathname = usePathname();
  const role = useCurrentRole();

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="#" className="mr-6 flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          <span className="hidden font-bold sm:inline-block">template Admin</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link href="/admin" className="hover:underline">
                Dashboard
              </Link>
              <Link href="/client" className="hover:underline">
                Users
              </Link>
              {/* <Link href="/settings" className="hover:underline">
                Settings
              </Link> */}
            </nav>
          </SheetContent>
        </Sheet>

        <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 md:block">
          <Link
            href="/client"
            className={`text-sm font-medium transition-colors ${
              pathname === "/client" ? "text-primary" : "text-muted-foreground"
            } hover:text-primary`}
          >
            Client
          </Link>
          {role && role !== UserRole.USER && (
            <Link
              href="/admin"
              className={`text-sm font-medium transition-colors ${
                pathname === "/admin" ? "text-primary" : "text-muted-foreground"
              } hover:text-primary`}
            >
              Admin
            </Link>
          )}
          {/* <Link
            href="/settings"
            className={`text-sm font-medium transition-colors ${
              pathname === "/settings" ? "text-primary" : "text-muted-foreground"
            } hover:text-primary`}
          >
            Settings
          </Link> */}
        </nav>

        <div className="ml-auto flex items-center space-x-4">
          <form className="hidden lg:block">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full appearance-none bg-white pl-8 shadow-none md:w-2/3 lg:w-[300px]"
              />
            </div>
          </form>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications panel</span>
            <div className="absolute right-0 top-0 h-2 w-2 rounded-full bg-destructive"></div>
          </Button>
          <UserButton />
        </div>
      </div>
    </nav>
  );
}
