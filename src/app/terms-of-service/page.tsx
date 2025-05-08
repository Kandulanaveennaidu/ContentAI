// src/app/terms-of-service/page.tsx

// Removed "use client" directive
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, ShieldCheck } from 'lucide-react';
// Removed framer-motion import
import Link from 'next/link'; // Ensure Link is imported

// Removed fadeIn function

export default function TermsOfServicePage() {
  const lastUpdated = "October 27, 2023"; // Example date

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Removed motion.section wrapper */}
          <section
            className="text-center mb-12 md:mb-16"
            // Removed motion props
          >
            <FileText className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Terms of <span className="text-primary">Service</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Please read these Terms of Service carefully before using the ContentAI platform.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">Last Updated: {lastUpdated}</p>
          </section>

          {/* Removed motion.div wrapper */}
          <div>
            <Card className="shadow-xl max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <ShieldCheck className="h-6 w-6 mr-2 text-primary" />
                  Agreement to Terms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[60vh] pr-4">
                  <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-foreground dark:prose-invert prose-headings:text-foreground prose-a:text-primary">
                    <p>
                      By accessing or using ContentAI (the "Service"), operated by ContentAI Inc. ("us", "we", or "our"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, then you may not access the Service.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-3">1. Accounts</h2>
                    <p>
                      When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                    </p>
                    <p>
                      You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-3">2. Use of Service</h2>
                    <p>
                      ContentAI grants you a limited, non-exclusive, non-transferable, revocable license to use the Service for your personal or internal business purposes, subject to these Terms.
                    </p>
                    <p>
                      You agree not to use the Service:
                    </p>
                    <ul className="list-disc pl-6 my-2">
                      <li>In any way that violates any applicable national or international law or regulation.</li>
                      <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.</li>
                      <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation.</li>
                      <li>To impersonate or attempt to impersonate ContentAI, a ContentAI employee, another user, or any other person or entity.</li>
                      <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which, as determined by us, may harm ContentAI or users of the Service or expose them to liability.</li>
                    </ul>

                    <h2 className="text-xl font-semibold mt-6 mb-3">3. Content You Provide</h2>
                    <p>
                      Our Service allows you to submit content for analysis ("User Content"). You retain all of your ownership rights in your User Content. However, by submitting User Content to the Service, you grant us a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform the User Content in connection with the Service and ContentAI's (and its successors' and affiliates') business, including without limitation for promoting and redistributing part or all of the Service (and derivative works thereof) in any media formats and through any media channels. This license is solely for the purpose of operating, promoting, and improving the Service.
                    </p>
                     <p>
                      We do not store your User Content permanently beyond what is necessary for providing the analysis and for features like history (which you can clear). We do not claim ownership of your User Content.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-3">4. Intellectual Property</h2>
                    <p>
                      The Service and its original content (excluding User Content), features, and functionality are and will remain the exclusive property of ContentAI Inc. and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of ContentAI Inc.
                    </p>
                    
                    <h2 className="text-xl font-semibold mt-6 mb-3">5. Termination</h2>
                    <p>
                      We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                    </p>
                    <p>
                      If you wish to terminate your account, you may simply discontinue using the Service, or contact us to request account deletion. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-3">6. Limitation Of Liability</h2>
                    <p>
                      In no event shall ContentAI Inc., nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-3">7. Disclaimer</h2>
                    <p>
                      Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
                    </p>
                    <p>
                      ContentAI Inc. its subsidiaries, affiliates, and its licensors do not warrant that a) the Service will function uninterrupted, secure or available at any particular time or location; b) any errors or defects will be corrected; c) the Service is free of viruses or other harmful components; or d) the results of using the Service will meet your requirements.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-3">8. Governing Law</h2>
                    <p>
                      These Terms shall be governed and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions.
                    </p>
                    <p>
                      Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have had between us regarding the Service.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-3">9. Changes</h2>
                    <p>
                      We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                    </p>
                    <p>
                      By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-3">10. Contact Us</h2>
                    <p>
                      If you have any questions about these Terms, please <Link href="/contact" className="text-primary hover:underline">contact us</Link>.
                    </p>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
