import React, { useState } from 'react';
import { TRAINEE_SAMPLE_RECORDS } from '../../data/mockData';
import { TraineeRecord } from '../../types';

export const TraineeCohortsScreen: React.FC = () => {
  const [selectedTrainee, setSelectedTrainee] = useState<TraineeRecord | null>(null);
  const [filterQuery, setFilterQuery] = useState('');

  const filtered = TRAINEE_SAMPLE_RECORDS.filter(t => 
    t.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    t.candidateId.toLowerCase().includes(filterQuery.toLowerCase()) ||
    t.courseTitle.toLowerCase().includes(filterQuery.toLowerCase()) ||
    t.district.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded border border-[#dde9ff] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00236f]"></span>
            <h2 className="text-base font-bold text-[#00236f]">
              Trainee Micro-Data Registry &amp; Longitudinal Profiles
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#dde9ff] text-[#00236f] font-mono font-bold">
              AADHAAR MASKED • PRIVACY COMPLIANT
            </span>
          </div>
          <p className="text-xs text-[#444651] mt-1">
            Auditable individual trajectory with EPFO Universal Account Number (UAN) cross-matching and PFMS direct banking credit reconciliation.
          </p>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search candidate name, ID, or course..."
            value={filterQuery}
            onChange={e => setFilterQuery(e.target.value)}
            className="text-xs bg-[#eff4ff] text-[#0d1c2f] rounded pl-7 pr-3 py-1.5 border border-[#dde9ff] focus:outline-none focus:border-[#316bf3] w-64"
          />
          <span className="material-symbols-outlined text-[15px] absolute left-2 top-2 text-[#444651]">
            search
          </span>
        </div>
      </div>

      {/* Trainees List Table */}
      <div className="bg-white p-5 rounded border border-[#dde9ff] shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#eff4ff] text-[#444651] text-[11px] font-semibold uppercase tracking-wider border-b border-[#dde9ff]">
                <th className="py-2.5 px-4">Candidate ID</th>
                <th className="py-2.5 px-4">Trainee Name</th>
                <th className="py-2.5 px-4">Masked Aadhaar</th>
                <th className="py-2.5 px-4">Enrolled Course</th>
                <th className="py-2.5 px-4">District / Provider</th>
                <th className="py-2.5 px-4">Employment Status</th>
                <th className="py-2.5 px-4">Retention Milestone</th>
                <th className="py-2.5 px-4">Biometric Status</th>
                <th className="py-2.5 px-4 text-right">Dossier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dde9ff]">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-[#eff4ff]/60 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#00236f]">{t.candidateId}</td>
                  <td className="py-3 px-4 font-semibold text-[#0d1c2f]">{t.name}</td>
                  <td className="py-3 px-4 font-mono text-[#444651]">{t.aadhaarMasked}</td>
                  <td className="py-3 px-4 text-[#00236f] font-medium">{t.courseTitle}</td>
                  <td className="py-3 px-4 text-[#444651]">
                    <div>{t.district}</div>
                    <div className="text-[10px] text-[#444651]/80">{t.trainingProvider}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      t.placementStatus === 'Employed'
                        ? 'bg-[#e6eeff] text-[#003212]'
                        : t.placementStatus === 'Self-Employed'
                        ? 'bg-[#eff4ff] text-[#0051d5]'
                        : 'bg-[#ffdad6] text-[#ba1a1a]'
                    }`}>
                      {t.placementStatus}
                    </span>
                    {t.monthlyWage && (
                      <span className="block text-[10px] font-mono text-[#444651]">
                        ₹{t.monthlyWage.toLocaleString()}/mo
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-[#0d1c2f]">
                    {t.retentionMilestone}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] font-semibold flex items-center gap-1 ${
                      t.biometricAuditStatus === 'Verified' ? 'text-[#003212]' : 'text-[#ba1a1a]'
                    }`}>
                      <span className="material-symbols-outlined text-[12px]">
                        {t.biometricAuditStatus === 'Verified' ? 'verified' : 'warning'}
                      </span>
                      {t.biometricAuditStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedTrainee(t)}
                      className="px-2.5 py-1 rounded bg-[#eff4ff] hover:bg-[#dde9ff] text-[#00236f] text-xs font-semibold cursor-pointer border border-[#dde9ff]"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trainee Inspect Modal */}
      {selectedTrainee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden border border-[#c5c5d3]">
            <div className="bg-[#00236f] p-4 text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm">Trainee Statutory Record</h3>
                <p className="text-[11px] text-white/80">{selectedTrainee.candidateId}</p>
              </div>
              <button
                onClick={() => setSelectedTrainee(null)}
                className="text-white/80 hover:text-white cursor-pointer text-lg"
              >
                ✕
              </button>
            </div>

            <div className="p-5 text-xs space-y-3">
              <div className="p-3 bg-[#eff4ff] rounded border border-[#dde9ff]">
                <div className="text-sm font-bold text-[#00236f]">{selectedTrainee.name}</div>
                <div className="text-[#444651] mt-0.5">
                  Masked Aadhaar: <strong>{selectedTrainee.aadhaarMasked}</strong> • Category: {selectedTrainee.category} • Gender: {selectedTrainee.gender}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-[#f8f9ff] p-3 rounded border border-[#dde9ff]">
                <div>
                  <span className="text-[#444651] block">Course QP:</span>
                  <span className="font-bold text-[#0d1c2f]">{selectedTrainee.qpCode}</span>
                </div>
                <div>
                  <span className="text-[#444651] block">Training Agency:</span>
                  <span className="font-bold text-[#0d1c2f]">{selectedTrainee.trainingProvider}</span>
                </div>
                <div>
                  <span className="text-[#444651] block">Employer Name:</span>
                  <span className="font-bold text-[#0051d5]">{selectedTrainee.employerName || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[#444651] block">EPFO UAN:</span>
                  <span className="font-bold text-[#003212]">{selectedTrainee.epfoUAN || 'Direct Mudra Registered'}</span>
                </div>
              </div>

              <div className="p-2.5 rounded bg-[#e6eeff] text-[#0d1c2f] text-[11px] flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#003212]">verified</span>
                <span>
                  PFMS Direct Banking Reconciliation: {selectedTrainee.pfmsCreditVerified ? 'Cleared & Disbursed' : 'Held Pending Field Verification'}
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#eff4ff] border-t border-[#dde9ff] flex justify-end">
              <button
                onClick={() => setSelectedTrainee(null)}
                className="px-4 py-1.5 rounded bg-[#00236f] text-white text-xs font-semibold hover:bg-[#1e3a8a] cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
