import { 
  CourseLeaderboardItem, 
  EarlyWarningAlert, 
  KPIMetric, 
  TraineeRecord, 
  DistrictMetric, 
  AuditLogEntry 
} from '../types';

export const INITIAL_ALERTS: EarlyWarningAlert[] = [
  {
    id: 'alert-1',
    type: 'critical',
    title: 'Critical Attrition',
    scope: 'District Solapur',
    description: 'Healthcare Assistant cohorts show 38% early drop-off within 90 days across District Solapur.',
    highlightText: '38% early drop-off',
    actionLabel: 'Dispatch Verification Squad',
    actionType: 'dispatch'
  },
  {
    id: 'alert-2',
    type: 'warning',
    title: 'Demand Imbalance',
    scope: 'Tech Sector',
    description: 'SQL & Cloud Computing industry vacancies outpace qualified cohort supply by 2.4x.',
    highlightText: '2.4x',
    actionLabel: 'Sanction Curriculum Expansion',
    actionType: 'sanction'
  },
  {
    id: 'alert-3',
    type: 'success',
    title: 'Retention Incentive',
    scope: 'PFMS Milestone',
    description: 'Provider A (Yuva Skill Council) reached 82% 6-month retention milestone; eligible for outcome bonus.',
    highlightText: '82% 6-month retention',
    actionLabel: 'Authorize Incentive Disbursement',
    actionType: 'disburse'
  }
];

export const INITIAL_KPIS: KPIMetric[] = [
  {
    id: 'trained',
    label: 'Trained Trainees',
    icon: 'school',
    value: '12,480',
    delta: '+8.4%',
    deltaPositive: true,
    subtext: 'Annual Goal: 15,000',
    progressPercent: 83.2,
    progressColor: 'bg-primary',
    footerText: '83.2% of Target Met'
  },
  {
    id: 'certified',
    label: 'Certified Trainees',
    icon: 'verified',
    value: '11,326',
    delta: '90.8%',
    deltaPositive: true,
    subtext: 'Independent NCVET Exam',
    badgeText: 'High Compliance',
    badgeColor: 'text-tertiary bg-surface-container'
  },
  {
    id: 'employed',
    label: 'Wage Placed',
    icon: 'work',
    value: '8,742',
    delta: '70.1%',
    deltaPositive: true,
    subtext: 'Active EPFO / ESIC match',
    badgeText: '100% Digital Trail',
    badgeColor: 'text-on-surface bg-surface-variant'
  },
  {
    id: 'retention',
    label: 'Retention (180D)',
    icon: 'history_edu',
    value: '74%',
    delta: '+4.2%',
    deltaPositive: true,
    subtext: 'vs. State Benchmark 69.8%',
    progressPercent: 74,
    progressColor: 'bg-tertiary',
    footerText: '6,469 Active at 6 Months'
  },
  {
    id: 'wage',
    label: 'Avg Verified Wage',
    icon: 'currency_rupee',
    value: '₹17,400',
    delta: '+55.4%',
    deltaPositive: true,
    subtext: 'Baseline: ₹11,200 entry',
    footerText: 'Net Delta: +₹6,200/mo'
  },
  {
    id: 'self-employed',
    label: 'Micro-Enterprise',
    icon: 'store',
    value: '9%',
    delta: '(1,123)',
    deltaPositive: false,
    subtext: 'PMMY Mudra Assisted',
    progressPercent: 9,
    progressColor: 'bg-secondary-container',
    footerText: 'GST/Udyam Verified'
  }
];

