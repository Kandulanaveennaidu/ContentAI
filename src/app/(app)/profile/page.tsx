// src/app/(app)/profile/page.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Edit3, Mail, User, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  // Placeholder user data
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatarUrl: "https://picsum.photos/seed/alexprofile/200",
    bio: "Content strategist and AI enthusiast. Helping creators make an impact.",
    plan: "Pro Plan",
  };

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
                <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person portrait" />
                <AvatarFallback>{user.name.substring(0,1).toUpperCase()}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <Button variant="outline" size="sm" className="mt-4">
                <Edit3 className="mr-2 h-4 w-4" /> Change Photo
              </Button>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="text-lg">Current Plan</CardTitle>
            </CardHeader>
             <CardContent>
                <p className="text-primary font-semibold">{user.plan}</p>
                <p className="text-xs text-muted-foreground mb-3">You have access to all Pro features.</p>
                <Button variant="secondary" className="w-full">Manage Subscription</Button>
             </CardContent>
          </Card>
        </div>

        {/* Profile Details Form */}
        <div className="md:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name"><User className="inline mr-2 h-4 w-4 text-muted-foreground"/>Full Name</Label>
                <Input id="name" defaultValue={user.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email"><Mail className="inline mr-2 h-4 w-4 text-muted-foreground"/>Email Address</Label>
                <Input id="email" type="email" defaultValue={user.email} disabled />
                <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  defaultValue={user.bio}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  rows={3}
                />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

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
