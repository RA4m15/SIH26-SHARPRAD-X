import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { anyRole, ministryOnly } from '../middleware/rbac';
import { upload } from '../middleware/upload';

import * as authCtrl from '../controllers/auth.controller';
import * as kpisCtrl from '../controllers/kpis.controller';
import * as batchesCtrl from '../controllers/batches.controller';
import * as traineesCtrl from '../controllers/trainees.controller';
import * as empCtrl from '../controllers/employerVerifications.controller';
import * as invCtrl from '../controllers/invoices.controller';
import * as inspCtrl from '../controllers/inspections.controller';
import * as surveyCtrl from '../controllers/surveys.controller';
import * as coursesCtrl from '../controllers/courses.controller';
import * as uploadCtrl from '../controllers/upload.controller';
import * as exportCtrl from '../controllers/export.controller';
import * as notifCtrl from '../controllers/notifications.controller';

const router = Router();

// ── Auth ──────────────────────────────────────────────────────────────────
router.post('/auth/login', authCtrl.login);
router.post('/auth/refresh', authCtrl.refresh);
router.post('/auth/logout', authCtrl.logout);
router.get('/auth/me', authenticate, authCtrl.me);

// ── KPIs & Alerts ─────────────────────────────────────────────────────────
router.get('/kpis', authenticate, anyRole, kpisCtrl.getKPIs);
router.get('/kpis/alerts', authenticate, anyRole, kpisCtrl.getAlerts);
router.patch('/kpis/alerts/:id/resolve', authenticate, ministryOnly, kpisCtrl.resolveAlert);

// ── Batches ───────────────────────────────────────────────────────────────
router.get('/batches', authenticate, anyRole, batchesCtrl.getBatches);
router.get('/batches/:id', authenticate, anyRole, batchesCtrl.getBatch);
router.patch('/batches/:id/form12c-sign', authenticate, anyRole, batchesCtrl.signForm12C);
router.patch('/batches/:id/dbt-verify', authenticate, anyRole, batchesCtrl.verifyDBT);

// ── Trainees ──────────────────────────────────────────────────────────────
router.get('/trainees', authenticate, anyRole, traineesCtrl.getTrainees);
router.get('/trainees/:id', authenticate, anyRole, traineesCtrl.getTrainee);

// ── Employer Verifications ────────────────────────────────────────────────
router.get('/employer-verifications', authenticate, anyRole, empCtrl.getConfirmations);
router.patch('/employer-verifications/:id/confirm', authenticate, anyRole, empCtrl.confirmEmployer);

// ── Tranche Invoices ──────────────────────────────────────────────────────
router.get('/invoices', authenticate, anyRole, invCtrl.getInvoices);
router.post('/invoices', authenticate, anyRole, invCtrl.createInvoice);
router.patch('/invoices/:id/claim', authenticate, anyRole, invCtrl.claimInvoice);

// ── Center Inspections ────────────────────────────────────────────────────
router.get('/inspections', authenticate, anyRole, inspCtrl.getInspections);
router.post('/inspections/:id/show-cause-response', authenticate, anyRole, inspCtrl.submitCAP);

// ── Micro Surveys ─────────────────────────────────────────────────────────
router.get('/surveys', authenticate, anyRole, surveyCtrl.getSurveys);
router.patch('/surveys/:id/resolve-grievance', authenticate, ministryOnly, surveyCtrl.resolveGrievance);

// ── Courses ───────────────────────────────────────────────────────────────
router.get('/courses', authenticate, anyRole, coursesCtrl.getCourses);
router.get('/courses/:id', authenticate, anyRole, coursesCtrl.getCourse);

// ── File Upload ───────────────────────────────────────────────────────────
router.post('/upload/evidence', authenticate, anyRole, upload.single('file'), uploadCtrl.uploadEvidence);
router.post('/upload/offer-letter', authenticate, anyRole, upload.single('file'), uploadCtrl.uploadOfferLetter);

// ── Export ────────────────────────────────────────────────────────────────
router.post('/export/pdf', authenticate, ministryOnly, exportCtrl.exportPDF);
router.post('/export/xlsx', authenticate, ministryOnly, exportCtrl.exportXLSX);
router.post('/export/csv', authenticate, ministryOnly, exportCtrl.exportCSV);

// ── Notifications ─────────────────────────────────────────────────────────
router.post('/notifications/send-email', authenticate, anyRole, notifCtrl.sendNotification);

export default router;
