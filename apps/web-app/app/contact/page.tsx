// apps/web-app/app/contact/page.tsx
'use client';
import Link from 'next/link';
import { Car, Mail, MessageSquare, ArrowLeft, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

const contactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject is too short"),
  message: z.string().min(10, "Message is too short"),
});
type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    toast.info("Sending your message...");
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Contact form submitted:", data);
    toast.success("Message sent successfully! We'll get back to you soon.");
    reset();
  };

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
      <main className="container mx-auto py-12 px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-user_text mb-4">Get In Touch</h1>
          <p className="text-lg text-user_text_secondary max-w-2xl mx-auto">
            Have questions, feedback, or need support? We're here to help. Reach out to us through the form below or via our contact details.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="bg-user_surface p-8 rounded-lg shadow-xl border border-user_border">
            <h2 className="text-2xl font-semibold text-user_text mb-6 flex items-center">
              <MessageSquare className="mr-3 h-7 w-7 text-user_primary" /> Send Us a Message
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-user_text_secondary">Full Name</Label>
                <Input id="name" {...register("name")} placeholder="Your Name" className="bg-user_background border-user_border text-user_text placeholder:text-user_text_secondary/70 focus:ring-user_primary" />
                {errors.name && <p className="text-sm text-user_error mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="email" className="text-user_text_secondary">Email Address</Label>
                <Input id="email" type="email" {...register("email")} placeholder="you@example.com" className="bg-user_background border-user_border text-user_text placeholder:text-user_text_secondary/70 focus:ring-user_primary" />
                {errors.email && <p className="text-sm text-user_error mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="subject" className="text-user_text_secondary">Subject</Label>
                <Input id="subject" {...register("subject")} placeholder="Regarding..." className="bg-user_background border-user_border text-user_text placeholder:text-user_text_secondary/70 focus:ring-user_primary" />
                {errors.subject && <p className="text-sm text-user_error mt-1">{errors.subject.message}</p>}
              </div>
              <div>
                <Label htmlFor="message" className="text-user_text_secondary">Message</Label>
                <Textarea id="message" {...register("message")} placeholder="Your message here..." rows={5} className="bg-user_background border-user_border text-user_text placeholder:text-user_text_secondary/70 focus:ring-user_primary" />
                {errors.message && <p className="text-sm text-user_error mt-1">{errors.message.message}</p>}
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full bg-user_primary text-user_background hover:bg-user_primary/90 text-lg py-3">
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-user_background"></div>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-user_surface p-8 rounded-lg shadow-xl border border-user_border">
              <h2 className="text-2xl font-semibold text-user_text mb-4">Contact Information</h2>
              <ul className="space-y-3 text-user_text_secondary">
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-user_accent" />
                  <a href="mailto:support@drivedirect.co.za" className="hover:text-user_primary">support@drivedirect.co.za</a>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-user_accent" />
                  <span>+27 (010) 123 4567 (Mon-Fri, 9am-5pm SAST)</span>
                </li>
                <li className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3 text-user_accent" />
                  <span>123 DriveWell Street, Johannesburg, South Africa</span>
                </li>
              </ul>
            </div>
            <div className="bg-user_surface p-8 rounded-lg shadow-xl border border-user_border">
              <h2 className="text-2xl font-semibold text-user_text mb-4">Frequently Asked Questions</h2>
              <p className="text-user_text_secondary mb-4">
                Many common questions are answered in our FAQ section.
              </p>
              <Button variant="outline" asChild className="border-user_secondary text-user_secondary hover:bg-user_secondary hover:text-user_background">
                <Link href="/faq">Visit FAQ Page</Link>
              </Button>
            </div>
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
