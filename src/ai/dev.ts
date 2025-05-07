import { config } from 'dotenv';
config();

import '@/ai/flows/engagement-prediction.ts';
import '@/ai/flows/readability-analysis.ts';
import '@/ai/flows/chatbot-flow.ts';
import '@/ai/flows/summarize-content-flow.ts'; // Added
import '@/ai/flows/analyze-tone-sentiment-flow.ts'; // Added
import '@/ai/flows/generate-faq-flow.ts'; // Added
import '@/ai/flows/analyze-shareability-flow.ts'; // Added
import '@/ai/flows/analyze-voice-search-flow.ts'; // Added