export const COURSES_DATA: CourseLeaderboardItem[] = [
  {
    id: 'c1',
    title: 'Solar PV Technician',
    qpCode: 'QP-SG-0104',
    nsqfLevel: 4,
    icon: 'solar_power',
    iconBg: 'bg-tertiary-container',
    iconColor: 'text-on-tertiary-container',
    placedRate: 92,
    placedCount: 2150,
    totalCandidates: 2336,
    avgWage: 19200,
    wageDeltaPercent: 71,
    retention6M: 81,
    statutoryStatus: 'Green Channel',
    statutoryStatusType: 'tertiary',
    sector: 'Green Energy & Solar',
    topEmployers: ['Tata Power Solar', 'Adani Renewables', 'Waaree Energies', 'Vikram Solar'],
    districtDistribution: [
      { district: 'Solapur', percentage: 46 },
      { district: 'Pune', percentage: 34 },
      { district: 'Nagpur', percentage: 20 }
    ],
    epfoMatchRate: 96.4
  },
  {
    id: 'c2',
    title: 'IT Support & Helpdesk',
    qpCode: 'QP-IT-0202',
    nsqfLevel: 4,
    icon: 'terminal',
    iconBg: 'bg-primary-container',
    iconColor: 'text-on-primary-container',
    placedRate: 88,
    placedCount: 1820,
    totalCandidates: 2068,
    avgWage: 21500,
    wageDeltaPercent: 92,
    retention6M: 79,
    statutoryStatus: 'High Wage',
    statutoryStatusType: 'secondary',
    sector: 'IT-ITeS & Telephony',
    topEmployers: ['Wipro Enterprise Services', 'Tech Mahindra BPS', 'Infosys BPM', 'CMS Info Systems'],
    districtDistribution: [
      { district: 'Pune', percentage: 58 },
      { district: 'Thane', percentage: 28 },
      { district: 'Solapur', percentage: 14 }
    ],
    epfoMatchRate: 98.2
  },
  {
    id: 'c3',
    title: 'Electrician & Wireman',
    qpCode: 'QP-CS-0411',
    nsqfLevel: 3,
    icon: 'bolt',
    iconBg: 'bg-surface-container-high',
    iconColor: 'text-on-surface',
    placedRate: 84,
    placedCount: 2410,
    totalCandidates: 2869,
    avgWage: 18400,
    wageDeltaPercent: 64,
    retention6M: 75,
    statutoryStatus: 'Compliant',
    statutoryStatusType: 'neutral',
    sector: 'Construction & Electrical',
    topEmployers: ['Larsen & Toubro Construction', 'Voltas Infra', 'Sterling & Wilson', 'Mahavitaran Contractors'],
    districtDistribution: [
      { district: 'Solapur', percentage: 42 },
      { district: 'Nagpur', percentage: 32 },
      { district: 'Pune', percentage: 26 }
    ],
    epfoMatchRate: 91.5
  },
  {
    id: 'c4',
    title: 'General Duty Healthcare Assistant',
    qpCode: 'QP-HC-0501',
    nsqfLevel: 4,
    icon: 'medical_services',
    iconBg: 'bg-surface-container-high',
    iconColor: 'text-error',
    placedRate: 76,
    placedCount: 1420,
    totalCandidates: 1868,
    avgWage: 16100,
    wageDeltaPercent: 43,
    retention6M: 62,
    statutoryStatus: 'Under Review',
    statutoryStatusType: 'error',
    sector: 'Healthcare & Allied',
    topEmployers: ['Apollo HomeCare', 'Max Healthcare', 'Sahyadri Specialty Hospitals', 'Fortis Healthcare'],
    districtDistribution: [
      { district: 'Solapur Rural', percentage: 52 },
      { district: 'Pune Division', percentage: 31 },
      { district: 'Thane', percentage: 17 }
    ],
    epfoMatchRate: 84.1
  },
  {
    id: 'c5',
    title: 'Retail Sales & Inventory Associate',
    qpCode: 'QP-RS-0101',
    nsqfLevel: 3,
    icon: 'shopping_cart',
    iconBg: 'bg-surface-container-high',
    iconColor: 'text-on-surface',
    placedRate: 72,
    placedCount: 942,
    totalCandidates: 1308,
    avgWage: 15300,
    wageDeltaPercent: 36,
    retention6M: 68,
    statutoryStatus: 'Standard Audit',
    statutoryStatusType: 'neutral',
    sector: 'Retail & Logistics',
    topEmployers: ['Reliance Retail Ltd', 'DMart (Avenue Supermarts)', 'Shoppers Stop', 'Titan EyePlus'],
    districtDistribution: [
      { district: 'Pune', percentage: 48 },
      { district: 'Thane', percentage: 32 },
      { district: 'Solapur', percentage: 20 }
    ],
    epfoMatchRate: 89.7
  },
  {
    id: 'c6',
    title: 'CNC Machinist & Automotive Toolmaker',
    qpCode: 'QP-ASC-0602',
    nsqfLevel: 4,
    icon: 'precision_manufacturing',
    iconBg: 'bg-primary-container',
    iconColor: 'text-on-primary-container',
    placedRate: 87,
    placedCount: 1530,
    totalCandidates: 1758,
    avgWage: 20800,
    wageDeltaPercent: 82,
    retention6M: 80,
    statutoryStatus: 'Green Channel',
    statutoryStatusType: 'tertiary',
    sector: 'Automotive & Capital Goods',
    topEmployers: ['Bharat Forge', 'Tata Motors Vendor Park', 'Bajaj Auto Ancillaries', 'Kirloskar Oil Engines'],
    districtDistribution: [
      { district: 'Pune Chakan', percentage: 65 },
      { district: 'Solapur MIDC', percentage: 25 },
      { district: 'Nagpur Butibori', percentage: 10 }
    ],
    epfoMatchRate: 97.1
  },
  {
    id: 'c7',
    title: 'Cold Storage & Logistics Handler',
    qpCode: 'QP-LSC-0204',
    nsqfLevel: 3,
    icon: 'local_shipping',
    iconBg: 'bg-surface-container-high',
    iconColor: 'text-on-surface',
    placedRate: 79,
    placedCount: 1120,
    totalCandidates: 1417,
    avgWage: 17200,
    wageDeltaPercent: 48,
    retention6M: 71,
    statutoryStatus: 'Compliant',
    statutoryStatusType: 'neutral',
    sector: 'Logistics & Supply Chain',
    topEmployers: ['Delhivery Ltd', 'Mahindra Logistics', 'Snowman Logistics', 'Coldman Logistics'],
    districtDistribution: [
      { district: 'Nagpur Logistics Hub', percentage: 44 },
      { district: 'Thane Bhiwandi', percentage: 38 },
      { district: 'Solapur Agri-Corridor', percentage: 18 }
    ],
    epfoMatchRate: 92.0
  }
];

