import React, { useState } from 'react';
import { 
  PortalMode,
  NavigationTab, 
  FilterState, 
  EarlyWarningAlert, 
  CourseLeaderboardItem,
  KPIMetric,
  BatchRecord,
  CenterInspection,
  EmployerConfirmation,
  RecommendedCourse,
  MicroSurveyRecord,
  TrancheInvoice
} from './types';
import { 
  AUDIT_TRAIL_LOG,
  BATCHES_DATA,
  INITIAL_KPIS,
  INITIAL_ALERTS,
  COURSES_DATA
} from './data/mockData';
import { api } from './api/client';

// Header and Navigation
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { BreadcrumbsBar } from './components/BreadcrumbsBar';
import { FilterToolbar } from './components/FilterToolbar';

// Overview & Outcomes Components (Screen 1)
import { AlertsSection } from './components/AlertsSection';
import { KPIGrid } from './components/KPIGrid';
import { LongitudinalChart } from './components/LongitudinalChart';
import { RootCauseSection } from './components/RootCauseSection';
import { LeaderboardTable } from './components/LeaderboardTable';
import { StatutoryCertification } from './components/StatutoryCertification';
import { Footer } from './components/Footer';

// Ministry Screens
import { SkillGapsScreen } from './components/screens/SkillGapsScreen';
import { DistrictMatrixScreen } from './components/screens/DistrictMatrixScreen';
import { MicroSurveyScreen } from './components/screens/MicroSurveyScreen';
import { WageProgressionScreen } from './components/screens/WageProgressionScreen';
import { SkillProfileScreen } from './components/screens/SkillProfileScreen';
import { StatutoryAuditScreen } from './components/screens/StatutoryAuditScreen';

// Provider Operational Screens
import { BatchManagementScreen } from './components/screens/provider/BatchManagementScreen';
import { EmployerVerificationScreen } from './components/screens/provider/EmployerVerificationScreen';
import { TrancheInvoicingScreen } from './components/screens/provider/TrancheInvoicingScreen';
import { CenterInspectionScreen } from './components/screens/provider/CenterInspectionScreen';
import { CenterResponseScreen } from './components/screens/provider/CenterResponseScreen';

// Modals
import { ActionModal } from './components/modals/ActionModal';
import { CohortInspectModal } from './components/modals/CohortInspectModal';
import { ExportModal } from './components/modals/ExportModal';
import { AuditTrailModal } from './components/modals/AuditTrailModal';
import { JobPacksModal } from './components/modals/JobPacksModal';
import { KPIDrilldownModal } from './components/modals/KPIDrilldownModal';
import { NotificationsPopup, OfficerProfileModal } from './components/modals/HeaderPopups';
import { StatutoryDocModal } from './components/modals/StatutoryDocModal';

// Provider Operational Modals
import { Form12CModal } from './components/modals/provider/Form12CModal';
import { ESignSuccessModal } from './components/modals/provider/ESignSuccessModal';
import { ShowCauseModal } from './components/modals/provider/ShowCauseModal';
import { DBTBonusModal } from './components/modals/provider/DBTBonusModal';

