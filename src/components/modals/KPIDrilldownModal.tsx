import React from 'react';
import { KPIMetric } from '../../types';

interface KPIDrilldownModalProps {
  kpi: KPIMetric | null;
  onClose: () => void;
}

export const KPIDrilldownModal: React.FC<KPIDrilldownModalProps> = ({ kpi, onClose }) => {
  if (!kpi) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden border border-[#c5c5d3]">
        <div className="bg-[#00236f] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">{kpi.icon}</span>
            <h3 className="font-bold text-sm">Longitudinal Drilldown: {kpi.label}</h3>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white cursor-pointer text-lg">
            ✕
          </button>
        </div>

        <div className="p-5 text-xs space-y-4">
          <div className="p-3 bg-[#eff4ff] rounded border border-[#dde9ff] flex items-baseline justify-between">
            <div>
              <span className="text-[#444651] text-[11px] block uppercase font-bold tracking-wider">
                Current Statutory Aggregate
              </span>
              <span className="text-2xl font-bold font-mono text-[#00236f]">{kpi.value}</span>
            </div>
            {kpi.delta && (
              <span className={`text-xs font-bold ${kpi.deltaPositive ? 'text-[#003212]' : 'text-[#ba1a1a]'}`}>
                {kpi.delta} vs Benchmark
              </span>
            )}
          </div>

          <div className="space-y-2 border border-[#dde9ff] rounded p-3 bg-[#f8f9ff]">
            <div className="font-semibold text-[#00236f] mb-1">State Nodal Benchmark Breakdown:</div>
            <div className="flex justify-between text-[11px]">
              <span className="text-[#444651]">Solapur Rural &amp; Urban:</span>
              <span className="font-mono font-bold text-[#0d1c2f]">31.2% Contribution</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-[#444651]">Pune Division Metropolitan:</span>
              <span className="font-mono font-bold text-[#0d1c2f]">38.5% Contribution</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-[#444651]">Nagpur &amp; Thane Corridors:</span>
              <span className="font-mono font-bold text-[#0d1c2f]">30.3% Contribution</span>
            </div>
          </div>

          <div className="p-2.5 rounded bg-[#e6eeff] text-[#0d1c2f] text-[11px] flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-[#003212]">verified</span>
            <span>
              All entries under {kpi.label} are reconciled against central statutory databases pursuant to Rule 14(b).
            </span>
          </div>
        </div>

        <div className="p-3 bg-[#eff4ff] border-t border-[#dde9ff] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-[#00236f] text-white text-xs font-semibold hover:bg-[#1e3a8a] cursor-pointer"
          >
            Close Drilldown
          </button>
        </div>
      </div>
    </div>
  );
};
