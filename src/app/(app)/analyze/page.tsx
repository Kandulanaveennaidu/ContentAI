// src/app/(app)/analyze/page.tsx
"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Lightbulb, BarChart3, BookOpen, Sparkles, History, Eye, RefreshCw, Trash2, AlertTriangle } from 'lucide-react';
import { analyzeReadability, type ReadabilityAnalysisOutput } from '@/ai/flows/readability-analysis';
import { engagementPrediction, type EngagementPredictionOutput } from '@/ai/flows/engagement-prediction';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { useTour } from '@/components/tour/TourProvider';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton

interface AnalysisResultCardProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  isLoading?: boolean;
  loadingSkeleton: React.ReactNode; // Add prop for skeleton structure
}

const AnalysisResultCard: React.FC<AnalysisResultCardProps> = ({ title, icon: Icon, children, isLoading, loadingSkeleton }) => (
  <Card className="shadow-lg transition-all duration-300 hover:shadow-xl h-full min-h-[250px]"> {/* Ensure min height */}
    <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
      <Icon className="h-6 w-6 text-primary" />
      <CardTitle className="text-lg font-semibold">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      {isLoading ? (
        <div className="space-y-4 py-2">
          {loadingSkeleton} {/* Render the skeleton structure */}
        </div>
      ) : (
        children
      )}
    </CardContent>
  </Card>
);