import { LoginScreen } from './components/screens/LoginScreen';
import { useAuth } from './contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export default function App() {
  const { user, isLoading } = useAuth();

  // Portal Mode
  const [portalMode, setPortalMode] = React.useState<PortalMode>('ministry-engine');

  React.useEffect(() => {
    if (user) {
      setPortalMode(user.role === 'provider' ? 'provider-portal' : 'ministry-engine');
      if (user.role === 'provider') {
        setActiveTab('batch-management');
      } else {
        setActiveTab('overview-and-outcomes');
      }
    }
  }, [user]);

  // Navigation
  const [activeTab, setActiveTab] = useState<NavigationTab>('overview-and-outcomes');

  // Dark Mode
  const [darkMode, setDarkMode] = useState(false);
  const handleDarkModeToggle = () => {
    setDarkMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  // Header quick selectors
  const [currentCycle, setCurrentCycle] = useState('FY 2024-25');
  const [currentScope, setCurrentScope] = useState('Pan-India / All Districts');

  // Filter toolbar state
  const [filters, setFilters] = useState<FilterState>({
    reportingCycle: 'Last 12 Months (FY24)',
    stateNodalScope: 'Maharashtra',
    districtScope: 'Solapur Rural & Urban',
    sectorCategory: 'Green Energy & Solar',
    providerAgency: 'Yuva Skill Council',
    inclusionSegment: 'All',
  });

  // Data State
  const [kpis, setKpis] = useState<KPIMetric[]>([]);
  const [alerts, setAlerts] = useState<EarlyWarningAlert[]>([]);
  const [courses, setCourses] = useState<CourseLeaderboardItem[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  React.useEffect(() => {
    if (user) {
      const fetchData = async () => {
        setIsLoadingData(true);
        try {
          // Pass segment and cycle to KPIs API
          const kpiRes = await api.get<{ success: boolean; data: KPIMetric[] }>(
            `/kpis?segment=${encodeURIComponent(filters.inclusionSegment)}&cycle=${encodeURIComponent(filters.reportingCycle)}`
          );
          setKpis(kpiRes.data && kpiRes.data.length > 0 ? kpiRes.data : INITIAL_KPIS);

          const alertsRes = await api.get<{ success: boolean; data: EarlyWarningAlert[] }>('/kpis/alerts');
          setAlerts(alertsRes.data && alertsRes.data.length > 0 ? alertsRes.data : INITIAL_ALERTS);

          const coursesRes = await api.get<{ success: boolean; data: CourseLeaderboardItem[] }>('/courses');
          setCourses(coursesRes.data && coursesRes.data.length > 0 ? coursesRes.data : COURSES_DATA);
        } catch (err) {
          console.warn('Backend API unreachable from this connection, using statutory local data:', err);
          setKpis(INITIAL_KPIS);
          setAlerts(INITIAL_ALERTS);
          setCourses(COURSES_DATA);
        } finally {
          setIsLoadingData(false);
        }
      };
      fetchData();
    }
  }, [user, filters.inclusionSegment, filters.reportingCycle]);

  // General Modals state
  const [activeAlertForAction, setActiveAlertForAction] = useState<EarlyWarningAlert | null>(null);
  const [isSealLedgerModalOpen, setIsSealLedgerModalOpen] = useState(false);
  const [isLedgerSealed, setIsLedgerSealed] = useState(false);
  const [selectedCourseForInspect, setSelectedCourseForInspect] = useState<CourseLeaderboardItem | null>(null);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'xlsx' | 'csv' | null>(null);
  const [isAuditTrailOpen, setIsAuditTrailOpen] = useState(false);
  const [isJobPacksOpen, setIsJobPacksOpen] = useState(false);
  const [selectedKPIDrilldown, setSelectedKPIDrilldown] = useState<KPIMetric | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isOfficerProfileOpen, setIsOfficerProfileOpen] = useState(false);
  const [statutoryDocTitle, setStatutoryDocTitle] = useState<string | null>(null);

  // Provider Modals state
  const [form12CModalBatch, setForm12CModalBatch] = useState<BatchRecord | null>(null);
  const [eSignSuccessBatch, setESignSuccessBatch] = useState<BatchRecord | null>(null);
  const [showCauseModalInspection, setShowCauseModalInspection] = useState<CenterInspection | null>(null);
  const [dbtBonusModalBatch, setDbtBonusModalBatch] = useState<BatchRecord | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handlePortalSwitch = (mode: PortalMode) => {
    setPortalMode(mode);
    if (mode === 'ministry-engine') {
      setActiveTab('overview-and-outcomes');
      showToast('Switched to Ministry of Skill Development & Livelihood Analytics Engine.');
    } else {
      setActiveTab('batch-management');
      showToast('Switched to HireBound — Training Provider Operational Portal.');
    }
  };

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    if (newFilters.inclusionSegment) {
      showToast(`Applied Segment Filter: ${newFilters.inclusionSegment}`);
    } else if (newFilters.districtScope) {
      showToast(`Updated District Scope to ${newFilters.districtScope}`);
    } else {
      showToast('Filters refreshed against statutory registry.');
    }
  };

  const handleSaveView = () => {
    showToast('Current Executive Outcome Intelligence view pinned & saved to dashboard.');
  };

  const handleActionConfirm = async () => {
    if (activeAlertForAction) {
      try {
        await api.patch(`/kpis/alerts/${activeAlertForAction.id}/resolve`);
        // Refresh alerts
        const alertsRes = await api.get<{ success: boolean; data: EarlyWarningAlert[] }>('/kpis/alerts');
        setAlerts(alertsRes.data);
        
        setAlerts(prev => prev.map(a => 
          a.id === activeAlertForAction.id ? { ...a, status: 'resolved' } : a
        ));
        showToast(`Directive Executed: ${activeAlertForAction.actionLabel} registered successfully.`);
        setActiveAlertForAction(null);
      } catch (err) {
        console.error('Failed to resolve alert', err);
      }
    } else if (isSealLedgerModalOpen) {
      setIsLedgerSealed(true);
      setIsSealLedgerModalOpen(false);
      showToast('Quarterly outcome block cryptographically sealed pursuant to Rule 14(b).');
    }
  };

  const handleForm12CSuccess = (batch: BatchRecord) => {
    setForm12CModalBatch(null);
    setESignSuccessBatch(batch);
    showToast(`Form 12-C e-Signed successfully for Batch ${batch.batchId}. Digital certificate generated.`);
  };

  const handleShowCauseSubmitCAP = (noticeId: string) => {
    showToast(`CAP response submitted for Notice ${noticeId}. Transmission recorded with Nodal Directorate.`);
  };

  const handleDBTConfirm = (batchId: string) => {
    showToast(`Direct Benefit Transfer stipend authorized for Cohort ${batchId}. Dispatched to NPCI APBS.`);
  };

  const getSectionTitle = () => {
    if (portalMode === 'provider-portal') {
      switch (activeTab) {
        case 'batch-management':
          return 'Training Provider • Batch & Cohort Management';
        case 'employer-verification':
          return 'Training Provider • Employer Verification & Wage Confirmation';
        case 'tranche-invoicing':
          return 'Training Provider • Tranche Invoicing & PFMS Disbursement';
        case 'center-inspection':
          return 'Training Provider • District Nodal Audit & Inspections';
        case 'evidence-submission':
          return 'Training Provider • Center Response & Evidence Submission';
        default:
          return 'Training Provider Operational Portal';
      }
    }

    switch (activeTab) {
      case 'overview-and-outcomes':
        return 'Screen 1: Executive Overview & Longitudinal Outcomes';
      case 'skill-gaps-and-demand':
        return 'Screen 2: Skill Gaps & Demand Analytics Dashboard';
      case 'district-and-provider-matrix':
        return 'Screen 3: District & Provider Performance Matrix';
      case 'micro-survey':
        return 'Screen 4: Follow-up Micro-Survey Screen';
      case 'wage-timeline':
        return 'Screen 5: Employment & Wage Progression Timeline';
      case 'skill-profile':
        return 'Screen 6: Skill Profile & Recommended Upskilling';
      case 'statutory-audit-and-compliance':
        return 'Screen 7: Statutory Audit & Cryptographic Ledger';
      default:
        return 'Longitudinal Verification';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
      </div>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <div className="bg-[#f8f9ff] text-[#0d1c2f] antialiased min-h-screen flex flex-col font-sans relative">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#00236f] text-white px-4 py-2.5 rounded shadow-xl flex items-center gap-2 text-xs font-semibold border border-[#90a8ff]/40 animate-fadeIn">
          <span className="material-symbols-outlined text-[#95f8a7] text-[18px]">verified</span>
          <span>{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="ml-2 text-white/60 hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Fixed Header with Portal Switcher */}
      <Header
        portalMode={portalMode}
        onPortalModeChange={handlePortalSwitch}
        currentCycle={currentCycle}
        onCycleChange={cycle => {
          setCurrentCycle(cycle);
          showToast(`Switched Statutory Financial Cycle to ${cycle}`);
        }}
        currentScope={currentScope}
        onScopeChange={scope => {
          setCurrentScope(scope);
          showToast(`Updated Administrative Scope to ${scope}`);
        }}
        unreadAlertCount={alerts.length}
        onNotificationClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
        onOfficerProfileClick={() => setIsOfficerProfileOpen(true)}
        darkMode={darkMode}
        onDarkModeToggle={handleDarkModeToggle}
        onSearchNavigate={tab => {
          setActiveTab(tab);
          showToast(`Navigated to: ${tab.replace(/-/g, ' ')}`);
        }}
      />

      {/* Notifications Popover */}
      {isNotificationsOpen && (
        <NotificationsPopup
          alerts={alerts}
          onClose={() => setIsNotificationsOpen(false)}
          onSelectAlert={alert => {
            setActiveAlertForAction(alert);
            setIsNotificationsOpen(false);
          }}
        />
      )}

      {/* Officer Profile Modal */}
      {isOfficerProfileOpen && (
        <OfficerProfileModal onClose={() => setIsOfficerProfileOpen(false)} />
      )}

      {/* Secondary Nav Bar — top-16 = below 64px fixed header */}
      <div className="fixed top-16 left-0 w-full z-40">
        <Navigation
          portalMode={portalMode}
          activeTab={activeTab}
          onTabChange={tab => setActiveTab(tab)}
        />
      </div>

      {/* Breadcrumbs & Status Bar */}
      <BreadcrumbsBar
        currentSectionTitle={getSectionTitle()}
        onRefreshData={() => showToast('Records synchronized against EPFO Database & National Career Service (NCS) API.')}
      />

      {/* Main Content Area — pt-[128px] = 64px header + 48px nav + 16px breadcrumbs */}
      <main className="w-full bg-[#f8f9ff] min-h-[calc(100vh-260px)] pt-[112px]">
        <div className="flex flex-col w-full">
          {/* Executive Filter Toolbar - Always active across all screens */}
          <FilterToolbar
            filters={filters}
            onFilterChange={handleFilterChange}
            onSaveView={handleSaveView}
            onExportReport={format => setExportFormat(format)}
          />

          {/* Screen Content Container */}
          <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
            {/* =========================================================================
                PORTAL MODE 1: MINISTRY NODAL ENGINE
               ========================================================================= */}
            {portalMode === 'ministry-engine' && (
              <>
                {/* Screen 1: Overview & Longitudinal Outcomes */}
                {activeTab === 'overview-and-outcomes' && (
                  <>
                    <AlertsSection
                      alerts={alerts}
                      onActionClick={alert => setActiveAlertForAction(alert)}
                    />

                    <KPIGrid
                      kpis={kpis}
                      isLoading={isLoadingData}
                      onKPIClick={kpi => setSelectedKPIDrilldown(kpi)}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      <div className="md:col-span-7">
                        <LongitudinalChart
                          currentSegment={filters.inclusionSegment}
                          onSegmentChange={seg => handleFilterChange({ inclusionSegment: seg })}
                        />
                      </div>

                      <div className="md:col-span-5">
                        <RootCauseSection
                          onDownloadDossier={() => setExportFormat('pdf')}
                        />
                      </div>
                    </div>

                    <LeaderboardTable
                      courses={courses}
                      onInspectCourse={course => setSelectedCourseForInspect(course)}
                      onViewAllJobPacks={() => setIsJobPacksOpen(true)}
                    />

                    <StatutoryCertification
                      onOpenAuditTrail={() => setIsAuditTrailOpen(true)}
                      onSealLedger={() => setIsSealLedgerModalOpen(true)}
                      isLedgerSealed={isLedgerSealed}
                    />
                  </>
                )}

                {/* Screen 2: Skill Gaps & Demand Analytics Dashboard */}
                {activeTab === 'skill-gaps-and-demand' && (
                  <SkillGapsScreen
                    onSanctionAction={sector => {
                      setActiveAlertForAction({
                        id: 'custom-sanction',
                        type: 'warning',
                        title: 'Curriculum Expansion Sanction',
                        scope: sector,
                        description: `Sanctioning additional training seats for high-deficit sector: ${sector}.`,
                        highlightText: sector,
                        actionLabel: 'Sanction Batch Expansion',
                        actionType: 'sanction'
                      });
                    }}
                  />
                )}

                {/* Screen 3: District & Provider Performance Matrix */}
                {activeTab === 'district-and-provider-matrix' && (
                  <DistrictMatrixScreen
                    onInspectDistrict={districtName => {
                      showToast(`Loaded field inspection dossier for ${districtName}`);
                      setIsAuditTrailOpen(true);
                    }}
                  />
                )}

                {/* Screen 4: Follow-up Micro-Survey Screen */}
                {activeTab === 'micro-survey' && (
                  <MicroSurveyScreen
                    onResolveGrievance={record => {
                      showToast(`Nodal Grievance Taskforce assigned to Candidate ${record.candidateName} (${record.candidateId}).`);
                    }}
                  />
                )}

                {/* Screen 5: Employment & Wage Progression Timeline */}
                {activeTab === 'wage-timeline' && (
                  <WageProgressionScreen />
                )}

                {/* Screen 6: Skill Profile & Recommended Upskilling */}
                {activeTab === 'skill-profile' && (
                  <SkillProfileScreen
                    onEnrollCourse={course => {
                      showToast(`Trainee enrolled in ${course.title} (Target Level ${course.targetNsqfLevel}). DBT Subsidy sanctioned.`);
                    }}
                  />
                )}

                {/* Screen 7: Statutory Audit & Compliance */}
                {activeTab === 'statutory-audit-and-compliance' && (
                  <StatutoryAuditScreen
                    onSealLedgerAction={() => setIsSealLedgerModalOpen(true)}
                    isLedgerSealed={isLedgerSealed}
                  />
                )}
              </>
            )}

            {/* =========================================================================
                PORTAL MODE 2: HIREBOUND — TRAINING PROVIDER OPERATIONAL PORTAL
               ========================================================================= */}
            {portalMode === 'provider-portal' && (
              <>
                {/* Screen: Batch & Cohort Management */}
                {activeTab === 'batch-management' && (
                  <BatchManagementScreen
                    onOpenDBTVerification={batch => setDbtBonusModalBatch(batch)}
                    onOpenForm12C={batch => setForm12CModalBatch(batch)}
                  />
                )}

                {/* Screen: Employer Verification & Wage Confirmation Portal */}
                {activeTab === 'employer-verification' && (
                  <EmployerVerificationScreen
                    onWageConfirmed={c => {
                      showToast(`Employer wage & offer letter confirmed for Candidate ${c.candidateName}. Digital token registered.`);
                    }}
                  />
                )}

                {/* Screen: Tranche Invoicing & PFMS Disbursement Ledger */}
                {activeTab === 'tranche-invoicing' && (
                  <TrancheInvoicingScreen
                    onOpenForm12CClaim={(inv: TrancheInvoice) => {
                      const matchBatch = BATCHES_DATA.find(b => b.batchId === inv.batchId) || BATCHES_DATA[0];
                      setForm12CModalBatch(matchBatch);
                    }}
                  />
                )}

                {/* Screen: District Nodal Audit & Physical Center Inspection */}
                {activeTab === 'center-inspection' && (
                  <CenterInspectionScreen
                    onOpenShowCauseModal={insp => setShowCauseModalInspection(insp)}
                    onNavigateToEvidenceSubmission={() => setActiveTab('evidence-submission')}
                  />
                )}

                {/* Screen: Center Response & Evidence Submission View */}
                {activeTab === 'evidence-submission' && (
                  <CenterResponseScreen
                    onSubmitEvidence={msg => showToast(msg)}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </main>

      {/* Institutional Footer */}
      <Footer
        onOpenStatutoryLink={title => setStatutoryDocTitle(title)}
      />

      {/* =========================================================================
          APPLICATION MODALS & WORKFLOW DRAWERS
         ========================================================================= */}
      {/* Directive / Action Modal */}
      {(activeAlertForAction || isSealLedgerModalOpen) && (
        <ActionModal
          alert={activeAlertForAction}
          mode={isSealLedgerModalOpen ? 'sealLedger' : 'directive'}
          onClose={() => {
            setActiveAlertForAction(null);
            setIsSealLedgerModalOpen(false);
          }}
          onConfirm={handleActionConfirm}
        />
      )}

      {/* Cohort Inspection Drawer/Modal */}
      {selectedCourseForInspect && (
        <CohortInspectModal
          course={selectedCourseForInspect}
          onClose={() => setSelectedCourseForInspect(null)}
          onExportCohortData={() => {
            showToast(`Exported ${selectedCourseForInspect.qpCode} candidate records to CSV.`);
          }}
        />
      )}

      {/* Export Report Modal */}
      {exportFormat && (
        <ExportModal
          format={exportFormat}
          onClose={() => setExportFormat(null)}
          onDownloadCompleted={msg => showToast(msg)}
        />
      )}

      {/* Cryptographic Audit Trail Modal */}
      {isAuditTrailOpen && (
        <AuditTrailModal
          logs={AUDIT_TRAIL_LOG}
          onClose={() => setIsAuditTrailOpen(false)}
        />
      )}

      {/* All Job Packs Catalog Modal */}
      {isJobPacksOpen && (
        <JobPacksModal
          allCourses={courses}
          onSelectCourse={course => setSelectedCourseForInspect(course)}
          onClose={() => setIsJobPacksOpen(false)}
        />
      )}

      {/* KPI Drilldown Modal */}
      {selectedKPIDrilldown && (
        <KPIDrilldownModal
          kpi={selectedKPIDrilldown}
          onClose={() => setSelectedKPIDrilldown(null)}
        />
      )}

      {/* Statutory Document Modal */}
      {statutoryDocTitle && (
        <StatutoryDocModal
          title={statutoryDocTitle}
          onClose={() => setStatutoryDocTitle(null)}
        />
      )}

      {/* Form 12-C Digital Attestation & e-Sign Modal */}
      {form12CModalBatch && (
        <Form12CModal
          batch={form12CModalBatch}
          onClose={() => setForm12CModalBatch(null)}
          onSuccess={handleForm12CSuccess}
        />
      )}

      {/* e-Sign Success & Digital Certificate Generation State */}
      {eSignSuccessBatch && (
        <ESignSuccessModal
          batch={eSignSuccessBatch}
          onClose={() => setESignSuccessBatch(null)}
        />
      )}

      {/* Statutory Show-Cause Notice & Corrective Action Plan (CAP) Modal */}
      {showCauseModalInspection && (
        <ShowCauseModal
          inspection={showCauseModalInspection}
          onClose={() => setShowCauseModalInspection(null)}
          onSubmitCAP={handleShowCauseSubmitCAP}
        />
      )}

      {/* Certificate & DBT Bonus Verification — Cohort BAT-2024-0842 */}
      {dbtBonusModalBatch && (
        <DBTBonusModal
          batch={dbtBonusModalBatch}
          onClose={() => setDbtBonusModalBatch(null)}
          onConfirmDBT={handleDBTConfirm}
        />
      )}
    </div>
  );
}
