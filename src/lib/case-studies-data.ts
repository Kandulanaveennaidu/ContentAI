// src/lib/case-studies-data.ts
import type { PressContentBlock as CaseStudyContentBlock } from '@/lib/press-articles-data'; // Reusing for structure

interface CaseStudyResult {
  metric: string;
  label: string;
}
export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: CaseStudyResult[];
  imageSrc: string; // For the card on /case-studies page
  imageHint: string;
  testimonial?: string; // Make testimonial optional
  featuredImageFull: { src: string; alt: string; hint: string }; // For the [slug] page
  summary: string; // Brief summary for the [slug] page header
  detailedContentBlocks: CaseStudyContentBlock[]; // Detailed content for [slug] page
  date?: string; // Optional date for case study
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "boosting-blog-engagement-startup-x",
    client: "Startup X",
    industry: "SaaS Technology",
    date: "October 10, 2023",
    challenge: "Low blog engagement and difficulty ranking for competitive keywords despite producing regular content.",
    solution: "Utilized ContentAI for readability analysis, engagement prediction, and SEO optimization. Implemented AI-generated content brief improvements.",
    results: [
      { metric: "+45%", label: "Avg. Time on Page" },
      { metric: "+30%", label: "Organic Traffic Growth" },
      { metric: "Top 3", label: "Keyword Ranking" },
    ],
    imageSrc: "https://picsum.photos/seed/casestudy1/500/350",
    imageHint: "graph success chart",
    testimonial: "ContentAI was a game-changer. We saw tangible improvements in our content's performance within weeks.",
    featuredImageFull: { src: "https://picsum.photos/seed/cs1full/1200/600", alt: "Startup X Success Metrics", hint: "dashboard analytics"},
    summary: "Startup X, a dynamic SaaS company, transformed its content strategy and achieved significant growth in blog engagement and search rankings by leveraging ContentAI's comprehensive analysis tools.",
    detailedContentBlocks: [
      { type: 'paragraph', text: "Startup X was producing content consistently but struggled to capture audience attention and rank for crucial industry keywords. Their primary challenges included low time-on-page metrics and poor organic visibility for their blog." },
      { type: 'heading', level: 2, text: "The Challenge: Bridging the Engagement Gap" },
      { type: 'paragraph', text: "Despite a talented writing team, Startup X's content wasn't performing. Key issues identified were: high bounce rates, low average reading times, and content that wasn't aligning with search intent for high-value keywords. They needed a solution to make their content more readable, engaging, and SEO-friendly." },
      { type: 'image', src: "https://picsum.photos/seed/cs1challenge/800/450", alt: "Chart showing declining engagement", hint: "data graph downward", caption: "Initial content performance metrics indicated a need for strategic changes." },
      { type: 'heading', level: 2, text: "The Solution: A Multi-faceted Approach with ContentAI" },
      { type: 'paragraph', text: "Startup X adopted ContentAI to overhaul their content workflow:" },
      { type: 'list', items: [
          "**Readability Analysis:** All existing and new blog posts were analyzed. ContentAI's suggestions helped simplify complex jargon and improve sentence structure, making content accessible to a wider audience within their target demographic.",
          "**Engagement Prediction:** Before publishing, drafts were run through the engagement predictor. This allowed the team to refine headlines, introductions, and calls-to-action based on AI-driven insights, focusing on emotional appeal and clarity.",
          "**SEO Optimization:** ContentAI helped identify semantic keywords and optimize content briefs. This ensured articles were comprehensive and targeted the right search queries.",
          "**AI-Generated Briefs:** The team used ContentAI's brief generator to structure new articles, ensuring all critical elements for success were considered from the outset."
      ]},
      { type: 'video', src: "https://assets.mixkit.co/videos/preview/mixkit-team-working-late-at-night-in-a-startup-39739-large.mp4", caption: "Startup X team collaborating using ContentAI insights.", hint: "teamwork office night" },
      { type: 'heading', level: 2, text: "Tangible Results & Business Impact" },
       { type: 'icon-section', icon: 'TrendingUp', iconText: '+45% Avg. Time on Page', text: 'Enhanced readability and engagement directly led to users spending more time consuming content.'},
       { type: 'icon-section', icon: 'Users', iconText: '+30% Organic Traffic', text: 'Improved SEO and content quality attracted a larger audience from search engines.'},
       { type: 'icon-section', icon: 'Zap', iconText: 'Top 3 Keyword Rankings', text: 'Strategic optimization pushed key articles to the top of search results for competitive terms.'},
      { type: 'quote', text: "ContentAI provided us with the data-driven insights we were missing. It's not just about writing; it's about writing smart. Our content now works harder for us.", author: "CEO, Startup X" },
      { type: 'paragraph', text: "The success of Startup X demonstrates ContentAI's ability to empower businesses to create content that not only informs but also captivates and converts, leading to measurable business growth." }
    ],
  },
  {
    slug: "enhancing-conversion-ecommerce-brand",
    client: "E-commerce Brand Z",
    industry: "Online Retail",
    date: "November 5, 2023",
    challenge: "Product descriptions were not converting visitors effectively, and content lacked persuasive power.",
    solution: "Leveraged ContentAI to refine product copy for clarity, engagement, and persuasive language. Optimized calls to action based on AI suggestions.",
    results: [
      { metric: "+25%", label: "Conversion Rate Uplift" },
      { metric: "-15%", label: "Product Page Bounce Rate" },
      { metric: "+20%", label: "Average Order Value" },
    ],
    imageSrc: "https://picsum.photos/seed/casestudy2/500/350",
    imageHint: "ecommerce online shopping",
    testimonial: "The AI-driven insights helped us speak directly to our customers' needs, dramatically improving our sales.",
    featuredImageFull: { src: "https://picsum.photos/seed/cs2full/1200/600", alt: "E-commerce Brand Z product page", hint: "online store products"},
    summary: "E-commerce Brand Z boosted its online sales and customer engagement by using ContentAI to optimize product descriptions and landing page copy, resulting in a significant conversion rate increase.",
    detailedContentBlocks: [
      { type: 'paragraph', text: "E-commerce Brand Z, a popular online retailer, faced challenges in converting website traffic into sales. Their product descriptions were informative but lacked the persuasive edge needed to drive purchases." },
      { type: 'heading', level: 2, text: "The Bottleneck: From Browsing to Buying" },
      { type: 'paragraph', text: "The primary issue was a disconnect between product information and customer motivation. Analytics showed users would browse products but abandon carts frequently. The existing copy wasn't effectively highlighting benefits or addressing customer pain points." },
      { type: 'image', src: "https://picsum.photos/seed/cs2challenge/800/450", alt: "Shopping cart abandonment graph", hint: "shopping cart icon", caption: "High cart abandonment rates signaled issues with product page persuasiveness." },
      { type: 'heading', level: 2, text: "ContentAI: Optimizing for Persuasion and Clarity" },
      { type: 'paragraph', text: "Brand Z implemented ContentAI with a focus on:" },
      { type: 'list', items: [
          "**Product Description Refinement:** Using engagement prediction and readability analysis to rewrite product descriptions. The focus was on benefit-driven language, clear value propositions, and addressing potential customer objections.",
          "**Call-to-Action (CTA) Optimization:** A/B testing CTAs suggested by ContentAI to find the most effective wording and placement.",
          "**Improving Readability:** Ensuring product specs and features were easy to understand, reducing customer confusion."
      ]},
       { type: 'icon-section', icon: 'ShoppingCart', iconText: 'Enhanced Product Descriptions', text: "ContentAI helped craft compelling narratives around products, moving beyond mere feature listing." },
      { type: 'heading', level: 2, text: "Significant Impact on Sales" },
      { type: 'paragraph', text: "The results were striking. After implementing ContentAI's suggestions:" },
      { type: 'list', items: [
        "Conversion rates on key product categories increased by an average of 25%.",
        "Bounce rates on product pages saw a 15% reduction, indicating improved user engagement.",
        "Average Order Value (AOV) grew by 20% as customers felt more confident in their purchases."
      ]},
      { type: 'quote', text: "ContentAI didn't just improve our words; it improved our bottom line. It's an essential tool for any e-commerce business.", author: "Head of E-commerce, Brand Z" }
    ],
  },
  {
    slug: "streamlining-content-agency-workflows",
    client: "Digital Marketing Agency Y",
    industry: "Marketing Services",
    date: "December 1, 2023",
    challenge: "Inconsistent content quality across multiple writers and time-consuming briefing processes.",
    solution: "Implemented ContentAI's brief generator and analysis tools to standardize quality and accelerate content production.",
    results: [
      { metric: "-50%", label: "Brief Creation Time" },
      { metric: "+35%", label: "First-Draft Acceptance" },
      { metric: "Consistent", label: "Brand Voice & Quality" },
    ],
    imageSrc: "https://picsum.photos/seed/casestudy3/500/350", // Fixed image seed
    imageHint: "team working collaboration",
    testimonial: "ContentAI has streamlined our operations and elevated the quality of content we deliver to clients. It's an invaluable asset.",
    featuredImageFull: { src: "https://picsum.photos/seed/cs3full/1200/600", alt: "Agency team collaborating efficiently", hint: "marketing agency team"},
    summary: "Digital Marketing Agency Y significantly improved content production efficiency and quality consistency by integrating ContentAI's brief generation and analysis tools into their workflows.",
    detailedContentBlocks: [
      { type: 'paragraph', text: "Digital Marketing Agency Y manages content creation for a diverse portfolio of clients. They faced challenges in maintaining consistent quality and voice across different writers and found their briefing process to be a major bottleneck." },
      { type: 'heading', level: 2, text: "The Challenge: Scaling Quality and Efficiency" },
      { type: 'paragraph', text: "Key pain points included: lengthy brief creation times, inconsistent first draft quality leading to multiple revision cycles, and difficulty in onboarding new writers to meet client-specific style guides." },
      { type: 'image', src: "https://picsum.photos/seed/cs3challenge/800/450", alt: "Complex workflow diagram", hint: "workflow chart messy", caption: "Agency Y's previous workflow was complex and prone to inconsistencies." },
      { type: 'heading', level: 2, text: "The Solution: ContentAI as a Central Hub" },
      { type: 'paragraph', text: "Agency Y adopted ContentAI for several key functions:" },
      { type: 'list', items: [
          "**AI Content Brief Generator:** Standardized and accelerated the creation of comprehensive content briefs. This ensured all writers received clear, consistent instructions, including target audience, keywords, tone, and structural guidelines.",
          "**Centralized Quality Control:** All drafts were passed through ContentAI for readability and engagement analysis before client submission, creating a consistent quality benchmark.",
          "**Faster Onboarding:** New writers could quickly get up to speed by using ContentAI's feedback to align with client expectations and agency standards."
      ]},
       { type: 'icon-section', icon: 'Briefcase', iconText: 'Standardized Briefing Process', text: "ContentAI's brief generator cut down preparation time significantly while improving clarity for writers." },
      { type: 'heading', level: 2, text: "Transformative Results for Agency Operations" },
       { type: 'list', items: [
          "Time spent on creating content briefs was reduced by 50%.",
          "The first-draft acceptance rate from clients improved by 35%, drastically cutting down revision cycles.",
          "Client satisfaction scores related to content quality and consistency saw a marked improvement."
      ]},
      { type: 'video', src: "https://assets.mixkit.co/videos/preview/mixkit-marketing-team-collaborating-in-their-office-39731-large.mp4", caption: "Agency Y team discussing a project with improved efficiency.", hint: "marketing team discussion" },
      { type: 'quote', text: "ContentAI has become the backbone of our content operations. It's saved us countless hours and helped us deliver consistently superior work to our clients.", author: "Operations Director, Agency Y" }
    ],
  }
];
