// src/lib/press-articles-data.ts
import type { LucideIcon } from 'lucide-react';

export interface PressContentBlock {
  type: 'heading' | 'paragraph' | 'image' | 'list' | 'quote' | 'video' | 'icon-section';
  level?: 2 | 3 | 4; // For headings h2, h3, h4
  text?: string; // For paragraph, heading, quote, iconText
  src?: string; // For image or video
  alt?: string; // For image
  hint?: string; // For image AI hint / video poster hint
  items?: string[]; // For list
  icon?: keyof typeof import('lucide-react'); // Lucide icon name for icon-section
  iconText?: string; // Title for icon-section
  caption?: string; // For video or image
  author?: string; // For quote
}

export interface PressArticle {
  slug: string;
  publication: string;
  title: string;
  date: string;
  logoSrc: string; // Logo of the publication
  logoHint: string;
  featuredImage: { src: string; alt: string; hint: string }; // Main image for the article page
  summary: string; // A brief summary of the article
  contentBlocks: PressContentBlock[];
  originalArticleLink?: string; // Optional link to the original source
  tags?: string[];
}

export const pressArticles: PressArticle[] = [
  {
    slug: "contentai-revolutionizing-content-strategy-with-ai",
    publication: "Tech Innovate Magazine",
    title: "ContentAI: Revolutionizing Content Strategy with AI",
    date: "September 15, 2023",
    logoSrc: "https://picsum.photos/seed/techinnovate/150/50",
    logoHint: "magazine logo tech",
    featuredImage: { 
      src: "https://picsum.photos/seed/pressfeature1/1200/600", 
      alt: "AI brain with content symbols",
      hint: "AI brain content" 
    },
    summary: "Tech Innovate Magazine dives deep into how ContentAI is leveraging artificial intelligence to reshape content strategies for businesses worldwide, offering tools for enhanced readability and engagement.",
    tags: ["AI", "Content Strategy", "Innovation", "SaaS"],
    originalArticleLink: "#", // Placeholder
    contentBlocks: [
      { type: 'paragraph', text: "The digital content landscape is fiercely competitive. ContentAI, an emerging leader in AI-powered content optimization, is making waves by providing businesses with the tools to not just create content, but to craft messages that truly resonate and perform. This article explores their innovative approach." },
      { type: 'heading', level: 2, text: "The Core Problem: Content Overload, Engagement Deficit" },
      { type: 'paragraph', text: "Many companies struggle to make their content stand out. ContentAI tackles this by offering sophisticated analysis of readability and engagement potential. 'Our goal is to democratize access to the kind of content intelligence previously only available to large corporations,' says a ContentAI spokesperson." },
      { type: 'image', src: "https://picsum.photos/seed/contentgraph/800/450", alt: "Graph showing content performance", hint: "data analysis graph" },
      { type: 'heading', level: 3, text: "Key Features Highlighted" },
      { type: 'list', items: [
          "Advanced Readability Scoring (Flesch-Kincaid and more).",
          "AI-Driven Engagement Prediction with actionable tips.",
          "Seamless integration for content creators and marketing teams."
      ]},
      { type: 'video', src: "https://assets.mixkit.co/videos/preview/mixkit-working-on-a-laptop-in-a-modern-office-4432-large.mp4", caption: "A glimpse into ContentAI's intuitive dashboard.", hint: "software dashboard interface"},
      { type: 'quote', text: "ContentAI isn't just about algorithms; it's about empowering human creativity with intelligent insights.", author: "Jane Doe, Lead Tech Analyst, Tech Innovate" },
      { type: 'icon-section', icon: 'Zap', iconText: 'Rapid Analysis Engine', text: "Users report significant time savings with ContentAI's fast and accurate content analysis, allowing for quicker iterations and content deployment." },
      { type: 'paragraph', text: "The platform's focus on actionable feedback is a key differentiator. Instead of just presenting data, ContentAI guides users on *how* to improve their content, making it a valuable partner in the content creation lifecycle." },
      { type: 'heading', level: 2, text: "Future Outlook"},
      { type: 'paragraph', text: "With a strong roadmap including advanced SEO features and team collaboration tools, ContentAI is poised for significant growth. Their commitment to continuous improvement and user-centric design makes them a company to watch in the AI content space."}
    ]
  },
  {
    slug: "the-future-of-writing-how-contentai-is-leading-the-charge",
    publication: "AI Weekly Chronicle",
    title: "The Future of Writing: How ContentAI is Leading the Charge",
    date: "August 28, 2023",
    logoSrc: "https://picsum.photos/seed/aiweekly/150/50",
    logoHint: "news logo AI",
    featuredImage: { 
      src: "https://picsum.photos/seed/pressfeature2/1200/600", 
      alt: "Futuristic writing concept",
      hint: "future writer technology" 
    },
    summary: "AI Weekly Chronicle examines ContentAI's role in the evolving world of AI-assisted writing, highlighting its impact on content quality and creator productivity.",
    tags: ["AI Writing", "Future of Work", "Productivity", "Tech"],
    originalArticleLink: "#",
    contentBlocks: [
      { type: 'paragraph', text: "Artificial intelligence is augmenting human capabilities across industries, and writing is no exception. ContentAI stands at the forefront of this revolution, offering tools that promise to enhance, not replace, the writer's craft." },
      { type: 'heading', level: 2, text: "Beyond Grammar Checks: Holistic Content Improvement" },
      { type: 'paragraph', text: "While many tools focus on basic grammar and spelling, ContentAI delves deeper. It analyzes content for readability, predicting how easily an audience can digest the information. Furthermore, its engagement prediction engine provides insights into the potential emotional impact and persuasiveness of the text." },
      { type: 'image', src: "https://picsum.photos/seed/writingtool/800/450", alt: "Writer using an AI tool", hint: "writer computer screen" },
      { type: 'icon-section', icon: 'Lightbulb', iconText: 'Fostering Deeper Audience Connection', text: "ContentAI guides writers to tailor their language and tone, ensuring their message connects effectively with the intended audience." },
      { type: 'quote', text: "The best AI writing tools act as a co-pilot, offering data-driven suggestions that elevate the writer's skill.", author: "Dr. Al Khemist, AI Ethicist"},
      { type: 'paragraph', text: "ContentAI's approach emphasizes a partnership between human writers and AI, aiming to make the writing process more efficient and the output more impactful."}
    ]
  },
  {
    slug: "contentais-engagement-prediction-tool-a-game-changer-for-marketers",
    publication: "Marketing Pro Daily",
    title: "ContentAI's Engagement Prediction Tool: A Game Changer for Marketers",
    date: "July 05, 2023",
    logoSrc: "https://picsum.photos/seed/marketingpro/150/50",
    logoHint: "marketing logo pro",
    featuredImage: { 
      src: "https://picsum.photos/seed/pressfeature3/1200/600", 
      alt: "Marketing dashboard with engagement metrics",
      hint: "marketing analytics data" 
    },
    summary: "Marketing Pro Daily reviews ContentAI's groundbreaking engagement prediction feature, assessing its potential to transform how marketers approach content creation and campaign planning.",
    tags: ["Marketing Tech", "Engagement", "AI Tools", "Content Marketing"],
    originalArticleLink: "#",
    contentBlocks: [
      { type: 'paragraph', text: "In a world saturated with content, capturing and retaining audience attention is paramount for marketers. ContentAI's new engagement prediction tool aims to give marketers a significant edge." },
      { type: 'heading', level: 2, text: "How It Works" },
      { type: 'paragraph', text: "The tool analyzes text for various linguistic and structural cues known to influence reader engagement. This includes sentiment analysis, detection of storytelling elements, clarity of calls to action, and overall emotional arc. It then provides a predictive score and actionable tips." },
      { type: 'video', src: "https://assets.mixkit.co/videos/preview/mixkit-presenting-graphs-on-a-tablet-39705-large.mp4", caption: "Demonstration of engagement metrics analysis.", hint: "data presentation tablet" },
      { type: 'heading', level: 3, text: "Early Adopter Feedback" },
      { type: 'list', items: [
          "Beta users report up to a 20% lift in key engagement metrics like click-through rates and social shares after implementing suggestions.",
          "Marketers appreciate the ability to 'test' content concepts before investing heavily in production."
      ]},
      { type: 'quote', text: "Being able to predict engagement is like having a crystal ball for your content strategy. ContentAI is making this a reality.", author: "Sarah Jenkins, CMO at InnovateCorp"},
      { type: 'paragraph', text: "While no tool can guarantee viral success, ContentAI's engagement predictor significantly increases the odds of creating content that not only reaches but also resonates with target audiences."}
    ]
  }
];
