import React from 'react';

interface RootCauseSectionProps {
  onDownloadDossier: () => void;
}

export const RootCauseSection: React.FC<RootCauseSectionProps> = ({ onDownloadDossier }) => {
  return (
    <section className="bg-white p-4 sm:p-6 rounded shadow-xs border border-[#dde9ff] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-[#eff4ff]">
          <div>
            <h3 className="text-base font-semibold text-[#0d1c2f]">Non-Placement Root Causes</h3>
            <p className="text-xs text-[#444651]">Breakdown of non-placed / attrition cohort (N=3,738)</p>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded bg-[#e6eeff] text-[#0d1c2f] font-semibold border border-[#dde9ff]">
            Audit Categorized
          </span>
        </div>

        {/* Cause Breakdown List with Proportion Bars */}
        <div className="flex flex-col gap-3.5 mt-3">
          {/* Skill Gap 32% */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#0d1c2f] font-medium flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#ba1a1a]"></span>
                Skill Gap &amp; Assessment Failure
              </span>
              <span className="text-base font-bold text-[#0d1c2f] font-mono">32%</span>
            </div>
            <div className="w-full bg-[#e6eeff] h-2 rounded mt-1 overflow-hidden">
              <div className="bg-[#ba1a1a] h-full rounded transition-all duration-500" style={{ width: '32%' }}></div>
            </div>
            <div className="flex items-center justify-between text-[#444651] text-[11px] mt-1">
              <span>Solapur (42%), Pune (28%)</span>
              <span>Top Provider: Yuva Council</span>
            </div>
          </div>

          {/* Low Salary / Offer Mismatch 24% */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#0d1c2f] font-medium flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#00236f]"></span>
                Low Salary / Reservation Disparity
              </span>
              <span className="text-base font-bold text-[#0d1c2f] font-mono">24%</span>
            </div>
            <div className="w-full bg-[#e6eeff] h-2 rounded mt-1 overflow-hidden">
              <div className="bg-[#00236f] h-full rounded transition-all duration-500" style={{ width: '24%' }}></div>
            </div>
            <div className="flex items-center justify-between text-[#444651] text-[11px] mt-1">
              <span>Threshold: &lt;₹12,000 offered</span>
              <span>Affected: Healthcare &amp; Retail</span>
            </div>
          </div>

          {/* Location / Migration Reluctance 18% */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#0d1c2f] font-medium flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#0051d5]"></span>
                Location / Migration Reluctance
              </span>
              <span className="text-base font-bold text-[#0d1c2f] font-mono">18%</span>
            </div>
            <div className="w-full bg-[#e6eeff] h-2 rounded mt-1 overflow-hidden">
              <div className="bg-[#0051d5] h-full rounded transition-all duration-500" style={{ width: '18%' }}></div>
            </div>
            <div className="flex items-center justify-between text-[#444651] text-[11px] mt-1">
              <span>Female Candidates: 71% of this segment</span>
              <span>Regional Mobility Lock</span>
            </div>
          </div>

          {/* Lack of Regional Jobs 14% */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#0d1c2f] font-medium flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-xs bg-[#4059aa]"></span>
                Local Industrial Saturation
              </span>
              <span className="text-base font-bold text-[#0d1c2f] font-mono">14%</span>
            </div>
            <div className="w-full bg-[#e6eeff] h-2 rounded mt-1 overflow-hidden">
              <div className="bg-[#4059aa] h-full rounded transition-all duration-500" style={{ width: '14%' }}></div>
            </div>
            <div className="flex items-center justify-between text-[#444651] text-[11px] mt-1">
              <span>Rural Solapur Industrial Corridor</span>
              <span>Course: Electrician Trade</span>
            </div>
          </div>

          {/* Minor Factors (8% + 4%) */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="p-2 bg-[#e6eeff] rounded border border-[#dde9ff]">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#444651] font-medium">Family Reasons</span>
                <span className="font-bold text-[#0d1c2f] font-mono">8%</span>
              </div>
            </div>
            <div className="p-2 bg-[#e6eeff] rounded border border-[#dde9ff]">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#444651] font-medium">Doc/KYC Mismatch</span>
                <span className="font-bold text-[#0d1c2f] font-mono">4%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-2">
        <button
          onClick={onDownloadDossier}
          className="w-full py-2 px-3 rounded bg-[#e6eeff] text-[#00236f] text-xs hover:bg-[#dde9ff] transition-colors text-center font-semibold border border-[#dde9ff] cursor-pointer flex items-center justify-center gap-1.5"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">folder_zip</span>
          <span>Download Non-Placement Registry (District Collector Dossier)</span>
        </button>
      </div>
    </section>
  );
};
