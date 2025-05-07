// src/app/privacy-policy/page.tsx
"use client";

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const fadeIn = (delay: number = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: "easeOut" } },
});

export default function PrivacyPolicyPage() {
  const lastUpdated = "October 27, 2023"; // Example date

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
            <Lock className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Privacy <span className="text-primary">Policy</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Your privacy is important to us. This policy explains how ContentAI Inc. collects, uses, and protects your personal information.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">Last Updated: {lastUpdated}</p>
          </motion.section>

          <motion.div
            variants={fadeIn(0.2)}
            initial="hidden"
            animate="visible"
          >
            <Card className="shadow-xl max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <ShieldAlert className="h-6 w-6 mr-2 text-primary" />
                  Our Commitment to Your Privacy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[60vh] pr-4">
                  <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-foreground dark:prose-invert prose-headings:text-foreground prose-a:text-primary">
                    <p>
                      ContentAI Inc. ("us", "we", or "our") operates the ContentAI website and platform (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
                    </p>
                    <p>
                      We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms of Service.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-3">1. Information Collection and Use</h2>
                    <p>
                      We collect several different types of information for various purposes to provide and improve our Service to you.
                    </p>
                    <h3 className="text-lg font-medium mt-4 mb-2">Types of Data Collected:</h3>
                    <ul className="list-disc pl-6 my-2">
                        <li>
                            <strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to: Email address, First name and last name, Cookies and Usage Data.
                        </li>
                         <li>
                            <strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                        </li>
                        <li>
                            <strong>Content Data:</strong> When you use our analysis features, you submit content ("Content Data"). We process this Content Data to provide you with the analysis results. We do not claim ownership of your Content Data. We temporarily store Content Data as necessary to provide the Service (e.g., for history features which you can manage) and for model improvement with anonymized and aggregated data if you opt-in.
                        </li>
                    </ul>


                    <h2 className="text-xl font-semibold mt-6 mb-3">2. Use of Data</h2>
                    <p>ContentAI Inc. uses the collected data for various purposes:</p>
                    <ul className="list-disc pl-6 my-2">
                      <li>To provide and maintain our Service</li>
                      <li>To notify you about changes to our Service</li>
                      <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                      <li>To provide customer support</li>
                      <li>To gather analysis or valuable information so that we can improve our Service</li>
                      <li>To monitor the usage of our Service</li>
                      <li>To detect, prevent and address technical issues</li>
                      <li>To provide you with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless you have opted not to receive such information.</li>
                    </ul>

                    <h2 className="text-xl font-semibold mt-6 mb-3">3. Data Storage and Security</h2>
                    <p>
                      The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data and Content Data, we cannot guarantee its absolute security.
                    </p>
                    <p>
                      Your Content Data submitted for analysis is processed and stored securely. Analysis history is stored locally in your browser or on our servers if you are a logged-in user, and you have control over this data.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-3">4. Your Data Protection Rights</h2>
                     <p>ContentAI Inc. aims to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data.</p>
                    <ul className="list-disc pl-6 my-2">
                        <li><strong>Access:</strong> You have the right to access and receive a copy of the Personal Data we hold about you.</li>
                        <li><strong>Rectification:</strong> You have the right to have your information rectified if that information is inaccurate or incomplete.</li>
                        <li><strong>Erasure:</strong> You have the right to have your Personal Data erased under certain conditions.</li>
                        <li><strong>Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal information.</li>
                         <li><strong>Data Portability:</strong> You have the right to be provided with a copy of the information we have on you in a structured, machine-readable and commonly used format.</li>
                         <li><strong>Withdraw Consent:</strong> You also have the right to withdraw your consent at any time where ContentAI Inc. relied on your consent to process your personal information.</li>
                    </ul>
                    <p>Please note that we may ask you to verify your identity before responding to such requests.</p>


                    <h2 className="text-xl font-semibold mt-6 mb-3">5. Cookies Policy</h2>
                    <p>
                      We use cookies and similar tracking technologies to track the activity on our Service and we hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-3">6. Changes to This Privacy Policy</h2>
                    <p>
                      We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "last updated" date at the top of this Privacy Policy.
                    </p>
                    <p>
                      You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-3">7. Contact Us</h2>
                    <p>
                      If you have any questions about this Privacy Policy, please <Link href="/contact" className="text-primary hover:underline">contact us</Link>.
                    </p>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
