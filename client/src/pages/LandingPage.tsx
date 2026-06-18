import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Fish, 
  Sparkles, 
  Camera, 
  ShieldAlert, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  LayoutDashboard, 
  Store 
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-sky-500 selection:text-white overflow-hidden">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between relative z-10" aria-label="Landing page navigation">
        <div className="flex items-center gap-2 text-sky-400 font-extrabold text-xl">
          <Fish size={24} className="animate-pulse text-sky-400" />
          <span className="bg-gradient-to-r from-sky-400 to-teal-400 bg-clip-text text-transparent">
            AquaKeeper
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/about" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
            About
          </Link>
          <Link to="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
            Log In
          </Link>
          <Link 
            to="/dashboard" 
            className="px-4 py-2 text-xs font-semibold bg-sky-600 hover:bg-sky-500 rounded-xl transition-all shadow-lg shadow-sky-900/30"
          >
            Launch App
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative max-w-7xl mx-auto px-6 pt-16 pb-24 text-center z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/20 bg-sky-950/30 text-xs font-semibold text-sky-400 mb-6 backdrop-blur-md">
          <Sparkles size={14} />
          AI-Powered Aquarium Care & Pet Store Intelligence
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl mx-auto leading-[1.15] mb-6">
          Keep your aquatic environments{' '}
          <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
            thriving and healthy
          </span>
        </h1>
        
        <p className="text-base md:text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
          AquaKeeper connects smart water-quality tracking, AI care guides, and pet-store inventory metrics into a single unified platform.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/register"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl transition-all shadow-xl shadow-sky-500/20 group"
          >
            Get Started Free
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/dashboard"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-slate-800 bg-slate-900/50 hover:bg-slate-800 font-bold rounded-xl transition-all"
          >
            Explore Dashboard
          </Link>
        </div>
      </header>

      {/* Main Benefits */}
      <section className="py-20 border-t border-slate-900 relative z-10" aria-label="AquaKeeper Features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4">Why use AquaKeeper?</h2>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              Automated reminders, smart guides, and diagnostic photography help eliminate guess work from fish keeping.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-900/30 border border-slate-800/80 rounded-2xl flex flex-col gap-3">
              <div className="p-3 bg-sky-500/10 text-sky-400 rounded-xl w-fit">
                <BookOpen size={20} />
              </div>
              <h3 className="font-bold text-slate-100">Step-by-Step Cycling Guides</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Establish correct biology inside your tank without water chemistry spikes. Safe and educational.
              </p>
            </div>

            <div className="p-6 bg-slate-900/30 border border-slate-800/80 rounded-2xl flex flex-col gap-3">
              <div className="p-3 bg-teal-500/10 text-teal-400 rounded-xl w-fit">
                <ShieldAlert size={20} />
              </div>
              <h3 className="font-bold text-slate-100">Intelligent Reminders</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Never miss water chemistry test dates, filter adjustments, or nutritional feeding schedules.
              </p>
            </div>

            <div className="p-6 bg-slate-900/30 border border-slate-800/80 rounded-2xl flex flex-col gap-3">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl w-fit">
                <Store size={20} />
              </div>
              <h3 className="font-bold text-slate-100">Pet Store Inventory</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Manage stock statuses, check low-stock thresholds, and track species lists for retail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Target User Modes */}
      <section className="py-20 bg-slate-900/10 border-t border-slate-900" aria-label="Designed for everyone">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4">Tailored for your experience</h2>
            <p className="text-sm text-slate-400">Select three customizable presets that update dashboard layouts.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl relative">
              <span className="absolute top-4 right-4 text-[10px] font-bold text-sky-400 uppercase tracking-widest bg-sky-950/50 px-2 py-0.5 rounded-full">
                Beginner
              </span>
              <h3 className="text-lg font-bold text-slate-100 mb-3">Beginners</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Receive natural language advice that decodes numbers (e.g. explain what "pH 6.8" means) with step-by-step cycle guides.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-sky-400" /> Natural language advice
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-sky-400" /> Cycle setup checklists
                </li>
              </ul>
            </div>

            <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl relative">
              <span className="absolute top-4 right-4 text-[10px] font-bold text-teal-400 uppercase tracking-widest bg-teal-950/50 px-2 py-0.5 rounded-full">
                Owner
              </span>
              <h3 className="text-lg font-bold text-slate-100 mb-3">Aquarium Owners</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Log detailed parameters, follow water chemistry charts, manage species compatibility databases, and set schedules.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-teal-400" /> Detail water parameter logging
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-teal-400" /> Multi-tank configuration logs
                </li>
              </ul>
            </div>

            <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl relative">
              <span className="absolute top-4 right-4 text-[10px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/50 px-2 py-0.5 rounded-full">
                Professional
              </span>
              <h3 className="text-lg font-bold text-slate-100 mb-3">Pet Store Managers</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Track full retail items, alert on stock counts, maintain quarantine logs, and list aquatic inventory.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400" /> Retail catalog sheets
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-400" /> Low stock alert hooks
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Previews */}
      <section className="py-20 border-t border-slate-900" aria-label="AI Features Preview">
        <div className="max-w-7xl mx-auto px-6 space-y-24">
          {/* AI Assistant */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400">
                <Sparkles size={20} />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold">AI-Powered Care Assistant</h2>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                Connect your tanks directly to the assistant. Ask specialized care prompts like "Is this heater large enough for my Angelfish?" or check water-parameter history logs instantly.
              </p>
              <Link to="/login" className="inline-flex items-center gap-2 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors">
                Try the chat preview <ArrowRight size={14} />
              </Link>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl flex flex-col gap-3 font-mono text-left">
              <div className="text-[10px] text-slate-500 border-b border-slate-800 pb-2">AquaKeeper Assistant Preview</div>
              <div className="text-xs p-2.5 rounded-lg bg-slate-950/60 text-sky-400">
                "Hi, I noticed your bedside nano tank temperature dropped below 74°F. Bettas prefer 76-80°F. Would you like setup tips?"
              </div>
              <div className="text-xs p-2.5 rounded-lg bg-slate-800/50 text-slate-300">
                "Yes, how do I adjust my heater properly?"
              </div>
            </div>
          </div>

          {/* Photo check */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center gap-4 py-8">
              <div className="w-12 h-12 rounded-full border border-dashed border-slate-700 flex items-center justify-center text-slate-400">
                <Camera size={24} />
              </div>
              <div className="text-xs text-slate-400 font-semibold">Drop fish photograph here to analyze compatibility or health</div>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-rose-950/40 text-rose-400 border border-rose-500/20">
                Veterinary disclaimer notice
              </span>
            </div>
            <div className="space-y-5 order-first md:order-last">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400">
                <Camera size={20} />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold">Fish Diagnostics & Health</h2>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                Take picture uploads and examine symptoms. Our visual analysis scans signs like fin rot, white spots (Ich), or bloating, cross referencing symptoms in seconds.
              </p>
              <Link to="/login" className="inline-flex items-center gap-2 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors">
                Try photo check <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 border-t border-slate-900 text-center relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold mb-4">Start Keeping Smart Aquariums Today</h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-8">
            Create an account in less than a minute. Free support for up to 3 individual custom aquariums.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl transition-all shadow-xl shadow-sky-500/20"
          >
            Create Your Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-10 text-center text-xs text-slate-500 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400 font-bold">
            <Fish size={16} />
            <span>AquaKeeper</span>
          </div>
          <p>© {new Date().getFullYear()} AquaKeeper. Built for thriving aquariums and retail inventories.</p>
          <div className="flex gap-4">
            <Link to="/about" className="hover:text-slate-300">About</Link>
            <a href="#" className="hover:text-slate-300">Terms</a>
            <a href="#" className="hover:text-slate-300">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default LandingPage;
