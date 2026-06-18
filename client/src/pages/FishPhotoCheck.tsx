import React, { useState } from 'react';
import { Camera, AlertTriangle, RefreshCw, Upload, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useToast } from '../components/common/Toast';

export const FishPhotoCheck: React.FC = () => {
  const { showToast } = useToast();
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Form parameters
  const [species, setSpecies] = useState('Betta Splendens');
  const [symptoms, setSymptoms] = useState('');
  const [behaviour, setBehaviour] = useState('');
  const [duration, setDuration] = useState('2 days');
  const [pH, setPH] = useState('6.8');
  const [ammonia, setAmmonia] = useState('0');

  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<any | null>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setImagePreview(URL.createObjectURL(file));
      showToast('Image uploaded successfully!', 'success');
    }
  };

  const handleUploadMock = () => {
    // Set a mock image URL
    setImagePreview('https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=400');
    showToast('Mock sample fish picture loaded!', 'info');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePreview) {
      showToast('Please upload or load a fish photograph first.', 'error');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setReport({
        timestamp: new Date().toLocaleString(),
        suspectedCondition: 'Fungal Fin Rot (Saprolegniasis)',
        confidence: '84%',
        analysis: 'Visual models detected slight fraying and white fuzzy growths at the tail fin margins. Often triggered by stress or minor tissue damage.',
        recommendations: [
          'Perform a 25% water change to lower biological debris.',
          'Add aquarium salt (1 tablespoon per 5 gallons) if compatible with tank mates.',
          'Consider quarantine tank treatment using specialized antifungal dosing if deterioration persists.'
        ]
      });
      showToast('Visual analysis report generated!', 'success');
    }, 1500);
  };

  return (
    <div className="space-y-6 select-none max-w-4xl mx-auto animate-slide-in">
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Camera size={20} className="text-sky-400" />
          Fish Photo Check & Diagnostics
        </h1>
        <p className="text-xs text-slate-400">Upload high-resolution close-ups to check for visual symptoms and pathogens.</p>
      </div>

      {/* Vet Disclaimer Notice */}
      <div className="p-4 bg-rose-950/20 border border-rose-500/15 rounded-2xl flex gap-3 text-xs text-rose-300 leading-relaxed items-start">
        <ShieldAlert size={20} className="shrink-0 mt-0.5" />
        <div>
          <strong>Veterinary Safety Notice:</strong> Photo analysis results are generated using AI pattern matching to provide <strong>possible causes</strong> only. This is not a confirmed veterinary diagnosis. If your fish is severely sick or suffering, consult a certified aquatic veterinarian immediately.
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="space-y-4" aria-label="Visual diagnostics input form">
          {/* Drag zone */}
          <div 
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer min-h-60 transition-all ${
              dragActive 
                ? 'border-sky-500 bg-sky-950/20' 
                : imagePreview 
                ? 'border-slate-800 bg-slate-900/10' 
                : 'border-slate-800 hover:border-slate-700 bg-slate-900/30'
            }`}
          >
            {imagePreview ? (
              <div className="space-y-4">
                <img 
                  src={imagePreview} 
                  alt="Fish Preview" 
                  className="max-h-40 rounded-xl object-cover border border-slate-800 mx-auto"
                />
                <div className="flex gap-2 justify-center">
                  <button 
                    type="button" 
                    onClick={() => setImagePreview(null)}
                    className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 hover:bg-slate-800 text-[10px] text-slate-400 font-semibold"
                  >
                    Clear Image
                  </button>
                  <button 
                    type="button" 
                    onClick={handleUploadMock}
                    className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 hover:bg-slate-800 text-[10px] text-sky-400 font-semibold"
                  >
                    Reset Sample
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full border border-dashed border-slate-700 flex items-center justify-center text-slate-500 mx-auto">
                  <Upload size={18} />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-200 block">Drag & drop fish image here</span>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Supports JPEG, PNG up to 5MB</span>
                </div>
                <button
                  type="button"
                  onClick={handleUploadMock}
                  className="px-3 py-1.5 bg-slate-950 border border-slate-800 hover:bg-slate-800 rounded-xl text-[10px] font-semibold text-slate-400"
                >
                  Load Mock Fish Image
                </button>
              </div>
            )}
          </div>

          {/* Parameters */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="ph-sp" className="text-xs font-semibold text-slate-300">Fish Species</label>
                <input 
                  id="ph-sp"
                  type="text" 
                  value={species} 
                  onChange={e => setSpecies(e.target.value)}
                  className="glass-input text-xs px-3 py-2 rounded-xl"
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="ph-dur" className="text-xs font-semibold text-slate-300">Symptom Duration</label>
                <input 
                  id="ph-dur"
                  type="text" 
                  value={duration} 
                  onChange={e => setDuration(e.target.value)}
                  className="glass-input text-xs px-3 py-2 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="ph-ph" className="text-xs font-semibold text-slate-300">Water pH</label>
                <input 
                  id="ph-ph"
                  type="number" 
                  step="0.1"
                  value={pH} 
                  onChange={e => setPH(e.target.value)}
                  className="glass-input text-xs px-3 py-2 rounded-xl"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="ph-amm" className="text-xs font-semibold text-slate-300">Ammonia (ppm)</label>
                <input 
                  id="ph-amm"
                  type="number" 
                  step="0.01"
                  value={ammonia} 
                  onChange={e => setAmmonia(e.target.value)}
                  className="glass-input text-xs px-3 py-2 rounded-xl"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="ph-symp" className="text-xs font-semibold text-slate-300">Visual Symptoms</label>
              <input 
                id="ph-symp"
                type="text" 
                value={symptoms} 
                onChange={e => setSymptoms(e.target.value)}
                className="glass-input text-xs px-3 py-2 rounded-xl"
                placeholder="e.g. white spots, ragged fins, red streaks"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="ph-beh" className="text-xs font-semibold text-slate-300">Behavioral Signs</label>
              <input 
                id="ph-beh"
                type="text" 
                value={behaviour} 
                onChange={e => setBehaviour(e.target.value)}
                className="glass-input text-xs px-3 py-2 rounded-xl"
                placeholder="e.g. rubbing on rocks, gasping at surface, lethargy"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 text-xs font-bold text-white rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  Running Visual Scans...
                </>
              ) : (
                'Run Visual Diagnosis'
              )}
            </button>
          </div>
        </form>

        {/* Diagnostic Reports panel */}
        <div className="space-y-4">
          {report ? (
            <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 animate-slide-in">
              <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                <span className="text-[10px] uppercase font-bold text-slate-500">Scan Report</span>
                <span className="text-[10px] text-slate-500">{report.timestamp}</span>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] uppercase font-bold text-slate-500">Suspected Condition</span>
                <div className="text-sm font-bold text-slate-200">{report.suspectedCondition}</div>
                <div className="text-[10px] text-teal-400 font-medium">Confidence Score: {report.confidence}</div>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] uppercase font-bold text-slate-500">Visual Assessment</span>
                <p className="text-xs text-slate-300 leading-relaxed">{report.analysis}</p>
              </div>

              <div className="space-y-2">
                <span className="text-[9px] uppercase font-bold text-slate-500 block">Suggested Interventions</span>
                <ul className="space-y-1.5">
                  {report.recommendations.map((rec: string, idx: number) => (
                    <li key={idx} className="flex gap-2 text-xs text-slate-300 leading-normal">
                      <CheckCircle2 size={14} className="text-sky-400 shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="h-full border border-dashed border-slate-800 bg-slate-900/10 rounded-2xl flex flex-col items-center justify-center p-6 text-center text-slate-500 gap-2">
              <Camera size={28} />
              <div className="text-xs">No analysis run yet. Fill form and click Run.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default FishPhotoCheck;
