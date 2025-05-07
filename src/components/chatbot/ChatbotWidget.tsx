// src/components/chatbot/ChatbotWidget.tsx
"use client";

import type { ChatbotInput, ChatbotOutput } from '@/ai/flows/chatbot-flow';
import { chatWithBot } from '@/ai/flows/chatbot-flow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Loader2, MessageSquare, Send, User, Video, X, Trash2, Maximize2, Minimize2, Copy } from 'lucide-react'; // Added Trash2, Maximize2, Minimize2, Copy
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'; // Import Tooltip components

type Message = {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  videoUrl?: string;
  timestamp: number; 
};

// Function to get the correct localStorage key based on login state
const getChatHistoryStorageKey = (): string => {
  const GENERIC_KEY = 'chatbotHistory_guest';
  if (typeof window !== 'undefined') {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userProfile = localStorage.getItem('userProfile');
    if (isLoggedIn && userProfile) {
      try {
        const profile = JSON.parse(userProfile);
        const userId = profile.email ? profile.email.replace(/[^a-zA-Z0-9]/g, '_') : profile.id || 'unknown_user';
        return `chatbotHistory_${userId}`;
      } catch (e) {
        console.error("Error parsing user profile for chat history key", e);
        return GENERIC_KEY; 
      }
    }
  }
  return GENERIC_KEY;
};

// Function to save history
const saveChatHistory = (messages: Message[]) => {
  if (typeof window !== 'undefined') {
    const key = getChatHistoryStorageKey();
    try {
      // Filter out system messages before saving if needed, or keep them for context
      const historyToSave = messages.filter(msg => msg.role !== 'system' || msg.id === 'initial-greeting'); // Keep initial greeting
      localStorage.setItem(key, JSON.stringify(historyToSave));
    } catch (e) {
      console.error("Failed to save chat history to localStorage", e);
      // Handle potential storage limits
    }
  }
};

// Function to load and filter history (removes messages older than 12 hours)
const loadAndFilterChatHistory = (): Message[] => {
   if (typeof window === 'undefined') return [];

   const key = getChatHistoryStorageKey();
   const storedHistory = localStorage.getItem(key);
   if (!storedHistory) return [];

   try {
        const parsedHistory: Message[] = JSON.parse(storedHistory);
        if (!Array.isArray(parsedHistory)) return []; // Ensure it's an array

        const twelveHoursAgo = Date.now() - (12 * 60 * 60 * 1000);
        // Filter out old messages AND ensure messages have timestamps
        const filtered = parsedHistory.filter(msg => msg.timestamp && msg.timestamp > twelveHoursAgo);
        // Ensure the initial greeting isn't duplicated if already present
        if (filtered.length > 0 && filtered[0].id === 'initial-greeting') {
            return filtered;
        }
        // If history exists but no initial greeting, prepend it
        if (filtered.length > 0 && filtered[0].id !== 'initial-greeting') {
             return [
                 { id: 'initial-greeting', role: 'model', content: "Hello! I'm ContentAI Helper. How can I assist you today with our platform?", timestamp: Date.now() },
                 ...filtered
             ];
        }
        // If filtered history is empty (all old messages), return only the greeting
         if (filtered.length === 0) {
             return [
                { id: 'initial-greeting', role: 'model', content: "Hello! I'm ContentAI Helper. How can I assist you today with our platform?", timestamp: Date.now() }
             ];
         }
        return filtered; // Should not be reached, but return filtered just in case
   } catch (e) {
        console.error("Failed to parse or filter chat history", e);
        localStorage.removeItem(key); // Clear corrupted data
        // Return just the initial greeting after clearing corrupted data
        return [
            { id: 'initial-greeting', role: 'model', content: "Hello! I'm ContentAI Helper. How can I assist you today with our platform?", timestamp: Date.now() }
        ];
   }
};


