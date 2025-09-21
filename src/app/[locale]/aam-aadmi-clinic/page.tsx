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
      href: `/${locale}/aam-aadmi-clinic/doctors`,
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

      <div className="space-y-4">
        {clinicFeatures.map((feature) => (
          <Link href={feature.href} key={feature.title} className="group block">
            <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-neon-primary">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="flex-shrink-0">{feature.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-1 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
                <div className="flex items-center text-primary transition-transform duration-300 ease-in-out group-hover:translate-x-1">
                  <span className="font-semibold">{t('learnMore')}</span>
                  <ArrowRight className="ml-2 size-5" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
