import React, { useState, useEffect } from 'react';
import { PortfolioTemplateId } from '../types';
import { Phone, Mail, Menu, X, ArrowRight, Sparkles, Calculator, Search, User, LogOut, LogIn, HardDrive } from 'lucide-react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth, googleSignIn, logout } from '../lib/firebase';

interface Props {
  currentTemplate: PortfolioTemplateId;
  activeSection?: string;
  onNavigate?: (sectionId: string) => void;
  onOpenBookingModal: () => void;
  onOpenDriveHub: () => void;
}

export const Header: React.FC<Props> = ({
  currentTemplate,
  activeSection = 'hero',
  onNavigate,
  onOpenBookingModal,
  onOpenDriveHub
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error("Auth sign-in error:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Auth sign-out error:", error);
    }
  };

  const isDark = currentTemplate === 'cyber';

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'approach', label: 'Our Approach' },
    { id: 'case-studies', label: 'Case Studies' },
    { id: 'roi-calc', label: 'ROI Calculator' },
    { id: 'ai-audit', label: 'Free AI Audit' },
  ];

  const handleNavClick = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 bg-[#0A0A0B]/90 text-[#E2E8F0] backdrop-blur-xl border-b border-[#1E202D] shadow-2xl">
      {/* Top Notification Bar */}
      <div className="hidden md:flex justify-between items-center px-6 py-1.5 text-xs font-medium border-b bg-[#12131A] border-[#1E202D] text-slate-300">
        <div className="flex items-center gap-6">
          <a href="mailto:info@seowebfly.com" className="flex items-center gap-1.5 hover:text-teal-300 transition-colors">
            <Mail className="w-3.5 h-3.5 text-teal-400" />
            <span>info@seowebfly.com</span>
          </a>
          <a href="tel:+918448332278" className="flex items-center gap-1.5 hover:text-teal-300 transition-colors">
            <Phone className="w-3.5 h-3.5 text-teal-400" />
            <span>+91-844-833-2278</span>
          </a>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-amber-300 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>4.9★ Clutch Rated Digital Growth & AI Agency</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">UK • USA • Australia • Canada • India</span>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#006a66] to-[#34a29d] flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform border border-teal-400/30">
            <span className="font-space font-black text-xl tracking-tighter">W</span>
          </div>
          <div className="flex flex-col">
            <span className="font-space font-extrabold text-2xl tracking-tight leading-none text-white">
              SEOWeb<span className="text-[#34a29d]">Fly</span>
            </span>
            <span className="text-[10px] tracking-widest font-semibold uppercase text-amber-400 mt-0.5">
              Digital Growth Agency
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors py-1 relative ${
                  isActive
                    ? 'text-[#70d7d1] font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#34a29d] to-amber-400 rounded-full animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenDriveHub}
            id="header-drive-hub-btn"
            title="Google Drive SEO Hub"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl font-semibold text-xs transition-all border bg-[#12131A] text-teal-300 border-teal-500/30 hover:bg-[#181a24] hover:border-teal-400 hover:text-white cursor-pointer shadow-sm"
          >
            <HardDrive className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden md:inline">Drive Hub</span>
          </button>

          {currentUser ? (
            <div className="flex items-center gap-2 bg-[#12131A] border border-teal-500/30 px-3 py-1.5 rounded-xl text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-medium text-white max-w-[100px] truncate">{currentUser.displayName || currentUser.email}</span>
              <button
                onClick={handleSignOut}
                title="Sign Out"
                id="header-signout-btn"
                className="text-slate-400 hover:text-red-400 transition-colors ml-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleSignIn}
              id="header-signin-btn"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl font-semibold text-xs transition-all border bg-[#12131A] text-slate-300 border-[#1E202D] hover:bg-[#181a24] hover:text-white cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-teal-400" />
              <span>Sign In</span>
            </button>
          )}

          <button
            onClick={() => handleNavClick('ai-audit')}
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-semibold text-xs transition-all border bg-[#12131A] text-teal-300 border-teal-500/30 hover:bg-[#181a24] hover:border-teal-400 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-teal-400" />
            <span>AI Site Audit</span>
          </button>

          <button
            onClick={onOpenBookingModal}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#006a66] to-[#008f89] hover:from-[#34a29d] hover:to-[#006a66] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-teal-900/40 hover:scale-[1.02] active:scale-95 border border-teal-400/20 cursor-pointer"
          >
            <span>Book Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg border text-white border-white/10 hover:bg-white/10"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b px-6 py-4 space-y-3 bg-[#0A0A0B] border-[#1E202D] text-white">
          <div className="flex flex-col space-y-2 font-medium">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left py-2 px-3 rounded-lg transition-colors text-sm ${
                  activeSection === item.id
                    ? 'bg-teal-500/20 text-[#70d7d1] font-bold'
                    : 'hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDriveHub();
              }}
              className="w-full py-2.5 px-4 bg-[#12131A] text-teal-300 border border-teal-500/30 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
            >
              <HardDrive className="w-4 h-4 text-teal-400" />
              <span>Google Drive Workspace Hub</span>
            </button>

            <button
              onClick={() => handleNavClick('ai-audit')}
              className="w-full py-2.5 px-4 bg-[#12131A] text-teal-300 border border-teal-500/30 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4 text-teal-400" />
              <span>Run Free AI Site Audit</span>
            </button>
            
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookingModal();
              }}
              className="w-full py-2.5 px-4 bg-[#006a66] text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 shadow-md"
            >
              <span>Book Strategic Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
