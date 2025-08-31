import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Stethoscope,
  Pill,
  FileText,
  Sparkles,
  Siren,
} from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export default function DashboardPage() {
  const t = useTranslations('Dashboard');
  const locale = useLocale();

  const features = [
    {
      title: t('findDoctor'),
      description: t('findDoctorDescription'),
      href: '/doctors',
      icon: <Stethoscope className="size-8 text-primary" />,
    },
    {
      title: t('checkMedicines'),
      description: t('checkMedicinesDescription'),
      href: '/medicines',
      icon: <Pill className="size-8 text-primary" />,
    },
    {
      title: t('aiSymptomChecker'),
      description: t('aiSymptomCheckerDescription'),
      href: '/symptom-checker',
      icon: <Sparkles className="size-8 text-primary" />,
    },
    {
      title: t('healthRecords'),
      description: t('healthRecordsDescription'),
      href: '/records',
      icon: <FileText className="size-8 text-primary" />,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('welcome')}</h1>
        <p className="text-muted-foreground">{t('tagline')}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(feature => (
          <Card
            key={feature.href}
            className="flex flex-col justify-between transition-transform hover:scale-105 hover:shadow-neon-primary"
          >
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
                <Link href={`/${locale}${feature.href}`} className="p-2">
                  {t('checkNow')} <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Link href={`/${locale}/emergency`} className="group">
        <Card className="border-destructive/50 bg-destructive/10 transition-all group-hover:bg-destructive/20 group-hover:shadow-neon-destructive">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 rounded-full bg-destructive/10 p-3">
                <Siren className="size-8 text-destructive" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-destructive">
                  {t('emergencyTitle')}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {t('emergencyDescription')}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" asChild>
              <span className="flex items-center">
                {t('emergencyButton')}
                <ArrowRight className="ml-2 size-4" />
              </span>
            </Button>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
