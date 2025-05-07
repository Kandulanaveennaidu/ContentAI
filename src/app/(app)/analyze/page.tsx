
// src/app/(app)/analyze/page.tsx
"use client";

import type { ReadabilityAnalysisOutput } from '@/ai/flows/readability-analysis';
import type { EngagementPredictionOutput } from '@/ai/flows/engagement-prediction';
import type { SummarizeContentOutput } from '@/ai/flows/summarize-content-flow';
import type { AnalyzeToneSentimentOutput } from '@/ai/flows/analyze-tone-sentiment-flow';
import type { GenerateFaqOutput } from '@/ai/flows/generate-faq-flow';
import type { AnalyzeShareabilityOutput } from '@/ai/flows/analyze-shareability-flow';
import type { AnalyzeVoiceSearchOutput } from '@/ai/flows/analyze-voice-search-flow';
import { analyzeReadability } from '@/ai/flows/readability-analysis';
import { engagementPrediction } from '@/ai/flows/engagement-prediction';
import { summarizeContent } from '@/ai/flows/summarize-content-flow';
import { analyzeToneSentiment } from '@/ai/flows/analyze-tone-sentiment-flow';
import { generateFaqs } from '@/ai/flows/generate-faq-flow';
import { analyzeShareability } from '@/ai/flows/analyze-shareability-flow';
import { analyzeVoiceSearch } from '@/ai/flows/analyze-voice-search-flow';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Lightbulb, BarChart3, BookOpen, Sparkles, History, Eye, RefreshCw, Trash2, AlertTriangle, FileText, Smile, Share2, Mic, HelpCircle, Palette, Bot } from 'lucide-react'; // Added new icons
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { useTour } from '@/components/tour/TourProvider';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge'; // Import Badge

// ----- Analysis Result Card & Skeletons -----

interface AnalysisResultCardProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  isLoading?: boolean;
  loadingSkeleton: React.ReactNode;
  description?: string; // Optional description
}

const AnalysisResultCard: React.FC<AnalysisResultCardProps> = ({ title, icon: Icon, children, isLoading, loadingSkeleton, description }) => (
  <Card className="shadow-lg transition-all duration-300 hover:shadow-xl h-full min-h-[280px] flex flex-col"> {/* Ensure min height & flex column */}
    <CardHeader className="pb-3">
      <div className="flex items-center gap-3">
        <Icon className="h-6 w-6 text-primary" />
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </div>
       {description && <CardDescription className="pt-1">{description}</CardDescription>}
    </CardHeader>
    <CardContent className="flex-grow"> {/* Allow content to grow */}
      {isLoading ? (
        <div className="space-y-4 py-2">
          {loadingSkeleton}
        </div>
      ) : (
        children
      )}
    </CardContent>
  </Card>
);

// Updated Skeleton Structures
const BasicTextListSkeleton = () => (
  <>
    <Skeleton className="h-4 w-3/4 mb-3" />
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-5/6 mb-2" />
    <Skeleton className="h-4 w-4/5 mb-2" />
  </>
);

const ScoreAndListSkeleton = () => (
  <div className="flex flex-col md:flex-row gap-4">
    <div className="flex-shrink-0 w-full md:w-1/3 space-y-2">
       <Skeleton className="h-5 w-24 mb-1" />
       <Skeleton className="h-10 w-20" />
       <Skeleton className="h-4 w-28" />
    </div>
    <div className="flex-grow space-y-2">
       <Skeleton className="h-5 w-32 mb-2" />
       <Skeleton className="h-4 w-full" />
       <Skeleton className="h-4 w-[90%]" />
       <Skeleton className="h-4 w-[95%]" />
    </div>
  </div>
);

const FaqSkeleton = () => (
    <>
        <div className="mb-3 space-y-1">
            <Skeleton className="h-5 w-1/2"/>
            <Skeleton className="h-4 w-full"/>
            <Skeleton className="h-4 w-5/6"/>
        </div>
        <div className="mb-3 space-y-1">
            <Skeleton className="h-5 w-1/2"/>
            <Skeleton className="h-4 w-full"/>
             <Skeleton className="h-4 w-4/5"/>
        </div>
    </>
)