export const TRAINEE_SAMPLE_RECORDS: TraineeRecord[] = [
  {
    id: 'tr-1',
    candidateId: 'MH-SOL-2024-8841',
    name: 'Pooja Sanjay Kadam',
    aadhaarMasked: 'XXXX-XXXX-4912',
    courseTitle: 'Solar PV Technician',
    qpCode: 'QP-SG-0104',
    trainingProvider: 'Yuva Skill Council',
    district: 'Solapur Rural',
    gender: 'Female',
    category: 'OBC',
    placementStatus: 'Employed',
    employerName: 'Tata Power Solar Microgrids',
    monthlyWage: 19800,
    epfoUAN: '101488921443',
    retentionMilestone: 'Day 180',
    pfmsCreditVerified: true,
    biometricAuditStatus: 'Verified'
  },
  {
    id: 'tr-2',
    candidateId: 'MH-PUN-2024-9102',
    name: 'Sachin Ramesh Patil',
    aadhaarMasked: 'XXXX-XXXX-8314',
    courseTitle: 'IT Support & Helpdesk',
    qpCode: 'QP-IT-0202',
    trainingProvider: 'Apex Technical Institutes',
    district: 'Pune Division',
    gender: 'Male',
    category: 'General',
    placementStatus: 'Employed',
    employerName: 'Wipro Enterprise Managed Services',
    monthlyWage: 22400,
    epfoUAN: '101567290112',
    retentionMilestone: 'Day 365',
    pfmsCreditVerified: true,
    biometricAuditStatus: 'Verified'
  },
  {
    id: 'tr-3',
    candidateId: 'MH-SOL-2024-3419',
    name: 'Sunita Anand Jadhav',
    aadhaarMasked: 'XXXX-XXXX-2190',
    courseTitle: 'General Duty Healthcare Assistant',
    qpCode: 'QP-HC-0501',
    trainingProvider: 'Aarogya Foundation',
    district: 'Solapur Urban',
    gender: 'Female',
    category: 'SC',
    placementStatus: 'Attrition',
    employerName: 'Solapur City Clinic (Terminated)',
    monthlyWage: 12500,
    epfoUAN: '101982143009',
    retentionMilestone: 'Dropped',
    pfmsCreditVerified: false,
    biometricAuditStatus: 'Discrepancy'
  },
  {
    id: 'tr-4',
    candidateId: 'MH-NAG-2024-5271',
    name: 'Imran Bashir Sheikh',
    aadhaarMasked: 'XXXX-XXXX-7721',
    courseTitle: 'Electrician & Wireman',
    qpCode: 'QP-CS-0411',
    trainingProvider: 'National Power Skill Hub',
    district: 'Nagpur Industrial',
    gender: 'Male',
    category: 'OBC',
    placementStatus: 'Employed',
    employerName: 'Larsen & Toubro Infra',
    monthlyWage: 18600,
    epfoUAN: '101776510944',
    retentionMilestone: 'Day 180',
    pfmsCreditVerified: true,
    biometricAuditStatus: 'Verified'
  },
  {
    id: 'tr-5',
    candidateId: 'MH-SOL-2024-6623',
    name: 'Varsha Dattatray Shinde',
    aadhaarMasked: 'XXXX-XXXX-9028',
    courseTitle: 'Retail Sales & Inventory Associate',
    qpCode: 'QP-RS-0101',
    trainingProvider: 'Yuva Skill Council',
    district: 'Solapur Rural',
    gender: 'Female',
    category: 'ST',
    placementStatus: 'Self-Employed',
    employerName: 'Shinde Kirana & Agro Supplies (PMMY Mudra)',
    monthlyWage: 16000,
    retentionMilestone: 'Day 180',
    pfmsCreditVerified: true,
    biometricAuditStatus: 'Verified'
  }
];

