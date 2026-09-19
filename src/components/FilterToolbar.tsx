import React, { useState } from 'react';
import { FilterState, InclusionSegment } from '../types';

interface FilterToolbarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onSaveView: () => void;
  onExportReport: (format: 'pdf' | 'xlsx' | 'csv') => void;
}

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  filters,
  onFilterChange,
  onSaveView,
  onExportReport
}) => {
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <section className="filter-toolbar w-full bg-[#eff4ff] px-4 sm:px-6 lg:px-8 py-2.5 shadow-xs border-b border-[#dde9ff]">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-2.5">
        {/* Title Bar & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#00236f]"></div>
            <span className="text-sm font-semibold text-[#00236f]">Executive Outcome Intelligence</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#dde9ff] text-[#444651] font-mono font-medium">
              MSDE-EWS-SEC-24
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Collapse Toggle */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-white text-[#444651] shadow-xs hover:bg-[#e6eeff] hover:text-[#00236f] transition-colors text-xs font-semibold border border-[#dde9ff] cursor-pointer"
              type="button"
              title={collapsed ? 'Show Filters' : 'Hide Filters'}
            >
              <span className="material-symbols-outlined text-[15px]">
                {collapsed ? 'expand_more' : 'expand_less'}
              </span>
              <span className="hidden sm:inline">{collapsed ? 'Show Filters' : 'Hide Filters'}</span>
            </button>

            {/* Save View */}
            <button
              onClick={onSaveView}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white text-[#00236f] shadow-xs hover:bg-[#e6eeff] transition-colors text-xs font-semibold border border-[#dde9ff] cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[15px]">tune</span>
              <span className="hidden sm:inline">Save View</span>
            </button>

            {/* Export Dropdown */}
            <div className="relative inline-block text-left">
              <button
                onClick={() => setExportMenuOpen(!exportMenuOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#00236f] text-white shadow-xs hover:bg-[#1e3a8a] transition-colors text-xs font-semibold cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span className="hidden sm:inline">Export Report</span>
                <span className="sm:hidden">Export</span>
                <span className="material-symbols-outlined text-[15px]">arrow_drop_down</span>
              </button>

              {exportMenuOpen && (
                <div
                  className="absolute right-0 mt-1 w-64 rounded bg-white shadow-xl py-1 z-50 border border-[#c5c5d3] animate-hb-fade-in"
                  onMouseLeave={() => setExportMenuOpen(false)}
                >
                  <button
                    onClick={() => { onExportReport('pdf'); setExportMenuOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-[#0d1c2f] hover:bg-[#eff4ff] text-left text-xs transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[17px] text-[#ba1a1a]">picture_as_pdf</span>
                    <div>
                      <div className="font-semibold">Gazetted Longitudinal Summary</div>
                      <div className="text-[10px] text-[#444651]">Formal Nodal Officer Signoff (PDF)</div>
                    </div>
                  </button>

                  <button
                    onClick={() => { onExportReport('xlsx'); setExportMenuOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-[#0d1c2f] hover:bg-[#eff4ff] text-left text-xs transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[17px] text-[#003212]">table_view</span>
                    <div>
                      <div className="font-semibold">Trainee Micro-Data Registry</div>
                      <div className="text-[10px] text-[#444651]">Candidate Level EPFO/ESIC Audit (XLSX)</div>
                    </div>
                  </button>

                  <button
                    onClick={() => { onExportReport('csv'); setExportMenuOpen(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-[#0d1c2f] hover:bg-[#eff4ff] text-left text-xs transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[17px] text-[#0051d5]">verified</span>
                    <div>
                      <div className="font-semibold">Statutory PFMS Proof of Retention</div>
                      <div className="text-[10px] text-[#444651]">180-Day Banking Direct Credits (CSV)</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filter Controls — collapsible */}
        {!collapsed && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 items-center bg-white p-2.5 rounded shadow-xs border border-[#dde9ff]">
            {/* Reporting Cycle */}
            <div className="flex flex-col">
              <label className="text-[10px] font-semibold text-[#444651] mb-1 uppercase tracking-wide">Reporting Cycle</label>
              <div className="relative">
                <select
                  value={filters.reportingCycle}
                  onChange={e => onFilterChange({ reportingCycle: e.target.value })}
                  className="w-full bg-[#eff4ff] text-[#0d1c2f] text-xs rounded px-2.5 py-1.5 pr-7 appearance-none focus:outline-none focus:bg-[#dde9ff] border border-transparent hover:border-[#c5c5d3] cursor-pointer"
                >
                  <option value="Last 12 Months (FY24)">Last 12 Months (FY24)</option>
                  <option value="Q1 FY 2024-25">Q1 FY 2024-25</option>
                  <option value="Q2 FY 2024-25">Q2 FY 2024-25</option>
                  <option value="Q3 FY 2023-24">Q3 FY 2023-24</option>
                  <option value="Q4 FY 2023-24">Q4 FY 2023-24</option>
                </select>
                <span className="material-symbols-outlined absolute right-1.5 top-1.5 pointer-events-none text-[#444651] text-[15px]">
                  expand_more
                </span>
              </div>
            </div>

            {/* State Selector */}
            <div className="flex flex-col">
              <label className="text-[10px] font-semibold text-[#444651] mb-1 uppercase tracking-wide">State Nodal Scope</label>
              <div className="relative">
                <select
                  value={filters.stateNodalScope}
                  onChange={e => onFilterChange({ stateNodalScope: e.target.value })}
                  className="w-full bg-[#eff4ff] text-[#0d1c2f] text-xs rounded px-2.5 py-1.5 pr-7 appearance-none focus:outline-none focus:bg-[#dde9ff] border border-transparent hover:border-[#c5c5d3] cursor-pointer font-medium"
                >
                  <option value="All States (National)">All States (National)</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                </select>
                <span className="material-symbols-outlined absolute right-1.5 top-1.5 pointer-events-none text-[#444651] text-[15px]">
                  expand_more
                </span>
              </div>
            </div>

            {/* District Filter */}
            <div className="flex flex-col">
              <label className="text-[10px] font-semibold text-[#444651] mb-1 uppercase tracking-wide">District Scope</label>
              <div className="relative">
                <select
                  value={filters.districtScope}
                  onChange={e => onFilterChange({ districtScope: e.target.value })}
                  className="w-full bg-[#eff4ff] text-[#0d1c2f] text-xs rounded px-2.5 py-1.5 pr-7 appearance-none focus:outline-none focus:bg-[#dde9ff] border border-transparent hover:border-[#c5c5d3] cursor-pointer font-medium"
                >
                  <option value="All Districts (36)">All Districts (36)</option>
                  <option value="Pune Division">Pune Division</option>
                  <option value="Solapur Rural & Urban">Solapur Rural & Urban</option>
                  <option value="Nagpur Industrial">Nagpur Industrial</option>
                  <option value="Thane Metropol">Thane Metropol</option>
                </select>
                <span className="material-symbols-outlined absolute right-1.5 top-1.5 pointer-events-none text-[#444651] text-[15px]">
                  expand_more
                </span>
              </div>
            </div>

            {/* Sector / Course Category */}
            <div className="flex flex-col">
              <label className="text-[10px] font-semibold text-[#444651] mb-1 uppercase tracking-wide">Sector / Category</label>
              <div className="relative">
                <select
                  value={filters.sectorCategory}
                  onChange={e => onFilterChange({ sectorCategory: e.target.value })}
                  className="w-full bg-[#eff4ff] text-[#0d1c2f] text-xs rounded px-2.5 py-1.5 pr-7 appearance-none focus:outline-none focus:bg-[#dde9ff] border border-transparent hover:border-[#c5c5d3] cursor-pointer font-medium"
                >
                  <option value="All Skill Sectors (24)">All Skill Sectors (24)</option>
                  <option value="Green Energy & Solar">Green Energy & Solar</option>
                  <option value="IT-ITeS & Telephony">IT-ITeS & Telephony</option>
                  <option value="Healthcare & Allied">Healthcare & Allied</option>
                  <option value="Logistics & Supply Chain">Logistics & Supply Chain</option>
                </select>
                <span className="material-symbols-outlined absolute right-1.5 top-1.5 pointer-events-none text-[#444651] text-[15px]">
                  expand_more
                </span>
              </div>
            </div>

            {/* Training Provider */}
            <div className="flex flex-col">
              <label className="text-[10px] font-semibold text-[#444651] mb-1 uppercase tracking-wide">Provider Agency</label>
              <div className="relative">
                <select
                  value={filters.providerAgency}
                  onChange={e => onFilterChange({ providerAgency: e.target.value })}
                  className="w-full bg-[#eff4ff] text-[#0d1c2f] text-xs rounded px-2.5 py-1.5 pr-7 appearance-none focus:outline-none focus:bg-[#dde9ff] border border-transparent hover:border-[#c5c5d3] cursor-pointer font-medium"
                >
                  <option value="All Empanelled (142)">All Empanelled (142)</option>
                  <option value="Yuva Skill Council">Yuva Skill Council</option>
                  <option value="National Power Skill Hub">National Power Skill Hub</option>
                  <option value="Aarogya Foundation">Aarogya Foundation</option>
                  <option value="Apex Technical Institutes">Apex Technical Institutes</option>
                </select>
                <span className="material-symbols-outlined absolute right-1.5 top-1.5 pointer-events-none text-[#444651] text-[15px]">
                  expand_more
                </span>
              </div>
            </div>

            {/* Inclusion Segment Toggle — fixed wrapping with nowrap */}
            <div className="flex flex-col">
              <label className="text-[10px] font-semibold text-[#444651] mb-1 uppercase tracking-wide">Inclusion Segment</label>
              <div className="flex bg-[#eff4ff] rounded p-0.5 border border-[#dde9ff] overflow-hidden">
                {(['All', 'Female', 'SC/ST/OBC'] as InclusionSegment[]).map(seg => (
                  <button
                    key={seg}
                    type="button"
                    onClick={() => onFilterChange({ inclusionSegment: seg })}
                    className={`flex-1 py-1 text-center text-[10px] font-semibold rounded transition-all cursor-pointer whitespace-nowrap ${
                      filters.inclusionSegment === seg
                        ? 'bg-white text-[#00236f] shadow-xs'
                        : 'text-[#444651] hover:text-[#0d1c2f]'
                    }`}
                  >
                    {seg === 'Female' ? 'Female (48%)' : seg}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Collapsed summary bar */}
        {collapsed && (
          <div className="flex items-center gap-2 text-[11px] text-[#444651] flex-wrap">
            <span className="bg-white border border-[#dde9ff] px-2 py-0.5 rounded font-medium">{filters.reportingCycle}</span>
            <span>·</span>
            <span className="bg-white border border-[#dde9ff] px-2 py-0.5 rounded font-medium">{filters.stateNodalScope}</span>
            <span>·</span>
            <span className="bg-white border border-[#dde9ff] px-2 py-0.5 rounded font-medium">{filters.sectorCategory}</span>
            <span>·</span>
            <span className="bg-white border border-[#dde9ff] px-2 py-0.5 rounded font-medium text-[#0051d5]">
              Segment: {filters.inclusionSegment}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
