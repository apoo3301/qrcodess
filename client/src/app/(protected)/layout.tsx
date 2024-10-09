import Navbar from "./_components/navbar";
import { SessionProvider } from "next-auth/react";
import { auth } from "~/auth";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <div className="flex flex-1 items-center justify-center">
          {children}
        </div>
      </div>
    </SessionProvider>
  );
}
