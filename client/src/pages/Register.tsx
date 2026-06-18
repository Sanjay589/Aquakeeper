import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Fish, Shield, ArrowRight } from 'lucide-react';
import { useToast } from '../components/common/Toast';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      showToast('All fields are required.', 'error');
      return;
    }
    showToast('Account registered successfully (Developer Mode)!', 'success');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 select-none relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-teal-500/5 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="w-full max-w-sm relative z-10 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <Link to="/" className="flex items-center gap-2 text-sky-400 font-extrabold text-2xl mb-1">
            <Fish size={28} className="animate-pulse" />
            <span>AquaKeeper</span>
          </Link>
          <h2 className="text-xl font-bold text-slate-100">Create Account</h2>
          <p className="text-xs text-slate-400">Join AquaKeeper to monitor your aquatic systems</p>
        </div>

        <form 
          onSubmit={handleSubmit} 
          className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col gap-4 shadow-xl"
          aria-label="Register form"
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-xs font-semibold text-slate-300">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="glass-input text-xs px-3.5 py-2.5 rounded-xl"
              placeholder="Alex Mercer"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-semibold text-slate-300">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-input text-xs px-3.5 py-2.5 rounded-xl"
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-xs font-semibold text-slate-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input text-xs px-3.5 py-2.5 rounded-xl"
              placeholder="Min. 8 characters"
              required
            />
          </div>

          <div className="p-3 bg-teal-950/20 border border-teal-500/10 rounded-xl flex gap-2 text-[10px] text-teal-300 items-start">
            <Shield size={14} className="shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Pre-auth active:</strong> Step 1 will auto-login your account.
            </p>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 mt-2 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg shadow-sky-500/10 group"
          >
            Create Free Account
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-sky-400 hover:text-sky-300 font-semibold transition-colors">
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Register;
