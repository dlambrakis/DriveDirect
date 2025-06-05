{/* This completes the file started in the previous response */}
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { Car, PlusCircle, UploadCloud, ArrowLeft, DollarSign, CalendarDays, Palette, Gauge, Settings2, ShieldCheck } from 'lucide-react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { supabase } from '@directdrive/supabase-client'; // Assuming supabase client is set up
import { useState } from 'react';
import { toast } from 'sonner';

const vehicleSchema = z.object({
  make: z.string().min(2, { message: "Make must be at least 2 characters." }),
  model: z.string().min(1, { message: "Model is required." }),
  year: z.coerce.number().min(1900, { message: "Year must be after 1900." }).max(new Date().getFullYear() + 1, { message: "Year cannot be in the distant future." }),
  price: z.coerce.number().positive({ message: "Price must be a positive number." }),
  mileage: z.coerce.number().nonnegative({ message: "Mileage cannot be negative." }),
  color: z.string().optional(),
  engine_type: z.string().optional(), // e.g., Petrol, Diesel, Electric, Hybrid
  transmission: z.enum(['Automatic', 'Manual', 'Other']),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }).max(1000, { message: "Description too long." }),
  // image_urls: z.array(z.string().url()).optional(), // For uploaded images
});

type VehicleFormData = z.infer<typeof vehicleSchema>;

