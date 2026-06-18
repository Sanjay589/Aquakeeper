import React, { useState } from 'react';
import { mockAquariums, getParameterFeedback } from '../utils/mockData';
import { Activity, Plus, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useToast } from '../components/common/Toast';

export const WaterQuality: React.FC = () => {
  const { showToast } = useToast();
  const [aquariumId, setAquariumId] = useState(mockAquariums[0]?.id || '');
  const [pH, setPH] = useState('6.8');
  const [temperature, setTemperature] = useState('76');
  const [ammonia, setAmmonia] = useState('0');
  const [nitrite, setNitrite] = useState('0');
  const [nitrate, setNitrate] = useState('10');
  const [notes, setNotes] = useState('');

  const handleLogReading = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Water chemistry parameters saved! (Dev Mode)', 'success');
    setNotes('');
  };

  const selectedTank = mockAquariums.find(a => a.id === aquariumId) || mockAquariums[0];

  const phVal = parseFloat(pH) || 7.0;
  const ammVal = parseFloat(ammonia) || 0;
  const nitrVal = parseFloat(nitrite) || 0;
  const nitraVal = parseFloat(nitrate) || 0;

  const phFeedback = getParameterFeedback('pH', phVal);
  const ammoniaFeedback = getParameterFeedback('ammonia', ammVal);
  const nitriteFeedback = getParameterFeedback('nitrite', nitrVal);
  const nitrateFeedback = getParameterFeedback('nitrate', nitraVal);

  return (
    <div className="space-y-6 select-none max-w-4xl animate-slide-in">
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Activity size={20} className="text-sky-400" />
          Water Quality Recorder
        </h1>
        <p className="text-xs text-slate-400">Record values to track biology and cycle status.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Form panel */}
        <div className="md:col-span-2">
          <form 
            onSubmit={handleLogReading} 
            className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-xl"
            aria-label="Water parameters logger"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="wq-tank" className="text-xs font-semibold text-slate-300">Select Aquarium</label>
              <select 
                id="wq-tank"
                value={aquariumId} 
                onChange={e => setAquariumId(e.target.value)}
                className="glass-input text-xs px-3 py-2 rounded-xl"
              >
                {mockAquariums.map(aq => (
                  <option key={aq.id} value={aq.id}>{aq.name} ({aq.type})</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="wq-ph" className="text-xs font-semibold text-slate-300">pH level</label>
                <input 
                  id="wq-ph"
                  type="number" 
                  step="0.1"
                  value={pH} 
                  onChange={e => setPH(e.target.value)}
                  className="glass-input text-xs px-3 py-2.5 rounded-xl"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="wq-temp" className="text-xs font-semibold text-slate-300">Temperature (°F)</label>
                <input 
                  id="wq-temp"
                  type="number" 
                  value={temperature} 
                  onChange={e => setTemperature(e.target.value)}
                  className="glass-input text-xs px-3 py-2.5 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="wq-amm" className="text-xs font-semibold text-slate-300">Ammonia (NH₃ ppm)</label>
                <input 
                  id="wq-amm"
                  type="number" 
                  step="0.01"
                  value={ammonia} 
                  onChange={e => setAmmonia(e.target.value)}
                  className="glass-input text-xs px-3 py-2 rounded-xl"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="wq-nitrite" className="text-xs font-semibold text-slate-300">Nitrite (NO₂ ppm)</label>
                <input 
                  id="wq-nitrite"
                  type="number" 
                  step="0.01"
                  value={nitrite} 
                  onChange={e => setNitrite(e.target.value)}
                  className="glass-input text-xs px-3 py-2 rounded-xl"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="wq-nitrate" className="text-xs font-semibold text-slate-300">Nitrate (NO₃ ppm)</label>
                <input 
                  id="wq-nitrate"
                  type="number" 
                  value={nitrate} 
                  onChange={e => setNitrate(e.target.value)}
                  className="glass-input text-xs px-3 py-2 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="wq-notes" className="text-xs font-semibold text-slate-300">Notes / Observations</label>
              <textarea
                id="wq-notes"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="glass-input text-xs px-3 py-2 rounded-xl h-20 resize-none"
                placeholder="Notice any behavior anomalies or coral expansion?"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-xs font-bold text-white rounded-xl transition-colors"
            >
              Log Water Parameters
            </button>
          </form>
        </div>

        {/* Live Beginner Advice Feedback */}
        <div className="space-y-4">
          <div className="p-4 bg-slate-950/40 border border-slate-800 rounded-2xl space-y-4">
            <h3 className="text-xs font-bold text-slate-300">Dynamic Biology Advice</h3>
            <p className="text-[10px] text-slate-500 leading-normal">
              Based on the numbers entered above, AquaKeeper generates natural language feedback for the <strong>{selectedTank.name}</strong>.
            </p>

            <div className="space-y-3">
              {/* pH Feedback */}
              <div className={`p-3 rounded-xl border text-[11px] leading-relaxed flex gap-2 ${
                phFeedback.status === 'good' ? 'bg-slate-900/40 border-emerald-500/15 text-slate-300' : 'bg-slate-900/40 border-amber-500/25 text-amber-300'
              }`}>
                {phFeedback.status === 'good' ? <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" /> : <AlertCircle size={14} className="text-amber-400 shrink-0 mt-0.5" />}
                <div>
                  <strong>pH ({pH}):</strong> {phFeedback.text}
                </div>
              </div>

              {/* Ammonia Feedback */}
              <div className={`p-3 rounded-xl border text-[11px] leading-relaxed flex gap-2 ${
                ammoniaFeedback.status === 'good' ? 'bg-slate-900/40 border-emerald-500/15 text-slate-300' : 'bg-rose-950/20 border-rose-500/25 text-rose-300'
              }`}>
                {ammoniaFeedback.status === 'good' ? <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" /> : <AlertCircle size={14} className="text-rose-400 shrink-0 mt-0.5" />}
                <div>
                  <strong>Ammonia ({ammonia}):</strong> {ammoniaFeedback.text}
                </div>
              </div>

              {/* Nitrite Feedback */}
              <div className={`p-3 rounded-xl border text-[11px] leading-relaxed flex gap-2 ${
                nitriteFeedback.status === 'good' ? 'bg-slate-900/40 border-emerald-500/15 text-slate-300' : 'bg-rose-950/20 border-rose-500/25 text-rose-300'
              }`}>
                {nitriteFeedback.status === 'good' ? <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" /> : <AlertCircle size={14} className="text-rose-400 shrink-0 mt-0.5" />}
                <div>
                  <strong>Nitrite ({nitrite}):</strong> {nitriteFeedback.text}
                </div>
              </div>

              {/* Nitrate Feedback */}
              <div className={`p-3 rounded-xl border text-[11px] leading-relaxed flex gap-2 ${
                nitrateFeedback.status === 'good' ? 'bg-slate-900/40 border-emerald-500/15 text-slate-300' : 'bg-slate-900/40 border-amber-500/25 text-amber-300'
              }`}>
                {nitrateFeedback.status === 'good' ? <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" /> : <AlertCircle size={14} className="text-amber-400 shrink-0 mt-0.5" />}
                <div>
                  <strong>Nitrate ({nitrate}):</strong> {nitrateFeedback.text}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WaterQuality;
