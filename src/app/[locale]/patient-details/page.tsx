"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, User, Stethoscope, Calendar, Pill, Clock, Download, ClipboardList } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock data for prescription details
const mockPrescription = {
  id: "PRES12345",
  patientName: "John Doe",
  doctorName: "Dr. Md Rashib Nasim",
  consultationDate: "2024-07-15",
  medicines: [
    { name: "Paracetamol 500mg", dosage: "1 tablet", frequency: "3 times a day", duration: "5 days", timing: "After meals" },
    { name: "Amoxicillin 250mg", dosage: "1 capsule", frequency: "Twice a day", duration: "7 days", timing: "After meals" },
    { name: "Cetirizine 10mg", dosage: "1 tablet", frequency: "Once at night", duration: "10 days", timing: "Before sleeping" },
  ],
  timetable: [
      { time: "Morning", medicine: "Paracetamol, Amoxicillin" },
      { time: "Afternoon", medicine: "Paracetamol" },
      { time: "Night", medicine: "Paracetamol, Amoxicillin, Cetirizine" },
  ],
  tests: [
    { name: "Complete Blood Count (CBC)", reportUrl: "#" },
    { name: "Fasting Blood Sugar", reportUrl: "#" }
  ]
};

type Prescription = typeof mockPrescription | null;

export default function PatientDetailsPage() {
  const [prescriptionId, setPrescriptionId] = useState("");
  const [prescriptionDetails, setPrescriptionDetails] = useState<Prescription>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    setSearched(true);
    if (prescriptionId.toUpperCase() === mockPrescription.id) {
      setPrescriptionDetails(mockPrescription);
    } else {
      setPrescriptionDetails(null);
    }
  };


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Prescription Details</h1>
        <p className="text-muted-foreground">
          Enter your prescription number to view the details.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Find Your Prescription</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex w-full items-center space-x-2">
            <div className="flex-1">
              <Label htmlFor="prescriptionId" className="sr-only">Prescription Number</Label>
              <Input 
                id="prescriptionId" 
                placeholder="Enter Prescription Number (e.g., PRES12345)"
                value={prescriptionId}
                onChange={(e) => setPrescriptionId(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {searched && !prescriptionDetails && (
        <Alert variant="destructive">
          <AlertTitle>Not Found</AlertTitle>
          <AlertDescription>
            No prescription found for the number "{prescriptionId}". Please check the number and try again.
          </AlertDescription>
        </Alert>
      )}

      {prescriptionDetails && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Consultation Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
               <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-muted-foreground">Patient Name</p>
                    <p className="font-semibold">{prescriptionDetails.patientName}</p>
                  </div>
              </div>
               <div className="flex items-center gap-3">
                  <Stethoscope className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-muted-foreground">Consulting Doctor</p>
                    <p className="font-semibold">{prescriptionDetails.doctorName}</p>
                  </div>
              </div>
               <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-muted-foreground">Date of Consultation</p>
                    <p className="font-semibold">{prescriptionDetails.consultationDate}</p>
                  </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Pill className="h-5 w-5" /> Prescribed Medicines</CardTitle>
              <CardDescription>Duration of complete course and instructions for each medicine.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medicine</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Timing</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prescriptionDetails.medicines.map((med) => (
                    <TableRow key={med.name}>
                      <TableCell className="font-medium">{med.name}</TableCell>
                      <TableCell>{med.dosage}</TableCell>
                      <TableCell>{med.frequency}</TableCell>
                      <TableCell>{med.duration}</TableCell>
                      <TableCell>{med.timing}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" /> Medicine Timetable</CardTitle>
              <CardDescription>Your daily schedule for taking medicines.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time of Day</TableHead>
                    <TableHead>Medicines to Take</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prescriptionDetails.timetable.map((item) => (
                    <TableRow key={item.time}>
                      <TableCell className="font-medium">{item.time}</TableCell>
                      <TableCell>{item.medicine}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ClipboardList className="h-5 w-5" /> Diagnostic Tests</CardTitle>
              <CardDescription>Tests prescribed by the doctor and their reports.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Test Name</TableHead>
                      <TableHead className="text-right">Report</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {prescriptionDetails.tests.map((test) => (
                      <TableRow key={test.name}>
                        <TableCell className="font-medium">{test.name}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <a href={test.reportUrl} target="_blank" rel="noopener noreferrer">
                              <Download className="mr-2 h-4 w-4" />
                              View Report
                            </a>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
              </Table>
            </CardContent>
          </Card>

        </div>
      )}
    </div>
  );
}
