import React from 'react';
import { PortalMode, NavigationTab } from '../types';

interface NavigationProps {
  portalMode: PortalMode;
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ portalMode, activeTab, onTabChange }) => {
  const ministryTabs: { id: NavigationTab; label: string; badge?: string }[] = [
    { id: 'overview-and-outcomes', label: '1. Overview & Outcomes' },
    { id: 'skill-gaps-and-demand', label: '2. Skill Gaps & Demand', badge: '2.4x Gap' },
    { id: 'district-and-provider-matrix', label: '3. District & Provider Matrix' },
    { id: 'micro-survey', label: '4. Follow-up Micro-Surveys', badge: 'Pulse' },
    { id: 'wage-timeline', label: '5. Wage Progression Timeline', badge: '180D' },
    { id: 'skill-profile', label: '6. Skill Profile & Upskilling', badge: 'NSQF' },
    { id: 'statutory-audit-and-compliance', label: '7. Statutory Audit & Ledger' }
  ];

  const providerTabs: { id: NavigationTab; label: string; badge?: string }[] = [
    { id: 'batch-management', label: 'Batch & Cohort Management', badge: 'BAT-2024-0842' },
    { id: 'employer-verification', label: 'Employer Verification & Wage Confirmation' },
    { id: 'tranche-invoicing', label: 'Tranche Invoicing & PFMS Ledger', badge: 'Rule 14b' },
    { id: 'center-inspection', label: 'District Nodal Audit & Inspections' },
    { id: 'evidence-submission', label: 'Center Response & Evidence Submission', badge: 'Rejoinder' }
  ];

  const currentTabs = portalMode === 'ministry-engine' ? ministryTabs : providerTabs;

  return (
    <nav className="h-12 w-full px-4 sm:px-6 lg:px-8 bg-[#1e3a8a] flex items-center gap-4 sm:gap-6 border-t border-[#264191]/40 overflow-x-auto scrollbar-none">
      {currentTabs.map(item => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`h-full flex items-center gap-1.5 text-xs sm:text-sm whitespace-nowrap transition-all border-b-2 cursor-pointer ${
              isActive
                ? 'border-white text-white font-semibold'
                : 'border-transparent text-[#90a8ff] hover:text-white font-normal'
            }`}
          >
            <span>{item.label}</span>
            {item.badge && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                isActive ? 'bg-white text-[#00236f]' : 'bg-[#0051d5] text-white'
              }`}>
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
