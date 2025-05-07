"use client";

import type { ChatbotInput, ChatbotOutput } from '@/ai/flows/chatbot-flow';
import { chatWithBot } from '@/ai/flows/chatbot-flow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Loader2, MessageSquare, Send, User, Video, X } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Message = {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  videoUrl?: string;
};

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { id: 'initial-greeting', role: 'model', content: "Hello! I'm ContentAI Helper. How can I assist you today with our platform?" }
      ]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const chatHistory = messages.map(msg => ({ role: msg.role as 'user' | 'model', content: msg.content }));
      const chatbotInput: ChatbotInput = { message: userMessage.content, history: chatHistory };
      const response: ChatbotOutput = await chatWithBot(chatbotInput);
      
      const botMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        content: response.reply,
        videoUrl: response.suggestedVideo
      };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        role: 'system', 
        content: "Sorry, I encountered an error. Please try again." 
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const variants = {
    open: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { opacity: 0, y: 50, scale: 0.9, transition: { duration: 0.2 } }
  };

  return (
    <>
      <motion.div 
        className="fixed bottom-6 right-6 z-50"
        initial={false}
        animate={isOpen ? "closed" : "open"} // Show button when chat is closed
        variants={variants}
      >
        <Button
          size="lg"
          className="rounded-full shadow-xl p-4 h-16 w-16"
          onClick={() => setIsOpen(true)}
          aria-label="Open chatbot"
        >
          <MessageSquare className="h-7 w-7" />
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-[60] " // Higher z-index for the card
            initial="closed"
            animate="open"
            exit="closed"
            variants={variants}
          >
            <Card className="w-[350px] h-[500px] shadow-2xl flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                  <Bot className="h-6 w-6 text-primary" />
                  <CardTitle className="text-lg">ContentAI Helper</CardTitle>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close chatbot">
                  <X className="h-5 w-5" />
                </Button>
              </CardHeader>
              <CardContent className="p-0 flex-grow overflow-hidden">
                <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`mb-3 flex ${
                        msg.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
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
              <CardFooter className="p-4 border-t">
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
                    className="flex-grow"
                  />
                  <Button type="submit" size="icon" disabled={isLoading || !inputValue.trim()} aria-label="Send message">
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
