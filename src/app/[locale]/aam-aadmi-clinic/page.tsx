import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, Pill, FlaskConical, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function AamAadmiClinicPage() {
  const t = useTranslations("AamAadmiClinic");
  const locale = useLocale();

  const clinicFeatures = [
    {
      title: t('doctorsTitle'),
      description: t('doctorsDescription'),
      href: `/${locale}/doctors`,
      icon: <Stethoscope className="size-8 text-primary" />,
    },
    {
      title: t('medicinesTitle'),
      description: t('medicinesDescription'),
      href: `/${locale}/medicines`,
      icon: <Pill className="size-8 text-primary" />,
    },
    {
      title: t('testsTitle'),
      description: t('testsDescription'),
      href: "#", // This can be updated when a tests page is available
      icon: <FlaskConical className="size-8 text-primary" />,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('pageTitle')}</h1>
        <p className="text-muted-foreground">
          {t('pageDescription')}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {clinicFeatures.map((feature) => (
          <Card key={feature.title} className="flex flex-col justify-between transition-transform hover:scale-105 hover:shadow-neon-primary">
            <CardHeader>
               <div className="flex items-center gap-4">
                {feature.icon}
                <div className="flex-1">
                  <CardTitle>{feature.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
               <Button
                asChild
                variant="ghost"
                className="mt-4 w-full justify-start p-0 h-auto text-primary hover:text-primary rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
              >
                <Link href={feature.href} className="p-2">
                  {t('learnMore')} <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
