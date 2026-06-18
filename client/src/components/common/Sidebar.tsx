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
  LogOut 
} from 'lucide-react';

export const Sidebar: React.FC = () => {
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

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-slate-800 bg-slate-950/60 p-4 shrink-0 justify-between">
      <div className="space-y-6">
        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 pl-3">
          Aquarium Hub
        </span>
        <nav className="space-y-1" aria-label="Desktop navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
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

      <div className="pt-4 border-t border-slate-800">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border border-transparent transition-all"
        >
          <LogOut size={16} />
          Sign Out (Home)
        </NavLink>
      </div>
    </aside>
  );
};
export default Sidebar;
