// src/app/(app)/settings/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Bell, Palette, Globe, ShieldCheck, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);


  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
  };

  if (!mounted) return null; // Avoid hydration mismatch for theme select

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <motion.header 
        className="mb-8"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground">Customize your ContentAI experience.</p>
      </motion.header>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
        {/* Appearance Settings */}
        <motion.div variants={cardVariants} custom={1}>
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              <CardTitle>Appearance</CardTitle>
            </div>
            <CardDescription>Customize the look and feel of the application.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="theme-select" className="text-sm font-medium">Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger id="theme-select" className="w-[180px]">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="flex items-center justify-between">
              <Label htmlFor="font-size" className="text-sm font-medium">Font Size</Label>
               <Select defaultValue="medium">
                <SelectTrigger id="font-size" className="w-[180px]">
                  <SelectValue placeholder="Select font size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="flex items-center space-x-2">
                <Switch id="compact-mode" />
                <Label htmlFor="compact-mode">Enable Compact Mode</Label>
            </div>
          </CardContent>
        </Card>
        </motion.div>

        {/* Notification Settings */}
         <motion.div variants={cardVariants} custom={2}>
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>Manage how you receive notifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="email-notifications" defaultChecked />
              <Label htmlFor="email-notifications">Email Notifications</Label>
            </div>
            <p className="text-xs text-muted-foreground pl-6">Receive updates about new features and important account activity.</p>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="app-notifications" />
              <Label htmlFor="app-notifications">In-App Notifications</Label>
            </div>
             <p className="text-xs text-muted-foreground pl-6">Get notified directly within the ContentAI platform.</p>

            <div className="flex items-center space-x-2">
              <Checkbox id="weekly-digest" />
              <Label htmlFor="weekly-digest">Weekly Digest Email</Label>
            </div>
            <p className="text-xs text-muted-foreground pl-6">A summary of your activity and content performance.</p>
            <Button className="mt-2">Update Notification Preferences</Button>
          </CardContent>
        </Card>
        </motion.div>

        {/* Account & Data Settings */}
        <motion.div variants={cardVariants} custom={3}>
        <Card className="shadow-lg">
          <CardHeader>
             <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <CardTitle>Account & Data</CardTitle>
            </div>
            <CardDescription>Manage your account data and privacy settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
                <Label htmlFor="language-select" className="text-sm font-medium">Language</Label>
                <Select defaultValue="en">
                    <SelectTrigger id="language-select" className="w-[180px]">
                    <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español (Coming Soon)</SelectItem>
                    <SelectItem value="fr">Français (Coming Soon)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button variant="outline" className="w-full justify-start">
                <Globe className="mr-2 h-4 w-4" /> Export My Data (Coming Soon)
            </Button>
            <Button variant="destructive" className="w-full justify-start">
                <Trash2 className="mr-2 h-4 w-4" /> Delete My Account (Coming Soon)
            </Button>
          </CardContent>
        </Card>
        </motion.div>
      </div>
    </div>
  );
}
