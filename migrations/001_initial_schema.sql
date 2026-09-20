-- =========================================================================
-- HireBound PostgreSQL Schema — Migration 001: Initial Schema
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── Users ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email         VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name          VARCHAR(255) NOT NULL,
  role          VARCHAR(50) NOT NULL CHECK (role IN ('ministry_officer', 'provider')),
  designation   VARCHAR(255),
  portal_mode   VARCHAR(50) NOT NULL DEFAULT 'ministry-engine',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Refresh Tokens ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS refresh_tokens (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token      TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── KPI Metrics ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS kpi_metrics (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label            VARCHAR(255) NOT NULL,
  icon             VARCHAR(100) NOT NULL,
  value            VARCHAR(100) NOT NULL,
  delta            VARCHAR(100),
  delta_positive   BOOLEAN DEFAULT TRUE,
  subtext          VARCHAR(500),
  progress_percent NUMERIC(5,2),
  progress_color   VARCHAR(100),
  badge_text       VARCHAR(200),
  badge_color      VARCHAR(200),
  footer_text      VARCHAR(300),
  segment          VARCHAR(50) NOT NULL DEFAULT 'All',
  reporting_cycle  VARCHAR(100) NOT NULL DEFAULT 'Last 12 Months (FY24)',
  sort_order       INT NOT NULL DEFAULT 0
);

-- ─── Alerts ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS alerts (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type           VARCHAR(20) NOT NULL CHECK (type IN ('critical', 'warning', 'success')),
  title          VARCHAR(255) NOT NULL,
  scope          VARCHAR(255) NOT NULL,
  description    TEXT NOT NULL,
  highlight_text VARCHAR(255) NOT NULL,
  action_label   VARCHAR(255) NOT NULL,
  action_type    VARCHAR(50) NOT NULL CHECK (action_type IN ('dispatch', 'sanction', 'disburse')),
  resolved       BOOLEAN NOT NULL DEFAULT FALSE,
  resolved_by    UUID REFERENCES users(id),
  resolved_at    TIMESTAMPTZ,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Batches ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS batches (
  id                          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  batch_id                    VARCHAR(50) UNIQUE NOT NULL,
  qp_code                     VARCHAR(100) NOT NULL,
  course_title                VARCHAR(255) NOT NULL,
  sector                      VARCHAR(255) NOT NULL,
  center_location             VARCHAR(255) NOT NULL,
  start_date                  DATE NOT NULL,
  end_date                    DATE NOT NULL,
  enrolled_candidates         INT NOT NULL DEFAULT 0,
  biometric_attendance_rate   NUMERIC(5,2) NOT NULL DEFAULT 0,
  assessment_cleared          INT NOT NULL DEFAULT 0,
  placed_count                INT NOT NULL DEFAULT 0,
  tranche1_status             VARCHAR(50) NOT NULL DEFAULT 'Processing',
  tranche2_status             VARCHAR(50) NOT NULL DEFAULT 'Processing',
  tranche3_status             VARCHAR(100) NOT NULL DEFAULT 'In Grace Period',
  dbt_bonus_verified          BOOLEAN NOT NULL DEFAULT FALSE,
  form12c_signed              BOOLEAN NOT NULL DEFAULT FALSE,
  created_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Courses ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS courses (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title                 VARCHAR(255) NOT NULL,
  qp_code               VARCHAR(100) NOT NULL,
  nsqf_level            INT NOT NULL,
  icon                  VARCHAR(100) NOT NULL DEFAULT 'bolt',
  icon_bg               VARCHAR(100) NOT NULL DEFAULT 'bg-[#eff4ff]',
  icon_color            VARCHAR(100) NOT NULL DEFAULT 'text-[#0051d5]',
  placed_rate           NUMERIC(5,2) NOT NULL DEFAULT 0,
  placed_count          INT NOT NULL DEFAULT 0,
  total_candidates      INT NOT NULL DEFAULT 0,
  avg_wage              INT NOT NULL DEFAULT 0,
  wage_delta_percent    NUMERIC(5,2) NOT NULL DEFAULT 0,
  retention_6m          NUMERIC(5,2) NOT NULL DEFAULT 0,
  statutory_status      VARCHAR(100) NOT NULL DEFAULT 'Compliant',
  statutory_status_type VARCHAR(50) NOT NULL DEFAULT 'neutral',
  sector                VARCHAR(255) NOT NULL,
  top_employers         TEXT[] NOT NULL DEFAULT '{}',
  epfo_match_rate       NUMERIC(5,2) NOT NULL DEFAULT 0,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Trainees ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS trainees (
  id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id            VARCHAR(100) UNIQUE NOT NULL,
  name                    VARCHAR(255) NOT NULL,
  aadhaar_masked          VARCHAR(20) NOT NULL,
  course_title            VARCHAR(255) NOT NULL,
  qp_code                 VARCHAR(100) NOT NULL,
  training_provider       VARCHAR(255) NOT NULL,
  district                VARCHAR(255) NOT NULL,
  gender                  VARCHAR(10) NOT NULL CHECK (gender IN ('Female', 'Male', 'Other')),
  category                VARCHAR(20) NOT NULL CHECK (category IN ('General', 'OBC', 'SC', 'ST')),
  placement_status        VARCHAR(50) NOT NULL,
  employer_name           VARCHAR(255),
  monthly_wage            INT,
  epfo_uan                VARCHAR(50),
  retention_milestone     VARCHAR(20) NOT NULL DEFAULT 'Day 30',
  pfms_credit_verified    BOOLEAN NOT NULL DEFAULT FALSE,
  biometric_audit_status  VARCHAR(50) NOT NULL DEFAULT 'Pending Biometrics',
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Employer Confirmations ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS employer_confirmations (
  id                           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id                 VARCHAR(100) NOT NULL,
  candidate_name               VARCHAR(255) NOT NULL,
  employer_name                VARCHAR(255) NOT NULL,
  hr_spoc_name                 VARCHAR(255) NOT NULL,
  hr_spoc_phone                VARCHAR(20) NOT NULL,
  designation                  VARCHAR(255) NOT NULL,
  monthly_gross_ctc            INT NOT NULL,
  date_of_joining              DATE NOT NULL,
  epfo_uan_generated           BOOLEAN NOT NULL DEFAULT FALSE,
  offer_letter_uploaded        BOOLEAN NOT NULL DEFAULT FALSE,
  salary_slip_verified         BOOLEAN NOT NULL DEFAULT FALSE,
  digital_confirmation_status  VARCHAR(100) NOT NULL DEFAULT 'Awaiting Digital Stamp',
  confirmed_by                 UUID REFERENCES users(id),
  confirmed_at                 TIMESTAMPTZ,
  created_at                   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Tranche Invoices ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tranche_invoices (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_number      VARCHAR(100) UNIQUE NOT NULL,
  batch_id            VARCHAR(50) NOT NULL,
  tranche_type        VARCHAR(100) NOT NULL,
  amount              NUMERIC(14,2) NOT NULL,
  submission_date     DATE NOT NULL,
  pfms_sanction_id    VARCHAR(100) NOT NULL,
  payment_voucher_no  VARCHAR(100),
  status              VARCHAR(100) NOT NULL DEFAULT 'Under Nodal Scrutiny',
  audit_hash          VARCHAR(64) NOT NULL,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Center Inspections ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS center_inspections (
  id                                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  center_id                           VARCHAR(100) NOT NULL,
  center_name                         VARCHAR(255) NOT NULL,
  district                            VARCHAR(255) NOT NULL,
  inspection_date                     DATE NOT NULL,
  inspector_officer                   VARCHAR(255) NOT NULL,
  cctv_surveillance_compliance        BOOLEAN NOT NULL DEFAULT FALSE,
  aadhaar_biometric_device_operational BOOLEAN NOT NULL DEFAULT FALSE,
  trainer_to_candidate_ratio          VARCHAR(20) NOT NULL,
  safety_and_sanitation_rating        NUMERIC(3,1) NOT NULL,
  overall_audit_score                 NUMERIC(5,2) NOT NULL,
  status                              VARCHAR(100) NOT NULL,
  show_cause_notice_id                VARCHAR(100),
  cap_response                        TEXT,
  cap_submitted_at                    TIMESTAMPTZ,
  created_at                          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Micro Surveys ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS micro_surveys (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id         VARCHAR(100) NOT NULL,
  candidate_name       VARCHAR(255) NOT NULL,
  phone_masked         VARCHAR(20) NOT NULL,
  milestone            VARCHAR(20) NOT NULL,
  course               VARCHAR(255) NOT NULL,
  survey_channel       VARCHAR(50) NOT NULL,
  call_status          VARCHAR(50) NOT NULL,
  is_currently_employed BOOLEAN NOT NULL DEFAULT FALSE,
  reported_salary      INT NOT NULL DEFAULT 0,
  epfo_match_flag      BOOLEAN NOT NULL DEFAULT FALSE,
  job_satisfaction     INT NOT NULL CHECK (job_satisfaction BETWEEN 1 AND 5),
  location_reluctance  BOOLEAN NOT NULL DEFAULT FALSE,
  feedback_remarks     TEXT NOT NULL DEFAULT '',
  grievance_logged     BOOLEAN NOT NULL DEFAULT FALSE,
  grievance_resolved   BOOLEAN NOT NULL DEFAULT FALSE,
  resolved_by          UUID REFERENCES users(id),
  timestamp            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Uploaded Files ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS uploaded_files (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename     VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  mime_type    VARCHAR(100) NOT NULL,
  size_bytes   INT NOT NULL,
  entity_type  VARCHAR(100),
  entity_id    VARCHAR(100),
  uploaded_by  UUID REFERENCES users(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Audit Logs ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS audit_logs (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  timestamp    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  officer      VARCHAR(255) NOT NULL,
  role         VARCHAR(50) NOT NULL,
  action       TEXT NOT NULL,
  entity       VARCHAR(255) NOT NULL,
  hash_sha256  VARCHAR(64) NOT NULL,
  status       VARCHAR(100) NOT NULL DEFAULT 'Verified'
);

-- ─── Indexes ──────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_kpi_metrics_segment ON kpi_metrics(segment);
CREATE INDEX IF NOT EXISTS idx_alerts_resolved ON alerts(resolved);
CREATE INDEX IF NOT EXISTS idx_batches_batch_id ON batches(batch_id);
CREATE INDEX IF NOT EXISTS idx_trainees_candidate_id ON trainees(candidate_id);
CREATE INDEX IF NOT EXISTS idx_micro_surveys_candidate_id ON micro_surveys(candidate_id);
CREATE INDEX IF NOT EXISTS idx_uploaded_files_entity ON uploaded_files(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_timestamp ON audit_logs(timestamp DESC);
