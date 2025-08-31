import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hospital, Pill } from "lucide-react";

export default function MapPage() {
  const hospitalMapUrl = "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d27557.23350919106!2d76.1423851945391!3d30.37000558436035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1shospital%20near%20Nabha%2C%20Punjab!5e0!3m2!1sen!2sin!4v1719321289654!5m2!1sen!2sin";
  const medicalShopsMapUrl = "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d27557.03964245645!2d76.1423851945391!3d30.37086888435862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1smedical%20store%20near%20Nabha%2C%20Punjab!5e0!3m2!1sen!2sin!4v1719234512345!5m2!1sen!2sin";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Locations</h1>
        <p className="text-muted-foreground">
          Find the way to the nearest hospitals and medical shops.
        </p>
      </div>

      <Tabs defaultValue="hospitals" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="hospitals">
            <Hospital className="mr-2 h-4 w-4" />
            Hospitals
          </TabsTrigger>
          <TabsTrigger value="medical_shops">
            <Pill className="mr-2 h-4 w-4" />
            Medical Shops
          </TabsTrigger>
        </TabsList>
        <TabsContent value="hospitals">
            <p className="text-sm text-muted-foreground mb-4">
                This map shows hospitals in and around Nabha. The nearest one is highlighted.
            </p>
            <div className="aspect-video w-full overflow-hidden rounded-lg border">
                <iframe
                src={hospitalMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </TabsContent>
        <TabsContent value="medical_shops">
            <p className="text-sm text-muted-foreground mb-4">
                This map shows medical shops located in and around Nabha.
            </p>
            <div className="aspect-video w-full overflow-hidden rounded-lg border">
                <iframe
                src={medicalShopsMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
