import React, { useState, useEffect, useRef } from 'react';
import { PortalMode, NavigationTab } from '../types';

interface HeaderProps {
  portalMode: PortalMode;
  onPortalModeChange: (mode: PortalMode) => void;
  currentCycle: string;
  onCycleChange: (cycle: string) => void;
  currentScope: string;
  onScopeChange: (scope: string) => void;
  unreadAlertCount: number;
  onNotificationClick: () => void;
  onOfficerProfileClick: () => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
  onSearchNavigate?: (tab: NavigationTab) => void;
}

const SEARCH_INDEX: { label: string; tab: NavigationTab; keywords: string[] }[] = [
  { label: 'Overview & Outcomes', tab: 'overview-and-outcomes', keywords: ['overview', 'outcomes', 'kpi', 'longitudinal', 'alerts', 'directives'] },
  { label: 'Skill Gaps & Demand', tab: 'skill-gaps-and-demand', keywords: ['skill', 'gap', 'demand', 'sector', 'deficit', 'curriculum'] },
  { label: 'District & Provider Matrix', tab: 'district-and-provider-matrix', keywords: ['district', 'provider', 'matrix', 'performance', 'nodal'] },
  { label: 'Follow-up Micro-Surveys', tab: 'micro-survey', keywords: ['survey', 'micro', 'ivr', 'whatsapp', 'call', 'feedback', 'grievance'] },
  { label: 'Wage Progression Timeline', tab: 'wage-timeline', keywords: ['wage', 'salary', 'progression', 'timeline', 'employment', 'epfo'] },
  { label: 'Skill Profile & Upskilling', tab: 'skill-profile', keywords: ['skill profile', 'upskilling', 'competency', 'nsqf', 'recommended'] },
  { label: 'Statutory Audit & Ledger', tab: 'statutory-audit-and-compliance', keywords: ['audit', 'ledger', 'statutory', 'compliance', 'cryptographic', 'sealed'] },
  { label: 'Batch & Cohort Management', tab: 'batch-management', keywords: ['batch', 'cohort', 'enrollment', 'biometric', 'tranche', 'form 12c'] },
  { label: 'Employer Verification', tab: 'employer-verification', keywords: ['employer', 'verification', 'hr', 'offer letter', 'wage confirmation'] },
  { label: 'Tranche Invoicing & PFMS', tab: 'tranche-invoicing', keywords: ['tranche', 'invoice', 'pfms', 'disbursement', 'rule 14b', 'payment'] },
  { label: 'Center Inspection & Audit', tab: 'center-inspection', keywords: ['center', 'inspection', 'audit', 'cctv', 'safety', 'show cause'] },
  { label: 'Evidence Submission', tab: 'evidence-submission', keywords: ['evidence', 'submission', 'response', 'cap', 'corrective'] },
];

