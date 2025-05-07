// src/app/(auth)/login/page.tsx
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import useRouter
import { useToast } from '@/hooks/use-toast'; // Import useToast


const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

// Define a default structure in case nothing is in localStorage
const defaultUser = {
  name: "Alex Johnson",
  email: "alex.j@example.com", // Use a generic default email
  avatarDataUrl: null, // No default avatar image, rely on fallback
  bio: "Content strategist and AI enthusiast.",
  plan: "Pro Plan", // Plan is not part of the editable form for now
};


export default function LoginPage() {
  const router = useRouter(); // Initialize useRouter
  const { toast } = useToast(); // Initialize useToast

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: LoginFormValues) {
    console.log(data);
    // Handle login logic here
    // For demonstration, set a localStorage item to simulate login
    // And create a default profile if one doesn't exist
    if (typeof window !== "undefined") {
        localStorage.setItem('isLoggedIn', 'true');
        
        // Set a basic profile if none exists
        if (!localStorage.getItem('userProfile')) {
             const basicProfile = {
                ...defaultUser, // Start with defaults
                email: data.email, // Use the entered email
                name: "New User", // A placeholder name
                avatarDataUrl: null,
                bio: "Just joined ContentAI!",
                plan: "Free" // Default to Free plan on first login
            };
            localStorage.setItem('userProfile', JSON.stringify(basicProfile));
            // Dispatch event so header updates immediately
            window.dispatchEvent(new CustomEvent('profileUpdated', { detail: basicProfile }));
        } else {
            // If profile exists, trigger update in case header missed it
            try {
                const existingProfile = JSON.parse(localStorage.getItem('userProfile')!);
                window.dispatchEvent(new CustomEvent('profileUpdated', { detail: existingProfile }));
            } catch (e) { /* Ignore parse error */ }
        }
    }
    toast({
        title: "Login Successful!",
        description: "Welcome back!",
    });
    router.push('/dashboard'); // Redirect to dashboard or analyze page
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
      <Card className="w-full max-w-md shadow-2xl animate-fadeIn">
        <CardHeader className="text-center">
          <Link href="/" className="inline-block mb-4">
             {/* Reference the updated SVG logo */}
            <Image src="/logo.svg" alt="ContentAI Logo" width={40} height={40} className="mx-auto" />
          </Link>
          <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
          <CardDescription>Log in to access your ContentAI dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link href="#" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Log In
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
           <p className="text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

