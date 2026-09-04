import { PortfolioTemplate } from '../types';

export const PORTFOLIO_TEMPLATES: PortfolioTemplate[] = [
  {
    id: 'velocity',
    name: 'Digital Velocity',
    tagline: 'Sophisticated Dark Corporate & Growth Theme',
    description: 'Sleek obsidian canvas with metallic teal & gold gradients, structured cards, and executive authority.',
    badge: 'DEFAULT AGENCY',
    themeClass: 'bg-[#0A0A0B] text-[#E2E8F0]',
    headerStyle: 'bg-[#0A0A0B]/90 backdrop-blur-md border-b border-[#1E202D]',
    cardStyle: 'bg-[#12131A] border border-[#1E202D] hover:border-[#34a29d] shadow-xl hover:shadow-teal-500/10'
  },
  {
    id: 'cyber',
    name: 'Executive Cyber Dark',
    tagline: 'High-Tech AI & Automation Theme',
    description: 'Deep midnight slate with glowing neon cyan accents, live code blocks, and futuristic AI studio vibe.',
    badge: 'AI & TECH FORWARD',
    themeClass: 'bg-[#07080a] text-[#F8FAFC]',
    headerStyle: 'bg-[#07080a]/90 backdrop-blur-md border-b border-teal-500/20',
    cardStyle: 'bg-[#0f141d] border border-teal-500/30 hover:border-[#70d7d1] shadow-2xl shadow-teal-500/10'
  },
  {
    id: 'editorial',
    name: 'Minimalist Editorial',
    tagline: 'Monochrome High-Contrast Executive Layout',
    description: 'Refined obsidian typography with generous negative space, metallic gold rules, and strategic authority.',
    badge: 'HIGH IMPACT EDITORIAL',
    themeClass: 'bg-[#0d0e12] text-[#F1F5F9]',
    headerStyle: 'bg-[#0d0e12]/95 backdrop-blur-sm border-b border-white/10',
    cardStyle: 'bg-[#151720] border-l-4 border-l-[#D4AF37] border-y border-r border-[#222533]'
  },
  {
    id: 'bento',
    name: 'Bento Studio Grid',
    tagline: 'Interactive Asymmetric Visual Cards',
    description: 'Asymmetric bento grid obsidian cards with interactive hover states, gold badges, and live metrics.',
    badge: 'INTERACTIVE STUDIO',
    themeClass: 'bg-[#08090d] text-[#E2E8F0]',
    headerStyle: 'bg-[#08090d]/90 backdrop-blur-md border-b border-[#1f2232]',
    cardStyle: 'bg-[#13141c] rounded-2xl border border-[#222533] hover:border-[#34a29d] shadow-lg hover:-translate-y-1 transition-all'
  }
];
