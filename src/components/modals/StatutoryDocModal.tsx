import React from 'react';

interface StatutoryDocModalProps {
  title: string | null;
  onClose: () => void;
}

export const StatutoryDocModal: React.FC<StatutoryDocModalProps> = ({ title, onClose }) => {
  if (!title) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-[#c5c5d3]">
        <div className="bg-[#00236f] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">policy</span>
            <h3 className="font-bold text-sm">{title}</h3>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white cursor-pointer text-lg">
            ✕
          </button>
        </div>

        <div className="p-5 overflow-y-auto flex-1 text-xs text-[#0d1c2f] space-y-3 leading-relaxed">
          <div className="p-3 bg-[#eff4ff] rounded border border-[#dde9ff]">
            <span className="font-bold text-[#00236f] block">Official Reference Gazette ID: MSDE-REG-2024-V4</span>
            <span className="text-[#444651] text-[11px]">
              Statutory mandate issued by the Ministry of Skill Development &amp; Entrepreneurship in coordination with NCVET.
            </span>
          </div>

          <p>
            <strong>1. Mandatory Longitudinal Verification:</strong> Under Section 14(b), all vocational qualifications registered under the National Skills Qualification Framework (NSQF) must be monitored at 30, 90, 180, and 365-day intervals post-certification.
          </p>
          <p>
            <strong>2. Direct Integration with National Databases:</strong> Trainee employment validations require automated cross-referencing with the Employees’ Provident Fund Organisation (EPFO) and Employees’ State Insurance Corporation (ESIC). Self-employment declarations must be accompanied by active GST/Udyam numbers or PMMY Mudra loan sanction letters.
          </p>
          <p>
            <strong>3. Immutable Nodal Authority Ledger:</strong> District Collectors and State Nodal Directors possess statutory authority to sanction field inspections, withhold non-compliant training provider tranches, and seal quarterly outcome blocks using 256-bit cryptographic protocols.
          </p>
        </div>

        <div className="p-3 bg-[#eff4ff] border-t border-[#dde9ff] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-[#00236f] text-white text-xs font-semibold hover:bg-[#1e3a8a] cursor-pointer"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};
