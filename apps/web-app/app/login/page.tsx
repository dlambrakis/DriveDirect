// apps/web-app/app/login/page.tsx
'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Car, LogIn } from 'lucide-react';

export default function LoginPage() {
  // Add form handling logic here (e.g., using react-hook-form)
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle login
    console.log('Login submitted');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-user_background p-4">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <Car className="h-10 w-10 text-user_primary" />
        <span className="text-3xl font-bold tracking-tight text-user_text">DriveDirect</span>
      </Link>
      <Card className="w-full max-w-md bg-user_surface border-user_border">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-user_text">Welcome Back!</CardTitle>
          <CardDescription className="text-user_text_secondary">Sign in to continue to DriveDirect.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-user_text_secondary">Email Address</Label>
              <Input id="email" type="email" placeholder="you@example.com" required className="bg-user_background border-user_border text-user_text placeholder:text-user_text_secondary/70 focus:ring-user_primary" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-user_text_secondary">Password</Label>
                <Link href="/forgot-password" className="text-sm text-user_primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" placeholder="••••••••" required className="bg-user_background border-user_border text-user_text placeholder:text-user_text_secondary/70 focus:ring-user_primary" />
            </div>
            <Button type="submit" className="w-full bg-user_primary text-user_background hover:bg-user_primary/90">
              <LogIn className="mr-2 h-5 w-5" /> Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <p className="text-sm text-user_text_secondary">
            Don't have an account?{' '}
            <Link href="/signup" className="font-medium text-user_primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
