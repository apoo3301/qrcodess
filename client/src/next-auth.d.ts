import { type DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole;
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
  }
}

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
