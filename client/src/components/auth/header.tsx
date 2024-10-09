import { SquareArrowOutUpRight } from "lucide-react";
import { Poppins } from "next/font/google";

import { cn } from "~/lib/utils";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

interface HeaderProps {
  label: string;
}

export function Header({ label }: HeaderProps) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
  <h1 className={cn("text-3xl font-semibold flex items-center", font.className)}>
    <SquareArrowOutUpRight className="mr-2" />
    authentification
  </h1>
  <p className="text-sm text-muted-foreground">{label}</p>
</div>

  );
}

