import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Droplet, 
  Fish, 
  Activity, 
  Calendar, 
  Sparkles, 
  Camera, 
  Store, 
  Bell, 
  Settings, 
  User, 
  Info, 
  LogOut,
  X,
  Fish as LogoIcon
} from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/guide', label: 'Beginner Guide', icon: BookOpen },
    { to: '/aquariums', label: 'My Aquariums', icon: Droplet },
    { to: '/fish', label: 'My Fish', icon: Fish },
    { to: '/water-quality', label: 'Water Quality', icon: Activity },
    { to: '/maintenance', label: 'Maintenance', icon: Calendar },
    { to: '/ai-assistant', label: 'AI Assistant', icon: Sparkles },
    { to: '/photo-check', label: 'Fish Photo Check', icon: Camera },
    { to: '/pet-store', label: 'Pet Store Pro', icon: Store },
    { to: '/alerts', label: 'System Alerts', icon: Bell },
    { to: '/profile', label: 'Profile', icon: User },
    { to: '/settings', label: 'Settings', icon: Settings },
    { to: '/about', label: 'About', icon: Info },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative flex flex-col w-72 max-w-xs bg-slate-950 border-r border-slate-800 p-5 shadow-2xl h-full animate-slide-in select-none z-10 justify-between">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-base">
              <LogoIcon size={18} />
              <span>AquaKeeper</span>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-900 transition-colors"
              aria-label="Close navigation"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                    isActive
                      ? 'text-sky-400 bg-sky-950/40 border border-sky-500/15'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border border-transparent'
                  }`
                }
              >
                <item.icon size={16} />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800">
          <NavLink
            to="/"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 transition-all"
          >
            <LogOut size={16} />
            Sign Out (Home)
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default MobileNav;
