import React, { useState } from 'react';
import { useUserMode } from '../../contexts/UserModeContext';
import { Bell, Menu, Fish, Check } from 'lucide-react';
import { mockAlerts } from '../../utils/mockData';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { userMode, setUserMode, user } = useUserMode();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);

  const activeAlerts = mockAlerts.filter(a => !a.read);

  const getModeLabel = (mode: string) => {
    switch (mode) {
      case 'beginner': return 'Beginner Mode';
      case 'owner': return 'Aquarium Owner';
      case 'store': return 'Pet Store Pro';
      default: return 'User Mode';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-4 py-3 flex items-center justify-between">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2 text-sky-400 font-bold text-lg">
          <div className="p-1.5 bg-sky-950/50 border border-sky-500/20 rounded-xl">
            <Fish size={22} className="animate-pulse" />
          </div>
          <span className="bg-gradient-to-r from-sky-400 to-teal-400 bg-clip-text text-transparent">
            AquaKeeper
          </span>
        </div>
      </div>

      {/* Utilities */}
      <div className="flex items-center gap-3">
        {/* User Mode Selector */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-950/50 hover:bg-slate-800 text-xs font-semibold text-sky-400 transition-all hover:border-sky-500/30"
            aria-haspopup="listbox"
            aria-expanded={showDropdown}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            {getModeLabel(userMode)}
          </button>

          {showDropdown && (
            <div 
              className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1 z-50"
              role="listbox"
            >
              {(['beginner', 'owner', 'store'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    setUserMode(mode);
                    setShowDropdown(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs font-medium rounded-lg hover:bg-slate-800 transition-colors ${
                    userMode === mode ? 'text-sky-400 bg-sky-950/20' : 'text-slate-300'
                  }`}
                  role="option"
                  aria-selected={userMode === mode}
                >
                  {getModeLabel(mode)}
                  {userMode === mode && <Check size={14} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Alerts / Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowAlerts(!showAlerts)}
            className="relative p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-all"
            aria-label={`Alert notifications, ${activeAlerts.length} unread`}
          >
            <Bell size={18} />
            {activeAlerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
            )}
          </button>

          {showAlerts && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-4 z-50 max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                <span className="text-xs font-bold text-slate-300">Active Status Alerts</span>
                <span className="text-[10px] text-slate-500">{activeAlerts.length} issues</span>
              </div>
              <div className="space-y-3">
                {activeAlerts.map(alert => (
                  <div key={alert.id} className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/80">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        alert.type === 'danger' ? 'bg-rose-500' : alert.type === 'warning' ? 'bg-amber-500' : 'bg-sky-500'
                      }`} />
                      <span className="text-xs font-semibold text-slate-200">{alert.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal">{alert.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-7 h-7 rounded-full object-cover border border-slate-800"
          />
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-semibold text-slate-200">{user.name}</span>
            <span className="text-[10px] text-slate-400">{user.role}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
