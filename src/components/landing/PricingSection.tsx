// src/components/landing/PricingSection.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, CreditCard, Smartphone, ShoppingBag, X } from 'lucide-react'; // Added X for close
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog'; // Added DialogClose
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast'; // Import useToast


const pricingPlans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Get started with basic analysis & limited usage.', 
    features: [
        'Limited Readability Scores', 
        'Basic Engagement Tips', 
        '5 Analyses/Month', 
        'History for last 3 analyses' 
    ], 
    cta: 'Start for Free',
    href: '/signup',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$19',
    period: '/month',
    description: 'For content creators and marketers.',
    features: ['Full Readability Analysis', 'Advanced Engagement Prediction', 'Unlimited Analyses', 'Priority Support', 'Extended History'], 
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
    features: ['All Pro Features', 'Team Collaboration Tools (soon)', 'Shared Workspaces (soon)', 'Dedicated Account Manager'],
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
  // Refined hover effect: slight scale up and subtle shadow increase
  hover: { 
    scale: 1.02, 
    boxShadow: "0px 8px 15px hsla(var(--foreground) / 0.1)", 
    transition: { type: "spring", stiffness: 350, damping: 20 } 
  } 
};


// Custom PayPal Icon Component
const PayPalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-[#003087] dark:text-[#009cde]"> {/* Slightly smaller */}
    <path d="M8.332 23.945c.373.038.632-.238.724-.596l1.486-5.828c.09-.356.007-.766-.252-1.025-.259-.259-.67-.342-1.027-.252l-5.789 1.476c-.358.091-.636.35-.599.724.04.372.318.633.68.596l4.777-.095zm13.048-14.478c-.06-.245-.254-.42-.496-.467l-3.792-.773c-.304-.062-.618.048-.806.288-.189.24-.248.568-.159.852l1.489 4.716c.091.285.32.497.607.552l3.792.773c.304.062.618-.048.806-.288.189-.24.248-.568.159-.852l-1.59-5.199zm-8.073 6.233c-.552-.202-1.054-.545-1.48-1.005-.394-.42-.68-.93-.852-1.498l-1.489-4.716c-.09-.285-.32-.497-.607-.552l-3.792-.773c-.304-.062-.618.048-.806.288-.189-.24-.248.568-.159.852l1.489 4.716c.475 1.508 1.516 2.722 2.953 3.459.693.351 1.454.534 2.225.534.796 0 1.58-.202 2.289-.597l.057-.031c.401-.224.647-.62.647-1.057v-2.021c0-.003 0-.005 0-.008zm-3.218-10.74c.552.202 1.054.545 1.48 1.005.394.42.68.93.852 1.498l1.489 4.716c.09.285.32.497.607.552l3.792.773c.304.062.618-.048.806.288s.248-.568.159-.852L10.09 3.04z"/>
  </svg>
);

// Custom Google Pay Icon Component
const GooglePayIcon = () => (
   <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dark:invert"> {/* Invert in dark mode for visibility */}
    <path d="M19 5.5H5C4.44772 5.5 4 5.94772 4 6.5V18.5C4 19.0523 4.44772 19.5 5 19.5H19C19.5523 19.5 20 19.0523 20 18.5V6.5C20 5.94772 19.5523 5.5 19 5.5Z" fill="#4285F4"/>
    <path d="M4 11H20" stroke="#FFFFFF" strokeWidth="1.5"/>
    <path d="M11.481 14.7H13.581V13.65H10.041C9.83105 13.65 9.66105 13.82 9.66105 14.03V17.87C9.66105 18.08 9.83105 18.25 10.041 18.25H13.581V17.2H11.481V16.25H13.581V15.2H11.481V14.7Z" fill="#FFFFFF"/>
    <path d="M17.09 14.7H18.17L17.33 16.99L16.47 14.7H17.55L17.95 15.89L18.35 14.7H17.09Z" fill="#FFFFFF"/>
    <path d="M8.6 14.7H10.4C11.16 14.7 11.64 15.06 11.64 15.55C11.64 16.04 11.16 16.4 10.4 16.4H9.1V17.75H8.1V14.7H8.6ZM9.1 15.9H10.08C10.44 15.9 10.68 15.76 10.68 15.5C10.68 15.24 10.44 15.1 10.08 15.1H9.1V15.9Z" fill="#FFFFFF"/>
  </svg>
);