export const DISTRICTS_DATA: DistrictMetric[] = [
  {
    id: 'd1',
    name: 'Solapur Rural & Urban',
    division: 'Pune Division',
    trained: 3840,
    placedRate: 68.4,
    retentionRate: 64.2,
    avgWage: 16400,
    topProvider: 'Yuva Skill Council',
    riskStatus: 'High Attrition'
  },
  {
    id: 'd2',
    name: 'Pune Division Metropolitan',
    division: 'Pune Division',
    trained: 4620,
    placedRate: 88.2,
    retentionRate: 81.5,
    avgWage: 20900,
    topProvider: 'Apex Technical Institutes',
    riskStatus: 'Normal'
  },
  {
    id: 'd3',
    name: 'Nagpur Industrial Corridor',
    division: 'Nagpur Division',
    trained: 2410,
    placedRate: 76.9,
    retentionRate: 73.8,
    avgWage: 17800,
    topProvider: 'National Power Skill Hub',
    riskStatus: 'Normal'
  },
  {
    id: 'd4',
    name: 'Thane Metropolitan Hub',
    division: 'Konkan Division',
    trained: 1610,
    placedRate: 84.1,
    retentionRate: 77.0,
    avgWage: 19100,
    topProvider: 'Yuva Skill Council',
    riskStatus: 'Normal'
  }
];

export const AUDIT_TRAIL_LOG: AuditLogEntry[] = [
  {
    id: 'tx-9941',
    timestamp: '2025-03-18 11:42:04 IST',
    officer: 'Rajesh Verma, IAS',
    role: 'Joint Director of Skill Outcomes',
    action: 'Authorised Batch Incentive Release (Tranche 3)',
    entity: 'Yuva Skill Council • Solapur Center 04',
    hashSha256: '8f7a6b2c89012aefbc430198eecda78901bcf3e4210a48d8c2e4f0129bc81102',
    status: 'Cryptographically Sealed'
  },
  {
    id: 'tx-9940',
    timestamp: '2025-03-18 09:15:30 IST',
    officer: 'Sunil Gokhale',
    role: 'District Nodal Field Auditor',
    action: 'Conducted Biometric Verification Inspection',
    entity: 'Aarogya Foundation • Solapur General Hospital Cohort',
    hashSha256: '4a1b9c8e23401faecb901289fedca01234bce2d3410b58e7d1e3f8901bc72214',
    status: 'Cryptographically Sealed'
  },
  {
    id: 'tx-9939',
    timestamp: '2025-03-17 17:08:12 IST',
    officer: 'Meera Rao',
    role: 'PFMS State Banking Officer',
    action: 'Reconciled 180-Day Direct Benefit Transfer Passbook',
    entity: '1,420 Healthcare Assistant Trainees',
    hashSha256: 'e82b7c1a90423baedc541298fedba34512cde1f2310c68f6e2f4a0123bc63325',
    status: 'Cryptographically Sealed'
  },
  {
    id: 'tx-9938',
    timestamp: '2025-03-16 14:22:55 IST',
    officer: 'Rajesh Verma, IAS',
    role: 'Joint Director of Skill Outcomes',
    action: 'Issued Formal Attrition Show-Cause Notice',
    entity: 'District Solapur Healthcare Assistant Batch 02',
    hashSha256: '7b2c9a1e89345cbadf652309fecba45623def2a1420d79a5f3a5b1234bc54436',
    status: 'Cryptographically Sealed'
  }
];

