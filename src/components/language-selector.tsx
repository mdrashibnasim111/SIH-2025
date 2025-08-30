"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const indianLanguages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी (Hindi)" },
  { code: "bn", name: "বাংলা (Bengali)" },
  { code: "mr", name: "मराठी (Marathi)" },
  { code: "te", name: "తెలుగు (Telugu)" },
  { code: "ta", name: "தமிழ் (Tamil)" },
  { code: "gu", name: "ગુજરાતી (Gujarati)" },
  { code: "ur", name: "اردو (Urdu)" },
  { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
  { code: "or", name: "ଓଡ଼ିଆ (Odia)" },
  { code: "ml", name: "മലയാളം (Malayalam)" },
  { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)" },
  { code: "as", name: "অসমীয়া (Assamese)" },
];

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("LanguageSelector");


  useEffect(() => {
    const lang = localStorage.getItem("user-language");
    if (!lang) {
      setIsOpen(true);
    }
  }, []);

  const handleLanguageSelect = (langCode: string) => {
    localStorage.setItem("user-language", langCode);
    setIsOpen(false);
    
    const newPathname = pathname.startsWith(`/${langCode}`) 
      ? pathname 
      : `/${langCode}${pathname.substring(3)}`;
      
    router.replace(newPathname);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]" hideCloseButton={true}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe /> {t('title')}
          </DialogTitle>
          <DialogDescription>
            {t('description')}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-72 w-full">
            <div className="grid grid-cols-1 gap-2 p-1">
            {indianLanguages.map((lang) => (
                <Button
                key={lang.code}
                variant="outline"
                className="w-full justify-start text-lg py-6"
                onClick={() => handleLanguageSelect(lang.code)}
                >
                {lang.name}
                </Button>
            ))}
            </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
