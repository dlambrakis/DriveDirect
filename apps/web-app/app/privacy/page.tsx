// apps/web-app/app/privacy/page.tsx
'use client';
import Link from 'next/link';
import { Car, Shield, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function PrivacyPage() {
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
            <Shield className="mr-3 h-10 w-10 text-user_primary" /> Privacy Policy
          </h1>
          <div className="prose prose-invert max-w-none text-user_text_secondary space-y-6 marker:text-user_primary [&_strong]:text-user_text [&_a]:text-user_primary hover:[&_a]:underline">
            <p>Last Updated: {new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <p>DriveDirect ("us", "we", or "our") operates the DriveDirect website and mobile applications (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>

            <h2 className="text-2xl font-semibold text-user_text !mt-10">1. Information Collection and Use</h2>
            <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
            <h3 className="text-xl font-medium text-user_text">Types of Data Collected:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to: email address, first name and last name, phone number, address, usage data.</li>
              <li><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</li>
              <li><strong>Tracking & Cookies Data:</strong> We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</li>
            </ul>

            <h2 className="text-2xl font-semibold text-user_text">2. Use of Data</h2>
            <p>DriveDirect uses the collected data for various purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so that we can improve our Service</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>

            <h2 className="text-2xl font-semibold text-user_text">3. Disclosure of Data</h2>
            <p>DriveDirect may disclose your Personal Data in the good faith belief that such action is necessary to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To comply with a legal obligation</li>
              <li>To protect and defend the rights or property of DriveDirect</li>
              <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
              <li>To protect the personal safety of users of the Service or the public</li>
              <li>To protect against legal liability</li>
            </ul>

            <h2 className="text-2xl font-semibold text-user_text">4. Security of Data</h2>
            <p>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>

            <h2 className="text-2xl font-semibold text-user_text">5. Your Data Protection Rights</h2>
            <p>DriveDirect aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data. If you wish to be informed what Personal Data we hold about you and if you want it to be removed from our systems, please contact us.</p>
            
            <h2 className="text-2xl font-semibold text-user_text">6. Changes to This Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

            <h2 className="text-2xl font-semibold text-user_text">7. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please <Link href="/contact">contact us</Link>.</p>
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
