import React, { useState } from 'react';
import { EarlyWarningAlert } from '../../types';

interface ActionModalProps {
  alert: EarlyWarningAlert | null;
  mode?: 'directive' | 'sealLedger';
  onClose: () => void;
  onConfirm: (notes: string) => void;
}

export const ActionModal: React.FC<ActionModalProps> = ({
  alert,
  mode = 'directive',
  onClose,
  onConfirm
}) => {
  const [officerNotes, setOfficerNotes] = useState('');
  const [priorityOrder, setPriorityOrder] = useState('Immediate Execution (24h SLA)');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!alert && mode === 'directive') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onConfirm(officerNotes || 'Order officially processed by Nodal Joint Director.');
    }, 600);
  };

  const isSealLedger = mode === 'sealLedger';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden border border-[#c5c5d3]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-4 text-white flex items-center justify-between ${
          isSealLedger ? 'bg-[#00236f]' : alert?.type === 'critical' ? 'bg-[#ba1a1a]' : 'bg-[#00236f]'
        }`}>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px]">
              {isSealLedger ? 'encrypted' : alert?.type === 'critical' ? 'crisis_alert' : 'fact_check'}
            </span>
            <span className="font-bold text-sm">
              {isSealLedger ? 'Seal Quarterly Outcome Ledger' : `Statutory Directive: ${alert?.title}`}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-lg p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4 text-xs">
          {isSealLedger ? (
            <div className="space-y-3">
              <div className="p-3 bg-[#eff4ff] rounded border border-[#dde9ff] text-[#0d1c2f]">
                <div className="font-bold text-[#00236f] text-sm mb-1">
                  Rule 14(b) Ledger Immutability Lock
                </div>
                <p className="text-xs leading-relaxed text-[#444651]">
                  You are about to cryptographically seal the verified outcome records for <strong>FY 2024-25</strong>. Once sealed, candidate retention records, EPFO matches, and PFMS incentive tranches cannot be altered without Union Ministry clearance.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-[#f8f9ff] p-2.5 rounded border border-[#dde9ff]">
                <div>
                  <span className="text-[#444651] block">Total Cohort Records:</span>
                  <span className="font-bold text-[#0d1c2f]">12,480 Candidates</span>
                </div>
                <div>
                  <span className="text-[#444651] block">Verified EPFO Match:</span>
                  <span className="font-bold text-[#003212]">8,742 (70.1%)</span>
                </div>
                <div>
                  <span className="text-[#444651] block">Statutory Rule:</span>
                  <span className="font-bold text-[#00236f]">MSDE-NCVET-2024-V2</span>
                </div>
                <div>
                  <span className="text-[#444651] block">Signatory:</span>
                  <span className="font-bold text-[#0d1c2f]">Rajesh Verma, IAS</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-3 bg-[#eff4ff] rounded border border-[#dde9ff]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-[#00236f] text-xs uppercase tracking-wider">
                    {alert?.scope}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-[#444651] border border-[#dde9ff]">
                    Priority Flag
                  </span>
                </div>
                <p className="text-xs text-[#0d1c2f] leading-relaxed">
                  {alert?.description}
                </p>
              </div>

              <div>
                <label className="font-semibold text-[#0d1c2f] block mb-1">
                  Directive Execution SLA
                </label>
                <select
                  value={priorityOrder}
                  onChange={e => setPriorityOrder(e.target.value)}
                  className="w-full bg-[#eff4ff] border border-[#dde9ff] rounded px-3 py-2 text-xs text-[#0d1c2f] focus:outline-none focus:border-[#00236f]"
                >
                  <option>Immediate Execution (24h SLA)</option>
                  <option>Expedited Field Audit (48h SLA)</option>
                  <option>Standard District Review (5 Working Days)</option>
                </select>
              </div>
            </div>
          )}

          <div>
            <label className="font-semibold text-[#0d1c2f] block mb-1">
              Officer Administrative Endorsement &amp; Instructions
            </label>
            <textarea
              rows={3}
              value={officerNotes}
              onChange={e => setOfficerNotes(e.target.value)}
              placeholder={
                isSealLedger 
                  ? "Enter regulatory gazette remark or digital token note..." 
                  : "Specify field inspection personnel, district nodal contact, or disbursement authorization code..."
              }
              className="w-full bg-[#eff4ff] border border-[#dde9ff] rounded p-2.5 text-xs text-[#0d1c2f] focus:outline-none focus:border-[#00236f]"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#dde9ff]">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded bg-white border border-[#c5c5d3] text-[#444651] hover:bg-[#eff4ff] transition-colors cursor-pointer font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-1.5 rounded text-white font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                isSealLedger ? 'bg-[#00236f] hover:bg-[#1e3a8a]' : 'bg-[#00236f] hover:bg-[#1e3a8a]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {isSubmitting ? 'sync' : 'done'}
              </span>
              <span>
                {isSubmitting
                  ? 'Processing Signature...'
                  : isSealLedger
                  ? 'Sign & Seal Ledger'
                  : alert?.actionLabel}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
