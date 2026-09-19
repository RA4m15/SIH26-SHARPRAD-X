import React, { useState } from 'react';
import { DISTRICTS_DATA } from '../../data/mockData';

interface DistrictMatrixScreenProps {
  onInspectDistrict: (districtName: string) => void;
}

export const DistrictMatrixScreen: React.FC<DistrictMatrixScreenProps> = ({ onInspectDistrict }) => {
  const [activeTab, setActiveTab] = useState<'districts' | 'providers'>('districts');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded border border-[#dde9ff] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00236f]"></span>
            <h2 className="text-base font-bold text-[#00236f]">
              District Governance &amp; Training Provider Scorecard
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#dde9ff] text-[#00236f] font-mono font-bold">
              MAHARASHTRA NODAL OVERSIGHT
            </span>
          </div>
          <p className="text-xs text-[#444651] mt-1">
            Real-time physical verification, biometric attendance integrity, and 180-day retention performance.
          </p>
        </div>

        <div className="flex items-center bg-[#eff4ff] rounded p-0.5 border border-[#dde9ff]">
          <button
            onClick={() => setActiveTab('districts')}
            className={`px-3 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${
              activeTab === 'districts' ? 'bg-white text-[#00236f] shadow-xs' : 'text-[#444651]'
            }`}
          >
            District Clusters (36)
          </button>
          <button
            onClick={() => setActiveTab('providers')}
            className={`px-3 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${
              activeTab === 'providers' ? 'bg-white text-[#00236f] shadow-xs' : 'text-[#444651]'
            }`}
          >
            Empanelled Providers (142)
          </button>
        </div>
      </div>

      {/* District Matrix Table */}
      <div className="bg-white p-5 rounded border border-[#dde9ff] shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#eff4ff] text-[#444651] text-[11px] font-semibold uppercase tracking-wider border-b border-[#dde9ff]">
                <th className="py-2.5 px-4">District / Zone</th>
                <th className="py-2.5 px-4">Administrative Division</th>
                <th className="py-2.5 px-4">Trained Trainees</th>
                <th className="py-2.5 px-4">Placed Rate</th>
                <th className="py-2.5 px-4">180D Retention</th>
                <th className="py-2.5 px-4">Avg Wage</th>
                <th className="py-2.5 px-4">Lead Training Agency</th>
                <th className="py-2.5 px-4">Risk Flag</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dde9ff]">
              {DISTRICTS_DATA.map(dist => (
                <tr key={dist.id} className="hover:bg-[#eff4ff]/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-[#00236f]">{dist.name}</td>
                  <td className="py-3 px-4 text-[#444651]">{dist.division}</td>
                  <td className="py-3 px-4 font-mono font-bold text-[#0d1c2f]">
                    {dist.trained.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-[#003212]">{dist.placedRate}%</td>
                  <td className="py-3 px-4 font-mono font-bold text-[#00236f]">{dist.retentionRate}%</td>
                  <td className="py-3 px-4 font-mono text-[#0d1c2f]">₹{dist.avgWage.toLocaleString()}</td>
                  <td className="py-3 px-4 text-[#444651]">{dist.topProvider}</td>
                  <td className="py-3 px-4">
                    {dist.riskStatus === 'High Attrition' ? (
                      <span className="px-2 py-0.5 rounded bg-[#ffdad6] text-[#ba1a1a] font-bold text-[10px] inline-flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">warning</span>
                        Critical Review
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#003212] font-semibold text-[10px]">
                        Satisfactory
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onInspectDistrict(dist.name)}
                      className="px-2.5 py-1 rounded bg-[#eff4ff] hover:bg-[#dde9ff] text-[#00236f] text-xs font-semibold cursor-pointer border border-[#dde9ff]"
                    >
                      Audit
                    </button>
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
