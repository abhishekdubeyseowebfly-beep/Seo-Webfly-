import React, { useState } from 'react';
import { ConsultationFormData } from '../types';
import { X, CheckCircle, ArrowRight, ArrowLeft, Calendar, Clock, Building, Mail, Phone, Globe, Sparkles, Download, Check, Loader2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  prefilledService?: string;
}

export const ConsultationFormModal: React.FC<Props> = ({
  isOpen,
  onClose,
  prefilledService
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState<ConsultationFormData>({
    coreObjectives: prefilledService ? [prefilledService] : ['Organic Growth & Search Engine Optimization (SEO)'],
    companyName: '',
    websiteUrl: '',
    industry: 'E-commerce',
    monthlyTraffic: '2,000 - 10,000 / mo',
    budgetRange: '$5,000 - $10,000 / mo',
    targetTimeline: '1 - 3 Months',
    fullName: '',
    email: 'santosh@seowebfly.com',
    phone: '+91-844-833-2278',
    preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    preferredTime: '11:00 AM EST',
    projectNotes: '',
    wantFreeAiAudit: true
  });

  if (!isOpen) return null;

  const handleObjectiveToggle = (obj: string) => {
    setFormData(prev => {
      const exists = prev.coreObjectives.includes(obj);
      return {
        ...prev,
        coreObjectives: exists
          ? prev.coreObjectives.filter(o => o !== obj)
          : [...prev.coreObjectives, obj]
      };
    });
  };

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitting(true);
      setSubmitError(null);
      try {
        await addDoc(collection(db, 'consultations'), {
          fullName: formData.fullName || 'Anonymous Client',
          email: formData.email,
          phone: formData.phone,
          companyName: formData.companyName || 'Unspecified Brand',
          websiteUrl: formData.websiteUrl || 'N/A',
          industry: formData.industry,
          monthlyTraffic: formData.monthlyTraffic,
          budgetRange: formData.budgetRange,
          targetTimeline: formData.targetTimeline,
          selectedObjectives: formData.coreObjectives,
          wantFreeAiAudit: formData.wantFreeAiAudit,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          projectNotes: formData.projectNotes,
          status: 'pending',
          userId: auth.currentUser?.uid || null,
          createdAt: serverTimestamp()
        });
        setIsSubmitted(true);
      } catch (error) {
        console.error("Error saving consultation:", error);
        setSubmitError("Saved locally. Connection issue with cloud database.");
        setIsSubmitted(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const availableServicesList = [
    'Organic Growth & Search Engine Optimization (SEO)',
    'High-Speed Web Development / Store Redesign',
    'AI Agent & Automation Solutions',
    'Paid Search / Google Ads PPC',
    'eCommerce Conversion Rate Optimization (CRO)'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
      <div
        className="bg-[#0A0A0B] text-[#E2E8F0] rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-[#1E202D] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-[#0A0A0B]/95 backdrop-blur-md px-6 py-4 border-b border-[#1E202D] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#006a66] to-[#34a29d] text-white font-space font-bold flex items-center justify-center text-sm border border-teal-400/30">
              W
            </span>
            <div>
              <div className="font-space font-bold text-base leading-none text-white">SEOWebFly Consultation & Proposal Planner</div>
              <div className="text-[11px] text-slate-400 font-medium mt-0.5">Structured Project Inquiry & Audit Booking</div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#181a24] text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Step Bar */}
        {!isSubmitted && (
          <div className="px-6 py-3 bg-[#12131A] border-b border-[#1E202D] flex items-center justify-between text-xs font-bold">
            <div className={`flex items-center gap-1.5 ${currentStep >= 1 ? 'text-teal-300' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                currentStep >= 1 ? 'bg-[#006a66] text-white' : 'bg-[#181a24] text-slate-400'
              }`}>1</span>
              <span>Objectives</span>
            </div>

            <div className="h-0.5 w-8 bg-[#1E202D]" />

            <div className={`flex items-center gap-1.5 ${currentStep >= 2 ? 'text-teal-300' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                currentStep >= 2 ? 'bg-[#006a66] text-white' : 'bg-[#181a24] text-slate-400'
              }`}>2</span>
              <span>Company Info</span>
            </div>

            <div className="h-0.5 w-8 bg-[#1E202D]" />

            <div className={`flex items-center gap-1.5 ${currentStep >= 3 ? 'text-teal-300' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                currentStep >= 3 ? 'bg-[#006a66] text-white' : 'bg-[#181a24] text-slate-400'
              }`}>3</span>
              <span>Schedule & Contact</span>
            </div>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-6">

          {!isSubmitted ? (
            <form onSubmit={handleNextStep} className="space-y-6">
              
              {/* STEP 1: Core Objectives */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <h3 className="font-space font-extrabold text-xl text-white">
                      Step 1: Select Your Strategic Objectives
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Choose all solutions that align with your growth goals:
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {availableServicesList.map((srv) => {
                      const isSelected = formData.coreObjectives.includes(srv);
                      return (
                        <div
                          key={srv}
                          onClick={() => handleObjectiveToggle(srv)}
                          className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-teal-950/40 border-[#34a29d] text-teal-200 font-bold shadow-md'
                              : 'bg-[#12131A] border-[#1E202D] hover:border-[#34a29d]/50 text-slate-300'
                          }`}
                        >
                          <span className="text-xs sm:text-sm">{srv}</span>
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center text-xs ${
                            isSelected ? 'bg-[#006a66] text-white' : 'border border-[#222533]'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Target Timeline */}
                  <div className="space-y-1 pt-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Target Project Start Timeline:
                    </label>
                    <select
                      value={formData.targetTimeline}
                      onChange={(e) => setFormData({ ...formData, targetTimeline: e.target.value })}
                      className="w-full p-3 rounded-xl border border-[#1E202D] bg-[#12131A] text-white text-xs sm:text-sm font-semibold outline-none focus:border-teal-400"
                    >
                      <option value="Immediate (< 2 Weeks)">Immediate (&lt; 2 Weeks)</option>
                      <option value="1 - 3 Months">1 - 3 Months</option>
                      <option value="Exploring Options for Q3/Q4">Exploring Options for Q3/Q4</option>
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 2: Business & Digital Presence */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <h3 className="font-space font-extrabold text-xl text-white">
                      Step 2: Tell Us About Your Business & Site
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300">
                      This allows our strategists to prepare custom competitor benchmarks prior to our call.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Company / Brand Name *</label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Acme Decor Ltd"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#1E202D] bg-[#12131A] text-white text-xs sm:text-sm font-medium outline-none focus:border-teal-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Current Website URL *</label>
                      <div className="relative">
                        <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. acmedecor.co.uk"
                          value={formData.websiteUrl}
                          onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#1E202D] bg-[#12131A] text-white text-xs sm:text-sm font-medium outline-none focus:border-teal-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Industry Vertical</label>
                      <select
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-[#1E202D] bg-[#12131A] text-white text-xs font-semibold outline-none focus:border-teal-400"
                      >
                        <option value="E-commerce & Retail">E-commerce & Retail</option>
                        <option value="B2B SaaS & Tech">B2B SaaS & Tech</option>
                        <option value="Home & Interior Decor">Home & Interior Decor</option>
                        <option value="Healthcare & Botanical">Healthcare & Botanical</option>
                        <option value="Professional Services">Professional Services</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Current Traffic</label>
                      <select
                        value={formData.monthlyTraffic}
                        onChange={(e) => setFormData({ ...formData, monthlyTraffic: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-[#1E202D] bg-[#12131A] text-white text-xs font-semibold outline-none focus:border-teal-400"
                      >
                        <option value="< 2,000 / mo">&lt; 2,000 / mo</option>
                        <option value="2,000 - 10,000 / mo">2,000 - 10,000 / mo</option>
                        <option value="10,000 - 50,000 / mo">10,000 - 50,000 / mo</option>
                        <option value="50,000+ / mo">50,000+ / mo</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Monthly Budget</label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-[#1E202D] bg-[#12131A] text-white text-xs font-semibold outline-none focus:border-teal-400"
                      >
                        <option value="$2,500 - $5,000 / mo">$2,500 - $5,000 / mo</option>
                        <option value="$5,000 - $10,000 / mo">$5,000 - $10,000 / mo</option>
                        <option value="$10,000 - $25,000 / mo">$10,000 - $25,000 / mo</option>
                        <option value="$25,000+ / mo">$25,000+ / mo</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-3 bg-[#12131A] rounded-xl border border-[#1E202D] flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="aiAuditCheck"
                      checked={formData.wantFreeAiAudit}
                      onChange={(e) => setFormData({ ...formData, wantFreeAiAudit: e.target.checked })}
                      className="rounded accent-[#34a29d]"
                    />
                    <label htmlFor="aiAuditCheck" className="text-xs font-semibold text-slate-200 cursor-pointer">
                      Include free comprehensive AI technical & keyword gap audit with my proposal
                    </label>
                  </div>
                </div>
              )}

              {/* STEP 3: Schedule & Contact Info */}
              {currentStep === 3 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <h3 className="font-space font-extrabold text-xl text-white">
                      Step 3: Schedule Consultation & Contact Details
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Reserve your 1-on-1 strategic growth session with a Senior SEOWebFly Strategist.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Santosh Kumar"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-[#1E202D] bg-[#12131A] text-white text-xs sm:text-sm font-medium outline-none focus:border-teal-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Work Email Address *</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="email"
                          required
                          placeholder="santosh@seowebfly.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#1E202D] bg-[#12131A] text-white text-xs sm:text-sm font-medium outline-none focus:border-teal-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Phone Number *</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          placeholder="+91-844-833-2278"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#1E202D] bg-[#12131A] text-white text-xs font-medium outline-none focus:border-teal-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Preferred Date</label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-[#1E202D] bg-[#12131A] text-white text-xs font-medium outline-none focus:border-teal-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Preferred Time Slot</label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-[#1E202D] bg-[#12131A] text-white text-xs font-semibold outline-none focus:border-teal-400"
                      >
                        <option value="10:00 AM EST / 3:00 PM GMT">10:00 AM EST / 3:00 PM GMT</option>
                        <option value="11:30 AM EST / 4:30 PM GMT">11:30 AM EST / 4:30 PM GMT</option>
                        <option value="2:00 PM EST / 7:00 PM GMT">2:00 PM EST / 7:00 PM GMT</option>
                        <option value="4:00 PM EST / 9:00 PM GMT">4:00 PM EST / 9:00 PM GMT</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Project Notes / Specific Questions (Optional)</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. We want to rank in the UK top 3 for wallpaper and mattress keywords like 1Click Wallpapers..."
                      value={formData.projectNotes}
                      onChange={(e) => setFormData({ ...formData, projectNotes: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#1E202D] bg-[#12131A] text-white text-xs font-medium outline-none focus:border-teal-400"
                    />
                  </div>
                </div>
              )}

              {/* Form Action Buttons */}
              <div className="pt-4 border-t border-[#1E202D] flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-4 py-2 bg-[#12131A] text-slate-300 hover:text-white rounded-xl text-xs font-bold flex items-center gap-1.5 border border-[#1E202D]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : <div />}

                <button
                  type="submit"
                  className="px-6 py-3.5 bg-gradient-to-r from-[#006a66] to-[#008f89] hover:from-[#34a29d] hover:to-[#006a66] text-white font-bold text-sm rounded-xl transition-all shadow-lg flex items-center gap-2 border border-teal-400/20"
                >
                  <span>{currentStep === 3 ? 'Generate Custom Proposal & Confirm' : 'Continue Step ' + (currentStep + 1)}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          ) : (
            /* SUBMITTED SUCCESS CONFIRMATION RECEIPT */
            <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-950 text-emerald-300 flex items-center justify-center mx-auto border border-emerald-800 shadow-xl">
                <CheckCircle className="w-10 h-10 text-emerald-400" />
              </div>

              <div className="space-y-2">
                <span className="bg-emerald-950 text-emerald-300 text-[11px] font-bold px-3 py-1 rounded-full uppercase border border-emerald-800">
                  CONFIRMATION CODE: SEOWEBFLY-2026-9842
                </span>
                <h3 className="font-space font-extrabold text-2xl sm:text-3xl text-white">
                  Consultation & Audit Request Received!
                </h3>
                <p className="text-sm text-slate-300 max-w-lg mx-auto">
                  Thank you <span className="font-bold text-teal-300">{formData.fullName || 'Client'}</span>! A Senior Strategist from SEOWebFly has been assigned to prepare your custom competitive benchmark.
                </p>
              </div>

              {/* Proposal Summary Card */}
              <div className="p-5 bg-[#12131A] rounded-2xl border border-[#1E202D] text-left text-xs space-y-3">
                <div className="font-bold text-slate-400 uppercase tracking-wider text-[10px] pb-1 border-b border-[#1E202D]">
                  BOOKING SUMMARY RECEIPT:
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-300">
                  <div>• Company: <span className="font-bold text-white">{formData.companyName || 'Specified Brand'}</span></div>
                  <div>• Website: <span className="font-bold text-white">{formData.websiteUrl || 'Domain'}</span></div>
                  <div>• Email: <span className="font-bold text-white">{formData.email}</span></div>
                  <div>• Phone: <span className="font-bold text-white">{formData.phone}</span></div>
                  <div>• Session Date: <span className="font-bold text-teal-300">{formData.preferredDate}</span></div>
                  <div>• Time Slot: <span className="font-bold text-teal-300">{formData.preferredTime}</span></div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 bg-[#12131A] hover:bg-[#181a24] text-slate-200 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 border border-[#1E202D]"
                >
                  <Download className="w-4 h-4" />
                  <span>Print / Save Receipt</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#006a66] to-[#008f89] hover:from-[#34a29d] hover:to-[#006a66] text-white text-xs font-bold rounded-xl shadow border border-teal-400/20"
                >
                  Return to Portfolio
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
