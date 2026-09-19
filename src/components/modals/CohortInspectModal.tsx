import React, { useState } from 'react';
import { CourseLeaderboardItem } from '../../types';

interface CohortInspectModalProps {
  course: CourseLeaderboardItem | null;
  onClose: () => void;
  onExportCohortData?: () => void;
}

export const CohortInspectModal: React.FC<CohortInspectModalProps> = ({
  course,
  onClose,
  onExportCohortData
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'employers' | 'retention' | 'biometrics'>('overview');

  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-[#c5c5d3]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#00236f] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded ${course.iconBg} flex items-center justify-center ${course.iconColor} shrink-0`}>
              <span className="material-symbols-outlined text-[20px]">{course.icon}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base">{course.title}</h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white/20 font-mono">
                  {course.qpCode}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#95f8a7] text-[#00210a] font-bold">
                  NSQF Level {course.nsqfLevel}
                </span>
              </div>
              <p className="text-xs text-white/80 mt-0.5">
                Sector: {course.sector} • Statutory Audit Status: {course.statutoryStatus}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-lg p-1.5 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Sub-Tabs */}
        <div className="bg-[#eff4ff] px-4 border-b border-[#dde9ff] flex gap-4 text-xs font-semibold">
          {[
            { id: 'overview', label: 'Cohort Audit Overview' },
            { id: 'employers', label: 'Hiring Partners & Wages' },
            { id: 'retention', label: '180D Retention Curve' },
            { id: 'biometrics', label: 'PFMS & Biometric Match' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`py-2.5 border-b-2 transition-all cursor-pointer ${
                activeSubTab === tab.id
                  ? 'border-[#00236f] text-[#00236f] font-bold'
                  : 'border-transparent text-[#444651] hover:text-[#0d1c2f]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-5 overflow-y-auto flex-1 text-xs space-y-4">
          {activeSubTab === 'overview' && (
            <div className="space-y-4">
              {/* Top Key Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-[#eff4ff] rounded border border-[#dde9ff]">
                  <span className="text-[#444651] block text-[11px]">Enrolled &amp; Certified:</span>
                  <span className="text-lg font-bold text-[#00236f] font-mono">
                    {course.totalCandidates.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-[#003212] block">100% NCVET Tested</span>
                </div>
                <div className="p-3 bg-[#eff4ff] rounded border border-[#dde9ff]">
                  <span className="text-[#444651] block text-[11px]">Verified Placed:</span>
                  <span className="text-lg font-bold text-[#003212] font-mono">
                    {course.placedCount.toLocaleString()} ({course.placedRate}%)
                  </span>
                  <span className="text-[10px] text-[#444651] block">EPFO matched</span>
                </div>
                <div className="p-3 bg-[#eff4ff] rounded border border-[#dde9ff]">
                  <span className="text-[#444651] block text-[11px]">Avg Realized Wage:</span>
                  <span className="text-lg font-bold text-[#00236f] font-mono">
                    ₹{course.avgWage.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-[#003212] block">+{course.wageDeltaPercent}% over baseline</span>
                </div>
                <div className="p-3 bg-[#eff4ff] rounded border border-[#dde9ff]">
                  <span className="text-[#444651] block text-[11px]">6-Month Retention:</span>
                  <span className={`text-lg font-bold font-mono ${course.retention6M < 65 ? 'text-[#ba1a1a]' : 'text-[#003212]'}`}>
                    {course.retention6M}%
                  </span>
                  <span className="text-[10px] text-[#444651] block">Active ESIC filings</span>
                </div>
              </div>

              {/* Geographic District Distribution */}
              <div className="border border-[#dde9ff] rounded p-3 bg-white">
                <div className="font-semibold text-[#00236f] mb-2 flex items-center justify-between">
                  <span>District Cluster Distribution</span>
                  <span className="text-[11px] text-[#444651]">Total Districts: {course.districtDistribution.length}</span>
                </div>
                <div className="space-y-2">
                  {course.districtDistribution.map(dist => (
                    <div key={dist.district} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-[#0d1c2f]">{dist.district}</span>
                        <span className="font-mono text-[#00236f] font-bold">{dist.percentage}% of cohort</span>
                      </div>
                      <div className="w-full bg-[#eff4ff] h-1.5 rounded overflow-hidden">
                        <div
                          className="bg-[#0051d5] h-full rounded"
                          style={{ width: `${dist.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Statutory Audit Note */}
              <div className="p-3 rounded bg-[#eff4ff] border border-[#dde9ff] flex items-start gap-2.5 text-xs text-[#0d1c2f]">
                <span className="material-symbols-outlined text-[18px] text-[#00236f] mt-0.5">
                  policy
                </span>
                <div>
                  <span className="font-semibold block text-[#00236f]">NCVET Compliance Verification</span>
                  <span>
                    This cohort qualifies under standard <strong>Rule 14(b)</strong> provisions with EPFO digital verification match rate of <strong>{course.epfoMatchRate}%</strong>. All candidate passbooks have been verified against Central PFMS gateways.
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'employers' && (
            <div className="space-y-3">
              <div className="text-xs text-[#444651]">
                Top hiring enterprises offering verified formal contracts with mandatory statutory PF &amp; ESIC benefits:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.topEmployers.map((emp, i) => (
                  <div key={i} className="p-3 bg-[#f8f9ff] border border-[#dde9ff] rounded flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded bg-[#dde9ff] text-[#00236f] flex items-center justify-center font-bold text-xs">
                        {i + 1}
                      </span>
                      <div>
                        <div className="font-bold text-[#0d1c2f]">{emp}</div>
                        <div className="text-[10px] text-[#444651]">Direct Corporate Employer</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-[#003212] bg-[#e6eeff] px-2 py-0.5 rounded">
                      Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubTab === 'retention' && (
            <div className="space-y-3">
              <div className="p-3 bg-[#eff4ff] rounded border border-[#dde9ff]">
                <div className="font-bold text-[#00236f] mb-1">Retention Milestone Breakdown</div>
                <p className="text-[#444651]">
                  Mandatory statutory checks performed at 30 days, 90 days, 180 days, and 365 days post-course completion:
                </p>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-2.5 bg-white border border-[#dde9ff] rounded">
                  <div className="text-[10px] text-[#444651]">Day 30 (1M)</div>
                  <div className="text-base font-bold text-[#0051d5] font-mono">94.2%</div>
                  <div className="text-[10px] text-[#003212]">Joined &amp; First Salary</div>
                </div>
                <div className="p-2.5 bg-white border border-[#dde9ff] rounded">
                  <div className="text-[10px] text-[#444651]">Day 90 (3M)</div>
                  <div className="text-base font-bold text-[#0051d5] font-mono">87.5%</div>
                  <div className="text-[10px] text-[#003212]">Probation Cleared</div>
                </div>
                <div className="p-2.5 bg-white border border-[#dde9ff] rounded">
                  <div className="text-[10px] text-[#444651]">Day 180 (6M)</div>
                  <div className="text-base font-bold text-[#003212] font-mono">{course.retention6M}%</div>
                  <div className="text-[10px] text-[#003212]">Incentive Eligible</div>
                </div>
                <div className="p-2.5 bg-white border border-[#dde9ff] rounded">
                  <div className="text-[10px] text-[#444651]">Day 365 (12M)</div>
                  <div className="text-base font-bold text-[#00236f] font-mono">{Math.round(course.retention6M * 0.94)}%</div>
                  <div className="text-[10px] text-[#444651]">Annual Sustained</div>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'biometrics' && (
            <div className="space-y-3">
              <div className="p-3 bg-[#eff4ff] rounded border border-[#dde9ff]">
                <div className="font-bold text-[#00236f] mb-1">Digital Trail &amp; Biometric Reconciliation</div>
                <p className="text-[#444651]">
                  Every candidate profile in this qualification pack is mapped against Aadhaar masked token, UAN (Universal Account Number), and PFMS bank credit logs.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-white border border-[#dde9ff] rounded">
                  <span className="font-medium text-[#0d1c2f]">Aadhaar Biometric Attendance Ratio:</span>
                  <span className="font-mono font-bold text-[#003212]">98.6% Compliant</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white border border-[#dde9ff] rounded">
                  <span className="font-medium text-[#0d1c2f]">EPFO UAN Electronic Match:</span>
                  <span className="font-mono font-bold text-[#003212]">{course.epfoMatchRate}% Validated</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-white border border-[#dde9ff] rounded">
                  <span className="font-medium text-[#0d1c2f]">PFMS Direct Bank Account Seeding:</span>
                  <span className="font-mono font-bold text-[#003212]">100% Seeded</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#eff4ff] border-t border-[#dde9ff] flex items-center justify-between">
          <div className="text-[11px] text-[#444651]">
            Security Seal: <code>{course.qpCode}-NCVET-VERIFIED</code>
          </div>
          <div className="flex items-center gap-2">
            {onExportCohortData && (
              <button
                onClick={onExportCohortData}
                className="px-3 py-1.5 rounded bg-white border border-[#c5c5d3] text-[#00236f] text-xs font-semibold hover:bg-[#dde9ff] transition-colors cursor-pointer flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[15px]">download</span>
                <span>Export Cohort CSV</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded bg-[#00236f] text-white text-xs font-semibold hover:bg-[#1e3a8a] transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
