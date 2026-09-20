-- =========================================================================
-- HireBound Seed Data — Migration 002
-- Matches the frontend mock data exactly so the UI works immediately
-- Passwords are bcrypt hashes of 'HireBound@2024'
-- =========================================================================

-- ─── Users ────────────────────────────────────────────────────────────────
INSERT INTO users (id, email, password_hash, name, role, designation, portal_mode) VALUES
  ('a0000000-0000-0000-0000-000000000001',
   'rajesh.verma@msde.gov.in',
   '$2b$10$9ILn2YMc3kf4HL7Nm8pyROqcaws1L/BgUnH125mCDLcZ13Kj2X4Su',
   'Rajesh Verma, IAS',
   'ministry_officer',
   'Joint Director, Skill Outcomes',
   'ministry-engine'),
  ('a0000000-0000-0000-0000-000000000002',
   'ms.patwardhan@yuvaskill.org',
   '$2b$10$9ILn2YMc3kf4HL7Nm8pyROqcaws1L/BgUnH125mCDLcZ13Kj2X4Su',
   'Dr. M. S. Patwardhan',
   'provider',
   'Head of Ops · Yuva Council',
   'provider-portal')
ON CONFLICT (email) DO NOTHING;

-- ─── KPI Metrics (All Segment) ────────────────────────────────────────────
INSERT INTO kpi_metrics (label, icon, value, delta, delta_positive, subtext, progress_percent, progress_color, badge_text, badge_color, footer_text, segment, reporting_cycle, sort_order) VALUES
  ('Total Trained', 'school', '12,480', NULL, TRUE, 'Annual Target: 15,000 Trainees', 83.2, 'bg-[#00236f]', NULL, NULL, '83.2% of Annual Target Met', 'All', 'Last 12 Months (FY24)', 1),
  ('NCVET Certified', 'verified', '11,240', '90.1%', TRUE, 'Statutory Certification Rate', NULL, NULL, '90.1% Certification Rate', 'bg-[#e6eeff] text-[#0051d5]', NULL, 'All', 'Last 12 Months (FY24)', 2),
  ('Formally Placed', 'work', '8,320', '74.0%', TRUE, 'EPFO Verified Placement', NULL, NULL, NULL, NULL, 'Net Delta: +₹6,200/mo', 'All', 'Last 12 Months (FY24)', 3),
  ('Retention @ 6M', 'trending_up', '71%', '+3.2%', TRUE, '4,232 Active Employees', 71, 'bg-[#003212]', NULL, NULL, '4,232 Active at 6 Months', 'All', 'Last 12 Months (FY24)', 4),
  ('Average Wage', 'payments', '₹17,400', '+55.9%', TRUE, 'Baseline: ₹11,160 at entry', NULL, NULL, NULL, NULL, 'Net Delta: +₹6,240/mo', 'All', 'Last 12 Months (FY24)', 5),
  ('Entrepreneurship', 'store', '9%', '(1,123)', FALSE, 'Self-Employed / MUDRA Linked', 9, 'bg-[#0051d5]', NULL, NULL, 'Startup India / PM SVANidhi', 'All', 'Last 12 Months (FY24)', 6),
  -- Female segment
  ('Total Trained', 'school', '5,990', NULL, TRUE, 'Annual Female Target: 7,200', 83.1, 'bg-[#00236f]', NULL, NULL, '83.1% of Target Met', 'Female', 'Last 12 Months (FY24)', 1),
  ('NCVET Certified', 'verified', '5,540', '92.4%', TRUE, 'NCVET Certified Cohort', NULL, NULL, '92.4% Certification Rate', 'bg-[#e6eeff] text-[#0051d5]', NULL, 'Female', 'Last 12 Months (FY24)', 2),
  ('Formally Placed', 'work', '3,842', '69.3%', TRUE, 'Formal EPFO Recorded', NULL, NULL, NULL, NULL, 'Net Delta: +₹5,700/mo', 'Female', 'Last 12 Months (FY24)', 3),
  ('Retention @ 6M', 'trending_up', '76%', '+5.1%', TRUE, '2,920 Active at 6 Months', 76, 'bg-[#003212]', NULL, NULL, '2,920 Active at 6 Months', 'Female', 'Last 12 Months (FY24)', 4),
  ('Average Wage', 'payments', '₹16,800', '+51.2%', TRUE, 'Baseline: ₹11,100 entry', NULL, NULL, NULL, NULL, 'Net Delta: +₹5,700/mo', 'Female', 'Last 12 Months (FY24)', 5),
  ('Entrepreneurship', 'store', '14%', '(838)', FALSE, 'Self-Help Group & Mudra', 14, 'bg-[#0051d5]', NULL, NULL, 'Self-Help Group & Mudra', 'Female', 'Last 12 Months (FY24)', 6),
  -- SC/ST/OBC segment
  ('Total Trained', 'school', '7,860', NULL, TRUE, 'Annual Inclusion Target: 9,000', 87.3, 'bg-[#00236f]', NULL, NULL, '87.3% of Target Met', 'SC/ST/OBC', 'Last 12 Months (FY24)', 1),
  ('NCVET Certified', 'verified', '7,120', '90.5%', TRUE, 'Affirmative Action Cohort', NULL, NULL, '90.5% Certification Rate', 'bg-[#e6eeff] text-[#0051d5]', NULL, 'SC/ST/OBC', 'Last 12 Months (FY24)', 2),
  ('Formally Placed', 'work', '5,510', '70.1%', TRUE, 'Active Direct Credit', NULL, NULL, NULL, NULL, 'Net Delta: +₹5,950/mo', 'SC/ST/OBC', 'Last 12 Months (FY24)', 3),
  ('Retention @ 6M', 'trending_up', '73%', '+3.8%', TRUE, '4,022 Active at 6 Months', 73, 'bg-[#003212]', NULL, NULL, '4,022 Active at 6 Months', 'SC/ST/OBC', 'Last 12 Months (FY24)', 4),
  ('Average Wage', 'payments', '₹17,100', '+53.0%', TRUE, 'Baseline: ₹11,150 entry', NULL, NULL, NULL, NULL, 'Net Delta: +₹5,950/mo', 'SC/ST/OBC', 'Last 12 Months (FY24)', 5),
  ('Entrepreneurship', 'store', '11%', '(865)', FALSE, 'Stand-Up India / PMMY', 11, 'bg-[#0051d5]', NULL, NULL, 'Stand-Up India / PMMY', 'SC/ST/OBC', 'Last 12 Months (FY24)', 6)