export default function AddVehiclePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, control, formState: { errors } } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
  });

  const onSubmit: SubmitHandler<VehicleFormData> = async (data) => {
    setIsSubmitting(true);
    toast.info('Submitting your vehicle details...');
    try {
      // In a real app, you'd get the authenticated user's ID
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('You must be logged in to add a vehicle.');
        router.push('/login');
        return;
      }

      const vehicleData = {
        ...data,
        seller_id: user.id, // Link vehicle to the current user
        // image_urls: [], // Handle image uploads separately
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      // const { error } = await supabase.from('vehicles').insert([vehicleData]);
      // For now, we'll simulate the insert as no 'vehicles' table exists yet.
      console.log('Simulating insert of vehicle data:', vehicleData);
      const error = null; // Simulate success

      if (error) {
        toast.error(`Failed to add vehicle: ${error.message}`);
      } else {
        toast.success('Vehicle listed successfully!');
        router.push('/profile'); // Redirect to user's profile or listings page
      }
    } catch (e: any) {
      toast.error(`An unexpected error occurred: ${e.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-user_background text-user_text p-4 md:p-8">
      <header className="mb-8">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-user_primary">
            <Car /> DriveDirect
          </Link>
          <Button variant="outline" onClick={() => router.back()} className="border-user_primary text-user_primary hover:bg-user_primary hover:text-user_background">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </div>
      </header>

      <div className="container mx-auto max-w-3xl">
        <Card className="bg-user_surface border-user_border shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-user_text flex items-center">
              <PlusCircle className="mr-3 h-8 w-8 text-user_primary" /> List Your Vehicle
            </CardTitle>
            <CardDescription className="text-user_text_secondary">
              Provide details about the car you want to sell. Accurate information helps attract buyers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="make" className="text-user_text_secondary flex items-center"><Car className="mr-2 h-4 w-4 text-user_accent" />Make</Label>
                  <Input id="make" {...register("make")} placeholder="e.g., Toyota" className="bg-user_background border-user_border text-user_text placeholder:text-user_text_secondary/70 focus:ring-user_primary" />
                  {errors.make && <p className="text-sm text-user_error mt-1">{errors.make.message}</p>}
                </div>
                <div>
                  <Label htmlFor="model" className="text-user_text_secondary flex items-center"><Car className="mr-2 h-4 w-4 text-user_accent" />Model</Label>
                  <Input id="model" {...register("model")} placeholder="e.g., Corolla" className="bg-user_background border-user_border text-user_text placeholder:text-user_text_secondary/70 focus:ring-user_primary" />
                  {errors.model && <p className="text-sm text-user_error mt-1">{errors.model.message}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="year" className="text-user_text_secondary flex items-center"><CalendarDays className="mr-2 h-4 w-4 text-user_accent" />Year</Label>
                  <Input id="year" type="number" {...register("year")} placeholder="e.g., 2018" className="bg-user_background border-user_border text-user_text placeholder:text-user_text_secondary/70 focus:ring-user_primary" />
                  {errors.year && <p className="text-sm text-user_error mt-1">{errors.year.message}</p>}
                </div>
                <div>
                  <Label htmlFor="price" className="text-user_text_secondary flex items-center"><DollarSign className="mr-2 h-4 w-4 text-user_accent" />Price (ZAR)</Label>
                  <Input id="price" type="number" step="0.01" {...register("price")} placeholder="e.g., 250000" className="bg-user_background border-user_border text-user_text placeholder:text-user_text_secondary/70 focus:ring-user_primary" />
                  {errors.price && <p className="text-sm text-user_error mt-1">{errors.price.message}</p>}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="mileage" className="text-user_text_secondary flex items-center"><Gauge className="mr-2 h-4 w-4 text-user_accent" />Mileage (km)</Label>
                  <Input id="mileage" type="number" {...register("mileage")} placeholder="e.g., 55000" className="bg-user_background border-user_border text-user_text placeholder:text-user_text_secondary/70 focus:ring-user_primary" />
                  {errors.mileage && <p className="text-sm text-user_error mt-1">{errors.mileage.message}</p>}
                </div>
                <div>
                  <Label htmlFor="color" className="text-user_text_secondary flex items-center"><Palette className="mr-2 h-4 w-4 text-user_accent" />Color</Label>
                  <Input id="color" {...register("color")} placeholder="e.g., Silver" className="bg-user_background border-user_border text-user_text placeholder:text-user_text_secondary/70 focus:ring-user_primary" />
                  {errors.color && <p className="text-sm text-user_error mt-1">{errors.color.message}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="engine_type" className="text-user_text_secondary flex items-center"><Settings2 className="mr-2 h-4 w-4 text-user_accent" />Engine Type</Label>
                  <Controller
                    name="engine_type"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full bg-user_background border-user_border text-user_text placeholder:text-user_text_secondary/70 focus:ring-user_primary">
                          <SelectValue placeholder="Select engine type" />
                        </SelectTrigger>
                        <SelectContent className="bg-user_surface border-user_border text-user_text">
                          <SelectGroup>
                            <SelectLabel className="text-user_text_secondary">Engine Types</SelectLabel>
                            <SelectItem value="Petrol" className="hover:bg-user_primary/20">Petrol</SelectItem>
                            <SelectItem value="Diesel" className="hover:bg-user_primary/20">Diesel</SelectItem>
                            <SelectItem value="Electric" className="hover:bg-user_primary/20">Electric</SelectItem>
                            <SelectItem value="Hybrid" className="hover:bg-user_primary/20">Hybrid</SelectItem>
                            <SelectItem value="Other" className="hover:bg-user_primary/20">Other</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.engine_type && <p className="text-sm text-user_error mt-1">{errors.engine_type.message}</p>}
                </div>
                <div>
                  <Label htmlFor="transmission" className="text-user_text_secondary flex items-center"><ShieldCheck className="mr-2 h-4 w-4 text-user_accent" />Transmission</Label>
                   <Controller
                    name="transmission"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full bg-user_background border-user_border text-user_text placeholder:text-user_text_secondary/70 focus:ring-user_primary">
                          <SelectValue placeholder="Select transmission" />
                        </SelectTrigger>
                        <SelectContent className="bg-user_surface border-user_border text-user_text">
                           <SelectGroup>
                            <SelectLabel className="text-user_text_secondary">Transmission Types</SelectLabel>
                            <SelectItem value="Automatic" className="hover:bg-user_primary/20">Automatic</SelectItem>
                            <SelectItem value="Manual" className="hover:bg-user_primary/20">Manual</SelectItem>
                            <SelectItem value="Other" className="hover:bg-user_primary/20">Other</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.transmission && <p className="text-sm text-user_error mt-1">{errors.transmission.message}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-user_text_secondary">Description</Label>
                <Textarea id="description" {...register("description")} placeholder="Tell us about your vehicle, its condition, features, and history..." rows={5} className="bg-user_background border-user_border text-user_text placeholder:text-user_text_secondary/70 focus:ring-user_primary" />
                {errors.description && <p className="text-sm text-user_error mt-1">{errors.description.message}</p>}
              </div>

              <div>
                <Label htmlFor="images" className="text-user_text_secondary flex items-center"><UploadCloud className="mr-2 h-4 w-4 text-user_accent" />Vehicle Images</Label>
                <Input id="images" type="file" multiple accept="image/*" className="bg-user_background border-user_border text-user_text file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-user_primary file:text-user_background hover:file:bg-user_primary/90" />
                <p className="text-xs text-user_text_secondary mt-1">Upload up to 10 high-quality images. Good photos attract more buyers!</p>
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full bg-user_primary text-user_background hover:bg-user_primary/90 flex items-center justify-center text-lg py-3">
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-user_background"></div>
                ) : (
                  <><PlusCircle className="mr-2 h-5 w-5" /> List My Vehicle</>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-user_text_secondary text-center w-full">
              By listing your vehicle, you agree to our <Link href="/terms" className="underline hover:text-user_primary">Terms of Service</Link>.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
