import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User, Calendar, Phone, Home } from "lucide-react";

export default function PatientDetailsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Patient Details</h1>
        <p className="text-muted-foreground">
          Manage your personal and medical information.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Please keep your personal details up to date.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center"><User className="mr-2 h-4 w-4" /> Full Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dob" className="flex items-center"><Calendar className="mr-2 h-4 w-4" /> Date of Birth</Label>
              <Input id="dob" type="date" defaultValue="1990-01-01" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="flex items-center">Gender</Label>
            <RadioGroup defaultValue="male" className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center"><Phone className="mr-2 h-4 w-4" /> Contact Number</Label>
                <Input id="phone" type="tel" defaultValue="+91 12345 67890" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center"><Home className="mr-2 h-4 w-4" /> Address</Label>
                <Input id="address" defaultValue="123, Main Street, Nabha, Punjab" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Medical Information</CardTitle>
            <CardDescription>This information will be shared with your consulting doctor.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="allergies">Allergies</Label>
              <Textarea id="allergies" placeholder="e.g., Peanuts, Penicillin" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="medications">Current Medications</Label>
              <Textarea id="medications" placeholder="e.g., Paracetamol 500mg, twice a day" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="history">Past Medical History</Label>
              <Textarea id="history" placeholder="e.g., Hypertension diagnosed in 2020" />
            </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
          <Button>Save Changes</Button>
      </div>

    </div>
  );
}
