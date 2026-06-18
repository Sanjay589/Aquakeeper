import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockAquariums } from '../utils/mockData';
import { Droplet, Plus, ArrowRight, Settings, Info, Sparkles } from 'lucide-react';
import { useToast } from '../components/common/Toast';
import { Modal } from '../components/common/Modal';

export const MyAquariums: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [aquariums, setAquariums] = useState(mockAquariums);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [volume, setVolume] = useState('20');
  const [volumeUnit, setVolumeUnit] = useState<'gallons' | 'liters'>('gallons');
  const [type, setType] = useState<'freshwater' | 'saltwater'>('freshwater');

  const handleAddAquarium = () => {
    if (!name.trim()) {
      showToast('Please enter an aquarium name.', 'error');
      return;
    }
    const newAq = {
      id: `aq-${Date.now()}`,
      name,
      volume: parseFloat(volume) || 10,
      volumeUnit,
      type,
      healthScore: 100,
      createdDate: new Date().toISOString().split('T')[0],
      fishCount: 0,
      temperature: type === 'saltwater' ? 78 : 75,
      pH: type === 'saltwater' ? 8.2 : 7.0,
    };

    setAquariums([...aquariums, newAq]);
    showToast(`Aquarium "${name}" added successfully! (Developer mode)`, 'success');
    setName('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 select-none animate-slide-in">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Droplet size={20} className="text-sky-400" />
            My Aquariums
          </h1>
          <p className="text-xs text-slate-400">View parameters, inspect populations, and add tanks.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-3.5 py-2 bg-sky-600 hover:bg-sky-500 rounded-xl text-xs font-bold text-white transition-colors"
        >
          <Plus size={14} /> Add New Aquarium
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aquariums.map(aq => (
          <div 
            key={aq.id} 
            className="border border-slate-800 bg-slate-900/30 rounded-2xl p-5 flex flex-col justify-between gap-6 relative overflow-hidden group hover:border-slate-700 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-200 text-sm">{aq.name}</h3>
                  <span className="text-[10px] text-slate-400 font-medium capitalize">{aq.type} tank</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  aq.healthScore >= 90 ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20' : 'bg-amber-950/40 text-amber-400 border border-amber-500/20'
                }`}>
                  Health: {aq.healthScore}%
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                <div className="p-2 bg-slate-950/40 border border-slate-800/60 rounded-lg">
                  <span className="block text-[8px] text-slate-500 uppercase font-bold">Volume</span>
                  <span className="font-semibold">{aq.volume} {aq.volumeUnit}</span>
                </div>
                <div className="p-2 bg-slate-950/40 border border-slate-800/60 rounded-lg">
                  <span className="block text-[8px] text-slate-500 uppercase font-bold">Est. Fish</span>
                  <span className="font-semibold">{aq.fishCount} inhabitants</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/aquarium/${aq.id}`)}
                className="flex-1 flex items-center justify-center gap-1 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-300 hover:text-slate-100 rounded-xl transition-all"
              >
                Inspect <ArrowRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Aquarium"
        confirmText="Create Tank"
        onConfirm={handleAddAquarium}
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-400">Specify details about your tank setup to enable correct calculations.</p>
          
          <div className="flex flex-col gap-1">
            <label htmlFor="aq-name" className="text-xs font-semibold text-slate-300">Aquarium Name</label>
            <input 
              id="aq-name"
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)}
              className="glass-input text-xs px-3 py-2 rounded-xl"
              placeholder="e.g. Dining Room Planted"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="aq-vol" className="text-xs font-semibold text-slate-300">Volume</label>
              <input 
                id="aq-vol"
                type="number" 
                value={volume} 
                onChange={e => setVolume(e.target.value)}
                className="glass-input text-xs px-3 py-2 rounded-xl"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="aq-unit" className="text-xs font-semibold text-slate-300">Unit</label>
              <select 
                id="aq-unit"
                value={volumeUnit} 
                onChange={e => setVolumeUnit(e.target.value as 'gallons' | 'liters')}
                className="glass-input text-xs px-3 py-2 rounded-xl"
              >
                <option value="gallons">Gallons</option>
                <option value="liters">Liters</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="aq-type" className="text-xs font-semibold text-slate-300">Water Type</label>
            <select 
              id="aq-type"
              value={type} 
              onChange={e => setType(e.target.value as 'freshwater' | 'saltwater')}
              className="glass-input text-xs px-3 py-2 rounded-xl"
            >
              <option value="freshwater">Freshwater (Common Community)</option>
              <option value="saltwater">Saltwater (Marine Reef)</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default MyAquariums;
