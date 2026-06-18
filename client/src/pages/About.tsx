import React from 'react';
import { Link } from 'react-router-dom';
import { Fish, Mail, Heart, Github } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between select-none">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto w-full px-6 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-sky-400 font-extrabold text-xl">
          <Fish size={24} className="animate-pulse" />
          <span className="bg-gradient-to-r from-sky-400 to-teal-400 bg-clip-text text-transparent">
            AquaKeeper
          </span>
        </Link>
        <Link to="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
          Sign In
        </Link>
      </nav>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center gap-8">
        <h1 className="text-3xl font-extrabold tracking-tight">About AquaKeeper</h1>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          AquaKeeper was born out of a desire to make aquarium care accessible, organized, and scientifically sound. For beginners, a new aquarium can be daunting—navigating pH values, cycling biology, and species compatibilities. For experienced owners, managing schedules and parameters across multiple tanks can become challenging.
        </p>

        <p className="text-sm text-slate-300 leading-relaxed">
          Our platform combines modern logging utilities with artificial intelligence features to check water parameters, coordinate feeding logs, diagnose fish anomalies via image models, and simplify store catalogs.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mt-4">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col gap-2">
            <h2 className="font-bold text-slate-200">Our Mission</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Help fish keepers establish thriving tanks using natural language feedback and prevent preventable loss.
            </p>
          </div>
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col gap-2">
            <h2 className="font-bold text-slate-200">Our Architecture</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Built on React, TypeScript, Express, and Tailwind CSS. Designed to run offline or connect to modern cloud models.
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-6 border-t border-slate-900 pt-8">
          <a href="mailto:support@aquakeeper.com" className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 transition-colors">
            <Mail size={16} /> Contact Support
          </a>
          <span className="text-slate-800">|</span>
          <a href="#" className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 transition-colors">
            <Github size={16} /> GitHub Repository
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-slate-500 bg-slate-950 border-t border-slate-900">
        <p className="flex items-center justify-center gap-1">
          Made with <Heart size={12} className="text-rose-500 fill-rose-500" /> by the AquaKeeper Team.
        </p>
      </footer>
    </div>
  );
};
export default About;
