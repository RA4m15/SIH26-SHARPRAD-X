// ─── Domain Types (mirrored from frontend src/types.ts) ────────────────────

export type UserRole = 'ministry_officer' | 'provider';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  designation?: string;
  portal_mode: 'ministry-engine' | 'provider-portal';
  created_at: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export type AlertType = 'critical' | 'warning' | 'success';
export type ActionType = 'dispatch' | 'sanction' | 'disburse';

export interface Alert {
  id: string;
  type: AlertType;
  title: string;
  scope: string;
  description: string;
  highlight_text: string;
  action_label: string;
  action_type: ActionType;
  resolved: boolean;
  created_at: string;
}

export interface KpiMetric {
  id: string;
  label: string;
  icon: string;
  value: string;
  delta?: string;
  delta_positive?: boolean;
  subtext: string;
  progress_percent?: number;
  progress_color?: string;
  badge_text?: string;
  badge_color?: string;
  footer_text?: string;
  segment: 'All' | 'Female' | 'SC/ST/OBC';
  reporting_cycle: string;
}

export interface BatchRecord {
  id: string;
  batch_id: string;
  qp_code: string;
  course_title: string;
  sector: string;
  center_location: string;
  start_date: string;
  end_date: string;
  enrolled_candidates: number;
  biometric_attendance_rate: number;
  assessment_cleared: number;
  placed_count: number;
  tranche1_status: 'Disbursed' | 'Processing';
  tranche2_status: 'Disbursed' | 'Processing';
  tranche3_status: 'Eligible for 180D Claim' | 'In Grace Period' | 'Withheld';
  dbt_bonus_verified: boolean;
  form12c_signed: boolean;
  created_at: string;
}

export interface CourseRecord {
  id: string;
  title: string;
  qp_code: string;
  nsqf_level: number;
  icon: string;
  icon_bg: string;
  icon_color: string;
  placed_rate: number;
  placed_count: number;
  total_candidates: number;
  avg_wage: number;
  wage_delta_percent: number;
  retention_6m: number;
  statutory_status: string;
  statutory_status_type: string;
  sector: string;
  top_employers: string[];
  epfo_match_rate: number;
}

export interface TraineeRecord {
  id: string;
  candidate_id: string;
  name: string;
  aadhaar_masked: string;
  course_title: string;
  qp_code: string;
  training_provider: string;
  district: string;
  gender: 'Female' | 'Male' | 'Other';
  category: 'General' | 'OBC' | 'SC' | 'ST';
  placement_status: 'Employed' | 'Self-Employed' | 'Unplaced' | 'Attrition';
  employer_name?: string;
  monthly_wage?: number;
  epfo_uan?: string;
  retention_milestone: string;
  pfms_credit_verified: boolean;
  biometric_audit_status: string;
}

export interface EmployerConfirmation {
  id: string;
  candidate_id: string;
  candidate_name: string;
  employer_name: string;
  hr_spoc_name: string;
  hr_spoc_phone: string;
  designation: string;
  monthly_gross_ctc: number;
  date_of_joining: string;
  epfo_uan_generated: boolean;
  offer_letter_uploaded: boolean;
  salary_slip_verified: boolean;
  digital_confirmation_status: string;
}

export interface TrancheInvoice {
  id: string;
  invoice_number: string;
  batch_id: string;
  tranche_type: string;
  amount: number;
  submission_date: string;
  pfms_sanction_id: string;
  payment_voucher_no?: string;
  status: string;
  audit_hash: string;
}

export interface CenterInspection {
  id: string;
  center_id: string;
  center_name: string;
  district: string;
  inspection_date: string;
  inspector_officer: string;
  cctv_surveillance_compliance: boolean;
  aadhaar_biometric_device_operational: boolean;
  trainer_to_candidate_ratio: string;
  safety_and_sanitation_rating: number;
  overall_audit_score: number;
  status: string;
  show_cause_notice_id?: string;
}

export interface MicroSurveyRecord {
  id: string;
  candidate_id: string;
  candidate_name: string;
  phone_masked: string;
  milestone: string;
  course: string;
  survey_channel: string;
  call_status: string;
  is_currently_employed: boolean;
  reported_salary: number;
  epfo_match_flag: boolean;
  job_satisfaction: number;
  location_reluctance: boolean;
  feedback_remarks: string;
  grievance_logged: boolean;
  timestamp: string;
}

// ─── Express augmentation ─────────────────────────────────────────────────
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

// ─── API response helpers ─────────────────────────────────────────────────
export interface ApiSuccess<T = unknown> {
  success: true;
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiError {
  success: false;
  error: string;
  details?: unknown;
}