export const SKILL_GAPS_DATA = [
  {
    sector: 'Cloud & Data Infrastructure',
    demandVacancies: 14200,
    trainedSupply: 5900,
    gapRatio: '2.4x Deficit',
    avgOfferedSalary: '₹28,500/mo',
    topRequiredSkills: ['PostgreSQL & Cloud SQL', 'Linux Admin', 'Docker/Kubernetes', 'Helpdesk L2'],
    urgency: 'Critical High'
  },
  {
    sector: 'Green Solar & Microgrid Operations',
    demandVacancies: 11500,
    trainedSupply: 8200,
    gapRatio: '1.4x Deficit',
    avgOfferedSalary: '₹21,000/mo',
    topRequiredSkills: ['Inverter Diagnostics', 'Rooftop Net Metering', 'High Voltage Safety', 'Storage Cells'],
    urgency: 'Moderate'
  },
  {
    sector: 'EV Powertrain & Battery Assembly',
    demandVacancies: 8400,
    trainedSupply: 3100,
    gapRatio: '2.7x Deficit',
    avgOfferedSalary: '₹24,000/mo',
    topRequiredSkills: ['BMS Diagnostics', 'Lithium Cell Wiring', 'CAN Bus Testing', 'Thermal Runaway Protocol'],
    urgency: 'Critical High'
  },
  {
    sector: 'Healthcare & Bedside Allied Support',
    demandVacancies: 18900,
    trainedSupply: 14200,
    gapRatio: '1.3x Deficit',
    avgOfferedSalary: '₹16,500/mo',
    topRequiredSkills: ['Patient Vitals Record', 'ICU Sterile Protocol', 'Medication Logistics', 'Geriatric Care'],
    urgency: 'Retention Constrained'
  },
  {
    sector: 'CNC Precision & Tool Engineering',
    demandVacancies: 6700,
    trainedSupply: 5200,
    gapRatio: '1.3x Deficit',
    avgOfferedSalary: '₹22,000/mo',
    topRequiredSkills: ['G-Code Programming', 'Micrometer Tolerance 5µm', 'Multi-Axis Lathe', 'Fixture Setup'],
    urgency: 'Moderate'
  }
];

// Screen 4: Follow-up Micro-Survey Screen Data
export const MICRO_SURVEYS_DATA: import('../types').MicroSurveyRecord[] = [
  {
    id: 'srv-001',
    candidateId: 'MH-SOL-2024-00142',
    candidateName: 'Priya Shinde',
    phoneMasked: '+91 98234-XX912',
    milestone: 'Day 180',
    course: 'Solar PV Technician (SGJ/Q0101)',
    surveyChannel: 'WhatsApp Bot',
    callStatus: 'Verified Complete',
    isCurrentlyEmployed: true,
    reportedSalary: 21500,
    epfoMatchFlag: true,
    jobSatisfaction: 5,
    locationReluctance: false,
    feedbackRemarks: 'Promoted to site assistant supervisor. Provident Fund credited every month on the 5th.',
    grievanceLogged: false,
    timestamp: '2024-09-17 14:22 IST'
  },
  {
    id: 'srv-002',
    candidateId: 'MH-SOL-2024-00481',
    candidateName: 'Amol Kulkarni',
    phoneMasked: '+91 97652-XX403',
    milestone: 'Day 90',
    course: 'General Duty Healthcare Assistant (HSS/Q5101)',
    surveyChannel: 'Nodal Call Center',
    callStatus: 'Verified Complete',
    isCurrentlyEmployed: false,
    reportedSalary: 0,
    epfoMatchFlag: false,
    jobSatisfaction: 2,
    locationReluctance: true,
    feedbackRemarks: 'Contract in Pune hospital offered ₹11,500 which was insufficient for hostel rent; relocated back to rural Solapur.',
    grievanceLogged: true,
    timestamp: '2024-09-17 11:05 IST'
  },
  {
    id: 'srv-003',
    candidateId: 'MH-PUN-2024-00912',
    candidateName: 'Sneha Deshmukh',
    phoneMasked: '+91 94220-XX811',
    milestone: 'Day 180',
    course: 'IT Support & Cloud Specialist (SSC/Q0110)',
    surveyChannel: 'Self-App',
    callStatus: 'Verified Complete',
    isCurrentlyEmployed: true,
    reportedSalary: 26000,
    epfoMatchFlag: true,
    jobSatisfaction: 4,
    locationReluctance: false,
    feedbackRemarks: 'Completed 6-month milestone at Infosys BPM. Awaiting NSQF Level 5 bridge course.',
    grievanceLogged: false,
    timestamp: '2024-09-16 16:40 IST'
  },
  {
    id: 'srv-004',
    candidateId: 'MH-SOL-2024-01205',
    candidateName: 'Rahul Jadhav',
    phoneMasked: '+91 98901-XX720',
    milestone: 'Day 30',
    course: 'Electrician & Control Panel Wireman (ELE/Q6301)',
    surveyChannel: 'Automated IVR',
    callStatus: 'Verified Complete',
    isCurrentlyEmployed: true,
    reportedSalary: 18000,
    epfoMatchFlag: true,
    jobSatisfaction: 4,
    locationReluctance: false,
    feedbackRemarks: 'First salary credited through PFMS banking gateway. Tools kit received.',
    grievanceLogged: false,
    timestamp: '2024-09-16 09:15 IST'
  },
  {
    id: 'srv-005',
    candidateId: 'MH-THN-2024-02319',
    candidateName: 'Pooja Gaikwad',
    phoneMasked: '+91 91580-XX334',
    milestone: 'Day 365',
    course: 'Retail Logistics & Inventory (RAS/Q0104)',
    surveyChannel: 'Nodal Call Center',
    callStatus: 'Verified Complete',
    isCurrentlyEmployed: true,
    reportedSalary: 22000,
    epfoMatchFlag: true,
    jobSatisfaction: 4,
    locationReluctance: false,
    feedbackRemarks: '12 full months sustained employment. Enrolled in PMMY Mudra credit for regional retail outlet.',
    grievanceLogged: false,
    timestamp: '2024-09-15 15:30 IST'
  }
];

