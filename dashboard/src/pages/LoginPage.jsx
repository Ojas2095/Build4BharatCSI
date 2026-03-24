import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, ChevronRight, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real app we'd call signInWithEmailAndPassword(auth, email, password)
    // For Hackathon Demo:
    setTimeout(() => {
      if (email === 'admin@pmddky.gov.in' && password === 'admin123') {
        toast.success('Authentication Successful. Decrypting Node...');
        onLogin(true);
      } else {
        toast.error('Invalid Credentials or Unauthorized Node Access');
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #062012 0%, #0d3d22 50%, #1a7c45 100%)' }}>
      
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-pmddky-accent/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] rounded-full bg-pmddky-gold/10 blur-[100px] pointer-events-none"></div>

      <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{duration:0.6}} 
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-8">
        
        <div className="text-center md:text-left mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-pmddky-accent to-pmddky-mid text-white mb-4 shadow-lg border border-pmddky-bright">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-wide mb-1 flex items-center gap-2">BUILD4<span className="font-serif">भारत</span></h1>
          <p className="text-pmddky-accent text-xs font-bold tracking-widest uppercase">PMDDKY Secure Gateway</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-xs font-bold text-gray-300 tracking-wider">OFFICIAL EMAIL</label>
            <div className="relative mt-1">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="admin@pmddky.gov.in" 
                className="w-full bg-black/20 text-white border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-pmddky-accent focus:ring-1 focus:ring-pmddky-accent transition-all placeholder-gray-500 font-medium" />
            </div>
          </div>
          
          <div>
            <label className="text-xs font-bold text-gray-300 tracking-wider">SECRET NODE KEY</label>
            <div className="relative mt-1">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required placeholder="••••••••" 
                className="w-full bg-black/20 text-white border border-white/10 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-pmddky-accent focus:ring-1 focus:ring-pmddky-accent transition-all placeholder-gray-500 font-medium" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#00c97a] to-[#1a7c45] hover:from-[#1a7c45] hover:to-[#0d3d22] text-white font-black py-3.5 rounded-lg shadow-[0_0_20px_rgba(0,201,122,0.4)] transition-all cursor-pointer disabled:opacity-70 disabled:cursor-wait">
            {loading ? 'AUTHENTICATING HANDSHAKE...' : 'SECURE LOGIN ENTRY'} 
            {!loading && <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[10px] text-gray-400 font-semibold tracking-widest uppercase">Team Kishta Coders — Build4Bharat Hackathon</p>
          <div className="text-[10px] text-gray-500 mt-2">Demo Check: admin@pmddky.gov.in / admin123</div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
