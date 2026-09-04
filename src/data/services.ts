import { ServiceItem } from '../types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'seo',
    title: 'Search Engine Optimization',
    category: 'SEO & Search Excellence',
    icon: 'search_insights',
    description: 'Dominate search results with data-driven strategies engineered for sustainable, high-intent organic traffic and revenue growth.',
    tags: ['Technical SEO', 'On-Page', 'Local SEO', 'Off-Page & PR'],
    features: [
      'Comprehensive Core Web Vitals & Technical Audits',
      'Entity-based Keyword & Intent Gap Analysis',
      'High-Authority Digital PR & Contextual Backlinks',
      'Google Map Pack & Multi-Location Citation Sync'
    ],
    impactMetric: 'Average +240% Organic Keyword Expansion in 90 Days',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'web-dev',
    title: 'Website Design & Dev',
    category: 'Web Engineering',
    icon: 'devices',
    description: 'Bespoke, high-performance web architectures engineered for speed, conversion, and seamless cross-platform user experience.',
    tags: ['UI/UX Design', 'React / Next.js', 'Responsive', 'Sub-second Speed'],
    features: [
      'Modern Single Page Application & Headless Architecture',
      'Conversion Rate Optimized (CRO) UI Components',
      'Custom Design System & Tailwind CSS Styling',
      'WCAG AA Accessibility & Mobile First Responsiveness'
    ],
    impactMetric: '< 1.2s Page Load Time Guaranteed',
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ecommerce',
    title: 'eCommerce Solutions',
    category: 'Digital Storefronts',
    icon: 'storefront',
    description: 'Scalable online storefronts optimized for maximum checkout conversion, multi-currency support, and operational workflow efficiency.',
    tags: ['Shopify Plus', 'WooCommerce', 'Headless Commerce', 'Magento'],
    features: [
      'Custom Storefront Design & Checkout Flow Optimization',
      'Inventory Sync & ERP / CRM Third-Party Integrations',
      'Fast Search, Filtering & AI Product Recommendations',
      'International Currency & Localization Protocols'
    ],
    impactMetric: 'Average +180% Lift in Checkout Conversion Rate',
    image: 'https://images.unsplash.com/photo-1556742049-0a6708000776?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'digital-marketing',
    title: 'Google Ads & PPC Marketing',
    category: 'Paid Acquisition',
    icon: 'campaign',
    description: 'Precision-targeted paid acquisition campaigns engineered to lower customer acquisition costs (CAC) and scale immediate ROI.',
    tags: ['Google Ads', 'PPC Management', 'Social Media Ads', 'CRO'],
    features: [
      'Search, Shopping, Display & Performance Max Campaigns',
      'Automated Bid Strategy & Negative Keyword Sculpting',
      'High-Converting Landing Page A/B Testing',
      'Server-Side Conversions API & GA4 Attribution'
    ],
    impactMetric: '3.8x Average Return on Ad Spend (ROAS)',
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ai-automation',
    title: 'AI Agent & Automation',
    category: 'Next-Gen Technology',
    icon: 'smart_toy',
    description: 'Future-proof your operations with bespoke AI agents, intelligent workflow automation, and custom Gemini LLM integrations.',
    tags: ['AI Agents', 'RPA Automation', 'Custom LLM Pipelines', 'Predictive Analysis'],
    features: [
      'Custom Conversational AI & Lead Qualification Bots',
      'Internal Knowledge Base RAG Search Engines',
      'Automated Document Processing & Sentiment Tracking',
      'API Integration with CRM, Slack, WhatsApp & Email'
    ],
    impactMetric: 'Save 40+ Hours of Operational Labor Per Week',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
  }
];