// Skeleton structure for Readability Card
const ReadabilitySkeleton = () => (
  <>
    <div>
      <Skeleton className="h-5 w-32 mb-2" /> {/* Title skeleton */}
      <Skeleton className="h-10 w-24 mb-1" /> {/* Score skeleton */}
      <Skeleton className="h-4 w-40" /> {/* Level skeleton */}
    </div>
    <div>
      <Skeleton className="h-5 w-48 mb-3" /> {/* Suggestions Title skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[85%]" />
      </div>
    </div>
  </>
);

// Skeleton structure for Engagement Card
const EngagementSkeleton = () => (
  <>
    <div>
      <Skeleton className="h-5 w-40 mb-2" /> {/* Title skeleton */}
      <Skeleton className="h-10 w-28 mb-1" /> {/* Score skeleton */}
    </div>
    <div>
      <Skeleton className="h-5 w-32 mb-3" /> {/* Tips Title skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[88%]" />
      </div>
    </div>
  </>
);


type StoredAnalysis = {
  id: string;
  timestamp: number;
  content: string;
  readabilityResult: ReadabilityAnalysisOutput | null;
  engagementResult: EngagementPredictionOutput | null;
};

const MAX_HISTORY_ITEMS = 15; // Increased history items
const GENERIC_HISTORY_KEY = 'contentAnalysisHistory_guest'; // Key for non-logged-in users

// Function to get the correct localStorage key based on login state
const getHistoryStorageKey = (): string => {
  if (typeof window !== 'undefined') {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userProfile = localStorage.getItem('userProfile');
    if (isLoggedIn && userProfile) {
      try {
        const profile = JSON.parse(userProfile);
        // Use email or a unique ID if available; sanitize email for key usage
        const userId = profile.email ? profile.email.replace(/[^a-zA-Z0-9]/g, '_') : profile.id || 'unknown_user';
        return `contentAnalysisHistory_${userId}`;
      } catch (e) {
        console.error("Error parsing user profile for history key", e);
        return GENERIC_HISTORY_KEY; // Fallback if profile is corrupted
      }
    }
  }
  return GENERIC_HISTORY_KEY; // Default for guest or SSR
};


const analyzePageTourSteps = [
  {
    target: '#content-textarea',
    title: 'Enter Your Content',
    content: 'Paste or type your text here to begin the analysis.',
    placement: 'bottom' as const,
  },
  {
    target: '#analyze-button',
    title: 'Start Analysis',
    content: 'Click this button to process your content and get insights.',
    placement: 'bottom' as const,
  },
  {
    target: '#results-tabs',
    title: 'View Results',
    content: 'Your readability and engagement scores will appear here in separate tabs.',
    placement: 'top' as const,
  },
  {
    target: '#history-card',
    title: 'Analysis History',
    content: 'Your past analyses are saved here for easy access.',
    placement: 'top' as const,
  },
];


export default function AnalyzePage() {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [readabilityResult, setReadabilityResult] = useState<ReadabilityAnalysisOutput | null>(null);
  const [engagementResult, setEngagementResult] = useState<EngagementPredictionOutput | null>(null);
  
  const [progress, setProgress] = useState(0);
  const [analysisHistory, setAnalysisHistory] = useState<StoredAnalysis[]>([]);
  const { startTour, isTourActive } = useTour();
  const [historyStorageKey, setHistoryStorageKey] = useState(GENERIC_HISTORY_KEY);

   // Update storage key when component mounts or login status potentially changes
   useEffect(() => {
    setHistoryStorageKey(getHistoryStorageKey());
  }, []); // Runs once on mount

   // Load history from the correct key
   useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedHistory = localStorage.getItem(historyStorageKey);
      if (storedHistory) {
         try {
          const parsedHistory = JSON.parse(storedHistory);
           // Basic validation: ensure it's an array
           if(Array.isArray(parsedHistory)) {
             setAnalysisHistory(parsedHistory);
           } else {
             console.warn("Stored history is not an array, resetting.");
             localStorage.removeItem(historyStorageKey); // Clear invalid data
             setAnalysisHistory([]);
           }
         } catch(e) {
             console.error("Failed to parse history, resetting.", e);
             localStorage.removeItem(historyStorageKey); // Clear corrupted data
             setAnalysisHistory([]);
         }
      } else {
        setAnalysisHistory([]); // Initialize empty if nothing stored
      }
    }
  }, [historyStorageKey]); // Reload history if the key changes (e.g., user logs in/out)


  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if tour has been completed only after mount
      const tourCompleted = localStorage.getItem('appTourCompleted') === 'true';
      if (!tourCompleted && !isTourActive) {
        setTimeout(() => startTour(analyzePageTourSteps), 500);
      }
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTour, isTourActive]); // Dependencies are correct, disable ESLint warning for this line


  const saveHistory = useCallback((newHistory: StoredAnalysis[]) => {
    if (typeof window !== 'undefined') {
      // Always use the current dynamic storage key
      localStorage.setItem(historyStorageKey, JSON.stringify(newHistory));
    }
    setAnalysisHistory(newHistory);
  }, [historyStorageKey]); // Dependency on historyStorageKey ensures we save to the right place

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

  const handleAnalyze = async (contentToAnalyze: string = content) => {
    if (!contentToAnalyze.trim()) {
      setError("Content cannot be empty.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setReadabilityResult(null);
    setEngagementResult(null);
    setProgress(10);

    try {
      // Ensure history is loaded correctly before potentially adding to it
      // (This might be redundant if useEffect already loaded it, but safe)
      let currentHistory = [];
      if (typeof window !== 'undefined') {
          const stored = localStorage.getItem(historyStorageKey);
          if (stored) {
              try {
                  currentHistory = JSON.parse(stored);
                  if (!Array.isArray(currentHistory)) currentHistory = []; // Ensure it's an array
              } catch {
                  currentHistory = []; // Reset if parsing fails
              }
          }
      }


      const readabilityPromise = analyzeReadability({ content: contentToAnalyze });
      const engagementPromise = engagementPrediction({ content: contentToAnalyze });

      const [readabilityData, engagementData] = await Promise.all([readabilityPromise, engagementPromise]);
      
      setReadabilityResult(readabilityData);
      setProgress(50);
      setEngagementResult(engagementData);
      setProgress(100);

      // Save to history
      const newAnalysis: StoredAnalysis = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        content: contentToAnalyze,
        readabilityResult: readabilityData,
        engagementResult: engagementData,
      };
      
      // Add to the *current* history state before saving
      const updatedHistory = [newAnalysis, ...currentHistory].slice(0, MAX_HISTORY_ITEMS);
      saveHistory(updatedHistory);

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

  const handleViewHistoryItem = (item: StoredAnalysis) => {
    setContent(item.content);
    setReadabilityResult(item.readabilityResult);
    setEngagementResult(item.engagementResult);
    setError(null);
    // Scroll to top or analysis section might be good UX here
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReanalyzeHistoryItem = (item: StoredAnalysis) => {
    setContent(item.content);
    handleAnalyze(item.content);
  };

  const handleDeleteHistoryItem = (id: string) => {
    const updatedHistory = analysisHistory.filter(item => item.id !== id);
    saveHistory(updatedHistory);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const historyItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <header className="mb-8 text-center">
          <motion.h1 
            className="text-4xl font-bold tracking-tight text-foreground"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Content <span className="text-primary">Analyzer</span>
          </motion.h1>
          <motion.p 
            className="mt-2 text-lg text-muted-foreground"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Paste your text below to get AI-powered readability and engagement insights.
          </motion.p>
        </header>

        <Card className="mb-8 shadow-xl">
          <CardContent className="p-6">
            <Textarea
              id="content-textarea"
              placeholder="Paste your content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px] text-base focus:ring-primary focus:border-primary"
              rows={10}
              disabled={isLoading}
            />
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              <Button id="analyze-button" onClick={() => handleAnalyze()} disabled={isLoading || !content.trim()} className="w-full sm:w-auto">
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
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {(readabilityResult || engagementResult || isLoading) && (
      <motion.div
        id="results-tabs"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="readability" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-1/2 mx-auto mb-6">
            <TabsTrigger value="readability"><BookOpen className="mr-2 h-4 w-4" /> Readability</TabsTrigger>
            <TabsTrigger value="engagement"><BarChart3 className="mr-2 h-4 w-4" /> Engagement</TabsTrigger>
          </TabsList>

          <TabsContent value="readability">
            <AnalysisResultCard 
              title="Readability Analysis" 
              icon={BookOpen} 
              isLoading={isLoading}
              loadingSkeleton={<ReadabilitySkeleton />} // Pass skeleton here
            >
              {readabilityResult ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-md font-medium text-muted-foreground">Flesch-Kincaid Score</h3>
                    <p className="text-3xl font-bold text-primary">{readabilityResult.fleschKincaidScore.toFixed(1)}</p>
                    <p className="text-sm text-muted-foreground">{getReadabilityLevel(readabilityResult.fleschKincaidScore)}</p>
                  </div>
                  <div>
                    <h3 className="text-md font-medium text-muted-foreground mb-1">Suggestions for Improvement:</h3>
                    <ScrollArea className="h-40">
                      <ul className="list-disc space-y-1 pl-5 text-sm text-foreground">
                        {readabilityResult.suggestions.map((tip, index) => (
                          <li key={index} className="flex items-start">
                            <Lightbulb className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-accent" /> 
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </ScrollArea>
                  </div>
                </div>
              ) : (
                 !isLoading && <p className="text-muted-foreground text-center py-4">No readability data yet. Analyze some content!</p>
              )}
            </AnalysisResultCard>
          </TabsContent>

          <TabsContent value="engagement">
            <AnalysisResultCard 
              title="Engagement Prediction" 
              icon={BarChart3} 
              isLoading={isLoading}
              loadingSkeleton={<EngagementSkeleton />} // Pass skeleton here
            >
              {engagementResult ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-md font-medium text-muted-foreground">Predicted Engagement</h3>
                    <p className="text-3xl font-bold text-primary capitalize">{engagementResult.predictedEngagement}</p>
                  </div>
                  <div>
                    <h3 className="text-md font-medium text-muted-foreground mb-1">Actionable Tips:</h3>
                     <ScrollArea className="h-40">
                        <ul className="list-disc space-y-1 pl-5 text-sm text-foreground">
                          {engagementResult.actionableTips.map((tip, index) => (
                            <li key={index} className="flex items-start">
                               <Lightbulb className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-accent" /> 
                               <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                    </ScrollArea>
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

      {/* Analysis History Section */}
      <motion.div
        id="history-card"
        className="mt-12"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
      >
        <Card className="shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <History className="h-6 w-6 text-primary" />
              <CardTitle>Analysis History</CardTitle>
            </div>
            <CardDescription>View, re-analyze, or delete your past content analyses. Up to {MAX_HISTORY_ITEMS} items are stored.</CardDescription>
          </CardHeader>
          <CardContent>
            {analysisHistory.length > 0 ? (
              <ScrollArea className="h-[400px] pr-4">
                <ul className="space-y-4">
                  <AnimatePresence>
                  {analysisHistory.map((item) => (
                    <motion.li 
                      key={item.id}
                      layout
                      variants={historyItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm font-medium text-foreground truncate max-w-xs sm:max-w-md md:max-w-lg" title={item.content}>
                                {item.content.substring(0, 100)}{item.content.length > 100 ? '...' : ''}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Analyzed on: {format(new Date(item.timestamp), "MMM d, yyyy 'at' h:mm a")}
                              </p>
                            </div>
                            <div className="flex space-x-2 shrink-0 ml-2">
                              <Button variant="ghost" size="icon" onClick={() => handleViewHistoryItem(item)} title="View Details">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleReanalyzeHistoryItem(item)} title="Re-analyze">
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteHistoryItem(item.id)} title="Delete">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                          {(item.readabilityResult || item.engagementResult) && (
                            <div className="mt-2 pt-2 border-t border-border flex flex-wrap gap-x-4 gap-y-1 text-xs">
                              {item.readabilityResult && (
                                <p>Readability: <span className="font-semibold text-primary">{item.readabilityResult.fleschKincaidScore.toFixed(1)}</span></p>
                              )}
                              {item.engagementResult && (
                                <p>Engagement: <span className="font-semibold text-primary capitalize">{item.engagementResult.predictedEngagement}</span></p>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.li>
                  ))}
                  </AnimatePresence>
                </ul>
              </ScrollArea>
            ) : (
               isLoading ? ( // Show skeleton for history while analyzing initial content
                 <div className="space-y-4 py-4">
                   <Skeleton className="h-20 w-full rounded-md" />
                   <Skeleton className="h-20 w-full rounded-md" />
                   <Skeleton className="h-20 w-full rounded-md" />
                 </div>
               ) : (
                 <p className="text-muted-foreground text-center py-8">No analysis history yet. Your analyses will appear here.</p>
               )
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

