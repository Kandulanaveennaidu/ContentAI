// src/app/(app)/analyze/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Lightbulb, BarChart3, BookOpen, Sparkles } from 'lucide-react';
import { analyzeReadability, type ReadabilityAnalysisOutput } from '@/ai/flows/readability-analysis';
import { engagementPrediction, type EngagementPredictionOutput } from '@/ai/flows/engagement-prediction';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { motion, AnimatePresence } from 'framer-motion';

interface AnalysisResultCardProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  isLoading?: boolean;
}

const AnalysisResultCard: React.FC<AnalysisResultCardProps> = ({ title, icon: Icon, children, isLoading }) => (
  <Card className="shadow-lg_ transition-all duration-300 hover:shadow-xl">
    <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
      <Icon className="h-6 w-6 text-primary" />
      <CardTitle className="text-lg font-semibold">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      {isLoading ? (
        <div className="flex items-center justify-center h-24">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        children
      )}
    </CardContent>
  </Card>
);


export default function AnalyzePage() {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [readabilityResult, setReadabilityResult] = useState<ReadabilityAnalysisOutput | null>(null);
  const [engagementResult, setEngagementResult] = useState<EngagementPredictionOutput | null>(null);
  
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setProgress((prev) => (prev >= 90 ? 90 : prev + 10));
      }, 200);
      return () => clearInterval(timer);
    } else {
      setProgress(0);
    }
  }, [isLoading]);


  const handleAnalyze = async () => {
    if (!content.trim()) {
      setError("Content cannot be empty.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setReadabilityResult(null);
    setEngagementResult(null);
    setProgress(10);

    try {
      const readabilityPromise = analyzeReadability({ content });
      const engagementPromise = engagementPrediction({ content });

      const [readabilityData, engagementData] = await Promise.all([readabilityPromise, engagementPromise]);
      
      setReadabilityResult(readabilityData);
      setProgress(50);
      setEngagementResult(engagementData);
      setProgress(100);

    } catch (err) {
      console.error("Analysis error:", err);
      setError("An error occurred during analysis. Please try again.");
      setProgress(0);
    } finally {
      setIsLoading(false);
    }
  };

  const getReadabilityLevel = (score: number): string => {
    if (score > 90) return "Very Easy (5th Grade)";
    if (score > 80) return "Easy (6th Grade)";
    if (score > 70) return "Fairly Easy (7th Grade)";
    if (score > 60) return "Standard (8th & 9th Grade)";
    if (score > 50) return "Fairly Difficult (10th to 12th Grade)";
    if (score > 30) return "Difficult (College)";
    return "Very Difficult (College Graduate)";
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Content <span className="text-primary">Analyzer</span>
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Paste your text below to get AI-powered readability and engagement insights.
          </p>
        </header>

        <Card className="mb-8 shadow-xl">
          <CardContent className="p-6">
            <Textarea
              placeholder="Paste your content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px] text-base focus:ring-primary focus:border-primary"
              rows={10}
              disabled={isLoading}
            />
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              <Button onClick={handleAnalyze} disabled={isLoading || !content.trim()} className="w-full sm:w-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Analyze Content
                  </>
                )}
              </Button>
              <AnimatePresence>
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0, width: 0}} 
                  animate={{ opacity: 1, width: '100%'}} 
                  exit={{ opacity: 0, width: 0 }}
                  className="w-full sm:w-1/2"
                >
                  <Progress value={progress} className="h-2 [&>div]:bg-primary" />
                </motion.div>
              )}
              </AnimatePresence>
            </div>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {(readabilityResult || engagementResult || isLoading) && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Tabs defaultValue="readability" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-1/2 mx-auto mb-6">
            <TabsTrigger value="readability"><BookOpen className="mr-2 h-4 w-4" /> Readability</TabsTrigger>
            <TabsTrigger value="engagement"><BarChart3 className="mr-2 h-4 w-4" /> Engagement</TabsTrigger>
          </TabsList>

          <TabsContent value="readability">
            <AnalysisResultCard title="Readability Analysis" icon={BookOpen} isLoading={isLoading && !readabilityResult}>
              {readabilityResult ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-md font-medium text-muted-foreground">Flesch-Kincaid Score</h3>
                    <p className="text-3xl font-bold text-primary">{readabilityResult.fleschKincaidScore.toFixed(1)}</p>
                    <p className="text-sm text-muted-foreground">{getReadabilityLevel(readabilityResult.fleschKincaidScore)}</p>
                  </div>
                  <div>
                    <h3 className="text-md font-medium text-muted-foreground mb-1">Suggestions for Improvement:</h3>
                    <ul className="list-disc space-y-1 pl-5 text-sm text-foreground">
                      {readabilityResult.suggestions.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <Lightbulb className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-accent-foreground" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                 !isLoading && <p className="text-muted-foreground text-center py-4">No readability data yet. Analyze some content!</p>
              )}
            </AnalysisResultCard>
          </TabsContent>

          <TabsContent value="engagement">
            <AnalysisResultCard title="Engagement Prediction" icon={BarChart3} isLoading={isLoading && !engagementResult}>
              {engagementResult ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-md font-medium text-muted-foreground">Predicted Engagement</h3>
                    <p className="text-3xl font-bold text-primary capitalize">{engagementResult.predictedEngagement}</p>
                  </div>
                  <div>
                    <h3 className="text-md font-medium text-muted-foreground mb-1">Actionable Tips:</h3>
                    <ul className="list-disc space-y-1 pl-5 text-sm text-foreground">
                      {engagementResult.actionableTips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                           <Lightbulb className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-accent-foreground" />
                           <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                !isLoading && <p className="text-muted-foreground text-center py-4">No engagement data yet. Analyze some content!</p>
              )}
            </AnalysisResultCard>
          </TabsContent>
        </Tabs>
      </motion.div>
      )}
    </div>
  );
}
