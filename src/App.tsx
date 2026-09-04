import React, { useState, useEffect } from 'react';
import { PortfolioTemplateId, CaseStudy } from './types';
import { PORTFOLIO_TEMPLATES } from './data/templates';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { GrowthLoopSection } from './components/GrowthLoopSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { CaseStudyModal } from './components/CaseStudyModal';
import { RoiCalculatorSection } from './components/RoiCalculatorSection';
import { AiAuditSection } from './components/AiAuditSection';
import { ConsultationFormModal } from './components/ConsultationFormModal';
import { TemplateSwitcherBar } from './components/TemplateSwitcherBar';
import { GoogleDriveHubModal } from './components/GoogleDriveHubModal';
import { Sparkles, Mail, Phone, MapPin, Globe, ArrowUpRight, ShieldCheck, CheckCircle, HeartHandshake, HardDrive } from 'lucide-react';
import { testConnection } from './lib/firebase';

export default function App() {
  const [currentTemplate, setCurrentTemplate] = useState<PortfolioTemplateId>('cyber');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState<boolean>(false);
  const [isDriveHubOpen, setIsDriveHubOpen] = useState<boolean>(false);
  const [prefilledService, setPrefilledService] = useState<string | undefined>(undefined);

  useEffect(() => {
    testConnection();
  }, []);

  const activeTemplateConfig = PORTFOLIO_TEMPLATES.find(t => t.id === currentTemplate) || PORTFOLIO_TEMPLATES[0];

  const handleOpenConsultation = (serviceName?: string) => {
    setPrefilledService(serviceName);
    setIsConsultationOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#E2E8F0] font-sans selection:bg-teal-500 selection:text-black">
      
      {/* Fixed Top Template Selector Bar */}
      <TemplateSwitcherBar
        currentTemplate={currentTemplate}
        onSelectTemplate={setCurrentTemplate}
      />

      {/* Main Container with Top Padding for Bar */}
      <div className="pt-12">
        
        {/* Navigation Header */}
        <Header
          currentTemplate={currentTemplate}
          onOpenBookingModal={() => handleOpenConsultation()}
          onOpenDriveHub={() => setIsDriveHubOpen(true)}
        />

        {/* Hero Section */}
        <HeroSection
          currentTemplate={currentTemplate}
          onOpenBookingModal={() => handleOpenConsultation()}
        />

        {/* Core Services Section */}
        <ServicesSection
          currentTemplate={currentTemplate}
          onOpenBookingModal={handleOpenConsultation}
        />

        {/* 6-Stage Growth Loop Framework */}
        <GrowthLoopSection
          currentTemplate={currentTemplate}
        />

        {/* Portfolio Case Studies Grid */}
        <CaseStudiesSection
          currentTemplate={currentTemplate}
          onSelectCaseStudy={setSelectedCaseStudy}
        />

        {/* Interactive ROI & Revenue Expansion Calculator */}
        <RoiCalculatorSection
          currentTemplate={currentTemplate}
          onOpenBookingModal={() => handleOpenConsultation('Organic Growth & Search Engine Optimization (SEO)')}
        />

        {/* Gemini AI Website & Keyword Scanner */}
        <AiAuditSection
          currentTemplate={currentTemplate}
          onOpenBookingModal={(auditUrl) => handleOpenConsultation(`AI Audit Followup for ${auditUrl}`)}
        />

        {/* Footer */}
        <footer className="bg-[#08090d] border-t border-[#1E202D] pt-16 pb-12 text-slate-400 text-xs sm:text-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              
              {/* Brand & Mission */}
              <div className="space-y-4 md:col-span-1">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#006a66] to-[#34a29d] flex items-center justify-center font-space font-extrabold text-white text-lg shadow-lg border border-teal-400/30">
                    W
                  </div>
                  <div>
                    <span className="font-space font-extrabold text-lg text-white tracking-tight">SEOWebFly</span>
                    <span className="block text-[10px] text-teal-400 uppercase font-bold tracking-widest">Growth Engine</span>
                  </div>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Elite eCommerce SEO & Web Performance Agency. Transforming digital storefronts into multi-million pound category leaders through technical rigor and data-driven organic expansion.
                </p>
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% White-Hat Guarantee</span>
                </div>
              </div>

              {/* Verified Results Quick Nav */}
              <div className="space-y-3">
                <div className="font-space font-bold text-white uppercase text-xs tracking-wider">
                  Verified Client Results
                </div>
                <ul className="space-y-2 text-xs">
                  <li className="hover:text-teal-300 transition-colors">
                    <a href="#case-studies" className="flex items-center justify-between">
                      <span>1Click Wallpapers (+1,200% Organic)</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-500" />
                    </a>
                  </li>
                  <li className="hover:text-teal-300 transition-colors">
                    <a href="#case-studies" className="flex items-center justify-between">
                      <span>Sleepcraft Mattresses (£2.4M ARR)</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-500" />
                    </a>
                  </li>
                  <li className="hover:text-teal-300 transition-colors">
                    <a href="#case-studies" className="flex items-center justify-between">
                      <span>Aura Botanicals (+380% CRO)</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-500" />
                    </a>
                  </li>
                  <li className="hover:text-teal-300 transition-colors">
                    <a href="#case-studies" className="flex items-center justify-between">
                      <span>Verde Living (+420% Organic)</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-500" />
                    </a>
                  </li>
                </ul>
              </div>

              {/* Growth Frameworks */}
              <div className="space-y-3">
                <div className="font-space font-bold text-white uppercase text-xs tracking-wider">
                  Core Capabilities
                </div>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li>Enterprise SEO & Technical Audits</li>
                  <li>Shopify & WooCommerce Optimization</li>
                  <li>Speed Optimization (Core Web Vitals 95+)</li>
                  <li>Programmatic SEO & Content Engines</li>
                  <li>AI Automation & Conversational Agents</li>
                </ul>
              </div>

              {/* Direct Agency Contacts */}
              <div className="space-y-3">
                <div className="font-space font-bold text-white uppercase text-xs tracking-wider">
                  Direct Agency Contact
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                    <a href="mailto:santosh@seowebfly.com" className="hover:text-teal-300 font-medium transition-colors">
                      santosh@seowebfly.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                    <a href="tel:+918448332278" className="hover:text-teal-300 font-medium transition-colors">
                      +91-844-833-2278
                    </a>
                  </div>
                  <div className="flex items-start gap-2 text-slate-400 pt-1">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>SEOWebFly Headquarters • Global Strategic Operations</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => handleOpenConsultation()}
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-[#006a66] to-[#008f89] hover:from-[#34a29d] hover:to-[#006a66] text-white font-bold text-xs rounded-xl transition-all shadow border border-teal-400/20"
                  >
                    Schedule Growth Session
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom Disclaimer & Copyright */}
            <div className="pt-8 border-t border-[#1E202D] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <div>
                © {new Date().getFullYear()} SEOWebFly Digital Performance Group. All rights reserved.
              </div>
              <div className="flex items-center gap-4 text-[11px]">
                <span className="text-slate-400">Template Active: <strong className="text-teal-300">{activeTemplateConfig.name}</strong></span>
                <span>•</span>
                <a href="#ai-audit" className="hover:text-slate-300 transition-colors">AI Audit Scanner</a>
                <span>•</span>
                <a href="#roi-calculator" className="hover:text-slate-300 transition-colors">ROI Calculator</a>
              </div>
            </div>

          </div>
        </footer>

      </div>

      {/* Case Study Detail Modal */}
      {selectedCaseStudy && (
        <CaseStudyModal
          caseStudy={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
          onOpenBookingModal={(brand) => {
            setSelectedCaseStudy(null);
            handleOpenConsultation(`Strategy Proposal modeled after ${brand}`);
          }}
        />
      )}

      {/* Interactive Consultation & Proposal Booking Modal */}
      <ConsultationFormModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        prefilledService={prefilledService}
      />

      {/* Google Drive SEO Workspace Hub Modal */}
      <GoogleDriveHubModal
        isOpen={isDriveHubOpen}
        onClose={() => setIsDriveHubOpen(false)}
      />

      {/* Floating Google Drive Hub Button */}
      <button
        onClick={() => setIsDriveHubOpen(true)}
        id="floating-drive-hub-btn"
        aria-label="Open Google Drive SEO Hub"
        title="Open Google Drive Workspace Hub"
        className="fixed bottom-6 right-6 z-40 p-3.5 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white rounded-full shadow-2xl shadow-teal-900/60 border border-teal-300/40 flex items-center gap-2 group transition-all duration-300 hover:scale-105 cursor-pointer"
      >
        <HardDrive className="w-5 h-5 text-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold pl-0 group-hover:pl-1">
          Drive Hub
        </span>
      </button>

    </div>
  );
}
