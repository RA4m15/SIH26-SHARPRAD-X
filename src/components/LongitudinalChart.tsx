import React, { useState } from 'react';
import { InclusionSegment } from '../types';

interface LongitudinalChartProps {
  currentSegment?: InclusionSegment;
  onSegmentChange?: (segment: InclusionSegment) => void;
}

interface MilestonePoint {
  id: string;
  label: string;
  dayText: string;
  x: number;
  placementY: number;
  placementVal: string;
  wageY: number;
  wageVal: string;
  activeTrainees: number;
  epfoSyncRate: number;
  pfmsAudit: string;
  avgWageNum: number;
}

export const LongitudinalChart: React.FC<LongitudinalChartProps> = ({
  currentSegment = 'All',
  onSegmentChange
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Milestone points data matching the SVG coords:
  // X coords: 110 (1M), 270 (3M), 430 (6M), 590 (12M)
  // Viewbox: 0 0 700 240
  const milestones: MilestonePoint[] = [
    {
      id: '1m',
      label: '1 Month',
      dayText: 'T+30 Days (1M)',
      x: 110,
      placementY: 116,
      placementVal: '42% Placed',
      wageY: 165,
      wageVal: '₹12,800',
      activeTrainees: 8742,
      epfoSyncRate: 99.4,
      pfmsAudit: 'Initial Onboarding Cleared',
      avgWageNum: 12800
    },
    {
      id: '3m',
      label: '3 Months',
      dayText: 'T+90 Days (3M)',
      x: 270,
      placementY: 80,
      placementVal: '58% Placed',
      wageY: 125,
      wageVal: '₹14,900',
      activeTrainees: 7810,
      epfoSyncRate: 98.1,
      pfmsAudit: 'Q1 ESIC Contribution Match',
      avgWageNum: 14900
    },
    {
      id: '6m',
      label: '6 Months',
      dayText: 'T+180 Days (6M)',
      x: 430,
      placementY: 38,
      placementVal: '74% Placed',
      wageY: 68,
      wageVal: '₹17,400',
      activeTrainees: 6469,
      epfoSyncRate: 97.6,
      pfmsAudit: 'Tranche 2 Bonus Triggered',
      avgWageNum: 17400
    },
    {
      id: '12m',
      label: '12 Months',
      dayText: 'T+365 Days (12M)',
      x: 590,
      placementY: 28,
      placementVal: '78% Retained',
      wageY: 26,
      wageVal: '₹19,800',
      activeTrainees: 5824,
      epfoSyncRate: 96.8,
      pfmsAudit: 'Annual Longitudinal Maturity',
      avgWageNum: 19800
    }
  ];

  return (
    <section className="bg-white p-4 sm:p-6 rounded shadow-xs border border-[#dde9ff] flex flex-col justify-between">
      <div>
        {/* Header and Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#eff4ff]">
          <div>
            <h3 className="text-base font-semibold text-[#0d1c2f]">
              Longitudinal Employment &amp; Wage Progression
            </h3>
            <p className="text-xs text-[#444651] mt-0.5">
              Verified trajectory across mandatory statutory cohorts at 1, 3, 6, and 12-Month horizons
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-xs text-[#0d1c2f] font-medium">
              <span className="w-3 h-1 bg-[#0051d5] rounded-full"></span> Placement Rate (%)
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-[#0d1c2f] font-medium">
              <span className="w-3 h-1 bg-[#003212] rounded-full"></span> Avg Monthly Wage (₹)
            </span>
          </div>
        </div>

        {/* Dual Axis SVG Visualization */}
        <div className="relative w-full h-[280px] mt-4 select-none">
          <svg
            className="w-full h-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 700 240"
          >
            {/* Horizontal Grid Lines */}
            <line className="text-[#dde9ff]" stroke="currentColor" strokeDasharray="3 3" strokeWidth="1" x1="60" x2="640" y1="20" y2="20" />
            <line className="text-[#dde9ff]" stroke="currentColor" strokeDasharray="3 3" strokeWidth="1" x1="60" x2="640" y1="70" y2="70" />
            <line className="text-[#dde9ff]" stroke="currentColor" strokeDasharray="3 3" strokeWidth="1" x1="60" x2="640" y1="120" y2="120" />
            <line className="text-[#dde9ff]" stroke="currentColor" strokeDasharray="3 3" strokeWidth="1" x1="60" x2="640" y1="170" y2="170" />
            <line className="text-[#c5c5d3]" stroke="currentColor" strokeWidth="1.5" x1="60" x2="640" y1="210" y2="210" />

            {/* Left Axis Labels (% Placement) */}
            <text className="fill-current text-[#444651] text-[11px] font-semibold" x="20" y="25">80%</text>
            <text className="fill-current text-[#444651] text-[11px] font-semibold" x="20" y="75">60%</text>
            <text className="fill-current text-[#444651] text-[11px] font-semibold" x="20" y="125">40%</text>
            <text className="fill-current text-[#444651] text-[11px] font-semibold" x="20" y="175">20%</text>

            {/* Right Axis Labels (Wage in Thousands) */}
            <text className="fill-current text-[#003212] text-[11px] font-semibold font-mono" x="648" y="25">₹20k</text>
            <text className="fill-current text-[#003212] text-[11px] font-semibold font-mono" x="648" y="75">₹17k</text>
            <text className="fill-current text-[#003212] text-[11px] font-semibold font-mono" x="648" y="125">₹14k</text>
            <text className="fill-current text-[#003212] text-[11px] font-semibold font-mono" x="648" y="175">₹11k</text>

            {/* Vertical milestone guideline on hover */}
            {hoveredIndex !== null && (
              <line
                x1={milestones[hoveredIndex].x}
                x2={milestones[hoveredIndex].x}
                y1="10"
                y2="210"
                stroke="#316bf3"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="opacity-70"
              />
            )}

            {/* Line 1: Wage Progression (₹12,800 -> ₹14,900 -> ₹17,400 -> ₹19,800) */}
            <polyline
              className="text-[#003212]"
              fill="none"
              points="110,165 270,125 430,68 590,26"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />

            {/* Wage Data Nodes */}
            {milestones.map((m, idx) => (
              <g
                key={`wage-${m.id}`}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <circle
                  className="fill-white stroke-[#003212] transition-transform hover:scale-125"
                  cx={m.x}
                  cy={m.wageY}
                  r={hoveredIndex === idx ? 6 : 4.5}
                  strokeWidth="2.5"
                />
                <text
                  className="fill-current text-[#003212] text-[11px] font-bold font-mono"
                  textAnchor="middle"
                  x={m.x}
                  y={m.wageY - 12}
                >
                  {m.wageVal}
                </text>
              </g>
            ))}

            {/* Line 2: Employment Rate Progression (42% -> 58% -> 74% -> 78%) */}
            <polyline
              className="text-[#0051d5]"
              fill="none"
              points="110,116 270,80 430,38 590,28"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />

            {/* Placement Data Nodes */}
            {milestones.map((m, idx) => (
              <g
                key={`placement-${m.id}`}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <circle
                  className="fill-white stroke-[#0051d5] transition-transform hover:scale-125"
                  cx={m.x}
                  cy={m.placementY}
                  r={hoveredIndex === idx ? 6 : 4.5}
                  strokeWidth="2.5"
                />
                <text
                  className="fill-current text-[#0051d5] text-[11px] font-bold"
                  textAnchor="middle"
                  x={m.x}
                  y={m.placementY + (idx === 2 ? -14 : 18)}
                >
                  {m.placementVal}
                </text>
              </g>
            ))}

            {/* X-Axis Milestone Labels */}
            {milestones.map((m, idx) => (
              <text
                key={`label-${m.id}`}
                className={`fill-current text-xs font-semibold cursor-pointer ${
                  hoveredIndex === idx ? 'text-[#00236f] underline' : 'text-[#0d1c2f]'
                }`}
                textAnchor="middle"
                x={m.x}
                y="230"
                onClick={() => setHoveredIndex(hoveredIndex === idx ? null : idx)}
              >
                {m.dayText}
              </text>
            ))}
          </svg>

          {/* Interactive Hover Tooltip card overlay */}
          {hoveredIndex !== null && (
            <div
              className="absolute bg-white/95 backdrop-blur-xs border border-[#00236f] shadow-lg rounded p-2.5 z-20 text-xs pointer-events-none transition-all"
              style={{
                left: `${(milestones[hoveredIndex].x / 700) * 100}%`,
                top: '40px',
                transform: 'translateX(-50%)'
              }}
            >
              <div className="font-bold text-[#00236f] border-b border-[#dde9ff] pb-1 mb-1">
                {milestones[hoveredIndex].dayText} Milestone
              </div>
              <div className="flex justify-between gap-4 text-[11px]">
                <span className="text-[#444651]">Active Trainees:</span>
                <span className="font-mono font-bold text-[#0d1c2f]">
                  {milestones[hoveredIndex].activeTrainees.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between gap-4 text-[11px]">
                <span className="text-[#444651]">Avg Monthly Wage:</span>
                <span className="font-mono font-bold text-[#003212]">
                  {milestones[hoveredIndex].wageVal}
                </span>
              </div>
              <div className="flex justify-between gap-4 text-[11px]">
                <span className="text-[#444651]">EPFO Verification:</span>
                <span className="font-mono font-bold text-[#0051d5]">
                  {milestones[hoveredIndex].epfoSyncRate}%
                </span>
              </div>
              <div className="text-[10px] text-[#444651] mt-1 bg-[#eff4ff] p-1 rounded">
                Audit: {milestones[hoveredIndex].pfmsAudit}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Outcome Interpretation Metadata */}
      <div className="mt-4 p-3 rounded bg-[#e6eeff] flex flex-wrap items-center justify-between gap-3 border border-[#dde9ff]">
        <div className="flex items-center gap-2 text-xs text-[#0d1c2f]">
          <span className="material-symbols-outlined text-[16px] text-[#003212]">check_circle</span>
          <span>
            <strong>Observation:</strong> 6-month retention reaches statistical maturity with{' '}
            <span className="text-[#003212] font-semibold">+54.7% wage increment</span> over baseline.
          </span>
        </div>
        <span className="text-[11px] text-[#444651] font-mono font-semibold">
          Cohort Sample N=8,742
        </span>
      </div>
    </section>
  );
};
