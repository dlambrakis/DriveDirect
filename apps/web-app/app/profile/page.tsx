// apps/web-app/app/profile/page.tsx
'use client'; // For potential client-side interactions
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Edit3, LogOut, Shield, Car as CarIcon, Settings } from 'lucide-react';
import Link from 'next/link';

// Mock user data - replace with actual data fetching
const user = {
  name: 'Alex Johnson',
  email: 'alex.johnson@example.com',
  avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', // Replace with a valid Pexels URL
  bio: 'Car enthusiast and trusted seller on DriveDirect. Looking for my next adventure on four wheels!',
  listingsCount: 3,
  memberSince: 'January 2024',
};

export default function UserProfilePage() {
  return (
    <div className="min-h-screen bg-user_background text-user_text p-4 md:p-8">
      <header className="mb-8">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-user_primary">
            <CarIcon /> DriveDirect
          </Link>
          <Button variant="outline" className="border-user_primary text-user_primary hover:bg-user_primary hover:text-user_background">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto">
        <Card className="bg-user_surface border-user_border shadow-xl">
          <CardHeader className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-8">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-user_primary">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback className="text-4xl bg-user_primary text-user_background">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left">
              <CardTitle className="text-3xl md:text-4xl font-bold text-user_text">{user.name}</CardTitle>
              <CardDescription className="text-md text-user_text_secondary">{user.email}</CardDescription>
              <p className="text-sm text-user_text_secondary mt-1">Member since: {user.memberSince}</p>
              <div className="mt-4 flex gap-2 justify-center md:justify-start">
                <Button size="sm" className="bg-user_primary text-user_background hover:bg-user_primary/90">
                  <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
                <Button variant="outline" size="sm" className="border-user_secondary text-user_secondary hover:bg-user_secondary hover:text-user_background">
                  <Settings className="mr-2 h-4 w-4" /> Account Settings
                </Button>
              </div>
            </div>
          </CardHeader>
          <Separator className="bg-user_border" />
          <CardContent className="p-6 md:p-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h3 className="text-xl font-semibold text-user_text mb-2">About Me</h3>
                <p className="text-user_text_secondary leading-relaxed">{user.bio}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-user_text mb-2">Activity</h3>
                <ul className="space-y-2 text-user_text_secondary">
                  <li className="flex items-center gap-2"><CarIcon className="h-5 w-5 text-user_primary" /> Active Listings: {user.listingsCount}</li>
                  {/* Add more activity stats here */}
                  <li className="flex items-center gap-2"><Shield className="h-5 w-5 text-user_success" /> Verification Status: Verified</li>
                </ul>
              </div>
            </div>
            
            <Separator className="my-6 md:my-8 bg-user_border" />

            <div>
              <h3 className="text-2xl font-semibold text-user_text mb-4">My Vehicle Listings</h3>
              {/* Placeholder for listings - map through actual listings here */}
              {user.listingsCount > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(user.listingsCount)].map((_, index) => (
                    <Card key={index} className="bg-user_background border-user_border hover:shadow-user_primary/20 transition-shadow">
                      <div className="aspect-video bg-gray-700 rounded-t-md overflow-hidden">
                        <img src={`https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load`} alt={`Vehicle ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-user_text">Example Vehicle {index + 1}</h4>
                        <p className="text-sm text-user_primary font-bold">R 250,000</p>
                        <p className="text-xs text-user_text_secondary mt-1">Sedan - 2018 - 55,000 km</p>
                        <Button size="sm" variant="outline" className="w-full mt-3 border-user_primary text-user_primary hover:bg-user_primary hover:text-user_background">View Details</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-user_text_secondary">You have no active listings.</p>
              )}
              <div className="mt-6 text-center">
                <Button asChild className="bg-user_secondary text-user_background hover:bg-user_secondary/90">
                  <Link href="/add-vehicle">
                    <CarIcon className="mr-2 h-4 w-4" /> List a New Vehicle
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
