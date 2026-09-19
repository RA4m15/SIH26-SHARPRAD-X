import React from 'react';
import { SKILL_GAPS_DATA } from '../../data/mockData';

interface SkillGapsScreenProps {
  onSanctionAction: (sector: string) => void;
}

export const SkillGapsScreen: React.FC<SkillGapsScreenProps> = ({ onSanctionAction }) => {
  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-white p-5 rounded border border-[#dde9ff] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0051d5]"></span>
            <h2 className="text-base font-bold text-[#00236f]">
              Skill Gaps &amp; Industry Requisition Intelligence
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#dde9ff] text-[#00236f] font-mono font-bold">
              AICTE-NCVET MAPPING
            </span>
          </div>
          <p className="text-xs text-[#444651] mt-1">
            Reconciled against active National Career Service (NCS) vacancies and empanelled employer requisitions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded bg-[#eff4ff] text-[#00236f] text-xs font-semibold border border-[#dde9ff]">
            Total Industry Demand: <strong>59,700 Vacancies</strong>
          </span>
        </div>
      </div>

      {/* Sector Skill Deficit Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SKILL_GAPS_DATA.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded border border-[#dde9ff] shadow-xs flex flex-col justify-between hover:border-[#0051d5] transition-all"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-[#0d1c2f] text-sm">{item.sector}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  item.urgency === 'Critical High' 
                    ? 'bg-[#ffdad6] text-[#ba1a1a]' 
                    : item.urgency === 'Retention Constrained'
                    ? 'bg-[#dde9ff] text-[#0051d5]'
                    : 'bg-[#eff4ff] text-[#003212]'
                }`}>
                  {item.urgency}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 my-3 p-2.5 bg-[#eff4ff] rounded text-xs">
                <div>
                  <span className="text-[#444651] block text-[11px]">Unfilled Vacancies:</span>
                  <span className="font-mono font-bold text-[#ba1a1a] text-sm">
                    {item.demandVacancies.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[#444651] block text-[11px]">Trained Cohort Output:</span>
                  <span className="font-mono font-bold text-[#003212] text-sm">
                    {item.trainedSupply.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="text-xs space-y-1 text-[#444651]">
                <div className="flex justify-between">
                  <span>Supply/Demand Ratio:</span>
                  <span className="font-bold text-[#00236f] font-mono">{item.gapRatio}</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Corporate Offer:</span>
                  <span className="font-bold text-[#003212] font-mono">{item.avgOfferedSalary}</span>
                </div>
              </div>

              <div className="mt-3">
                <span className="text-[11px] font-semibold text-[#0d1c2f] block mb-1">
                  High-Deficit Competencies:
                </span>
                <div className="flex flex-wrap gap-1">
                  {item.topRequiredSkills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded bg-[#f8f9ff] text-[#0d1c2f] text-[10px] border border-[#dde9ff]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#eff4ff]">
              <button
                onClick={() => onSanctionAction(item.sector)}
                className="w-full py-1.5 rounded bg-[#00236f] hover:bg-[#1e3a8a] text-white text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">add_circle</span>
                <span>Sanction Batch Expansion</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
