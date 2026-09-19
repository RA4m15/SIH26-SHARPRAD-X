import React, { useState } from 'react';
import { BatchRecord } from '../../../types';

interface DBTBonusModalProps {
  batch: BatchRecord | null;
  onClose: () => void;
  onConfirmDBT: (batchId: string) => void;
}

export const DBTBonusModal: React.FC<DBTBonusModalProps> = ({
  batch,
  onClose,
  onConfirmDBT
}) => {
  const [candidates, setCandidates] = useState([
    {
      id: 'MH-SOL-2024-00142',
      name: 'Priya Shinde',
      aadhaarMasked: 'XXXX-XXXX-9142',
      bankStatus: 'NPCI Aadhaar-Seeded (SBI)',
      stipendAmount: 3000,
      retentionStatus: 'Day 180 Verified',
      clearedForPayout: true
    },
    {
      id: 'MH-SOL-2024-00145',
      name: 'Sanjay Rathod',
      aadhaarMasked: 'XXXX-XXXX-4105',
      bankStatus: 'NPCI Aadhaar-Seeded (BOI)',
      stipendAmount: 3000,
      retentionStatus: 'Day 180 Verified',
      clearedForPayout: true
    },
    {
      id: 'MH-SOL-2024-00150',
      name: 'Meera Waghmare',
      aadhaarMasked: 'XXXX-XXXX-2091',
      bankStatus: 'NPCI Aadhaar-Seeded (Canara Bank)',
      stipendAmount: 3000,
      retentionStatus: 'Day 180 Verified',
      clearedForPayout: true
    },
    {
      id: 'MH-SOL-2024-00155',
      name: 'Amol Jadhav',
      aadhaarMasked: 'XXXX-XXXX-8821',
      bankStatus: 'NPCI Aadhaar-Seeded (HDFC)',
      stipendAmount: 3000,
      retentionStatus: 'Day 180 Verified',
      clearedForPayout: true
    }
  ]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [disbursed, setDisbursed] = useState(false);

  if (!batch) return null;

  const totalPayout = candidates.filter(c => c.clearedForPayout).length * 3000;

  const handleAuthorize = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setDisbursed(true);
      onConfirmDBT(batch.batchId);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden border border-[#c5c5d3]">
        <div className="bg-[#00236f] p-4 text-white flex justify-between items-center">
          <div>
            <h3 className="font-bold text-sm">
              Certificate &amp; DBT Bonus Verification — Cohort {batch.batchId}
            </h3>
            <p className="text-[11px] text-white/80">Direct Benefit Transfer (DBT) Post-Placement Stipend Ledger</p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white cursor-pointer text-lg">
            ✕
          </button>
        </div>

        <div className="p-5 text-xs space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Top Banner */}
          <div className="p-3 bg-[#eff4ff] rounded border border-[#dde9ff] flex flex-wrap justify-between items-center gap-2">
            <div>
              <span className="text-[#444651] text-[10px] block font-semibold">Course &amp; Qualification:</span>
              <span className="font-bold text-[#00236f]">{batch.courseTitle} ({batch.qpCode})</span>
            </div>
            <div className="text-right">
              <span className="text-[#444651] text-[10px] block font-semibold">Total Verified Payout:</span>
              <span className="font-bold text-[#003212] font-mono text-sm">₹{totalPayout.toLocaleString()} (4 Candidates)</span>
            </div>
          </div>

          {/* Candidate Table */}
          <div className="border border-[#dde9ff] rounded overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#eff4ff] text-[#444651] text-[10px] font-semibold uppercase border-b border-[#dde9ff]">
                  <th className="py-2 px-3">Candidate &amp; ID</th>
                  <th className="py-2 px-3">Aadhaar NPCI Status</th>
                  <th className="py-2 px-3">Retention Verification</th>
                  <th className="py-2 px-3">DBT Stipend</th>
                  <th className="py-2 px-3 text-right">Eligible</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dde9ff]">
                {candidates.map((c, i) => (
                  <tr key={i} className="hover:bg-[#f8f9ff]">
                    <td className="py-2.5 px-3">
                      <div className="font-bold text-[#00236f]">{c.name}</div>
                      <div className="text-[10px] text-[#444651] font-mono">{c.id}</div>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-[11px] text-[#003212]">
                      <div className="font-bold">{c.bankStatus}</div>
                      <div className="text-[10px] text-[#444651]">{c.aadhaarMasked}</div>
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-[#003212]">
                      ✓ {c.retentionStatus}
                    </td>
                    <td className="py-2.5 px-3 font-bold font-mono text-[#00236f]">
                      ₹{c.stipendAmount.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <span className="px-2 py-0.5 rounded bg-[#e6eeff] text-[#003212] font-bold text-[10px]">
                        Cleared
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {disbursed ? (
            <div className="p-3 bg-[#e6eeff] border border-[#95f8a7] rounded text-[#003212] flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <div>
                <span className="font-bold block">DBT Payout Batch Dispatched to NPCI APBS Gateway</span>
                <span className="text-[11px]">UTR / Batch Token: DBT-MH-2024-842-9912. Credit expected within 2 hours.</span>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-[#f8f9ff] border border-[#dde9ff] rounded text-[#444651] text-[11px]">
              Clicking <strong>Authorize DBT Release</strong> triggers the electronic Direct Benefit Transfer file push to the Aadhaar Payment Bridge System (APBS) without intermediary deduction.
            </div>
          )}
        </div>

        <div className="p-4 bg-[#eff4ff] border-t border-[#dde9ff] flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded bg-white text-[#444651] border border-[#dde9ff] text-xs font-semibold cursor-pointer"
          >
            Close
          </button>

          {!disbursed ? (
            <button
              onClick={handleAuthorize}
              disabled={isProcessing}
              className="px-4 py-1.5 rounded bg-[#00236f] hover:bg-[#1e3a8a] text-white text-xs font-semibold cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-[15px]">
                {isProcessing ? 'sync' : 'payments'}
              </span>
              <span>{isProcessing ? 'Transmitting to NPCI Gateway...' : 'Authorize DBT Release (₹12,000)'}</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded bg-[#003212] text-white text-xs font-semibold cursor-pointer"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
