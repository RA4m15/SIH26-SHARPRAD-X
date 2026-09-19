import React, { useState } from 'react';
import { TIMELINE_PROGRESSION_DATA } from '../../data/mockData';

export const WageProgressionScreen: React.FC = () => {
  const [activeCandidate] = useState({
    id: 'MH-SOL-2024-00142',
    name: 'Priya Shinde',
    course: 'Solar PV Project Technician (SGJ/Q0101)',
    district: 'Solapur Rural (Maharashtra)',
    currentEmployer: 'Tata Power Solar Systems Ltd',
    currentWage: 21500,
    baselineWage: 11200,
    nsqfLevel: 4
  });

  const [selectedMilestoneIndex, setSelectedMilestoneIndex] = useState<number>(3); // Day 180 selected by default

  const currentMilestone = TIMELINE_PROGRESSION_DATA[selectedMilestoneIndex];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white p-5 rounded border border-[#dde9ff] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0051d5]"></span>
            <h2 className="text-base font-bold text-[#00236f]">
              Employment &amp; Wage Progression Longitudinal Timeline
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#dde9ff] text-[#00236f] font-mono font-bold">
              SCREEN 5 • STATUTORY HORIZON TRACKER
            </span>
          </div>
          <p className="text-xs text-[#444651] mt-1">
            Tracking pre-skilling economic baseline to post-placement career trajectory verified via EPFO Electronic Challan Returns (ECR).
          </p>
        </div>

        <div className="p-3 bg-[#eff4ff] rounded border border-[#dde9ff] flex items-center gap-4 text-xs font-mono">
          <div>
            <span className="text-[#444651] text-[10px] block">Net Realized Wage Delta</span>
            <span className="font-bold text-[#003212] text-sm">+₹10,300/mo (+92%)</span>
          </div>
          <div className="h-8 w-px bg-[#dde9ff]"></div>
          <div>
            <span className="text-[#444651] text-[10px] block">Retention Status</span>
            <span className="font-bold text-[#00236f] text-sm">Active (180D Cleared)</span>
          </div>
        </div>
      </div>

      {/* Candidate Profile Summary Header */}
      <div className="bg-white p-4 rounded border border-[#dde9ff] shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-[#00236f] text-white flex items-center justify-center font-bold text-sm shadow-2xs">
            PS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-[#0d1c2f]">{activeCandidate.name}</span>
              <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#dde9ff] text-[#00236f] font-bold">
                {activeCandidate.id}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#95f8a7] text-[#00210a] font-bold">
                NSQF Level {activeCandidate.nsqfLevel}
              </span>
            </div>
            <div className="text-[#444651] mt-0.5">
              Course: <strong>{activeCandidate.course}</strong> • Jurisdiction: {activeCandidate.district}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="text-right">
            <span className="text-[#444651] block text-[10px]">Verified Employer</span>
            <span className="font-bold text-[#0051d5]">{activeCandidate.currentEmployer}</span>
          </div>
        </div>
      </div>

      {/* Interactive Timeline Stepper */}
      <div className="bg-white p-6 rounded border border-[#dde9ff] shadow-xs">
        <h3 className="text-sm font-bold text-[#00236f] mb-4">
          Longitudinal Career Milestones &amp; Banking Reconciliation
        </h3>

        {/* Stepper Buttons Row */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {TIMELINE_PROGRESSION_DATA.map((item, index) => {
            const isSelected = selectedMilestoneIndex === index;
            return (
              <div
                key={index}
                onClick={() => setSelectedMilestoneIndex(index)}
                className={`p-3 rounded border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#00236f] bg-[#eff4ff] shadow-xs ring-1 ring-[#00236f]'
                    : 'border-[#dde9ff] bg-[#f8f9ff] hover:bg-[#eff4ff]/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="font-mono font-bold text-[#00236f]">{item.day}</span>
                    <span className={`text-[10px] font-bold ${
                      item.status === 'Completed & Verified' ? 'text-[#003212]' : 'text-[#444651]'
                    }`}>
                      {item.status === 'Completed & Verified' ? '✓ Verified' : 'Upcoming'}
                    </span>
                  </div>
                  <div className="font-bold text-xs text-[#0d1c2f] leading-snug">{item.title}</div>
                  <div className="text-[10px] text-[#444651] mt-1">{item.date}</div>
                </div>

                <div className="mt-3 pt-2 border-t border-[#dde9ff] flex items-center justify-between">
                  <span className="text-sm font-bold font-mono text-[#003212]">
                    ₹{item.monthlyWage.toLocaleString()}
                  </span>
                  {item.wageGrowthPercent > 0 && (
                    <span className="text-[10px] text-[#003212] font-semibold bg-[#e6eeff] px-1.5 py-0.5 rounded">
                      +{item.wageGrowthPercent}%
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Milestone Deep-Dive Dossier */}
        <div className="mt-6 p-4 rounded bg-[#eff4ff] border border-[#dde9ff] space-y-3 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#dde9ff] pb-2">
            <div>
              <span className="text-base font-bold text-[#00236f]">{currentMilestone.title}</span>
              <span className="ml-2 font-mono text-[11px] text-[#444651]">{currentMilestone.day} • {currentMilestone.date}</span>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-[#003212] text-white font-mono text-xs font-bold">
              Verified Monthly Wage: ₹{currentMilestone.monthlyWage.toLocaleString()}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 bg-white rounded border border-[#dde9ff]">
              <span className="text-[#444651] text-[10px] block font-semibold">Employing Organization:</span>
              <span className="font-bold text-[#0d1c2f] text-sm">{currentMilestone.employer}</span>
              <span className="text-[10px] text-[#003212] block mt-0.5">Formal Statutory Contract</span>
            </div>
            <div className="p-3 bg-white rounded border border-[#dde9ff]">
              <span className="text-[#444651] text-[10px] block font-semibold">EPFO Electronic Challan ID:</span>
              <span className="font-mono font-bold text-[#0051d5] text-xs">{currentMilestone.epfoContributionId}</span>
              <span className="text-[10px] text-[#444651] block mt-0.5">Direct UAN Linked Contribution</span>
            </div>
            <div className="p-3 bg-white rounded border border-[#dde9ff]">
              <span className="text-[#444651] text-[10px] block font-semibold">Validation Authority:</span>
              <span className="font-semibold text-[#0d1c2f] text-xs">{currentMilestone.verifiedVia}</span>
              <span className="text-[10px] text-[#003212] block mt-0.5">Central Server API Match</span>
            </div>
          </div>

          <div className="p-3 bg-white rounded border border-[#dde9ff] text-[#444651]">
            <span className="font-bold text-[#00236f] block mb-0.5">Statutory Audit Field Observation:</span>
            <span>{currentMilestone.notes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
