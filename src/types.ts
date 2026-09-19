export type PortalMode = 'ministry-engine' | 'provider-portal';

export type MinistryNavTab = 
  | 'overview-and-outcomes'
  | 'skill-gaps-and-demand'
  | 'district-and-provider-matrix'
  | 'micro-survey'
  | 'wage-timeline'
  | 'skill-profile'
  | 'statutory-audit-and-compliance';

export type ProviderNavTab = 
  | 'batch-management'
  | 'employer-verification'
  | 'tranche-invoicing'
  | 'center-inspection'
  | 'evidence-submission';

export type NavigationTab = MinistryNavTab | ProviderNavTab;

export type InclusionSegment = 'All' | 'Female' | 'SC/ST/OBC';

export interface FilterState {
  reportingCycle: string;
  stateNodalScope: string;
  districtScope: string;
  sectorCategory: string;
  providerAgency: string;
  inclusionSegment: InclusionSegment;
}

export interface EarlyWarningAlert {
  id: string;
  type: 'critical' | 'warning' | 'success';
  title: string;
  scope: string;
  description: string;
  highlightText: string;
  actionLabel: string;
  actionType: 'dispatch' | 'sanction' | 'disburse';
}

export interface KPIMetric {
  id: string;
  label: string;
  icon: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
  subtext: string;
  progressPercent?: number;
  progressColor?: string;
  badgeText?: string;
  badgeColor?: string;
  footerText?: string;
}

export interface CourseLeaderboardItem {
  id: string;
  title: string;
  qpCode: string;
  nsqfLevel: number;
  icon: string;
  iconBg: string;
  iconColor: string;
  placedRate: number;
  placedCount: number;
  totalCandidates: number;
  avgWage: number;
  wageDeltaPercent: number;
  retention6M: number;
  statutoryStatus: 'Green Channel' | 'High Wage' | 'Compliant' | 'Under Review' | 'Standard Audit';
  statutoryStatusType: 'tertiary' | 'secondary' | 'neutral' | 'error' | 'warning';
  sector: string;
  topEmployers: string[];
  districtDistribution: { district: string; percentage: number }[];
  epfoMatchRate: number;
}

export interface TraineeRecord {
  id: string;
  candidateId: string;
  name: string;
  aadhaarMasked: string;
  courseTitle: string;
  qpCode: string;
  trainingProvider: string;
  district: string;
  gender: 'Female' | 'Male' | 'Other';
  category: 'General' | 'OBC' | 'SC' | 'ST';
  placementStatus: 'Employed' | 'Self-Employed' | 'Unplaced' | 'Attrition';
  employerName?: string;
  monthlyWage?: number;
  epfoUAN?: string;
  retentionMilestone: 'Day 30' | 'Day 90' | 'Day 180' | 'Day 365' | 'Dropped';
  pfmsCreditVerified: boolean;
  biometricAuditStatus: 'Verified' | 'Pending Biometrics' | 'Discrepancy';
}

export interface DistrictMetric {
  id: string;
  name: string;
  division: string;
  trained: number;
  placedRate: number;
  retentionRate: number;
  avgWage: number;
  topProvider: string;
  riskStatus: 'Normal' | 'High Attrition' | 'Under Audit';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  officer: string;
  role: string;
  action: string;
  entity: string;
  hashSha256: string;
  status: 'Cryptographically Sealed' | 'Verified' | 'Pending Block Inclusion';
}

// Screen 4: Follow-up Micro-Survey
export interface MicroSurveyRecord {
  id: string;
  candidateId: string;
  candidateName: string;
  phoneMasked: string;
  milestone: 'Day 30' | 'Day 90' | 'Day 180' | 'Day 365';
  course: string;
  surveyChannel: 'Automated IVR' | 'WhatsApp Bot' | 'Nodal Call Center' | 'Self-App';
  callStatus: 'Verified Complete' | 'Callback Requested' | 'Unreachable';
  isCurrentlyEmployed: boolean;
  reportedSalary: number;
  epfoMatchFlag: boolean;
  jobSatisfaction: 1 | 2 | 3 | 4 | 5;
  locationReluctance: boolean;
  feedbackRemarks: string;
  grievanceLogged: boolean;
  timestamp: string;
}

// Screen 5: Employment & Wage Progression
export interface TimelineMilestone {
  day: string;
  title: string;
  date: string;
  monthlyWage: number;
  wageGrowthPercent: number;
  status: 'Completed & Verified' | 'In Progress' | 'Upcoming';
  employer: string;
  epfoContributionId: string;
  verifiedVia: string;
  notes: string;
}

// Screen 6: Skill Profile & Recommended Upskilling
export interface CompetencySkill {
  name: string;
  currentLevel: number;
  marketRequirement: number;
  category: 'Core Technical' | 'Digital Tools' | 'Regulatory & Safety' | 'Soft Skills';
  gapStatus: 'Optimal' | 'Minor Gap' | 'Critical Skill Deficit';
}

export interface RecommendedCourse {
  id: string;
  title: string;
  qpCode: string;
  targetNsqfLevel: number;
  durationHours: number;
  wagePremiumPotential: string;
  deliveryMode: 'On-the-Job Hybrid' | 'Evening Lab' | 'Virtual Simulation';
  subsidyEligible: boolean;
}

// Provider Portal: Batch & Cohort
export interface BatchRecord {
  id: string;
  batchId: string; // e.g. BAT-2024-0842
  qpCode: string;
  courseTitle: string;
  sector: string;
  centerLocation: string;
  startDate: string;
  endDate: string;
  enrolledCandidates: number;
  biometricAttendanceRate: number;
  assessmentCleared: number;
  placedCount: number;
  tranche1Status: 'Disbursed' | 'Processing';
  tranche2Status: 'Disbursed' | 'Processing';
  tranche3Status: 'Eligible for 180D Claim' | 'In Grace Period' | 'Withheld';
  dbtBonusVerified: boolean;
  form12CSigned: boolean;
}

// Provider Portal: Employer Verification
export interface EmployerConfirmation {
  id: string;
  candidateId: string;
  candidateName: string;
  employerName: string;
  hrSpocName: string;
  hrSpocPhone: string;
  designation: string;
  monthlyGrossCtc: number;
  dateOfJoining: string;
  epfoUanGenerated: boolean;
  offerLetterUploaded: boolean;
  salarySlipVerified: boolean;
  digitalConfirmationStatus: 'Verified by HR' | 'Awaiting Digital Stamp' | 'Discrepancy';
}

// Provider Portal: Tranche Invoicing
export interface TrancheInvoice {
  id: string;
  invoiceNumber: string;
  batchId: string;
  trancheType: 'Tranche 1 (30% Mobilization)' | 'Tranche 2 (40% Certification)' | 'Tranche 3 (30% 180D Retention)';
  amount: number;
  submissionDate: string;
  pfmsSanctionId: string;
  paymentVoucherNo?: string;
  status: 'Settled via PFMS' | 'Under Nodal Scrutiny' | 'Pending Form 12-C e-Sign';
  auditHash: string;
}

// Provider Portal: District Nodal Center Inspection
export interface CenterInspection {
  id: string;
  centerId: string;
  centerName: string;
  district: string;
  inspectionDate: string;
  inspectorOfficer: string;
  cctvSurveillanceCompliance: boolean;
  aadhaarBiometricDeviceOperational: boolean;
  trainerToCandidateRatio: string;
  safetyAndSanitationRating: number; // out of 5
  overallAuditScore: number; // percentage
  status: 'Passed - Unconditional' | 'Conditional Warning Issued' | 'Show-Cause Issued';
  showCauseNoticeId?: string;
}
