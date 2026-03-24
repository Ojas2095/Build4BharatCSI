import { useState, useEffect } from 'react';
import { Users, MapPin, IndianRupee, Activity, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet';
import io from 'socket.io-client';
import 'leaflet/dist/leaflet.css';

const SOCKET_URL = 'http://localhost:5000';
const socket = io(SOCKET_URL);

const dataProcess = [
  { month: 'Jan', dist: 450, funds: 400 },
  { month: 'Feb', dist: 520, funds: 450 },
  { month: 'Mar', dist: 610, funds: 520 },
  { month: 'Apr', dist: 780, funds: 650 },
  { month: 'May', dist: 890, funds: 710 },
  { month: 'Jun', dist: 950, funds: 820 },
];

const distData = [
  { name: 'Haridwar', val: 140 },
  { name: 'US Nagar', val: 120 },
  { name: 'Dehradun', val: 85 },
  { name: 'Nainital', val: 70 },
  { name: 'Pauri', val: 40 },
];

const pieData = [{ name: 'Disbursed', value: 65 }, { name: 'Pending', value: 25 }, { name: 'Rejected', value: 10 }];
const COLORS = ['#00c97a', '#d4a820', '#cc2222'];

const StatCard = ({ title, value, sub, icon: Icon, trend, delay, highlight }) => (
  <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.5, delay: delay}} 
       className={`bg-white/95 backdrop-blur-xl rounded-[10px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.4)] relative overflow-hidden flex flex-col justify-between border-l-[5px] border-pmddky-bright cursor-default transition-all duration-300 ${highlight ? 'ring-2 ring-pmddky-accent scale-105' : ''}`}>
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-3xl font-black text-pmddky-dark">{value}</h3>
      </div>
      <div className="p-3 rounded-xl bg-pmddky-offwhite border border-pmddky-bright/20 shadow-inner">
        <Icon className="w-6 h-6 text-pmddky-bright" />
      </div>
    </div>
    <div className="flex items-center gap-2">
      <span className="flex items-center gap-1 text-xs font-black text-pmddky-accent bg-pmddky-accent/10 px-2 py-1 rounded">
        <TrendingUp className="w-3 h-3" /> {trend}
      </span>
      <span className="text-xs font-semibold text-gray-500">{sub}</span>
    </div>
  </motion.div>
);

