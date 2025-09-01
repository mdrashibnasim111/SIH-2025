import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Stethoscope, Clock, Video, CalendarDays, CheckCircle, Star, Check } from "lucide-react";
import Image from "next/image";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTranslations } from "next-intl";


const doctors = [
  {
    name: "Dr. Amanpreet Kaur",
    specialization: "General Physician",
    availability: "Mon - Sat (9 AM - 5 PM)",
    days: "6 days a week",
    status: "Available",
    image: "https://picsum.photos/200/200?random=10",
    dataAiHint: "young doctor smiling",
    rating: 4.7,
    onlineCheckups: 150,
  },
  {
    name: "Dr. Balwinder Singh",
    specialization: "General Physician",
    availability: "Mon, Wed, Fri (10 AM - 4 PM)",
    days: "3 days a week",
    status: "Available",
    image: "https://picsum.photos/200/200?random=11",
    dataAiHint: "male doctor",
    rating: 4.6,
    onlineCheckups: 95,
  },
  {
    name: "Dr. Sunita Sharma",
    specialization: "General Physician",
    availability: "Tue, Thu (9 AM - 1 PM)",
    days: "2 days a week",
    status: "Unavailable",
    image: "https://picsum.photos/200/200?random=12",
    dataAiHint: "female doctor serious",
    rating: 4.8,
    onlineCheckups: 200,
  },
];

const sortLogic = (a: any, b: any) => {
  if (a.status === "Available" && b.status !== "Available") return -1;
  if (a.status !== "Available" && b.status === "Available") return 1;
  return 0;
};

const sortedDoctors = doctors.sort(sortLogic);

const DoctorCard = ({ doctor }: { doctor: typeof doctors[0] }) => (
  <Card key={doctor.name} className="flex flex-col">
    <CardHeader className="flex flex-row items-center gap-4">
      <Image
        src={doctor.image}
        alt={`Photo of ${doctor.name}`}
        width={80}
        height={80}
        className="rounded-full"
        data-ai-hint={doctor.dataAiHint}
      />
      <div className="flex-1">
        <CardTitle className="whitespace-normal">{doctor.name}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Stethoscope className="h-4 w-4" />
          {doctor.specialization}
        </CardDescription>
        <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold">{doctor.rating}</span>
            </div>
            <div className="flex items-center gap-1">
                <Check className="h-4 w-4 text-green-500" />
                <span className="font-semibold">{doctor.onlineCheckups}+</span>
                <span className="text-xs">Consultations</span>
            </div>
        </div>
      </div>
    </CardHeader>
    <CardContent className="flex flex-1 flex-col justify-between">
      <div>
        <div className="mb-4 space-y-2 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary/70" /> {doctor.availability}
          </p>
          <p className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary/70" /> {doctor.days}
          </p>
        </div>
        {doctor.status === 'Available' ? (
          <Badge className="bg-green-600/10 text-green-700 shadow-neon-green hover:bg-green-600/20">
            <CheckCircle className="mr-1 h-3 w-3" />
            {doctor.status}
          </Badge>
        ) : (
          <Badge variant="outline">{doctor.status}</Badge>
        )}
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className="mt-4 w-full"
            disabled={doctor.status !== "Available"}
          >
            <Video className="mr-2 h-4 w-4" />
            Consult Now
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Book Appointment</AlertDialogTitle>
            <AlertDialogDescription>
              Appointments at Aam Aadmi Clinics are free of charge. Please confirm to book your slot.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Confirm Appointment</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CardContent>
  </Card>
)

export default function AamAadmiClinicDoctorsPage() {
    const t = useTranslations("AamAadmiClinic");
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('doctorsAtClinicTitle')}</h1>
        <p className="text-muted-foreground">
          {t('doctorsAtClinicDescription')}
        </p>
      </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-4">
        {sortedDoctors.map((doctor) => (
            <DoctorCard key={doctor.name} doctor={doctor} />
        ))}
        </div>
    </div>
  );
}
