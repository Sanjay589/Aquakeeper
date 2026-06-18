import React from 'react';
import { Link } from 'react-router-dom';
import { Fish, HelpCircle, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-rose-500/5 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-md">
        <div className="p-4 bg-rose-950/20 border border-rose-500/20 rounded-full text-rose-500 animate-bounce">
          <HelpCircle size={48} />
        </div>
        
        <h1 className="text-4xl font-extrabold tracking-tight">404</h1>
        
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-slate-200">Lost at Sea?</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            The page you are looking for has floated away or was swallowed by a shark. Let's get you back to familiar waters.
          </p>
        </div>

        <div className="flex gap-4 w-full">
          <Link
            to="/"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-800 bg-slate-900 hover:bg-slate-800 font-semibold rounded-xl text-xs transition-colors"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <Link
            to="/dashboard"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg shadow-sky-500/10"
          >
            <Fish size={14} /> Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