// Screen 5: Employment & Wage Progression Timeline Data
export const TIMELINE_PROGRESSION_DATA: import('../types').TimelineMilestone[] = [
  {
    day: 'T0 (Enrollment)',
    title: 'Baseline Income & Pre-Skilling Benchmark',
    date: '15 Oct 2023',
    monthlyWage: 11200,
    wageGrowthPercent: 0,
    status: 'Completed & Verified',
    employer: 'Informal Regional Day Laborer',
    epfoContributionId: 'N/A (Unorganized)',
    verifiedVia: 'Self-declaration & Ration Card Socio-Economic Baseline',
    notes: 'Candidate registered under Pradhan Mantri Kaushal Vikas Yojana (PMKVY 4.0).'
  },
  {
    day: 'T+30D',
    title: 'Formal Induction & First Statutory Salary Credit',
    date: '20 Feb 2024',
    monthlyWage: 16500,
    wageGrowthPercent: 47.3,
    status: 'Completed & Verified',
    employer: 'Tata Power Solar Systems Ltd',
    epfoContributionId: 'EPFO-MH-BOM-19042-001',
    verifiedVia: 'EPFO Electronic Challan & Tranche 1 DBT Stipend',
    notes: 'Aadhaar biometric attendance during training passed at 96.4%.'
  },
  {
    day: 'T+90D',
    title: 'Probation Clearance & Skill Allowance Adjustment',
    date: '20 May 2024',
    monthlyWage: 18200,
    wageGrowthPercent: 62.5,
    status: 'Completed & Verified',
    employer: 'Tata Power Solar Systems Ltd',
    epfoContributionId: 'EPFO-MH-BOM-19042-003',
    verifiedVia: 'HR Digital Wage Receipt & Form 16 Part B',
    notes: 'Promoted from Trainee Installer to Field Commissioning Assistant.'
  },
  {
    day: 'T+180D',
    title: 'Statutory 6-Month Retention Milestone (PFMS Invoicing Lock)',
    date: '20 Aug 2024',
    monthlyWage: 21500,
    wageGrowthPercent: 92.0,
    status: 'Completed & Verified',
    employer: 'Tata Power Solar Systems Ltd',
    epfoContributionId: 'EPFO-MH-BOM-19042-006',
    verifiedVia: 'Automated Central PFMS-EPFO Live Gateway Sync',
    notes: 'Qualifies Training Provider for Rule 14(b) 30% Final Tranche Release.'
  },
  {
    day: 'T+365D (Projected)',
    title: 'Annual Retention & Supervisory Grade Uplift',
    date: '20 Feb 2025',
    monthlyWage: 25000,
    wageGrowthPercent: 123.2,
    status: 'Upcoming',
    employer: 'Tata Power Solar Systems Ltd',
    epfoContributionId: 'Scheduled for Q4 Audit',
    verifiedVia: 'Automated EPFO Scheduled Ingestion',
    notes: 'Targeting NSQF Level 5 Certification in Microgrid Battery Storage.'
  }
];

// Screen 6: Skill Profile & Recommended Upskilling Data
export const COMPETENCY_SKILLS_DATA: import('../types').CompetencySkill[] = [
  {
    name: 'PV String Inverter Troubleshooting',
    currentLevel: 82,
    marketRequirement: 85,
    category: 'Core Technical',
    gapStatus: 'Optimal'
  },
  {
    name: 'Industrial Rooftop Net-Metering Calibration',
    currentLevel: 58,
    marketRequirement: 80,
    category: 'Core Technical',
    gapStatus: 'Minor Gap'
  },
  {
    name: 'High-Voltage Battery Storage & BMS Safety',
    currentLevel: 42,
    marketRequirement: 90,
    category: 'Regulatory & Safety',
    gapStatus: 'Critical Skill Deficit'
  },
  {
    name: 'SCADA Telemetry & IoT Cloud Monitoring',
    currentLevel: 48,
    marketRequirement: 75,
    category: 'Digital Tools',
    gapStatus: 'Critical Skill Deficit'
  },
  {
    name: 'DISCOM Compliance & Statutory Grid Codes',
    currentLevel: 76,
    marketRequirement: 70,
    category: 'Regulatory & Safety',
    gapStatus: 'Optimal'
  },
  {
    name: 'Customer Client Interaction & Field Reporting',
    currentLevel: 88,
    marketRequirement: 65,
    category: 'Soft Skills',
    gapStatus: 'Optimal'
  }
];

