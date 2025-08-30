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
import { useTranslations } from "next-intl";

export function NavLinks() {
  const pathname = usePathname();
  const t = useTranslations("NavLinks");

  const links = [
    { name: t("Dashboard"), href: "/", icon: LayoutDashboard },
    { name: t("Doctors"), href: "/doctors", icon: Stethoscope },
    { name: t("Medicines"), href: "/medicines", icon: Pill },
    { name: t("SymptomChecker"), href: "/symptom-checker", icon: Sparkles },
    { name: t("HealthRecords"), href: "/records", icon: FileText },
    { name: t("Emergency"), href: "/emergency", icon: Siren },
  ];

  return (
    <>
      {links.map((link) => {
        // Remove the locale from the pathname for comparison
        const activePath = pathname.split('/').slice(2).join('/');
        const isActive = (link.href === '/' && (activePath === '' || activePath === 'page')) || (link.href !== '/' && activePath.startsWith(link.href.substring(1)));

        return (
          <Button
            key={link.name}
            asChild
            variant={isActive ? "secondary" : "ghost"}
            className="w-full justify-start"
          >
            <Link href={link.href}>
              <link.icon className="mr-2 h-4 w-4" />
              {link.name}
            </Link>
          </Button>
        );
      })}
    </>
  );
}

export function SiteSidebar() {
  return (
    <aside className="fixed top-0 left-0 z-50 hidden h-screen w-48 flex-col border-r bg-background md:flex">
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
