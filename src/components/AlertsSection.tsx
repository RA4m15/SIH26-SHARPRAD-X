import React from 'react';
import { EarlyWarningAlert } from '../types';

interface AlertsSectionProps {
  alerts: EarlyWarningAlert[];
  onActionClick: (alert: EarlyWarningAlert) => void;
}

export const AlertsSection: React.FC<AlertsSectionProps> = ({ alerts, onActionClick }) => {
  return (
    <section className="w-full">
      <div className="flex flex-wrap items-center justify-between mb-2 gap-2">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px] text-[#00236f]">priority_high</span>
          <h2 className="text-base font-semibold text-[#0d1c2f]">Statutory Compliance &amp; Early Warning Flags</h2>
        </div>
        <span className="text-xs text-[#444651]">
          {alerts.length} Actionable Directives Pending District Collector Signoff
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {alerts.map(alert => {
          let cardBg = 'bg-[#eff4ff]';
          let iconColor = 'text-[#0051d5]';
          let iconName = 'warning';
          let badgeColor = 'text-[#0051d5]';
          let btnColor = 'text-[#0051d5] hover:text-[#00236f]';

          if (alert.type === 'critical') {
            cardBg = 'bg-[#ffdad6]';
            iconColor = 'text-[#ba1a1a]';
            iconName = 'crisis_alert';
            badgeColor = 'text-[#ba1a1a]';
            btnColor = 'text-[#ba1a1a] hover:underline';
          } else if (alert.type === 'warning') {
            cardBg = 'bg-[#dde9ff]';
            iconColor = 'text-[#0051d5]';
            iconName = 'warning';
            badgeColor = 'text-[#0051d5]';
            btnColor = 'text-[#0051d5] hover:underline';
          } else if (alert.type === 'success') {
            cardBg = 'bg-[#eff4ff]';
            iconColor = 'text-[#003212]';
            iconName = 'verified_user';
            badgeColor = 'text-[#003212]';
            btnColor = 'text-[#003212] hover:underline';
          }

          return (
            <div
              key={alert.id}
              className={`flex items-start gap-3 p-3.5 rounded ${cardBg} shadow-xs border border-black/5 hover:shadow-sm transition-shadow`}
            >
              <span className={`material-symbols-outlined ${iconColor} text-[22px] mt-0.5 shrink-0`}>
                {iconName}
              </span>
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${badgeColor}`}>
                    {alert.title}
                  </span>
                  <span className="text-[11px] text-[#444651]">• {alert.scope}</span>
                </div>
                <p className="text-xs font-medium mt-1 text-[#0d1c2f] leading-relaxed">
                  {alert.description.split(alert.highlightText).map((part, i, arr) => (
                    <React.Fragment key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className={`font-bold ${badgeColor}`}>{alert.highlightText}</span>
                      )}
                    </React.Fragment>
                  ))}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => onActionClick(alert)}
                    className={`text-[11px] font-bold ${btnColor} inline-flex items-center gap-0.5 cursor-pointer`}
                    type="button"
                  >
                    <span>{alert.actionLabel}</span>
                    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
