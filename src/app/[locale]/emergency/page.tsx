"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Siren, PhoneCall, ShieldAlert } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function EmergencyPage() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="text-center">
        <Siren className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-primary">
          Emergency Service
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Request a doctor for a home visit in a critical situation.
        </p>
      </div>

      <Alert variant="destructive">
        <ShieldAlert className="h-4 w-4" />
        <AlertTitle>For Critical Emergencies Only</AlertTitle>
        <AlertDescription>
          This service has limited availability and is reserved for patients
          who are unable to travel and in severe condition. Misuse may result in penalties.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>When to use this service:</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
            <li>Severe breathing difficulty</li>
            <li>Unconsciousness or unresponsiveness</li>
            <li>Severe injury or bleeding</li>
            <li>Inability to move or stand</li>
          </ul>
        </CardContent>
      </Card>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="lg" className="w-full text-lg py-8">
            <PhoneCall className="mr-4 h-6 w-6" />
            Request Emergency Visit
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Emergency Request</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to request an emergency doctor visit to your location. Please confirm this is a genuine medical emergency.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Confirm and Request</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  );
}
