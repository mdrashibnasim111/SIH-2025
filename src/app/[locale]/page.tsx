import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Stethoscope, Pill, FileText, Sparkles, Siren } from 'lucide-react';
import {useTranslations, useLocale} from 'next-intl';

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
        {features.map((feature) => (
          <Card key={feature.href} className="flex flex-col justify-between transition-transform hover:scale-105 hover:shadow-lg bg-green-50/50">
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
              <Button asChild variant="ghost" className="mt-4 w-full justify-start p-0 h-auto text-green-600 hover:text-green-600 hover:shadow-neon-green rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                <Link href={`/${locale}${feature.href}`} className='p-2'>
                  {t('checkNow')} <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-green-600/50 bg-green-50/30 transition-colors hover:bg-green-50/80">
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 rounded-full bg-green-100 p-3">
              <Siren className="size-8 text-green-700" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-green-800">{t('emergencyTitle')}</CardTitle>
              <CardDescription className="text-green-700/90">
                {t('emergencyDescription')}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Button asChild variant="outline" className="w-full sm:w-auto bg-green-600 text-white hover:bg-green-700 hover:text-white">
            <Link href={`/${locale}/emergency`}>
              {t('emergencyButton')}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
