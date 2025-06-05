{/* apps/web-app/app/vehicles/[id]/page.tsx */}
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Car, ArrowLeft, MessageSquare, Phone, ShieldCheck, MapPin, CalendarDays, Palette, Gauge, Settings2, DollarSign, UserCircle } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Vehicle } from '@directdrive/core-types'; // Assuming Vehicle type

// Mock data - replace with API call
const mockVehicles: Vehicle[] = [
  { id: '1', make: 'Toyota', model: 'Corolla', year: 2020, price: 280000, description: 'Immaculate condition Toyota Corolla 1.8 XS CVT. Full service history with agents. Low mileage for its year. Features include reverse camera, cruise control, Apple CarPlay/Android Auto, and alloy wheels. A very reliable and fuel-efficient sedan perfect for city driving or long trips.', image_urls: ['https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'https://images.pexels.com/photos/100653/pexels-photo-100653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'], seller_id: 'user1', mileage: 45000, color: 'Silver', engine_type: 'Petrol', transmission: 'Automatic' },
  { id: '2', make: 'Ford', model: 'Ranger', year: 2019, price: 450000, description: 'Ford Ranger 2.0SiT Double Cab Hi-Rider XLT FX4. This bakkie is a beast, ready for any adventure. Comes with canopy, tow bar, and off-road tyres. Well-maintained with regular services. FX4 styling pack makes it stand out.', image_urls: ['https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'], seller_id: 'user2', mileage: 82000, color: 'Blue', engine_type: 'Diesel', transmission: 'Automatic' },
];
const mockSeller = { id: 'user1', name: 'Sarah Miller', avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300', memberSince: 'June 2023', location: 'Cape Town, SA' };


export default function VehicleDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const vehicleId = params.id as string;
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [seller, setSeller] = useState<any>(null); // Replace 'any' with Seller type
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Simulate fetching vehicle and seller data
    const foundVehicle = mockVehicles.find(v => v.id === vehicleId);
    if (foundVehicle) {
      setVehicle(foundVehicle);
      // Simulate fetching seller based on seller_id
      if (foundVehicle.seller_id === mockSeller.id) {
        setSeller(mockSeller);
      }
    } else {
      // Handle vehicle not found, e.g., redirect to 404 or search
      router.push('/search');
    }
  }, [vehicleId, router]);

  if (!vehicle || !seller) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-user_background text-user_text">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-user_primary"></div>
        <p className="ml-4 text-lg">Loading vehicle details...</p>
      </div>
    );
  }
  
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % (vehicle.image_urls?.length || 1));
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + (vehicle.image_urls?.length || 1)) % (vehicle.image_urls?.length || 1));


  return (
    <div className="min-h-screen bg-user_background text-user_text">
       <header className="sticky top-0 z-50 w-full border-b border-user_border bg-user_surface/80 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Car className="h-8 w-8 text-user_primary" />
            <span className="text-2xl font-bold tracking-tight">DriveDirect</span>
          </Link>
          <Button variant="outline" onClick={() => router.back()} className="border-user_primary text-user_primary hover:bg-user_primary hover:text-user_background">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Search
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Image Gallery & Main Info */}
          <div className="lg:col-span-2">
            <Card className="bg-user_surface border-user_border shadow-xl overflow-hidden">
              <div className="relative aspect-[16/10] bg-user_background">
                {vehicle.image_urls && vehicle.image_urls.length > 0 ? (
                  <>
                    <img 
                      src={vehicle.image_urls[currentImageIndex]} 
                      alt={`${vehicle.make} ${vehicle.model} - Image ${currentImageIndex + 1}`} 
                      className="w-full h-full object-cover transition-opacity duration-300"
                    />
                    {vehicle.image_urls.length > 1 && (
                      <>
                        <Button onClick={prevImage} variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full h-10 w-10">‹</Button>
                        <Button onClick={nextImage} variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full h-10 w-10">›</Button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1.5">
                          {vehicle.image_urls.map((_, idx) => (
                            <button key={idx} onClick={() => setCurrentImageIndex(idx)} className={`h-2 w-2 rounded-full ${idx === currentImageIndex ? 'bg-user_primary scale-125' : 'bg-white/50 hover:bg-white/80'}`}></button>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Car className="h-24 w-24 text-user_text_secondary" />
                  </div>
                )}
              </div>
              <CardHeader className="p-6">
                <CardTitle className="text-3xl md:text-4xl font-bold text-user_text">{vehicle.make} {vehicle.model}</CardTitle>
                <CardDescription className="text-xl font-semibold text-user_primary mt-1">R {vehicle.price.toLocaleString()}</CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm mb-6">
                  {[
                    { icon: CalendarDays, label: 'Year', value: vehicle.year },
                    { icon: Gauge, label: 'Mileage', value: `${vehicle.mileage?.toLocaleString() || 'N/A'} km` },
                    { icon: Palette, label: 'Color', value: vehicle.color || 'N/A' },
                    { icon: Settings2, label: 'Engine', value: vehicle.engine_type || 'N/A' },
                    { icon: ShieldCheck, label: 'Transmission', value: vehicle.transmission || 'N/A' },
                    { icon: MapPin, label: 'Location', value: seller.location || 'N/A' },
                  ].map(item => (
                    <div key={item.label} className="flex items-center">
                      <item.icon className="h-5 w-5 text-user_accent mr-2" />
                      <div>
                        <p className="text-user_text_secondary">{item.label}</p>
                        <p className="font-medium text-user_text">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <h3 className="text-xl font-semibold text-user_text mb-2">Vehicle Description</h3>
                <p className="text-user_text_secondary leading-relaxed whitespace-pre-line">{vehicle.description}</p>
              </CardContent>
            </Card>
          </div>

          {/* Seller Info & Actions */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-user_surface border-user_border shadow-xl">
              <CardHeader className="flex flex-row items-center gap-4 p-6">
                <Avatar className="h-16 w-16 border-2 border-user_primary">
                  <AvatarImage src={seller.avatarUrl} alt={seller.name} />
                  <AvatarFallback className="bg-user_primary text-user_background text-2xl">{seller.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl font-semibold text-user_text">{seller.name}</CardTitle>
                  <CardDescription className="text-sm text-user_text_secondary">Member since {seller.memberSince}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-4">
                <Button className="w-full bg-user_primary text-user_background hover:bg-user_primary/90">
                  <MessageSquare className="mr-2 h-5 w-5" /> Contact Seller
                </Button>
                <Button variant="outline" className="w-full border-user_secondary text-user_secondary hover:bg-user_secondary hover:text-user_background">
                  <Phone className="mr-2 h-5 w-5" /> Show Phone Number (XXX)
                </Button>
                <Separator className="bg-user_border" />
                <div className="text-sm text-user_text_secondary space-y-1">
                  <p className="flex items-center"><ShieldCheck className="h-4 w-4 text-user_success mr-2" /> Verified Seller (Example)</p>
                  <p className="flex items-center"><MapPin className="h-4 w-4 text-user_accent mr-2" /> Located in {seller.location}</p>
                </div>
                 <Link href={`/profile/${seller.id}`} className="block text-center text-sm text-user_primary hover:underline mt-2">
                    View Seller's Profile & Other Listings
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-user_surface border-user_border shadow-xl">
              <CardHeader><CardTitle className="text-lg font-semibold text-user_text">Safety Tips</CardTitle></CardHeader>
              <CardContent className="text-sm text-user_text_secondary space-y-2">
                <p>• Always meet in a public, well-lit place.</p>
                <p>• Never pay or transfer funds before seeing the vehicle.</p>
                <p>• Consider a pre-purchase inspection by a trusted mechanic.</p>
                <p>• Verify vehicle documents (eNaTIS, service history).</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <footer className="py-8 bg-user_surface border-t border-user_border mt-12">
        <div className="container mx-auto px-4 md:px-6 text-center text-user_text_secondary text-sm">
          <p>&copy; {new Date().getFullYear()} DriveDirect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
