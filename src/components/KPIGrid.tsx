import React, { useEffect, useState, useRef } from 'react';
import { KPIMetric } from '../types';

interface KPIGridProps {
  kpis: KPIMetric[];
  isLoading?: boolean;
  onKPIClick?: (kpi: KPIMetric) => void;
}

/** Extracts a numeric value from strings like "12,480" or "₹17,400" or "70.1%" */
function parseNumericValue(val: string): number | null {
  const stripped = val.replace(/[₹,%\s]/g, '').replace(/,/g, '');
  const n = parseFloat(stripped);
  return isNaN(n) ? null : n;
}

/** Formats the counted value back into the original display format */
function formatLike(original: string, current: number): string {
  const hasRupee = original.includes('₹');
  const hasPercent = original.includes('%');
  const hasComma = original.includes(',');

  if (hasRupee) {
    if (original.includes(',')) {
      return `₹${Math.round(current).toLocaleString('en-IN')}`;
    }
    return `₹${Math.round(current)}`;
  }
  if (hasPercent) {
    return `${current.toFixed(current % 1 === 0 ? 0 : 1)}%`;
  }
  if (hasComma) {
    return Math.round(current).toLocaleString('en-IN');
  }
  return Math.round(current).toString();
}

/** Animated counter hook: counts from 0 to target over `duration` ms */
function useCountUp(target: number | null, duration = 900): number | null {
  const [value, setValue] = useState<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (target === null) return;
    const start = performance.now();
    const from = 0;

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(from + (target - from) * eased);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration]);

  return value;
}

interface KPICardProps {
  kpi: KPIMetric;
  onKPIClick?: (kpi: KPIMetric) => void;
  delay: number;
}

const KPICard: React.FC<KPICardProps> = ({ kpi, onKPIClick, delay }) => {
  // `mounted` flips to true after first paint via rAF — triggers count-up & progress bar
  // Cards are ALWAYS visible from the start (no opacity-0 gate) so there's no flash
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const numericTarget = mounted ? parseNumericValue(kpi.value) : null;
  const countedValue = useCountUp(numericTarget, 800);

  const displayValue = (mounted && countedValue !== null)
    ? formatLike(kpi.value, countedValue)
    : kpi.value;

  return (
    <div
      onClick={() => onKPIClick && onKPIClick(kpi)}
      className="bg-white p-3.5 rounded shadow-xs border border-[#dde9ff] flex flex-col justify-between hover:border-[#316bf3] hover:shadow-sm transition-all cursor-pointer group animate-hb-count-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
      title={`Click to view longitudinal drilldown for ${kpi.label}`}
    >
      <div>
        <div className="flex items-center justify-between text-[#444651]">
          <span className="text-[10px] uppercase font-bold tracking-wider">{kpi.label}</span>
          <span className="material-symbols-outlined text-[17px] text-[#444651] group-hover:text-[#0051d5] transition-colors">
            {kpi.icon}
          </span>
        </div>

        <div className="mt-2 flex items-baseline gap-1.5 flex-wrap">
          <span className="text-[26px] font-bold tracking-tight text-[#00236f] font-mono tabular-nums">
            {displayValue}
          </span>
          {kpi.delta && (
            <span
              className={`text-[11px] font-bold flex items-center ${
                kpi.deltaPositive ? 'text-[#003212]' : 'text-[#444651]'
              }`}
            >
              {kpi.delta.includes('+') && (
                <span className="material-symbols-outlined text-[13px]">arrow_upward</span>
              )}
              {kpi.delta}
            </span>
          )}
        </div>
        <p className="text-xs text-[#444651] mt-0.5 leading-snug">{kpi.subtext}</p>
      </div>

      <div className="mt-3">
        {kpi.progressPercent != null ? (
          <>
            <div className="w-full bg-[#e6eeff] h-1.5 rounded overflow-hidden">
              <div
                className={`${kpi.progressColor || 'bg-[#00236f]'} h-full rounded transition-all duration-700`}
                style={{ width: mounted ? `${kpi.progressPercent}%` : '0%' }}
              />
            </div>
            {kpi.footerText && (
              <span className="text-[11px] text-[#444651] mt-1 block font-medium">
                {kpi.footerText}
              </span>
            )}
          </>
        ) : kpi.badgeText ? (
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold ${kpi.badgeColor}`}>
            {kpi.badgeText.includes('Digital') ? (
              <span className="material-symbols-outlined text-[13px] text-[#0051d5]">cloud_done</span>
            ) : (
              <span className="w-1.5 h-1.5 rounded-full bg-[#003212]"></span>
            )}
            {kpi.badgeText}
          </span>
        ) : (
          <span className="text-[11px] text-[#444651] block font-medium">
            Net Delta: <strong className="text-[#0d1c2f]">+₹6,200/mo</strong>
          </span>
        )}
      </div>
    </div>
  );
};

export const KPIGrid: React.FC<KPIGridProps> = ({ kpis, isLoading, onKPIClick }) => {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        {isLoading 
          ? Array(6).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-xl shadow-sm border border-[#dde9ff] p-4 h-32 flex flex-col justify-between">
                <div className="h-4 bg-[#eff4ff] rounded w-1/2"></div>
                <div className="h-8 bg-[#eff4ff] rounded w-3/4"></div>
                <div className="h-2 bg-[#eff4ff] rounded w-full mt-2"></div>
              </div>
            ))
          : kpis.map((kpi, idx) => (
              <KPICard
                key={kpi.id || idx}
                kpi={kpi}
                onKPIClick={onKPIClick}
                delay={idx * 80}
              />
            ))}
      </div>
    </section>
  );
};
