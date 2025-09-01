"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Stethoscope,
  Pill,
  Sparkles,
  Siren,
  HeartPulse,
  Map,
  User,
  Hospital,
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
} from "lucide-react";
import { useTranslations } from "next-intl";

export function NavLinks() {
  const pathname = usePathname();
  const t = useTranslations("NavLinks");

  const links = [
    { name: t("Dashboard"), href: "/", icon: LayoutDashboard },
    { name: t("AamAadmiClinic"), href: "/aam-aadmi-clinic", icon: Hospital },
    { name: t("Doctors"), href: "/doctors", icon: Stethoscope },
    { name: t("Medicines"), href: "/medicines", icon: Pill },
    { name: t("SymptomChecker"), href: "/symptom-checker", icon: Sparkles },
    { name: t("PatientDetails"), href: "/patient-details", icon: User },
    { name: t("OfflineBooking"), href: "/offline-booking", icon: CalendarCheck },
    { name: t("Map"), href: "/map", icon: Map },
    { name: t("Emergency"), href: "/emergency", icon: Siren },
  ];

  const locale = pathname.split("/")[1] || "en";
  const activePath = pathname.substring(pathname.indexOf(locale) + locale.length) || "/";


  return (
    <>
      {links.map((link) => {
        const isActive = activePath === link.href;
        const localizedHref = `/${locale}${link.href === "/" ? "" : link.href}`;

        return (
          <Button
            key={link.name}
            asChild
            variant={isActive ? "default" : "ghost"}
            className="w-full justify-start"
          >
            <Link href={localizedHref}>
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
  const pathname = usePathname();
  const router = useRouter();
  const locale = pathname.split("/")[1] || "en";

  return (
    <aside className="fixed top-0 left-0 z-50 hidden h-screen w-48 flex-col border-r bg-background md:flex">
      <div className="flex h-16 items-center border-b px-4 justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2 font-bold">
          <HeartPulse className="h-6 w-6 text-primary" />
          <span className="font-bold">NabhaCare</span>
        </Link>
      </div>
      <div className="flex items-center justify-between p-2 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">Go back</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={() => router.forward()}>
          <ArrowRight className="h-4 w-4" />
          <span className="sr-only">Go forward</span>
        </Button>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        <NavLinks />
      </nav>
    </aside>
  );
}
