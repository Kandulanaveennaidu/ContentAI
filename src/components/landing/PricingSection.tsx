// src/components/landing/PricingSection.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Get started with basic analysis.',
    features: ['Limited Readability Scores', 'Basic Engagement Tips', '5 Analyses/Month'],
    cta: 'Start for Free',
    href: '/signup',
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    description: 'For content creators and marketers.',
    features: ['Full Readability Analysis', 'Advanced Engagement Prediction', 'Unlimited Analyses', 'Priority Support'],
    cta: 'Choose Pro',
    href: '/signup?plan=pro',
    popular: true,
  },
  {
    name: 'Team',
    price: '$49',
    period: '/month',
    description: 'Collaborate with your team.',
    features: ['All Pro Features', 'Team Collaboration Tools', 'Shared Workspaces', 'Dedicated Account Manager'],
    cta: 'Choose Team',
    href: '/signup?plan=team',
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Simple, Transparent <span className="text-primary">Pricing</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Choose the plan that's right for you and start creating better content today.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`flex flex-col transition-all duration-300 hover:shadow-xl ${plan.popular ? 'border-primary border-2 relative' : ''} animate-fadeIn`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
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
              <CardFooter>
                <Link href={plan.href} className="w-full">
                  <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                    {plan.cta}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
