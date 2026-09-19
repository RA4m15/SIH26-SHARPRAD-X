import React from 'react';

interface StatutoryCertificationProps {
  onOpenAuditTrail: () => void;
  onSealLedger: () => void;
  isLedgerSealed?: boolean;
}

export const StatutoryCertification: React.FC<StatutoryCertificationProps> = ({
  onOpenAuditTrail,
  onSealLedger,
  isLedgerSealed = false
}) => {
  return (
    <section className="w-full p-4 rounded bg-[#dde9ff] border border-[#d5e3fd] flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded bg-[#00236f] text-white flex items-center justify-center shrink-0 shadow-xs">
          <span className="material-symbols-outlined text-[20px]">fingerprint</span>
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-[#00236f] font-bold uppercase tracking-wider block">
              Statutory Nodal Authority Certification
            </span>
            {isLedgerSealed && (
              <span className="px-2 py-0.5 rounded bg-[#003212] text-white text-[10px] font-bold uppercase tracking-wider">
                Quarterly Block Cryptographically Sealed
              </span>
            )}
          </div>
          <p className="text-xs text-[#0d1c2f] mt-0.5 leading-relaxed">
            All cohort entries depicted herein represent longitudinally verified physical &amp; PFMS banking records pursuant to Rule 14(b) of National Apprenticeship &amp; Skilling Mandates.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <button
          onClick={onOpenAuditTrail}
          className="px-3.5 py-1.5 rounded bg-white text-[#0d1c2f] text-xs font-semibold hover:bg-[#f8f9ff] transition-colors shadow-xs border border-[#c5c5d3] cursor-pointer flex items-center gap-1"
          type="button"
        >
          <span className="material-symbols-outlined text-[15px]">history</span>
          <span>Audit Trail Log</span>
        </button>

        <button
          onClick={onSealLedger}
          className={`px-3.5 py-1.5 rounded text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer flex items-center gap-1 ${
            isLedgerSealed
              ? 'bg-[#003212] hover:bg-[#004b1f]'
              : 'bg-[#00236f] hover:bg-[#1e3a8a]'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[15px]">
            {isLedgerSealed ? 'verified' : 'encrypted'}
          </span>
          <span>{isLedgerSealed ? 'Ledger Sealed & Verified' : 'Seal Quarterly Ledger'}</span>
        </button>
      </div>
    </section>
  );
};
