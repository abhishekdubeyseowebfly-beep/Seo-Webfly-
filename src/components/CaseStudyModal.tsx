import React from 'react';
import { CaseStudy } from '../types';
import { X, CheckCircle, TrendingUp, Globe, Award, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

interface Props {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  onOpenBookingModal: (projectName?: string) => void;
}

export const CaseStudyModal: React.FC<Props> = ({ caseStudy, onClose, onOpenBookingModal }) => {
  if (!caseStudy) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
      <div
        className="bg-[#0A0A0B] text-[#E2E8F0] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#1E202D] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Modal Header */}
        <div className="sticky top-0 z-20 bg-[#0A0A0B]/95 backdrop-blur-md px-6 py-4 border-b border-[#1E202D] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-teal-950 text-teal-300 border border-teal-800 rounded text-xs font-bold uppercase">
              {caseStudy.category}
            </span>
            <span className="text-xs text-slate-400 font-semibold">{caseStudy.countryFlag} {caseStudy.country}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#181a24] text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Main Title Banner */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <h2 className="font-space font-extrabold text-3xl sm:text-4xl text-white">
                {caseStudy.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 font-medium">
                {caseStudy.subtitle}
              </p>
            </div>
            
            {/* Highlight Stat Box */}
            <div className="md:col-span-4 p-5 bg-gradient-to-r from-[#006a66] to-[#008f89] text-white rounded-2xl text-center space-y-1 shadow-lg border border-teal-400/20">
              <div className="text-xs font-bold uppercase tracking-wider text-teal-200">
                {caseStudy.highlightLabel}
              </div>
              <div className="font-space font-black text-4xl text-white">
                {caseStudy.highlightStat}
              </div>
              <div className="text-[11px] text-teal-100 italic">
                Verified SEOWebFly Case Study
              </div>
            </div>
          </div>

          {/* Featured Visual */}
          <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 border border-[#1E202D]">
            <img
              src={caseStudy.featuredImage}
              alt={caseStudy.title}
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-black/40 to-transparent flex items-end p-6">
              <div className="text-white space-y-1">
                <div className="text-xs font-bold text-teal-300 uppercase tracking-widest">
                  CLIENT: {caseStudy.client}
                </div>
                <div className="text-sm max-w-2xl font-light text-slate-200">
                  {caseStudy.summary}
                </div>
              </div>
            </div>
          </div>

          {/* Before vs After Comparison Grid */}
          <div className="space-y-3">
            <h3 className="font-space font-bold text-lg text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              <span>Before & After Metric Transformation</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Before Card */}
              <div className="p-5 bg-red-950/20 border border-red-900/40 rounded-2xl space-y-3">
                <div className="text-xs font-bold text-red-400 uppercase tracking-wider">
                  BEFORE SEOWEBFLY:
                </div>
                <div className="space-y-2 text-xs sm:text-sm font-medium text-slate-300">
                  {caseStudy.beforeMetrics.traffic && <div>• Traffic: {caseStudy.beforeMetrics.traffic}</div>}
                  {caseStudy.beforeMetrics.keywordsPage1 && <div>• Page 1 Keywords: {caseStudy.beforeMetrics.keywordsPage1}</div>}
                  {caseStudy.beforeMetrics.rankings && <div>• Search Position: {caseStudy.beforeMetrics.rankings}</div>}
                  {caseStudy.beforeMetrics.conversion && <div>• Conversion Rate: {caseStudy.beforeMetrics.conversion}</div>}
                  {caseStudy.beforeMetrics.roas && <div>• ROAS: {caseStudy.beforeMetrics.roas}</div>}
                  {caseStudy.beforeMetrics.leads && <div>• Lead Flow: {caseStudy.beforeMetrics.leads}</div>}
                </div>
              </div>

              {/* After Card */}
              <div className="p-5 bg-emerald-950/30 border border-emerald-800/50 rounded-2xl space-y-3">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center justify-between">
                  <span>AFTER SEOWEBFLY:</span>
                  <span className="bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded font-mono">VERIFIED</span>
                </div>
                <div className="space-y-2 text-xs sm:text-sm font-bold text-emerald-200">
                  {caseStudy.afterMetrics.traffic && <div>✓ Traffic: {caseStudy.afterMetrics.traffic}</div>}
                  {caseStudy.afterMetrics.keywordsPage1 && <div>✓ Page 1 Keywords: {caseStudy.afterMetrics.keywordsPage1}</div>}
                  {caseStudy.afterMetrics.rankings && <div>✓ Search Position: {caseStudy.afterMetrics.rankings}</div>}
                  {caseStudy.afterMetrics.conversion && <div>✓ Conversion Rate: {caseStudy.afterMetrics.conversion}</div>}
                  {caseStudy.afterMetrics.roas && <div>✓ ROAS: {caseStudy.afterMetrics.roas}</div>}
                  {caseStudy.afterMetrics.leads && <div>✓ Lead Flow: {caseStudy.afterMetrics.leads}</div>}
                </div>
              </div>
            </div>
          </div>

          {/* Technical Execution Strategy */}
          <div className="space-y-3">
            <h3 className="font-space font-bold text-lg text-white">Technical Execution & Optimizations</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
              {caseStudy.technicalDetails.map((detail, idx) => (
                <div key={idx} className="p-3 bg-[#12131A] rounded-xl border border-[#1E202D] flex items-start gap-2 text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Strategic Takeaway */}
          <div className="p-5 bg-[#12131A] rounded-2xl border border-[#1E202D] space-y-3">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              STRATEGIC TAKEAWAY:
            </div>
            <p className="text-sm font-medium italic text-slate-200">
              "{caseStudy.keyTakeaway}"
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
              <span className="font-bold text-slate-300">Tools Used:</span>
              {caseStudy.toolsUsed.map((tool, idx) => (
                <span key={idx} className="px-2.5 py-0.5 bg-[#181a24] border border-[#222533] rounded text-slate-300 font-semibold">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Footer inside Modal */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#1E202D]">
            <div className="text-xs text-slate-400 font-medium text-center sm:text-left">
              Want similar organic traffic growth for your business?
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenBookingModal(caseStudy.title);
              }}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#006a66] to-[#008f89] hover:from-[#34a29d] hover:to-[#006a66] text-white font-bold text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 border border-teal-400/20"
            >
              <span>Replicate Results for My Brand</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
