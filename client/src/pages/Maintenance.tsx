import React, { useState } from 'react';
import { mockReminders, mockAquariums } from '../utils/mockData';
import { Calendar, Plus, CheckCircle, Info, Sparkles } from 'lucide-react';
import { useToast } from '../components/common/Toast';
import { Modal } from '../components/common/Modal';

export const Maintenance: React.FC = () => {
  const { showToast } = useToast();
  const [reminders, setReminders] = useState(mockReminders);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [aquariumId, setAquariumId] = useState(mockAquariums[0]?.id || '');
  const [type, setType] = useState<'feeding' | 'cleaning' | 'testing' | 'other'>('feeding');
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'biweekly' | 'monthly'>('weekly');
  const [notes, setNotes] = useState('');

  const handleCreateReminder = () => {
    if (!title.trim()) {
      showToast('Please enter a reminder title.', 'error');
      return;
    }
    const newRem = {
      id: `rem-${Date.now()}`,
      aquariumId,
      title,
      type,
      status: 'pending' as const,
      dueDate: new Date().toISOString(),
      frequency,
      notes,
    };
    setReminders([newRem, ...reminders]);
    showToast(`Task "${title}" scheduled successfully!`, 'success');
    setTitle('');
    setNotes('');
    setIsModalOpen(false);
  };

  const handleToggleStatus = (id: string, title: string, status: string) => {
    setReminders(prev => prev.map(rem => {
      if (rem.id === id) {
        const nextStatus = status === 'pending' ? 'completed' : 'pending';
        showToast(`Task "${title}" marked as ${nextStatus}!`, 'success');
        return { ...rem, status: nextStatus };
      }
      return rem;
    }));
  };

  const getTankName = (id: string) => {
    const aq = mockAquariums.find(a => a.id === id);
    return aq ? aq.name : 'All Tanks';
  };

  return (
    <div className="space-y-6 select-none max-w-4xl animate-slide-in">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Calendar size={20} className="text-sky-400" />
            Maintenance & Feeding Planner
          </h1>
          <p className="text-xs text-slate-400">Schedule cleanings, set custom feeders, and log checklists.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-3.5 py-2 bg-sky-600 hover:bg-sky-500 rounded-xl text-xs font-bold text-white transition-colors"
        >
          <Plus size={14} /> Schedule New Task
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Active Checklist */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <h3 className="text-xs font-bold text-slate-300">Active Checklist</h3>
            <span className="text-[10px] text-slate-500">
              {reminders.filter(r => r.status === 'pending').length} tasks pending
            </span>
          </div>

          <div className="space-y-3">
            {reminders.map(rem => (
              <div 
                key={rem.id} 
                className={`p-4 bg-slate-900 border rounded-2xl flex items-start justify-between gap-4 transition-all ${
                  rem.status === 'completed' ? 'border-slate-800/40 opacity-60' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full capitalize ${
                      rem.type === 'feeding' 
                        ? 'bg-sky-950/40 text-sky-400 border border-sky-500/20' 
                        : rem.type === 'cleaning' 
                        ? 'bg-teal-950/40 text-teal-400 border border-teal-500/20'
                        : 'bg-amber-950/40 text-amber-400 border border-amber-500/20'
                    }`}>
                      {rem.type}
                    </span>
                    <span className="text-xs font-bold text-slate-200">{rem.title}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal">{rem.notes || 'No notes specified.'}</p>
                  <div className="text-[9px] text-slate-500 flex gap-3">
                    <span>Frequency: <span className="capitalize">{rem.frequency}</span></span>
                    <span>Tank: {getTankName(rem.aquariumId)}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleStatus(rem.id, rem.title, rem.status)}
                  className={`px-3 py-1.5 text-[10px] font-bold rounded-xl border transition-colors shrink-0 ${
                    rem.status === 'completed'
                      ? 'bg-slate-950 text-slate-400 border-slate-800'
                      : 'bg-sky-950 hover:bg-sky-900 text-sky-400 border-sky-500/10'
                  }`}
                >
                  {rem.status === 'completed' ? 'Completed' : 'Complete'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-4">
          <div className="p-4 bg-slate-950/40 border border-slate-800 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <Sparkles size={16} className="text-sky-400" />
              AI Feeding Insights
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Feeding schedules are key for biological balances. Bettas require food only twice per day. Unconsumed food creates toxic spikes.
            </p>
            <div className="text-[9px] p-2.5 bg-slate-900 border border-slate-850 rounded-lg text-slate-400 italic">
              "AquaKeeper later connects smart automatic feeders to log feed dates without app logs."
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Schedule Maintenance Task"
        confirmText="Schedule Task"
        onConfirm={handleCreateReminder}
      >
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="maint-title" className="text-xs font-semibold text-slate-300">Task Title</label>
            <input 
              id="maint-title"
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)}
              className="glass-input text-xs px-3 py-2 rounded-xl"
              placeholder="e.g. Test Salinity Levels"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="maint-aq" className="text-xs font-semibold text-slate-300">Target Aquarium</label>
            <select 
              id="maint-aq"
              value={aquariumId} 
              onChange={e => setAquariumId(e.target.value)}
              className="glass-input text-xs px-3 py-2 rounded-xl"
            >
              {mockAquariums.map(aq => (
                <option key={aq.id} value={aq.id}>{aq.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="maint-type" className="text-xs font-semibold text-slate-300">Task Type</label>
              <select 
                id="maint-type"
                value={type} 
                onChange={e => setType(e.target.value as 'feeding' | 'cleaning' | 'testing' | 'other')}
                className="glass-input text-xs px-3 py-2 rounded-xl"
              >
                <option value="feeding">Feeding</option>
                <option value="cleaning">Cleaning / Water Change</option>
                <option value="testing">Chemistry Testing</option>
                <option value="other">Other / Hardware Check</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="maint-freq" className="text-xs font-semibold text-slate-300">Frequency</label>
              <select 
                id="maint-freq"
                value={frequency} 
                onChange={e => setFrequency(e.target.value as 'daily' | 'weekly' | 'biweekly' | 'monthly')}
                className="glass-input text-xs px-3 py-2 rounded-xl"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="biweekly">Biweekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="maint-notes" className="text-xs font-semibold text-slate-300">Action Notes</label>
            <textarea 
              id="maint-notes"
              value={notes} 
              onChange={e => setNotes(e.target.value)}
              className="glass-input text-xs px-3 py-2 rounded-xl h-20 resize-none"
              placeholder="e.g. Vacuum substrate, scrub algae off front glass."
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default Maintenance;