ON CONFLICT DO NOTHING;

-- ─── Alerts ───────────────────────────────────────────────────────────────
INSERT INTO alerts (type, title, scope, description, highlight_text, action_label, action_type) VALUES
  ('critical', 'EPFO Mismatch — 218 Candidates', 'Solapur Rural & Urban District', 'EPFO UAN verification failure across 218 trainees in Green Energy & Solar sector. Manual reconciliation with ESIC required within 72 hours to prevent tranche withholding.', '218 EPFO Mismatches', 'Dispatch Nodal Audit Team', 'dispatch'),
  ('warning', 'Low 6-Month Retention — IT Sector', 'IT-ITeS & Telephony — Pune Division', 'Retention rate for IT-ITeS sector has fallen to 58% at the 6-month milestone, below statutory 65% floor. Review employer confirmation records.', '58% Retention Rate', 'Sanction Remedial Review', 'sanction'),
  ('success', 'Tranche 3 Disbursement Cleared', 'National Power Skill Hub — Nagpur', 'All 142 eligible candidates from BAT-2024-0612 have met the 180-day retention criterion. PFMS clearance obtained. Disbursement authorized.', '₹38.4L Disbursed', 'View Disbursement Record', 'disburse')
ON CONFLICT DO NOTHING;

-- ─── Batches ──────────────────────────────────────────────────────────────
INSERT INTO batches (batch_id, qp_code, course_title, sector, center_location, start_date, end_date, enrolled_candidates, biometric_attendance_rate, assessment_cleared, placed_count, tranche1_status, tranche2_status, tranche3_status, dbt_bonus_verified, form12c_signed) VALUES
  ('BAT-2024-0842', 'SSC/Q0101', 'Solar Panel Installation & Commissioning', 'Green Energy & Solar', 'Solapur Rural VTI', '2024-01-08', '2024-04-07', 45, 91.4, 42, 38, 'Disbursed', 'Disbursed', 'Eligible for 180D Claim', TRUE, FALSE),
  ('BAT-2024-0761', 'SSC/Q0801', 'Data Entry & Office Automation Specialist', 'IT-ITeS & Telephony', 'Pune Urban Skill Hub', '2024-02-12', '2024-05-11', 38, 87.3, 35, 28, 'Disbursed', 'Processing', 'In Grace Period', FALSE, FALSE),
  ('BAT-2024-0634', 'HSC/Q5101', 'General Duty Assistant — Hospital Support', 'Healthcare & Allied', 'Nagpur Central MedVTI', '2024-03-01', '2024-06-30', 52, 94.1, 50, 45, 'Disbursed', 'Disbursed', 'Eligible for 180D Claim', TRUE, TRUE),
  ('BAT-2024-0598', 'LSC/Q2308', 'Warehouse Picker & Inventory Manager', 'Logistics & Supply Chain', 'Thane Metropol CLC', '2024-01-15', '2024-04-14', 30, 79.6, 26, 18, 'Disbursed', 'Processing', 'In Grace Period', FALSE, FALSE),
  ('BAT-2024-0512', 'SSC/Q0116', 'Domestic Data Entry Operator', 'IT-ITeS & Telephony', 'Aurangabad Digital Hub', '2024-04-01', '2024-06-30', 28, 82.1, 25, 20, 'Processing', 'Processing', 'In Grace Period', FALSE, FALSE)
