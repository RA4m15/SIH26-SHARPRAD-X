import React, { useState } from 'react';
import { PortalMode, NavigationTab } from '../types';

interface NavigationProps {
  portalMode: PortalMode;
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ portalMode, activeTab, onTabChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const ministryTabs: { id: NavigationTab; label: string; icon: string; badge?: string }[] = [
    { id: 'overview-and-outcomes',        label: 'Overview & Outcomes',       icon: 'dashboard',      },
    { id: 'skill-gaps-and-demand',        label: 'Skill Gaps & Demand',       icon: 'trending_up',    badge: '2.4x Gap' },
    { id: 'district-and-provider-matrix', label: 'District & Provider Matrix',icon: 'map',            },
    { id: 'micro-survey',                 label: 'Follow-up Surveys',         icon: 'chat_bubble',    badge: 'Pulse' },
    { id: 'wage-timeline',                label: 'Wage Progression',          icon: 'payments',       badge: '180D' },
    { id: 'skill-profile',                label: 'Skill Profile',             icon: 'person_pin',     badge: 'NSQF' },
    { id: 'statutory-audit-and-compliance', label: 'Statutory Audit',         icon: 'verified_user',  },
  ];

  const providerTabs: { id: NavigationTab; label: string; icon: string; badge?: string }[] = [
    { id: 'batch-management',    label: 'Batch & Cohort',      icon: 'groups',         badge: 'BAT-0842' },
    { id: 'employer-verification', label: 'Employer Verification', icon: 'business_center', },
    { id: 'tranche-invoicing',   label: 'Tranche & PFMS',      icon: 'receipt_long',   badge: 'Rule 14b' },
    { id: 'center-inspection',   label: 'Center Audit',        icon: 'fact_check',     },
    { id: 'evidence-submission', label: 'Evidence Submission', icon: 'upload_file',    badge: 'Rejoinder' },
  ];

  const currentTabs = portalMode === 'ministry-engine' ? ministryTabs : providerTabs;
  const activeItem = currentTabs.find(t => t.id === activeTab);

  return (
    <>
      {/* Desktop Nav — horizontal scrollable tab bar */}
      <nav className="hidden sm:flex h-12 w-full px-4 sm:px-6 lg:px-8 bg-[#1e3a8a] items-center gap-1 border-t border-[#264191]/40 overflow-x-auto scrollbar-none">
        {currentTabs.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`h-full flex items-center gap-1.5 px-3 text-xs whitespace-nowrap transition-all border-b-2 cursor-pointer flex-shrink-0 ${
                isActive
                  ? 'border-white text-white font-semibold'
                  : 'border-transparent text-[#90a8ff] hover:text-white font-normal'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                  isActive ? 'bg-white text-[#00236f]' : 'bg-[#0051d5] text-white'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Mobile Nav — current tab + hamburger dropdown */}
      <div className="flex sm:hidden h-12 w-full bg-[#1e3a8a] border-t border-[#264191]/40 items-center px-4 justify-between">
        {/* Current active tab indicator */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="material-symbols-outlined text-white text-[18px] flex-shrink-0">
            {activeItem?.icon || 'dashboard'}
          </span>
          <span className="text-white text-sm font-semibold truncate">{activeItem?.label}</span>
          {activeItem?.badge && (
            <span className="text-[10px] px-1.5 py-0.5 rounded font-bold bg-white text-[#00236f] flex-shrink-0">
              {activeItem.badge}
            </span>
          )}
        </div>

        {/* Hamburger toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center gap-1 text-[#90a8ff] hover:text-white transition-colors cursor-pointer flex-shrink-0 ml-2"
          type="button"
          aria-label="Toggle navigation menu"
        >
          <span className="text-[10px] font-semibold uppercase tracking-wide">All Screens</span>
          <span className="material-symbols-outlined text-[20px]">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed top-[112px] left-0 right-0 z-50 bg-[#1e3a8a] border-b border-[#264191] shadow-xl animate-hb-fade-in max-h-[60vh] overflow-y-auto">
          {currentTabs.map((item, idx) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { onTabChange(item.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 border-b border-[#264191]/40 cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-[#0051d5] text-white'
                    : 'text-[#90a8ff] hover:bg-[#264191]/40 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[20px] flex-shrink-0">{item.icon}</span>
                <div className="flex flex-col items-start min-w-0">
                  <span className="text-sm font-semibold">{`${idx + 1}. ${item.label}`}</span>
                </div>
                {item.badge && (
                  <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded font-bold flex-shrink-0 ${
                    isActive ? 'bg-white text-[#00236f]' : 'bg-[#0051d5] text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <span className="material-symbols-outlined text-[16px] text-white flex-shrink-0 ml-1">check</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
};