export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false); // State for maximize/minimize
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Load history when the component mounts or when the widget opens
   useEffect(() => {
    if (isOpen) {
        const loadedHistory = loadAndFilterChatHistory();
        setMessages(loadedHistory);
    }
  }, [isOpen]); // Depend only on isOpen to load/initialize

  // Save history whenever messages change
  useEffect(() => {
    if (messages.length > 0 && isOpen) { // Only save if there are messages and the widget is open
        saveChatHistory(messages);
    }
  }, [messages, isOpen]);

  // Scroll to bottom effect
  useEffect(() => {
    if (scrollAreaRef.current) {
      // Use setTimeout to ensure scrolling happens after messages are rendered
      setTimeout(() => {
          if(scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
          }
      }, 100); 
    }
  }, [messages, isMaximized]); // Also trigger scroll on maximize/minimize

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: inputValue, timestamp: Date.now() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages); 
    setInputValue('');
    setIsLoading(true);

    try {
       const chatHistoryForAPI = updatedMessages
          .filter(msg => msg.role === 'user' || msg.role === 'model') 
           // Limit history sent to API if needed (e.g., last 10 messages)
          .slice(-10) 
          .map(msg => ({ role: msg.role as 'user' | 'model', content: msg.content }));

      const chatbotInput: ChatbotInput = { message: userMessage.content, history: chatHistoryForAPI };
      const response: ChatbotOutput = await chatWithBot(chatbotInput);
      
      const botMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        content: response.reply,
        videoUrl: response.suggestedVideo,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'system', 
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    // Keep only the initial greeting
    setMessages([{ id: 'initial-greeting', role: 'model', content: "Hello! I'm ContentAI Helper. How can I assist you today with our platform?", timestamp: Date.now() }]);
    // Also clear the history in localStorage
    if (typeof window !== 'undefined') {
      const key = getChatHistoryStorageKey();
      localStorage.removeItem(key);
    }
    toast({ title: "Chat Cleared", description: "Your conversation history has been removed."});
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleCopyResponse = (content: string) => {
      navigator.clipboard.writeText(content);
      toast({ title: "Copied!", description: "Bot response copied to clipboard."});
  }


  const widgetVariants = {
    open: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.2 } }
  };

  const chatCardSizeClasses = isMaximized 
    ? "w-[90vw] h-[80vh] max-w-[800px] max-h-[700px]" // Maximize size
    : "w-[350px] h-[500px]"; // Default size

  return (
    <TooltipProvider>
      {/* Floating Action Button to Open Chat */}
      <motion.div 
        className="fixed bottom-6 right-6 z-50"
        initial={false}
        animate={isOpen ? "closed" : "open"} 
        variants={widgetVariants}
      >
        <Tooltip>
           <TooltipTrigger asChild>
                <Button
                size="lg"
                className="rounded-full shadow-xl p-4 h-16 w-16"
                onClick={() => setIsOpen(true)}
                aria-label="Open chatbot"
                >
                <MessageSquare className="h-7 w-7" />
                </Button>
           </TooltipTrigger>
            <TooltipContent side="left">
                <p>Chat with AI Helper</p>
            </TooltipContent>
        </Tooltip>
      </motion.div>

      {/* Chat Widget Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`fixed bottom-6 right-6 z-[60] ${isMaximized ? 'bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2' : ''}`} // Center when maximized
            initial="closed"
            animate="open"
            exit="closed"
            variants={widgetVariants}
          >
            <Card className={`${chatCardSizeClasses} shadow-2xl flex flex-col transition-all duration-300 ease-in-out`}>
              <CardHeader className="flex flex-row items-center justify-between p-3 border-b space-x-2">
                <div className="flex items-center gap-2 overflow-hidden">
                  <Bot className="h-6 w-6 text-primary flex-shrink-0" />
                  <CardTitle className="text-lg truncate">ContentAI Helper</CardTitle>
                </div>
                <div className="flex items-center flex-shrink-0">
                   <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleClearChat} aria-label="Clear chat history">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom"><p>Clear History</p></TooltipContent>
                    </Tooltip>
                     <Tooltip>
                        <TooltipTrigger asChild>
                           <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleMaximize} aria-label={isMaximized ? "Minimize chat" : "Maximize chat"}>
                                {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                           </Button>
                       </TooltipTrigger>
                       <TooltipContent side="bottom"><p>{isMaximized ? 'Minimize' : 'Maximize'}</p></TooltipContent>
                   </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                           <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsOpen(false)} aria-label="Close chatbot">
                                <X className="h-5 w-5" />
                           </Button>
                       </TooltipTrigger>
                        <TooltipContent side="bottom"><p>Close Chat</p></TooltipContent>
                   </Tooltip>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-grow overflow-hidden">
                <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
                  {messages.map((msg, index) => (
                    <div
                      key={msg.id}
                      className={`mb-3 flex flex-col group ${ // Added group class
                        msg.role === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg px-3 py-2 text-sm relative ${ // Added relative positioning
                          msg.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : msg.role === 'model'
                            ? 'bg-secondary text-secondary-foreground'
                            : 'bg-destructive/20 text-destructive-foreground text-center w-full'
                        }`}
                      >
                        {msg.content}
                        {msg.videoUrl && (
                           <div className="mt-2">
                            <p className="text-xs mb-1 flex items-center">
                              <Video className="h-3 w-3 mr-1"/> Suggested Video:
                            </p>
                            <video 
                              src={msg.videoUrl} 
                              controls 
                              className="w-full rounded max-h-[150px]"
                              poster="https://picsum.photos/seed/videoposter/300/150?blur=1"
                              data-ai-hint="video player"
                            />
                          </div>
                        )}
                         {/* Copy Button for model messages */}
                        {msg.role === 'model' && (
                             <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute -top-1 -right-1 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity bg-secondary/70 hover:bg-secondary"
                                        onClick={() => handleCopyResponse(msg.content)}
                                        aria-label="Copy response"
                                    >
                                        <Copy className="h-3 w-3 text-secondary-foreground" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="top"><p>Copy</p></TooltipContent>
                            </Tooltip>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                     <div className="flex justify-start mb-3">
                        <div className="bg-secondary text-secondary-foreground rounded-lg px-3 py-2 text-sm flex items-center">
                           <Loader2 className="h-4 w-4 animate-spin mr-2"/> Typing...
                        </div>
                     </div>
                  )}
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-3 border-t">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex w-full items-center space-x-2"
                >
                  <Input
                    type="text"
                    placeholder="Ask something..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={isLoading}
                    className="flex-grow h-9"
                    aria-label="Chat input"
                  />
                    <Tooltip>
                        <TooltipTrigger asChild>
                             <Button type="submit" size="icon" className="h-9 w-9" disabled={isLoading || !inputValue.trim()} aria-label="Send message">
                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                             </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top"><p>Send</p></TooltipContent>
                    </Tooltip>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </TooltipProvider>
  );
}
