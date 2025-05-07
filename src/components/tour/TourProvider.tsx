
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TourStep {
  target: string; // CSS selector for the element to highlight
  title: string;
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'center';

}

interface TourContextType {
  startTour: (steps: TourStep[]) => void;
  nextStep: () => void;
  prevStep: () => void;
  endTour: () => void;
  currentStepIndex: number;
  isTourActive: boolean;
  currentStep: TourStep | null;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

const TOUR_COMPLETED_KEY_PREFIX = 'appTourCompleted_'; // Prefix for tour keys

export const TourProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [steps, setSteps] = useState<TourStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isTourActive, setIsTourActive] = useState(false);
  const [highlightedElementRect, setHighlightedElementRect] = useState<DOMRect | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [currentTourKey, setCurrentTourKey] = useState<string | null>(null);


  useEffect(() => {
    setIsMounted(true);
  }, []);


  const startTour = useCallback((tourSteps: TourStep[], tourId: string) => {
    const fullTourKey = `${TOUR_COMPLETED_KEY_PREFIX}${tourId}`;
    setCurrentTourKey(fullTourKey); // Store the key for ending the tour

    if (typeof window !== 'undefined') {
        const tourCompleted = localStorage.getItem(fullTourKey) === 'true';
        if (!tourCompleted) {
            setSteps(tourSteps);
            setCurrentStepIndex(0);
            setIsTourActive(true);
        } else {
            // console.log(`Tour ${tourId} already completed.`);
        }
    } else {
         // Default behavior if window is not defined (e.g., SSR, though unlikely for startTour)
         // Proceed with the tour, localStorage check will happen on client
         setSteps(tourSteps);
         setCurrentStepIndex(0);
         setIsTourActive(true);
    }
  }, []);

  const endTour = useCallback(() => {
    setIsTourActive(false);
    setSteps([]);
    setCurrentStepIndex(0);
    setHighlightedElementRect(null);
    if (typeof window !== 'undefined' && currentTourKey) {
      localStorage.setItem(currentTourKey, 'true'); // Use the stored key
      // console.log(`Marked tour ${currentTourKey} as completed.`);
    }
     setCurrentTourKey(null); // Reset the current tour key
  }, [currentTourKey]);

  const nextStep = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      endTour();
    }
  }, [currentStepIndex, steps.length, endTour]);

  const prevStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  }, [currentStepIndex]);

  const currentStep = isTourActive && steps.length > 0 ? steps[currentStepIndex] : null;

  useEffect(() => {
    if (isTourActive && currentStep && currentStep.target !== 'center') {
      const element = document.querySelector(currentStep.target);
      if (element) {
        const rect = element.getBoundingClientRect();
        setHighlightedElementRect(rect);
        // Debounce or use a slight delay for scrolling to avoid race conditions
        const scrollTimeout = setTimeout(() => {
             element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        }, 100); // Small delay
         return () => clearTimeout(scrollTimeout); // Cleanup timeout on step change
      } else {
        console.warn(`Tour target element not found: ${currentStep.target}`);
        setHighlightedElementRect(null); // Target not found
      }
    } else if (currentStep && currentStep.target === 'center') {
         setHighlightedElementRect(null); // No specific element to highlight for center
    } else {
      setHighlightedElementRect(null);
    }
  }, [isTourActive, currentStep]);


  const getTooltipPosition = () => {
    // This function is called only when isMounted && isTourActive && currentStep is true,
    // so access to `window` should be safe.
    if (!highlightedElementRect || !currentStep || currentStep.target === 'center') {
      return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'fixed' as 'fixed' };
    }

    const placement = currentStep.placement || 'bottom';
    const offset = 10; // space between element and tooltip
    const tooltipWidth = 320; // Estimated tooltip width (w-80)
    const tooltipHeight = 200; // Estimated tooltip height (adjust as needed)
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let top = highlightedElementRect.top + highlightedElementRect.height / 2;
    let left = highlightedElementRect.left + highlightedElementRect.width / 2;
    let transform = 'translate(-50%, -50%)'; // Default center alignment
    let finalPosition: 'fixed' | 'absolute' = 'fixed'; // Use fixed by default

    switch (placement) {
        case 'top':
            top = highlightedElementRect.top - offset;
            transform = 'translate(-50%, -100%)';
            // Adjust if too close to top edge
            if (top - tooltipHeight < 0) {
                top = highlightedElementRect.bottom + offset;
                transform = 'translate(-50%, 0%)'; // Switch to bottom
            }
            break;
        case 'bottom':
            top = highlightedElementRect.bottom + offset;
            transform = 'translate(-50%, 0%)';
             // Adjust if too close to bottom edge
            if (top + tooltipHeight > windowHeight) {
                top = highlightedElementRect.top - offset;
                transform = 'translate(-50%, -100%)'; // Switch to top
            }
            break;
        case 'left':
            left = highlightedElementRect.left - offset;
            transform = 'translate(-100%, -50%)';
             // Adjust if too close to left edge
            if (left - tooltipWidth < 0) {
                left = highlightedElementRect.right + offset;
                transform = 'translate(0%, -50%)'; // Switch to right
            }
            break;
        case 'right':
            left = highlightedElementRect.right + offset;
            transform = 'translate(0%, -50%)';
             // Adjust if too close to right edge
            if (left + tooltipWidth > windowWidth) {
                 left = highlightedElementRect.left - offset;
                 transform = 'translate(-100%, -50%)'; // Switch to left
            }
            break;
        default: // center or fallback
            top = windowHeight / 2;
            left = windowWidth / 2;
            break;
    }
     // Final check for horizontal overflow if placed top/bottom
     if (placement === 'top' || placement === 'bottom') {
         if (left - tooltipWidth / 2 < 0) { // Too close to left edge
             left = offset;
             transform = placement === 'top' ? 'translate(0%, -100%)' : 'translate(0%, 0%)';
         } else if (left + tooltipWidth / 2 > windowWidth) { // Too close to right edge
             left = windowWidth - offset;
             transform = placement === 'top' ? 'translate(-100%, -100%)' : 'translate(-100%, 0%)';
         }
     }

     // Final check for vertical overflow if placed left/right
     if (placement === 'left' || placement === 'right') {
          if (top - tooltipHeight / 2 < 0) { // Too close to top edge
             top = offset;
             transform = placement === 'left' ? 'translate(-100%, 0%)' : 'translate(0%, 0%)';
          } else if (top + tooltipHeight / 2 > windowHeight) { // Too close to bottom edge
             top = windowHeight - offset;
              transform = placement === 'left' ? 'translate(-100%, -100%)' : 'translate(0%, -100%)';
          }
     }


    return { top: `${top}px`, left: `${left}px`, transform, position: finalPosition };
  };

  // Provide a stable context value using useMemo
    const contextValue = React.useMemo(() => ({
        startTour,
        nextStep,
        prevStep,
        endTour,
        currentStepIndex,
        isTourActive,
        currentStep
    }), [startTour, nextStep, prevStep, endTour, currentStepIndex, isTourActive, currentStep]);


  return (
    <TourContext.Provider value={contextValue}>
      {children}
      <AnimatePresence>
        {isMounted && isTourActive && currentStep && (
          <>
            {/* Overlay */}
            <motion.div
              key="tour-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-[9998]"
              onClick={(e) => { /* Prevent clicks on overlay from closing tour by default */ e.stopPropagation(); }}
            />

            {/* Highlight Box */}
            {highlightedElementRect && currentStep.target !== 'center' && (
                <motion.div
                    key="tour-highlight"
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: 1,
                        x: highlightedElementRect.left - 5, // 5px padding
                        y: highlightedElementRect.top - 5,
                        width: highlightedElementRect.width + 10,
                        height: highlightedElementRect.height + 10,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut"}} // Smoother transition
                    className="fixed rounded-md border-2 border-primary shadow-2xl z-[9999] pointer-events-none"
                    style={{
                      boxShadow: '0 0 0 9999px rgba(0,0,0,0.7)', // "Cutout" effect
                      borderColor: 'hsl(var(--primary))',
                    }}
                 />
            )}

            {/* Tooltip Card */}
            <motion.div
              key="tour-tooltip"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              style={getTooltipPosition()}
              className="z-[10000] w-80"
            >
              <Card className="shadow-2xl">
                <CardHeader>
                  <CardTitle>{currentStep.title}</CardTitle>
                  {/* Removed Step Count Description */}
                  {/* {steps.length > 1 && <CardDescription>Step {currentStepIndex + 1} of {steps.length}</CardDescription>} */}
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{currentStep.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="ghost" onClick={endTour} size="sm">
                    <X className="mr-1 h-4 w-4" /> Skip Tour
                  </Button>
                  <div className="flex gap-2">
                    {currentStepIndex > 0 && (
                      <Button variant="outline" onClick={prevStep} size="sm">
                        <ArrowLeft className="mr-1 h-4 w-4" /> Prev
                      </Button>
                    )}
                    <Button onClick={nextStep} size="sm">
                      {currentStepIndex === steps.length - 1 ? <><Check className="mr-1 h-4 w-4"/>Finish</> : <><ArrowRight className="mr-1 h-4 w-4" />Next</>}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </TourContext.Provider>
  );
};

export const useTour = () => {
  const context = useContext(TourContext);
  if (context === undefined) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};