export const RECOMMENDED_COURSES_DATA: import('../types').RecommendedCourse[] = [
  {
    id: 'up-01',
    title: 'Microgrid Battery Energy Storage (BESS) Lead',
    qpCode: 'SGJ/Q0114',
    targetNsqfLevel: 5,
    durationHours: 120,
    wagePremiumPotential: '+₹7,500/mo Realized Increase',
    deliveryMode: 'On-the-Job Hybrid',
    subsidyEligible: true
  },
  {
    id: 'up-02',
    title: 'Solar SCADA & IoT Sensor Commissioning Specialist',
    qpCode: 'ELE/Q7402',
    targetNsqfLevel: 5,
    durationHours: 90,
    wagePremiumPotential: '+₹9,000/mo Realized Increase',
    deliveryMode: 'Virtual Simulation',
    subsidyEligible: true
  },
  {
    id: 'up-03',
    title: 'Commercial EV Charging Hub Infrastructure Master',
    qpCode: 'ASC/Q1422',
    targetNsqfLevel: 6,
    durationHours: 160,
    wagePremiumPotential: '+₹12,000/mo Realized Increase',
    deliveryMode: 'Evening Lab',
    subsidyEligible: false
  }
];

// Provider Portal: Batches Data (specifically including BAT-2024-0842)
export const BATCHES_DATA: import('../types').BatchRecord[] = [
  {
    id: 'bat-01',
    batchId: 'BAT-2024-0842',
    qpCode: 'SGJ/Q0101',
    courseTitle: 'Solar PV Project Technician (NSQF Level 4)',
    sector: 'Green Energy & Solar',
    centerLocation: 'Yuva Center 01, Solapur MIDC Hub',
    startDate: '12 Jan 2024',
    endDate: '15 Apr 2024',
    enrolledCandidates: 30,
    biometricAttendanceRate: 97.2,
    assessmentCleared: 29,
    placedCount: 27,
    tranche1Status: 'Disbursed',
    tranche2Status: 'Disbursed',
    tranche3Status: 'Eligible for 180D Claim',
    dbtBonusVerified: true,
    form12CSigned: false
  },
  {
    id: 'bat-02',
    batchId: 'BAT-2024-0915',
    qpCode: 'HSS/Q5101',
    courseTitle: 'General Duty Healthcare Assistant',
    sector: 'Healthcare & Allied Support',
    centerLocation: 'Yuva Center 03, Barshi Rural',
    startDate: '01 Feb 2024',
    endDate: '30 May 2024',
    enrolledCandidates: 28,
    biometricAttendanceRate: 84.1,
    assessmentCleared: 24,
    placedCount: 16,
    tranche1Status: 'Disbursed',
    tranche2Status: 'Disbursed',
    tranche3Status: 'Withheld',
    dbtBonusVerified: false,
    form12CSigned: false
  },
  {
    id: 'bat-03',
    batchId: 'BAT-2024-1022',
    qpCode: 'SSC/Q0110',
    courseTitle: 'IT-ITeS Cloud & Network Infrastructure Associate',
    sector: 'IT-ITeS & Telephony',
    centerLocation: 'Yuva Center 02, Pune Hinjewadi Corridor',
    startDate: '01 Mar 2024',
    endDate: '30 Jun 2024',
    enrolledCandidates: 35,
    biometricAttendanceRate: 98.4,
    assessmentCleared: 34,
    placedCount: 32,
    tranche1Status: 'Disbursed',
    tranche2Status: 'Disbursed',
    tranche3Status: 'Eligible for 180D Claim',
    dbtBonusVerified: true,
    form12CSigned: true
  }
];

