
import Link from 'next/link';
import * as React from 'react';
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
  Sparkles,
  Siren,
  Hospital,
  CalendarCheck,
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
      title: t('bookOfflineVisit'),
      description: t('bookOfflineVisitDescription'),
      href: '/offline-booking',
      icon: <CalendarCheck className="size-8 text-primary" />,
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('welcome')}</h1>
        <p className="text-muted-foreground">{t('tagline')}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {features.map(feature => {
          let cardStyle = {};
          if (feature.title === t('findDoctor')) {
            cardStyle = {
              backgroundImage: 'linear-gradient(to bottom, #35C9A7, #134E5E)',
            };
          } else {
            cardStyle = {
              backgroundColor: '#35C9A7',
            };
          }

          const textColor = 'white';
          const icon = React.cloneElement(feature.icon, {
            className: 'size-8 text-white',
          });

          return (
            <Card
              key={feature.href}
              className="flex flex-col justify-between transition-transform hover:scale-105 hover:shadow-neon-primary"
              style={cardStyle}
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  {icon}
                  <div className="flex-1">
                    <CardTitle style={{ color: textColor }}>{feature.title}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription style={{ color: textColor }}>{feature.description}</CardDescription>
                <Button
                  asChild
                  variant="ghost"
                  className="mt-4 w-full justify-start p-0 h-auto text-primary hover:text-primary rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                  style={{ color: textColor, hover: { color: textColor } }}
                >
                  <Link href={`/${locale}${feature.href}`} className="p-2">
                    {t('checkNow')} <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Link href={`/${locale}/aam-aadmi-clinic`} className="group">
        <Card className="border-primary/50 bg-primary/10 transition-all group-hover:bg-primary/20 group-hover:shadow-neon-primary">
           <CardHeader>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 rounded-full bg-primary/10 p-3">
                <Hospital className="size-8 text-primary" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-primary">
                  {t('aamAadmiClinicTitle')}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {t('aamAadmiClinicDescription')}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <span className="flex items-center">
                {t('exploreServices')}
                <ArrowRight className="ml-2 size-4" />
              </span>
            </Button>
          </CardContent>
        </Card>
      </Link>

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
