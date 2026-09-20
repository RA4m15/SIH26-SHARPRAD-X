import React, { useState, useEffect } from 'react';
import { api } from '../../../api/client';
import { TrancheInvoice } from '../../../types';
import { TRANCHE_INVOICES_DATA } from '../../../data/mockData';
import { Loader2 } from 'lucide-react';

interface TrancheInvoicingScreenProps {
  onOpenForm12CClaim: (invoice: TrancheInvoice) => void;
}

export const TrancheInvoicingScreen: React.FC<TrancheInvoicingScreenProps> = ({
  onOpenForm12CClaim
}) => {
  const [invoices, setInvoices] = useState<TrancheInvoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get<{ success: boolean; data: TrancheInvoice[] }>('/invoices')
      .then(res => setInvoices(res.data && res.data.length > 0 ? res.data : TRANCHE_INVOICES_DATA))
      .catch(() => setInvoices(TRANCHE_INVOICES_DATA))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-hirebound-primary h-8 w-8" /></div>;
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded border border-[#dde9ff] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00236f]"></span>
            <h2 className="text-base font-bold text-[#00236f]">
              Tranche Invoicing &amp; PFMS Disbursement Ledger
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#dde9ff] text-[#00236f] font-mono font-bold">
              PUBLIC FINANCIAL MANAGEMENT SYSTEM (PFMS)
            </span>
          </div>
          <p className="text-xs text-[#444651] mt-1">
            Automated tranche release governance based on independent NCVET certification (40%) and 180-day longitudinal retention verification (30%).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#eff4ff] rounded border border-[#dde9ff] text-xs">
            <span className="text-[#444651] text-[10px] block">Total Disbursed (FY24)</span>
            <span className="font-bold text-[#003212] font-mono text-sm">₹6,30,000</span>
          </div>
          <div className="p-2.5 bg-[#eff4ff] rounded border border-[#dde9ff] text-xs">
            <span className="text-[#444651] text-[10px] block">Pending Retention Claim</span>
            <span className="font-bold text-[#0051d5] font-mono text-sm">₹2,70,000</span>
          </div>
        </div>
      </div>

      {/* Tranches Table */}
      <div className="bg-white p-5 rounded border border-[#dde9ff] shadow-xs">
        <div className="flex items-center justify-between mb-4 border-b border-[#eff4ff] pb-2">
          <h3 className="font-bold text-sm text-[#00236f]">PFMS Invoicing Vouchers &amp; Audit Hashes</h3>
          <span className="text-xs text-[#444651]">PFMS Agency Code: MH-SOL-YUV-01</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#eff4ff] text-[#444651] text-[11px] font-semibold uppercase tracking-wider border-b border-[#dde9ff]">
                <th className="py-2.5 px-4">Invoice No &amp; Batch</th>
                <th className="py-2.5 px-4">Tranche Classification</th>
                <th className="py-2.5 px-4">Claim Amount</th>
                <th className="py-2.5 px-4">Submission Date</th>
                <th className="py-2.5 px-4">PFMS Sanction ID</th>
                <th className="py-2.5 px-4">Payment Voucher</th>
                <th className="py-2.5 px-4">Disbursement Status</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dde9ff]">
              {invoices.map(inv => (
                <tr key={inv.id} className="hover:bg-[#eff4ff]/60 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-mono font-bold text-[#00236f] block">{inv.invoiceNumber}</span>
                    <span className="font-mono text-[10px] text-[#444651]">{inv.batchId}</span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#0d1c2f]">
                    {inv.trancheType}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-sm text-[#0d1c2f]">
                    ₹{inv.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-mono text-[#444651]">
                    {inv.submissionDate}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-[#00236f]">
                    {inv.pfmsSanctionId}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-[#444651]">
                    {inv.paymentVoucherNo || '—'}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      inv.status === 'Settled via PFMS'
                        ? 'bg-[#e6eeff] text-[#003212] border border-[#95f8a7]'
                        : 'bg-[#fff8e1] text-[#b78103]'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {inv.status.includes('Pending') ? (
                      <button
                        onClick={() => onOpenForm12CClaim(inv)}
                        className="px-3 py-1 rounded bg-[#00236f] hover:bg-[#1e3a8a] text-white text-xs font-semibold cursor-pointer flex items-center gap-1 ml-auto"
                      >
                        <span className="material-symbols-outlined text-[14px]">edit_document</span>
                        <span>e-Sign Form 12-C</span>
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[#003212] font-semibold text-xs">
                        <span className="material-symbols-outlined text-[14px]">verified</span>
                        <span>Settled</span>
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
