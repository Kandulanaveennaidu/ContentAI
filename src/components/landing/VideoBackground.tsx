// src/components/landing/VideoBackground.tsx
"use client";

import React, { useEffect, useRef } from 'react';

interface VideoBackgroundProps {
  src: string;
}

export function VideoBackground({ src }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8; // Example: slow down video slightly
    }
  }, []);
  
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden"> {/* Ensure negative z-index */}
      <video
        ref={videoRef}
        className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
        src={src}
        autoPlay
        loop
        muted
        playsInline // Important for iOS
        poster="https://picsum.photos/1920/1080?blur=2" // Placeholder poster
        data-ai-hint="abstract technology"
      />
      {/* Dark overlay for better text contrast - Ensure this is above the video but below content */}
      <div className="absolute inset-0 bg-black/75 z-0"></div> 
    </div>
  );
}
