import React from 'react';
import { PortfolioTemplateId } from '../types';
import { PORTFOLIO_TEMPLATES } from '../data/templates';
import { Sparkles, Layout, Code2, FileText, Grid } from 'lucide-react';

interface Props {
  currentTemplate: PortfolioTemplateId;
  onSelectTemplate: (id: PortfolioTemplateId) => void;
}

export const TemplateSwitcherBar: React.FC<Props> = ({ currentTemplate, onSelectTemplate }) => {
  const activeTemplateObj = PORTFOLIO_TEMPLATES.find(t => t.id === currentTemplate);

  const getIcon = (id: PortfolioTemplateId) => {
    switch (id) {
      case 'velocity': return <Layout className="w-4 h-4" />;
      case 'cyber': return <Code2 className="w-4 h-4" />;
      case 'editorial': return <FileText className="w-4 h-4" />;
      case 'bento': return <Grid className="w-4 h-4" />;
    }
  };

  return (
    <div className="sticky top-20 z-40 bg-slate-900/90 text-white backdrop-blur-md border-b border-teal-500/30 px-4 py-2.5 shadow-xl transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
        
        {/* Template Indicator */}
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
          </span>
          <span className="text-slate-400 font-medium">Portfolio Template View:</span>
          <span className="font-bold text-teal-300 tracking-wide bg-teal-950/80 px-2.5 py-0.5 rounded border border-teal-500/40 uppercase text-[11px]">
            {activeTemplateObj?.name}
          </span>
        </div>

        {/* Template Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {PORTFOLIO_TEMPLATES.map((tmpl) => {
            const isActive = tmpl.id === currentTemplate;
            return (
              <button
                key={tmpl.id}
                onClick={() => onSelectTemplate(tmpl.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-xs transition-all ${
                  isActive
                    ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20 scale-105 ring-1 ring-white/50'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                }`}
                title={tmpl.description}
              >
                {getIcon(tmpl.id)}
                <span>{tmpl.name}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Hint */}
        <div className="hidden lg:flex items-center gap-1.5 text-slate-400 text-xs">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          <span>Select any template to instant re-theme agency layout</span>
        </div>

      </div>
    </div>
  );
};
