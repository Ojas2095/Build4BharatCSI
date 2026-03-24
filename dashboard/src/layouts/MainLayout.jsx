import { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/TopHeader';

const MainLayout = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: 'ai', text: 'Namaste! I am the Smart Governance AI. Ask me to analyze district anomalies or predict fund shortages.' }]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => scrollToBottom(), [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if(!inputVal.trim()) return;
    const userMsg = inputVal;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInputVal('');
    setIsTyping(true);

    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
    } catch(err) {
      setMessages(prev => [...prev, { sender: 'ai', text: "Error connecting to the Inference Node." }]);
    }
    setIsTyping(false);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden text-gray-800 relative" 
         style={{ background: 'linear-gradient(135deg, #0a2a17 0%, #143d26 40%, #0e3320 70%, #051a10 100%)' }}>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 relative pb-28">
          {/* Subtle background glow from PPT style */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 30%, rgba(0,220,140,0.12) 0%, transparent 65%), radial-gradient(ellipse at 80% 70%, rgba(0,100,255,0.07) 0%, transparent 55%)' }}></div>
          <div className="relative z-10 w-full h-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Floating AI Chat Widget */}
      <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end">
        <AnimatePresence>
          {chatOpen && (
            <motion.div initial={{opacity:0, y:20, scale:0.95}} animate={{opacity:1, y:0, scale:1}} exit={{opacity:0, y:20, scale:0.95}}
              className="mb-4 w-[340px] h-[450px] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-t-[6px] border-[#00c97a] flex flex-col overflow-hidden">
              
              <div className="bg-[#0b331c] text-white p-4 flex justify-between items-center z-10 shadow-sm">
                <div className="flex items-center gap-2 font-black text-sm tracking-wide">
                  <Bot className="w-5 h-5 text-[#00c97a]" /> Policy Assistant AI
                </div>
                <button onClick={() => setChatOpen(false)} className="text-gray-400 hover:text-white cursor-pointer"><X className="w-5 h-5"/></button>
              </div>

              <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
                {messages.map((m, i) => (
                  <div key={i} className={`flex gap-2 max-w-[85%] ${m.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${m.sender === 'user' ? 'bg-[#1a7c45] text-white' : 'bg-[#00c97a] text-pmddky-dark'}`}>
                      {m.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                    </div>
                    <div className={`p-2.5 rounded-lg text-[13px] font-semibold ${m.sender === 'user' ? 'bg-[#1a7c45] text-white rounded-tr-none shadow-sm' : 'bg-white border border-gray-200 text-gray-700 rounded-tl-none shadow-sm'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-2 max-w-[85%] self-start text-xs font-bold text-gray-500 items-center">
                     <Bot className="w-4 h-4 text-[#00c97a] animate-pulse" /> AI is thinking...
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex gap-2 z-10">
                <input type="text" value={inputVal} onChange={e=>setInputVal(e.target.value)} placeholder="Ask about anomalies..." className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#00c97a] focus:ring-1 focus:ring-[#00c97a]" />
                <button type="submit" disabled={isTyping} className="bg-[#1a7c45] text-white p-2 rounded-lg hover:bg-[#0d3d22] transition-colors cursor-pointer disabled:opacity-50"><Send className="w-4 h-4" /></button>
              </form>

            </motion.div>
          )}
        </AnimatePresence>

        <button onClick={() => setChatOpen(!chatOpen)} className="w-[60px] h-[60px] bg-gradient-to-r from-[#00c97a] to-[#1a7c45] hover:shadow-[0_0_20px_rgba(0,201,122,0.6)] rounded-full text-white flex items-center justify-center shadow-lg transition-all hover:scale-105 cursor-pointer border-2 border-white/20">
          {chatOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </button>
      </div>

    </div>
  );
};

export default MainLayout;
