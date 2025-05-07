"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CalendarCheck, Users, BarChart2, CheckCircle, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const demoFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  companyName: z.string().min(2, "Company name is required."),
  role: z.string().optional(),
  message: z.string().optional(),
});
type DemoFormValues = z.infer<typeof demoFormSchema>;

export default function BookADemoPage() {
  const { toast } = useToast();
  const form = useForm<DemoFormValues>({
    resolver: zodResolver(demoFormSchema),
    defaultValues: { fullName: "", email: "", companyName: "", role: "", message: "" },
  });

  function onSubmit(data: DemoFormValues) {
    console.log("Demo request submitted:", data);
    // Here you would typically send data to your backend
    toast({ 
        title: "Demo Request Submitted!", 
        description: "Our team will review your request and get back to you shortly to schedule your personalized demo." 
    });
    form.reset();
  }

  const fadeIn = (delay: number = 0, y: number = 20) => ({
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } },
  });

  const demoBenefits = [
    { icon: CalendarCheck, title: "Tailored Walkthrough", description: "A personalized tour of ContentAI features relevant to your specific needs and goals." },
    { icon: Users, title: "Q&A Session", description: "Get your questions answered directly by our product specialists." },
    { icon: BarChart2, title: "Strategy Discussion", description: "Explore how ContentAI can integrate into your existing workflows and elevate your content strategy." },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.section
            className="text-center mb-12 md:mb-16"
            variants={fadeIn()}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
              variants={fadeIn(0.1)}
            >
              Book a <span className="text-primary">Personalized Demo</span>
            </motion.h1>
            <motion.p
              className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground"
              variants={fadeIn(0.2)}
            >
              See ContentAI in action and discover how it can revolutionize your content strategy. Our experts are ready to show you the power of AI-driven content optimization.
            </motion.p>
          </motion.section>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
            <motion.div variants={fadeIn(0.3)} initial="hidden" animate="visible">
              <Card className="shadow-xl border-border hover:shadow-primary/10 transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl">Request Your Demo</CardTitle>
                  <CardDescription>Fill out the form below, and our team will contact you within 24 hours to schedule your live demo.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                      <FormField control={form.control} name="fullName" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl><Input placeholder="e.g., Jane Doe" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Work Email</FormLabel>
                            <FormControl><Input type="email" placeholder="you@company.com" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField control={form.control} name="companyName" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl><Input placeholder="Your Company Inc." {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField control={form.control} name="role" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Role (Optional)</FormLabel>
                            <FormControl><Input placeholder="e.g., Content Manager" {...field} /></FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField control={form.control} name="message" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Specific Interests (Optional)</FormLabel>
                            <FormControl><Textarea placeholder="Tell us what you're hoping to achieve with ContentAI..." {...field} rows={3} /></FormControl>
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="w-full py-3 text-base bg-accent text-accent-foreground hover:bg-accent/90" // Use accent color
                        disabled={form.formState.isSubmitting}
                      >
                        <Send className="mr-2 h-5 w-5"/> 
                        {form.formState.isSubmitting ? "Submitting Request..." : "Schedule My Demo"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div className="space-y-8 mt-8 md:mt-0" variants={fadeIn(0.5)} initial="hidden" animate="visible">
              <h2 className="text-3xl font-semibold text-foreground">What to Expect in Your Demo:</h2>
              <ul className="space-y-6">
                {demoBenefits.map((benefit, index) => (
                  <motion.li key={benefit.title} className="flex items-start gap-4" variants={fadeIn(0.6 + index * 0.1)}>
                    <div className="flex-shrink-0 mt-1 rounded-full bg-primary/10 p-3 text-primary">
                      <benefit.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-foreground">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
              <motion.div variants={fadeIn(0.9)} className="mt-10">
                <Image 
                  src="https://picsum.photos/seed/democall/600/400" 
                  alt="Team discussing ContentAI during a demo call" 
                  width={600} 
                  height={400} 
                  className="rounded-xl shadow-2xl object-cover aspect-video" 
                  data-ai-hint="team meeting software"
                />
              </motion.div>
               <motion.div variants={fadeIn(1.0)} className="mt-8 p-6 bg-secondary rounded-lg">
                <h3 className="text-xl font-semibold text-secondary-foreground mb-3 flex items-center"><CheckCircle className="h-5 w-5 mr-2 text-primary"/> Why Book a Demo?</h3>
                <p className="text-sm text-secondary-foreground/80">
                  A live demo is the best way to understand the full capabilities of ContentAI and how it can be tailored to your unique content challenges. See real-world examples, ask specific questions, and get a clear picture of the ROI.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
