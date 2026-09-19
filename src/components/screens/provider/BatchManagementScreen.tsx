import React, { useState } from 'react';
import { BATCHES_DATA } from '../../../data/mockData';
import { BatchRecord } from '../../../types';

interface BatchManagementScreenProps {
  onOpenDBTVerification: (batch: BatchRecord) => void;
  onOpenForm12C: (batch: BatchRecord) => void;
}

export const BatchManagementScreen: React.FC<BatchManagementScreenProps> = ({
  onOpenDBTVerification,
  onOpenForm12C
}) => {
  const [batches] = useState<BatchRecord[]>(BATCHES_DATA);
  const [selectedBatchId, setSelectedBatchId] = useState<string>('BAT-2024-0842');

  const activeBatch = batches.find(b => b.batchId === selectedBatchId) || batches[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded border border-[#dde9ff] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00236f]"></span>
            <h2 className="text-base font-bold text-[#00236f]">
              Batch &amp; Cohort Operational Management
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#dde9ff] text-[#00236f] font-mono font-bold">
              EMPANELLED PROVIDER PORTAL
            </span>
          </div>
          <p className="text-xs text-[#444651] mt-1">
            Real-time enrollment tracking, Aadhaar biometric attendance threshold monitoring, and statutory milestone claim readiness.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded bg-[#eff4ff] text-[#00236f] text-xs font-semibold border border-[#dde9ff]">
            Provider Agency: <strong>Yuva Skill Council (Solapur Center 01)</strong>
          </span>
        </div>
      </div>

      {/* Batches Table */}
      <div className="bg-white p-5 rounded border border-[#dde9ff] shadow-xs">
        <div className="flex items-center justify-between mb-4 border-b border-[#eff4ff] pb-2">
          <h3 className="font-bold text-sm text-[#00236f]">Active Vocational Batches &amp; Cohort Ledgers</h3>
          <span className="text-xs text-[#444651]">Total Batches: {batches.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#eff4ff] text-[#444651] text-[11px] font-semibold uppercase tracking-wider border-b border-[#dde9ff]">
                <th className="py-2.5 px-4">Batch ID &amp; Course</th>
                <th className="py-2.5 px-4">Training Center</th>
                <th className="py-2.5 px-4">Enrolled / Passed</th>
                <th className="py-2.5 px-4">Biometric Attendance</th>
                <th className="py-2.5 px-4">Verified Placed</th>
                <th className="py-2.5 px-4">Tranche 3 Status</th>
                <th className="py-2.5 px-4 text-right">Statutory Workflows</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dde9ff]">
              {batches.map(batch => (
                <tr
                  key={batch.id}
                  onClick={() => setSelectedBatchId(batch.batchId)}
                  className={`cursor-pointer transition-colors ${
                    selectedBatchId === batch.batchId ? 'bg-[#eff4ff]/80' : 'hover:bg-[#eff4ff]/40'
                  }`}
                >
                  <td className="py-3 px-4">
                    <span className="font-mono font-bold text-[#00236f] block">{batch.batchId}</span>
                    <span className="font-semibold text-[#0d1c2f] block">{batch.courseTitle}</span>
                    <span className="text-[10px] text-[#444651] font-mono">{batch.qpCode}</span>
                  </td>
                  <td className="py-3 px-4 text-[#444651]">
                    <div>{batch.centerLocation}</div>
                    <div className="text-[10px] text-[#444651]/80">{batch.startDate} — {batch.endDate}</div>
                  </td>
                  <td className="py-3 px-4 font-mono">
                    <span className="font-bold text-[#0d1c2f]">{batch.assessmentCleared}</span> / {batch.enrolledCandidates}
                    <span className="block text-[10px] text-[#003212]">
                      {Math.round((batch.assessmentCleared / batch.enrolledCandidates) * 100)}% Cleared
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className={`font-mono font-bold ${
                        batch.biometricAttendanceRate >= 80 ? 'text-[#003212]' : 'text-[#ba1a1a]'
                      }`}>
                        {batch.biometricAttendanceRate}%
                      </span>
                      <span className="text-[10px] text-[#444651]">
                        (Req &gt;80%)
                      </span>
                    </div>
                    <div className="w-24 bg-[#e6eeff] h-1.5 rounded overflow-hidden mt-1">
                      <div
                        className={`h-full rounded ${
                          batch.biometricAttendanceRate >= 80 ? 'bg-[#003212]' : 'bg-[#ba1a1a]'
                        }`}
                        style={{ width: `${Math.min(100, batch.biometricAttendanceRate)}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-[#003212]">
                    {batch.placedCount} Candidates
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      batch.tranche3Status.includes('Eligible')
                        ? 'bg-[#e6eeff] text-[#003212] border border-[#95f8a7]'
                        : 'bg-[#ffdad6] text-[#ba1a1a]'
                    }`}>
                      {batch.tranche3Status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onOpenDBTVerification(batch);
                        }}
                        className="px-2.5 py-1 rounded bg-white text-[#00236f] hover:bg-[#eff4ff] text-[11px] font-semibold border border-[#dde9ff] cursor-pointer"
                        title="Certificate & DBT Bonus Verification"
                      >
                        DBT Bonus
                      </button>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onOpenForm12C(batch);
                        }}
                        className="px-2.5 py-1 rounded bg-[#00236f] text-white hover:bg-[#1e3a8a] text-[11px] font-semibold cursor-pointer"
                        title="Form 12-C Digital Attestation"
                      >
                        Form 12-C e-Sign
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Batch Detailed Card */}
      {activeBatch && (
        <div className="bg-white p-5 rounded border border-[#dde9ff] shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eff4ff] pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-[#00236f]">Cohort Spotlight: {activeBatch.batchId}</h3>
                <span className="px-2 py-0.5 rounded bg-[#95f8a7] text-[#00210a] text-[10px] font-bold">
                  Rule 14(b) Compliant
                </span>
              </div>
              <p className="text-xs text-[#444651] mt-0.5">{activeBatch.courseTitle} • {activeBatch.centerLocation}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenDBTVerification(activeBatch)}
                className="px-3 py-1.5 rounded bg-[#eff4ff] hover:bg-[#dde9ff] text-[#00236f] text-xs font-semibold border border-[#dde9ff] cursor-pointer flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[15px]">account_balance_wallet</span>
                <span>Open DBT Bonus Verification Panel</span>
              </button>

              <button
                onClick={() => onOpenForm12C(activeBatch)}
                className="px-3.5 py-1.5 rounded bg-[#00236f] hover:bg-[#1e3a8a] text-white text-xs font-semibold cursor-pointer flex items-center gap-1 shadow-xs"
              >
                <span className="material-symbols-outlined text-[15px]">edit_document</span>
                <span>Initiate Form 12-C e-Sign</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-[#eff4ff] rounded border border-[#dde9ff]">
              <span className="text-[#444651] block text-[10px]">Tranche 1 (30% Mobilization)</span>
              <span className="font-bold text-[#003212] font-mono">₹2,70,000 Disbursed</span>
              <span className="text-[10px] text-[#444651] block mt-0.5">Voucher: C032489102488</span>
            </div>
            <div className="p-3 bg-[#eff4ff] rounded border border-[#dde9ff]">
              <span className="text-[#444651] block text-[10px]">Tranche 2 (40% Certification)</span>
              <span className="font-bold text-[#003212] font-mono">₹3,60,000 Disbursed</span>
              <span className="text-[10px] text-[#444651] block mt-0.5">Voucher: C052491204899</span>
            </div>
            <div className="p-3 bg-[#eff4ff] rounded border border-[#dde9ff]">
              <span className="text-[#444651] block text-[10px]">Tranche 3 (30% 180D Retention)</span>
              <span className="font-bold text-[#0051d5] font-mono">₹2,70,000 Eligible</span>
              <span className="text-[10px] text-[#003212] block mt-0.5">Awaiting Form 12-C e-Sign</span>
            </div>
            <div className="p-3 bg-[#eff4ff] rounded border border-[#dde9ff]">
              <span className="text-[#444651] block text-[10px]">Trainee Post-Placement DBT</span>
              <span className="font-bold text-[#003212] font-mono">27 / 27 Seeded</span>
              <span className="text-[10px] text-[#003212] block mt-0.5">NPCI Gateway Cleared</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
