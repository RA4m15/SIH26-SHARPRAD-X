import React, { useState } from 'react';
import { BatchRecord } from '../../../types';

interface Form12CModalProps {
  batch: BatchRecord | null;
  onClose: () => void;
  onSuccess: (batch: BatchRecord) => void;
}

export const Form12CModal: React.FC<Form12CModalProps> = ({ batch, onClose, onSuccess }) => {
  const [aadhaarNumber, setAadhaarNumber] = useState('XXXX-XXXX-9482');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isSigning, setIsSigning] = useState(false);

  if (!batch) return null;

  const handleSendOtp = () => {
    setOtpSent(true);
  };

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSigning(true);
    setTimeout(() => {
      setIsSigning(false);
      onSuccess(batch);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-lg shadow-2xl max-w-xl w-full overflow-hidden border border-[#c5c5d3]">
        <div className="bg-[#00236f] p-4 text-white flex justify-between items-center">
          <div>
            <h3 className="font-bold text-sm">Form 12-C Statutory Digital Attestation &amp; e-Sign</h3>
            <p className="text-[11px] text-white/80">Batch: {batch.batchId} • Rule 14(b) General Financial Rules (GFR)</p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white cursor-pointer text-lg">
            ✕
          </button>
        </div>

        <div className="p-5 text-xs space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Statutory Notice */}
          <div className="p-3 bg-[#eff4ff] border border-[#dde9ff] rounded text-[#0d1c2f] leading-relaxed">
            <span className="font-bold text-[#00236f] block mb-1">
              FORM GFR 12-C [See Rule 239]
            </span>
            <p className="text-[11px] text-[#444651]">
              <strong>Form of Utilization Certificate:</strong> Certified that out of ₹9,00,000 of Grants-in-aid sanctioned during the year in favor of Yuva Skill Council under Ministry of Skill Development, a sum of <strong>₹2,70,000</strong> has been utilized for the 180-Day Longitudinal Retention Milestone of Cohort <strong>{batch.batchId}</strong>.
            </p>
          </div>

          {/* Batch Metrics Breakdown */}
          <div className="grid grid-cols-3 gap-2 bg-[#f8f9ff] p-3 rounded border border-[#dde9ff] font-mono text-[11px]">
            <div>
              <span className="text-[#444651] block text-[10px]">Candidates Certified:</span>
              <span className="font-bold text-[#00236f]">{batch.assessmentCleared} / {batch.enrolledCandidates}</span>
            </div>
            <div>
              <span className="text-[#444651] block text-[10px]">180D Retention Count:</span>
              <span className="font-bold text-[#003212]">{batch.placedCount} (90%)</span>
            </div>
            <div>
              <span className="text-[#444651] block text-[10px]">Claim Amount (Tranche 3):</span>
              <span className="font-bold text-[#00236f]">₹2,70,000</span>
            </div>
          </div>

          {/* e-Sign Signature Gateway Simulation */}
          <form onSubmit={handleSign} className="p-4 bg-[#eff4ff] rounded border border-[#dde9ff] space-y-3">
            <span className="font-bold text-[#00236f] block">
              Ministry of Electronics &amp; IT (MeitY) — Aadhaar e-Sign Gateway
            </span>

            <div>
              <label className="text-[11px] text-[#444651] block mb-1">
                Authorized Signatory Aadhaar Number (Masked)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={aadhaarNumber}
                  onChange={e => setAadhaarNumber(e.target.value)}
                  className="bg-white border border-[#dde9ff] rounded px-3 py-1.5 text-xs text-[#0d1c2f] font-mono w-full"
                />
                {!otpSent ? (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="px-3 py-1.5 rounded bg-[#00236f] text-white font-semibold text-xs whitespace-nowrap cursor-pointer hover:bg-[#1e3a8a]"
                  >
                    Send OTP
                  </button>
                ) : (
                  <span className="text-[10px] text-[#003212] font-bold self-center whitespace-nowrap">
                    OTP Sent to Reg. Mobile
                  </span>
                )}
              </div>
            </div>

            {otpSent && (
              <div>
                <label className="text-[11px] text-[#444651] block mb-1">
                  Enter 6-Digit Aadhaar Authentication OTP
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="e.g. 849201"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  className="bg-white border border-[#dde9ff] rounded px-3 py-1.5 text-xs font-mono tracking-widest text-[#0d1c2f] w-full"
                  required
                />
                <span className="text-[10px] text-[#444651] mt-0.5 block">
                  Demo auto-fill: Any 6 digits (e.g. 123456)
                </span>
              </div>
            )}

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
                disabled={!otpSent || isSigning}
                className={`px-4 py-1.5 rounded text-xs font-semibold text-white flex items-center gap-1.5 cursor-pointer shadow-xs ${
                  otpSent && !isSigning ? 'bg-[#00236f] hover:bg-[#1e3a8a]' : 'bg-[#c5c5d3] cursor-not-allowed'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">
                  {isSigning ? 'sync' : 'fingerprint'}
                </span>
                <span>{isSigning ? 'Sealing Cryptographic Token...' : 'Digitally Sign Form 12-C'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