ON CONFLICT (batch_id) DO NOTHING;

-- ─── Courses ──────────────────────────────────────────────────────────────
INSERT INTO courses (title, qp_code, nsqf_level, icon, icon_bg, icon_color, placed_rate, placed_count, total_candidates, avg_wage, wage_delta_percent, retention_6m, statutory_status, statutory_status_type, sector, top_employers, epfo_match_rate) VALUES
  ('Solar Panel Installation & Commissioning', 'SSC/Q0101', 4, 'bolt', 'bg-[#eff4ff]', 'text-[#0051d5]', 87.2, 1240, 1422, 19800, 59.7, 81.4, 'Green Channel', 'tertiary', 'Green Energy & Solar', ARRAY['Tata Power Solar', 'Adani Green', 'Waaree Energies'], 99.1),
  ('Data Entry & Office Automation Specialist', 'SSC/Q0801', 3, 'computer', 'bg-[#eff4ff]', 'text-[#316bf3]', 74.1, 1580, 2132, 14900, 33.5, 62.3, 'Compliant', 'neutral', 'IT-ITeS & Telephony', ARRAY['Infosys BPM', 'Wipro', 'TCS iON'], 96.8),
  ('General Duty Assistant — Hospital Support', 'HSC/Q5101', 4, 'health_and_safety', 'bg-[#fff4e6]', 'text-[#e65c00]', 91.4, 980, 1072, 21200, 72.4, 88.2, 'High Wage', 'secondary', 'Healthcare & Allied', ARRAY['Apollo Hospitals', 'Fortis', 'Aarogya Foundation'], 99.7),
  ('Warehouse Picker & Inventory Manager', 'LSC/Q2308', 3, 'inventory_2', 'bg-[#f0fdf4]', 'text-[#15803d]', 68.4, 820, 1199, 15600, 39.6, 71.1, 'Standard Audit', 'warning', 'Logistics & Supply Chain', ARRAY['Amazon India', 'Flipkart', 'Delhivery'], 94.2)
ON CONFLICT DO NOTHING;

