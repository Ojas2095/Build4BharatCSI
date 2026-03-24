import { motion } from 'framer-motion';
import { Network, Search, FileText, CheckCircle2 } from 'lucide-react';

const mockLogs = [
  { txHash: "0x8f2a...9c1d", timestamp: "2025-10-18 14:22:01", action: "FUNDS_DISBURSED", details: "₹12,500 transferred to BEN_4839", status: "CONFIRMED" },
  { txHash: "0x3b1c...4a2f", timestamp: "2025-10-18 12:05:40", action: "EKYC_VERIFICATION", details: "UIDAI Auth success for BEN_7201", status: "CONFIRMED" },
  { txHash: "0x7a8b...1e9c", timestamp: "2025-10-17 09:15:22", action: "NEW_BENEFICIARY", details: "Registration hash generated for Almora block", status: "CONFIRMED" },
  { txHash: "0x2c4d...8b7a", timestamp: "2025-10-16 16:40:10", action: "ANOMALY_FLAG", details: "AI flagged duplicate entry in Pauri Garhwal", status: "PENDING_REVIEW" },
  { txHash: "0x9e1f...3c2d", timestamp: "2025-10-15 11:30:05", action: "FUNDS_DISBURSED", details: "₹12,500 transferred to BEN_9211", status: "CONFIRMED" },
  { txHash: "0x5d6e...7f8a", timestamp: "2025-10-14 08:20:50", action: "EKYC_VERIFICATION", details: "UIDAI Auth failed for BEN_3108 (Mismatch)", status: "REJECTED" }
];

const AuditLogs = () => {
  return (
    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.4}} className="h-full flex flex-col space-y-4">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0d3d22] p-6 rounded-[10px] shadow-[0_4px_24px_rgba(0,0,0,0.4)] border border-[#1a7c45]">
        <div>
          <span className="bg-pmddky-accent text-pmddky-dark text-[10px] font-black tracking-widest px-3 py-1 rounded-full mb-3 inline-block shadow-lg">NODE: ACTIVE</span>
          <h2 className="text-2xl font-black text-white tracking-wide flex items-center gap-2"><Network className="w-6 h-6 text-pmddky-accent" /> Blockchain Audit Ledger</h2>
          <p className="text-gray-300 text-sm mt-1 font-semibold tracking-wide">Immutable transaction logs for RTI compliance</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-white/20 bg-white/10 text-white rounded-md font-bold text-sm hover:bg-white/20 transition cursor-not-allowed opacity-70">
            <Filter className="w-4 h-4 hidden" /> Export PDF Ledger
          </button>
        </div>
      </div>

      {/* Ledger Table Container */}
      <div className="flex-1 overflow-hidden bg-white/95 rounded-[10px] shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex flex-col border-t-[5px] border-pmddky-dark">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input type="text" placeholder="Search by TxHash or Action..." className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-pmddky-dark" />
          </div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00c97a]" /> 1,204 Synchronized Blocks
          </div>
        </div>

        <div className="flex-1 overflow-auto p-2">
          <div className="space-y-2">
             {mockLogs.map((log, idx) => (
                <div key={idx} className="flex flex-col md:flex-row md:items-center gap-4 p-4 border border-gray-100 rounded-lg hover:border-[#00c97a]/50 bg-white transition-all shadow-sm">
                   
                   <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200">
                     <FileText className="w-5 h-5 text-gray-500" />
                   </div>
                   
                   <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold bg-gray-800 text-pmddky-accent px-2 py-0.5 rounded">{log.txHash}</span>
                        <span className="text-xs font-bold text-gray-500">{log.timestamp}</span>
                      </div>
                      <p className="text-sm font-black text-pmddky-dark mt-1">{log.action}</p>
                      <p className="text-xs text-gray-600 font-medium mt-0.5">{log.details}</p>
                   </div>
                   
                   <div className="shrink-0 text-right">
                      {log.status === 'CONFIRMED' && <span className="text-xs font-black tracking-widest text-[#00c97a] uppercase border border-[#00c97a]/30 px-2 py-1 bg-[#00c97a]/10 rounded">Confirmed</span>}
                      {log.status === 'PENDING_REVIEW' && <span className="text-xs font-black tracking-widest text-[#d4a820] uppercase border border-[#d4a820]/30 px-2 py-1 bg-[#d4a820]/10 rounded">Reviewing</span>}
                      {log.status === 'REJECTED' && <span className="text-xs font-black tracking-widest text-[#cc2222] uppercase border border-[#cc2222]/30 px-2 py-1 bg-[#cc2222]/10 rounded">Rejected</span>}
                   </div>
                </div>
             ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AuditLogs;
