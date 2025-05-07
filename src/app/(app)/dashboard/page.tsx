// src/app/(app)/dashboard/page.tsx
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, BookOpen, MessageSquare, Users } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const overviewStats = [
  { title: "Total Analyses", value: "152", icon: BookOpen, trend: "+12%", color: "text-primary" },
  { title: "Avg. Readability", value: "75.3", icon: BarChart3, trend: "-2.1%", color: "text-blue-500" },
  { title: "Avg. Engagement", value: "High", icon: MessageSquare, trend: "+5%", color: "text-green-500" },
  { title: "Team Members", value: "5", icon: Users, trend: "N/A", color: "text-purple-500" },
];

const recentActivity = [
  { id: "1", title: "Blog Post: Future of AI", status: "Analyzed", date: "2 days ago", readability: 82, engagement: "High" },
  { id: "2", title: "Marketing Email Q3", status: "Pending", date: "1 day ago" },
  { id: "3", title: "Website Homepage Copy", status: "Analyzed", date: "5 days ago", readability: 65, engagement: "Medium" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }),
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <motion.header 
        className="mb-8"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your content performance.</p>
      </motion.header>

      {/* Overview Stats */}
      <motion.section 
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8"
        variants={{ visible: { transition: { staggerChildren: 0.1 }}}}
        initial="hidden"
        animate="visible"
      >
        {overviewStats.map((stat, index) => (
          <motion.div key={stat.title} variants={cardVariants} custom={index}>
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.trend} from last month</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.section>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Recent Activity */}
        <motion.section 
          className="lg:col-span-2"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest content analyses and drafts.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="flex items-center justify-between p-3 rounded-md hover:bg-secondary/50 transition-colors">
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.date} - Status: <span className={`font-semibold ${activity.status === "Analyzed" ? "text-green-600" : "text-amber-600"}`}>{activity.status}</span></p>
                    </div>
                    <div className="text-right">
                      {activity.readability && <p className="text-sm">Readability: <span className="font-bold text-primary">{activity.readability}</span></p>}
                      {activity.engagement && <p className="text-xs text-muted-foreground">Engagement: <span className="font-semibold text-primary">{activity.engagement}</span></p>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
                <Link href="/analyze#history-card" className="w-full">
                     <Button variant="outline" className="w-full">View All Activity</Button>
                </Link>
            </CardFooter>
          </Card>
        </motion.section>

        {/* Quick Actions & Resources */}
        <motion.section
           variants={cardVariants}
           initial="hidden"
           animate="visible"
           custom={2}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/analyze" passHref>
                <Button className="w-full justify-start">
                  <BookOpen className="mr-2 h-4 w-4" /> Analyze New Content
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" /> Manage Team (Coming Soon)
              </Button>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg mt-6">
            <CardHeader>
                <CardTitle>Resources & Help</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
                <Image src="https://picsum.photos/seed/helpdesk/300/200" alt="Help and support" width={300} height={200} className="rounded-md mb-4" data-ai-hint="customer support person"/>
                <p className="text-sm text-muted-foreground mb-3">Need help getting started or have questions? Our team is here for you.</p>
                <Link href="/contact" passHref>
                    <Button variant="secondary">Contact Support</Button>
                </Link>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}
