'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { ChevronDownIcon, CpuIcon, ServerIcon, NetworkIcon, DatabaseIcon, MenuIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { apiEndpoints, systemMetrics, statusConfig } from '~/lib/constants';
import { LoginButton } from '~/components/auth/loginButton';
import { UserButton } from '~/components/auth/userButton';
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Poppins } from "next/font/google";
import { motion } from 'framer-motion';
import { cn } from "~//lib/utils";
import Link from 'next/link';

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export default function Home() {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={cn("min-h-screen flex flex-col", font.className)}>
      <nav
        className={cn(
          "fixed w-full z-50 transition-all duration-300",
          isScrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-primary">
              template
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              <NavLink href="/about">About</NavLink>
              <NavLink href="/contact">Contact</NavLink>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center">
                    More <ChevronDownIcon className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href="/faq" className="w-full">FAQ</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/support" className="w-full">Support</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {session ? (
                <UserButton />
              ) : (
                <LoginButton asChild mode="modal">
                  <Button variant="secondary" size="lg">
                    Sign in
                  </Button>
                </LoginButton>
              )}
            </div>
            <Button variant="ghost" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <MenuIcon className="h-6 w-6" />
            </Button>
          </div>
        </div>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white shadow-lg rounded-b-lg mx-4 mt-2"
          >
            <div className="flex flex-col space-y-2 p-4">
              <NavLink href="/about" mobile>About</NavLink>
              <NavLink href="/contact" mobile>Contact</NavLink>
              <NavLink href="/faq" mobile>FAQ</NavLink>
              <NavLink href="/support" mobile>Support</NavLink>
              {session ? (
                <UserButton />
              ) : (
                <LoginButton asChild mode="modal">
                  <Button variant="secondary" size="lg" className="w-full">
                    Sign in
                  </Button>
                </LoginButton>
              )}
            </div>
          </motion.div>
        )}
      </nav>

      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-4xl font-bold mb-6">System Status</h1>

          {/* System Metrics */}
          <h2 className="text-2xl font-semibold mb-4">System Metrics</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
            {systemMetrics.map((metric) => (
              <Card key={metric.name} className="mx-2 sm:mx-4 lg:mx-6">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                  {metric.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* API Status */}
          <h2 className="text-2xl font-semibold mb-4">API Status</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {apiEndpoints.map((endpoint) => (
              <Card key={endpoint.name} className="mx-2 sm:mx-4 lg:mx-6">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {endpoint.name}
                    <Badge variant="outline" className={`${statusConfig[endpoint.status].color} text-white`}>
                      {statusConfig[endpoint.status].icon}
                      <span className="ml-1">{statusConfig[endpoint.status].label}</span>
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Latency: {endpoint.status === "down" ? "N/A" : `${endpoint.latency}ms`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">
                    {endpoint.status === "operational" && "All systems are functioning normally."}
                    {endpoint.status === "issues" && "We're experiencing some issues. Our team is investigating."}
                    {endpoint.status === "down" && "This service is currently unavailable. We're working on a fix."}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
}

function NavLink({ href, children, mobile = false }: NavLinkProps) {
  return (
    <Link href={href}>
      <Button
        variant="ghost"
        className={cn(
          "relative group",
          mobile && "w-full justify-start"
        )}
      >
        {children}
        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
      </Button>
    </Link>
  );
}