-- ─── Trainees (sample) ────────────────────────────────────────────────────
INSERT INTO trainees (candidate_id, name, aadhaar_masked, course_title, qp_code, training_provider, district, gender, category, placement_status, employer_name, monthly_wage, epfo_uan, retention_milestone, pfms_credit_verified, biometric_audit_status) VALUES
  ('CND-2024-00142', 'Priya Deshmukh', 'XXXX-XXXX-3821', 'Solar Panel Installation & Commissioning', 'SSC/Q0101', 'Yuva Skill Council', 'Solapur Rural', 'Female', 'OBC', 'Employed', 'Tata Power Solar', 19800, 'UAN100234567', 'Day 180', TRUE, 'Verified'),
  ('CND-2024-00189', 'Ravi Patil', 'XXXX-XXXX-6120', 'Data Entry & Office Automation Specialist', 'SSC/Q0801', 'Yuva Skill Council', 'Pune Division', 'Male', 'General', 'Employed', 'Infosys BPM', 14900, 'UAN100234890', 'Day 90', TRUE, 'Verified'),
  ('CND-2024-00231', 'Sunita Kamble', 'XXXX-XXXX-4490', 'General Duty Assistant — Hospital Support', 'HSC/Q5101', 'Aarogya Foundation', 'Nagpur Industrial', 'Female', 'SC', 'Employed', 'Apollo Hospitals', 21200, 'UAN100235012', 'Day 180', TRUE, 'Verified'),
  ('CND-2024-00312', 'Akash Sharma', 'XXXX-XXXX-8801', 'Warehouse Picker & Inventory Manager', 'LSC/Q2308', 'National Power Skill Hub', 'Thane Metropol', 'Male', 'ST', 'Unplaced', NULL, NULL, NULL, 'Day 30', FALSE, 'Pending Biometrics')
ON CONFLICT (candidate_id) DO NOTHING;

-- ─── Employer Confirmations ───────────────────────────────────────────────
INSERT INTO employer_confirmations (candidate_id, candidate_name, employer_name, hr_spoc_name, hr_spoc_phone, designation, monthly_gross_ctc, date_of_joining, epfo_uan_generated, offer_letter_uploaded, salary_slip_verified, digital_confirmation_status) VALUES
  ('CND-2024-00142', 'Priya Deshmukh', 'Tata Power Solar', 'Ramesh Iyer', '9820041234', 'Junior Technician', 19800, '2024-05-01', TRUE, TRUE, TRUE, 'Verified by HR'),
  ('CND-2024-00189', 'Ravi Patil', 'Infosys BPM', 'Kavita Nair', '9731023456', 'Data Associate', 14900, '2024-05-15', TRUE, TRUE, FALSE, 'Awaiting Digital Stamp'),
  ('CND-2024-00231', 'Sunita Kamble', 'Apollo Hospitals', 'Dr. Seema Ghosh', '9841056789', 'GDA Staff', 21200, '2024-06-01', TRUE, TRUE, TRUE, 'Verified by HR')
ON CONFLICT DO NOTHING;

-- ─── Tranche Invoices ─────────────────────────────────────────────────────
INSERT INTO tranche_invoices (invoice_number, batch_id, tranche_type, amount, submission_date, pfms_sanction_id, payment_voucher_no, status, audit_hash) VALUES
  ('INV-2024-T1-0842', 'BAT-2024-0842', 'Tranche 1 (30% Mobilization)', 405000, '2024-01-20', 'PFMS-MH-24-00321', 'PV-2024-00412', 'Settled via PFMS', 'a3f9e2c1b4d7f6e5'),
  ('INV-2024-T2-0842', 'BAT-2024-0842', 'Tranche 2 (40% Certification)', 540000, '2024-05-10', 'PFMS-MH-24-00722', 'PV-2024-00874', 'Settled via PFMS', 'b7d4a1f9e3c2b8d6'),
  ('INV-2024-T3-0842', 'BAT-2024-0842', 'Tranche 3 (30% 180D Retention)', 405000, '2024-09-01', 'PFMS-MH-24-01234', NULL, 'Pending Form 12-C e-Sign', 'c2e8f5a3d1b9c7e4'),
  ('INV-2024-T1-0761', 'BAT-2024-0761', 'Tranche 1 (30% Mobilization)', 342000, '2024-02-28', 'PFMS-MH-24-00445', 'PV-2024-00521', 'Settled via PFMS', 'd9c4b2e7f1a6d3c8'),
  ('INV-2024-T2-0761', 'BAT-2024-0761', 'Tranche 2 (40% Certification)', 456000, '2024-06-15', 'PFMS-MH-24-00891', NULL, 'Under Nodal Scrutiny', 'e5f1d8c3b4a7e2f9')
