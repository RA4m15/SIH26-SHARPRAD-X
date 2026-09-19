import React from 'react';

interface FooterProps {
  onOpenStatutoryLink: (linkTitle: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenStatutoryLink }) => {
  return (
    <footer className="w-full bg-[#eff4ff] border-t border-[#dde9ff] py-6 mt-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left seal */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-[#00236f] flex items-center justify-center text-white shadow-2xs shrink-0">
            <span className="material-symbols-outlined text-[16px]">shield</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-[#0d1c2f] font-semibold">
              National Skill Outcome Tracking System • Government of India
            </span>
            <span className="text-[11px] text-[#444651]">
              © 2024-2025 Ministry of Skill Development &amp; Entrepreneurship. All administrative data cryptographically sealed.
            </span>
          </div>
        </div>

        {/* Right policy links */}
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
          <button
            onClick={() => onOpenStatutoryLink('Statutory Audit Protocol (Rule 14b)')}
            className="text-[11px] text-[#444651] hover:text-[#00236f] transition-colors cursor-pointer"
          >
            Audit Protocol
          </button>
          <button
            onClick={() => onOpenStatutoryLink('Outcome Data Dictionary & Field Codes')}
            className="text-[11px] text-[#444651] hover:text-[#00236f] transition-colors cursor-pointer"
          >
            Outcome Data Dictionary
          </button>
          <button
            onClick={() => onOpenStatutoryLink('District Nodal Officer & Collector Directory')}
            className="text-[11px] text-[#444651] hover:text-[#00236f] transition-colors cursor-pointer"
          >
            Nodal Officer Directory
          </button>
          <button
            onClick={() => onOpenStatutoryLink('Security Architecture & Cryptographic Verification')}
            className="text-[11px] text-[#444651] hover:text-[#00236f] transition-colors cursor-pointer"
          >
            Security &amp; Statutory Compliance
          </button>
        </div>
      </div>
    </footer>
  );
};
