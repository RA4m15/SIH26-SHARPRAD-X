import React, { useState } from 'react';
import { COMPETENCY_SKILLS_DATA, RECOMMENDED_COURSES_DATA } from '../../data/mockData';
import { RecommendedCourse } from '../../types';

interface SkillProfileScreenProps {
  onEnrollCourse: (course: RecommendedCourse) => void;
}

export const SkillProfileScreen: React.FC<SkillProfileScreenProps> = ({ onEnrollCourse }) => {
  const [selectedCourse, setSelectedCourse] = useState<RecommendedCourse | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded border border-[#dde9ff] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0051d5]"></span>
            <h2 className="text-base font-bold text-[#00236f]">
              Skill Profile &amp; Recommended Stackable Upskilling
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#dde9ff] text-[#00236f] font-mono font-bold">
              SCREEN 6 • NSQF LEVEL BRIDGING
            </span>
          </div>
          <p className="text-xs text-[#444651] mt-1">
            Dynamic competency gap mapping aligning verified candidate on-the-job mastery with industry requisition demands for accelerated wage growth.
          </p>
        </div>

        <div className="p-2.5 bg-[#eff4ff] rounded border border-[#dde9ff] text-xs">
          <span className="text-[#444651] block text-[10px]">Candidate Diagnostic Profile</span>
          <span className="font-bold text-[#00236f]">Priya Shinde (SGJ/Q0101 • Level 4)</span>
        </div>
      </div>

      {/* Competency Gap Radar / Bars & NSQF Ladder */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (7 cols): Competency Diagnostic Bars */}
        <div className="lg:col-span-7 bg-white p-5 rounded border border-[#dde9ff] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3">
            <div>
              <h3 className="font-bold text-sm text-[#00236f]">Technical Competency Scorecard</h3>
              <p className="text-xs text-[#444651]">Evaluated via NCVET Digital Skill Passport</p>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded bg-[#dde9ff] text-[#00236f] font-semibold">
              Industry Standard Benchmark: 75%
            </span>
          </div>

          <div className="space-y-3.5">
            {COMPETENCY_SKILLS_DATA.map((item, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[#0d1c2f] flex items-center gap-1.5">
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#eff4ff] text-[#444651]">
                      {item.category}
                    </span>
                    {item.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#00236f]">{item.currentLevel}%</span>
                    <span className="text-[10px] text-[#444651]">Req: {item.marketRequirement}%</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                      item.gapStatus === 'Optimal'
                        ? 'bg-[#e6eeff] text-[#003212]'
                        : item.gapStatus === 'Minor Gap'
                        ? 'bg-[#dde9ff] text-[#0051d5]'
                        : 'bg-[#ffdad6] text-[#ba1a1a]'
                    }`}>
                      {item.gapStatus}
                    </span>
                  </div>
                </div>

                <div className="w-full bg-[#eff4ff] h-2 rounded overflow-hidden relative">
                  {/* Market Requirement Indicator line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-[#444651] z-10"
                    style={{ left: `${item.marketRequirement}%` }}
                    title={`Industry Target: ${item.marketRequirement}%`}
                  ></div>
                  {/* Current Candidate Mastery Bar */}
                  <div
                    className={`h-full rounded transition-all duration-500 ${
                      item.gapStatus === 'Optimal'
                        ? 'bg-[#003212]'
                        : item.gapStatus === 'Minor Gap'
                        ? 'bg-[#0051d5]'
                        : 'bg-[#ba1a1a]'
                    }`}
                    style={{ width: `${item.currentLevel}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right (5 cols): NSQF Qualification Ladder */}
        <div className="lg:col-span-5 bg-white p-5 rounded border border-[#dde9ff] shadow-xs flex flex-col justify-between">
          <div>
            <div className="border-b border-[#eff4ff] pb-3 mb-3">
              <h3 className="font-bold text-sm text-[#00236f]">NSQF Career Ladder Progression</h3>
              <p className="text-xs text-[#444651]">Statutory Progression &amp; Wage Matrix</p>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded bg-[#f8f9ff] border border-[#dde9ff] text-xs">
                <div className="flex justify-between items-center text-[11px] mb-1">
                  <span className="font-bold text-[#444651]">Level 3: Solar Installation Helper</span>
                  <span className="text-[#444651]">Historical Baseline</span>
                </div>
                <div className="font-mono text-[#444651]">Avg Market Wage: ₹12,000/mo</div>
              </div>

              <div className="p-3 rounded bg-[#eff4ff] border-2 border-[#00236f] text-xs shadow-xs">
                <div className="flex justify-between items-center text-[11px] mb-1">
                  <span className="font-bold text-[#00236f] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    Level 4: Solar PV Project Technician
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-[#00236f] text-white font-bold text-[10px]">CURRENT</span>
                </div>
                <div className="font-mono text-[#003212] font-bold">Current Verified Wage: ₹21,500/mo</div>
                <div className="text-[10px] text-[#444651] mt-1">Certified via Yuva Center 01, Solapur</div>
              </div>

              <div className="p-3 rounded bg-[#f8f9ff] border border-dashed border-[#0051d5] text-xs">
                <div className="flex justify-between items-center text-[11px] mb-1">
                  <span className="font-bold text-[#0051d5]">Level 5: Microgrid BESS Lead</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#dde9ff] text-[#00236f] font-bold">TARGET GOAL</span>
                </div>
                <div className="font-mono text-[#00236f] font-bold">Projected Wage: ₹29,000/mo (+35%)</div>
                <div className="text-[10px] text-[#003212] mt-1">100% PMKVY Government Subsidy Eligible</div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#eff4ff]">
            <span className="text-[11px] text-[#444651] block leading-snug">
              Achieving Level 5 unlocks supervisory site accreditation and eligibility for state industrial incentives.
            </span>
          </div>
        </div>
      </div>

      {/* Recommended Stackable Upskilling Courses */}
      <div className="bg-white p-5 rounded border border-[#dde9ff] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3">
          <div>
            <h3 className="font-bold text-sm text-[#00236f]">
              Recommended Stackable Micro-Credentials (Target NSQF Level 5 &amp; 6)
            </h3>
            <p className="text-xs text-[#444651]">Matched to Candidate Skill Deficit in Battery Storage &amp; SCADA Telemetry</p>
          </div>
          <span className="text-xs text-[#003212] font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            Direct Employer Endorsed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {RECOMMENDED_COURSES_DATA.map(course => (
            <div
              key={course.id}
              className="p-4 bg-[#f8f9ff] rounded border border-[#dde9ff] hover:border-[#00236f] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-mono font-bold text-[#00236f]">{course.qpCode}</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#dde9ff] text-[#00236f] font-bold text-[10px]">
                    Target NSQF Level {course.targetNsqfLevel}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-[#0d1c2f] leading-snug mt-1">{course.title}</h4>

                <div className="space-y-1 my-3 text-xs text-[#444651]">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-bold text-[#0d1c2f]">{course.durationHours} Hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Mode:</span>
                    <span className="font-bold text-[#0051d5]">{course.deliveryMode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wage Potential:</span>
                    <span className="font-bold text-[#003212] font-mono">{course.wagePremiumPotential}</span>
                  </div>
                </div>

                {course.subsidyEligible && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#e6eeff] text-[#003212] text-[10px] font-bold">
                    <span className="material-symbols-outlined text-[12px]">check</span>
                    Government DBT Subsidy Funded
                  </span>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-[#dde9ff]">
                <button
                  onClick={() => onEnrollCourse(course)}
                  className="w-full py-1.5 rounded bg-[#00236f] hover:bg-[#1e3a8a] text-white text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">school</span>
                  <span>Enroll in Bridge Course</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
