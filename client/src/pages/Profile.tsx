import React, { useState } from 'react';
import { useUserMode } from '../contexts/UserModeContext';
import { User, Mail, Shield, Save } from 'lucide-react';
import { useToast } from '../components/common/Toast';

export const Profile: React.FC = () => {
  const { user } = useUserMode();
  const { showToast } = useToast();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Profile settings saved! (Developer Mode)', 'success');
  };

  return (
    <div className="space-y-6 select-none max-w-xl animate-slide-in">
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <User size={20} className="text-sky-400" />
          My Profile Settings
        </h1>
        <p className="text-xs text-slate-400">Update personal account details and review permissions.</p>
      </div>

      <form onSubmit={handleSave} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4 shadow-xl">
        <div className="flex items-center gap-4 border-b border-slate-850 pb-4 mb-2">
          <img 
            src={user.avatarUrl} 
            alt={user.name} 
            className="w-16 h-16 rounded-full object-cover border-2 border-sky-500/20"
          />
          <div>
            <h2 className="text-sm font-bold text-slate-200">{name}</h2>
            <p className="text-[10px] text-slate-500">{user.role}</p>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="prof-name" className="text-xs font-semibold text-slate-350">Display Name</label>
          <input 
            id="prof-name"
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)}
            className="glass-input text-xs px-3.5 py-2.5 rounded-xl"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="prof-email" className="text-xs font-semibold text-slate-350">Email Address</label>
          <input 
            id="prof-email"
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)}
            className="glass-input text-xs px-3.5 py-2.5 rounded-xl"
            required
          />
        </div>

        <div className="flex items-center gap-2 text-[10px] text-slate-500 pt-1">
          <Shield size={14} />
          <span>Dev User Role Permissions active (Step 1).</span>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-sky-600 hover:bg-sky-500 text-xs font-bold text-white rounded-xl transition-colors shadow-lg shadow-sky-900/10"
        >
          <Save size={14} />
          Save Changes
        </button>
      </form>
    </div>
  );
};
export default Profile;
