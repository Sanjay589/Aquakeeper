import React, { useState } from 'react';
import { Sliders, Save, Check } from 'lucide-react';
import { useToast } from '../components/common/Toast';

export const Settings: React.FC = () => {
  const { showToast } = useToast();
  const [tempUnit, setTempUnit] = useState<'F' | 'C'>('F');
  const [volumeUnit, setVolumeUnit] = useState<'gallons' | 'liters'>('gallons');
  const [notifyAmmonia, setNotifyAmmonia] = useState(true);
  const [notifyLowStock, setNotifyLowStock] = useState(true);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Application configuration updated!', 'success');
  };

  return (
    <div className="space-y-6 select-none max-w-xl animate-slide-in">
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Sliders size={20} className="text-sky-400" />
          Application Settings
        </h1>
        <p className="text-xs text-slate-400">Manage chemistry limits, units calculations, and push flags.</p>
      </div>

      <form onSubmit={handleSaveSettings} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-5 shadow-xl">
        
        {/* Metric selection */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-slate-350 border-b border-slate-850 pb-2">Measurement Scales</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="set-temp" className="text-xs text-slate-400 font-semibold">Temperature Unit</label>
              <select 
                id="set-temp"
                value={tempUnit} 
                onChange={e => setTempUnit(e.target.value as any)}
                className="glass-input text-xs px-3 py-2 rounded-xl"
              >
                <option value="F">Fahrenheit (°F)</option>
                <option value="C">Celsius (°C)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="set-vol" className="text-xs text-slate-400 font-semibold">Volume Standard</label>
              <select 
                id="set-vol"
                value={volumeUnit} 
                onChange={e => setVolumeUnit(e.target.value as any)}
                className="glass-input text-xs px-3 py-2 rounded-xl"
              >
                <option value="gallons">US Gallons (gal)</option>
                <option value="liters">Metric Liters (L)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-slate-350 border-b border-slate-850 pb-2">System Notifications</h2>
          
          <div className="space-y-2.5">
            <label className="flex items-center justify-between p-3 bg-slate-950/40 border border-slate-800/60 rounded-xl cursor-pointer">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-200 block">Critical Ammonia Warnings</span>
                <span className="text-[10px] text-slate-550">Alert instantly if Ammonia readings exceed 0 ppm.</span>
              </div>
              <input 
                type="checkbox" 
                checked={notifyAmmonia} 
                onChange={e => setNotifyAmmonia(e.target.checked)}
                className="w-4 h-4 text-sky-600 bg-slate-900 border-slate-800 rounded focus:ring-sky-500 focus:ring-2"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-slate-950/40 border border-slate-800/60 rounded-xl cursor-pointer">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-200 block">Store Stock Notifications</span>
                <span className="text-[10px] text-slate-550">Alert immediately when store product volumes drop below 5.</span>
              </div>
              <input 
                type="checkbox" 
                checked={notifyLowStock} 
                onChange={e => setNotifyLowStock(e.target.checked)}
                className="w-4 h-4 text-sky-600 bg-slate-900 border-slate-800 rounded focus:ring-sky-500 focus:ring-2"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-sky-600 hover:bg-sky-500 text-xs font-bold text-white rounded-xl transition-colors shadow-lg shadow-sky-900/10"
        >
          <Save size={14} />
          Save Application Configuration
        </button>
      </form>
    </div>
  );
};
export default Settings;
