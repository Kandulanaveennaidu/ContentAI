// src/app/(app)/profile/page.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Edit3, Mail, User, Shield, UploadCloud, Save } from "lucide-react";
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
  avatarDataUrl: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const defaultUser = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  avatarDataUrl: "https://picsum.photos/seed/alexprofile/200",
  bio: "Content strategist and AI enthusiast. Helping creators make an impact.",
  plan: "Pro Plan", // Plan is not part of the editable form for now
};

export default function ProfilePage() {
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<ProfileFormValues>(defaultUser);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(defaultUser.avatarDataUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: userProfile,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProfile = localStorage.getItem("userProfile");
      if (storedProfile) {
        const loadedProfile = JSON.parse(storedProfile);
        setUserProfile(loadedProfile);
        form.reset(loadedProfile); // Update form with loaded data
        setAvatarPreview(loadedProfile.avatarDataUrl || defaultUser.avatarDataUrl);
      } else {
        // If no stored profile, save the default one
        localStorage.setItem("userProfile", JSON.stringify(defaultUser));
        form.reset(defaultUser);
      }
    }
  }, [form]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setAvatarPreview(dataUrl);
        form.setValue("avatarDataUrl", dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  function onSubmit(data: ProfileFormValues) {
    const updatedProfile = { ...userProfile, ...data, avatarDataUrl: avatarPreview || data.avatarDataUrl };
    setUserProfile(updatedProfile);
    if (typeof window !== "undefined") {
      localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
    }
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });
     // Force re-render of header by briefly navigating away and back or using a state update
    // This is a common pattern if the header doesn't re-render automatically.
    // Forcing a reload, although not ideal for SPAs, ensures header updates for now.
    window.dispatchEvent(new Event('storage')) // Or a more targeted event if Header listens to it
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
              <Avatar className="h-24 w-24 mb-4 border-2 border-primary">
                <AvatarImage src={avatarPreview || undefined} alt={userProfile.name} data-ai-hint="person portrait" />
                <AvatarFallback>{userProfile.name ? userProfile.name.substring(0,1).toUpperCase() : "U"}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{form.watch("name")}</h2>
              <p className="text-sm text-muted-foreground">{userProfile.email}</p>
              <Button variant="outline" size="sm" className="mt-4" onClick={() => fileInputRef.current?.click()}>
                <UploadCloud className="mr-2 h-4 w-4" /> Change Photo
              </Button>
              <Input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleAvatarChange} 
              />
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
                          <Input type="email" {...field} disabled />
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
