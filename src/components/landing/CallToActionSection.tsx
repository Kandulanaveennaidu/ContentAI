// src/components/landing/CallToActionSection.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function CallToActionSection() {
  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 8px 25px rgba(0,0,0,0.2)" , transition: { type: "spring", stiffness: 300 } },
    tap: { scale: 0.95 }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.section 
      className="py-16 md:py-24 bg-primary text-primary-foreground"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 150, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Sparkles className="mx-auto h-12 w-12 mb-4 opacity-80" />
        </motion.div>
        <motion.h2 
          className="text-3xl font-bold tracking-tight sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Ready to Transform Your Content?
        </motion.h2>
        <motion.p 
          className="mt-4 max-w-xl mx-auto text-lg opacity-90"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Join thousands of creators optimizing their content with ContentAI. Sign up for free and experience the difference.
        </motion.p>
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Link href="/signup" passHref>
            <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
              <Button size="lg" variant="secondary" className="text-primary bg-primary-foreground hover:bg-primary-foreground/90">
                Sign Up for Free
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
