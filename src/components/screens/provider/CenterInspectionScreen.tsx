import React, { useState, useEffect } from 'react';
import { api } from '../../../api/client';
import { CenterInspection } from '../../../types';
import { CENTER_INSPECTIONS_DATA } from '../../../data/mockData';
import { Loader2 } from 'lucide-react';

interface CenterInspectionScreenProps {
  onOpenShowCauseModal: (inspection: CenterInspection) => void;
  onNavigateToEvidenceSubmission: () => void;
}

export const CenterInspectionScreen: React.FC<CenterInspectionScreenProps> = ({
  onOpenShowCauseModal,
  onNavigateToEvidenceSubmission
}) => {
  const [inspections, setInspections] = useState<CenterInspection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get<{ success: boolean; data: CenterInspection[] }>('/center-inspections')
      .then(res => setInspections(res.data && res.data.length > 0 ? res.data : CENTER_INSPECTIONS_DATA))
      .catch(() => setInspections(CENTER_INSPECTIONS_DATA))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-hirebound-primary h-8 w-8" /></div>;
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded border border-[#dde9ff] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00236f]"></span>
            <h2 className="text-base font-bold text-[#00236f]">
              District Nodal Audit &amp; Physical Center Inspection Scorecard
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#dde9ff] text-[#00236f] font-mono font-bold">
              SURPRISE FIELD INSPECTION LEDGER
            </span>
          </div>
          <p className="text-xs text-[#444651] mt-1">
            Statutory physical inspections conducted by District Collectors and Directorate of Vocational Education pursuant to Rule 14(b).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateToEvidenceSubmission}
            className="px-3 py-1.5 rounded bg-[#eff4ff] hover:bg-[#dde9ff] text-[#00236f] text-xs font-semibold border border-[#dde9ff] cursor-pointer flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[15px]">upload_file</span>
            <span>Submit Center Response &amp; Evidence</span>
          </button>
        </div>
      </div>

      {/* Inspections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {inspections.map(insp => (
          <div
            key={insp.id}
            className={`p-5 rounded bg-white border shadow-xs flex flex-col justify-between ${
              insp.status === 'Show-Cause Issued'
                ? 'border-[#ffdad6] ring-1 ring-[#ba1a1a]/30'
                : 'border-[#dde9ff]'
            }`}
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-sm text-[#00236f]">{insp.centerName}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  insp.status === 'Show-Cause Issued'
                    ? 'bg-[#ffdad6] text-[#ba1a1a]'
                    : 'bg-[#e6eeff] text-[#003212] border border-[#95f8a7]'
                }`}>
                  {insp.status}
                </span>
              </div>

              <div className="text-xs text-[#444651] space-y-0.5 mb-3">
                <div>Inspection Date: <strong>{insp.inspectionDate}</strong></div>
                <div>Inspecting Officer: <strong>{insp.inspectorOfficer}</strong></div>
              </div>

              {/* Checklist Badges */}
              <div className="space-y-2 p-3 bg-[#eff4ff] rounded text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#444651]">Aadhaar Biometric AEBAS:</span>
                  <span className="font-bold text-[#003212] flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[14px]">check</span> Operational
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#444651]">CCTV IP Surveillance Stream:</span>
                  <span className={`font-bold flex items-center gap-0.5 ${
                    insp.cctvSurveillanceCompliance ? 'text-[#003212]' : 'text-[#ba1a1a]'
                  }`}>
                    <span className="material-symbols-outlined text-[14px]">
                      {insp.cctvSurveillanceCompliance ? 'check' : 'close'}
                    </span>
                    {insp.cctvSurveillanceCompliance ? 'Compliant' : 'Discrepancy (Camera 2 Offline)'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#444651]">Trainer : Trainee Ratio:</span>
                  <span className="font-bold text-[#0d1c2f]">{insp.trainerToCandidateRatio}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#444651]">Audit Quality Score:</span>
                  <span className={`font-mono font-bold text-sm ${
                    insp.overallAuditScore >= 80 ? 'text-[#003212]' : 'text-[#ba1a1a]'
                  }`}>
                    {insp.overallAuditScore}%
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#eff4ff] flex items-center justify-between">
              {insp.status === 'Show-Cause Issued' ? (
                <button
                  onClick={() => onOpenShowCauseModal(insp)}
                  className="w-full py-1.5 rounded bg-[#ba1a1a] hover:bg-[#93000a] text-white text-xs font-semibold cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">crisis_alert</span>
                  <span>View Notice ({insp.showCauseNoticeId}) &amp; Submit CAP</span>
                </button>
              ) : (
                <div className="flex items-center justify-between w-full text-xs text-[#003212]">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    <span>All Lab &amp; Class Infrastructure Validated</span>
                  </span>
                  <span className="text-[11px] text-[#444651]">Valid till 2025</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
