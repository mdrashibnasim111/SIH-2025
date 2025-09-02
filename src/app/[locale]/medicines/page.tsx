

"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, Upload, Bell, Truck, Info, CheckCircle, XCircle, Loader2, Store, MapPin, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator";


const mockMedicines = [
  // Existing
  {
    name: "Paracetamol 500mg",
    price: "₹20.50",
    usage: "For fever and pain relief.",
    image: 'https://picsum.photos/200/200?random=6',
    stores: [
      { name: "Janta Medical Store", inStock: true, quantity: 30, location: "Near Bus Stand" },
      { name: "Gupta Pharmacy", inStock: true, quantity: 20, location: "Main Bazaar" }
    ],
  },
  {
    name: "Amoxicillin 250mg",
    price: "₹85.00",
    usage: "Antibiotic for bacterial infections.",
    image: 'https://picsum.photos/200/200?random=7',
    stores: [
      { name: "Nabha Medical Hall", inStock: true, quantity: 25, location: "Patiala Gate" },
      { name: "Apollo Pharmacy", inStock: false, quantity: 0, location: "Opposite Civil Hospital" }
    ],
  },
  {
    name: "Cetirizine 10mg",
    price: "₹30.00",
    usage: "For allergies and hay fever.",
    image: 'https://picsum.photos/200/200?random=8',
    stores: [
      { name: "Janta Medical Store", inStock: false, quantity: 0, location: "Near Bus Stand" },
      { name: "Gupta Pharmacy", inStock: false, quantity: 0, location: "Main Bazaar" }
    ],
  },
  // Added
  {
    name: "Aspirin 75mg",
    price: "₹10.00",
    usage: "Blood thinner, pain relief.",
    image: 'https://picsum.photos/200/200?random=50',
    stores: [
        { name: "Janta Medical Store", inStock: true, quantity: 100, location: "Near Bus Stand" },
        { name: "Gupta Pharmacy", inStock: true, quantity: 50, location: "Main Bazaar" }
    ],
  },
  {
    name: "Atorvastatin 10mg",
    price: "₹55.00",
    usage: "Lowers cholesterol.",
    image: 'https://picsum.photos/200/200?random=51',
    stores: [
        { name: "Nabha Medical Hall", inStock: true, quantity: 40, location: "Patiala Gate" },
        { name: "Apollo Pharmacy", inStock: true, quantity: 30, location: "Opposite Civil Hospital" }
    ],
  },
  {
    name: "Azithromycin 500mg",
    price: "₹115.00",
    usage: "Antibiotic for bacterial infections.",
    image: 'https://picsum.photos/200/200?random=52',
    stores: [
        { name: "Janta Medical Store", inStock: false, quantity: 0, location: "Near Bus Stand" },
        { name: "Gupta Pharmacy", inStock: true, quantity: 15, location: "Main Bazaar" }
    ],
  },
  {
    name: "Brufen 400mg",
    price: "₹15.00",
    usage: "Pain relief, anti-inflammatory.",
    image: 'https://picsum.photos/200/200?random=53',
    stores: [
        { name: "Janta Medical Store", inStock: true, quantity: 80, location: "Near Bus Stand" },
        { name: "Nabha Medical Hall", inStock: true, quantity: 60, location: "Patiala Gate" }
    ],
  },
  {
    name: "Bisoprolol 2.5mg",
    price: "₹40.00",
    usage: "For high blood pressure.",
    image: 'https://picsum.photos/200/200?random=54',
    stores: [
        { name: "Apollo Pharmacy", inStock: true, quantity: 25, location: "Opposite Civil Hospital" },
        { name: "Gupta Pharmacy", inStock: true, quantity: 20, location: "Main Bazaar" }
    ],
  },
  {
    name: "Combiflam",
    price: "₹25.00",
    usage: "Pain and fever relief.",
    image: 'https://picsum.photos/200/200?random=55',
    stores: [
        { name: "Janta Medical Store", inStock: true, quantity: 150, location: "Near Bus Stand" },
        { name: "Gupta Pharmacy", inStock: true, quantity: 100, location: "Main Bazaar" }
    ],
  },
  {
    name: "Clopidogrel 75mg",
    price: "₹60.00",
    usage: "Blood thinner to prevent clots.",
    image: 'https://picsum.photos/200/200?random=56',
    stores: [
        { name: "Nabha Medical Hall", inStock: true, quantity: 35, location: "Patiala Gate" },
        { name: "Apollo Pharmacy", inStock: false, quantity: 0, location: "Opposite Civil Hospital" }
    ],
  },
  {
    name: "Diclofenac Gel",
    price: "₹70.00",
    usage: "Topical pain relief.",
    image: 'https://picsum.photos/200/200?random=57',
    stores: [
        { name: "Gupta Pharmacy", inStock: true, quantity: 40, location: "Main Bazaar" },
        { name: "Janta Medical Store", inStock: true, quantity: 50, location: "Near Bus Stand" }
    ],
  },
  {
    name: "Domperidone 10mg",
    price: "₹45.00",
    usage: "For nausea and vomiting.",
    image: 'https://picsum.photos/200/200?random=58',
    stores: [
        { name: "Apollo Pharmacy", inStock: true, quantity: 30, location: "Opposite Civil Hospital" },
        { name: "Nabha Medical Hall", inStock: true, quantity: 20, location: "Patiala Gate" }
    ],
  },
  {
    name: "Ecosprin 75mg",
    price: "₹12.00",
    usage: "Blood thinner (Aspirin).",
    image: 'https://picsum.photos/200/200?random=59',
    stores: [
        { name: "Janta Medical Store", inStock: true, quantity: 200, location: "Near Bus Stand" },
        { name: "Gupta Pharmacy", inStock: true, quantity: 150, location: "Main Bazaar" }
    ],
  },
  {
    name: "Enalapril 5mg",
    price: "₹35.00",
    usage: "For high blood pressure.",
    image: 'https://picsum.photos/200/200?random=60',
    stores: [
        { name: "Nabha Medical Hall", inStock: false, quantity: 0, location: "Patiala Gate" },
        { name: "Apollo Pharmacy", inStock: true, quantity: 22, location: "Opposite Civil Hospital" }
    ],
  },
  {
    name: "Folic Acid 5mg",
    price: "₹22.00",
    usage: "Vitamin supplement.",
    image: 'https://picsum.photos/200/200?random=61',
    stores: [
        { name: "Janta Medical Store", inStock: true, quantity: 300, location: "Near Bus Stand" },
        { name: "Gupta Pharmacy", inStock: true, quantity: 250, location: "Main Bazaar" }
    ],
  },
  {
    name: "Fluconazole 150mg",
    price: "₹30.00",
    usage: "Antifungal medication.",
    image: 'https://picsum.photos/200/200?random=62',
    stores: [
        { name: "Apollo Pharmacy", inStock: true, quantity: 15, location: "Opposite Civil Hospital" },
        { name: "Nabha Medical Hall", inStock: true, quantity: 10, location: "Patiala Gate" }
    ],
  },
  {
    name: "Glimipride 1mg",
    price: "₹50.00",
    usage: "For type 2 diabetes.",
    image: 'https://picsum.photos/200/200?random=63',
    stores: [
        { name: "Gupta Pharmacy", inStock: true, quantity: 33, location: "Main Bazaar" },
        { name: "Janta Medical Store", inStock: true, quantity: 45, location: "Near Bus Stand" }
    ],
  },
  {
    name: "Gaviscon Syrup",
    price: "₹120.00",
    usage: "For heartburn and indigestion.",
    image: 'https://picsum.photos/200/200?random=64',
    stores: [
        { name: "Nabha Medical Hall", inStock: true, quantity: 25, location: "Patiala Gate" },
        { name: "Apollo Pharmacy", inStock: true, quantity: 30, location: "Opposite Civil Hospital" }
    ],
  },
  {
    name: "Hydrochlorothiazide 12.5mg",
    price: "₹28.00",
    usage: "Diuretic, for high blood pressure.",
    image: 'https://picsum.photos/200/200?random=65',
    stores: [
        { name: "Janta Medical Store", inStock: false, quantity: 0, location: "Near Bus Stand" },
        { name: "Gupta Pharmacy", inStock: true, quantity: 18, location: "Main Bazaar" }
    ],
  },
  {
    name: "Ibuprofen 200mg",
    price: "₹10.00",
    usage: "Pain relief.",
    image: 'https://picsum.photos/200/200?random=66',
    stores: [
        { name: "Janta Medical Store", inStock: true, quantity: 120, location: "Near Bus Stand" },
        { name: "Nabha Medical Hall", inStock: true, quantity: 90, location: "Patiala Gate" }
    ],
  },
  {
    name: "Itraconazole 100mg",
    price: "₹150.00",
    usage: "Antifungal medication.",
    image: 'https://picsum.photos/200/200?random=67',
    stores: [
        { name: "Apollo Pharmacy", inStock: true, quantity: 12, location: "Opposite Civil Hospital" },
        { name: "Gupta Pharmacy", inStock: false, quantity: 0, location: "Main Bazaar" }
    ],
  },
  {
    name: "Levocetirizine 5mg",
    price: "₹35.00",
    usage: "For allergies.",
    image: 'https://picsum.photos/200/200?random=68',
    stores: [
        { name: "Janta Medical Store", inStock: true, quantity: 70, location: "Near Bus Stand" },
        { name: "Gupta Pharmacy", inStock: true, quantity: 60, location: "Main Bazaar" }
    ],
  },
  {
    name: "Losartan 50mg",
    price: "₹75.00",
    usage: "For high blood pressure.",
    image: 'https://picsum.photos/200/200?random=69',
    stores: [
        { name: "Nabha Medical Hall", inStock: true, quantity: 45, location: "Patiala Gate" },
        { name: "Apollo Pharmacy", inStock: true, quantity: 35, location: "Opposite Civil Hospital" }
    ],
  },
  {
    name: "Metformin 500mg",
    price: "₹18.00",
    usage: "For type 2 diabetes.",
    image: 'https://picsum.photos/200/200?random=70',
    stores: [
        { name: "Janta Medical Store", inStock: true, quantity: 250, location: "Near Bus Stand" },
        { name: "Gupta Pharmacy", inStock: true, quantity: 200, location: "Main Bazaar" }
    ],
  },
  {
    name: "Montelukast 10mg",
    price: "₹90.00",
    usage: "For asthma and allergies.",
    image: 'https://picsum.photos/200/200?random=71',
    stores: [
        { name: "Apollo Pharmacy", inStock: true, quantity: 28, location: "Opposite Civil Hospital" },
        { name: "Nabha Medical Hall", inStock: true, quantity: 20, location: "Patiala Gate" }
    ],
  },
  {
    name: "Nimesulide 100mg",
    price: "₹32.00",
    usage: "Pain relief, anti-inflammatory.",
    image: 'https://picsum.photos/200/200?random=72',
    stores: [
        { name: "Gupta Pharmacy", inStock: false, quantity: 0, location: "Main Bazaar" },
        { name: "Janta Medical Store", inStock: true, quantity: 40, location: "Near Bus Stand" }
    ],
  },
  {
    name: "Norfloxacin 400mg",
    price: "₹55.00",
    usage: "Antibiotic for infections.",
    image: 'https://picsum.photos/200/200?random=73',
    stores: [
        { name: "Nabha Medical Hall", inStock: true, quantity: 15, location: "Patiala Gate" },
        { name: "Apollo Pharmacy", inStock: true, quantity: 10, location: "Opposite Civil Hospital" }
    ],
  },
  {
    name: "Ofloxacin 200mg",
    price: "₹48.00",
    usage: "Antibiotic for infections.",
    image: 'https://picsum.photos/200/200?random=74',
    stores: [
        { name: "Janta Medical Store", inStock: true, quantity: 25, location: "Near Bus Stand" },
        { name: "Gupta Pharmacy", inStock: true, quantity: 20, location: "Main Bazaar" }
    ],
  },
  {
    name: "Omeprazole 20mg",
    price: "₹30.00",
    usage: "For acidity and heartburn.",
    image: 'https://picsum.photos/200/200?random=75',
    stores: [
        { name: "Janta Medical Store", inStock: true, quantity: 90, location: "Near Bus Stand" },
        { name: "Apollo Pharmacy", inStock: true, quantity: 70, location: "Opposite Civil Hospital" }
    ],
  },
  {
    name: "Pantoprazole 40mg",
    price: "₹55.00",
    usage: "For acidity, GERD.",
    image: 'https://picsum.photos/200/200?random=76',
    stores: [
        { name: "Nabha Medical Hall", inStock: true, quantity: 80, location: "Patiala Gate" },
        { name: "Gupta Pharmacy", inStock: true, quantity: 60, location: "Main Bazaar" }
    ],
  },
  {
    name: "Ranitidine 150mg",
    price: "₹20.00",
    usage: "For acidity and stomach ulcers.",
    image: 'https://picsum.photos/200/200?random=77',
    stores: [
        { name: "Janta Medical Store", inStock: true, quantity: 110, location: "Near Bus Stand" },
        { name: "Apollo Pharmacy", inStock: false, quantity: 0, location: "Opposite Civil Hospital" }
    ],
  },
  {
    name: "Rosuvastatin 10mg",
    price: "₹95.00",
    usage: "Lowers cholesterol.",
    image: 'https://picsum.photos/200/200?random=78',
    stores: [
        { name: "Gupta Pharmacy", inStock: true, quantity: 30, location: "Main Bazaar" },
        { name: "Nabha Medical Hall", inStock: true, quantity: 25, location: "Patiala Gate" }
    ],
  },
  {
    name: "Sertraline 50mg",
    price: "₹110.00",
    usage: "Antidepressant, for anxiety.",
    image: 'https://picsum.photos/200/200?random=79',
    stores: [
        { name: "Apollo Pharmacy", inStock: true, quantity: 18, location: "Opposite Civil Hospital" },
        { name: "Gupta Pharmacy", inStock: true, quantity: 15, location: "Main Bazaar" }
    ],
  },
  {
    name: "Sumatriptan 50mg",
    price: "₹130.00",
    usage: "For migraine attacks.",
    image: 'https://picsum.photos/200/200?random=80',
    stores: [
        { name: "Nabha Medical Hall", inStock: true, quantity: 8, location: "Patiala Gate" },
        { name: "Janta Medical Store", inStock: false, quantity: 0, location: "Near Bus Stand" }
    ],
  },
  {
    name: "Telmisartan 40mg",
    price: "₹80.00",
    usage: "For high blood pressure.",
    image: 'https://picsum.photos/200/200?random=81',
    stores: [
        { name: "Janta Medical Store", inStock: true, quantity: 50, location: "Near Bus Stand" },
        { name: "Apollo Pharmacy", inStock: true, quantity: 40, location: "Opposite Civil Hospital" }
    ],
  },
  {
    name: "Tramadol 50mg",
    price: "₹65.00",
    usage: "Moderate to severe pain relief.",
    image: 'https://picsum.photos/200/200?random=82',
    stores: [
        { name: "Gupta Pharmacy", inStock: true, quantity: 20, location: "Main Bazaar" },
        { name: "Nabha Medical Hall", inStock: true, quantity: 15, location: "Patiala Gate" }
    ],
  },
  {
    name: "Voglibose 0.2mg",
    price: "₹70.00",
    usage: "For type 2 diabetes.",
    image: 'https://picsum.photos/200/200?random=83',
    stores: [
        { name: "Apollo Pharmacy", inStock: true, quantity: 25, location: "Opposite Civil Hospital" },
        { name: "Janta Medical Store", inStock: true, quantity: 30, location: "Near Bus Stand" }
    ],
  },
  {
    name: "Warfarin 5mg",
    price: "₹40.00",
    usage: "Blood thinner.",
    image: 'https://picsum.photos/200/200?random=84',
    stores: [
        { name: "Nabha Medical Hall", inStock: true, quantity: 10, location: "Patiala Gate" },
        { name: "Gupta Pharmacy", inStock: false, quantity: 0, location: "Main Bazaar" }
    ],
  },
  {
    name: "Zincovit Tablet",
    price: "₹105.00",
    usage: "Multivitamin and mineral supplement.",
    image: 'https://picsum.photos/200/200?random=85',
    stores: [
        { name: "Janta Medical Store", inStock: true, quantity: 150, location: "Near Bus Stand" },
        { name: "Gupta Pharmacy", inStock: true, quantity: 120, location: "Main Bazaar" }
    ],
  },
];


