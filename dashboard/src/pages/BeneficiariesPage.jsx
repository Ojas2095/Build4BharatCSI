import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Download, MoreVertical, Plus, CheckCircle, XCircle, Clock, X } from 'lucide-react';
import toast from 'react-hot-toast';

const DUMMY_DATA = [
  { id: 'BEN_8401', name: 'Ramesh Singh', district: 'Dehradun', amount: '₹12,500', status: 'Verified', date: 'Oct 12, 2025', phone: '9876543210', plotSize: '2.5 Acres' },
  { id: 'BEN_9211', name: 'Geeta Devi', district: 'Haridwar', amount: '₹12,500', status: 'Pending', date: 'Oct 15, 2025', phone: '8765432109', plotSize: '1.2 Acres' },
  { id: 'BEN_1052', name: 'Surendra Kumar', district: 'Pathoragarh', amount: '-', status: 'Rejected', date: 'Oct 08, 2025', phone: '7654321098', plotSize: '0.8 Acres' },
  { id: 'BEN_4839', name: 'Kamla Bhatt', district: 'Nainital', amount: '₹12,500', status: 'Verified', date: 'Oct 16, 2025', phone: '6543210987', plotSize: '3.0 Acres' },
  { id: 'BEN_7201', name: 'Mohan Joshi', district: 'Almora', amount: '₹12,500', status: 'Verified', date: 'Oct 10, 2025', phone: '5432109876', plotSize: '1.5 Acres' },
  { id: 'BEN_9934', name: 'Pooja Rawat', district: 'Pauri Garhwal', amount: '₹12,500', status: 'Pending', date: 'Oct 18, 2025', phone: '4321098765', plotSize: '2.0 Acres' },
  { id: 'BEN_3108', name: 'Deepak Bisht', district: 'Tehri Garhwal', amount: '-', status: 'Rejected', date: 'Oct 11, 2025', phone: '3210987654', plotSize: '1.1 Acres' },
];

const StatusBadge = ({ status }) => {
  if (status === 'Verified') return <span className="flex items-center w-max gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-pmddky-accent/10 text-pmddky-bright border border-pmddky-accent/20"><CheckCircle className="w-3.5 h-3.5" /> {status}</span>;
  if (status === 'Rejected') return <span className="flex items-center w-max gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200"><XCircle className="w-3.5 h-3.5" /> {status}</span>;
  return <span className="flex items-center w-max gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-pmddky-gold/10 text-[#a37e0e] border border-pmddky-gold/20"><Clock className="w-3.5 h-3.5" /> {status}</span>;
}

const BeneficiariesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBenf, setSelectedBenf] = useState(null);

  const filteredData = DUMMY_DATA.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.id.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleAddSubmit = (e) => {
    e.preventDefault();
    toast.success('New Beneficiary Record Submitted for Verification!');
    setShowAddModal(false);
  };

  return (
    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.4}} className="h-full flex flex-col space-y-4 relative">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/95 p-6 rounded-[10px] shadow-[0_4px_24px_rgba(0,0,0,0.4)] border-l-[5px] border-pmddky-bright">
        <div>
          <h2 className="text-2xl font-black text-pmddky-dark tracking-wide">Beneficiary Management</h2>
          <p className="text-gray-500 text-sm font-semibold mt-1">Aadhaar-verified directory of PMDDKY farmers</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => toast.success('CSV Export Started. Check downloads.')} className="cursor-pointer flex items-center gap-2 px-4 py-2 border border-gray-200 bg-gray-50 text-gray-700 rounded-md font-bold text-sm hover:bg-gray-100 transition shadow-sm">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button onClick={() => setShowAddModal(true)} className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-pmddky-bright text-white rounded-md font-bold text-sm hover:bg-pmddky-dark transition shadow-sm">
            <Plus className="w-4 h-4" /> Add Record
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-hidden bg-white/95 rounded-[10px] shadow-[0_4px_24px_rgba(0,0,0,0.4)] flex flex-col">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between gap-4 bg-gray-50/50">
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <input 
              type="text" 
              placeholder="Search by Name or Beneficiary ID..." 
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-pmddky-accent focus:border-pmddky-accent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => toast('Advanced Filter Module Locked')} className="cursor-pointer flex items-center gap-2 text-sm font-bold text-gray-600 px-3 py-2 border border-gray-200 rounded-md hover:bg-gray-100">
              <Filter className="w-4 h-4" /> Filter Status
            </button>
            <select onChange={(e) => toast.success(`Filtered for ${e.target.value}`)} className="cursor-pointer text-sm border border-gray-200 rounded-md px-3 py-2 font-bold text-gray-700 outline-none">
              <option>All Districts</option>
              <option>Dehradun</option>
              <option>Haridwar</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white sticky top-0 shadow-sm z-10">
              <tr>
                <th className="py-4 px-6 text-xs font-black text-gray-400 uppercase tracking-wider">Benf ID</th>
                <th className="py-4 px-6 text-xs font-black text-gray-400 uppercase tracking-wider">Farmer Name</th>
                <th className="py-4 px-6 text-xs font-black text-gray-400 uppercase tracking-wider">District</th>
                <th className="py-4 px-6 text-xs font-black text-gray-400 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-black text-gray-400 uppercase tracking-wider">Disbursed (₹)</th>
                <th className="py-4 px-6 text-xs font-black text-gray-400 uppercase tracking-wider">Update Date</th>
                <th className="py-4 px-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white/50">
              {filteredData.map((row, index) => (
                <tr key={index} onClick={() => setSelectedBenf(row)} className="hover:bg-pmddky-offwhite transition-colors group cursor-pointer">
                  <td className="py-4 px-6 text-sm font-bold text-gray-600">{row.id}</td>
                  <td className="py-4 px-6 text-sm font-bold text-pmddky-dark">{row.name}</td>
                  <td className="py-4 px-6 text-sm text-gray-600 font-semibold">{row.district}</td>
                  <td className="py-4 px-6"><StatusBadge status={row.status} /></td>
                  <td className="py-4 px-6 text-sm font-black text-gray-700">{row.amount}</td>
                  <td className="py-4 px-6 text-sm text-gray-500 font-semibold">{row.date}</td>
                  <td className="py-4 px-4 text-right">
                    <button onClick={(e) => { e.stopPropagation(); setSelectedBenf(row); }} className="text-gray-400 hover:text-pmddky-bright p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData.length === 0 && (
            <div className="p-8 text-center text-gray-500 font-bold">No beneficiaries found matching your search.</div>
          )}
        </div>
      </div>

      {/* Add Record Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div initial={{scale:0.95, y:20}} animate={{scale:1, y:0}} exit={{scale:0.95, y:20}} className="bg-white rounded-[10px] shadow-[0_10px_40px_rgba(0,0,0,0.5)] w-full max-w-lg overflow-hidden border-t-[5px] border-pmddky-bright">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-pmddky-offwhite">
                <h3 className="font-black text-lg text-pmddky-dark">Register New Beneficiary</h3>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-red-500"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleAddSubmit} className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs font-bold text-gray-500">Full Name</label><input type="text" required className="mt-1 w-full border border-gray-200 rounded p-2 text-sm outline-none focus:border-pmddky-accent" /></div>
                  <div><label className="text-xs font-bold text-gray-500">Aadhaar Number</label><input type="text" required pattern="\d{12}" title="12 digit Aadhaar" className="mt-1 w-full border border-gray-200 rounded p-2 text-sm outline-none focus:border-pmddky-accent" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs font-bold text-gray-500">District</label>
                    <select required className="mt-1 w-full border border-gray-200 rounded p-2 text-sm outline-none focus:border-pmddky-accent"><option>Dehradun</option><option>Haridwar</option><option>US Nagar</option></select>
                  </div>
                  <div><label className="text-xs font-bold text-gray-500">Estimated Plot Size</label><input type="text" placeholder="e.g. 1.5 Acres" required className="mt-1 w-full border border-gray-200 rounded p-2 text-sm outline-none focus:border-pmddky-accent" /></div>
                </div>
                <button type="submit" className="w-full bg-pmddky-bright hover:bg-pmddky-mid text-white font-bold py-2.5 rounded-md mt-4 transition-colors">Submit to Blockchain Registry</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Benf Detail Modal */}
      <AnimatePresence>
        {selectedBenf && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setSelectedBenf(null)}>
            <motion.div onClick={e => e.stopPropagation()} initial={{scale:0.95, y:20}} animate={{scale:1, y:0}} exit={{scale:0.95, y:20}} className="bg-white rounded-[10px] shadow-[0_10px_40px_rgba(0,0,0,0.5)] w-full max-w-md overflow-hidden border-l-[5px] border-pmddky-dark">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-black text-2xl text-pmddky-dark">{selectedBenf.name}</h3>
                    <p className="text-xs font-bold text-pmddky-accent uppercase mt-1">ID: {selectedBenf.id}</p>
                  </div>
                  <StatusBadge status={selectedBenf.status} />
                </div>
                <div className="bg-pmddky-offwhite p-4 rounded-lg space-y-3 mb-5 border border-gray-100">
                  <div className="flex justify-between border-b border-gray-200 pb-2"><span className="text-xs font-bold text-gray-500 uppercase">District</span><span className="text-sm font-bold text-gray-800">{selectedBenf.district}</span></div>
                  <div className="flex justify-between border-b border-gray-200 pb-2"><span className="text-xs font-bold text-gray-500 uppercase">Phone</span><span className="text-sm font-bold text-gray-800">{selectedBenf.phone}</span></div>
                  <div className="flex justify-between border-b border-gray-200 pb-2"><span className="text-xs font-bold text-gray-500 uppercase">Farm Size</span><span className="text-sm font-bold text-gray-800">{selectedBenf.plotSize}</span></div>
                  <div className="flex justify-between pt-1"><span className="text-xs font-bold text-gray-500 uppercase">Total Disbursed</span><span className="text-base font-black text-pmddky-bright">{selectedBenf.amount}</span></div>
                </div>
                <div className="flex gap-3 mt-5">
                  {!selectedBenf.ekycVerified ? (
                    <button onClick={() => {
                        const tId = toast.loading('Initiating UIDAI Aadhaar eKYC handshake...');
                        setTimeout(() => {
                           toast.success('Bio-Auth Verified. Scheme Funds Unlocked.', { id: tId });
                           setSelectedBenf({...selectedBenf, ekycVerified: true, status: 'Verified'});
                        }, 2000);
                      }} 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white py-2.5 rounded-lg font-black text-sm shadow-[0_4px_15px_rgba(30,64,175,0.4)] transition-all flex justify-center w-full">
                      Authenticate via eKYC
                    </button>
                  ) : (
                    <button onClick={() => {toast.success('Funds successfully pushed to Direct Benefit Transfer (DBT).'); setSelectedBenf(null);}} 
                      className="flex-1 bg-[#00c97a] hover:bg-[#1a7c45] text-white py-2.5 rounded-lg font-black text-sm shadow-[0_4px_15px_rgba(0,201,122,0.4)] transition-all">
                      Release DBT Funds
                    </button>
                  )}
                  <button onClick={() => setSelectedBenf(null)} className="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-lg font-bold text-sm hover:bg-gray-50 transition-colors">Close</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default BeneficiariesPage;
