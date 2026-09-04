import React, { useState } from 'react';
import { PortfolioTemplateId, CaseStudy } from '../types';
import { CASE_STUDIES } from '../data/caseStudies';
import { CaseStudyModal } from './CaseStudyModal';
import { ArrowUpRight, Filter, TrendingUp, Sparkles, Eye, Check } from 'lucide-react';

interface Props {
  currentTemplate: PortfolioTemplateId;
  onOpenBookingModal: (projectName?: string) => void;
}

export const CaseStudiesSection: React.FC<Props> = ({ currentTemplate, onOpenBookingModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalStudy, setActiveModalStudy] = useState<CaseStudy | null>(null);
  const [showAfterMetricsMap, setShowAfterMetricsMap] = useState<Record<string, boolean>>({});

  const isDark = currentTemplate === 'cyber';
  const categories = ['All', 'SEO', 'Web Dev', 'eCommerce', 'AI Automation'];

  const filteredStudies = selectedCategory === 'All'
    ? CASE_STUDIES
    : CASE_STUDIES.filter(cs => cs.category === selectedCategory);

  const toggleMetricView = (id: string) => {
    setShowAfterMetricsMap(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="case-studies" className="py-20 transition-colors bg-[#08090d] text-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#12131A] text-teal-300 border border-teal-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              <span>Proven Track Record & Client Success</span>
            </div>
            <h2 className="font-space font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white">
              Case Studies & Proven ROI Results
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Explore authentic growth metrics from clients in the UK, Australia, USA, Canada, and globally.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-[#12131A] rounded-xl border border-[#1E202D]">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg font-bold text-xs transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#006a66] to-[#34a29d] text-white shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-[#181a24]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Case Study Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudies.map((cs) => {
            const isShowingAfter = showAfterMetricsMap[cs.id] !== false; // Default to showing After metrics

            return (
              <div
                key={cs.id}
                className="rounded-2xl p-6 border transition-all flex flex-col justify-between space-y-5 hover:shadow-2xl group bg-[#12131A] border-[#1E202D] hover:border-[#34a29d]"
              >
                <div className="space-y-4">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-teal-950 text-teal-300 border border-teal-800 rounded text-[11px] font-bold uppercase tracking-wider">
                      {cs.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                      <span>{cs.countryFlag}</span>
                      <span>{cs.country}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="font-space font-bold text-xl text-white group-hover:text-[#70d7d1] transition-colors">
                      {cs.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {cs.subtitle}
                    </p>
                  </div>

                  {/* Highlight Metric Banner */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-[#006a66] to-[#008f89] text-white flex items-center justify-between shadow-lg border border-teal-400/20">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-teal-200">{cs.highlightLabel}</div>
                      <div className="font-space font-extrabold text-2xl text-white">{cs.highlightStat}</div>
                    </div>
                    <span className="text-xs font-bold bg-white/10 px-2.5 py-1 rounded text-teal-100 border border-white/10">
                      VERIFIED
                    </span>
                  </div>

                  {/* Before / After Toggle Widget */}
                  <div className="p-3 bg-[#181a24] rounded-xl border border-[#222533] space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-slate-400 uppercase">Metrics Toggle:</span>
                      <div className="flex gap-1 bg-[#12131A] p-0.5 rounded border border-[#222533]">
                        <button
                          onClick={() => toggleMetricView(cs.id)}
                          className={`px-2 py-0.5 rounded text-[10px] transition-all ${
                            !isShowingAfter ? 'bg-red-500 text-white font-bold' : 'text-slate-400'
                          }`}
                        >
                          BEFORE
                        </button>
                        <button
                          onClick={() => toggleMetricView(cs.id)}
                          className={`px-2 py-0.5 rounded text-[10px] transition-all ${
                            isShowingAfter ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400'
                          }`}
                        >
                          AFTER SEOWEBFLY
                        </button>
                      </div>
                    </div>

                    <div className="text-xs font-semibold pt-1">
                      {isShowingAfter ? (
                        <div className="text-emerald-400 space-y-1">
                          {cs.afterMetrics.traffic && <div>• Traffic: {cs.afterMetrics.traffic}</div>}
                          {cs.afterMetrics.keywordsPage1 && <div>• Page 1 Keywords: {cs.afterMetrics.keywordsPage1}</div>}
                          {cs.afterMetrics.rankings && <div>• Rank: {cs.afterMetrics.rankings}</div>}
                          {cs.afterMetrics.conversion && <div>• Conversion: {cs.afterMetrics.conversion}</div>}
                        </div>
                      ) : (
                        <div className="text-red-400 space-y-1 line-through opacity-80">
                          {cs.beforeMetrics.traffic && <div>• Traffic: {cs.beforeMetrics.traffic}</div>}
                          {cs.beforeMetrics.keywordsPage1 && <div>• Page 1 Keywords: {cs.beforeMetrics.keywordsPage1}</div>}
                          {cs.beforeMetrics.rankings && <div>• Rank: {cs.beforeMetrics.rankings}</div>}
                          {cs.beforeMetrics.conversion && <div>• Conversion: {cs.beforeMetrics.conversion}</div>}
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                {/* Card Footer Actions */}
                <div className="pt-2 flex items-center justify-between border-t border-[#222533]">
                  <button
                    onClick={() => setActiveModalStudy(cs)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-300 hover:text-white transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Case Study</span>
                  </button>

                  <button
                    onClick={() => onOpenBookingModal(cs.title)}
                    className="p-2 rounded-lg bg-[#181a24] hover:bg-[#006a66] hover:text-white text-teal-300 transition-colors border border-[#222533]"
                    title="Book Consultation for similar project"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Case Study Modal Overlay */}
      <CaseStudyModal
        caseStudy={activeModalStudy}
        onClose={() => setActiveModalStudy(null)}
        onOpenBookingModal={onOpenBookingModal}
      />
    </section>
  );
};
