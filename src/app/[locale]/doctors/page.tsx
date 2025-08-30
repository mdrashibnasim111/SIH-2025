import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Stethoscope, Hospital, Clock, Video, ShieldAlert } from "lucide-react";
import Image from "next/image";

const doctors = [
  {
    name: "Dr. Md Rashib Nasim",
    specialization: "Cardiologist",
    hospital: "Nabha Civil Hospital",
    availability: "Mon, Wed, Fri (9 AM - 1 PM)",
    status: "Available",
    image: "https://picsum.photos/200/200?random=10",
    dataAiHint: "man doctor"
  },
  {
    name: "Dr. Adiba Fatima",
    specialization: "Pediatrician",
    hospital: "Apollo Clinic, Nabha",
    availability: "Tue, Thu (10 AM - 2 PM)",
    status: "Available",
    image: "https://picsum.photos/200/200?random=2",
    dataAiHint: "woman doctor"
  },
  {
    name: "Dr. Priya Kaur",
    specialization: "Dermatologist",
    hospital: "Nabha Skin Center",
    availability: "Mon - Sat (11 AM - 5 PM)",
    status: "Unavailable",
    image: "https://picsum.photos/200/200?random=3",
    dataAiHint: "woman doctor"
  },
  {
    name: "Dr. Ramesh Gupta",
    specialization: "General Physician",
    hospital: "Nabha Civil Hospital",
    availability: "Mon - Sat (9 AM - 6 PM)",
    status: "Available",
    image: "https://picsum.photos/200/200?random=4",
    dataAiHint: "doctor smiling"
  },
  {
    name: "Dr. Sunita Reddy",
    specialization: "Gynecologist",
    hospital: "Reddy Maternity Home",
    availability: "By Appointment",
    status: "Unavailable",
    image: "https://picsum.photos/200/200?random=5",
    dataAiHint: "female doctor"
  },
];

const sortedDoctors = [...doctors].sort((a, b) => {
  if (a.status === "Available" && b.status !== "Available") return -1;
  if (a.status !== "Available" && b.status === "Available") return 1;
  return 0;
});

export default function DoctorsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Find a Doctor</h1>
        <p className="text-muted-foreground">
          Browse specialists and book video consultations.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedDoctors.map((doctor) => (
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
                <CardTitle>{doctor.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Stethoscope className="h-4 w-4" />
                  {doctor.specialization}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between">
              <div>
                <div className="mb-4 space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Hospital className="h-4 w-4 text-primary/70" /> {doctor.hospital}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary/70" /> {doctor.availability}
                  </p>
                </div>
                <Badge variant={doctor.status === "Available" ? "default" : "outline"}
                    className={doctor.status === "Available" ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'}
                >
                  {doctor.status}
                </Badge>
              </div>
              <Button
                className="mt-4 w-full"
                disabled={doctor.status !== "Available"}
              >
                <Video className="mr-2 h-4 w-4" />
                Consult Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