// Custom Apple Pay Icon Component
const ApplePayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-black dark:text-white">
        <path d="M19.171,10.334a4.453,4.453,0,0,0-3.215-1.6c-1.258-.13-2.853.644-3.587,1.859a4.33,4.33,0,0,0-.44,3.175,4.146,4.146,0,0,0,2.668,2.611c.174.081.352.155.529.224.922.365,1.6.75,1.6,1.477a1.314,1.314,0,0,1-.6,1.072,1.516,1.516,0,0,1-1.113.338c-1.182,0-1.914-.75-2.663-1.135a3.784,3.784,0,0,0-3.179-.333,4.037,4.037,0,0,0-2.3,3.184c.013.143.027.285.043.426H16.64a4.493,4.493,0,0,0,3.287-1.657c1.263-.134,2.848.653,3.587,1.871a4.323,4.323,0,0,0,.44,3.175,4.15,4.15,0,0,0-2.673,2.616c-.174.081-.353.154-.53.223-.922.365-1.6.75-1.6,1.477a1.316,1.316,0,0,1,.6,1.072,1.519,1.519,0,0,1,1.113.338c1.182,0,1.914-.75,2.663-1.135a3.78,3.78,0,0,0,3.179-.333A4.039,4.039,0,0,0,21.7,9.664c-.013-.143-.027-.285-.043-.426Z"/>
    </svg>
);


// Updated PaymentModal
const PaymentModal: React.FC<{ plan: typeof pricingPlans[0], children: React.ReactNode }> = ({ plan, children }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast(); // Get toast function

  // Simulate payment success
  const handlePaymentSuccess = (method: string) => {
    console.log(`Simulating successful payment for ${plan.name} via ${method}`);
    setIsDialogOpen(false); // Close the modal on success
    toast({
      title: "Payment Successful!",
      description: `Your subscription to the ${plan.name} plan is now active.`,
      variant: 'default', // Or use a success variant if defined
    });
     // Maybe redirect user or update UI state here in a real app
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Checkout: {plan.name} Plan</DialogTitle>
          <DialogDescription>
            Complete your purchase for the {plan.name} plan at {plan.price}{plan.period}.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6">
          {/* Accepted Payment Methods Section */}
          <div>
            <Label className="text-sm font-medium">Accepted Payment Methods</Label>
            <div className="flex items-center justify-around flex-wrap gap-3 p-3 mt-2 border rounded-lg bg-secondary/50">
              <CreditCard className="h-7 w-7 text-blue-600" title="Credit/Debit Cards" />
              <PayPalIcon /> 
              <GooglePayIcon />
              <ApplePayIcon /> 
              <ShoppingBag className="h-7 w-7 text-purple-500" title="Other Methods" />
            </div>
          </div>
          
          {/* Payment Form (Card Details) */}
          <div className="border p-4 rounded-md space-y-3">
            <h3 className="text-base font-semibold mb-2">Enter Card Details</h3>
            <div className="space-y-1">
                <Label htmlFor="card-name">Name on Card</Label>
                <Input id="card-name" placeholder="John M. Doe" autoComplete="cc-name"/>
            </div>
            <div className="space-y-1">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="•••• •••• •••• ••••" autoComplete="cc-number"/>
            </div>
            <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                <Label htmlFor="expiry-month">Expiry Month</Label>
                <Input id="expiry-month" placeholder="MM" autoComplete="cc-exp-month"/>
                </div>
                 <div className="space-y-1">
                <Label htmlFor="expiry-year">Expiry Year</Label>
                <Input id="expiry-year" placeholder="YYYY" autoComplete="cc-exp-year"/>
                </div>
                <div className="space-y-1">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="•••" autoComplete="cc-csc"/>
                </div>
            </div>
             <Button 
              type="button" 
              className="w-full mt-3" 
              onClick={() => handlePaymentSuccess('Credit Card')} // Simulate success
             >
              Pay {plan.price} with Card
            </Button>
          </div>
          
           {/* Alternative Payment Options (Simulate Success) */}
           <div className="text-center pt-2">
             <p className="text-xs text-muted-foreground mb-2">Or use another payment method</p>
             <div className="flex justify-center gap-4">
                 <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2" 
                    onClick={() => handlePaymentSuccess('PayPal')} // Simulate success
                 >
                    <PayPalIcon/> PayPal
                </Button>
                 <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={() => handlePaymentSuccess('Google Pay')} // Simulate success
                 >
                    <GooglePayIcon/> Google Pay
                 </Button>
             </div>
           </div>
        </div>
         {/* Footer with only Close button, Pay action moved to specific buttons */}
        <DialogFooter className="sm:justify-end"> 
          <DialogClose asChild>
            <Button type="button" variant="outline">
                Close
            </Button>
          </DialogClose>
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
          whileInView="visible" 
          viewport={{ once: true, amount: 0.2 }} 
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
                className={`flex flex-col h-full transition-all duration-300 ${plan.popular ? 'border-primary border-2 relative shadow-primary/20' : 'shadow-lg'} `} 
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
                        <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" /> 
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                   {plan.id === 'free' && (
                     <p className="mt-4 text-xs text-muted-foreground italic">
                        The free plan offers a great way to experience core features with usage limits. Upgrade anytime for unlimited access.
                     </p>
                   )}
                </CardContent>
                <CardFooter className="flex-col items-start mt-auto pt-4"> 
                  {plan.id === 'free' ? (
                    <Link href={plan.href} className="w-full">
                       <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                        {plan.cta}
                      </Button>
                    </Link>
                  ) : (
                    <PaymentModal plan={plan}>
                      <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                        {plan.cta}
                      </Button>
                    </PaymentModal>
                  )}
                  
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
