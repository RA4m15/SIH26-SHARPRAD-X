import React, { useState } from 'react';
import { CenterInspection } from '../../../types';

interface ShowCauseModalProps {
  inspection: CenterInspection | null;
  onClose: () => void;
  onSubmitCAP: (noticeId: string, capText: string) => void;
}

export const ShowCauseModal: React.FC<ShowCauseModalProps> = ({
  inspection,
  onClose,
  onSubmitCAP
}) => {
  const [capText, setCapText] = useState(
    '1. CCTV IP Feed camera 2 has been replaced and linked to the Central NIC dashboard.\n2. Appointed additional TOT Certified Trainer (TOT-HSS-2023-91) restoring trainer ratio to 1:19.\n3. Supplementary biometric audit log attached.'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!inspection) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitCAP(inspection.showCauseNoticeId || 'SCN-2024', capText);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-lg shadow-2xl max-w-xl w-full overflow-hidden border border-[#ba1a1a]">
        {/* Header */}
        <div className="bg-[#ba1a1a] p-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px]">warning</span>
            <div>
              <h3 className="font-bold text-sm">Statutory Show-Cause Notice &amp; CAP Submission</h3>
              <p className="text-[11px] text-white/90">
                Notice Ref: {inspection.showCauseNoticeId} • Rule 14(b) Enforcement
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white cursor-pointer text-lg">
            ✕
          </button>
        </div>

        {/* Notice Contents */}
        <div className="p-5 text-xs space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="p-3 bg-[#ffdad6]/40 border border-[#ffdad6] rounded text-[#ba1a1a] space-y-1">
            <div className="flex items-center justify-between font-bold">
              <span>Grounds of Discrepancy (Inspection Date: {inspection.inspectionDate}):</span>
              <span className="bg-[#ba1a1a] text-white px-2 py-0.5 rounded text-[10px]">
                4 Days to Cure
              </span>
            </div>
            <p className="text-[11px] text-[#444651]">
              Surprise inspection by <strong>{inspection.inspectorOfficer}</strong> revealed that Classroom 2 CCTV stream was non-functional and the Trainer:Trainee ratio exceeded the statutory 1:30 threshold ({inspection.trainerToCandidateRatio}).
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="font-bold text-[#00236f] block mb-1">
                Formulate Corrective Action Plan (CAP) Rejoinder:
              </label>
              <textarea
                rows={4}
                value={capText}
                onChange={e => setCapText(e.target.value)}
                className="w-full bg-[#eff4ff] border border-[#dde9ff] rounded p-3 text-xs text-[#0d1c2f] focus:outline-none focus:border-[#00236f]"
                required
              />
            </div>

            <div className="p-3 bg-[#eff4ff] rounded border border-[#dde9ff] space-y-2">
              <span className="font-bold text-[#00236f] block text-[11px]">
                Attached Remedial Evidentiary Packets:
              </span>
              <div className="flex items-center gap-2 text-[11px] text-[#003212]">
                <span className="material-symbols-outlined text-[15px]">check_circle</span>
                <span>Geo-tagged CCTV Snapshot (18 Sep 2024, 08:30 IST)</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-[#003212]">
                <span className="material-symbols-outlined text-[15px]">check_circle</span>
                <span>NCVET TOT Trainer Joining Order &amp; Biometric Registration</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded bg-white text-[#444651] border border-[#dde9ff] text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-1.5 rounded bg-[#00236f] hover:bg-[#1e3a8a] text-white text-xs font-semibold cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <span className="material-symbols-outlined text-[15px]">
                  {isSubmitting ? 'sync' : 'send'}
                </span>
                <span>{isSubmitting ? 'Transmitting to Nodal Officer...' : 'Submit CAP Response'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
