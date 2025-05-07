// src/components/landing/PricingSection.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, CreditCard, Smartphone, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';


const pricingPlans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Get started with basic analysis.',
    features: ['Limited Readability Scores', 'Basic Engagement Tips', '5 Analyses/Month'],
    cta: 'Start for Free',
    href: '/signup',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$19',
    period: '/month',
    description: 'For content creators and marketers.',
    features: ['Full Readability Analysis', 'Advanced Engagement Prediction', 'Unlimited Analyses', 'Priority Support'],
    cta: 'Choose Pro',
    href: '/signup?plan=pro', // For direct signup link
    popular: true,
  },
  {
    id: 'team',
    name: 'Team',
    price: '$49',
    period: '/month',
    description: 'Collaborate with your team.',
    features: ['All Pro Features', 'Team Collaboration Tools', 'Shared Workspaces', 'Dedicated Account Manager'],
    cta: 'Choose Team',
    href: '/signup?plan=team', // For direct signup link
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut"
    }
  }),
  hover: { 
    y: -5, // Changed from scale to y-translate for smoother feel
    boxShadow: "0px 10px 20px rgba(var(--foreground), 0.1)", // Adjusted shadow color source
    transition: { type: "spring", stiffness: 300, damping: 20 } // Adjusted damping
  } 
};


const PayPalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
    <path d="M8.332 23.945c.373.038.632-.238.724-.596l1.486-5.828c.09-.356.007-.766-.252-1.025-.259-.259-.67-.342-1.027-.252l-5.789 1.476c-.358.091-.636.35-.599.724.04.372.318.633.68.596l4.777-.095zm13.048-14.478c-.06-.245-.254-.42-.496-.467l-3.792-.773c-.304-.062-.618.048-.806.288-.189.24-.248.568-.159.852l1.489 4.716c.091.285.32.497.607.552l3.792.773c.304.062.618-.048.806.288.189-.24.248.568.159-.852l-1.59-5.199zm-8.073 6.233c-.552-.202-1.054-.545-1.48-1.005-.394-.42-.68-.93-.852-1.498l-1.489-4.716c-.09-.285-.32-.497-.607-.552l-3.792-.773c-.304-.062-.618.048-.806.288-.189-.24-.248.568-.159.852l1.489 4.716c.475 1.508 1.516 2.722 2.953 3.459.693.351 1.454.534 2.225.534.796 0 1.58-.202 2.289-.597l.057-.031c.401-.224.647-.62.647-1.057v-2.021c0-.003 0-.005 0-.008zm-3.218-10.74c.552.202 1.054.545 1.48 1.005.394.42.68.93.852 1.498l1.489 4.716c.09.285.32.497.607.552l3.792.773c.304.062.618-.048.806.288s.248-.568.159-.852L10.09 3.04z"/>
  </svg>
);

const GooglePayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-gray-700 dark:text-gray-300">
    <path d="M20.53,7.66H20V7.07A2.35,2.35,0,0,0,17.6,4.72H6.4A2.35,2.35,0,0,0,4,7.07V7.66H3.47A2.33,2.33,0,0,0,1.19,10v6.9a2.33,2.33,0,0,0,2.28,2.35H20.53a2.33,2.33,0,0,0,2.28-2.35V10A2.33,2.33,0,0,0,20.53,7.66Zm-1.67.64H5.14V7.07a.67.67,0,0,1,.67-.66H17.6a.67.67,0,0,1,.67.66v1.23Z"/>
    <path d="M10.91 14.36h2.27v-1.08H9.93a.55.55 0 0 0-.55.55v3.69a.55.55 0 0 0 .55.55h3.25v-1.09h-2.27v-.97h2.27v-1.06h-2.27zm5.12-2.43h1.18l-.84 2.37-.86-2.37h1.17l.29 1 .29-1zm-8.72 0h2.06c.76 0 1.2.36 1.2.95s-.43 1-1.2 1H8.4V15.5h-1v-3.57zm1.05 1.48h.72c.35 0 .56-.16.56-.44s-.22-.42-.56-.42h-.72z"/>
  </svg>
);

const PaymentModal: React.FC<{ plan: typeof pricingPlans[0], children: React.ReactNode }> = ({ plan, children }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Checkout: {plan.name} Plan</DialogTitle>
          <DialogDescription>
            Complete your purchase for the {plan.name} plan at {plan.price}{plan.period}.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <p className="text-sm text-muted-foreground">Select your preferred payment method:</p>
          <div className="flex items-center justify-around gap-2 p-2 border rounded-md">
             <CreditCard className="h-8 w-8 text-blue-500" title="Credit/Debit Cards" />
             <PayPalIcon /> 
             <GooglePayIcon />
             <Smartphone className="h-8 w-8 text-green-500" title="Mobile Payments (e.g. Apple Pay)" />
             <ShoppingBag className="h-8 w-8 text-purple-500" title="Other Methods" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="card-name">Name on Card</Label>
            <Input id="card-name" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="card-number">Card Number</Label>
            <Input id="card-number" placeholder="•••• •••• •••• ••••" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry-date">Expiry Date</Label>
              <Input id="expiry-date" placeholder="MM/YY" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" placeholder="•••" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button type="submit">Pay {plan.price}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};


export function PricingSection() {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2 
            className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            Simple, Transparent <span className="text-primary">Pricing</span>
          </motion.h2>
          <motion.p 
            className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Choose the plan that's right for you and start creating better content today.
          </motion.p>
        </div>
        <motion.div 
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
          initial="hidden"
          whileInView="visible" // Changed to whileInView to trigger on scroll
          viewport={{ once: true, amount: 0.2 }} // Trigger animation when 20% is visible
          variants={{ visible: { transition: { staggerChildren: 0.1 }}}}
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              custom={index}
              variants={cardVariants}
              whileHover="hover"
              className="h-full"
            >
              <Card 
                className={`flex flex-col h-full transition-shadow duration-300 ${plan.popular ? 'border-primary border-2 relative shadow-primary/20' : 'shadow-lg'} `}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-md">
                    Most Popular
                  </div>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-semibold">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-6">
                    <span className="text-4xl font-extrabold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="mr-2 h-5 w-5 text-primary" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex-col items-start mt-auto pt-4"> {/* Added mt-auto and pt-4 */}
                  {plan.id === 'free' ? (
                    <Link href={plan.href} className="w-full">
                       <Button className="w-full mb-4" variant={plan.popular ? 'default' : 'outline'}>
                        {plan.cta}
                      </Button>
                    </Link>
                  ) : (
                    <PaymentModal plan={plan}>
                      <Button className="w-full mb-4" variant={plan.popular ? 'default' : 'outline'}>
                        {plan.cta}
                      </Button>
                    </PaymentModal>
                  )}
                  
                  <div className="w-full pt-3 border-t border-border">
                     <p className="text-xs text-muted-foreground mb-2">We accept:</p>
                     <div className="flex items-center space-x-3">
                        <CreditCard className="h-6 w-6 text-muted-foreground" title="Credit/Debit Cards" />
                        <PayPalIcon /> 
                        <GooglePayIcon />
                        <Smartphone className="h-6 w-6 text-muted-foreground" title="Mobile Payments" />
                        <ShoppingBag className="h-6 w-6 text-muted-foreground" title="Other Methods" />
                     </div>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
