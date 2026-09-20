import React, { useState, useEffect } from 'react';

interface BreadcrumbsBarProps {
  currentSectionTitle: string;
  onRefreshData?: () => void;
}

export const BreadcrumbsBar: React.FC<BreadcrumbsBarProps> = ({
  currentSectionTitle,
  onRefreshData
}) => {
  const [syncing, setSyncing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState('T-04:00 UTC');
  const [currentTime, setCurrentTime] = useState<string>(() => {
    // Compute IST time synchronously so there's no empty-string flash on first render
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
    const istDate = new Date(utcMs + istOffset);
    const h = istDate.getHours().toString().padStart(2, '0');
    const m = istDate.getMinutes().toString().padStart(2, '0');
    const s = istDate.getSeconds().toString().padStart(2, '0');
    return `${h}:${m}:${s} IST`;
  });
  const [sessionStart] = useState(Date.now());
  const [sessionDuration, setSessionDuration] = useState('00:00');

  // Live IST clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      // IST = UTC+5:30
      const istOffset = 5.5 * 60 * 60 * 1000;
      const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
      const istDate = new Date(utcMs + istOffset);

      const h = istDate.getHours().toString().padStart(2, '0');
      const m = istDate.getMinutes().toString().padStart(2, '0');
      const s = istDate.getSeconds().toString().padStart(2, '0');
      setCurrentTime(`${h}:${m}:${s} IST`);

      // Session duration
      const elapsedSec = Math.floor((Date.now() - sessionStart) / 1000);
      const mm = Math.floor(elapsedSec / 60).toString().padStart(2, '0');
      const ss = (elapsedSec % 60).toString().padStart(2, '0');
      setSessionDuration(`${mm}:${ss}`);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [sessionStart]);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      const now = new Date();
      setLastRefreshed(`Just now (${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`);
      if (onRefreshData) onRefreshData();
    }, 600);
  };

  return (
    // margin-top is now controlled by App.tsx (pt-[128px]) — no brittle mt-32 here
    <div className="w-full bg-[#eff4ff] border-b border-[#dde9ff]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-xs text-[#444651] min-w-0">
          <span className="hover:text-[#00236f] transition-colors cursor-pointer whitespace-nowrap hidden sm:inline">
            National Skilling Framework
          </span>
          <span className="material-symbols-outlined text-[13px] hidden sm:inline">chevron_right</span>
          <span className="hover:text-[#00236f] transition-colors cursor-pointer whitespace-nowrap hidden sm:inline">
            Outcome Registry
          </span>
          <span className="material-symbols-outlined text-[13px] hidden sm:inline">chevron_right</span>
          <span className="text-[#0d1c2f] font-semibold text-[11px] truncate">{currentSectionTitle}</span>
        </div>

        {/* Right Status Bar */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Live Clock */}
          {currentTime && (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-[#00236f] bg-[#dde9ff] px-2 py-0.5 rounded">
              <span className="material-symbols-outlined text-[12px]">schedule</span>
              {currentTime}
            </span>
          )}

          {/* Session Timer */}
          <span className="hidden md:inline-flex items-center gap-1 text-[10px] text-[#444651] font-mono">
            <span className="material-symbols-outlined text-[12px]">timer</span>
            Session: {sessionDuration}
          </span>

          {/* Engine Version Badge */}
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#d5e3fd] text-[10px] font-semibold text-[#0d1c2f] hidden sm:inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-[#003212] animate-pulse"></span>
            Portal Engine v4.2.0-STABLE
          </span>

          {/* Sync button */}
          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-1 text-[10px] text-[#444651] hover:text-[#00236f] transition-colors cursor-pointer"
            title="Force Synchronize Records"
          >
            <span className={`material-symbols-outlined text-[13px] ${syncing ? 'animate-spin text-[#0051d5]' : ''}`}>
              sync
            </span>
            <span className="hidden sm:inline">
              {syncing ? 'Syncing…' : `Refreshed: ${lastRefreshed}`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
