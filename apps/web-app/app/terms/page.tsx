// apps/web-app/app/terms/page.tsx
'use client';
import Link from 'next/link';
import { Car, FileText, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function TermsPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-user_background text-user_text">
      <header className="sticky top-0 z-50 w-full border-b border-user_border bg-user_surface/80 backdrop-blur-md">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Car className="h-8 w-8 text-user_primary" />
            <span className="text-2xl font-bold tracking-tight">DriveDirect</span>
          </Link>
          <Button variant="outline" onClick={() => router.back()} className="border-user_primary text-user_primary hover:bg-user_primary hover:text-user_background">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div>
      </header>
      <main className="container mx-auto max-w-3xl py-12 px-4 md:px-6">
        <div className="bg-user_surface p-8 md:p-12 rounded-lg shadow-xl border border-user_border">
          <h1 className="text-3xl md:text-4xl font-bold text-user_text mb-8 flex items-center">
            <FileText className="mr-3 h-10 w-10 text-user_primary" /> Terms of Service
          </h1>
          <div className="prose prose-invert max-w-none text-user_text_secondary space-y-6 marker:text-user_primary [&_strong]:text-user_text [&_a]:text-user_primary hover:[&_a]:underline">
            <p>Last Updated: {new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <p>Welcome to DriveDirect! These Terms of Service ("Terms") govern your use of the DriveDirect website, mobile applications, and services (collectively, the "Service") operated by DriveDirect ("us", "we", or "our"). Please read these Terms carefully before using our Service.</p>

            <h2 className="text-2xl font-semibold text-user_text !mt-10">1. Acceptance of Terms</h2>
            <p>By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service. We may amend these Terms from time to time. Your continued use of the Service after any such amendment constitutes your acceptance of the new Terms.</p>

            <h2 className="text-2xl font-semibold text-user_text">2. Use of Service</h2>
            <p>DriveDirect is a platform that connects buyers and sellers of vehicles. We are not a party to any transaction between buyers and sellers. We do not own, inspect, buy, or sell any vehicles listed on our Service.</p>
            <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You are responsible for all your activity in connection with the Service.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You must be at least 18 years old to use the Service.</li>
              <li>You agree not to post false, misleading, or inaccurate information.</li>
              <li>You agree not to use the Service to harass, abuse, or harm another person.</li>
              <li>You are responsible for maintaining the confidentiality of your account and password.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-user_text">3. Listings and Transactions</h2>
            <p>Sellers are responsible for the accuracy and legality of their listings. Buyers are responsible for exercising due diligence before purchasing a vehicle. DriveDirect does not guarantee the quality, safety, or legality of items listed, the truth or accuracy of listings, the ability of sellers to sell items, or the ability of buyers to pay for items.</p>
            <p>We recommend that buyers and sellers meet in person in a safe, public location to complete transactions. DriveDirect is not responsible for any disputes between users.</p>

            <h2 className="text-2xl font-semibold text-user_text">4. Intellectual Property</h2>
            <p>The Service and its original content, features, and functionality are and will remain the exclusive property of DriveDirect and its licensors. The Service is protected by copyright, trademark, and other laws of both South Africa and foreign countries.</p>

            <h2 className="text-2xl font-semibold text-user_text">5. Disclaimer of Warranties; Limitation of Liability</h2>
            <p>The Service is provided on an "AS IS" and "AS AVAILABLE" basis. DriveDirect makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
            <p>In no event shall DriveDirect or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on DriveDirect's website, even if DriveDirect or a DriveDirect authorized representative has been notified orally or in writing of the possibility of such damage.</p>
            
            <h2 className="text-2xl font-semibold text-user_text">6. Governing Law</h2>
            <p>These Terms shall be governed and construed in accordance with the laws of South Africa, without regard to its conflict of law provisions.</p>

            <h2 className="text-2xl font-semibold text-user_text">7. Contact Us</h2>
            <p>If you have any questions about these Terms, please <Link href="/contact">contact us</Link>.</p>
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
