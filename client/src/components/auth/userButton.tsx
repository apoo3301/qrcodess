"use client";

import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger,} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { LogoutButton } from "~/components/auth/logoutButton";
import { useCurrentUser } from "~/hooks/use-current-user";
import { ExitIcon } from "@radix-ui/react-icons";
import { FaUser } from "react-icons/fa";
import { HomeButton } from "./homeButton";
import { CrownIcon, HomeIcon } from "lucide-react";
import { ClientButton } from "./clientButton";

export function UserButton() {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-black">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        {/* tutorial code: cursor-pointer on LogoutButton won't work because DropdownMenuItem will override it */}
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
        <HomeButton>
          <DropdownMenuItem>
            <HomeIcon className="mr-2 h-4 w-4" />
            Home
          </DropdownMenuItem>
        </HomeButton>
        <ClientButton>
          <DropdownMenuItem>
            <CrownIcon className="mr-2 h-4 w-4" />
            Client
          </DropdownMenuItem>
        </ClientButton>

        {/* cursor-pointer on LogoutButton will work but might override DropdownMenuItem's behavior */}
        {/* <DropdownMenuItem>
          <LogoutButton>Logout</LogoutButton>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
