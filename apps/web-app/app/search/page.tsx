{/* apps/web-app/app/search/page.tsx */}
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from "@/components/ui/slider"
import Link from 'next/link';
import { Car, Search as SearchIcon, Filter, MapPin, DollarSign, CalendarDays, Palette, Settings2, ListFilter } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Vehicle } from '@directdrive/core-types'; // Assuming Vehicle type is defined

// Mock data - replace with API call
const mockVehicles: Vehicle[] = [
  { id: '1', make: 'Toyota', model: 'Corolla', year: 2020, price: 280000, description: 'Reliable sedan, low mileage.', image_urls: ['https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=600'], seller_id: 'user1' },
  { id: '2', make: 'Ford', model: 'Ranger', year: 2019, price: 450000, description: 'Powerful bakkie, great for off-road.', image_urls: ['https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=600'], seller_id: 'user2' },
  { id: '3', make: 'Volkswagen', model: 'Polo', year: 2021, price: 220000, description: 'Fuel-efficient city car.', image_urls: ['https://images.pexels.com/photos/2127740/pexels-photo-2127740.jpeg?auto=compress&cs=tinysrgb&w=600'], seller_id: 'user3' },
  { id: '4', make: 'BMW', model: '3 Series', year: 2018, price: 350000, description: 'Luxury and performance.', image_urls: ['https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600'], seller_id: 'user1' },
  { id: '5', make: 'Hyundai', model: 'i20', year: 2022, price: 200000, description: 'Modern hatchback with latest tech.', image_urls: ['https://images.pexels.com/photos/1637859/pexels-photo-1637859.jpeg?auto=compress&cs=tinysrgb&w=600'], seller_id: 'user2' },
];


