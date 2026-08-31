import React, { useState } from 'react';
import { Bot, Send, User, ChevronRight, Activity, Map, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

export function AIAssistant() {
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', content: "Hello! I am ApnaHelper AI, your cooperative operations assistant. How can I help you manage the workforce today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const SUGGESTIONS = [
    "Which areas need more electricians?",
    "Show delayed service requests.",
    "Which workers are currently available?",
    "Which cooperative has unused workforce capacity?"
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    setChatHistory(prev => [...prev, { role: 'user', content: text }]);
    setQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = "";
      if (text.includes("electrician")) {
        aiResponse = "Based on current demand patterns, **Zone 3** and **Zone 1** have the highest shortage of electricians (-11 and -4 respectively).\n\n**DATA USED:** Real-time GIS demand, Worker availability (Society B).\n\n**RECOMMENDATION:** Consider reallocating 4 electricians from Society A to Society B.";
      } else if (text.includes("available")) {
        aiResponse = "There are currently **684** workers available across all cooperatives.\n\n**Highest Availability:**\n- Bardoli Labour Cooperative (245 available)\n- Surat Women's Cooperative (180 available)\n\n**ACTION:** View full availability dashboard.";
      } else {
        aiResponse = "I have analyzed the current network state. Demand is peaking in plumbing services, while we have a surplus of cleaning staff available. \n\n**RECOMMENDATION:** Offer cross-training programs or incentivize workers to shift to high-demand zones.";
      }

      setChatHistory(prev => [...prev, { role: 'ai', content: aiResponse }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-8 flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">ApnaHelper AI</h1>
          <p className="text-slate-500">Your cooperative operations assistant</p>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50">
          {chatHistory.map((msg, i) => (
            <div key={i} className={cn("flex gap-4 max-w-[85%]", msg.role === 'user' ? "ml-auto flex-row-reverse" : "")}>
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1", 
                msg.role === 'ai' ? "bg-teal-100 text-teal-600" : "bg-slate-800 text-white"
              )}>
                {msg.role === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>
              <div className={cn("px-5 py-4 rounded-2xl shadow-sm", 
                msg.role === 'user' ? "bg-slate-800 text-white rounded-tr-sm" : "bg-white border border-slate-200 text-slate-700 rounded-tl-sm"
              )}>
                {msg.content.split('\n\n').map((paragraph, idx) => {
                  if (paragraph.startsWith('**DATA USED:**')) {
                    return <div key={idx} className="mt-4 p-3 bg-slate-50 border border-slate-100 rounded-lg text-sm"><span className="font-bold text-slate-500 flex items-center gap-1 mb-1"><Activity className="w-4 h-4"/> Data Used</span>{paragraph.replace('**DATA USED:**', '')}</div>
                  }
                  if (paragraph.startsWith('**RECOMMENDATION:**')) {
                    return <div key={idx} className="mt-4 p-3 bg-orange-50 border border-orange-100 rounded-lg text-sm"><span className="font-bold text-orange-600 flex items-center gap-1 mb-1"><Sparkles className="w-4 h-4"/> Recommendation</span>{paragraph.replace('**RECOMMENDATION:**', '')}</div>
                  }
                  if (paragraph.startsWith('**ACTION:**')) {
                    return <button key={idx} className="mt-4 w-full text-left p-3 bg-teal-50 hover:bg-teal-100 border border-teal-100 rounded-lg text-sm text-teal-800 font-medium transition-colors flex justify-between items-center">{paragraph.replace('**ACTION:**', '')} <ChevronRight className="w-4 h-4"/></button>
                  }
                  return <p key={idx} className="mb-2 last:mb-0 leading-relaxed" dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
                })}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-4 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-4 h-4" />
              </div>
              <div className="px-5 py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-white border-t border-slate-200">
          <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
            {SUGGESTIONS.map((sug, i) => (
              <button 
                key={i} 
                onClick={() => handleSend(sug)}
                className="whitespace-nowrap px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-medium rounded-full transition-colors"
              >
                {sug}
              </button>
            ))}
          </div>
          <div className="relative flex items-center">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(query)}
              placeholder="Ask ApnaHelper AI..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 pr-14 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all text-slate-700"
            />
            <button 
              onClick={() => handleSend(query)}
              disabled={!query.trim() || isTyping}
              className="absolute right-2 p-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white rounded-lg transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
