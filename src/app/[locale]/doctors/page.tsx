
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Stethoscope, Hospital, Clock, Video, CalendarDays, CheckCircle, Building, Star, Check } from "lucide-react";
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
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const doctors = [
  {
    name: "Dr. Md Rashib Nasim",
    specialization: "Cardiologist",
    hospital: "Nabha Civil Hospital",
    availability: "Mon, Wed, Fri (9 AM - 1 PM)",
    days: "3 days a week",
    status: "Available",
    image: "https://picsum.photos/200/200?random=1",
    dataAiHint: "young doctor",
    type: "Government",
    rating: 4.8,
    onlineCheckups: 120,
  },
  {
    name: "Dr. Adiba Fatima",
    specialization: "Pediatrician",
    hospital: "Apollo Clinic, Nabha",
    availability: "Tue, Thu (10 AM - 2 PM)",
    days: "2 days a week",
    status: "Available",
    image: "https://picsum.photos/200/200?random=2",
    dataAiHint: "woman doctor",
    type: "Private",
    rating: 4.9,
    onlineCheckups: 250,
  },
  {
    name: "Dr. Saleheen Manzar",
    specialization: "Dermatologist",
    hospital: "Nabha Skin Center",
    availability: "Mon - Sat (11 AM - 5 PM)",
    days: "6 days a week",
    status: "Unavailable",
    image: "https://picsum.photos/200/200?random=3",
    dataAiHint: "woman doctor",
    type: "Private",
    rating: 4.7,
    onlineCheckups: 80,
  },
  {
    name: "Dr. Mohammad Yusuf",
    specialization: "General Physician",
    hospital: "Nabha Civil Hospital",
    availability: "Mon - Sat (9 AM - 6 PM)",
    days: "6 days a week",
    status: "Available",
    image: "https://picsum.photos/200/200?random=4",
    dataAiHint: "doctor smiling",
    type: "Government",
    rating: 4.6,
    onlineCheckups: 300,
  },
  {
    name: "Dr. Md Nahid Azim",
    specialization: "Gynecologist",
    hospital: "Reddy Maternity Home",
    availability: "By Appointment",
    days: "On-call",
    status: "Unavailable",
    image: "https://picsum.photos/200/200?random=5",
    dataAiHint: "female doctor",
    type: "Private",
    rating: 4.8,
    onlineCheckups: 150,
  },
];

const sortLogic = (a: any, b: any) => {
  if (a.status === "Available" && b.status !== "Available") return -1;
  if (a.status !== "Available" && b.status === "Available") return 1;
  return 0;
};

const governmentDoctors = doctors.filter(d => d.type === "Government").sort(sortLogic);
const privateDoctors = doctors.filter(d => d.type === "Private").sort(sortLogic);

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
            <Hospital className="h-4 w-4 text-primary/70" /> {doctor.hospital}
          </p>
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
        <AlertDialogContent className="max-h-[90vh] overflow-y-auto">
          <AlertDialogHeader>
            <AlertDialogTitle>Complete Your Consultation</AlertDialogTitle>
            <AlertDialogDescription>
              The consultation fee is ₹500. Please select a payment method to proceed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="upi">
                <AccordionTrigger>UPI</AccordionTrigger>
                <AccordionContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                        <Image src="https://picsum.photos/id/13/20/20" width={20} height={20} alt="gpay" className="mr-2" data-ai-hint="gpay logo" />
                        GPay
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                        <Image src="https://picsum.photos/id/14/20/20" width={20} height={20} alt="phonepe" className="mr-2" data-ai-hint="phonepe logo" />
                        PhonePe
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                        <Image src="https://picsum.photos/id/15/20/20" width={20} height={20} alt="paytm" className="mr-2" data-ai-hint="paytm logo" />
                        Paytm
                    </Button>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="card">
                <AccordionTrigger>Credit/Debit Card</AccordionTrigger>
                <AccordionContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input id="card-number" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry</Label>
                            <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" />
                        </div>
                    </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="netbanking">
                <AccordionTrigger>Net Banking</AccordionTrigger>
                <AccordionContent>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Bank" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="sbi">State Bank of India</SelectItem>
                            <SelectItem value="hdfc">HDFC Bank</SelectItem>
                            <SelectItem value="icici">ICICI Bank</SelectItem>
                            <SelectItem value="axis">Axis Bank</SelectItem>
                            <SelectItem value="pnb">Punjab National Bank</SelectItem>
                        </SelectContent>
                    </Select>
                </AccordionContent>
              </AccordionItem>
               <AccordionItem value="wallet">
                <AccordionTrigger>Pay through wallet</AccordionTrigger>
                <AccordionContent className="space-y-2">
                   <Button variant="outline" className="w-full justify-start">
                        <Image src="https://picsum.photos/id/15/20/20" width={20} height={20} alt="paytm wallet" className="mr-2" data-ai-hint="paytm logo" />
                        Paytm Wallet
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                        <Image src="https://picsum.photos/id/20/20/20" width={20} height={20} alt="amazon pay" className="mr-2" data-ai-hint="amazon logo" />
                        Amazon Pay
                    </Button>
                     <Button variant="outline" className="w-full justify-start">
                        <Image src="https://picsum.photos/id/18/20/20" width={20} height={20} alt="mobikwik" className="mr-2" data-ai-hint="mobikwik logo" />
                        MobiKwik
                    </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Pay and Start Call</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CardContent>
  </Card>
)

export default function DoctorsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Find a Doctor</h1>
        <p className="text-muted-foreground">
          Browse specialists and book video consultations.
        </p>
      </div>

      <Tabs defaultValue="government" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="government">
            <Building className="mr-2 h-4 w-4" />
            Government Hospitals
          </TabsTrigger>
          <TabsTrigger value="private">
            <Building className="mr-2 h-4 w-4" />
            Private Hospitals & Clinics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="government">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-4">
            {governmentDoctors.map((doctor) => (
              <DoctorCard key={doctor.name} doctor={doctor} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="private">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pt-4">
            {privateDoctors.map((doctor) => (
              <DoctorCard key={doctor.name} doctor={doctor} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