export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ make: '', year: '', priceRange: [0, 1000000] });
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(mockVehicles);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call & filtering
    const timer = setTimeout(() => {
      let vehicles = mockVehicles;
      if (searchTerm) {
        vehicles = vehicles.filter(v => 
          v.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
          v.model.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      if (filters.make) {
        vehicles = vehicles.filter(v => v.make === filters.make);
      }
      if (filters.year) {
        vehicles = vehicles.filter(v => v.year === parseInt(filters.year));
      }
      vehicles = vehicles.filter(v => v.price >= filters.priceRange[0] && v.price <= filters.priceRange[1]);
      
      setFilteredVehicles(vehicles);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, filters]);

  const handleFilterChange = (filterName: string, value: any) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };
  
  const makes = Array.from(new Set(mockVehicles.map(v => v.make)));
  const years = Array.from(new Set(mockVehicles.map(v => v.year.toString()))).sort((a,b) => parseInt(b) - parseInt(a));


  return (
    <div className="min-h-screen bg-user_background text-user_text">
      <header className="sticky top-0 z-40 w-full border-b border-user_border bg-user_surface/80 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Car className="h-8 w-8 text-user_primary" />
            <span className="text-2xl font-bold tracking-tight">DriveDirect</span>
          </Link>
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-user_text_secondary" />
              <Input 
                type="search" 
                placeholder="Search by make, model, keyword..." 
                className="w-full pl-10 pr-4 py-2 rounded-md bg-user_background border-user_border text-user_text placeholder:text-user_text_secondary/70 focus:ring-user_primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Button variant="ghost" className="text-user_primary hover:bg-user_primary/10">
            <ListFilter className="mr-2 h-5 w-5" /> Filters
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6 grid lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1 space-y-6 p-6 bg-user_surface rounded-lg shadow-lg h-fit sticky top-24">
          <h3 className="text-xl font-semibold text-user_text flex items-center"><Filter className="mr-2 h-5 w-5 text-user_primary"/>Refine Your Search</h3>
          
          <div>
            <Label htmlFor="makeFilter" className="text-user_text_secondary flex items-center mb-1"><Car className="mr-2 h-4 w-4 text-user_accent"/>Make</Label>
            <Select onValueChange={(value) => handleFilterChange('make', value)} value={filters.make}>
              <SelectTrigger className="w-full bg-user_background border-user_border text-user_text">
                <SelectValue placeholder="Any Make" />
              </SelectTrigger>
              <SelectContent className="bg-user_surface border-user_border text-user_text">
                <SelectItem value="" className="hover:bg-user_primary/20">Any Make</SelectItem>
                {makes.map(make => <SelectItem key={make} value={make} className="hover:bg-user_primary/20">{make}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="yearFilter" className="text-user_text_secondary flex items-center mb-1"><CalendarDays className="mr-2 h-4 w-4 text-user_accent"/>Year</Label>
            <Select onValueChange={(value) => handleFilterChange('year', value)} value={filters.year}>
              <SelectTrigger className="w-full bg-user_background border-user_border text-user_text">
                <SelectValue placeholder="Any Year" />
              </SelectTrigger>
              <SelectContent className="bg-user_surface border-user_border text-user_text">
                <SelectItem value="" className="hover:bg-user_primary/20">Any Year</SelectItem>
                {years.map(year => <SelectItem key={year} value={year} className="hover:bg-user_primary/20">{year}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-user_text_secondary flex items-center mb-1"><DollarSign className="mr-2 h-4 w-4 text-user_accent"/>Price Range (ZAR)</Label>
            <Slider
              defaultValue={[0, 1000000]}
              min={0}
              max={1000000}
              step={10000}
              onValueChange={(value) => handleFilterChange('priceRange', value)}
              className="[&>span:first-child]:h-1 [&>span:first-child]:bg-user_primary [&_[role=slider]]:bg-user_primary [&_[role=slider]]:border-user_primary [&_[role=slider]]:shadow-md"
            />
            <div className="flex justify-between text-xs text-user_text_secondary mt-1">
              <span>R{filters.priceRange[0].toLocaleString()}</span>
              <span>R{filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
          
          <Button className="w-full bg-user_secondary text-user_background hover:bg-user_secondary/90">Apply Filters</Button>
        </aside>

        {/* Search Results */}
        <section className="lg:col-span-3">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-user_text_secondary">Showing {filteredVehicles.length} vehicles</p>
            {/* Add sort options here */}
          </div>
          {isLoading ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="bg-user_surface border-user_border animate-pulse">
                  <div className="aspect-video bg-user_border/50 rounded-t-md"></div>
                  <CardContent className="p-4 space-y-2">
                    <div className="h-4 bg-user_border/50 rounded w-3/4"></div>
                    <div className="h-3 bg-user_border/50 rounded w-1/2"></div>
                    <div className="h-3 bg-user_border/50 rounded w-1/4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredVehicles.length > 0 ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredVehicles.map(vehicle => (
                <Card key={vehicle.id} className="bg-user_surface border-user_border hover:shadow-user_primary/20 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                  <Link href={`/vehicles/${vehicle.id}`} className="block">
                    <div className="aspect-video bg-user_background rounded-t-md overflow-hidden">
                      <img src={vehicle.image_urls?.[0] || `https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&w=600`} alt={`${vehicle.make} ${vehicle.model}`} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                    </div>
                    <CardContent className="p-4">
                      <CardTitle className="text-lg font-semibold text-user_text truncate">{vehicle.make} {vehicle.model}</CardTitle>
                      <p className="text-md font-bold text-user_primary mt-1">R {vehicle.price.toLocaleString()}</p>
                      <p className="text-sm text-user_text_secondary truncate">{vehicle.year} &bull; Low Mileage (example)</p>
                      <p className="text-xs text-user_text_secondary mt-2 truncate">{vehicle.description}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                       <Button variant="outline" size="sm" className="w-full border-user_primary text-user_primary hover:bg-user_primary hover:text-user_background">View Details</Button>
                    </CardFooter>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Car className="mx-auto h-16 w-16 text-user_text_secondary mb-4" />
              <h3 className="text-xl font-semibold text-user_text">No vehicles match your criteria.</h3>
              <p className="text-user_text_secondary">Try adjusting your search or filters.</p>
            </div>
          )}
        </section>
      </main>
       <footer className="py-8 bg-user_surface border-t border-user_border mt-12">
        <div className="container mx-auto px-4 md:px-6 text-center text-user_text_secondary text-sm">
          <p>&copy; {new Date().getFullYear()} DriveDirect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
