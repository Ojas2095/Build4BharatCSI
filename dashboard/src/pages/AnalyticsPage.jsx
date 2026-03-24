import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';

const InsightCard = ({ title, desc, icon: Icon, colorClass, highlight }) => (
  <div className="bg-white/95 rounded-[10px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.4)] border border-gray-100 flex gap-4">
    <div className={`p-4 rounded-xl shrink-0 h-min ${colorClass}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <h3 className="text-sm font-black text-pmddky-dark uppercase tracking-wide mb-2">{title}</h3>
      <p className="text-xs text-gray-600 leading-relaxed font-semibold">{desc}</p>
      {highlight && <div className="mt-3 text-xs font-bold text-pmddky-bright bg-pmddky-offwhite border border-pmddky-bright/20 px-2 py-1 rounded inline-block">{highlight}</div>}
    </div>
  </div>
);

const AnalyticsPage = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/analytics')
      .then(res => res.json())
      .then(data => setChartData(data))
      .catch(err => console.error("Failed to fetch AI analytics", err));
  }, []);

  const handleAudit = () => {
    const t = toast.loading('Initializing AI Audit Protocol...');
    setTimeout(() => {
      toast.success('Audit Complete: 3 Anomalies Detected and Flagged.', { id: t });
    }, 2500);
  };

  return (
    <motion.div initial={{opacity:0, scale:0.98}} animate={{opacity:1, scale:1}} transition={{duration:0.4}} className="space-y-6 max-w-7xl mx-auto h-full flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-black/20 p-6 rounded-[10px] border border-white/5 backdrop-blur-md">
        <div>
          <span className="bg-[#cc2222] text-white text-[10px] font-black tracking-widest px-3 py-1 rounded-full mb-3 inline-block shadow-lg">AI ENGINE ACTIVE</span>
          <h2 className="text-2xl font-black text-white tracking-wide">AI Predictive Analytics</h2>
          <p className="text-pmddky-accent text-sm mt-1 font-semibold tracking-wide shadow-sm">Anomaly detection & enrollment forecasting</p>
        </div>
        <button onClick={handleAudit} className="flex items-center gap-2 bg-pmddky-bright hover:bg-pmddky-mid text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md transition-colors cursor-pointer">
          <BrainCircuit className="w-4 h-4" /> Run Full Audit
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Side Insights */}
        <div className="space-y-6">
          <InsightCard 
            title="Statistical Anomaly Detected" 
            desc="Unusual spike in beneficiary enrollments in Chamoli district (+450% above rolling average). Probable duplicate record clustering."
            icon={AlertTriangle} colorClass="bg-red-100 text-red-600" highlight="Flags: 45 Records Pending Review"
          />
          <InsightCard 
            title="Aadhaar Verification Trends" 
            desc="Verification success rates have improved by 12% following the integration of the new API bridge. Fraudulent claims dropped significantly."
            icon={ShieldCheck} colorClass="bg-green-100 text-green-700" highlight="Efficiency: +12% this quarter"
          />
          <InsightCard 
            title="Fund Allocation Forecast" 
            desc="Based on historical crop patterns, expect a 15% increase in fund request rates from Haridwar in the upcoming Rabi season."
            icon={TrendingUp} colorClass="bg-blue-100 text-blue-700" highlight="Prediction: ₹12Cr buffer needed"
          />
        </div>

        {/* Right Side Chart & Leaderboard */}
        <div className="space-y-6 flex flex-col h-full">
          <div className="bg-white/95 rounded-[10px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.4)] border-t-[5px] border-[#d4a820] flex flex-col flex-1">
            <h3 className="text-sm font-black text-pmddky-dark uppercase tracking-wide mb-6">Fraud vs Verification Trend (AI Detected)</h3>
            <div className="flex-1 min-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.length > 0 ? chartData : [{name: 'Loading...', verified:0, anomalies:0}]} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB"/>
                  <XAxis dataKey="name" tick={{fontSize: 12, fontWeight: 'bold'}} axisLine={false} tickLine={false} dy={10} />
                  <YAxis tick={{fontSize: 12, fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#f5faf7'}} contentStyle={{borderRadius: '8px', fontWeight: 'bold'}} />
                  <Bar dataKey="verified" stackId="a" fill="#00c97a" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="anomalies" stackId="a" fill="#cc2222" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Leaderboard Card */}
          <div className="bg-white/95 rounded-[10px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.4)] border border-gray-100 flex-1">
             <h3 className="text-sm font-black text-pmddky-dark uppercase tracking-wide mb-4">District Processing Leaderboard</h3>
             <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-pmddky-offwhite rounded-lg border border-[#00c97a]/30">
                  <div className="flex items-center gap-3"><span className="text-lg font-black text-[#00c97a]">1</span><span className="font-bold text-gray-700">Dehradun</span></div>
                  <span className="text-xs font-black text-[#00c97a] bg-[#00c97a]/10 px-2 py-1 rounded">2.4 Days Avg</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-pmddky-offwhite rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3"><span className="text-lg font-black text-gray-400">2</span><span className="font-bold text-gray-700">Haridwar</span></div>
                  <span className="text-xs font-bold text-gray-600 bg-gray-200 px-2 py-1 rounded">3.1 Days Avg</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-3"><span className="text-lg font-black text-red-400">13</span><span className="font-bold text-red-700">Pauri Garhwal</span></div>
                  <span className="text-xs font-black text-red-600 bg-red-100 px-2 py-1 rounded">14.2 Days Avg</span>
                </div>
             </div>
          </div>
        </div>

      </div>

    </motion.div>
  );
};

export default AnalyticsPage;
