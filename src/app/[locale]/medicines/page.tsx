
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, Upload, Bell, Truck, Info, CheckCircle, XCircle, Loader2, Store } from "lucide-react";
import Image from "next/image";

const mockMedicines = [
  { 
    name: "Paracetamol 500mg", 
    price: "₹20.50", 
    usage: "For fever and pain relief.", 
    image: 'https://picsum.photos/200/200?random=6', 
    stores: [
      { name: "Janta Medical Store", inStock: true, quantity: 30 },
      { name: "Gupta Pharmacy", inStock: true, quantity: 20 }
    ],
  },
  { 
    name: "Amoxicillin 250mg", 
    price: "₹85.00", 
    usage: "Antibiotic for bacterial infections.", 
    image: 'https://picsum.photos/200/200?random=7', 
    stores: [
        { name: "Nabha Medical Hall", inStock: true, quantity: 25 },
        { name: "Apollo Pharmacy", inStock: false, quantity: 0 }
    ],
  },
  { 
    name: "Cetirizine 10mg", 
    price: "₹30.00", 
    usage: "For allergies and hay fever.", 
    image: 'https://picsum.photos/200/200?random=8', 
    stores: [
        { name: "Janta Medical Store", inStock: false, quantity: 0 },
        { name: "Gupta Pharmacy", inStock: false, quantity: 0 }
    ],
  },
];

type Medicine = typeof mockMedicines[0];

const MedicineCard = ({ med }: { med: Medicine }) => {
    const { toast } = useToast();
    const isAvailableOverall = med.stores.some(s => s.inStock);
    const totalQuantity = med.stores.reduce((acc, store) => acc + store.quantity, 0);

    const handleNotify = (medicineName: string) => {
        toast({
        title: "Notification Set!",
        description: `We'll notify you when ${medicineName} is back in stock.`,
        });
    };

    return (
        <Card key={med.name}>
            <CardHeader className="flex flex-col md:flex-row gap-4">
            <Image src={med.image} alt={med.name} width={100} height={100} className="rounded-md object-cover" data-ai-hint="medicine pill" />
            <div className="flex-1">
                <CardTitle>{med.name}</CardTitle>
                <CardDescription className="font-bold text-lg text-primary">{med.price}</CardDescription>
                {isAvailableOverall ? (
                    <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-200">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        In Stock ({totalQuantity} left)
                    </Badge>
                ) : (
                    <Badge variant="destructive" className="mt-2">
                        <XCircle className="mr-1 h-3 w-3" />
                        Out of Stock
                    </Badge>
                )}
            </div>
            </CardHeader>
            <CardContent>
            <div className="space-y-4">
                <div className="flex items-start gap-2 text-sm">
                <Info className="h-4 w-4 mt-1 shrink-0 text-muted-foreground" />
                <p><span className="font-semibold">Usage:</span> {med.usage}</p>
                </div>
                
                <div className="flex items-start gap-2 text-sm">
                    <Store className="h-4 w-4 mt-1 shrink-0 text-muted-foreground" />
                    <div>
                        <p className="font-semibold">Availability:</p>
                        <div className="mt-2 space-y-2">
                            {med.stores.map(store => (
                                <div key={store.name} className="flex items-center justify-between p-2 rounded-md border">
                                    <span>{store.name}</span>
                                    {store.inStock ? (
                                        <Badge variant="outline" className="text-green-700 border-green-300">
                                            <CheckCircle className="mr-1 h-3 w-3" /> In Stock
                                        </Badge>
                                    ) : (
                                        <Badge variant="destructive" className="bg-red-100 text-red-800">
                                            <XCircle className="mr-1 h-3 w-3" /> Out of Stock
                                        </Badge>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                {isAvailableOverall ? (
                <Button className="w-full sm:w-auto">
                    <Truck className="mr-2 h-4 w-4" /> Request Home Delivery
                </Button>
                ) : (
                <Button variant="outline" className="w-full sm:w-auto" onClick={() => handleNotify(med.name)}>
                    <Bell className="mr-2 h-4 w-4" /> Notify when available
                </Button>
                )}
            </div>
            </CardContent>
        </Card>
    )
}

export default function MedicinesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Medicine[]>([]);
  const [searched, setSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setSearched(false);
      return;
    }
    setIsLoading(true);
    setSearched(false);
    setTimeout(() => {
      const results = mockMedicines.filter((med) =>
        med.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      setSearched(true);
      setIsLoading(false);
    }, 500); // Simulate network delay
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Medicine Availability</h1>
        <p className="text-muted-foreground">Check local pharmacy stock in real-time.</p>
      </div>

      <Tabs defaultValue="search" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="search">Search by Name</TabsTrigger>
          <TabsTrigger value="upload">Upload Prescription</TabsTrigger>
        </TabsList>
        <TabsContent value="search">
          <div className="flex w-full items-center space-x-2">
            <Input
              type="text"
              placeholder="e.g., Paracetamol"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              disabled={isLoading}
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              Search
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="upload">
          <Card>
            <CardContent className="pt-6">
              <Button variant="outline" className="w-full">
                <Upload className="mr-2 h-4 w-4" /> Upload a photo of your prescription
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="space-y-4">
        {searched && searchResults.length === 0 && (
          <Card className="text-center">
            <CardContent className="pt-6">
              <p>No results found for "{searchTerm}".</p>
            </CardContent>
          </Card>
        )}
        {searchResults.map((med) => (
          <MedicineCard key={med.name} med={med} />
        ))}
      </div>
    </div>
  );
}
