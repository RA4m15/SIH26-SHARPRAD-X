import React, { useState } from 'react';
import { CourseLeaderboardItem } from '../types';

interface LeaderboardTableProps {
  courses: CourseLeaderboardItem[];
  onInspectCourse: (course: CourseLeaderboardItem) => void;
  onViewAllJobPacks: () => void;
}

type SortTab = 'Employment Rate' | 'Retention (180D)' | 'Wage Growth' | 'Industry Alignment';

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  courses,
  onInspectCourse,
  onViewAllJobPacks
}) => {
  const [activeSortTab, setActiveSortTab] = useState<SortTab>('Employment Rate');
  const [searchQuery, setSearchQuery] = useState('');

  // Sort logic based on tab
  const sortedCourses = [...courses].sort((a, b) => {
    if (activeSortTab === 'Employment Rate') {
      return b.placedRate - a.placedRate;
    } else if (activeSortTab === 'Retention (180D)') {
      return b.retention6M - a.retention6M;
    } else if (activeSortTab === 'Wage Growth') {
      return b.wageDeltaPercent - a.wageDeltaPercent;
    } else {
      return b.avgWage - a.avgWage;
    }
  });

  const filteredCourses = sortedCourses.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.qpCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.sector.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="w-full bg-white p-4 sm:p-6 rounded shadow-xs border border-[#dde9ff]">
      {/* Table Header and Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#eff4ff]">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#00236f]">leaderboard</span>
            <h3 className="text-base font-semibold text-[#0d1c2f]">Top Courses Outcome Leaderboard</h3>
          </div>
          <p className="text-xs text-[#444651] mt-0.5">
            Standardized job role benchmarks ranked by post-skilling longitudinal verification performance
          </p>
        </div>

        {/* Filter Tabs & Quick Search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto flex-wrap">
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search QP code or course..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="text-xs bg-[#eff4ff] text-[#0d1c2f] rounded pl-7 pr-3 py-2 border border-[#dde9ff] focus:outline-none focus:border-[#316bf3] w-full sm:w-48 md:w-56"
            />
            <span className="material-symbols-outlined text-[15px] absolute left-2 top-2.5 text-[#444651]">
              search
            </span>
          </div>

          <div className="flex items-center bg-[#eff4ff] rounded p-0.5 border border-[#dde9ff] flex-wrap gap-0.5">
            {(['Employment Rate', 'Retention (180D)', 'Wage Growth', 'Industry Alignment'] as SortTab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveSortTab(tab)}
                className={`px-2.5 py-1.5 text-[11px] font-semibold rounded transition-all cursor-pointer whitespace-nowrap ${
                  activeSortTab === tab
                    ? 'bg-white text-[#00236f] shadow-xs'
                    : 'text-[#444651] hover:text-[#0d1c2f]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-[#eff4ff] text-[#444651] text-[11px] font-semibold uppercase tracking-wider border-b border-[#dde9ff]">
              <th className="py-2.5 px-3">QP / Course Title</th>
              <th className="py-2.5 px-3">Placed Rate</th>
              <th className="py-2.5 px-3 hidden md:table-cell w-1/4">Performance Bar</th>
              <th className="py-2.5 px-3 hidden sm:table-cell">Avg Wage</th>
              <th className="py-2.5 px-3 hidden lg:table-cell">6M Retention</th>
              <th className="py-2.5 px-3 hidden sm:table-cell">Statutory Status</th>
              <th className="py-2.5 px-3 text-right">Audit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dde9ff]">
            {filteredCourses.slice(0, 5).map(course => (
              <tr key={course.id} className="hover:bg-[#eff4ff]/60 transition-colors">
                {/* Title and QP code */}
                <td className="py-3 px-3 font-medium text-[#0d1c2f] min-w-[160px]">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded ${course.iconBg} flex items-center justify-center ${course.iconColor} shrink-0 shadow-2xs`}>
                      <span className="material-symbols-outlined text-[17px]">{course.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-semibold text-[#00236f] block leading-snug">{course.title}</span>
                      <span className="text-[10px] text-[#444651] font-mono">
                        {course.qpCode} · L{course.nsqfLevel}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Placed Rate */}
                <td className="py-3 px-3 min-w-[70px]">
                  <span className="text-sm font-bold text-[#003212] font-mono">
                    {course.placedRate}%
                  </span>
                  <span className="block text-[10px] text-[#444651] font-mono">
                    {course.placedCount.toLocaleString()}/{course.totalCandidates.toLocaleString()}
                  </span>
                </td>

                {/* Performance Bar — hidden on mobile */}
                <td className="py-3 px-3 hidden md:table-cell min-w-[100px]">
                  <div className="w-full bg-[#e6eeff] h-2 rounded overflow-hidden">
                    <div
                      className={`h-full rounded transition-all duration-500 ${
                        course.placedRate >= 85
                          ? 'bg-[#003212]'
                          : course.placedRate >= 75
                          ? 'bg-[#0051d5]'
                          : 'bg-[#4059aa]'
                      }`}
                      style={{ width: `${course.placedRate}%` }}
                    ></div>
                  </div>
                </td>

                {/* Avg Monthly Wage — hidden on xs */}
                <td className="py-3 px-3 font-mono text-[#0d1c2f] font-semibold hidden sm:table-cell min-w-[90px]">
                  ₹{course.avgWage.toLocaleString()}{' '}
                  <span className="text-[10px] text-[#003212] font-normal font-sans">
                    (+{course.wageDeltaPercent}%)
                  </span>
                </td>

                {/* 6M Retention — hidden on <lg */}
                <td className="py-3 px-3 font-mono font-semibold hidden lg:table-cell min-w-[90px]">
                  <span className={course.retention6M < 65 ? 'text-[#ba1a1a]' : 'text-[#0d1c2f]'}>
                    {course.retention6M}%
                  </span>
                </td>

                {/* Statutory Status — hidden on xs */}
                <td className="py-3 px-3 hidden sm:table-cell">
                  {course.statutoryStatus === 'Green Channel' && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#e6eeff] text-[10px] text-[#003212] font-semibold border border-[#95f8a7]">
                      <span className="material-symbols-outlined text-[12px]">verified</span> Green
                    </span>
                  )}
                  {course.statutoryStatus === 'High Wage' && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#e6eeff] text-[10px] text-[#0051d5] font-semibold border border-[#dbe1ff]">
                      <span className="material-symbols-outlined text-[12px]">verified</span> High Wage
                    </span>
                  )}
                  {course.statutoryStatus === 'Compliant' && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#e6eeff] text-[10px] text-[#0d1c2f] font-semibold border border-[#dde9ff]">
                      Compliant
                    </span>
                  )}
                  {course.statutoryStatus === 'Under Review' && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#ffdad6] text-[10px] text-[#ba1a1a] font-bold border border-[#ffdad6]">
                      <span className="material-symbols-outlined text-[12px]">report_problem</span> Review
                    </span>
                  )}
                  {course.statutoryStatus === 'Standard Audit' && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#e6eeff] text-[10px] text-[#0d1c2f] font-semibold border border-[#dde9ff]">
                      Audit
                    </span>
                  )}
                </td>

                {/* Inspect button */}
                <td className="py-3 px-3 text-right">
                  <button
                    onClick={() => onInspectCourse(course)}
                    className="px-2.5 py-1.5 rounded bg-[#eff4ff] hover:bg-[#dde9ff] text-[#00236f] text-xs font-semibold transition-colors border border-[#dde9ff] cursor-pointer"
                    type="button"
                  >
                    Inspect
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#eff4ff]">
        <div className="flex items-center gap-1.5 text-[#444651] text-xs">
          <span className="material-symbols-outlined text-[16px] text-[#003212]">lock_reset</span>
          <span>Records synchronized against EPFO Database &amp; National Career Service (NCS) API.</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#444651]">
            Displaying {Math.min(5, filteredCourses.length)} of 48 Certified Roles
          </span>
          <button
            onClick={onViewAllJobPacks}
            className="ml-2 text-xs font-bold text-[#00236f] hover:underline inline-flex items-center gap-0.5 cursor-pointer"
            type="button"
          >
            <span>View All Job Qualification Packs</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
};
