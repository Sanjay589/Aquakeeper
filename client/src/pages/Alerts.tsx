import React, { useState } from 'react';
import { mockAlerts } from '../utils/mockData';
import { Bell, ShieldAlert, Check, CheckCheck, Trash } from 'lucide-react';
import { useToast } from '../components/common/Toast';

export const Alerts: React.FC = () => {
  const { showToast } = useToast();
  const [alerts, setAlerts] = useState(mockAlerts);

  const handleMarkAllRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, read: true })));
    showToast('All alerts marked as read.', 'success');
  };

  const handleToggleRead = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: !a.read } : a));
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
    showToast('Alert removed.', 'info');
  };

  return (
    <div className="space-y-6 select-none max-w-4xl animate-slide-in">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Bell size={20} className="text-sky-400" />
            System Alerts & Critical Logs
          </h1>
          <p className="text-xs text-slate-400">Biological parameter warnings and hardware failure alerts.</p>
        </div>

        <button 
          onClick={handleMarkAllRead}
          className="flex items-center justify-center gap-2 px-3.5 py-2 bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-350 hover:text-slate-100 rounded-xl transition-colors"
        >
          <CheckCheck size={14} /> Mark All as Read
        </button>
      </div>

      <div className="space-y-3">
        {alerts.map(alert => (
          <div 
            key={alert.id}
            className={`p-4 bg-slate-900 border rounded-2xl flex items-start justify-between gap-4 transition-all ${
              alert.read ? 'border-slate-800/40 opacity-60' : 'border-slate-800'
            }`}
          >
            <div className="flex gap-3 items-start">
              <div className={`p-2 rounded-xl shrink-0 ${
                alert.type === 'danger' 
                  ? 'bg-rose-500/10 text-rose-500' 
                  : alert.type === 'warning' 
                  ? 'bg-amber-500/10 text-amber-500' 
                  : 'bg-sky-500/10 text-sky-400'
              }`}>
                <ShieldAlert size={18} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-200">{alert.title}</span>
                  {!alert.read && (
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  )}
                </div>
                <p className="text-[11px] text-slate-400 leading-normal max-w-2xl">{alert.message}</p>
                <span className="text-[9px] text-slate-500 block">{new Date(alert.date).toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleToggleRead(alert.id)}
                className="p-1.5 bg-slate-950 border border-slate-850 hover:bg-slate-800 text-slate-450 hover:text-slate-200 rounded-lg transition-colors"
                title={alert.read ? "Mark unread" : "Mark read"}
              >
                <Check size={14} />
              </button>
              <button
                onClick={() => handleDeleteAlert(alert.id)}
                className="p-1.5 bg-slate-950 border border-slate-850 hover:bg-slate-800 text-slate-450 hover:text-rose-400 rounded-lg transition-colors"
                title="Delete alert"
              >
                <Trash size={14} />
              </button>
            </div>
          </div>
        ))}
        {alerts.length === 0 && (
          <div className="text-center py-12 bg-slate-900/10 border border-dashed border-slate-800 rounded-2xl text-slate-500 text-xs">
            No system alerts. Your aquariums are running safe!
          </div>
        )}
      </div>
    </div>
  );
};
export default Alerts;
