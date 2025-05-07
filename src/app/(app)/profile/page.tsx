// src/app/(app)/profile/page.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Edit3, Mail, User, Shield, UploadCloud, Save, ImagePlus } from "lucide-react";
import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email(), // Email is not editable, so validation is mostly for display
  bio: z.string().max(200, "Bio cannot exceed 200 characters.").optional(),
  avatarDataUrl: z.string().optional(), // Stores the Base64 Data URL of the avatar
});

type ProfileFormValues = z.infer<typeof profileSchema>;

// Define a default structure in case nothing is in localStorage
const defaultUser = {
  name: "Alex Johnson",
  email: "alex.j@example.com", // Use a generic default email
  avatarDataUrl: `https://picsum.photos/seed/${Math.random()}/200`, // Default placeholder
  bio: "Content strategist and AI enthusiast.",
  plan: "Pro Plan", // Plan is not part of the editable form for now
};

export default function ProfilePage() {
  const { toast } = useToast();
  // Initialize state with a structure, but potentially empty values before loading
  const [userProfile, setUserProfile] = useState<ProfileFormValues>({ name: '', email: '', bio: '', avatarDataUrl: ''});
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: userProfile, // Set initial default values
  });

  // Load profile from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProfile = localStorage.getItem("userProfile");
      let loadedProfile: ProfileFormValues;
      
      if (storedProfile) {
          try {
              loadedProfile = JSON.parse(storedProfile);
              // Ensure loaded profile has all necessary fields, fallback to default if missing
              loadedProfile = { ...defaultUser, ...loadedProfile }; 
          } catch (e) {
              console.error("Failed to parse user profile from localStorage", e);
              loadedProfile = { ...defaultUser }; // Use default if parsing fails
              localStorage.setItem("userProfile", JSON.stringify(loadedProfile)); // Save corrected default
          }
      } else {
        // If no stored profile, use the default one and save it
        loadedProfile = { ...defaultUser };
        localStorage.setItem("userProfile", JSON.stringify(loadedProfile));
      }

      setUserProfile(loadedProfile);
      form.reset(loadedProfile); // Update form with loaded data AFTER setting state
      setAvatarPreview(loadedProfile.avatarDataUrl || null);
    }
  }, [form]); // Rerun effect if 'form' object changes (though unlikely, it's good practice)


  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // Limit file size (e.g., 2MB)
         toast({
            title: "Image Too Large",
            description: "Please upload an image smaller than 2MB.",
            variant: "destructive",
         });
         return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setAvatarPreview(dataUrl);
        form.setValue("avatarDataUrl", dataUrl); // Update form state
      };
      reader.onerror = () => {
         toast({
            title: "Error Reading File",
            description: "Could not read the selected image file.",
            variant: "destructive",
         });
      }
      reader.readAsDataURL(file);
    }
  };

  function onSubmit(data: ProfileFormValues) {
    // Combine current profile with form data, using the preview for avatar
     const updatedProfile = { 
        ...userProfile, // Include non-form fields like email, plan
        ...data, // Overwrite with submitted form data (name, bio)
        avatarDataUrl: avatarPreview || userProfile.avatarDataUrl // Use preview if changed, else keep old
    };
    setUserProfile(updatedProfile); // Update component state
    
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("userProfile", JSON.stringify(updatedProfile)); // Save to localStorage
         toast({
            title: "Profile Updated",
            description: "Your profile information has been saved.",
        });
        // Dispatch a custom event that the header can listen for
        window.dispatchEvent(new CustomEvent('profileUpdated', { detail: updatedProfile }));
      } catch (e) {
         console.error("Failed to save profile to localStorage", e);
          toast({
            title: "Save Error",
            description: "Could not save profile. Storage might be full.",
            variant: "destructive",
        });
      }
    }
   
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <motion.header 
        className="mb-8"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Your Profile</h1>
        <p className="text-muted-foreground">Manage your account details and preferences.</p>
      </motion.header>

      <motion.div 
        className="grid gap-8 md:grid-cols-3"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
      >
        {/* Profile Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <Card className="shadow-lg">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="relative group">
                <Avatar className="h-24 w-24 mb-4 border-2 border-primary group-hover:opacity-80 transition-opacity">
                  <AvatarImage src={avatarPreview || undefined} alt={userProfile.name || 'User'} data-ai-hint="person portrait" />
                  <AvatarFallback>{userProfile.name ? userProfile.name.substring(0,1).toUpperCase() : "U"}</AvatarFallback>
                </Avatar>
                 {/* Upload Overlay */}
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full mb-4 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                  title="Upload new photo"
                  >
                   <ImagePlus className="h-8 w-8 text-white" />
                </div>
              </div>
              <h2 className="text-xl font-semibold">{form.watch("name")}</h2>
              <p className="text-sm text-muted-foreground">{userProfile.email}</p>
               {/* Hidden File Input */}
              <Input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/png, image/jpeg, image/webp" // Specify accepted types
                onChange={handleAvatarChange} 
              />
               {/* Explicit Upload Button (Optional) */}
               <Button variant="outline" size="sm" className="mt-4" onClick={() => fileInputRef.current?.click()}>
                <UploadCloud className="mr-2 h-4 w-4" /> Change Photo
              </Button>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-lg">Current Plan</CardTitle>
            </CardHeader>
             <CardContent>
                <p className="text-primary font-semibold">{defaultUser.plan}</p> {/* Assuming plan is not dynamic for now */}
                <p className="text-xs text-muted-foreground mb-3">You have access to all Pro features.</p>
                <Button variant="secondary" className="w-full">Manage Subscription</Button>
             </CardContent>
          </Card>
        </div>

        {/* Profile Details Form */}
        <div className="md:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel><User className="inline mr-2 h-4 w-4 text-muted-foreground"/>Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel><Mail className="inline mr-2 h-4 w-4 text-muted-foreground"/>Email Address</FormLabel>
                        <FormControl>
                           {/* Display email from state, not directly from form field */}
                           <Input type="email" value={userProfile.email} disabled />
                        </FormControl>
                        <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={3}
                            placeholder="Tell us a bit about yourself..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    <Save className="mr-2 h-4 w-4"/> {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </CardContent>
              </Card>
            </form>
          </Form>

          <Separator className="my-8" />

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your account security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between p-4 border rounded-md">
                   <div>
                       <h3 className="font-medium">Password</h3>
                       <p className="text-sm text-muted-foreground">Last changed: 3 months ago</p>
                   </div>
                   <Button variant="outline"><Shield className="mr-2 h-4 w-4"/>Change Password</Button>
               </div>
                <div className="flex items-center justify-between p-4 border rounded-md">
                   <div>
                       <h3 className="font-medium">Two-Factor Authentication</h3>
                       <p className="text-sm text-muted-foreground">Not enabled</p>
                   </div>
                   <Button variant="outline">Enable 2FA</Button>
               </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
