import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockAquariums, mockFish, mockWaterReadings } from '../utils/mockData';
import { Droplet, ArrowLeft, Heart, Calendar, Plus, Fish as FishIcon, Activity, ListFilter, Trash } from 'lucide-react';
import { useToast } from '../components/common/Toast';
import { Modal } from '../components/common/Modal';

export const AquariumDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const aquarium = mockAquariums.find(a => a.id === id) || mockAquariums[0];
  const [activeTab, setActiveTab] = useState<'overview' | 'fish' | 'readings'>('overview');
  const [showAddFish, setShowAddFish] = useState(false);
  const [fishList, setFishList] = useState(mockFish.filter(f => f.aquariumId === aquarium.id));
  
  // New fish form
  const [fishName, setFishName] = useState('');
  const [fishSpecies, setFishSpecies] = useState('');

  const handleAddFish = () => {
    if (!fishName.trim() || !fishSpecies.trim()) {
      showToast('Please fill out all fields.', 'error');
      return;
    }
    const newFish = {
      id: `fish-${Date.now()}`,
      aquariumId: aquarium.id,
      name: fishName,
      species: fishSpecies,
      age: 1,
      ageUnit: 'months' as const,
      addedDate: new Date().toISOString().split('T')[0],
      status: 'healthy' as const,
      lastFed: 'Just now',
    };
    setFishList([...fishList, newFish]);
    showToast(`Fish "${fishName}" added to the tank!`, 'success');
    setFishName('');
    setFishSpecies('');
    setShowAddFish(false);
  };

  const handleDeleteFish = (fishId: string, name: string) => {
    setFishList(prev => prev.filter(f => f.id !== fishId));
    showToast(`Removed "${name}" from tank database.`, 'info');
  };

  const readings = mockWaterReadings.filter(r => r.aquariumId === aquarium.id);

  return (
    <div className="space-y-6 select-none animate-slide-in">
      {/* Back button */}
      <button 
        onClick={() => navigate('/aquariums')}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
      >
        <ArrowLeft size={14} /> Back to Aquariums
      </button>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-slate-100">{aquarium.name}</h1>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              aquarium.healthScore >= 90 ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20' : 'bg-amber-950/40 text-amber-400 border border-amber-500/20'
            }`}>
              Health: {aquarium.healthScore}%
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 capitalize">{aquarium.type} System • {aquarium.volume} {aquarium.volumeUnit}</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowAddFish(true)}
            className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-xs font-bold text-white rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Plus size={14} /> Add Fish Inhabitant
          </button>
        </div>
      </div>

      {/* Tab controls */}
      <div className="flex border-b border-slate-800 gap-6 text-xs font-bold text-slate-400">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-2 transition-colors relative ${activeTab === 'overview' ? 'text-sky-400' : 'hover:text-slate-200'}`}
        >
          Overview Parameters
          {activeTab === 'overview' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400" />}
        </button>
        <button
          onClick={() => setActiveTab('fish')}
          className={`pb-2 transition-colors relative ${activeTab === 'fish' ? 'text-sky-400' : 'hover:text-slate-200'}`}
        >
          Fish Stock ({fishList.length})
          {activeTab === 'fish' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400" />}
        </button>
        <button
          onClick={() => setActiveTab('readings')}
          className={`pb-2 transition-colors relative ${activeTab === 'readings' ? 'text-sky-400' : 'hover:text-slate-200'}`}
        >
          Water Quality Readings ({readings.length})
          {activeTab === 'readings' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400" />}
        </button>
      </div>

      {/* Tab content */}
      <div className="pt-2">
        {activeTab === 'overview' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-2">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Temperature Range</span>
              <div className="text-lg font-bold text-slate-200">{aquarium.temperature}°F</div>
              <p className="text-[10px] text-emerald-400 font-medium">Optimal thermal stability registered.</p>
            </div>
            <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-2">
              <span className="text-[10px] text-slate-500 font-bold uppercase">pH level</span>
              <div className="text-lg font-bold text-slate-200">{aquarium.pH}</div>
              <p className="text-[10px] text-slate-400 leading-normal">
                {aquarium.type === 'saltwater' 
                  ? 'Reef buffers are active and holding pH steady.' 
                  : 'Acidic profile fits soft freshwater flora needs.'}
              </p>
            </div>
            <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-2">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Setup Date</span>
              <div className="text-lg font-bold text-slate-200">{aquarium.createdDate}</div>
              <p className="text-[10px] text-slate-500">System established and fully cycled.</p>
            </div>
          </div>
        )}

        {activeTab === 'fish' && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {fishList.map(fish => (
                <div key={fish.id} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-slate-200 text-xs">{fish.name}</h3>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase ${
                        fish.status === 'healthy' 
                          ? 'bg-emerald-950/40 text-emerald-400' 
                          : fish.status === 'monitoring' 
                          ? 'bg-amber-950/40 text-amber-400' 
                          : 'bg-rose-950/40 text-rose-400'
                      }`}>
                        {fish.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 italic">{fish.species}</p>
                    <div className="text-[10px] text-slate-500 pt-1">
                      Age: {fish.age} {fish.ageUnit} • Added: {fish.addedDate}
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-850 pt-2 text-[10px] text-slate-400">
                    <span>Last fed: {fish.lastFed}</span>
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
              {fishList.length === 0 && (
                <div className="sm:col-span-2 lg:col-span-3 text-center py-12 bg-slate-900/10 border border-dashed border-slate-800 rounded-2xl text-slate-500 text-xs">
                  No fish added to this tank yet. Click Add Fish above.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'readings' && (
          <div className="bg-slate-900/30 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/40 text-slate-400 border-b border-slate-800 font-semibold">
                    <th className="p-3">Logged Date</th>
                    <th className="p-3">pH</th>
                    <th className="p-3">Temp</th>
                    <th className="p-3">Ammonia (NH3)</th>
                    <th className="p-3">Nitrate (NO3)</th>
                    <th className="p-3">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {readings.map(r => (
                    <tr key={r.id} className="hover:bg-slate-900/50">
                      <td className="p-3 font-semibold text-slate-200">
                        {new Date(r.timestamp).toLocaleDateString()}
                      </td>
                      <td className="p-3 text-slate-350">{r.pH}</td>
                      <td className="p-3 text-slate-350">{r.temperature}°{r.tempUnit}</td>
                      <td className="p-3">
                        <span className={`font-semibold ${r.ammonia > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {r.ammonia} ppm
                        </span>
                      </td>
                      <td className="p-3 text-slate-350">{r.nitrate} ppm</td>
                      <td className="p-3 text-slate-400 italic max-w-xs truncate">{r.notes || '—'}</td>
                    </tr>
                  ))}
                  {readings.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-slate-500 italic">No parameter logs found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add Fish Modal */}
      <Modal
        isOpen={showAddFish}
        onClose={() => setShowAddFish(false)}
        title="Add Fish Inhabitant"
        confirmText="Add Inhabitant"
        onConfirm={handleAddFish}
      >
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="fish-name" className="text-xs font-semibold text-slate-300">Inhabitant Pet Name</label>
            <input 
              id="fish-name"
              type="text" 
              value={fishName} 
              onChange={e => setFishName(e.target.value)}
              className="glass-input text-xs px-3 py-2 rounded-xl"
              placeholder="e.g. Bubbles"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="fish-spec" className="text-xs font-semibold text-slate-300">Species Scientific or Common Name</label>
            <input 
              id="fish-spec"
              type="text" 
              value={fishSpecies} 
              onChange={e => setFishSpecies(e.target.value)}
              className="glass-input text-xs px-3 py-2 rounded-xl"
              placeholder="e.g. Neon Tetra (Paracheirodon innesi)"
              required
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default AquariumDetails;
