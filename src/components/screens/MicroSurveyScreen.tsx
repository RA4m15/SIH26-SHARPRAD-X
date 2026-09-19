import React, { useState } from 'react';
import { MICRO_SURVEYS_DATA } from '../../data/mockData';
import { MicroSurveyRecord } from '../../types';

interface MicroSurveyScreenProps {
  onResolveGrievance: (record: MicroSurveyRecord) => void;
}

export const MicroSurveyScreen: React.FC<MicroSurveyScreenProps> = ({ onResolveGrievance }) => {
  const [selectedMilestone, setSelectedMilestone] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [activeSurveyDetail, setActiveSurveyDetail] = useState<MicroSurveyRecord | null>(null);

  const filtered = MICRO_SURVEYS_DATA.filter(s => {
    const matchMilestone = selectedMilestone === 'All' || s.milestone === selectedMilestone;
    const matchSearch = s.candidateName.toLowerCase().includes(search.toLowerCase()) ||
                        s.candidateId.toLowerCase().includes(search.toLowerCase()) ||
                        s.course.toLowerCase().includes(search.toLowerCase());
    return matchMilestone && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded border border-[#dde9ff] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0051d5]"></span>
            <h2 className="text-base font-bold text-[#00236f]">
              Follow-up Micro-Survey &amp; Trainee Pulse Intelligence
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#dde9ff] text-[#00236f] font-mono font-bold">
              SCREEN 4 • MULTI-CHANNEL IVR / BOT
            </span>
          </div>
          <p className="text-xs text-[#444651] mt-1">
            Statutory post-skilling verification conducted at Day 30, 90, 180, and 365 to independently validate job tenure, wages, and workplace dignity.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap text-xs">
          <div className="p-2 px-3 bg-[#eff4ff] rounded border border-[#dde9ff]">
            <span className="text-[#444651] text-[10px] block">Overall Response Rate</span>
            <span className="font-bold text-[#003212] font-mono text-sm">89.4% Completed</span>
          </div>
          <div className="p-2 px-3 bg-[#eff4ff] rounded border border-[#dde9ff]">
            <span className="text-[#444651] text-[10px] block">Wage Discrepancy Rate</span>
            <span className="font-bold text-[#ba1a1a] font-mono text-sm">4.2% Flagged</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded border border-[#dde9ff] shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-[#444651]">Milestone Cohort:</span>
          {['All', 'Day 30', 'Day 90', 'Day 180', 'Day 365'].map(m => (
            <button
              key={m}
              onClick={() => setSelectedMilestone(m)}
              className={`px-3 py-1 rounded font-semibold transition-all cursor-pointer ${
                selectedMilestone === m
                  ? 'bg-[#00236f] text-white'
                  : 'bg-[#eff4ff] text-[#444651] hover:bg-[#dde9ff]'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search candidate name or ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-[#eff4ff] text-[#0d1c2f] rounded pl-7 pr-3 py-1.5 border border-[#dde9ff] w-56 sm:w-64 focus:outline-none focus:border-[#00236f]"
          />
          <span className="material-symbols-outlined text-[15px] absolute left-2 top-2 text-[#444651]">
            search
          </span>
        </div>
      </div>

      {/* Micro Survey Records Table */}
      <div className="bg-white p-5 rounded border border-[#dde9ff] shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#eff4ff] text-[#444651] text-[11px] font-semibold uppercase tracking-wider border-b border-[#dde9ff]">
                <th className="py-2.5 px-4">Candidate &amp; Phone</th>
                <th className="py-2.5 px-4">Milestone</th>
                <th className="py-2.5 px-4">Course QP</th>
                <th className="py-2.5 px-4">Channel</th>
                <th className="py-2.5 px-4">Status &amp; Salary</th>
                <th className="py-2.5 px-4">Satisfaction</th>
                <th className="py-2.5 px-4">Grievance Flag</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dde9ff]">
              {filtered.map(record => (
                <tr key={record.id} className="hover:bg-[#eff4ff]/60 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-[#00236f]">{record.candidateName}</div>
                    <div className="font-mono text-[10px] text-[#444651]">{record.candidateId} • {record.phoneMasked}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-[#dde9ff] text-[#00236f] font-mono font-bold text-[11px]">
                      {record.milestone}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#0d1c2f] max-w-[200px] truncate" title={record.course}>
                    {record.course}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#444651]">
                      <span className="material-symbols-outlined text-[13px] text-[#0051d5]">
                        {record.surveyChannel.includes('WhatsApp') ? 'chat' : record.surveyChannel.includes('IVR') ? 'call' : 'support_agent'}
                      </span>
                      {record.surveyChannel}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {record.isCurrentlyEmployed ? (
                      <div>
                        <span className="font-bold text-[#003212] font-mono">₹{record.reportedSalary.toLocaleString()}</span>
                        <span className="block text-[10px] text-[#003212]">EPFO Reconciled</span>
                      </div>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-[#ffdad6] text-[#ba1a1a] font-bold text-[10px]">
                        Unemployed / Left Job
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex text-amber-500">
                      {'★'.repeat(record.jobSatisfaction)}{'☆'.repeat(5 - record.jobSatisfaction)}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {record.grievanceLogged ? (
                      <span className="px-2 py-0.5 rounded bg-[#ffdad6] text-[#ba1a1a] font-bold text-[10px] inline-flex items-center gap-1">
                        <span className="material-symbols-outlined text-[12px]">report_problem</span>
                        Grievance Active
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#003212] font-semibold">No Dispute</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setActiveSurveyDetail(record)}
                      className="px-2.5 py-1 rounded bg-[#eff4ff] hover:bg-[#dde9ff] text-[#00236f] text-xs font-semibold cursor-pointer border border-[#dde9ff]"
                    >
                      Audit Transcript
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Survey Transcript Detail Modal */}
      {activeSurveyDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full overflow-hidden border border-[#c5c5d3]">
            <div className="bg-[#00236f] p-4 text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm">Micro-Survey Telemetry &amp; Transcript</h3>
                <p className="text-[11px] text-white/80">{activeSurveyDetail.candidateName} • {activeSurveyDetail.candidateId}</p>
              </div>
              <button onClick={() => setActiveSurveyDetail(null)} className="text-white/80 hover:text-white cursor-pointer text-lg">
                ✕
              </button>
            </div>

            <div className="p-5 text-xs space-y-4">
              <div className="p-3 bg-[#eff4ff] rounded border border-[#dde9ff] space-y-1">
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-[#444651]">Timestamp:</span>
                  <span className="text-[#0d1c2f] font-bold">{activeSurveyDetail.timestamp}</span>
                </div>
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-[#444651]">Channel Ingestion:</span>
                  <span className="text-[#0051d5] font-bold">{activeSurveyDetail.surveyChannel}</span>
                </div>
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-[#444651]">Reported Monthly Wage:</span>
                  <span className="text-[#003212] font-bold font-mono">₹{activeSurveyDetail.reportedSalary.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <span className="font-semibold text-[#0d1c2f] block mb-1">
                  Verbatim Candidate Response &amp; Field Observation:
                </span>
                <div className="p-3 bg-[#f8f9ff] border border-[#dde9ff] rounded text-[#0d1c2f] italic leading-relaxed">
                  "{activeSurveyDetail.feedbackRemarks}"
                </div>
              </div>

              {activeSurveyDetail.grievanceLogged && (
                <div className="p-3 bg-[#ffdad6]/50 border border-[#ffdad6] rounded text-[#ba1a1a]">
                  <div className="font-bold flex items-center gap-1 text-xs">
                    <span className="material-symbols-outlined text-[16px]">crisis_alert</span>
                    Statutory Grievance Flag Triggered
                  </div>
                  <p className="text-[11px] mt-1 text-[#444651]">
                    Candidate relocated due to salary mismatch (&lt;₹12,000 threshold). This record is automatically flagged for Solapur District Nodal Squad inquiry.
                  </p>
                </div>
              )}
            </div>

            <div className="p-3 bg-[#eff4ff] border-t border-[#dde9ff] flex justify-between items-center">
              {activeSurveyDetail.grievanceLogged ? (
                <button
                  onClick={() => {
                    onResolveGrievance(activeSurveyDetail);
                    setActiveSurveyDetail(null);
                  }}
                  className="px-3 py-1.5 rounded bg-[#ba1a1a] hover:bg-[#93000a] text-white text-xs font-semibold cursor-pointer flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">local_police</span>
                  <span>Dispatch Nodal Resolution</span>
                </button>
              ) : (
                <span className="text-[11px] text-[#003212] font-semibold">
                  EPFO Verification Matched
                </span>
              )}

              <button
                onClick={() => setActiveSurveyDetail(null)}
                className="px-4 py-1.5 rounded bg-[#00236f] text-white text-xs font-semibold hover:bg-[#1e3a8a] cursor-pointer"
              >
                Close Transcript
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
