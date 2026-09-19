import React from 'react';
import { AuditLogEntry } from '../../types';

interface AuditTrailModalProps {
  logs: AuditLogEntry[];
  onClose: () => void;
}

export const AuditTrailModal: React.FC<AuditTrailModalProps> = ({ logs, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-[#c5c5d3]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#00236f] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px]">history</span>
            <div>
              <h3 className="font-bold text-sm">Longitudinal Audit Trail &amp; Ledger Proofs</h3>
              <p className="text-[11px] text-white/80">
                Rule 14(b) Statutory Verification Cryptographic Ledger (Immutable)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-lg p-1.5 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content list */}
        <div className="p-4 overflow-y-auto flex-1 text-xs space-y-3">
          {logs.map(log => (
            <div
              key={log.id}
              className="p-3 bg-[#f8f9ff] border border-[#dde9ff] rounded hover:border-[#316bf3] transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#dde9ff] pb-1.5 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#dde9ff] text-[#00236f] font-bold">
                    {log.id}
                  </span>
                  <span className="font-semibold text-[#0d1c2f]">{log.action}</span>
                </div>
                <span className="text-[10px] text-[#444651] font-mono">{log.timestamp}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#444651]">
                <div>
                  <span className="font-semibold text-[#0d1c2f]">Signatory Officer:</span> {log.officer} ({log.role})
                </div>
                <div>
                  <span className="font-semibold text-[#0d1c2f]">Target Entity:</span> {log.entity}
                </div>
              </div>

              <div className="mt-2 pt-1.5 border-t border-[#dde9ff] flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-[#444651]">
                <div className="truncate max-w-[420px]" title={log.hashSha256}>
                  <span className="text-[#00236f] font-bold">SHA-256:</span> {log.hashSha256}
                </div>
                <span className="inline-flex items-center gap-1 text-[#003212] font-bold">
                  <span className="material-symbols-outlined text-[12px]">verified</span>
                  {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#eff4ff] border-t border-[#dde9ff] flex items-center justify-between">
          <span className="text-[11px] text-[#444651]">
            Ledger Hash Synchronization: Verified with National Portal Core
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-[#00236f] text-white text-xs font-semibold hover:bg-[#1e3a8a] transition-colors cursor-pointer"
          >
            Close Audit Log
          </button>
        </div>
      </div>
    </div>
  );
};
