import React, { useState } from 'react';
import { PortfolioTemplateId } from '../types';
import { SERVICES } from '../data/services';
import { CheckCircle2, ArrowRight, Zap, Sparkles, Layers } from 'lucide-react';

interface Props {
  currentTemplate: PortfolioTemplateId;
  onOpenBookingModal: (servicePref?: string) => void;
}

export const ServicesSection: React.FC<Props> = ({ currentTemplate, onOpenBookingModal }) => {
  const [activeServiceId, setActiveServiceId] = useState(SERVICES[0].id);

  const isDark = currentTemplate === 'cyber';
  const isEditorial = currentTemplate === 'editorial';

  const activeService = SERVICES.find(s => s.id === activeServiceId) || SERVICES[0];

  return (
    <section id="services" className="py-20 transition-colors bg-[#08090d] text-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#12131A] text-teal-300 border border-teal-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Core Capabilities & Solutions</span>
          </div>
          <h2 className="font-space font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white">
            Comprehensive Digital Growth Architecture
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            From technical SEO and sub-second React engineering to bespoke AI automation pipelines — built for sustainable market dominance.
          </p>
        </div>

        {/* Interactive Service Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
          {SERVICES.map((srv) => {
            const isActive = srv.id === activeServiceId;
            return (
              <button
                key={srv.id}
                onClick={() => setActiveServiceId(srv.id)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#006a66] to-[#34a29d] text-white shadow-lg shadow-teal-900/40 ring-1 ring-teal-400'
                    : 'bg-[#12131A] text-slate-300 hover:bg-[#181a24] hover:text-white border border-[#1E202D]'
                }`}
              >
                <span className="material-symbols-outlined text-base">{srv.icon}</span>
                <span>{srv.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Service Deep Dive Card */}
        <div className="rounded-3xl p-6 sm:p-10 border transition-all shadow-2xl bg-[#12131A] border-[#1E202D]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold tracking-widest text-[#70d7d1] uppercase">
                  {activeService.category}
                </span>
                <h3 className="font-space font-extrabold text-2xl sm:text-3xl text-white">
                  {activeService.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {activeService.description}
                </p>
              </div>

              {/* Impact Metric Banner */}
              <div className="p-4 rounded-xl bg-teal-950/60 border border-teal-800/60 flex items-center gap-3">
                <Zap className="w-5 h-5 text-amber-300 shrink-0" />
                <div className="text-xs sm:text-sm font-bold text-teal-200">
                  {activeService.impactMetric}
                </div>
              </div>

              {/* Deliverables Checklist */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Key Deliverables & Standards:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-medium">
                  {activeService.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {activeService.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#181a24] border border-[#222533] text-slate-300 rounded-full text-xs font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => onOpenBookingModal(activeService.title)}
                  className="px-6 py-3.5 bg-gradient-to-r from-[#006a66] to-[#008f89] hover:from-[#34a29d] hover:to-[#006a66] text-white font-bold text-sm rounded-xl transition-all shadow-lg flex items-center gap-2 border border-teal-400/20"
                >
                  <span>Inquire for {activeService.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-[#222533] shadow-xl group">
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="w-full h-72 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-black/40 to-transparent flex items-end p-6">
                  <div className="text-white space-y-1">
                    <span className="text-xs font-bold text-teal-300 uppercase tracking-widest">VERIFIED CAPABILITY</span>
                    <div className="font-space font-bold text-lg">{activeService.title}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
