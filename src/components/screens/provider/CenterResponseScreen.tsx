import React, { useState } from 'react';

interface CenterResponseScreenProps {
  onSubmitEvidence: (message: string) => void;
}

export const CenterResponseScreen: React.FC<CenterResponseScreenProps> = ({
  onSubmitEvidence
}) => {
  const [noticeId, setNoticeId] = useState('SCN-MSDE-SOL-2024-081 (Barshi Rural)');
  const [trainerAppointed, setTrainerAppointed] = useState(true);
  const [cctvRestored, setCctvRestored] = useState(true);
  const [rejoinderText, setRejoinderText] = useState(
    'CCTV Camera 2 has been replaced with a high-definition IP camera with live RTSP stream feed forwarded to the Solapur Nodal Server. Additionally, an auxiliary certified trainer (TOT Certified: TOT-HSS-2023-91) has reported to duty, restoring the ratio to 1:19.'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitEvidence('Center response & physical evidence successfully submitted to District Collectorate.');
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded border border-[#dde9ff] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00236f]"></span>
            <h2 className="text-base font-bold text-[#00236f]">
              Center Response &amp; Evidence Submission View
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#dde9ff] text-[#00236f] font-mono font-bold">
              STATUTORY REJOINDER PORTAL
            </span>
          </div>
          <p className="text-xs text-[#444651] mt-1">
            Empanelled Training Center formal compliance rejoinder with geo-tagged photographic evidence and biometric recalibration certificates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[15px]">timer</span>
            <span>Cure Period: 4 Days Remaining</span>
          </span>
        </div>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded border border-[#dde9ff] shadow-xs space-y-4 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-[#0d1c2f] block mb-1">
              Select Audit Discrepancy / Show-Cause Reference
            </label>
            <select
              value={noticeId}
              onChange={e => setNoticeId(e.target.value)}
              className="w-full bg-[#eff4ff] border border-[#dde9ff] rounded px-3 py-2 text-xs text-[#0d1c2f] focus:outline-none focus:border-[#00236f]"
            >
              <option>SCN-MSDE-SOL-2024-081 (Barshi Rural - CCTV &amp; Trainer Ratio)</option>
              <option>AUD-SOL-2024-110 (Solapur MIDC Hub - Biometric Backup Log)</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-[#0d1c2f] block mb-1">
              Nodal Direct Action Designation
            </label>
            <input
              type="text"
              readOnly
              value="Corrective Action Plan (CAP) Submission under Rule 14(b)"
              className="w-full bg-[#f8f9ff] border border-[#dde9ff] rounded px-3 py-2 text-xs text-[#444651] font-mono"
            />
          </div>
        </div>

        {/* Checkpoints Restored */}
        <div className="p-4 bg-[#eff4ff] rounded border border-[#dde9ff] space-y-2">
          <span className="font-bold text-[#00236f] block">Remedial Rectification Checkpoints:</span>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={cctvRestored}
              onChange={e => setCctvRestored(e.target.checked)}
              className="rounded text-[#00236f]"
            />
            <span className="text-[#0d1c2f]">
              CCTV IP Stream Restored (RTSP stream link forwarded to Central NIC Cloud)
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={trainerAppointed}
              onChange={e => setTrainerAppointed(e.target.checked)}
              className="rounded text-[#00236f]"
            />
            <span className="text-[#0d1c2f]">
              Trainer-to-Candidate Ratio Normalized (Appointment Letter of TOT Certified Trainer attached)
            </span>
          </label>
        </div>

        {/* Written Rejoinder */}
        <div>
          <label className="font-semibold text-[#0d1c2f] block mb-1">
            Official Written Rejoinder Statement (by Training Center Head)
          </label>
          <textarea
            rows={4}
            value={rejoinderText}
            onChange={e => setRejoinderText(e.target.value)}
            className="w-full bg-[#eff4ff] border border-[#dde9ff] rounded p-3 text-xs text-[#0d1c2f] focus:outline-none focus:border-[#00236f]"
          />
        </div>

        {/* Attached Evidence Files */}
        <div className="space-y-2">
          <label className="font-semibold text-[#0d1c2f] block">
            Mandatory Documentary &amp; Geo-Tagged Evidence Files:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-[#f8f9ff] border border-[#dde9ff] rounded flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0051d5] text-[18px]">photo_camera</span>
                <div>
                  <div className="font-bold text-[#0d1c2f]">cctv_geotag_proof.jpg</div>
                  <div className="text-[10px] text-[#444651]">2.4 MB • GPS Stamp</div>
                </div>
              </div>
              <span className="text-[#003212] font-bold text-[10px]">Attached</span>
            </div>

            <div className="p-3 bg-[#f8f9ff] border border-[#dde9ff] rounded flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#0051d5] text-[18px]">description</span>
                <div>
                  <div className="font-bold text-[#0d1c2f]">trainer_tot_cert.pdf</div>
                  <div className="text-[10px] text-[#444651]">1.1 MB • NCVET Seal</div>
                </div>
              </div>
              <span className="text-[#003212] font-bold text-[10px]">Attached</span>
            </div>

            <div className="p-3 bg-[#f8f9ff] border border-dashed border-[#0051d5] rounded flex items-center justify-center cursor-pointer hover:bg-[#dde9ff]/40 text-[#0051d5]">
              <span className="material-symbols-outlined text-[16px] mr-1">upload</span>
              <span className="font-semibold">Upload Additional File</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-[#eff4ff] flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 rounded bg-[#00236f] hover:bg-[#1e3a8a] text-white text-xs font-semibold cursor-pointer flex items-center gap-2 shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isSubmitting ? 'sync' : 'verified_user'}
            </span>
            <span>{isSubmitting ? 'Submitting to Nodal Director...' : 'Sign & Submit Rejoinder Evidence'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
