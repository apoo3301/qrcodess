"use client";

import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { LoginForm } from "~/components/auth/loginForm";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export function LoginButton({
  children,
  mode = "redirect",
  asChild,
}: LoginButtonProps) {
  const router = useRouter();

  const onClick = () => {
    console.log("login button clicked");
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="w-full max-w-md mx-auto p-4 bg-white border border-gray-300 rounded-lg shadow-lg sm:mx-4 sm:my-8 md:my-12 lg:my-16">
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
}