export const Header: React.FC<HeaderProps> = ({
  portalMode,
  onPortalModeChange,
  currentCycle,
  onCycleChange,
  currentScope,
  onScopeChange,
  unreadAlertCount,
  onNotificationClick,
  onOfficerProfileClick,
  darkMode,
  onDarkModeToggle,
  onSearchNavigate,
}) => {
  const [cycleDropdownOpen, setCycleDropdownOpen] = useState(false);
  const [scopeDropdownOpen, setScopeDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof SEARCH_INDEX>([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const cycles = ['FY 2024-25', 'FY 2023-24', 'FY 2022-23', 'FY 2025-26 (Provisional)'];
  const scopes = [
    'Pan-India / All Districts',
    'Maharashtra State (36 Districts)',
    'Solapur Rural & Urban Cluster',
    'Pune Metropolitan Region',
    'Aspirational Districts Cohort'
  ];

  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const results = SEARCH_INDEX.filter(item =>
      item.label.toLowerCase().includes(q) ||
      item.keywords.some(k => k.includes(q))
    );
    setSearchResults(results);
  }, [searchQuery]);

  // Close search on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearchSelect = (tab: NavigationTab) => {
    onSearchNavigate?.(tab);
    setSearchQuery('');
    setSearchResults([]);
    setSearchFocused(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#00236f] shadow-[0_1px_8px_rgba(0,0,0,0.18)]">
      {/* Top Header Bar — fixed 64px height to prevent nav overlap */}
      <div className="h-16 w-full px-3 sm:px-5 lg:px-8 flex items-center justify-between gap-3 overflow-hidden">

        {/* Left Branding — fixed width, no overflow */}
        <div className="flex items-center gap-3 min-w-0 flex-shrink-0">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white text-[#00236f] ring-2 ring-[#d5e3fd] shadow-sm flex-shrink-0">
            <span className="material-symbols-outlined text-[22px]">
              {portalMode === 'ministry-engine' ? 'account_balance' : 'domain'}
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 flex-nowrap">
              <span className="text-sm sm:text-base font-bold text-white tracking-tight whitespace-nowrap">HireBound</span>
              <span className="text-white/60 text-sm font-light hidden sm:inline">|</span>
              <span className="text-[11px] sm:text-xs text-white/90 font-medium whitespace-nowrap hidden sm:inline">
                {portalMode === 'ministry-engine'
                  ? 'Longitudinal Outcome Engine'
                  : 'Provider Operational Portal'}
              </span>
            </div>
            <div className="flex items-center gap-1 mt-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#95f8a7] flex-shrink-0"></span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-wide text-white/70 font-semibold whitespace-nowrap truncate max-w-[220px]">
                {portalMode === 'ministry-engine'
                  ? 'Ministry of Skill Development & Livelihood Analytics'
                  : 'Empanelled Vocational Center · Rule 14(b)'}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Portal Switcher + Search */}
        <div className="hidden md:flex items-center gap-3 flex-1 justify-center min-w-0">
          {/* Portal Switcher */}
          <div className="flex items-center bg-[#00174e] p-0.5 rounded-lg border border-[#264191] flex-shrink-0">
            <button
              onClick={() => onPortalModeChange('ministry-engine')}
              className={`px-2.5 py-1.5 rounded text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                portalMode === 'ministry-engine'
                  ? 'bg-[#0051d5] text-white shadow-xs'
                  : 'text-[#90a8ff] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">account_balance</span>
              <span className="whitespace-nowrap">Ministry Engine</span>
            </button>
            <button
              onClick={() => onPortalModeChange('provider-portal')}
              className={`px-2.5 py-1.5 rounded text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                portalMode === 'provider-portal'
                  ? 'bg-[#0051d5] text-white shadow-xs'
                  : 'text-[#90a8ff] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">domain</span>
              <span className="whitespace-nowrap">Provider Portal</span>
            </button>
          </div>

          {/* Global Search Bar */}
          <div className="relative flex-1 max-w-[280px]" ref={searchRef}>
            <div className="flex items-center bg-[#1e3a8a]/70 rounded border border-[#264191]/60 hover:border-[#4b6fd4]/60 focus-within:border-[#90a8ff] transition-colors">
              <span className="material-symbols-outlined text-[#90a8ff] text-[16px] ml-2.5">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                placeholder="Search screens, features…"
                className="w-full bg-transparent text-white text-xs placeholder-[#90a8ff]/60 px-2 py-2 outline-none"
                id="hb-global-search"
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(''); setSearchResults([]); }}
                  className="mr-2 text-[#90a8ff] hover:text-white cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[15px]">close</span>
                </button>
              )}
            </div>

            {/* Search Dropdown */}
            {searchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded shadow-xl border border-[#dde9ff] z-50 overflow-hidden animate-hb-fade-in">
                {searchResults.map(result => (
                  <button
                    key={result.tab}
                    onClick={() => handleSearchSelect(result.tab)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-[#eff4ff] text-left transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#0051d5]">arrow_forward</span>
                    <span className="text-xs text-[#0d1c2f] font-medium">{result.label}</span>
                  </button>
                ))}
              </div>
            )}
            {searchFocused && searchQuery.length >= 2 && searchResults.length === 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded shadow-xl border border-[#dde9ff] z-50 px-3 py-2 text-xs text-[#444651] animate-hb-fade-in">
                No screens found for "{searchQuery}"
              </div>
            )}
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Mobile Portal Switcher */}
          <div className="flex md:hidden">
            <button
              onClick={() => onPortalModeChange(portalMode === 'ministry-engine' ? 'provider-portal' : 'ministry-engine')}
              className="px-2 py-1 rounded bg-[#1e3a8a] text-white text-[10px] font-semibold border border-[#264191] whitespace-nowrap cursor-pointer"
            >
              {portalMode === 'ministry-engine' ? 'Provider' : 'Ministry'}
            </button>
          </div>

          {/* Cycle Selector */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => { setCycleDropdownOpen(!cycleDropdownOpen); setScopeDropdownOpen(false); }}
              className="flex items-center bg-[#1e3a8a] px-2 py-1.5 rounded border border-[#264191]/40 hover:bg-[#264191]/60 transition-colors text-white text-xs cursor-pointer gap-1"
              title="Select Statutory Financial Cycle"
            >
              <span className="material-symbols-outlined text-[#90a8ff] text-[16px]">calendar_today</span>
              <span className="text-[9px] text-[#90a8ff] uppercase font-bold">Cycle</span>
              <span className="text-[11px] text-white font-semibold whitespace-nowrap">{currentCycle}</span>
              <span className="material-symbols-outlined text-[#90a8ff] text-[14px]">arrow_drop_down</span>
            </button>
            {cycleDropdownOpen && (
              <div className="absolute right-0 mt-1 w-52 rounded bg-white shadow-lg py-1 z-50 border border-[#c5c5d3]">
                {cycles.map(c => (
                  <button
                    key={c}
                    onClick={() => { onCycleChange(c); setCycleDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 text-xs cursor-pointer ${
                      c === currentCycle ? 'bg-[#eff4ff] text-[#00236f] font-bold' : 'text-[#0d1c2f] hover:bg-[#f8f9ff]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Scope Selector */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => { setScopeDropdownOpen(!scopeDropdownOpen); setCycleDropdownOpen(false); }}
              className="flex items-center bg-[#1e3a8a] px-2 py-1.5 rounded border border-[#264191]/40 hover:bg-[#264191]/60 transition-colors text-white text-xs cursor-pointer gap-1"
              title="Select Administrative Geographic Scope"
            >
              <span className="material-symbols-outlined text-[#90a8ff] text-[16px]">location_on</span>
              <span className="text-[9px] text-[#90a8ff] uppercase font-bold">Scope</span>
              <span className="text-[11px] text-white font-semibold truncate max-w-[120px]">{currentScope}</span>
              <span className="material-symbols-outlined text-[#90a8ff] text-[14px]">arrow_drop_down</span>
            </button>
            {scopeDropdownOpen && (
              <div className="absolute right-0 mt-1 w-64 rounded bg-white shadow-lg py-1 z-50 border border-[#c5c5d3]">
                {scopes.map(s => (
                  <button
                    key={s}
                    onClick={() => { onScopeChange(s); setScopeDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 text-xs cursor-pointer ${
                      s === currentScope ? 'bg-[#eff4ff] text-[#00236f] font-bold' : 'text-[#0d1c2f] hover:bg-[#f8f9ff]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={onDarkModeToggle}
            className="p-1.5 rounded bg-[#1e3a8a] text-white hover:bg-[#264191]/60 transition-colors cursor-pointer"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">
              {darkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Notification Button */}
          <button
            onClick={onNotificationClick}
            className="relative p-1.5 rounded bg-[#1e3a8a] text-white hover:bg-[#264191]/60 transition-colors cursor-pointer"
            type="button"
            title="View Statutory Directives & Alerts"
          >
            <span className="material-symbols-outlined text-[18px]">notifications</span>
            {unreadAlertCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ba1a1a] text-[9px] text-white font-bold leading-none animate-pulse">
                {unreadAlertCount}
              </span>
            )}
          </button>

          {/* Officer Persona — fixed clipping with flex-shrink-0 and min-w-0 */}
          <button
            onClick={onOfficerProfileClick}
            className="flex items-center gap-2 pl-2 border-l border-[#264191]/50 text-left hover:opacity-90 transition-opacity cursor-pointer flex-shrink-0"
            title="Nodal Officer Credentials & Digital Certificate"
          >
            <div className="hidden sm:flex flex-col text-right min-w-0">
              <span className="text-[11px] text-white font-semibold leading-tight whitespace-nowrap">
                {portalMode === 'ministry-engine' ? 'Rajesh Verma, IAS' : 'Dr. M. S. Patwardhan'}
              </span>
              <span className="text-[9px] text-white/70 whitespace-nowrap">
                {portalMode === 'ministry-engine' ? 'Joint Director, Skill Outcomes' : 'Head of Ops · Yuva Council'}
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#00236f] flex items-center justify-center ring-1 ring-[#d5e3fd] text-white flex-shrink-0">
              <span className="material-symbols-outlined text-[16px]">
                {portalMode === 'ministry-engine' ? 'person' : 'badge'}
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
