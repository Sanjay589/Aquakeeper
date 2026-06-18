import React, { useState } from 'react';
import { mockBeginnerGuides } from '../utils/mockData';
import { BookOpen, BookCheck, HelpCircle, Check, Info } from 'lucide-react';
import { useToast } from '../components/common/Toast';

export const BeginnerGuide: React.FC = () => {
  const { showToast } = useToast();
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const toggleStep = (guideId: string, stepIdx: number) => {
    const key = `${guideId}-${stepIdx}`;
    setCompletedSteps(prev => {
      const next = { ...prev, [key]: !prev[key] };
      if (next[key]) {
        showToast('Step marked as completed!', 'success');
      }
      return next;
    });
  };

  return (
    <div className="space-y-6 select-none max-w-4xl animate-slide-in">
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <BookOpen size={20} className="text-sky-400" />
          Beginner Aquarium Setup Guide
        </h1>
        <p className="text-xs text-slate-400">Step-by-step instructions to successfully cycle and stock your first aquarium.</p>
      </div>

      {/* Intro info box */}
      <div className="p-4 bg-sky-950/20 border border-sky-500/10 rounded-2xl flex gap-3 text-xs text-sky-300 leading-relaxed items-start">
        <Info size={18} className="shrink-0 mt-0.5" />
        <div>
          <strong>Why is the setup phase critical?</strong> A newly set up aquarium does not have the biological filtration needed to process fish waste. In the first few weeks, toxic levels of ammonia will build up unless you cycle your tank properly. Cycling means establishing helpful bacteria that process waste naturally.
        </div>
      </div>

      <div className="space-y-6">
        {mockBeginnerGuides.map(guide => (
          <div key={guide.id} className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-850 pb-3">
              <div>
                <h3 className="font-bold text-slate-200 text-sm">{guide.title}</h3>
                <p className="text-[11px] text-slate-400 mt-1">{guide.summary}</p>
              </div>
              <div className="flex gap-2 text-[10px] font-semibold text-slate-400">
                <span className="px-2 py-0.5 rounded-full bg-slate-800">{guide.difficulty}</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-800">{guide.readTime} read</span>
              </div>
            </div>

            {/* Steps checklist */}
            <div className="space-y-2.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">Actions Required</span>
              {guide.steps.map((step, idx) => {
                const isDone = !!completedSteps[`${guide.id}-${idx}`];
                return (
                  <div 
                    key={idx} 
                    onClick={() => toggleStep(guide.id, idx)}
                    className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                      isDone 
                        ? 'bg-slate-950/50 border-sky-500/20 text-slate-400' 
                        : 'bg-slate-900 border-slate-800/80 text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isDone ? 'bg-sky-600 border-sky-500 text-slate-950' : 'border-slate-700 bg-slate-950'
                    }`}>
                      {isDone && <Check size={12} strokeWidth={3} />}
                    </div>
                    <span className="text-xs leading-relaxed">{step}</span>
                  </div>
                );
              })}
            </div>

            {/* Tip box */}
            <div className="p-3 bg-amber-950/20 border border-amber-500/10 rounded-xl flex gap-2.5 text-xs text-amber-300 items-start">
              <HelpCircle size={16} className="shrink-0 mt-0.5" />
              <p>
                <strong>AquaKeeper Pro Tip:</strong> {guide.tips}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BeginnerGuide;
