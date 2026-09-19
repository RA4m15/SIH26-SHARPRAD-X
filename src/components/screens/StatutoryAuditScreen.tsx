import React from 'react';
import { AUDIT_TRAIL_LOG } from '../../data/mockData';

interface StatutoryAuditScreenProps {
  onSealLedgerAction: () => void;
  isLedgerSealed: boolean;
}

export const StatutoryAuditScreen: React.FC<StatutoryAuditScreenProps> = ({
  onSealLedgerAction,
  isLedgerSealed
}) => {
  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-white p-5 rounded border border-[#dde9ff] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00236f]"></span>
            <h2 className="text-base font-bold text-[#00236f]">
              Statutory NCVET &amp; Rule 14(b) Audit Compliance Architecture
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#dde9ff] text-[#00236f] font-mono font-bold">
              GAZETTE DIRECTIVE 2024
            </span>
          </div>
          <p className="text-xs text-[#444651] mt-1">
            Tamper-evident verification repository guaranteeing physical biometric checks, EPFO direct employer filings, and PFMS financial governance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onSealLedgerAction}
            className={`px-4 py-2 rounded text-white text-xs font-semibold shadow-xs cursor-pointer flex items-center gap-1.5 ${
              isLedgerSealed ? 'bg-[#003212]' : 'bg-[#00236f] hover:bg-[#1e3a8a]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isLedgerSealed ? 'verified' : 'encrypted'}
            </span>
            <span>{isLedgerSealed ? 'Ledger Block Cryptographically Sealed' : 'Seal Current Quarter Ledger'}</span>
          </button>
        </div>
      </div>

      {/* Compliance Rule Checkpoints */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded border border-[#dde9ff] shadow-xs">
          <div className="flex items-center gap-2 text-[#003212] font-bold text-xs mb-2">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>Rule 14(b) - Physical Aadhaar Biometrics</span>
          </div>
          <p className="text-xs text-[#444651] leading-relaxed">
            Minimum 80% biometric attendance required prior to assessment grant. Current Maharashtra statewide compliance stands at <strong>94.2%</strong>.
          </p>
          <div className="mt-3 text-[11px] font-mono text-[#003212] font-semibold bg-[#eff4ff] p-2 rounded">
            NCVET Status: FULLY COMPLIANT
          </div>
        </div>

        <div className="bg-white p-4 rounded border border-[#dde9ff] shadow-xs">
          <div className="flex items-center gap-2 text-[#0051d5] font-bold text-xs mb-2">
            <span className="material-symbols-outlined text-[18px]">cloud_sync</span>
            <span>EPFO / ESIC Direct Electronic Verification</span>
          </div>
          <p className="text-xs text-[#444651] leading-relaxed">
            Wage verification strictly validated against direct statutory contributions. No manual employer letters accepted without electronic UAN match.
          </p>
          <div className="mt-3 text-[11px] font-mono text-[#0051d5] font-semibold bg-[#eff4ff] p-2 rounded">
            Match Ratio: 96.8% AUTOMATED
          </div>
        </div>

        <div className="bg-white p-4 rounded border border-[#dde9ff] shadow-xs">
          <div className="flex items-center gap-2 text-[#00236f] font-bold text-xs mb-2">
            <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
            <span>PFMS 180-Day Incentive Disbursement</span>
          </div>
          <p className="text-xs text-[#444651] leading-relaxed">
            Direct outcome incentives to empanelled training providers released strictly upon automated 180-day continuous PF contribution validation.
          </p>
          <div className="mt-3 text-[11px] font-mono text-[#00236f] font-semibold bg-[#eff4ff] p-2 rounded">
            Tranche 3 Disbursed: ₹4.82 Cr
          </div>
        </div>
      </div>

      {/* Immutable Transaction Blocks */}
      <div className="bg-white p-5 rounded border border-[#dde9ff] shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm text-[#00236f]">
            Statutory Cryptographic Log Entries (SHA-256)
          </h3>
          <span className="text-xs text-[#444651] font-mono">Blockchain Consensus Node: IN-MSDE-01</span>
        </div>

        <div className="space-y-3">
          {AUDIT_TRAIL_LOG.map(log => (
            <div key={log.id} className="p-3 bg-[#f8f9ff] border border-[#dde9ff] rounded text-xs">
              <div className="flex justify-between items-center text-[11px] mb-1">
                <span className="font-mono font-bold text-[#00236f]">{log.id} • {log.timestamp}</span>
                <span className="text-[#003212] font-bold font-mono">SEALED</span>
              </div>
              <div className="font-semibold text-[#0d1c2f]">{log.action}</div>
              <div className="text-[11px] text-[#444651] mt-0.5">
                Signatory: {log.officer} | Entity: {log.entity}
              </div>
              <div className="mt-2 text-[10px] font-mono text-[#444651] bg-[#eff4ff] p-1.5 rounded truncate">
                Hash: {log.hashSha256}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