// Provider Portal: Employer Confirmations Data
export const EMPLOYER_CONFIRMATIONS_DATA: import('../types').EmployerConfirmation[] = [
  {
    id: 'emp-c-01',
    candidateId: 'MH-SOL-2024-00142',
    candidateName: 'Priya Shinde',
    employerName: 'Tata Power Solar Systems Ltd',
    hrSpocName: 'Vikram Mehta, HR Lead',
    hrSpocPhone: '+91 22 6665-8282',
    designation: 'Solar Installation Associate',
    monthlyGrossCtc: 21500,
    dateOfJoining: '2024-05-02',
    epfoUanGenerated: true,
    offerLetterUploaded: true,
    salarySlipVerified: true,
    digitalConfirmationStatus: 'Verified by HR'
  },
  {
    id: 'emp-c-02',
    candidateId: 'MH-SOL-2024-00145',
    candidateName: 'Sanjay Rathod',
    employerName: 'Sterling and Wilson Renewable Energy',
    hrSpocName: 'Ananya Roy, Talent Partner',
    hrSpocPhone: '+91 22 2548-9100',
    designation: 'Rooftop Electrical Wireman',
    monthlyGrossCtc: 19800,
    dateOfJoining: '2024-05-05',
    epfoUanGenerated: true,
    offerLetterUploaded: true,
    salarySlipVerified: true,
    digitalConfirmationStatus: 'Verified by HR'
  },
  {
    id: 'emp-c-03',
    candidateId: 'MH-SOL-2024-00150',
    candidateName: 'Meera Waghmare',
    employerName: 'Waaree Energies Ltd',
    hrSpocName: 'Kunal Patil, Operations HR',
    hrSpocPhone: '+91 22 6644-4444',
    designation: 'PV Quality Inspector',
    monthlyGrossCtc: 18500,
    dateOfJoining: '2024-05-10',
    epfoUanGenerated: true,
    offerLetterUploaded: true,
    salarySlipVerified: false,
    digitalConfirmationStatus: 'Awaiting Digital Stamp'
  }
];

// Provider Portal: Tranche Invoices Data
export const TRANCHE_INVOICES_DATA: import('../types').TrancheInvoice[] = [
  {
    id: 'inv-842-1',
    invoiceNumber: 'INV-MSDE-2024-00842-T1',
    batchId: 'BAT-2024-0842',
    trancheType: 'Tranche 1 (30% Mobilization)',
    amount: 270000,
    submissionDate: '2024-01-20',
    pfmsSanctionId: 'PFMS-SAN-MH-842-01',
    paymentVoucherNo: 'C032489102488',
    status: 'Settled via PFMS',
    auditHash: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d'
  },
  {
    id: 'inv-842-2',
    invoiceNumber: 'INV-MSDE-2024-00842-T2',
    batchId: 'BAT-2024-0842',
    trancheType: 'Tranche 2 (40% Certification)',
    amount: 360000,
    submissionDate: '2024-04-25',
    pfmsSanctionId: 'PFMS-SAN-MH-842-02',
    paymentVoucherNo: 'C052491204899',
    status: 'Settled via PFMS',
    auditHash: '8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c'
  },
  {
    id: 'inv-842-3',
    invoiceNumber: 'INV-MSDE-2024-00842-T3',
    batchId: 'BAT-2024-0842',
    trancheType: 'Tranche 3 (30% 180D Retention)',
    amount: 270000,
    submissionDate: '2024-09-12',
    pfmsSanctionId: 'PFMS-SAN-MH-842-03',
    status: 'Pending Form 12-C e-Sign',
    auditHash: '7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b'
  }
];

// Provider Portal: Center Inspections Data
export const CENTER_INSPECTIONS_DATA: import('../types').CenterInspection[] = [
  {
    id: 'insp-01',
    centerId: 'TC-SOL-001',
    centerName: 'Yuva Center 01 - Solapur MIDC Hub',
    district: 'Solapur',
    inspectionDate: '2024-08-14',
    inspectorOfficer: 'Sanjay Thorat, Asst. Director of Training',
    cctvSurveillanceCompliance: true,
    aadhaarBiometricDeviceOperational: true,
    trainerToCandidateRatio: '1:25 (Compliant)',
    safetyAndSanitationRating: 4.8,
    overallAuditScore: 94.5,
    status: 'Passed - Unconditional'
  },
  {
    id: 'insp-02',
    centerId: 'TC-SOL-003',
    centerName: 'Yuva Center 03 - Barshi Rural Branch',
    district: 'Solapur',
    inspectionDate: '2024-09-02',
    inspectorOfficer: 'P. V. Kulkarni, District Nodal Officer',
    cctvSurveillanceCompliance: false,
    aadhaarBiometricDeviceOperational: true,
    trainerToCandidateRatio: '1:38 (Deficit)',
    safetyAndSanitationRating: 3.2,
    overallAuditScore: 68.0,
    status: 'Show-Cause Issued',
    showCauseNoticeId: 'SCN-MSDE-SOL-2024-081'
  }
];