const ActivityFeed = ({ activities }) => (
  <div className="bg-white/95 rounded-[10px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.4)] h-full border-l-[5px] border-pmddky-gold overflow-hidden flex flex-col">
    <h3 className="text-sm font-black text-pmddky-dark uppercase tracking-wide mb-4 flex items-center justify-between shrink-0">
      Recent Activity <span className="flex h-2 w-2 bg-pmddky-accent rounded-full animate-ping"></span>
    </h3>
    <div className="space-y-4 flex-1 overflow-y-auto pr-2">
      <AnimatePresence>
        {activities.map((act) => (
          <motion.div key={act.localId} initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, height:0}} transition={{duration:0.3}} 
               className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0 hover:bg-gray-50 p-2 rounded-md transition-colors cursor-pointer">
            <div className="mt-1 shrink-0">
              {!act.isAnomaly ? <CheckCircle2 className="w-4 h-4 text-pmddky-accent" /> : <AlertCircle className="w-4 h-4 text-pmddky-gold" />}
            </div>
            <div>
              <p className="text-xs font-bold text-gray-700">{act.type}</p>
              <p className="text-[10px] text-gray-500 mt-1">
                {act.isAnomaly ? <span className="text-pmddky-gold font-bold">{act.desc}</span> : <span>District: {act.district} | Farmer ID #{act.id}</span>}
              </p>
              <p className="text-[9px] text-pmddky-bright font-bold mt-1 uppercase tracking-wider">Just Now</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      {activities.length === 0 && <p className="text-xs text-gray-400 font-bold text-center mt-10">Awaiting connection...</p>}
    </div>
  </div>
);

const MiniMap = () => (
  <div className="bg-white/95 rounded-[10px] shadow-[0_4px_24px_rgba(0,0,0,0.4)] h-full overflow-hidden relative border-l-[5px] border-pmddky-bright flex flex-col">
    <div className="p-5 flex-shrink-0 z-10 bg-white">
      <h3 className="text-sm font-black text-pmddky-dark uppercase tracking-wide">Live GIS Mini-Map</h3>
      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Uttarakhand Node</p>
    </div>
    <div className="flex-1 relative z-0 min-h-[180px]">
      <MapContainer center={[30.0668, 79.0193]} zoom={6} className="w-full h-full" zoomControl={false} dragging={false} scrollWheelZoom={false}>
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png" />
        <CircleMarker center={[29.9457, 78.1642]} radius={15} pathOptions={{fillColor:'#00c97a', color:'transparent', fillOpacity: 0.5}} />
        <CircleMarker center={[30.3165, 78.0322]} radius={8} pathOptions={{fillColor:'#1a7c45', color:'transparent', fillOpacity: 0.7}} />
        <CircleMarker center={[28.9844, 79.4005]} radius={12} pathOptions={{fillColor:'#d4a820', color:'transparent', fillOpacity: 0.5}} />
      </MapContainer>
    </div>
  </div>
);

const Dashboard = () => {
  const [kpis, setKpis] = useState({ beneficiaries: '5.8L+', funds: '₹847 Cr', progress: '76%' });
  const [activities, setActivities] = useState([
    { localId: 'init1', type: 'System Initiated', district: 'Dehradun', id: '0000', isAnomaly: false },
  ]);
  const [highlightKpi, setHighlightKpi] = useState(false);

  useEffect(() => {
    socket.on('kpi_update', (data) => {
      setKpis(data);
      setHighlightKpi(true);
      setTimeout(() => setHighlightKpi(false), 500);
    });

    socket.on('activity_update', (act) => {
      act.localId = Math.random().toString(36).substring(7);
      setActivities(prev => [act, ...prev].slice(0, 10)); // Keep last 10
    });

    return () => {
      socket.off('kpi_update');
      socket.off('activity_update');
    };
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Title Header */}
      <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{duration:0.4}} 
           className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-black/20 p-6 rounded-2xl border border-white/5 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div>
          <span className="bg-pmddky-bright text-white text-[10px] font-black tracking-widest px-3 py-1 rounded-full mb-3 inline-block shadow-lg">LIVE MONITORING</span>
          <h2 className="text-3xl font-black text-white tracking-wide drop-shadow-lg">PMDDKY Dashboard</h2>
          <p className="text-pmddky-accent text-sm mt-1 font-semibold tracking-wide shadow-sm">Uttarakhand State Real-Time KPIs</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-white bg-pmddky-dark/80 px-4 py-2 border border-pmddky-bright/50 rounded-lg shadow-[0_0_15px_rgba(0,201,122,0.2)]">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse border border-white"></span>
            <span className="text-xs font-bold tracking-widest">SOCKET.IO CONNECTED</span>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard delay={0.1} title="Beneficiaries Verified" value={kpis.beneficiaries} sub="Live stream" icon={Users} trend="+12.5%" highlight={highlightKpi} />
        <StatCard delay={0.2} title="Target Districts" value="13" sub="Active coverage" icon={MapPin} trend="100%" />
        <StatCard delay={0.3} title="Funds Disbursed" value={kpis.funds} sub="Live stream" icon={IndianRupee} trend="+5.2%" highlight={highlightKpi} />
        <StatCard delay={0.4} title="Overall Progress" value={kpis.progress} sub="Live stream" icon={Activity} trend="+4.1%" highlight={highlightKpi} />
      </div>

      {/* Top Main Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-[400px]">
        {/* Main Area Chart */}
        <motion.div initial={{opacity: 0, x: -30}} animate={{opacity: 1, x: 0}} transition={{delay: 0.5, duration: 0.5}}
             className="xl:col-span-2 bg-white/95 backdrop-blur-xl rounded-[10px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.4)]" style={{ borderLeft: '5px solid #1a7c45' }}>
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-black text-pmddky-dark uppercase tracking-wide">Disbursement Trend (vs Target)</h3>
              <p className="text-xs text-gray-500 font-semibold mt-1">Monthly progression for FY 2025-26</p>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataProcess} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFunds" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00c97a" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#00c97a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 600 }} />
                <RechartsTooltip cursor={{ stroke: '#1a7c45', strokeWidth: 1, strokeDasharray: '4 4' }} contentStyle={{ backgroundColor: '#0d3d22', color: '#fff', borderRadius: '8px', border: 'none', fontWeight: 'bold' }} />
                <Area type="monotone" dataKey="funds" stroke="#00c97a" strokeWidth={4} fillOpacity={1} fill="url(#colorFunds)" animationDuration={1500} />
                <Area type="monotone" dataKey="dist" stroke="#1a5c38" strokeWidth={2} fillOpacity={0} borderDasharray="5 5" animationDuration={1500} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Live Activity Feed */}
        <div className="xl:col-span-1 h-full">
          <ActivityFeed activities={activities} />
        </div>
      </div>

      {/* Bottom Data Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} transition={{delay: 0.7}}>
          <MiniMap />
        </motion.div>

        {/* Status Breakdown */}
        <motion.div initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} transition={{delay: 0.8}} 
             className="bg-white/95 backdrop-blur-xl rounded-[10px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.4)] border-l-[5px] border-[#d4a820]">
          <h3 className="text-sm font-black text-pmddky-dark uppercase tracking-wide mb-4">Verification Status</h3>
          <div className="h-[150px] flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value" stroke="none" animationDuration={1500}>
                  {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center bg-white rounded-full p-2 shadow-sm">
              <p className="text-xl font-black text-pmddky-dark">85k</p>
            </div>
          </div>
          <div className="flex justify-between mt-3 pt-4 border-t border-gray-100">
            <div className="text-center"><p className="text-[10px] text-gray-500 font-bold uppercase">Disbursed</p><p className="text-base font-black text-pmddky-bright">65%</p></div>
            <div className="text-center"><p className="text-[10px] text-gray-500 font-bold uppercase">Pending</p><p className="text-base font-black text-[#d4a820]">25%</p></div>
            <div className="text-center"><p className="text-[10px] text-gray-500 font-bold uppercase">Rejected</p><p className="text-base font-black text-[#cc2222]">10%</p></div>
          </div>
        </motion.div>

        {/* Top Districts */}
        <motion.div initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} transition={{delay: 0.9}} 
             className="bg-white/95 backdrop-blur-xl rounded-[10px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.4)] border-l-[5px] border-[#1a5c38]">
          <h3 className="text-sm font-black text-pmddky-dark uppercase tracking-wide mb-5">Top Enrollment Districts</h3>
          <div className="space-y-4">
            {distData.map((d, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs font-bold text-gray-700 mb-1.5">
                  <span>{d.name}</span>
                  <span className="text-pmddky-bright">{d.val}k</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 shadow-inner">
                  <motion.div initial={{width: 0}} animate={{width: `${(d.val/150)*100}%`}} transition={{duration: 1.5, delay: 0.5}} 
                       className="bg-gradient-to-r from-pmddky-dark via-pmddky-mid to-pmddky-accent h-2 rounded-full shadow-sm"></motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Dashboard;
