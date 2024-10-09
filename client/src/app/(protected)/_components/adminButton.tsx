"use client";

import { Lock } from "lucide-react";
import { Button } from "~/components/ui/button";

interface AdminButtonProps {
    children: React.ReactNode;
}

export function AdminButton({ children }: AdminButtonProps) {
    const onClick = () => {
        window.location.href = "/admin"
    };

    return (
        <Button variant="outline" className="w-full justify-start border-gray-300 hover:bg-gray-100">
            <Lock className="mr-2 h-4 w-4" />
            Admin
        </Button>
    );
}