// ----- History Storage & Type -----

// Updated StoredAnalysis to include new fields
type StoredAnalysis = {
  id: string;
  timestamp: number;
  content: string;
  readabilityResult: ReadabilityAnalysisOutput | null;
  engagementResult: EngagementPredictionOutput | null;
  summaryResult?: SummarizeContentOutput | null; // Optional for backward compatibility
  toneSentimentResult?: AnalyzeToneSentimentOutput | null;
  faqResult?: GenerateFaqOutput | null;
  shareabilityResult?: AnalyzeShareabilityOutput | null;
  voiceSearchResult?: AnalyzeVoiceSearchOutput | null;
};

const MAX_HISTORY_ITEMS = 15;
const GENERIC_HISTORY_KEY = 'contentAnalysisHistory_v2_guest'; // Updated key version

const getHistoryStorageKey = (): string => {
  if (typeof window !== 'undefined') {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userProfile = localStorage.getItem('userProfile');
    if (isLoggedIn && userProfile) {
      try {
        const profile = JSON.parse(userProfile);
        const userId = profile.email ? profile.email.replace(/[^a-zA-Z0-9]/g, '_') : profile.id || 'unknown_user';
        return `contentAnalysisHistory_v2_${userId}`; // Updated key version
      } catch (e) {
        console.error("Error parsing user profile for history key", e);
        return GENERIC_HISTORY_KEY;
      }
    }
  }
  return GENERIC_HISTORY_KEY;
};

