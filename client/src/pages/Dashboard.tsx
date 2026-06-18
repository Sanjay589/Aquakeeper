import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserMode } from '../contexts/UserModeContext';
import { 
  mockAquariums, 
  mockFish, 
  mockWaterReadings, 
  mockWaterTrendData,
  mockReminders, 
  mockAlerts,
  getParameterFeedback
} from '../utils/mockData';
import { 
  Heart, 
  Droplet, 
  Fish as FishIcon, 
  AlertTriangle, 
  Calendar, 
  Plus, 
  ArrowRight,
  ClipboardList,
  Sparkles,
  Store,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Line, 
  CartesianGrid 
} from 'recharts';
import { useToast } from '../components/common/Toast';

export const Dashboard: React.FC = () => {
  const { userMode } = useUserMode();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [aquariums, setAquariums] = useState(mockAquariums);

  // Compute stats
  const totalAquariums = aquariums.length;
  const totalFish = mockFish.length;
  const overallHealth = Math.round(aquariums.reduce((acc, curr) => acc + curr.healthScore, 0) / totalAquariums) || 0;
  const activeAlertsCount = mockAlerts.filter(a => !a.read).length;
  const pendingReminders = mockReminders.filter(r => r.status === 'pending');

  const handleQuickFeed = () => {
    showToast('Feeding schedule logged for all tanks!', 'success');
  };

  const handleWaterChangeLog = () => {
    showToast('Urgent 20% water change logged. parameters stabilized.', 'success');
    // Simulate tank health improvement
    setAquariums(prev => prev.map(aq => aq.id === 'aq-3' ? { ...aq, healthScore: 94 } : aq));
  };

  return (
    <div className="space-y-6 select-none animate-slide-in">
      {/* Welcome banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100">Aquarium Command Hub</h1>
          <p className="text-xs text-slate-400">Real-time parameters, health indexes, and reminders.</p>
        </div>
        <div className="flex gap-2.5">
          <button 
            onClick={() => navigate('/water-quality')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-slate-100 transition-colors"
          >
            <Plus size={14} /> Log Water Reading
          </button>
          <button 
            onClick={() => navigate('/guide')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-xs font-bold text-white transition-colors shadow-lg shadow-sky-900/30"
          >
            Setup Guide
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl flex flex-col gap-3 relative overflow-hidden">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Health Score</span>
            <Heart size={16} className="text-emerald-500 fill-emerald-500/20" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-slate-100">{overallHealth}%</span>
            <span className="text-[10px] text-emerald-400 font-medium">Optimal</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full" style={{ width: `${overallHealth}%` }} />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl flex flex-col gap-3">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Aquariums</span>
            <Droplet size={16} className="text-sky-500" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-slate-100">{totalAquariums}</span>
            <span className="text-[10px] text-slate-400">active tanks</span>
          </div>
          <div className="text-[10px] text-slate-400">2 Freshwater, 1 Reef</div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl flex flex-col gap-3">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Total Fish</span>
            <FishIcon size={16} className="text-teal-400" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-slate-100">{totalFish}</span>
            <span className="text-[10px] text-emerald-400 font-medium">Healthy</span>
          </div>
          <div className="text-[10px] text-slate-400">9 tracked species</div>
        </div>

        {/* Metric 4 */}
        <div className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl flex flex-col gap-3">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Active Alerts</span>
            <AlertTriangle size={16} className={activeAlertsCount > 0 ? "text-rose-500" : "text-slate-500"} />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-slate-100">{activeAlertsCount}</span>
            <span className="text-[10px] text-rose-500 font-medium">{activeAlertsCount > 0 ? 'Requires attention' : 'None'}</span>
          </div>
          <div className="text-[10px] text-slate-400">Click bell icon for details</div>
        </div>
      </div>

      {/* Quick Action buttons */}
      <div className="p-4 bg-slate-950/40 border border-slate-800/60 rounded-2xl flex flex-wrap gap-3 items-center justify-between">
        <span className="text-xs font-bold text-slate-300">Quick Actions</span>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={handleQuickFeed}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold rounded-xl text-slate-200 transition-colors"
          >
            Log Bulk Feeding
          </button>
          <button 
            onClick={handleWaterChangeLog}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold rounded-xl text-rose-400 transition-colors"
          >
            Clean Tank (20% Change)
          </button>
          <button 
            onClick={() => navigate('/ai-assistant')}
            className="px-3.5 py-1.5 bg-sky-950/40 hover:bg-sky-950/60 border border-sky-800/40 text-xs font-bold rounded-xl text-sky-400 transition-colors flex items-center gap-1.5"
          >
            <Sparkles size={12} /> Ask AI Assistant
          </button>
        </div>
      </div>

      {/* Mode-dependent small layout change */}
      <div className="border border-slate-800 bg-slate-950/60 rounded-2xl p-5 relative overflow-hidden">
        {userMode === 'beginner' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider">
              <BookOpen size={16} />
              Beginner Assistant Panel
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
              <strong>Your Community Planted Tank has pH 7.2.</strong> pH measures how acidic or basic water is. A pH of 7.2 is neutral and perfect for tetra species.
            </p>
            <div className="p-3 bg-sky-950/20 border border-sky-500/10 rounded-xl max-w-2xl text-[11px] text-sky-300 leading-relaxed">
              “Ammonia level is 0.05 ppm. Ammonia is created by fish waste. It is highly toxic; the safe goal is exactly 0. AquaKeeper recommends checking if you fed too much food today.”
            </div>
          </div>
        )}

        {userMode === 'owner' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
              <ClipboardList size={16} />
              Experienced Hobbyist Checkpoint
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
              Currently monitoring parameters for <strong>3 active aquariums</strong>. You have <strong>3 key test reminders</strong>. Nitrate levels are steady on nano and reef tanks.
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-center">
                <span className="block text-[9px] uppercase font-bold text-slate-500">Salinity Target</span>
                <span className="text-xs font-bold text-slate-200">35 ppt (Oceanic)</span>
              </div>
              <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-center">
                <span className="block text-[9px] uppercase font-bold text-slate-500">Alkalinity Limit</span>
                <span className="text-xs font-bold text-slate-200">8.5 - 9.5 dKH</span>
              </div>
              <div className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-center">
                <span className="block text-[9px] uppercase font-bold text-slate-500">Planted CO2</span>
                <span className="text-xs font-bold text-slate-200">15-20 ppm Co2</span>
              </div>
            </div>
          </div>
        )}

        {userMode === 'store' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Store size={16} />
              Store Manager Dashboard Panel
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
              Retail mode is activated. Low stock levels detected for <strong>Prime Water Conditioner</strong> (0 in stock). Stock checks are synchronized.
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => navigate('/pet-store')}
                className="px-3 py-1.5 bg-emerald-950/40 border border-emerald-500/20 hover:bg-emerald-950/60 rounded-xl text-xs font-bold text-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <FileSpreadsheet size={12} /> Manage Store inventory
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Chart & Task Reminders */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart Card */}
        <div className="lg:col-span-2 p-5 bg-slate-900/30 border border-slate-800/80 rounded-2xl flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-slate-800/60 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-200">Water Parameter Trends</h3>
              <p className="text-[10px] text-slate-500">Fluctuation history for Community Planted Tank (Past 7 days)</p>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-sky-950/40 border border-sky-500/20 text-sky-400">
              Ammonia & Nitrate
            </span>
          </div>

          <div className="h-60 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockWaterTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} 
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Line type="monotone" dataKey="ammonia" stroke="#f43f5e" strokeWidth={2} name="Ammonia (ppm)" dot={{ r: 3 }} />
                <Line type="monotone" dataKey="nitrate" stroke="#0ea5e9" strokeWidth={2} name="Nitrate (ppm)" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Reminders / Feed Schedule Card */}
        <div className="p-5 bg-slate-900/30 border border-slate-800/80 rounded-2xl flex flex-col gap-4">
          <div className="border-b border-slate-800/60 pb-3">
            <h3 className="text-sm font-bold text-slate-200 font-sans">Maintenance & Feeding</h3>
            <p className="text-[10px] text-slate-500">Required tasks to complete today</p>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-60 pr-1">
            {pendingReminders.map(rem => (
              <div key={rem.id} className="p-3 bg-slate-950/50 border border-slate-850 rounded-xl flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-sky-400" />
                    <span className="text-xs font-bold text-slate-200">{rem.title}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal">{rem.notes}</p>
                </div>
                <button
                  onClick={() => {
                    showToast(`Completed "${rem.title}"!`, 'success');
                  }}
                  className="px-2 py-1 bg-sky-950 hover:bg-sky-900 text-[10px] font-bold text-sky-400 rounded-lg transition-colors border border-sky-500/10 shrink-0"
                >
                  Done
                </button>
              </div>
            ))}
            {pendingReminders.length === 0 && (
              <div className="text-center py-6 text-slate-500 text-xs">All tasks completed! Good job.</div>
            )}
          </div>
        </div>
      </div>

      {/* Aquarium Cards Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-200">Active Aquarium List</h3>
          <span className="text-[10px] text-slate-400">{aquariums.length} custom tanks</span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {aquariums.map(aq => (
            <div 
              key={aq.id} 
              className="border border-slate-800 bg-slate-900/20 hover:border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all relative overflow-hidden group hover:shadow-lg hover:shadow-sky-500/[0.02]"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-slate-200 group-hover:text-sky-400 transition-colors text-sm">
                    {aq.name}
                  </h4>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    aq.healthScore >= 90 ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20' : 'bg-amber-950/40 text-amber-400 border border-amber-500/20'
                  }`}>
                    Health: {aq.healthScore}%
                  </span>
                </div>
                <div className="flex gap-4 text-[10px] text-slate-400">
                  <span>Volume: {aq.volume} {aq.volumeUnit}</span>
                  <span>Type: <span className="capitalize">{aq.type}</span></span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-slate-300">
                  <div className="bg-slate-950/40 p-2 rounded-lg border border-slate-800/50">
                    <span className="block text-[8px] text-slate-500 uppercase font-bold">Temp</span>
                    <span className="font-semibold">{aq.temperature}°F</span>
                  </div>
                  <div className="bg-slate-950/40 p-2 rounded-lg border border-slate-800/50">
                    <span className="block text-[8px] text-slate-500 uppercase font-bold">pH</span>
                    <span className="font-semibold">{aq.pH}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate(`/aquarium/${aq.id}`)}
                className="w-full flex items-center justify-center gap-1.5 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-300 hover:text-slate-100 rounded-xl transition-all"
              >
                Inspect Tank <ArrowRight size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
