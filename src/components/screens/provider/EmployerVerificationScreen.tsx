import React, { useState } from 'react';
import { EMPLOYER_CONFIRMATIONS_DATA } from '../../../data/mockData';
import { EmployerConfirmation } from '../../../types';

interface EmployerVerificationScreenProps {
  onWageConfirmed: (record: EmployerConfirmation) => void;
}

export const EmployerVerificationScreen: React.FC<EmployerVerificationScreenProps> = ({
  onWageConfirmed
}) => {
  const [confirmations, setConfirmations] = useState<EmployerConfirmation[]>(EMPLOYER_CONFIRMATIONS_DATA);
  const [selectedEmployerDoc, setSelectedEmployerDoc] = useState<EmployerConfirmation | null>(null);

  const handleVerify = (id: string) => {
    setConfirmations(prev =>
      prev.map(c => c.id === id ? { ...c, digitalConfirmationStatus: 'Verified by HR', salarySlipVerified: true } : c)
    );
    const item = confirmations.find(c => c.id === id);
    if (item) onWageConfirmed(item);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded border border-[#dde9ff] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00236f]"></span>
            <h2 className="text-base font-bold text-[#00236f]">
              Employer Verification &amp; Wage Confirmation Portal
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#dde9ff] text-[#00236f] font-mono font-bold">
              STATUTORY RULE 14(B) PROOF OF PLACEMENT
            </span>
          </div>
          <p className="text-xs text-[#444651] mt-1">
            Reconciles direct employer appointment contracts, HR endorsements, and mandatory EPFO Electronic Challan Return (ECR) monthly wage proofs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded bg-[#eff4ff] text-[#003212] text-xs font-semibold border border-[#dde9ff]">
            Total Confirmed This Quarter: <strong>142 Candidates</strong>
          </span>
        </div>
      </div>

      {/* Confirmation Table */}
      <div className="bg-white p-5 rounded border border-[#dde9ff] shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#eff4ff] text-[#444651] text-[11px] font-semibold uppercase tracking-wider border-b border-[#dde9ff]">
                <th className="py-2.5 px-4">Candidate &amp; ID</th>
                <th className="py-2.5 px-4">Hiring Corporate Partner</th>
                <th className="py-2.5 px-4">HR SPOC Details</th>
                <th className="py-2.5 px-4">Designation &amp; Joining</th>
                <th className="py-2.5 px-4">Gross CTC</th>
                <th className="py-2.5 px-4">Statutory Evidence</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-right">Confirmation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dde9ff]">
              {confirmations.map(c => (
                <tr key={c.id} className="hover:bg-[#eff4ff]/60 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-bold text-[#00236f] block">{c.candidateName}</span>
                    <span className="font-mono text-[10px] text-[#444651]">{c.candidateId}</span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#0d1c2f]">
                    {c.employerName}
                  </td>
                  <td className="py-3 px-4 text-[#444651]">
                    <div>{c.hrSpocName}</div>
                    <div className="font-mono text-[10px]">{c.hrSpocPhone}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-[#0d1c2f] font-medium block">{c.designation}</span>
                    <span className="text-[10px] text-[#444651] font-mono">DOJ: {c.dateOfJoining}</span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-[#003212]">
                    ₹{c.monthlyGrossCtc.toLocaleString()}/mo
                  </td>
                  <td className="py-3 px-4 space-y-1">
                    <div className="flex items-center gap-1 text-[10px]">
                      <span className="material-symbols-outlined text-[12px] text-[#003212]">
                        {c.offerLetterUploaded ? 'check_circle' : 'pending'}
                      </span>
                      <span>Offer Letter</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px]">
                      <span className="material-symbols-outlined text-[12px] text-[#003212]">
                        {c.salarySlipVerified ? 'check_circle' : 'pending'}
                      </span>
                      <span>Salary Slip (M1-M6)</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      c.digitalConfirmationStatus === 'Verified by HR'
                        ? 'bg-[#e6eeff] text-[#003212] border border-[#95f8a7]'
                        : 'bg-[#fff8e1] text-[#b78103]'
                    }`}>
                      {c.digitalConfirmationStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedEmployerDoc(c)}
                        className="px-2 py-1 rounded bg-white text-[#00236f] hover:bg-[#eff4ff] text-[11px] font-semibold border border-[#dde9ff] cursor-pointer"
                      >
                        Inspect Dossier
                      </button>
                      {c.digitalConfirmationStatus !== 'Verified by HR' && (
                        <button
                          onClick={() => handleVerify(c.id)}
                          className="px-2.5 py-1 rounded bg-[#00236f] text-white hover:bg-[#1e3a8a] text-[11px] font-semibold cursor-pointer"
                        >
                          HR Confirm
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dossier Preview Modal */}
      {selectedEmployerDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden border border-[#c5c5d3]">
            <div className="bg-[#00236f] p-4 text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm">Employer Verification Dossier</h3>
                <p className="text-[11px] text-white/80">{selectedEmployerDoc.candidateName} • {selectedEmployerDoc.employerName}</p>
              </div>
              <button onClick={() => setSelectedEmployerDoc(null)} className="text-white/80 hover:text-white cursor-pointer text-lg">
                ✕
              </button>
            </div>

            <div className="p-5 text-xs space-y-3">
              <div className="p-3 bg-[#eff4ff] rounded border border-[#dde9ff]">
                <div className="font-bold text-[#00236f] text-sm">{selectedEmployerDoc.employerName}</div>
                <div className="text-[#444651] mt-0.5">
                  Corporate Authorized Signatory: <strong>{selectedEmployerDoc.hrSpocName}</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono bg-[#f8f9ff] p-3 rounded border border-[#dde9ff]">
                <div>
                  <span className="text-[#444651] block">Candidate ID:</span>
                  <span className="font-bold text-[#0d1c2f]">{selectedEmployerDoc.candidateId}</span>
                </div>
                <div>
                  <span className="text-[#444651] block">Agreed Monthly Wage:</span>
                  <span className="font-bold text-[#003212]">₹{selectedEmployerDoc.monthlyGrossCtc.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[#444651] block">Date of Joining:</span>
                  <span className="font-bold text-[#0d1c2f]">{selectedEmployerDoc.dateOfJoining}</span>
                </div>
                <div>
                  <span className="text-[#444651] block">EPFO UAN Generation:</span>
                  <span className="font-bold text-[#003212]">Active &amp; ECR Reconciled</span>
                </div>
              </div>

              <div className="p-2.5 rounded bg-[#e6eeff] text-[#0d1c2f] text-[11px] flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#003212]">verified</span>
                <span>
                  Employment proof complies with National Apprenticeship &amp; Skilling Mandates (Rule 14b).
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#eff4ff] border-t border-[#dde9ff] flex justify-between items-center">
              <span className="text-[11px] text-[#444651]">Digital Hash: SHA256: 4f3e2d1c...Verified</span>
              <button
                onClick={() => setSelectedEmployerDoc(null)}
                className="px-4 py-1.5 rounded bg-[#00236f] text-white text-xs font-semibold hover:bg-[#1e3a8a] cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
