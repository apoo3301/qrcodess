"use client";

import { DEFAULT_LOGIN_REDIRECT } from "~/routes";
import { useSearchParams } from "next/navigation";
import { Button } from "~/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

export function Social() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="relative w-full">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Ou continuer avec</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 w-full max-w-xs">
        <Button variant="outline" onClick={() => onClick("github")}>
          <FaGithub className="mr-2 h-4 w-4" />
          GitHub
        </Button>
        <Button variant="outline" onClick={() => onClick("google")}>
          <FcGoogle className="mr-2 h-4 w-4" />
          Google
        </Button>
      </div>
    </div>
  );
}