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

const TOUR_COMPLETED_KEY = 'appTourCompleted';

export const TourProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [steps, setSteps] = useState<TourStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isTourActive, setIsTourActive] = useState(false);
  const [highlightedElementRect, setHighlightedElementRect] = useState<DOMRect | null>(null);
  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
        const tourCompleted = localStorage.getItem(TOUR_COMPLETED_KEY);
        if (tourCompleted === 'true') {
            setIsTourActive(false);
        }
    }
  }, []);


  const startTour = useCallback((tourSteps: TourStep[]) => {
    if (typeof window !== 'undefined' && localStorage.getItem(TOUR_COMPLETED_KEY) === 'true') {
      return; // Don't start if already completed
    }
    setSteps(tourSteps);
    setCurrentStepIndex(0);
    setIsTourActive(true);
  }, []);

  const endTour = useCallback(() => {
    setIsTourActive(false);
    setSteps([]);
    setCurrentStepIndex(0);
    setHighlightedElementRect(null);
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOUR_COMPLETED_KEY, 'true');
    }
  }, []);

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
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        setHighlightedElementRect(null); // Target not found
      }
    } else if (currentStep && currentStep.target === 'center') {
         setHighlightedElementRect(null); // No specific element to highlight for center
    } else {
      setHighlightedElementRect(null);
    }
  }, [isTourActive, currentStep]);

  if (!isMounted) return <>{children}</>;


  const getTooltipPosition = () => {
    if (!highlightedElementRect || !currentStep || currentStep.target === 'center') {
      return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'fixed' as 'fixed' };
    }

    const placement = currentStep.placement || 'bottom';
    const offset = 10; // space between element and tooltip
    
    switch (placement) {
      case 'top':
        return { bottom: window.innerHeight - highlightedElementRect.top + offset, left: highlightedElementRect.left + highlightedElementRect.width / 2, transform: 'translateX(-50%)', position: 'fixed' as 'fixed' };
      case 'bottom':
        return { top: highlightedElementRect.bottom + offset, left: highlightedElementRect.left + highlightedElementRect.width / 2, transform: 'translateX(-50%)', position: 'fixed' as 'fixed' };
      case 'left':
        return { top: highlightedElementRect.top + highlightedElementRect.height / 2, right: window.innerWidth - highlightedElementRect.left + offset, transform: 'translateY(-50%)', position: 'fixed' as 'fixed' };
      case 'right':
        return { top: highlightedElementRect.top + highlightedElementRect.height / 2, left: highlightedElementRect.right + offset, transform: 'translateY(-50%)', position: 'fixed' as 'fixed' };
      default: // center or fallback
        return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'fixed' as 'fixed' };
    }
  };


  return (
    <TourContext.Provider value={{ startTour, nextStep, prevStep, endTour, currentStepIndex, isTourActive, currentStep }}>
      {children}
      <AnimatePresence>
        {isTourActive && currentStep && (
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

            {/* Highlight Box (optional, can be complex with SVG masks) */}
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
                    className="fixed rounded-md border-2 border-primary shadow-2xl z-[9999] pointer-events-none"
                    style={{
                      boxShadow: '0 0 0 9999px rgba(0,0,0,0.7)', // "Cutout" effect
                      borderColor: 'hsl(var(--primary))', // Ensure primary color is used
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
                  {steps.length > 1 && <CardDescription>Step {currentStepIndex + 1} of {steps.length}</CardDescription>}
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
