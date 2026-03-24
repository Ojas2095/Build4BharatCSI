import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Map, Users, BarChart3, Settings, Network } from 'lucide-react';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { label: 'GIS Map', icon: Map, path: '/map' },
    { label: 'Beneficiaries', icon: Users, path: '/beneficiaries' },
    { label: 'Analytics & AI', icon: BarChart3, path: '/analytics' },
    { label: 'Audit Ledger', icon: Network, path: '/audit' },
  ];

  return (
    <aside className="w-64 flex-col h-full shadow-[4px_0_24px_rgba(0,0,0,0.5)] z-40 hidden md:flex border-r border-pmddky-bright/30"
           style={{ background: 'linear-gradient(180deg, #062012 0%, #0d3d22 100%)' }}>
      
      {/* Brand Header */}
      <div className="h-[72px] flex flex-col justify-center px-6 border-b border-pmddky-bright/50 shrink-0 bg-black/20">
        <h1 className="text-2xl font-black text-white tracking-widest leading-none flex items-center gap-2">
          BUILD4<span className="font-serif">भारत</span>
        </h1>
        <p className="text-[9px] text-pmddky-accent tracking-[2px] mt-1 font-bold uppercase">Hackathon 9.0</p>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        <p className="text-[10px] text-white/40 tracking-[2px] font-bold uppercase mb-4 px-2">Main Menu</p>
        
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all duration-300 border ${
                  isActive 
                    ? 'bg-pmddky-bright/40 text-white border-pmddky-accent shadow-[inset_4px_0_0_0_#00c97a]' 
                    : 'text-gray-300 border-transparent hover:bg-white/5 hover:text-white hover:border-white/10'
                }`
              }
            >
              <Icon className={`w-5 h-5 ${item.path === '/' ? 'text-pmddky-accent' : ''}`} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-5 border-t border-pmddky-bright/30 bg-black/10">
        <div className="flex items-center gap-3 mb-4 opacity-70">
          <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-pmddky-accent to-pmddky-dark text-white font-black text-xs clip-hex">
            H
          </div>
          <div>
            <p className="text-[10px] text-white/50 tracking-widest font-bold">PM-DDKY</p>
            <p className="text-xs text-white font-bold">Smart Governance</p>
          </div>
        </div>
        <button onClick={() => toast.error('System Config Panel Locked (Demo Mode)')} className="cursor-pointer flex items-center justify-center gap-2 py-2.5 w-full rounded-md bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors">
          <Settings className="w-4 h-4" />
          SYSTEM CONFIG
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
