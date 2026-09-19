import React, { useState } from 'react';

interface ExportModalProps {
  format: 'pdf' | 'xlsx' | 'csv' | null;
  onClose: () => void;
  onDownloadCompleted: (message: string) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  format,
  onClose,
  onDownloadCompleted
}) => {
  const [downloading, setDownloading] = useState(false);

  if (!format) return null;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      let filename = 'Gazetted_Longitudinal_Summary_FY24.pdf';
      if (format === 'xlsx') filename = 'Trainee_MicroData_Registry_Solapur.xlsx';
      if (format === 'csv') filename = 'PFMS_Retention_Credits_Master.csv';

      // Create dummy file trigger
      const element = document.createElement("a");
      const file = new Blob([
        `NATIONAL SKILL DEVELOPMENT CORPORATION / MSDE\nStatutory Outcome Registry Export\nFormat: ${format.toUpperCase()}\nGenerated: ${new Date().toISOString()}\nNodal Officer: Rajesh Verma, IAS\nStatus: Cryptographically Sealed (Rule 14b)`
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = filename;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      onDownloadCompleted(`Exported ${filename} successfully.`);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden border border-[#c5c5d3]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#00236f] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">
              {format === 'pdf' ? 'picture_as_pdf' : format === 'xlsx' ? 'table_view' : 'verified'}
            </span>
            <h3 className="font-bold text-sm">
              {format === 'pdf' && 'Export Gazetted Longitudinal Summary (PDF)'}
              {format === 'xlsx' && 'Export Trainee Micro-Data Registry (XLSX)'}
              {format === 'csv' && 'Export Statutory PFMS Proof of Retention (CSV)'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-lg p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-5 text-xs space-y-3">
          <div className="p-3 bg-[#eff4ff] rounded border border-[#dde9ff]">
            <span className="font-bold text-[#00236f] block mb-1">
              Government Administrative Clearance
            </span>
            <p className="text-[#444651] leading-relaxed">
              This statutory dossier contains cryptographically sealed verification data for <strong>12,480 trainees</strong> across Solapur Rural, Urban, and Maharashtra State divisions.
            </p>
          </div>

          <div className="border border-[#dde9ff] rounded p-3 space-y-2 text-[11px] font-mono bg-[#f8f9ff]">
            <div className="flex justify-between">
              <span className="text-[#444651]">File Designation:</span>
              <span className="font-bold text-[#0d1c2f]">
                {format === 'pdf' && 'MSDE-GAZETTE-2024-Q4.pdf'}
                {format === 'xlsx' && 'TRAINEE_REGISTRY_VERIFIED_2024.xlsx'}
                {format === 'csv' && 'PFMS_DIRECT_TRANSFER_RETENTION.csv'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#444651]">Cryptographic Seal:</span>
              <span className="font-bold text-[#003212]">SHA256: 8f7a6b2c...Verified</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#444651]">Nodal Signoff:</span>
              <span className="font-bold text-[#00236f]">Rajesh Verma, IAS</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#eff4ff] border-t border-[#dde9ff] flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded bg-white border border-[#c5c5d3] text-[#444651] text-xs hover:bg-[#dde9ff] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="px-4 py-1.5 rounded bg-[#00236f] hover:bg-[#1e3a8a] text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">
              {downloading ? 'sync' : 'download'}
            </span>
            <span>{downloading ? 'Generating Official Dossier...' : 'Confirm & Download File'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
