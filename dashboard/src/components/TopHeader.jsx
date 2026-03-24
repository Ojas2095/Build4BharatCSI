import { Bell, Search } from 'lucide-react';
import toast from 'react-hot-toast';

const TopHeader = () => {
  return (
    <header className="h-[72px] flex items-center justify-between px-6 sticky top-0 z-50 border-b border-pmddky-bright shadow-lg"
            style={{ background: 'linear-gradient(90deg, #0d3320 0%, #1a5c38 50%, #0d3320 100%)' }}>
      
      {/* Search Bar */}
      <div className="flex-1 flex items-center gap-4 hidden md:flex">
        <div className="flex items-center max-w-md w-full bg-white/10 px-4 py-2 rounded-lg border border-white/20 focus-within:ring-2 focus-within:ring-pmddky-accent transition-all">
          <Search className="w-4 h-4 text-gray-300 mr-3" />
          <input 
            type="text" 
            placeholder="Search districts, beneficiaries..." 
            className="bg-transparent border-none outline-none text-sm w-full text-white placeholder-gray-300"
            onKeyDown={(e) => { if (e.key === 'Enter') toast('Search functionality requires Elasticsearch Backend (Demo Mode)'); }}
          />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-5 ml-auto">
        <div className="hidden lg:flex items-center gap-3 text-white text-xs font-bold tracking-widest mr-4">
          <span className="text-gray-300">TECHNICAL PARTNER</span>
          <span className="bg-white/10 px-3 py-1 rounded border border-white/20 shadow-sm flex items-center gap-1">D<span className="text-blue-400">❖</span>LL</span>
        </div>

        <button onClick={() => toast.success('You have no new alerts.')} className="cursor-pointer relative p-2 text-white hover:bg-white/10 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-pmddky-mid"></span>
        </button>
        <div className="w-px h-8 bg-white/20 mx-1"></div>
        <button onClick={() => toast('Profile details pane (Demo Mode)')} className="flex items-center gap-3 hover:bg-white/10 p-2 rounded-lg transition-colors cursor-pointer">
          <div className="hidden md:block text-right">
            <p className="text-sm font-bold text-white leading-none tracking-wide">Kishta Coders</p>
            <p className="text-xs text-pmddky-accent mt-1 tracking-wider uppercase">Nodal Officer</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-pmddky-dark flex items-center justify-center text-pmddky-accent font-black border-2 border-pmddky-accent shadow-[0_0_10px_rgba(0,201,122,0.3)]">
            KC
          </div>
        </button>
      </div>
    </header>
  );
};

export default TopHeader;
