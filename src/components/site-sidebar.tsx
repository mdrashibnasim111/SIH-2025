"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Stethoscope,
  Pill,
  FileText,
  Sparkles,
  Siren,
  HeartPulse,
} from "lucide-react";

const links = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Doctors", href: "/doctors", icon: Stethoscope },
  { name: "Medicines", href: "/medicines", icon: Pill },
  { name: "Symptom Checker", href: "/symptom-checker", icon: Sparkles },
  { name: "Health Records", href: "/records", icon: FileText },
  { name: "Emergency", href: "/emergency", icon: Siren },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => (
        <Button
          key={link.name}
          asChild
          variant={pathname === link.href ? "secondary" : "ghost"}
          className="w-full justify-start"
        >
          <Link href={link.href}>
            <link.icon className="mr-2 h-4 w-4" />
            {link.name}
          </Link>
        </Button>
      ))}
    </>
  );
}

export function SiteSidebar() {
  return (
    <aside className="fixed top-0 left-0 z-50 hidden h-screen w-64 flex-col border-r bg-background md:flex">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <HeartPulse className="h-6 w-6 text-primary" />
          <span className="font-bold">NabhaCare</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        <NavLinks />
      </nav>
    </aside>
  );
}
