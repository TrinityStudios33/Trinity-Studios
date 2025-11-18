import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Loader2, Play, AlertCircle, Film, MonitorPlay } from 'lucide-react';

export const VideoGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState('');

  // Rotation messages for long wait times
  useEffect(() => {
    if (!isGenerating) return;
    const messages = [
      "Inicializando redes neurais...",
      "Sintetizando geometria de cena...",
      "Calculando iluminação volumétrica...",
      "Renderizando frames...",
      "Aplicando pós-processamento...",
      "Finalizando compressão de vídeo..."
    ];
    let i = 0;
    setStatusMessage(messages[0]);
    const interval = setInterval(() => {
      i = (i + 1) % messages.length;
      setStatusMessage(messages[i]);
    }, 5000);
    return () => clearInterval(interval);
  }, [isGenerating]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setError(null);
    setVideoUrl(null);
    setIsGenerating(true);

    try {
      // Check API Key presence using type assertion to avoid global type conflicts
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await (window as any).aistudio.openSelectKey();
      }

      // Initialize Client
      // IMPORTANT: Re-initialize GoogleGenAI after key selection to ensure the key is active/accessible
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      // Start Generation
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: aspectRatio,
        }
      });

      // Poll for completion
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5s
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      // Handle Response
      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (!downloadLink) {
        throw new Error("Falha ao recuperar URI do vídeo.");
      }

      // Fetch video blob with API key authentication
      const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      if (!videoResponse.ok) throw new Error("Erro ao baixar o vídeo gerado.");
      
      const blob = await videoResponse.blob();
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);

    } catch (err: any) {
      console.error(err);
      if (err.message && err.message.includes("Requested entity was not found")) {
         setError("Sessão expirada. Por favor, selecione sua chave API novamente.");
         // Retry logic could be added here if needed
         try {
            await (window as any).aistudio.openSelectKey();
         } catch (e) {
            console.error("Error reopening key selection", e);
         }
      } else {
         setError(err.message || "Ocorreu um erro durante a geração do vídeo.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto p-1 rounded-xl bg-gradient-to-b from-gold-500/20 to-transparent backdrop-blur-md border border-gold-500/30 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
      <div className="bg-black/90 rounded-lg p-6 md:p-8 relative overflow-hidden">
        
        {/* Background Tech Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header */}
        <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
          <div className="p-2 bg-gold-500/10 rounded-md border border-gold-500/20">
            <Film className="text-gold-500 w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-cyber font-bold text-white uppercase tracking-wider">Trinity Veo Lab</h3>
            <p className="text-xs text-gray-400 font-sans">Gerador de Vídeo Neural em Tempo Real</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            
            <div className="space-y-2">
              <label className="text-xs font-display uppercase tracking-widest text-gold-500 flex items-center gap-2">
                <Sparkles size={12} />
                Prompt Criativo
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isGenerating}
                placeholder="Descreva uma cena cinematográfica futurista..."
                className="w-full h-32 bg-zinc-900/50 border border-white/10 rounded-sm p-4 text-white focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-all resize-none text-sm font-light placeholder-gray-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-display uppercase tracking-widest text-gold-500">Formato</label>
              <div className="flex gap-4">
                <button
                  onClick={() => setAspectRatio('16:9')}
                  className={`flex-1 py-3 border rounded-sm text-xs font-display uppercase tracking-wider transition-all ${
                    aspectRatio === '16:9' 
                      ? 'border-gold-500 bg-gold-500/10 text-gold-500 shadow-[0_0_10px_rgba(212,175,55,0.2)]' 
                      : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-gray-300'
                  }`}
                >
                  Landscape (16:9)
                </button>
                <button
                  onClick={() => setAspectRatio('9:16')}
                  className={`flex-1 py-3 border rounded-sm text-xs font-display uppercase tracking-wider transition-all ${
                    aspectRatio === '9:16' 
                      ? 'border-gold-500 bg-gold-500/10 text-gold-500 shadow-[0_0_10px_rgba(212,175,55,0.2)]' 
                      : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-gray-300'
                  }`}
                >
                  Portrait (9:16)
                </button>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full py-4 mt-4 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 text-black font-bold font-display uppercase tracking-[0.2em] hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] relative overflow-hidden group"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={18} />
                  Processando
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Play size={18} fill="currentColor" />
                  Gerar Vídeo
                </span>
              )}
            </button>

            <div className="text-xs text-gray-600 text-center">
              *Requer chave API selecionada via Google AI Studio.
              <br />
              <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-gold-500/70 hover:text-gold-500 hover:underline">
                Informações sobre cobrança
              </a>
            </div>
          </div>

          {/* Display Area */}
          <div className="relative bg-black border border-white/10 rounded-sm min-h-[300px] flex flex-col items-center justify-center overflow-hidden group">
            
            {isGenerating ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-20 p-6 text-center">
                <div className="relative w-16 h-16 mb-6">
                  <div className="absolute inset-0 border-t-2 border-gold-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-2 border-r-2 border-white/30 rounded-full animate-spin duration-reverse"></div>
                </div>
                <p className="text-gold-500 font-display text-sm uppercase tracking-widest animate-pulse mb-2">
                  {statusMessage}
                </p>
                <p className="text-gray-500 text-xs">Isso pode levar alguns minutos...</p>
              </div>
            ) : videoUrl ? (
              <video 
                src={videoUrl} 
                controls 
                autoPlay 
                loop 
                className="w-full h-full object-contain z-10"
              />
            ) : (
              <div className="text-center p-6 opacity-40 group-hover:opacity-60 transition-opacity">
                <MonitorPlay size={48} className="mx-auto mb-4 text-white" strokeWidth={1} />
                <p className="text-sm font-display uppercase tracking-wider text-gray-400">
                  Aguardando Input
                </p>
              </div>
            )}

            {/* Error Toast */}
            {error && (
              <div className="absolute bottom-4 left-4 right-4 bg-red-900/90 border border-red-500/50 p-4 rounded flex items-start gap-3 z-30 backdrop-blur-sm">
                <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
                <p className="text-red-200 text-xs">{error}</p>
              </div>
            )}

            {/* Decorative Matrix Overlay (CSS only) */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};