ON CONFLICT (invoice_number) DO NOTHING;

-- ─── Center Inspections ───────────────────────────────────────────────────
INSERT INTO center_inspections (center_id, center_name, district, inspection_date, inspector_officer, cctv_surveillance_compliance, aadhaar_biometric_device_operational, trainer_to_candidate_ratio, safety_and_sanitation_rating, overall_audit_score, status, show_cause_notice_id) VALUES
  ('CTR-MH-0421', 'Solapur Rural VTI', 'Solapur Rural', '2024-07-15', 'Dinesh Kulkarni, Dy. DO', TRUE, TRUE, '1:12', 4.2, 88.5, 'Passed - Unconditional', NULL),
  ('CTR-MH-0189', 'Pune Urban Skill Hub', 'Pune Division', '2024-07-22', 'Anjali Mehta, Dist. Officer', TRUE, FALSE, '1:18', 3.1, 64.0, 'Conditional Warning Issued', 'SCN-2024-0189-A'),
  ('CTR-MH-0302', 'Nagpur Central MedVTI', 'Nagpur Industrial', '2024-08-05', 'Prakash Bose, Nodal Insp.', TRUE, TRUE, '1:10', 4.8, 95.2, 'Passed - Unconditional', NULL),
  ('CTR-MH-0098', 'Thane Metropol CLC', 'Thane Metropol', '2024-08-12', 'Smita Rane, Nodal Insp.', FALSE, FALSE, '1:24', 2.3, 41.0, 'Show-Cause Issued', 'SCN-2024-0098-B')
ON CONFLICT DO NOTHING;

-- ─── Micro Surveys ────────────────────────────────────────────────────────
INSERT INTO micro_surveys (candidate_id, candidate_name, phone_masked, milestone, course, survey_channel, call_status, is_currently_employed, reported_salary, epfo_match_flag, job_satisfaction, location_reluctance, feedback_remarks, grievance_logged) VALUES
  ('CND-2024-00142', 'Priya Deshmukh', 'XXXXXX3821', 'Day 180', 'Solar Panel Installation', 'Automated IVR', 'Verified Complete', TRUE, 19800, TRUE, 5, FALSE, 'Very satisfied with job. Skill training was highly relevant.', FALSE),
  ('CND-2024-00189', 'Ravi Patil', 'XXXXXX6120', 'Day 90', 'Data Entry & Office Automation', 'WhatsApp Bot', 'Verified Complete', TRUE, 14900, TRUE, 4, FALSE, 'Good job. Would like more advanced IT training.', FALSE),
  ('CND-2024-00312', 'Akash Sharma', 'XXXXXX8801', 'Day 30', 'Warehouse Picker', 'Nodal Call Center', 'Callback Requested', FALSE, 0, FALSE, 2, TRUE, 'Could not find job near home district. Requesting relocation support.', TRUE)
ON CONFLICT DO NOTHING;

-- ─── Audit Logs ───────────────────────────────────────────────────────────
INSERT INTO audit_logs (timestamp, officer, role, action, entity, hash_sha256, status) VALUES
  (NOW() - INTERVAL '2 days', 'Rajesh Verma, IAS', 'ministry_officer', 'Exported Longitudinal Summary Report (PDF)', 'KPI Dashboard — FY24 All Segments', 'a3f9e2c1b4d7f6e5c2d8b1a4f7e3c9d2', 'Cryptographically Sealed'),
  (NOW() - INTERVAL '1 day', 'Rajesh Verma, IAS', 'ministry_officer', 'Actioned Alert: Dispatch Nodal Audit Team', 'Alert: EPFO Mismatch — 218 Candidates', 'b7c2d9e4f1a6b3c8d5e2f9a1b4c7d3e6', 'Verified'),
  (NOW() - INTERVAL '3 hours', 'Dr. M. S. Patwardhan', 'provider', 'Submitted Tranche 3 Invoice', 'INV-2024-T3-0842 — BAT-2024-0842', 'c5d8e3f2a7b1c9d4e6f3a2b8c1d7e4f5', 'Pending Block Inclusion')
ON CONFLICT DO NOTHING;
