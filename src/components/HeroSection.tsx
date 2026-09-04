import React from 'react';
import { PortfolioTemplateId } from '../types';
import { ArrowRight, Sparkles, TrendingUp, CheckCircle, Shield, Award, Terminal, Code } from 'lucide-react';

interface Props {
  currentTemplate: PortfolioTemplateId;
  onOpenBookingModal: () => void;
  onNavigate: (id: string) => void;
}

export const HeroSection: React.FC<Props> = ({
  currentTemplate,
  onOpenBookingModal,
  onNavigate
}) => {
  const isDark = currentTemplate === 'cyber';
  const isEditorial = currentTemplate === 'editorial';
  const isBento = currentTemplate === 'bento';

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden transition-all duration-300 bg-[#0A0A0B] text-[#E2E8F0]">
      
      {/* Background Decor Lights */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/40 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-amber-500/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Template 1 & Default: Velocity / Corporate */}
        {!isDark && !isEditorial && !isBento && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 bg-[#12131A] text-teal-300 border border-teal-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Next-Gen SEO & AI Technology Agency</span>
              </div>

              <h1 className="font-space font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-white">
                We Turn Search Traffic Into <span className="velocity-gradient-text">Scalable Revenue.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
                SEOWebFly combines data-first SEO strategies, sub-second web engineering, and tailored AI automation to dominate competitive search landscapes across UK, USA, Australia & Canada.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={onOpenBookingModal}
                  className="px-7 py-4 bg-gradient-to-r from-[#006a66] to-[#008f89] hover:from-[#34a29d] hover:to-[#006a66] text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-xl shadow-teal-900/30 flex items-center justify-center gap-2 group border border-teal-400/20"
                >
                  <span>Book Strategic Consultation</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('ai-audit')}
                  className="px-6 py-4 bg-[#12131A] hover:bg-[#181a24] text-teal-300 border border-teal-500/30 hover:border-teal-400 font-bold text-sm sm:text-base rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Run Free Instant AI Audit</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-[#1E202D] flex flex-wrap items-center gap-6 text-xs text-slate-400 font-semibold">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-teal-400" />
                  <span>1,000+ Projects Delivered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>97% Client Retention</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-teal-400" />
                  <span>Top 1% Clutch Vetted</span>
                </div>
              </div>
            </div>

            {/* Right Column Visual Graphic */}
            <div className="lg:col-span-5">
              <div className="relative bg-[#12131A] rounded-2xl p-6 border border-[#1E202D] shadow-2xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#1E202D]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-xs font-mono font-bold text-slate-400 ml-2">Growth Dashboard</span>
                  </div>
                  <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded">LIVE VERIFIED DATA</span>
                </div>

                {/* Performance Graphic Cards */}
                <div className="space-y-3">
                  <div className="bg-[#181a24] p-4 rounded-xl border border-[#222533] flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400 font-medium">1Click Wallpapers (UK)</div>
                      <div className="font-space font-extrabold text-xl text-[#70d7d1]">+608% Traffic</div>
                      <div className="text-[11px] text-slate-400">1,200 ➔ 8,500 monthly visitors</div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-[#006a66] text-white flex items-center justify-center font-bold">
                      <TrendingUp className="w-6 h-6 text-teal-200" />
                    </div>
                  </div>

                  <div className="bg-[#181a24] p-4 rounded-xl border border-[#222533] flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Inofia Sleep (UK)</div>
                      <div className="font-space font-extrabold text-xl text-amber-300">#1 Rank & 315% ROAS</div>
                      <div className="text-[11px] text-slate-400">Competitive Mattress Search</div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-amber-950 text-amber-300 border border-amber-800/60 flex items-center justify-center font-bold">
                      ★ 1
                    </div>
                  </div>

                  <div className="bg-[#181a24] p-4 rounded-xl border border-[#222533] flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-400 font-medium">Whitewood Pine (AU)</div>
                      <div className="font-space font-extrabold text-xl text-[#70d7d1]">+180% Organic Leads</div>
                      <div className="text-[11px] text-slate-400">Top 3 Map Pack Domination</div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-teal-950 text-teal-300 border border-teal-800/60 flex items-center justify-center font-bold">
                      🇦🇺
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-center text-xs text-slate-400 font-medium italic">
                  "SEOWebFly transformed our digital pipeline in under 90 days."
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Template 2: Cyber Dark Theme */}
        {isDark && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 bg-teal-950/90 text-teal-300 border border-teal-500/40 px-3.5 py-1.5 rounded-full text-xs font-mono">
                <Terminal className="w-3.5 h-3.5 text-teal-400" />
                <span>AI_ENGINE // SYSTEM_READY</span>
              </div>

              <h1 className="font-space font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-white">
                Next-Gen <span className="cyber-glow-text">AI & Technical SEO</span> Architecture.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-mono text-sm leading-relaxed max-w-2xl">
                We bridge high-frequency search optimization with custom Gemini LLM agent pipelines and headless web engineering.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={onOpenBookingModal}
                  className="px-7 py-4 bg-teal-500 hover:bg-teal-400 text-slate-950 font-mono font-bold text-sm sm:text-base rounded-xl transition-all shadow-lg shadow-teal-500/20 flex items-center gap-2"
                >
                  <span>INITIALIZE_CONSULTATION()</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('ai-audit')}
                  className="px-6 py-4 bg-[#12131A] hover:bg-[#181a24] text-teal-300 border border-teal-500/40 font-mono text-sm rounded-xl"
                >
                  RUN_AI_AUDIT()
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#0f141d] border border-teal-500/30 rounded-2xl p-5 shadow-2xl font-mono text-xs text-slate-300 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10 text-slate-400">
                  <span className="flex items-center gap-2 text-teal-400">
                    <Code className="w-4 h-4" /> seowebfly_growth_loop.ts
                  </span>
                  <span className="text-teal-400">v2.4_STABLE</span>
                </div>
                <div className="text-teal-300">
                  <span className="text-purple-400">import</span> &#123; GeminiAI, TechnicalSEO &#125; <span className="text-purple-400">from</span> <span className="text-amber-300">'@seowebfly/core'</span>;
                </div>
                <div className="text-slate-400">// Execute multi-market organic campaign</div>
                <div className="text-slate-200">
                  <span className="text-blue-400">const</span> campaign = <span className="text-blue-400">new</span> TechnicalSEO(&#123;<br/>
                  &nbsp;&nbsp;domain: <span className="text-amber-300">'client-brand.com'</span>,<br/>
                  &nbsp;&nbsp;targetMarkets: [<span className="text-amber-300">'UK'</span>, <span className="text-amber-300">'US'</span>, <span className="text-amber-300">'AU'</span>],<br/>
                  &nbsp;&nbsp;coreWebVitals: <span className="text-emerald-400">'Sub-second LCP'</span><br/>
                  &#125;);
                </div>
                <div className="p-3 bg-[#07090e] rounded-xl border border-emerald-500/30 text-emerald-400 text-[11px]">
                  &gt; STATUS: 608% Traffic Increase Verified.<br/>
                  &gt; 142 First-Page Keywords Secured.<br/>
                  &gt; AI Onboarding Flow Active.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Template 3: Editorial Theme */}
        {isEditorial && (
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block border-y border-[#D4AF37] py-1.5 px-6 text-xs font-bold tracking-widest uppercase text-amber-300 bg-[#12131A]/80 rounded">
              SEOWebFly Executive Agency Showcase
            </div>

            <h1 className="font-space font-black text-5xl sm:text-6xl lg:text-7xl tracking-tighter text-white uppercase leading-none">
              Transforming Traffic Into <span className="gold-gradient-text">Pure Market Dominance.</span>
            </h1>

            <p className="text-lg text-slate-300 font-serif leading-relaxed max-w-2xl mx-auto italic">
              "We don't sell vanity impressions. We engineer technical authority, non-branded search ownership, and high-margin conversion funnels."
            </p>

            <div className="flex justify-center gap-4 pt-2">
              <button
                onClick={onOpenBookingModal}
                className="px-8 py-4 bg-[#D4AF37] text-slate-950 hover:bg-amber-400 font-bold text-sm tracking-wide uppercase transition-all rounded-xl shadow-lg"
              >
                Schedule Consultation
              </button>
              <button
                onClick={() => onNavigate('case-studies')}
                className="px-8 py-4 bg-[#12131A] text-white border border-[#D4AF37] hover:bg-[#181a24] font-bold text-sm tracking-wide uppercase rounded-xl"
              >
                Inspect Case Studies
              </button>
            </div>
          </div>
        )}

        {/* Template 4: Bento Studio Theme */}
        {isBento && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            
            {/* Big Feature Hero Card */}
            <div className="md:col-span-2 lg:col-span-2 bg-[#12131A] rounded-3xl p-8 border border-[#1E202D] shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="bg-teal-950 text-teal-300 border border-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
                  Bento Studio View
                </span>
                <h1 className="font-space font-extrabold text-3xl sm:text-4xl text-white">
                  Digital Growth Engineered for High-Scale Brands.
                </h1>
                <p className="text-sm text-slate-300">
                  SEO • Web Engineering • AI Automation • Paid Media
                </p>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  onClick={onOpenBookingModal}
                  className="px-6 py-3 bg-[#006a66] hover:bg-[#34a29d] text-white font-bold text-xs rounded-xl shadow transition-all"
                >
                  Book Consultation
                </button>
                <button
                  onClick={() => onNavigate('ai-audit')}
                  className="px-5 py-3 bg-[#181a24] hover:bg-[#222533] text-teal-300 border border-teal-500/30 font-bold text-xs rounded-xl"
                >
                  Free AI Audit
                </button>
              </div>
            </div>

            {/* Metric Bento Card 1 */}
            <div className="bg-gradient-to-br from-[#006a66] to-[#004d49] text-white rounded-3xl p-6 flex flex-col justify-between shadow-xl border border-teal-500/30">
              <div className="text-xs uppercase tracking-wider font-bold text-teal-200">Organic Growth</div>
              <div>
                <div className="font-space font-extrabold text-4xl text-white">+608%</div>
                <div className="text-xs text-teal-100 mt-1">1Click Wallpapers UK Traffic Expansion</div>
              </div>
            </div>

            {/* Metric Bento Card 2 */}
            <div className="bg-[#12131A] rounded-3xl p-6 border border-[#1E202D] flex flex-col justify-between shadow-xl">
              <div className="text-xs uppercase tracking-wider font-bold text-amber-400">Search Rank</div>
              <div>
                <div className="font-space font-extrabold text-4xl text-white">#1 UK</div>
                <div className="text-xs text-slate-400 mt-1">Inofia Competitive Mattress Term</div>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
