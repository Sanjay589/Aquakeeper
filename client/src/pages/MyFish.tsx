import React, { useState } from 'react';
import { mockFish, mockAquariums } from '../utils/mockData';
import { Fish as FishIcon, Plus, Info, Check, Trash } from 'lucide-react';
import { useToast } from '../components/common/Toast';
import { Modal } from '../components/common/Modal';

export const MyFish: React.FC = () => {
  const { showToast } = useToast();
  const [fishItems, setFishItems] = useState(mockFish);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [aquariumId, setAquariumId] = useState(mockAquariums[0]?.id || '');
  const [status, setStatus] = useState<'healthy' | 'sick' | 'monitoring'>('healthy');

  const handleAddFish = () => {
    if (!name.trim() || !species.trim()) {
      showToast('Please enter both name and species details.', 'error');
      return;
    }
    const newFish = {
      id: `fish-${Date.now()}`,
      aquariumId,
      name,
      species,
      age: 1,
      ageUnit: 'months' as const,
      addedDate: new Date().toISOString().split('T')[0],
      status,
      lastFed: 'Not logged yet',
    };
    setFishItems([...fishItems, newFish]);
    showToast(`Added fish "${name}" to database!`, 'success');
    setName('');
    setSpecies('');
    setIsModalOpen(false);
  };

  const handleDeleteFish = (id: string, name: string) => {
    setFishItems(prev => prev.filter(f => f.id !== id));
    showToast(`Removed "${name}" from inventory list.`, 'info');
  };

  const getTankName = (id: string) => {
    const aq = mockAquariums.find(a => a.id === id);
    return aq ? aq.name : 'Unknown Tank';
  };

  return (
    <div className="space-y-6 select-none animate-slide-in">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <FishIcon size={20} className="text-sky-400" />
            My Fish Catalog
          </h1>
          <p className="text-xs text-slate-400">Total list of inhabitants across all setup systems.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-3.5 py-2 bg-sky-600 hover:bg-sky-500 rounded-xl text-xs font-bold text-white transition-colors"
        >
          <Plus size={14} /> Catalog New Fish
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fishItems.map(fish => (
          <div 
            key={fish.id} 
            className="border border-slate-800 bg-slate-900/30 rounded-2xl p-5 flex flex-col justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-200 text-xs">{fish.name}</h3>
                  <span className="text-[10px] text-sky-400/80 font-medium">{getTankName(fish.aquariumId)}</span>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase ${
                  fish.status === 'healthy' 
                    ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20' 
                    : fish.status === 'monitoring' 
                    ? 'bg-amber-950/40 text-amber-400 border border-amber-500/20' 
                    : 'bg-rose-950/40 text-rose-400 border border-rose-500/20'
                }`}>
                  {fish.status}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 italic leading-relaxed">{fish.species}</p>
              <div className="text-[9px] text-slate-500">
                Added: {fish.addedDate} • Age: {fish.age} {fish.ageUnit}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-850 pt-3 text-[10px] text-slate-400">
              <span>Feed: {fish.lastFed}</span>
              <button 
                onClick={() => handleDeleteFish(fish.id, fish.name)}
                className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                aria-label={`Remove ${fish.name}`}
              >
                <Trash size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Catalog New Fish"
        confirmText="Register Inhabitant"
        onConfirm={handleAddFish}
      >
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="cat-name" className="text-xs font-semibold text-slate-300">Fish Pet Name</label>
            <input 
              id="cat-name"
              type="text" 
              value={name} 
              onChange={e => setName(e.target.value)}
              className="glass-input text-xs px-3 py-2 rounded-xl"
              placeholder="e.g. Nemo"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="cat-spec" className="text-xs font-semibold text-slate-300">Species</label>
            <input 
              id="cat-spec"
              type="text" 
              value={species} 
              onChange={e => setSpecies(e.target.value)}
              className="glass-input text-xs px-3 py-2 rounded-xl"
              placeholder="e.g. Ocellaris Clownfish"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="cat-aq" className="text-xs font-semibold text-slate-300">Target Aquarium</label>
            <select 
              id="cat-aq"
              value={aquariumId} 
              onChange={e => setAquariumId(e.target.value)}
              className="glass-input text-xs px-3 py-2 rounded-xl"
            >
              {mockAquariums.map(aq => (
                <option key={aq.id} value={aq.id}>{aq.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="cat-status" className="text-xs font-semibold text-slate-300">Initial Health Status</label>
            <select 
              id="cat-status"
              value={status} 
              onChange={e => setStatus(e.target.value as 'healthy' | 'sick' | 'monitoring')}
              className="glass-input text-xs px-3 py-2 rounded-xl"
            >
              <option value="healthy">Healthy</option>
              <option value="monitoring">Monitoring (Needs Care)</option>
              <option value="sick">Sick (Requires Treatment)</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default MyFish;
