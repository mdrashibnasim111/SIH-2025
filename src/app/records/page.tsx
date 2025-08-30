import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileText, WifiOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const healthRecords = [
  {
    name: "Annual Check-up Report",
    date: "2024-05-20",
    type: "Lab Report",
  },
  {
    name: "Dr. Sharma Consultation Notes",
    date: "2024-05-15",
    type: "Consultation",
  },
  {
    name: "X-Ray: Left Wrist",
    date: "2024-04-30",
    type: "Imaging",
  },
  {
    name: "Blood Pressure Log",
    date: "2024-04-01",
    type: "Vitals",
  },
];

export default function RecordsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Health Records</h1>
        <p className="text-muted-foreground">
          View and manage your past consultations and reports.
        </p>
      </div>

      <Card className="bg-primary-foreground/50 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <WifiOff className="h-5 w-5 text-primary" />
            <CardTitle>Offline Access Enabled</CardTitle>
          </div>
          <CardDescription>
            Your health records are securely stored on this device for access even without an internet connection.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {healthRecords.map((record) => (
                <TableRow key={record.name}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {record.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{record.type}</Badge>
                  </TableCell>
                  <TableCell>{record.date}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
