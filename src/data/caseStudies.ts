import { CaseStudy } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: '1click-wallpapers',
    title: '1Click Wallpapers',
    client: '1Click Wallpapers Ltd',
    country: 'UK',
    countryFlag: '🇬🇧',
    category: 'SEO',
    subtitle: 'Top 3 rankings for standard size wallpaper queries across UK search.',
    summary: 'A complete technical audit and intent-driven landing page architecture transformed 1Click Wallpapers from an undiscovered store into a top UK decor destination.',
    beforeMetrics: {
      traffic: '1,200 / mo',
      keywordsPage1: '15 keywords',
      rankings: 'Page 4 average',
      conversion: '1.1%'
    },
    afterMetrics: {
      traffic: '8,500 / mo (+608%)',
      keywordsPage1: '142 keywords',
      rankings: 'Top 3 positions',
      conversion: '3.4%'
    },
    highlightStat: '+608%',
    highlightLabel: 'Organic Traffic Surge',
    keyTakeaway: 'Technical SEO fixes combined with targeted content expansion captured non-branded search intent rapidly.',
    technicalDetails: [
      'Schema markup optimization for product variants & availability',
      'JavaScript rendering fix for client-side catalog navigation',
      'Non-branded keyword gap expansion targeting high-intent interior design terms',
      'Internal linking siloing for core category hierarchy'
    ],
    toolsUsed: ['Ahrefs', 'Screaming Frog', 'Google Search Console', 'SEMrush', 'Core Web Vitals Engine'],
    featuredImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'inofia',
    title: 'Inofia',
    client: 'Inofia Sleep Tech',
    country: 'UK',
    countryFlag: '🇬🇧',
    category: 'eCommerce',
    subtitle: '#1 rankings for highly competitive mattress & sleep tech search terms.',
    summary: 'Outranking multi-billion pound mattress incumbents through high-authority digital PR, link velocity, and intent-focused product page conversion optimization.',
    beforeMetrics: {
      rankings: 'Page 3 Avg Rank',
      conversion: 'Low conversion rate',
      roas: '1.2x ROAS'
    },
    afterMetrics: {
      rankings: '#1 National Rankings',
      conversion: '315% ROAS increase',
      roas: '5.1x ROAS'
    },
    highlightStat: '315%',
    highlightLabel: 'ROAS Expansion',
    keyTakeaway: 'High-authority digital PR and intent-focused product page optimization beat established competitors.',
    technicalDetails: [
      'High-authority link acquisition from UK lifestyle & home publications',
      'CRO testing on product comparison matrices and Trustpilot proof widgets',
      'Headless checkout speed optimization reducing load time to under 1.2s',
      'Google Shopping feed restructuring with custom custom_label segmentation'
    ],
    toolsUsed: ['Shopify Plus', 'Google Ads Manager', 'Hotjar', 'Optimizely', 'Klaviyo'],
    featuredImage: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'whitewood',
    title: 'Whitewood',
    client: 'Whitewood Furniture Co',
    country: 'Australia',
    countryFlag: '🇦🇺',
    category: 'SEO',
    subtitle: 'Page 1 domination for solid pine furniture and regional craftsman keywords.',
    summary: 'Dominated the Australian regional furniture market by combining hyper-local Google Business Profile optimization with a clean React-powered site architecture.',
    beforeMetrics: {
      rankings: 'Unseen locally',
      leads: '12 leads / mo',
      bounceRate: '68%'
    },
    afterMetrics: {
      rankings: 'Top 3 Local Map Pack',
      leads: '+180% Organic Leads',
      bounceRate: '34%'
    },
    highlightStat: '+180%',
    highlightLabel: 'Organic Lead Growth',
    keyTakeaway: 'Local SEO mastery combined with a comprehensive site architecture overhaul drove sustained regional dominance.',
    technicalDetails: [
      'Multi-location NAP (Name, Address, Phone) consistency synchronization across 45+ citations',
      'Custom Geo-targeted landing pages for Sydney, Melbourne & Brisbane markets',
      'Review acceleration campaign generating 250+ verified 5-star Google reviews',
      'Dynamic schema for localized inventory & delivery radius'
    ],
    toolsUsed: ['BrightLocal', 'Google My Business API', 'React', 'TailwindCSS', 'Yoast'],
    featuredImage: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'dr-greenthumb',
    title: 'Dr Greenthumb',
    client: 'Dr Greenthumb Botanicals',
    country: 'Canada',
    countryFlag: '🇨🇦',
    category: 'SEO',
    subtitle: 'Top 5 position consistently for seed-related and organic horticulture queries.',
    summary: 'Overcame strict ad platform restrictions in the botanical seed niche by engineering an unbeatable organic content hub and topic cluster strategy.',
    beforeMetrics: {
      traffic: 'Traffic plateau',
      bounceRate: 'High bounce rate (74%)',
      keywordsPage1: '8 terms'
    },
    afterMetrics: {
      traffic: '4x Organic Traffic Growth',
      bounceRate: 'Bounce rate -40% (34%)',
      keywordsPage1: '89 terms'
    },
    highlightStat: '4x',
    highlightLabel: 'Traffic Scaling',
    keyTakeaway: 'Content gap analysis and strategic backlink acquisition in a restricted niche yielded immense visibility.',
    technicalDetails: [
      'Comprehensive topic cluster map with 120+ deep-dive gardening & seed cultivation guides',
      'Core Web Vitals optimization achieving 98/100 Mobile PageSpeed score',
      'High-authority backlink outreach to agricultural universities and eco blogs',
      'Interactive seed finder wizard driving higher session duration'
    ],
    toolsUsed: ['Google PageSpeed Insights', 'SurferSEO', 'WooCommerce', 'Ahrefs', 'Google Analytics 4'],
    featuredImage: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'apex-fintech',
    title: 'Apex FinTech AI Copilot',
    client: 'Apex Financial Technologies',
    country: 'USA',
    countryFlag: '🇺🇸',
    category: 'AI Automation',
    subtitle: 'Bespoke AI Customer Onboarding Agent & Real-time Compliance Automation.',
    summary: 'Engineered a custom RAG (Retrieval-Augmented Generation) AI Assistant to automate document verification and loan inquiries for high-net-worth clients.',
    beforeMetrics: {
      conversion: '4.2-day onboarding queue',
      bounceRate: 'Support ticket backlog: 850+'
    },
    afterMetrics: {
      conversion: 'Instant < 3 min onboarding',
      bounceRate: '-68% support ticket reduction'
    },
    highlightStat: '68%',
    highlightLabel: 'Support Overhead Saved',
    keyTakeaway: 'End-to-end automation with tailored LLM pipelines streamlined compliance and user experience simultaneously.',
    technicalDetails: [
      'Gemini 1.5 Flash integration with custom vector database for compliance verification',
      'Secure OAuth 2.0 and encrypted token handler for sensitive banking documents',
      'Real-time streaming chat widget built with WebSockets and React',
      'Automated fallback protocol routing edge-case requests directly to human managers'
    ],
    toolsUsed: ['Gemini API', 'Express.js', 'Pinecone Vector DB', 'TypeScript', 'Node.js'],
    featuredImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'omnistore',
    title: 'OmniStore Global',
    client: 'OmniStore Retail Network',
    country: 'Global',
    countryFlag: '🌐',
    category: 'Web Dev',
    subtitle: 'Headless Shopify Progressive Web Application with Sub-second Load Speed.',
    summary: 'Re-architected a legacy monolith eCommerce platform into a blazing-fast Headless React application with instant global edge caching.',
    beforeMetrics: {
      traffic: '4.8s page load time',
      conversion: '1.8% conversion rate'
    },
    afterMetrics: {
      traffic: '0.9s page load time',
      conversion: '4.2% conversion rate (+133%)'
    },
    highlightStat: '+133%',
    highlightLabel: 'Conversion Rate Lift',
    keyTakeaway: 'Edge-cached storefront combined with instant search indexing skyrocketed mobile conversion efficiency.',
    technicalDetails: [
      'Migrated to React SPA + Vite with Tailwind CSS styling engine',
      'Instant Algolia search integration with predictive auto-complete',
      'Progressive Web App (PWA) offline cart sync capabilities',
      'Global CDN edge rendering on Cloud Run infrastructure'
    ],
    toolsUsed: ['React', 'Vite', 'TailwindCSS', 'Shopify Storefront API', 'Cloud Run'],
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80'
  }
];
