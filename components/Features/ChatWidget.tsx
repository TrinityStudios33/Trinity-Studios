import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { MessageSquare, X, Send, Bot, Sparkles, Minus } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'model', text: 'Olá. Sou o Agente treinado pela equipe Trinity, vamos montar seu projeto?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Ref to store the chat session instance
  const chatSessionRef = useRef<Chat | null>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const initChat = () => {
    if (!chatSessionRef.current) {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      chatSessionRef.current = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: {
          systemInstruction: `Você é a Trinity AI, assistente virtual da Trinity Studios.
          
          SOBRE A TRINITY STUDIOS:
          Somos um estúdio de produção audiovisual futurista que une criatividade, técnica e inteligência artificial.
          Fundador: Kevin Marques.
          Missão: Unir técnica, criatividade e inteligência digital para transformar ideias em experiências visuais de impacto.
          Endereço: Rua Joaquim Nabuco N19, Paratibe, Paulista, PE 53413-525.
          Whatsapp: (81) 9 9949-2208.
          
          NOSSOS SERVIÇOS:
          1. Produção Audiovisual (Filmes, comerciais, docs, youtube)
          2. Pós-produção e VFX (Motion, color grading, edição)
          3. Universos Digitais & 3D (Cinemáticas, Unreal Engine)
          4. Identidade Visual (Branding)
          5. Conteúdo com IA (Imagens, vídeo, voz sintética)
          6. Automação Digital e Sistemas No-code
          7. Gestão e Social Media
          8. Fotografia Profissional e com IA
          9. Desenvolvimento Web (Sites cinematográficos)
          10. Consultoria Criativa, Cursos e Mentorias.

          TOM DE VOZ:
          Futurista, profissional, elegante, prestativo e conciso. Use termos como "Elevar o nível", "Experiência visual", "Inovação".
          Se perguntarem preços, peça para solicitarem um orçamento via WhatsApp ou formulário de contato.
          Seja breve nas respostas.`,
        },
      });
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Initialize chat if not already existing
      initChat();
      
      if (chatSessionRef.current) {
        const response = await chatSessionRef.current.sendMessage({ message: userMessage });
        const text = response.text;
        
        setMessages(prev => [...prev, { 
          id: (Date.now() + 1).toString(), 
          role: 'model', 
          text: text || "Desculpe, tive uma falha nos circuitos. Poderia repetir?" 
        }]);
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        role: 'model', 
        text: "Erro de conexão com o servidor neural. Tente novamente em instantes." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end font-sans">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[320px] md:w-[380px] h-[500px] bg-black/90 backdrop-blur-lg border border-gold-500/30 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-zinc-900 to-black border-b border-gold-500/20 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gold-500/10 rounded border border-gold-500/30 relative">
                <Sparkles size={16} className="text-gold-500" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              </div>
              <div>
                <h3 className="text-white font-cyber text-sm tracking-wider">Trinity AI</h3>
                <p className="text-[10px] text-gold-500/80 uppercase tracking-widest">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                    <Minus size={18} />
                </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gold-900 scrollbar-track-black">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-gold-500 text-black font-medium rounded-tr-none shadow-[0_0_15px_rgba(212,175,55,0.2)]' 
                      : 'bg-zinc-800/80 border border-white/10 text-gray-200 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-zinc-800/80 border border-white/10 p-3 rounded-lg rounded-tl-none flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-black/50 border-t border-white/10">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Digite sua dúvida..."
                className="w-full bg-zinc-900/50 text-white text-sm rounded-full pl-4 pr-12 py-3 border border-white/10 focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/20 outline-none transition-all placeholder-gray-600"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 p-2 bg-gold-500 text-black rounded-full hover:bg-white transition-colors disabled:opacity-50 disabled:hover:bg-gold-500"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="text-center mt-2">
               <span className="text-[10px] text-gray-600">Powered by Gemini 3 Pro</span>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          isOpen 
            ? 'bg-zinc-800 text-white rotate-90' 
            : 'bg-gold-500 text-black hover:scale-110 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} className="fill-current" />}
        
        {/* Notification Dot (Decorative) */}
        {!isOpen && (
             <span className="absolute top-0 right-0 flex h-3 w-3">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-black"></span>
             </span>
        )}
      </button>
    </div>
  );
};