// ----- Analyze Page Component -----

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
    target: '#results-tabs-list', // Target the TabsList for better positioning
    title: 'View Results',
    content: 'Explore different analysis results across these tabs: Core Metrics, Enhancement, and Distribution.',
    placement: 'bottom' as const,
  },
   {
    target: '#core-metrics-tab-trigger',
    title: 'Core Metrics',
    content: 'Check Readability and Engagement scores here.',
    placement: 'bottom' as const,
  },
   {
    target: '#enhancement-tab-trigger',
    title: 'Content Enhancement',
    content: 'Find AI-generated Summaries, Tone Analysis, and suggested FAQs.',
    placement: 'bottom' as const,
  },
    {
    target: '#distribution-tab-trigger',
    title: 'Distribution Optimization',
    content: 'Get tips for improving Shareability and Voice Search performance.',
    placement: 'bottom' as const,
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
  const [progress, setProgress] = useState(0);
  const [analysisHistory, setAnalysisHistory] = useState<StoredAnalysis[]>([]);
  const { startTour, isTourActive } = useTour();
  const [historyStorageKey, setHistoryStorageKey] = useState(GENERIC_HISTORY_KEY);

  // State for new analysis results
  const [readabilityResult, setReadabilityResult] = useState<ReadabilityAnalysisOutput | null>(null);
  const [engagementResult, setEngagementResult] = useState<EngagementPredictionOutput | null>(null);
  const [summaryResult, setSummaryResult] = useState<SummarizeContentOutput | null>(null);
  const [toneSentimentResult, setToneSentimentResult] = useState<AnalyzeToneSentimentOutput | null>(null);
  const [faqResult, setFaqResult] = useState<GenerateFaqOutput | null>(null);
  const [shareabilityResult, setShareabilityResult] = useState<AnalyzeShareabilityOutput | null>(null);
  const [voiceSearchResult, setVoiceSearchResult] = useState<AnalyzeVoiceSearchOutput | null>(null);

  // --- Effects ---
  useEffect(() => {
    setHistoryStorageKey(getHistoryStorageKey());
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedHistory = localStorage.getItem(historyStorageKey);
      if (storedHistory) {
         try {
           const parsedHistory = JSON.parse(storedHistory) as StoredAnalysis[]; // Type assertion
           if(Array.isArray(parsedHistory)) {
             // Optional: Add migration logic here if needed for older history formats
             setAnalysisHistory(parsedHistory);
           } else {
             console.warn("Stored history is not an array, resetting.");
             localStorage.removeItem(historyStorageKey);
             setAnalysisHistory([]);
           }
         } catch(e) {
             console.error("Failed to parse history, resetting.", e);
             localStorage.removeItem(historyStorageKey);
             setAnalysisHistory([]);
         }
      } else {
        setAnalysisHistory([]);
      }
    }
  }, [historyStorageKey]);

  useEffect(() => {
    if (isLoading) {
      // Simulate progress more realistically based on multiple calls
      let currentProgress = 10;
      setProgress(currentProgress);
      const interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 15) + 5; // Variable steps
        if (currentProgress >= 95) {
           setProgress(95); // Cap progress before completion
           clearInterval(interval);
        } else {
           setProgress(currentProgress);
        }
      }, 300); // Slightly slower interval
      return () => clearInterval(interval);
    } else {
       setProgress(0); // Reset progress when not loading
    }
  }, [isLoading]);

  // Tour Logic - Updated to prevent multiple starts
   useEffect(() => {
    if (typeof window !== 'undefined') {
      const tourCompleted = localStorage.getItem('appTourCompleted_AnalyzePage_v1') === 'true';
      // Only attempt to start if not completed and not currently active
      if (!tourCompleted && !isTourActive) {
        // Optional: add a small delay to ensure the page is settled.
        // We remove the isLoading check here because the tour should ideally
        // only trigger once on mount if not completed. Subsequent loading states
        // shouldn't restart the tour.
        const timer = setTimeout(() => {
          // Double-check completion status inside timeout in case it changed
          if (localStorage.getItem('appTourCompleted_AnalyzePage_v1') !== 'true' && !isTourActive) {
             startTour(analyzePageTourSteps);
          }
        }, 700); // Delay slightly
        return () => clearTimeout(timer); // Cleanup timer
      }
    }
    // Depend only on startTour and isTourActive. startTour reference usually doesn't change.
    // isTourActive changing might re-trigger the check, but the !tourCompleted condition prevents restart.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTour, isTourActive]);


  // --- Handlers & Helpers ---
  const saveHistory = useCallback((newHistory: StoredAnalysis[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(historyStorageKey, JSON.stringify(newHistory));
    }
    setAnalysisHistory(newHistory);
  }, [historyStorageKey]);

  const handleAnalyze = async (contentToAnalyze: string = content) => {
    if (!contentToAnalyze.trim()) {
      setError("Content cannot be empty.");
      return;
    }
    setIsLoading(true);
    setError(null);
    // Reset all results
    setReadabilityResult(null);
    setEngagementResult(null);
    setSummaryResult(null);
    setToneSentimentResult(null);
    setFaqResult(null);
    setShareabilityResult(null);
    setVoiceSearchResult(null);
    setProgress(10); // Initial progress

    try {
      // Load current history for saving later
      let currentHistory: StoredAnalysis[] = [];
       if (typeof window !== 'undefined') {
          const stored = localStorage.getItem(historyStorageKey);
          if (stored) {
              try {
                  const parsed = JSON.parse(stored);
                  if (Array.isArray(parsed)) currentHistory = parsed;
              } catch { /* ignore parse error, use empty */ }
          }
      }

      // Call all analysis functions in parallel
      const analysisPromises = [
        analyzeReadability({ content: contentToAnalyze }),
        engagementPrediction({ content: contentToAnalyze }),
        summarizeContent({ content: contentToAnalyze }),
        analyzeToneSentiment({ content: contentToAnalyze }),
        generateFaqs({ content: contentToAnalyze }),
        analyzeShareability({ content: contentToAnalyze }),
        analyzeVoiceSearch({ content: contentToAnalyze }),
      ];

      const [
        readabilityData,
        engagementData,
        summaryData,
        toneSentimentData,
        faqData,
        shareabilityData,
        voiceSearchData
      ] = await Promise.all(analysisPromises);

      // Update state with results
      setReadabilityResult(readabilityData);
      setEngagementResult(engagementData);
      setSummaryResult(summaryData);
      setToneSentimentResult(toneSentimentData);
      setFaqResult(faqData);
      setShareabilityResult(shareabilityData);
      setVoiceSearchResult(voiceSearchData);
      
      setProgress(100); // Analysis complete

      // Save to history
      const newAnalysis: StoredAnalysis = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        content: contentToAnalyze,
        readabilityResult: readabilityData,
        engagementResult: engagementData,
        summaryResult: summaryData,
        toneSentimentResult: toneSentimentData,
        faqResult: faqData,
        shareabilityResult: shareabilityData,
        voiceSearchResult: voiceSearchData,
      };
      
      const updatedHistory = [newAnalysis, ...currentHistory].slice(0, MAX_HISTORY_ITEMS);
      saveHistory(updatedHistory);

    } catch (err) {
      console.error("Analysis error:", err);
      setError("An error occurred during analysis. Please try again.");
      setProgress(0); // Reset progress on error
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
    setSummaryResult(item.summaryResult);
    setToneSentimentResult(item.toneSentimentResult);
    setFaqResult(item.faqResult);
    setShareabilityResult(item.shareabilityResult);
    setVoiceSearchResult(item.voiceSearchResult);
    setError(null);
    setIsLoading(false); // Ensure loading is off
    setProgress(0); // Reset progress
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

  const getSentimentEmoji = (score: number): string => {
    if (score > 0.5) return '😄'; // Very Positive
    if (score > 0.1) return '😊'; // Positive
    if (score < -0.5) return '😠'; // Very Negative
    if (score < -0.1) return '😟'; // Negative
    return '😐'; // Neutral
  }

  // Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const historyItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } }
  };
  
  const resultsAvailable = readabilityResult || engagementResult || summaryResult || toneSentimentResult || faqResult || shareabilityResult || voiceSearchResult;

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <motion.div 
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <header className="mb-8 text-center">
           <motion.h1 
            className="text-4xl font-bold tracking-tight text-foreground"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Content <span className="text-primary">Analyzer</span> <Bot className="inline-block h-10 w-10 text-primary -mt-2"/>
          </motion.h1>
          <motion.p 
            className="mt-2 text-lg text-muted-foreground"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Paste your text below to get AI-powered insights on readability, engagement, tone, SEO, and more.
          </motion.p>
        </header>

        {/* Input Card */}
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
                  <Progress value={progress} className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-accent transition-all duration-300" />
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

      {/* Results Section */}
      {(resultsAvailable || isLoading) && (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="core" className="w-full" id="results-tabs">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-6" id="results-tabs-list">
            <TabsTrigger value="core" id="core-metrics-tab-trigger"><BookOpen className="mr-2 h-4 w-4" /> Core Metrics</TabsTrigger>
            <TabsTrigger value="enhancement" id="enhancement-tab-trigger"><Lightbulb className="mr-2 h-4 w-4" /> Enhancement</TabsTrigger>
            <TabsTrigger value="distribution" id="distribution-tab-trigger"><Share2 className="mr-2 h-4 w-4" /> Distribution</TabsTrigger>
          </TabsList>

          {/* Core Metrics Tab */}
          <TabsContent value="core">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Readability Card */}
              <AnalysisResultCard 
                title="Readability Analysis" 
                icon={BookOpen} 
                isLoading={isLoading && !readabilityResult} // Show skeleton only if loading AND no result yet
                loadingSkeleton={<ScoreAndListSkeleton />}
                description="How easy is your content to understand?"
              >
                {readabilityResult ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-md font-medium text-muted-foreground">Flesch-Kincaid Score</h3>
                      <p className="text-3xl font-bold text-primary">{readabilityResult.fleschKincaidScore.toFixed(1)}</p>
                      <p className="text-sm text-muted-foreground">{getReadabilityLevel(readabilityResult.fleschKincaidScore)}</p>
                    </div>
                    <div>
                      <h3 className="text-md font-medium text-muted-foreground mb-1">Suggestions:</h3>
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
                   !isLoading && <p className="text-muted-foreground text-center py-4">No readability data.</p>
                )}
              </AnalysisResultCard>
              
              {/* Engagement Card */}
              <AnalysisResultCard 
                title="Engagement Prediction" 
                icon={BarChart3} 
                isLoading={isLoading && !engagementResult}
                loadingSkeleton={<ScoreAndListSkeleton />}
                description="How likely is your content to engage readers?"
              >
                {engagementResult ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-md font-medium text-muted-foreground">Predicted Level</h3>
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
                  !isLoading && <p className="text-muted-foreground text-center py-4">No engagement data.</p>
                )}
              </AnalysisResultCard>
            </div>
          </TabsContent>

          {/* Enhancement Tab */}
          <TabsContent value="enhancement">
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Summary Card */}
                <AnalysisResultCard 
                  title="Content Summary" 
                  icon={FileText} 
                  isLoading={isLoading && !summaryResult}
                  loadingSkeleton={<BasicTextListSkeleton/>}
                  description="A concise AI-generated summary."
                >
                  {summaryResult ? (
                    <p className="text-sm text-foreground leading-relaxed">{summaryResult.summary}</p>
                  ) : (
                    !isLoading && <p className="text-muted-foreground text-center py-4">No summary generated.</p>
                  )}
                </AnalysisResultCard>

                {/* Tone & Sentiment Card */}
                 <AnalysisResultCard 
                    title="Tone & Sentiment" 
                    icon={Palette} 
                    isLoading={isLoading && !toneSentimentResult}
                    loadingSkeleton={<ScoreAndListSkeleton />}
                    description="Analyze the emotional impact and style."
                  >
                  {toneSentimentResult ? (
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-md font-medium text-muted-foreground">Detected Tone</h3>
                            <p className="text-xl font-semibold text-primary capitalize">{toneSentimentResult.detectedTone}</p>
                        </div>
                        <div>
                            <h3 className="text-md font-medium text-muted-foreground">Sentiment Score {getSentimentEmoji(toneSentimentResult.sentimentScore)}</h3>
                            <p className="text-xl font-semibold text-primary">{toneSentimentResult.sentimentScore.toFixed(2)}</p>
                            <p className="text-xs text-muted-foreground">(-1 Negative, 1 Positive)</p>
                        </div>
                         <div>
                            <h3 className="text-md font-medium text-muted-foreground mb-1">Emotional Keywords:</h3>
                            <div className="flex flex-wrap gap-1">
                                {toneSentimentResult.emotionalKeywords.length > 0 ? (
                                    toneSentimentResult.emotionalKeywords.map((keyword, index) => (
                                        <Badge key={index} variant="secondary">{keyword}</Badge>
                                    ))
                                ) : (
                                    <p className="text-xs text-muted-foreground">None detected.</p>
                                )}
                            </div>
                         </div>
                    </div>
                  ) : (
                    !isLoading && <p className="text-muted-foreground text-center py-4">No tone data.</p>
                  )}
                </AnalysisResultCard>

                {/* FAQ Generation Card */}
                <AnalysisResultCard 
                  title="Suggested FAQs" 
                  icon={HelpCircle} 
                  isLoading={isLoading && !faqResult}
                  loadingSkeleton={<FaqSkeleton />}
                  description="AI-generated questions & answers."
                >
                  {faqResult && faqResult.faqs.length > 0 ? (
                    <ScrollArea className="h-56">
                        <ul className="space-y-3">
                            {faqResult.faqs.map((faq, index) => (
                                <li key={index}>
                                <p className="text-sm font-semibold text-foreground mb-0.5">{faq.question}</p>
                                <p className="text-xs text-muted-foreground">{faq.answer}</p>
                                </li>
                            ))}
                        </ul>
                    </ScrollArea>
                  ) : (
                    !isLoading && <p className="text-muted-foreground text-center py-4">No FAQs generated.</p>
                  )}
                </AnalysisResultCard>
             </div>
          </TabsContent>

          {/* Distribution Tab */}
           <TabsContent value="distribution">
             <div className="grid md:grid-cols-2 gap-6">
               {/* Shareability Card */}
               <AnalysisResultCard 
                  title="Shareability Analysis" 
                  icon={Share2} 
                  isLoading={isLoading && !shareabilityResult}
                  loadingSkeleton={<ScoreAndListSkeleton />}
                  description="Potential for social sharing."
                >
                  {shareabilityResult ? (
                     <div className="space-y-4">
                        <div>
                            <h3 className="text-md font-medium text-muted-foreground">Estimated Score</h3>
                            <p className="text-3xl font-bold text-primary">{shareabilityResult.shareabilityScore}/100</p>
                        </div>
                        <div>
                            <h3 className="text-md font-medium text-muted-foreground mb-1">Tips to Improve:</h3>
                             <ScrollArea className="h-40">
                                <ul className="list-disc space-y-1 pl-5 text-sm text-foreground">
                                    {shareabilityResult.shareabilityTips.map((tip, index) => (
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
                    !isLoading && <p className="text-muted-foreground text-center py-4">No shareability data.</p>
                  )}
                </AnalysisResultCard>

                {/* Voice Search Card */}
                <AnalysisResultCard 
                  title="Voice Search Optimization" 
                  icon={Mic} 
                  isLoading={isLoading && !voiceSearchResult}
                  loadingSkeleton={<BasicTextListSkeleton />}
                   description="Tips for voice assistant queries."
                >
                  {voiceSearchResult ? (
                     <div>
                        <h3 className="text-md font-medium text-muted-foreground mb-1">Tips:</h3>
                         <ScrollArea className="h-52">
                            <ul className="list-disc space-y-1 pl-5 text-sm text-foreground">
                                {voiceSearchResult.voiceSearchTips.map((tip, index) => (
                                <li key={index} className="flex items-start">
                                    <Lightbulb className="mr-2 mt-0.5 h-4 w-4 shrink-0 text-accent" /> 
                                    <span>{tip}</span>
                                </li>
                                ))}
                            </ul>
                        </ScrollArea>
                    </div>
                  ) : (
                     !isLoading && <p className="text-muted-foreground text-center py-4">No voice search data.</p>
                  )}
                </AnalysisResultCard>
             </div>
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
                            <div className="flex space-x-1 sm:space-x-2 shrink-0 ml-2"> {/* Reduced space on small screens */}
                              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9" onClick={() => handleViewHistoryItem(item)} title="View Details">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9" onClick={() => handleReanalyzeHistoryItem(item)} title="Re-analyze">
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9" onClick={() => handleDeleteHistoryItem(item.id)} title="Delete">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                           {/* Display key metrics from history */}
                          <div className="mt-2 pt-2 border-t border-border flex flex-wrap gap-x-4 gap-y-1 text-xs">
                            {item.readabilityResult && (
                               <p>Readability: <span className="font-semibold text-primary">{item.readabilityResult.fleschKincaidScore.toFixed(1)}</span></p>
                            )}
                            {item.engagementResult && (
                               <p>Engagement: <span className="font-semibold text-primary capitalize">{item.engagementResult.predictedEngagement}</span></p>
                            )}
                            {item.summaryResult && (
                               <p>Summary: <span className="font-semibold text-primary">Available</span></p>
                            )}
                             {item.toneSentimentResult && (
                               <p>Tone: <span className="font-semibold text-primary capitalize">{item.toneSentimentResult.detectedTone}</span></p>
                            )}
                             {item.shareabilityResult && (
                               <p>Share Score: <span className="font-semibold text-primary">{item.shareabilityResult.shareabilityScore}</span></p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.li>
                  ))}
                  </AnimatePresence>
                </ul>
              </ScrollArea>
            ) : (
               isLoading ? ( // Show skeleton only if actively loading new content
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
