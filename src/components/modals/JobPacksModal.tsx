import React, { useState } from 'react';
import { CourseLeaderboardItem } from '../../types';

interface JobPacksModalProps {
  allCourses: CourseLeaderboardItem[];
  onSelectCourse: (course: CourseLeaderboardItem) => void;
  onClose: () => void;
}

export const JobPacksModal: React.FC<JobPacksModalProps> = ({
  allCourses,
  onSelectCourse,
  onClose
}) => {
  const [sectorFilter, setSectorFilter] = useState('All');
  const [search, setSearch] = useState('');

  const sectors = ['All', 'Green Energy & Solar', 'IT-ITeS & Telephony', 'Healthcare & Allied', 'Construction & Electrical', 'Retail & Logistics', 'Automotive & Capital Goods'];

  const filtered = allCourses.filter(c => {
    const matchSector = sectorFilter === 'All' || c.sector === sectorFilter;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.qpCode.toLowerCase().includes(search.toLowerCase());
    return matchSector && matchSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[85vh] flex flex-col overflow-hidden border border-[#c5c5d3]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#00236f] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px]">format_list_bulleted</span>
            <div>
              <h3 className="font-bold text-sm">National Qualification Packs Directory (48 Standardized Job Roles)</h3>
              <p className="text-[11px] text-white/80">
                Longitudinally verified against EPFO databases &amp; National Career Service
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

        {/* Filters */}
        <div className="p-3.5 bg-[#eff4ff] border-b border-[#dde9ff] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-[#444651]">Sector:</span>
            <select
              value={sectorFilter}
              onChange={e => setSectorFilter(e.target.value)}
              className="bg-white text-[#0d1c2f] rounded px-2.5 py-1 text-xs border border-[#dde9ff]"
            >
              {sectors.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Filter by QP code or title..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-white text-[#0d1c2f] rounded pl-7 pr-3 py-1 text-xs border border-[#dde9ff] w-56"
            />
            <span className="material-symbols-outlined text-[15px] absolute left-2 top-1.5 text-[#444651]">
              search
            </span>
          </div>
        </div>

        {/* Grid of Qualification Packs */}
        <div className="p-4 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filtered.map(course => (
            <div
              key={course.id}
              onClick={() => {
                onSelectCourse(course);
                onClose();
              }}
              className="p-3 bg-[#f8f9ff] border border-[#dde9ff] rounded hover:border-[#0051d5] hover:bg-white transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-mono text-[#00236f] font-bold">{course.qpCode}</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#dde9ff] text-[#00236f] text-[10px] font-semibold">
                    NSQF Level {course.nsqfLevel}
                  </span>
                </div>
                <h4 className="font-semibold text-[#0d1c2f] text-xs leading-snug">{course.title}</h4>
                <p className="text-[11px] text-[#444651] mt-0.5">{course.sector}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#dde9ff] flex items-center justify-between text-[11px]">
                <div>
                  <span className="text-[#444651]">Placement: </span>
                  <span className="font-bold text-[#003212] font-mono">{course.placedRate}%</span>
                </div>
                <span className="text-[#0051d5] font-semibold flex items-center gap-0.5">
                  Inspect <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#eff4ff] border-t border-[#dde9ff] flex justify-between items-center text-xs">
          <span className="text-[#444651]">
            Showing {filtered.length} Qualification Packs
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-[#00236f] text-white text-xs font-semibold hover:bg-[#1e3a8a] transition-colors cursor-pointer"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
};
