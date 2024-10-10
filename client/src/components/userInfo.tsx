import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Activity, Clock, Edit, Lock, Mail, MoreHorizontal, Shield, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Switch } from "~/components/ui/switch";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { ExtendedUser } from "~/next-auth";
import { useState } from 'react';
import { AdminButton } from "~/app/(protected)/_components/adminButton";
import Link from "next/link";
import { FcCustomerSupport } from "react-icons/fc";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export function UserInfo({ user, label }: UserInfoProps) {
  return (
    <div className="container mx-auto p-4 space-y-6 bg-white text-black min-h-screen">
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={user?.image || undefined} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <CardTitle className="text-2xl sm:text-3xl font-bold">{user?.name}</CardTitle>
              <CardDescription className="text-gray-600">{user?.email}</CardDescription>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Two Factor Authentication</span>
              <Badge variant={user?.isTwoFactorEnabled ? "default" : "destructive"}>
                {user?.isTwoFactorEnabled ? "ON" : "OFF"}
              </Badge>
            </div>
            <Badge variant="outline" className="text-sm px-2 py-1 border-gray-300">
              {user?.role}
            </Badge>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 text-gray-600 hover:text-black">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white text-black border border-gray-200">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-200" />
              <DropdownMenuItem className="focus:bg-gray-100">
                <Edit className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-gray-100">
                <Lock className="mr-2 h-4 w-4" /> Change Password
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-gray-100">
                <Shield className="mr-2 h-4 w-4" /> Permissions
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-gray-600" />
              <span className="text-sm">Client ID: {user?.id}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-600" />
              <span className="text-sm">{user?.email}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 sm:grid-cols-2">
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Activity className="h-5 w-5 text-gray-600" />
              Connection Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-600" />
                  <span className="text-sm">Last Login</span>
                </div>
                <span className="text-sm text-gray-600">none</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-600" />
                  <span className="text-sm">Login Count</span>
                </div>
                <span className="text-sm text-gray-600">none</span>
              </div>
              <div className="pt-4">
                <div className="text-sm font-medium mb-2">Activity Overview</div>
                <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                  none
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* <AdminButton children="Admin" /> */}
              <Link href="/admin">
              <Button variant="outline" className="w-full justify-start border-gray-300 hover:bg-gray-100">
                <Activity className="mr-2 h-4 w-4" />
                Admin
              </Button>
              </Link>
              <Link href="/admin">
              <Button variant="outline" className="w-full justify-start border-gray-300 hover:bg-gray-100">
                <FcCustomerSupport className="mr-2 h-4 w-4" />
                Portal
              </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
