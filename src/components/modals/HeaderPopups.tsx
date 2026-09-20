import React from 'react';
import { EarlyWarningAlert } from '../../types';

interface NotificationsPopupProps {
  alerts: EarlyWarningAlert[];
  onClose: () => void;
  onSelectAlert: (alert: EarlyWarningAlert) => void;
}

export const NotificationsPopup: React.FC<NotificationsPopupProps> = ({
  alerts,
  onClose,
  onSelectAlert
}) => {
  return (
    <div className="absolute right-4 sm:right-6 top-16 w-80 sm:w-96 bg-white rounded-lg shadow-2xl border border-[#c5c5d3] z-50 overflow-hidden animate-fadeIn text-xs">
      <div className="bg-[#00236f] p-3 text-white flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-bold">
          <span className="material-symbols-outlined text-[18px]">notifications</span>
          <span>Statutory Directives &amp; Actionable Flags</span>
        </div>
        <button onClick={onClose} className="text-white/80 hover:text-white cursor-pointer">
          ✕
        </button>
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-[#dde9ff]">
        {alerts.map(a => (
          <div
            key={a.id}
            onClick={() => {
              onSelectAlert(a);
              onClose();
            }}
            className="p-3 hover:bg-[#eff4ff] transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className={`font-bold uppercase ${
                a.type === 'critical' ? 'text-[#ba1a1a]' : a.type === 'warning' ? 'text-[#0051d5]' : 'text-[#003212]'
              }`}>
                {a.title}
              </span>
              <span className="text-[#444651]">{a.scope}</span>
            </div>
            <p className="text-xs text-[#0d1c2f] leading-snug">{a.description}</p>
            <div className="mt-1 text-[11px] font-bold text-[#00236f] flex items-center gap-0.5">
              <span>{a.actionLabel}</span>
              <span className="material-symbols-outlined text-[12px]">chevron_right</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-2.5 bg-[#eff4ff] text-center border-t border-[#dde9ff]">
        <button
          onClick={onClose}
          className="text-[#00236f] font-semibold text-xs hover:underline cursor-pointer"
        >
          Dismiss Panel
        </button>
      </div>
    </div>
  );
};

interface OfficerProfileModalProps {
  onClose: () => void;
}

import { useAuth } from '../../contexts/AuthContext';

export const OfficerProfileModal: React.FC<OfficerProfileModalProps> = ({ onClose }) => {
  const { user, logout } = useAuth();
  
  if (!user) return null;

  const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden border border-[#c5c5d3]">
        <div className="bg-[#00236f] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">badge</span>
            <h3 className="font-bold text-sm">Nodal Authority Credentials</h3>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white cursor-pointer text-lg">
            ✕
          </button>
        </div>

        <div className="p-5 text-xs space-y-3">
          <div className="flex items-center gap-3 p-3 bg-[#eff4ff] rounded border border-[#dde9ff]">
            <div className="w-12 h-12 rounded-full bg-[#00236f] text-white flex items-center justify-center font-bold text-lg ring-2 ring-[#d5e3fd]">
              {initials}
            </div>
            <div>
              <div className="font-bold text-sm text-[#00236f]">{user.name}</div>
              <div className="text-[#444651]">{user.designation || 'Ministry Officer'}</div>
              <div className="text-[10px] text-[#003212] font-semibold">
                Authorized {user.role === 'provider' ? 'Provider' : 'Central Registry'} Officer
              </div>
            </div>
          </div>

          <div className="space-y-2 border border-[#dde9ff] rounded p-3 bg-[#f8f9ff] text-[11px] font-mono">
            <div className="flex justify-between">
              <span className="text-[#444651]">Email:</span>
              <span className="font-bold text-[#0d1c2f]">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#444651]">Digital Certificate ID:</span>
              <span className="font-bold text-[#00236f]">{user.id.substring(0, 8).toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#444651]">Portal Mode:</span>
              <span className="font-bold text-[#0d1c2f]">{user.portal_mode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#444651]">Ledger Authority:</span>
              <span className="font-bold text-[#003212]">Statutory Rule 14(b) Signoff</span>
            </div>
          </div>
        </div>

        <div className="p-3 bg-[#eff4ff] border-t border-[#dde9ff] flex justify-between">
          <button
            onClick={logout}
            className="px-4 py-1.5 rounded text-[#ba1a1a] text-xs font-semibold hover:bg-red-50 transition-colors cursor-pointer"
          >
            Sign Out
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-[#00236f] text-white text-xs font-semibold hover:bg-[#1e3a8a] cursor-pointer transition-colors"
          >
            Close Credentials
          </button>
        </div>
      </div>
    </div>
  );
};