type Medicine = typeof mockMedicines[0];

const MedicineCard = ({ med, locale, onAddToCart }: { med: Medicine; locale: string; onAddToCart: (med: Medicine) => void; }) => {
    const { toast } = useToast();
    const isAvailableOverall = med.stores.some(s => s.inStock);
    const totalQuantity = med.stores.reduce((acc, store) => acc + store.quantity, 0);

    const handleNotify = (medicineName: string) => {
        toast({
        title: "Notification Set!",
        description: `We'll notify you via SMS and a call when ${medicineName} is back in stock.`,
        });
    };
    
    const handleDeliveryConfirm = (event: React.FormEvent, medicineName: string) => {
        event.preventDefault();
        toast({
            variant: "success",
            title: "Delivery Request Confirmed",
            description: `Your order for ${medicineName} has been placed and will be delivered within 24 hours.`,
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
                                <div key={store.name} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 rounded-md border gap-2">
                                    <div className="flex flex-col">
                                      <span className="font-medium">{store.name}</span>
                                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        <Link href={`/${locale}/map`} className="hover:underline hover:text-primary">
                                            {store.location}
                                        </Link>
                                      </div>
                                    </div>
                                    {store.inStock ? (
                                        <Badge variant="outline" className="text-green-700 border-green-300">
                                            <CheckCircle className="mr-1 h-3 w-3" /> In Stock ({store.quantity} left)
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
                
                <div className="flex flex-wrap gap-2">
                {isAvailableOverall ? (
                <>
                <Button variant="outline" className="flex-grow" onClick={() => onAddToCart(med)}>
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
                <Dialog>
                    <DialogTrigger asChild>
                         <Button className="flex-grow">
                            <Truck className="mr-2 h-4 w-4" /> Request Home Delivery
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                        <DialogTitle>Home Delivery Request</DialogTitle>
                        <DialogDescription>
                            Please fill in your details to request home delivery for {med.name}.
                        </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={(e) => handleDeliveryConfirm(e, med.name)}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Full Name
                                    </Label>
                                    <Input id="name" required className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="phone" className="text-right">
                                        Phone
                                    </Label>
                                    <Input id="phone" type="tel" required className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="address" className="text-right">
                                        Address
                                    </Label>
                                    <Input id="address" required className="col-span-3" />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="submit">Confirm Delivery</Button>
                                </DialogClose>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
                </>
                ) : (
                <Button variant="outline" className="w-full sm:w-auto" onClick={() => handleNotify(med.name)}>
                    <Bell className="mr-2 h-4 w-4" /> Notify when available
                </Button>
                )}
                </div>
            </div>
            </CardContent>
        </Card>
    )
}

export default function MedicinesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Medicine[]>([]);
  const [searchResults, setSearchResults] = useState<Medicine[]>([]);
  const [searched, setSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState<Medicine[]>([]);
  const locale = useLocale();
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim()) {
      const filteredSuggestions = mockMedicines.filter((med) =>
        med.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = (term: string) => {
    if (!term.trim()) {
      setSearchResults([]);
      setSearched(false);
      return;
    }
    setIsLoading(true);
    setSearched(false);
    setSuggestions([]);
    setTimeout(() => {
      const results = mockMedicines.filter((med) =>
        med.name.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
      setSearched(true);
      setIsLoading(false);
    }, 500); // Simulate network delay
  };

  const handleSuggestionClick = (suggestion: Medicine) => {
    setSearchTerm(suggestion.name);
    handleSearch(suggestion.name);
  };

  const handleAddToCart = (med: Medicine) => {
    setCart(prevCart => [...prevCart, med]);
    toast({
        variant: "success",
        title: "Added to Cart",
        description: `${med.name} has been added to your cart.`,
    });
  };

  const handleClearCart = () => {
    setCart([]);
    toast({
        title: "Cart Cleared",
        description: "Your shopping cart has been emptied.",
    });
  };

  const handleCartDeliveryConfirm = (event: React.FormEvent) => {
    event.preventDefault();
    toast({
        variant: "success",
        title: "Delivery Request Confirmed",
        description: `Your order for ${cart.length} item(s) has been placed and will be delivered within 24 hours.`,
    });
    setCart([]); // Clear cart after order
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price.replace('₹', '')), 0).toFixed(2);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Medicine Availability</h1>
        <p className="text-muted-foreground">Check local pharmacy stock in real-time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="search" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="search">Search by Name</TabsTrigger>
                <TabsTrigger value="upload">Upload Prescription</TabsTrigger>
                </TabsList>
                <TabsContent value="search">
                <div className="relative" ref={searchContainerRef}>
                    <div className="flex w-full items-center space-x-2">
                    <Input
                        type="text"
                        placeholder="e.g., Paracetamol"
                        value={searchTerm}
                        onChange={handleInputChange}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
                        disabled={isLoading}
                    />
                    <Button onClick={() => handleSearch(searchTerm)} disabled={isLoading}>
                        {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                        <Search className="mr-2 h-4 w-4" />
                        )}
                        Search
                    </Button>
                    </div>
                    {suggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 border bg-background rounded-md shadow-lg">
                        <ul className="py-1">
                        {suggestions.map((suggestion) => (
                            <li
                            key={suggestion.name}
                            className="px-3 py-2 cursor-pointer hover:bg-accent"
                            onClick={() => handleSuggestionClick(suggestion)}
                            >
                            {suggestion.name}
                            </li>
                        ))}
                        </ul>
                    </div>
                    )}
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
                    <MedicineCard key={med.name} med={med} locale={locale} onAddToCart={handleAddToCart} />
                ))}
            </div>
        </div>

        {cart.length > 0 && (
            <div className="lg:col-span-1 sticky top-20">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ShoppingCart /> Your Cart
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="max-h-60 overflow-y-auto pr-2 space-y-2">
                            {cart.map((item, index) => (
                                <div key={index} className="flex justify-between items-center text-sm">
                                    <span>{item.name}</span>
                                    <span className="font-semibold">{item.price}</span>
                                </div>
                            ))}
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₹{calculateTotalPrice()}</span>
                        </div>
                        <Separator />
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="w-full">
                                    <Truck className="mr-2 h-4 w-4" /> Request Home Delivery for Cart
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                <DialogTitle>Home Delivery Request</DialogTitle>
                                <DialogDescription>
                                    Please fill in your details to request home delivery for the items in your cart.
                                </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleCartDeliveryConfirm}>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name-cart" className="text-right">
                                                Full Name
                                            </Label>
                                            <Input id="name-cart" required className="col-span-3" />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="phone-cart" className="text-right">
                                                Phone
                                            </Label>
                                            <Input id="phone-cart" type="tel" required className="col-span-3" />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="address-cart" className="text-right">
                                                Address
                                            </Label>
                                            <Input id="address-cart" required className="col-span-3" />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button type="submit">Confirm Delivery</Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                        <Button variant="outline" className="w-full" onClick={handleClearCart}>
                            <Trash2 className="mr-2 h-4 w-4" /> Clear Cart
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )}
      </div>
    </div>
  );
}
