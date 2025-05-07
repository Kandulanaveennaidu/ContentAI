// src/app/company/page.tsx
"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Users, Target, Lightbulb, Zap, Briefcase, MapPin, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const teamMembers = [
  { name: "Alex Johnson", role: "Founder & CEO", avatar: "https://picsum.photos/seed/alexceo/120", hint: "man portrait professional" },
  { name: "Maria Garcia", role: "Head of Product", avatar: "https://picsum.photos/seed/mariaprod/120", hint: "woman smiling glasses" },
  { name: "David Lee", role: "Lead AI Engineer", avatar: "https://picsum.photos/seed/davidai/120", hint: "man tech background" },
  { name: "Sarah Chen", role: "Marketing Director", avatar: "https://picsum.photos/seed/sarahmarket/120", hint: "woman professional pose" },
];

const coreValues = [
  { icon: Lightbulb, title: "Innovation", description: "Pioneering AI solutions to redefine content creation and strategy." },
  { icon: Users, title: "Customer Obsession", description: "Placing our users at the heart of everything we build and do." },
  { icon: Zap, title: "Impact-Driven", description: "Focusing on delivering tangible results and measurable success for our clients." },
  { icon: Target, title: "Integrity & Transparency", description: "Building trust through ethical practices and open communication." },
];

const fadeIn = (delay: number = 0, y: number = 20) => ({
  hidden: { opacity: 0, y },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } },
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export default function CompanyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <motion.section 
            className="text-center mb-16 md:mb-24 relative overflow-hidden py-10 md:py-16 rounded-xl bg-secondary"
            variants={fadeIn()}
            initial="hidden"
            animate="visible"
          >
             <Image 
                src="https://picsum.photos/seed/companybg/1200/400?blur=2" 
                alt="Abstract company background" 
                layout="fill"
                objectFit="cover"
                className="absolute inset-0 -z-10 opacity-30"
                data-ai-hint="abstract office building"
              />
            <div className="relative z-10">
                <Users className="mx-auto h-16 w-16 text-primary mb-4" />
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                About <span className="text-primary">ContentAI Inc.</span>
                </h1>
                <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
                We are a passionate team dedicated to empowering creators and businesses with intelligent tools to elevate their content and achieve their goals.
                </p>
            </div>
          </motion.section>

          {/* Our Mission Section */}
          <motion.section 
            className="mb-16 md:mb-24 grid md:grid-cols-2 gap-10 lg:gap-16 items-center"
            variants={fadeIn(0.2)}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground">Our Mission</h2>
              <p className="text-muted-foreground text-lg">
                To democratize access to advanced AI-driven content analysis and optimization tools, enabling individuals and organizations of all sizes to create content that resonates deeply, engages effectively, and drives meaningful results.
              </p>
              <p className="text-muted-foreground">
                We believe that powerful AI shouldn't be confined to large enterprises. ContentAI is built on the principle of making sophisticated technology intuitive, accessible, and affordable for everyone who strives to communicate more effectively.
              </p>
            </div>
             <motion.div variants={fadeIn(0.3)} initial="hidden" animate="visible">
              <Image 
                src="https://picsum.photos/seed/missionvision/600/450" 
                alt="Team collaborating on a shared vision" 
                width={600} 
                height={450}
                className="rounded-xl shadow-2xl object-cover"
                data-ai-hint="team vision board"
              />
            </motion.div>
          </motion.section>

          {/* Core Values Section */}
          <motion.section 
            className="mb-16 md:mb-24"
            variants={fadeIn(0.4)}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-semibold tracking-tight text-foreground mb-10 text-center">Our Core Values</h2>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
            >
              {coreValues.map((value, index) => (
                <motion.div key={value.title} variants={fadeIn(0, 25)}>
                  <Card className="h-full text-center hover:shadow-xl transition-shadow duration-300 p-2">
                    <CardHeader className="items-center">
                      <div className="mb-3 rounded-full bg-primary/10 p-4 text-primary inline-block">
                        <value.icon className="h-8 w-8" />
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
          
          {/* Meet The Team Section */}
          <motion.section 
            className="mb-16 md:mb-24"
            variants={fadeIn(0.6)}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-semibold tracking-tight text-foreground mb-10 text-center">Meet Our Leadership</h2>
            <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                variants={containerVariants}
            >
              {teamMembers.map((member, index) => (
                <motion.div key={member.name} variants={fadeIn(0, 25)}>
                  <Card className="text-center hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="pt-6">
                      <Avatar className="h-24 w-24 mx-auto mb-4 border-2 border-primary">
                        <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.hint}/>
                        <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                      <p className="text-sm text-primary">{member.role}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Careers Section */}
          <motion.section 
            className="mb-12 md:mb-20 py-12 md:py-16 bg-secondary rounded-lg text-center"
            variants={fadeIn(0.8)}
            initial="hidden"
            animate="visible"
          >
            <Briefcase className="mx-auto h-12 w-12 text-primary mb-4"/>
            <h2 className="text-3xl font-semibold tracking-tight text-secondary-foreground mb-4">Join Our Team</h2>
            <p className="mt-2 max-w-xl mx-auto text-lg text-secondary-foreground/80 mb-8">
              We're always looking for talented individuals passionate about AI and content. Explore opportunities to make an impact with ContentAI.
            </p>
            <Button size="lg" variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
              View Open Positions (Coming Soon)
            </Button>
          </motion.section>

            {/* Contact Information */}
            <motion.section
            className="py-12"
            variants={fadeIn(0.9)}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-3xl font-semibold tracking-tight text-foreground mb-10 text-center">Our Headquarters</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <Image src="https://picsum.photos/seed/hqoffice/600/400" alt="ContentAI Office Exterior" width={600} height={400} className="rounded-xl shadow-lg" data-ai-hint="modern office building"/>
                </div>
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>ContentAI Inc.</CardTitle>
                        <CardDescription>Innovating the future of content.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-center text-muted-foreground">
                            <MapPin className="h-5 w-5 mr-3 text-primary"/>
                            123 AI Innovation Drive, Tech Park, CA 94000, USA
                        </div>
                         <div className="flex items-center text-muted-foreground">
                            <Mail className="h-5 w-5 mr-3 text-primary"/>
                            <a href="mailto:info@contentai.com" className="hover:text-primary">info@contentai.com</a>
                        </div>
                         <div className="flex items-center text-muted-foreground">
                            <Phone className="h-5 w-5 mr-3 text-primary"/>
                            <a href="tel:+15551234567" className="hover:text-primary">+1 (555) 123-4567</a>
                        </div>
                        <Link href="/contact" passHref className="block pt-2">
                          <Button variant="outline">Get in Touch</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
          </motion.section>


        </div>
      </main>
      <Footer />
    </div>
  );
}
