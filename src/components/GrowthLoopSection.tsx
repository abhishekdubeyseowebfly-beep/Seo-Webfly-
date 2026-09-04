import React, { useState } from 'react';
import { PortfolioTemplateId } from '../types';
import { GROWTH_LOOP_STEPS } from '../data/growthLoop';
import { ArrowRight, CheckCircle, RefreshCw, Cpu, Award } from 'lucide-react';

interface Props {
  currentTemplate: PortfolioTemplateId;
}

export const GrowthLoopSection: React.FC<Props> = ({ currentTemplate }) => {
  const [activeStepNum, setActiveStepNum] = useState(1);

  const isDark = currentTemplate === 'cyber';
  const activeStep = GROWTH_LOOP_STEPS.find(s => s.stepNumber === activeStepNum) || GROWTH_LOOP_STEPS[0];

  return (
    <section id="approach" className="py-20 transition-colors bg-[#0A0A0B] text-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#12131A] text-teal-300 border border-teal-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>The SEOWebFly Growth Engine</span>
          </div>
          <h2 className="font-space font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white">
            Our Proprietary 6-Stage Growth Loop
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            A repeatable, data-backed methodology that turns volatile search algorithms into predictable revenue assets.
          </p>
        </div>

        {/* Stepper Navigation Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {GROWTH_LOOP_STEPS.map((step) => {
            const isActive = step.stepNumber === activeStepNum;
            return (
              <button
                key={step.stepNumber}
                onClick={() => setActiveStepNum(step.stepNumber)}
                className={`p-4 rounded-2xl border text-left transition-all relative ${
                  isActive
                    ? 'bg-gradient-to-r from-[#006a66] to-[#34a29d] text-white border-teal-400 shadow-xl scale-105 z-10'
                    : 'bg-[#12131A] text-slate-300 border-[#1E202D] hover:border-teal-500/50 hover:bg-[#181a24]'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono font-bold mb-2">
                  <span className={isActive ? 'text-teal-100' : 'text-slate-400'}>
                    0{step.stepNumber}
                  </span>
                  <span className="material-symbols-outlined text-lg">{step.icon}</span>
                </div>
                <div className="font-space font-bold text-sm sm:text-base">{step.title}</div>
                <div className={`text-[11px] truncate mt-1 ${isActive ? 'text-teal-100' : 'text-slate-400'}`}>
                  {step.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detail Panel */}
        <div className="rounded-3xl p-6 sm:p-8 border shadow-2xl bg-[#12131A] border-[#1E202D]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-5">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-[#006a66] text-white font-space font-bold text-lg flex items-center justify-center border border-teal-400/30">
                  0{activeStep.stepNumber}
                </span>
                <div>
                  <h3 className="font-space font-extrabold text-2xl sm:text-3xl text-white">
                    Stage {activeStep.stepNumber}: {activeStep.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#70d7d1]">
                    {activeStep.subtitle}
                  </div>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {activeStep.description}
              </p>

              {/* Key Deliverables */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Deliverables Produced in this Stage:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {activeStep.deliverables.map((del, i) => (
                    <div key={i} className="p-3 bg-[#181a24] rounded-xl border border-[#222533] text-xs font-semibold text-slate-200 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stage Tools Used */}
            <div className="lg:col-span-4 p-5 bg-[#181a24] rounded-2xl border border-[#222533] space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-teal-400" />
                <span>Tools & Infrastructure Used:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeStep.keyTools.map((tool, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-[#12131A] text-slate-200 border border-[#222533] rounded-lg text-xs font-bold shadow-sm">
                    {tool}
                  </span>
                ))}
              </div>
              <div className="text-[11px] text-slate-400 italic pt-2 border-t border-[#222533]">
                100% transparent access granted via live project management client portals.
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
