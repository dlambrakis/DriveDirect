import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Car, LogIn, UserPlus, Search as SearchIcon, ShieldCheck, Users, DollarSign, Handshake } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-user_background text-user_text">
      <header className="sticky top-0 z-50 w-full border-b border-user_border bg-user_surface/80 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Car className="h-8 w-8 text-user_primary" />
            <span className="text-2xl font-bold tracking-tight">DriveDirect</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/search" className="text-sm font-medium text-user_text_secondary hover:text-user_primary transition-colors">
              Find a Car
            </Link>
            <Link href="/add-vehicle" className="text-sm font-medium text-user_text_secondary hover:text-user_primary transition-colors">
              Sell Your Car
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-user_text_secondary hover:text-user_primary transition-colors">
              How It Works
            </Link>
            <Link href="#features" className="text-sm font-medium text-user_text_secondary hover:text-user_primary transition-colors">
              Features
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild className="border-user_primary text-user_primary hover:bg-user_primary hover:text-user_background">
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Link>
            </Button>
            <Button size="sm" asChild className="bg-user_primary text-user_background hover:bg-user_primary/90">
              <Link href="/signup">
                <UserPlus className="mr-2 h-4 w-4" /> Sign Up
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-user_surface to-user_background">
          <div className="absolute inset-0 opacity-10">
             {/* Optional: Add a subtle background pattern or image */}
          </div>
          <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              The <span className="text-user_primary">Smarter Way</span> to Buy & Sell Cars
            </h1>
            <p className="text-lg md:text-xl text-user_text_secondary max-w-3xl mx-auto mb-10">
              DriveDirect connects you directly with buyers and sellers. No middlemen, no dealership markups. Just transparent, secure P2P car transactions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" asChild className="bg-user_primary text-user_background hover:bg-user_primary/90 w-full sm:w-auto">
                <Link href="/search">
                  <SearchIcon className="mr-2 h-5 w-5" /> Find Your Next Car
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild className="bg-user_secondary text-user_background hover:bg-user_secondary/90 w-full sm:w-auto">
                <Link href="/add-vehicle">
                  <Car className="mr-2 h-5 w-5" /> Sell Your Car Today
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-24 bg-user_surface">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How DriveDirect Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-user_background rounded-lg shadow-lg hover:shadow-user_primary/30 transition-shadow">
                <SearchIcon className="h-12 w-12 text-user_primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">1. Search or List</h3>
                <p className="text-user_text_secondary text-sm">Buyers find their perfect car with advanced filters. Sellers list their vehicles with detailed information and photos in minutes.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-user_background rounded-lg shadow-lg hover:shadow-user_primary/30 transition-shadow">
                <Handshake className="h-12 w-12 text-user_primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">2. Connect & Negotiate</h3>
                <p className="text-user_text_secondary text-sm">Communicate securely within the platform. Arrange viewings, ask questions, and negotiate the price directly.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-user_background rounded-lg shadow-lg hover:shadow-user_primary/30 transition-shadow">
                <ShieldCheck className="h-12 w-12 text-user_primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">3. Secure Transaction</h3>
                <p className="text-user_text_secondary text-sm">Utilize our secure payment and document handling suggestions. Optional pre-purchase inspections for peace of mind.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-user_background">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose DriveDirect?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Users, title: "Direct P2P", description: "Cut out the middleman and save money." },
                { icon: ShieldCheck, title: "Enhanced Security", description: "Verified users and secure communication." },
                { icon: DollarSign, title: "Cost Effective", description: "Minimal fees, funded by ads & sponsorships." },
                { icon: Car, title: "Comprehensive Info", description: "Detailed listings for informed decisions." }
              ].map(feature => (
                <div key={feature.title} className="p-6 bg-user_surface rounded-lg shadow-md">
                  <feature.icon className="h-10 w-10 text-user_primary mb-3" />
                  <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                  <p className="text-user_text_secondary text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 md:py-24 bg-user_primary text-user_background">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Join the DriveDirect community today and experience a new era of car sales.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" asChild className="bg-user_text text-user_primary hover:bg-user_text/90 w-full sm:w-auto">
                <Link href="/signup">
                  <UserPlus className="mr-2 h-5 w-5" /> Create Your Account
                </Link>
              </Button>
               <Button variant="outline" size="lg" asChild className="border-user_text text-user_text hover:bg-user_text hover:text-user_primary w-full sm:w-auto">
                <Link href="/search">
                  <SearchIcon className="mr-2 h-5 w-5" /> Browse Listings
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 bg-user_surface border-t border-user_border">
        <div className="container mx-auto px-4 md:px-6 text-center text-user_text_secondary text-sm">
          <p>&copy; {new Date().getFullYear()} DriveDirect. All rights reserved.</p>
          <p className="mt-1">Revolutionizing P2P car sales in South Africa and beyond.</p>
          <div className="mt-4 flex justify-center gap-4">
            <Link href="/privacy" className="hover:text-user_primary">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-user_primary">Terms of Service</Link>
            <Link href="/contact" className="hover:text-user_primary">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
