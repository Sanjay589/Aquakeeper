import React, { useState, useRef, useEffect } from 'react';
import { mockAquariums, mockPredefinedQuestions } from '../utils/mockData';
import { Sparkles, Send, Image as ImageIcon, Info, HelpCircle, AlertTriangle, Library } from 'lucide-react';
import { useToast } from '../components/common/Toast';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: string[];
  imagePath?: string;
}

export const AiAssistant: React.FC = () => {
  const { showToast } = useToast();
  const [aquariumId, setAquariumId] = useState(mockAquariums[0]?.id || '');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-0',
      sender: 'assistant',
      content: "Hello! I am your AquaKeeper Care Assistant. I can help analyze your water parameters, suggest setup steps, and evaluate fish compatibility. What aquarium question can I help with today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const getTankName = (id: string) => {
    return mockAquariums.find(a => a.id === id)?.name || 'General';
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      content: text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let aiResponseContent = '';
      let aiSources: string[] = [];

      const query = text.toLowerCase();
      if (query.includes('cycle') || query.includes('nitrogen')) {
        aiResponseContent = `To cycle your ${getTankName(aquariumId)} successfully, establish nitrifying bacteria. Step 1: Add a small ammonia source (0.5 ppm). Step 2: Test Ammonia and Nitrite every 2 days. Step 3: Do not add fish until Ammonia and Nitrite drop to exactly 0 ppm. Nitrates will climb, which is corrected with a 20% water change.`;
        aiSources = ['AquaKeeper cycling guide: Step 1', 'Freshwater Biology Journal, p. 45'];
      } else if (query.includes('cloudy')) {
        aiResponseContent = `Cloudy water in a new tank is typically a harmless bacterial bloom. As the nitrogen cycle stabilizes, the water will clear naturally. Avoid massive water changes or replacing filters, as this resets the biological cycle.`;
        aiSources = ['New Tank Syndrome manual', 'Fritz Aqua technical notes'];
      } else if (query.includes('betta')) {
        aiResponseContent = `Bettas require temperatures between 76-80°F and should be fed specialized Betta pellets (2-3 pellets, twice daily). Ensure there are no sharp plastic decorations that can tear their delicate fins.`;
        aiSources = ['Betta husbandry recommendations', 'Anabantoid Fish Guidelines'];
      } else {
        aiResponseContent = `That's an interesting question about your ${getTankName(aquariumId)}. Make sure to keep Ammonia at 0 ppm, Nitrites at 0 ppm, and Nitrates below 20 ppm. Let me know if you would like me to compile details about water chemistry guidelines or species care indexes.`;
        aiSources = ['AquaKeeper general parameters catalog'];
      }

      const assistantMsg: Message = {
        id: `msg-${Date.now()}-ai`,
        sender: 'assistant',
        content: aiResponseContent,
        timestamp: new Date(),
        sources: aiSources
      };

      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleImageAttachMock = () => {
    showToast('Visual attachment loaded in query form! (Dev Mockup)', 'info');
    setInputMessage(prev => prev + " [Attached Fish Image]");
  };

  // Scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="space-y-6 select-none max-w-4xl mx-auto flex flex-col h-[calc(100vh-120px)] animate-slide-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Sparkles size={20} className="text-sky-400" />
            AI Care Assistant
          </h1>
          <p className="text-xs text-slate-400">Ask questions about cycling, chemistry, and compatibility.</p>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="ai-tank" className="text-xs text-slate-400 font-semibold shrink-0">Focus Tank:</label>
          <select 
            id="ai-tank"
            value={aquariumId} 
            onChange={e => setAquariumId(e.target.value)}
            className="glass-input text-xs px-2.5 py-1.5 rounded-xl"
          >
            {mockAquariums.map(aq => (
              <option key={aq.id} value={aq.id}>{aq.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main chat layout */}
      <div className="flex-1 flex flex-col bg-slate-950/40 border border-slate-800 rounded-2xl overflow-hidden min-h-0">
        
        {/* Disclaimers */}
        <div className="p-3 bg-rose-950/20 border-b border-rose-500/15 flex gap-2.5 items-start text-[10px] text-rose-300">
          <AlertTriangle size={16} className="shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Care Disclaimer:</strong> AI answers represent educational guidelines based on database indexes. They do not constitute veterinary medical diagnosis. Always consult certified aquarists or veterinarians for severe livestock illnesses.
          </p>
        </div>

        {/* Conversation Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div 
              key={msg.id}
              className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
            >
              <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-sky-600 text-white rounded-tr-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}>
                {msg.content}
              </div>

              {msg.sources && msg.sources.length > 0 && (
                <div className="flex items-center gap-1 mt-1 text-[9px] text-slate-500 font-mono">
                  <Library size={10} />
                  Sources: {msg.sources.join(' • ')}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="mr-auto p-3 bg-slate-900 border border-slate-800 text-xs text-slate-400 rounded-2xl rounded-tl-none animate-pulse">
              Assistant is thinking...
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Suggested Queries */}
        <div className="p-3 bg-slate-900/40 border-t border-slate-850 flex flex-wrap gap-2 items-center">
          <span className="text-[9px] uppercase font-bold text-slate-500 flex items-center gap-1">
            <HelpCircle size={10} />
            Quick Prompts:
          </span>
          {mockPredefinedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 rounded-lg border border-slate-800 bg-slate-950/80 hover:bg-slate-800 hover:border-slate-700 text-[10px] text-slate-300 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Message Input Form */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputMessage);
          }}
          className="p-3 bg-slate-950 border-t border-slate-850 flex gap-2"
          aria-label="AI message input form"
        >
          <button
            type="button"
            onClick={handleImageAttachMock}
            className="p-2.5 text-slate-400 hover:text-slate-200 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-xl transition-colors shrink-0"
            title="Attach image"
          >
            <ImageIcon size={16} />
          </button>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 glass-input text-xs px-3.5 py-2.5 rounded-xl"
            placeholder="Type your aquarium query here (e.g. nitrogen cycle cloudiness)..."
            required
          />
          <button
            type="submit"
            className="p-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl transition-colors shrink-0"
            title="Send query"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
export default AiAssistant;
