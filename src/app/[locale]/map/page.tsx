import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export default function MapPage() {
  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d13778.60155280962!2d76.1473215888204!3d30.30403562386345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x3910651c59ccb2b1%3A0xe54d894b59569766!2sNabha%20Bus%20Stand%2C%20Nabha%2C%20Punjab%20147201!3m2!1d30.3695287!2d76.1517515!4m5!1s0x391065b91b98f24b%3A0x6b5390977a493cf3!2sCivil%20Hospital%2C%20Circular%20Rd%2C%20Pandusar%20Mohalla%2C%20Nabha%2C%20Punjab%20147201!3m2!1d30.3752531!2d76.1554985!5e0!3m2!1sen!2sin!4v1718884940561!5m2!1sen!2sin";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Hospital Route</h1>
        <p className="text-muted-foreground">
          Find the way to the nearest hospital.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <CardTitle>Route to Nabha Civil Hospital</CardTitle>
          </div>
          <CardDescription>
            This map shows the route from Nabha Bus Stand to Nabha Civil Hospital.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-video w-full overflow-hidden rounded-lg border">
            <iframe
              src={googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
