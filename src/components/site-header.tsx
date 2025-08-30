"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, HeartPulse } from "lucide-react";
import { NavLinks } from "@/components/site-sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "en";
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="container flex h-14 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col p-0">
            <div className="flex h-16 items-center border-b px-4">
              <Link href={`/${locale}`} className="flex items-center gap-2 font-bold">
                <HeartPulse className="h-6 w-6 text-primary" />
                <span className="font-bold">NabhaCare</span>
              </Link>
            </div>
            <nav className="flex-1 space-y-2 p-4">
              <NavLinks />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
