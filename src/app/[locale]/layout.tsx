import type { Metadata } from "next";
import "../globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { SiteSidebar } from "@/components/site-sidebar";
import { SiteHeader } from "@/components/site-header";
import { LanguageSelector } from "@/components/language-selector";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

export const metadata: Metadata = {
  title: "NabhaCare Connect",
  description: "Telemedicine Access for Rural Healthcare in Nabha.",
};

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <LanguageSelector />
      <div className="relative flex min-h-screen">
        <SiteSidebar />
        <div className="flex flex-1 flex-col md:ml-48">
          <SiteHeader />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
      <Toaster />
    </NextIntlClientProvider>
  );
}
