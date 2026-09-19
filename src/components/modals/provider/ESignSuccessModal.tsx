import React from 'react';
import { BatchRecord } from '../../../types';

interface ESignSuccessModalProps {
  batch: BatchRecord | null;
  onClose: () => void;
}

export const ESignSuccessModal: React.FC<ESignSuccessModalProps> = ({ batch, onClose }) => {
  if (!batch) return null;

  const certificateId = `CERT-MSDE-2024-${batch.batchId}-12C`;
  const shaDigest = `8f7b2c9a1042eef0984ba71c2394d56ef82930a41d9c7e09fa8b7c6d5e4f3a2b`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-lg shadow-2xl max-w-xl w-full overflow-hidden border border-[#c5c5d3]">
        {/* Certificate Header Banner */}
        <div className="bg-[#003212] p-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-400 text-[24px]">verified</span>
            <div>
              <h3 className="font-bold text-sm">e-Sign Attestation &amp; Digital Certificate Generated</h3>
              <p className="text-[11px] text-white/80">Gazetted Certificate ID: {certificateId}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white cursor-pointer text-lg">
            ✕
          </button>
        </div>

        {/* Certificate Preview Card */}
        <div className="p-6 text-xs space-y-4">
          <div className="border-4 border-double border-[#00236f]/30 p-5 rounded bg-[#fcfdff] relative">
            <div className="text-center space-y-1 mb-4">
              <span className="text-[10px] font-bold tracking-widest text-[#444651] uppercase block">
                Government of India • Ministry of Skill Development
              </span>
              <h2 className="text-base font-bold text-[#00236f]">
                STATUTORY UTILIZATION &amp; OUTCOME ATTESTATION
              </h2>
              <span className="text-[11px] text-[#444651]">Issued under Rule 14(b) / GFR Form 12-C</span>
            </div>

            <div className="space-y-2 text-[#0d1c2f] leading-relaxed text-[11px]">
              <p>
                This certifies that the Vocational Training Provider <strong>Yuva Skill Council</strong> has successfully achieved and independently validated the 180-Day Longitudinal Employment Milestone for Batch <strong>{batch.batchId}</strong> ({batch.courseTitle}).
              </p>
              <div className="p-3 bg-[#eff4ff] rounded border border-[#dde9ff] grid grid-cols-2 gap-2 font-mono text-[10px]">
                <div>
                  <span className="text-[#444651] block">Total Retained Candidates:</span>
                  <span className="font-bold text-[#003212]">{batch.placedCount} Candidates</span>
                </div>
                <div>
                  <span className="text-[#444651] block">PFMS Disbursement Sanction:</span>
                  <span className="font-bold text-[#00236f]">₹2,70,000 (Tranche 3)</span>
                </div>
              </div>
            </div>

            {/* Cryptographic Signature Stamp Block */}
            <div className="mt-4 pt-3 border-t border-[#dde9ff] flex items-center justify-between">
              <div className="space-y-0.5 text-[9px] font-mono text-[#444651]">
                <div>Digitally Signed by: <strong>Aadhaar e-Sign Service (CCA India)</strong></div>
                <div>Hash: {shaDigest.slice(0, 32)}...</div>
                <div className="text-[#003212] font-bold">Timestamp: 2024-09-18 09:30:14 IST</div>
              </div>

              {/* QR Mock */}
              <div className="w-14 h-14 bg-white border border-[#00236f] p-1 flex items-center justify-center text-center">
                <span className="font-mono text-[8px] font-bold text-[#00236f] leading-tight">
                  MSDE<br/>VERIFIED<br/>QR-14B
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-[#eff4ff] border-t border-[#dde9ff] flex items-center justify-between">
          <span className="text-[11px] text-[#003212] font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">cloud_done</span>
            <span>Archived to Central National PFMS Gateway</span>
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => {
                alert(`Official Gazetted Certificate ${certificateId} downloaded successfully.`);
                onClose();
              }}
              className="px-3.5 py-1.5 rounded bg-[#00236f] hover:bg-[#1e3a8a] text-white text-xs font-semibold cursor-pointer flex items-center gap-1 shadow-xs"
            >
              <span className="material-symbols-outlined text-[15px]">download</span>
              <span>Download PDF Certificate</span>
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded bg-white border border-[#dde9ff] text-[#444651] text-xs font-semibold hover:bg-[#dde9ff] cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
