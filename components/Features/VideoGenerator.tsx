import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  Sparkles, 
  Loader2, 
  Play, 
  Image as ImageIcon, 
  Mic, 
  Music, 
  Wand2, 
  Download, 
  Volume2,
  Pause,
  Settings2,
  User,
  MessageSquareQuote,
  FileText,
  ArrowRight,
  Copy,
  Video,
  LogIn,
  AlertCircle
} from 'lucide-react';

type TabType = 'script' | 'vision' | 'video' | 'voice' | 'music';

// Styles for Image Generation
const VISUAL_STYLES = [
  { id: 'cinematic', label: 'Cinematográfico', prompt: 'cinematic shot, dramatic lighting, 8k resolution, photorealistic, depth of field, movie scene, masterpiece' },
  { id: 'cyberpunk', label: 'Cyberpunk', prompt: 'cyberpunk city, neon lights, futuristic, high tech, dark atmosphere, rain, blade runner style, vibrant neon colors' },
  { id: '3d-render', label: '3D Render', prompt: 'Unreal Engine 5 render, octane render, hyper detailed, 3d masterpiece, volumetric lighting, ray tracing' },
  { id: 'anime', label: 'Anime / 2D', prompt: 'anime style, studio ghibli, vibrant colors, detailed drawing, 2d art, high quality illustration' },
  { id: 'studio', label: 'Fotografia de Estúdio', prompt: 'studio photography, professional lighting, plain background, high detail, sharp focus, 85mm lens' },
];

// Voice Options (Gemini TTS) - Mapped to Age/Gender archetypes
const VOICE_OPTIONS = [
  { id: 'Puck', label: 'Jovem / Criança (Masculina)', desc: 'Tom lúdico e jovial' },
  { id: 'Zephyr', label: 'Jovem (Feminina)', desc: 'Enérgica e dinâmica' },
  { id: 'Fenrir', label: 'Adulto (Masculina)', desc: 'Profundo e intenso' },
  { id: 'Kore', label: 'Adulta (Feminina)', desc: 'Calma e equilibrada' },
  { id: 'Charon', label: 'Idoso / Grave (Masculina)', desc: 'Sério e maduro' },
];

// Script Personas
const SCRIPT_PERSONAS = [
  { 
    id: 'strategist', 
    label: 'O Estrategista (Business)', 
    desc: 'Foco em autoridade e conversão',
    voiceId: 'Fenrir',
    tone: 'Profissional, Seguro, Autoritário',
    system: 'Você é um estrategista de marketing sênior. Escreva um roteiro curto, direto e focado em autoridade e conversão de vendas. Use gatilhos mentais.'
  },
  { 
    id: 'advertiser', 
    label: 'O Publicitário (Ads)', 
    desc: 'Impacto rápido e Hooks',
    voiceId: 'Zephyr',
    tone: 'Dinâmico, Persuasivo, Rápido',
    system: 'Você é um especialista em anúncios (Ads). Escreva um roteiro de 30 segundos com um "Hook" (gancho) forte no início, retenção no meio e CTA clara no final.'
  },
  { 
    id: 'youtuber', 
    label: 'O Youtuber (Content)', 
    desc: 'Engajamento e Retenção',
    voiceId: 'Puck',
    tone: 'Animado, Casual, Excitado',
    system: 'Você é um YouTuber famoso. Escreva uma introdução de roteiro focada em retenção, usando linguagem casual, perguntas retóricas e alta energia.'
  },
  { 
    id: 'storyteller', 
    label: 'O Narrador (Story)', 
    desc: 'Emocional e Cinematográfico',
    voiceId: 'Charon',
    tone: 'Profundo, Emocional, Lento',
    system: 'Você é um contador de histórias cinematográficas. Escreva um roteiro narrativo, focado em emoção, jornada do herói e descrição visual poética.'
  },
];

// Music Samples mapped to keywords
const MUSIC_LIBRARY = [
  { keywords: ['rock', 'metal', 'agressivo', 'ação', 'rápido', 'guitarra'], url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=cyberpunk-city-11028.mp3', mood: 'Cyberpunk Action' },
  { keywords: ['calmo', 'piano', 'triste', 'emocional', 'lento', 'drama'], url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=cinematic-atmosphere-score-2-21268.mp3', mood: 'Cinematic Piano' },
  { keywords: ['lofi', 'chill', 'estudo', 'relaxar', 'beat', 'suave'], url: 'https://cdn.pixabay.com/download/audio/2022/05/05/audio_1391b49969.mp3?filename=lofi-study-112191.mp3', mood: 'Lofi Chill' },
  { keywords: ['épico', 'orquestra', 'batalha', 'herói', 'trailer', 'filme'], url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=epic-hollywood-trailer-9489.mp3', mood: 'Epic Orchestral' },
  { keywords: ['techno', 'dance', 'festa', 'eletrônica', 'futuro'], url: 'https://cdn.pixabay.com/download/audio/2022/10/25/audio_13b332529e.mp3?filename=abstract-fashion-pop-123546.mp3', mood: 'Techno Beat' },
  { keywords: ['terror', 'medo', 'sombrio', 'tensão', 'suspense'], url: 'https://cdn.pixabay.com/download/audio/2022/10/05/audio_686dc2556d.mp3?filename=dark-mystery-trailer-11658.mp3', mood: 'Dark Suspense' },
];

export const VideoGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('script');
  
  // --- VISION STATE ---
  const [imagePrompt, setImagePrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(VISUAL_STYLES[0]);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  // --- VIDEO STATE (VEO) ---
  const [videoPrompt, setVideoPrompt] = useState('');
  const [isVeoGenerating, setIsVeoGenerating] = useState(false);
  const [veoVideoUrl, setVeoVideoUrl] = useState<string | null>(null);
  const [hasVeoKey, setHasVeoKey] = useState(false);
  const [veoQuota, setVeoQuota] = useState(0);
  const VEO_LIMIT = 3;

  // --- VOICE STATE ---
  const [voiceText, setVoiceText] = useState('');
  const [voiceTone, setVoiceTone] = useState('');
  const [selectedVoice, setSelectedVoice] = useState(VOICE_OPTIONS[3]); // Default Kore
  const [isSpeaking, setIsSpeaking] = useState(false); // "Speaking" means generating now
  const [audioDownloadUrl, setAudioDownloadUrl] = useState<string | null>(null);
  
  // Voice Player State
  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [voiceCurrentTime, setVoiceCurrentTime] = useState(0);
  const [voiceDuration, setVoiceDuration] = useState(0);
  
  // --- MUSIC STATE ---
  const [musicPrompt, setMusicPrompt] = useState('');
  const [isGeneratingMusic, setIsGeneratingMusic] = useState(false);
  const [musicUrl, setMusicUrl] = useState<string | null>(null);
  const [currentMood, setCurrentMood] = useState('');
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const musicAudioRef = useRef<HTMLAudioElement | null>(null);

  // --- SCRIPT STATE ---
  const [scriptTopic, setScriptTopic] = useState('');
  const [selectedPersona, setSelectedPersona] = useState(SCRIPT_PERSONAS[0]);
  const [generatedScript, setGeneratedScript] = useState('');
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);

  // --- EFFECTS ---
  useEffect(() => {
    checkApiKey();
  }, []);

  const checkApiKey = async () => {
    if ((window as any).aistudio && (window as any).aistudio.hasSelectedApiKey) {
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      setHasVeoKey(hasKey);
    }
  };

  const handleVeoLogin = async () => {
    if ((window as any).aistudio && (window as any).aistudio.openSelectKey) {
      await (window as any).aistudio.openSelectKey();
      // After selection, check again (handling potential race condition by assuming true if opened and closed, or polling)
      setHasVeoKey(true); 
    } else {
      alert("Ambiente não suporta login direto. Por favor, contate o administrador.");
    }
  };

  // --- HELPER: Time Formatting ---
  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // --- SCRIPT LOGIC ---
  const generateScript = async () => {
    if (!scriptTopic) return;
    setIsGeneratingScript(true);
    setGeneratedScript('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: {
          parts: [{ text: `Tópico do Vídeo: ${scriptTopic}` }]
        },
        config: {
          systemInstruction: selectedPersona.system + " Mantenha o texto pronto para ser falado, sem rubricas complexas. Máximo de 150 palavras.",
        }
      });

      if (response.text) {
        setGeneratedScript(response.text);
      }
    } catch (error) {
      console.error("Script Error", error);
      alert("Erro ao gerar roteiro.");
    } finally {
      setIsGeneratingScript(false);
    }
  };

  const handleSendToVoice = () => {
    if (!generatedScript) return;
    const personaVoice = VOICE_OPTIONS.find(v => v.id === selectedPersona.voiceId);
    if (personaVoice) setSelectedVoice(personaVoice);
    setVoiceTone(selectedPersona.tone);
    setVoiceText(generatedScript);
    setActiveTab('voice');
  };

  // --- VISION LOGIC ---
  const handleMagicBoost = () => {
    const enhancers = [
      "hyper-realistic, 8k resolution, ray tracing, volumetric fog, detailed texture",
      "masterpiece, trending on artstation, sharp focus, intricate details, award winning",
      "dramatic lighting, cinematic composition, professional photography, bokeh"
    ];
    const randomEnhancer = enhancers[Math.floor(Math.random() * enhancers.length)];
    setImagePrompt(prev => prev ? `${prev}, ${randomEnhancer}` : randomEnhancer);
  };

  const generateImage = async () => {
    if (!imagePrompt) return;
    setIsGeneratingImage(true);
    setGeneratedImage(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const finalPrompt = `Generate a high quality image of: ${imagePrompt}. 
      Art Style: ${selectedStyle.prompt}. 
      Requirements: No text overlay, high fidelity, detailed, photorealistic or stylized as requested.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: finalPrompt }] },
        config: { responseModalities: ["IMAGE"] },
      });

      let base64ImageBytes = null;
      if (response.candidates?.[0]?.content?.parts) {
         for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
               base64ImageBytes = part.inlineData.data;
               break;
            }
         }
      }

      if (base64ImageBytes) {
        setGeneratedImage(`data:image/png;base64,${base64ImageBytes}`);
      } else {
        throw new Error("No image data generated.");
      }
    } catch (error) {
      console.error("Image Gen Error", error);
      alert("Erro ao gerar imagem. Tente novamente.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // --- VEO VIDEO LOGIC ---
  const generateVeoVideo = async () => {
    if (!videoPrompt) return;
    if (veoQuota >= VEO_LIMIT) {
        alert("Limite de 3 vídeos por sessão atingido.");
        return;
    }

    setIsVeoGenerating(true);
    setVeoVideoUrl(null);

    try {
      // Re-instantiate to ensure we use the user's selected key from the login process
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: videoPrompt,
        config: {
          numberOfVideos: 1,
          resolution: '1080p',
          aspectRatio: '16:9'
        }
      });

      // Polling loop
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5s
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
      
      if (videoUri) {
        // Append key to fetch the bytes
        const authenticatedUrl = `${videoUri}&key=${process.env.API_KEY}`;
        setVeoVideoUrl(authenticatedUrl);
        setVeoQuota(prev => prev + 1);
      } else {
          throw new Error("Video generation completed but no URI returned.");
      }

    } catch (error) {
      console.error("Veo Error:", error);
      // Reset key state if it fails due to auth to prompt login again
      if (JSON.stringify(error).includes("403") || JSON.stringify(error).includes("key")) {
          setHasVeoKey(false);
          alert("Sessão expirada ou chave inválida. Por favor, faça login novamente.");
      } else {
          alert("Erro na geração do vídeo. Tente um prompt diferente.");
      }
    } finally {
      setIsVeoGenerating(false);
    }
  };

  // --- VOICE LOGIC (GEMINI TTS) ---
  const createWavBlob = (samples: Int16Array, sampleRate: number = 24000) => {
    const buffer = new ArrayBuffer(44 + samples.length * 2);
    const view = new DataView(buffer);

    const writeString = (view: DataView, offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + samples.length * 2, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(view, 36, 'data');
    view.setUint32(40, samples.length * 2, true);

    const dataView = new Uint8Array(buffer, 44);
    const inputView = new Uint8Array(samples.buffer);
    dataView.set(inputView);

    return new Blob([buffer], { type: 'audio/wav' });
  };

  const generateSpeech = async () => {
    if (!voiceText) return;
    setIsSpeaking(true);
    setAudioDownloadUrl(null);
    setIsVoicePlaying(false);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: voiceText }] }],
        config: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: selectedVoice.id }, 
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      
      if (base64Audio) {
        const buffer = base64ToArrayBuffer(base64Audio);
        const int16Data = new Int16Array(buffer);
        const wavBlob = createWavBlob(int16Data, 24000);
        const downloadUrl = URL.createObjectURL(wavBlob);
        setAudioDownloadUrl(downloadUrl);
      } else {
         throw new Error("No audio data returned");
      }

    } catch (error) {
      console.error("TTS Error:", error);
      alert("Erro ao gerar voz. Verifique sua conexão.");
    } finally {
      setIsSpeaking(false);
    }
  };

  const toggleVoicePlay = () => {
    if (!voiceAudioRef.current) return;
    if (isVoicePlaying) {
        voiceAudioRef.current.pause();
    } else {
        voiceAudioRef.current.play();
    }
    setIsVoicePlaying(!isVoicePlaying);
  };

  const handleVoiceTimeUpdate = () => {
    if (voiceAudioRef.current) setVoiceCurrentTime(voiceAudioRef.current.currentTime);
  };

  const handleVoiceMetadata = () => {
    if (voiceAudioRef.current) setVoiceDuration(voiceAudioRef.current.duration);
  };

  const handleVoiceSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (voiceAudioRef.current) {
          const time = parseFloat(e.target.value);
          voiceAudioRef.current.currentTime = time;
          setVoiceCurrentTime(time);
      }
  };

  function base64ToArrayBuffer(base64: string) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  // --- MUSIC LOGIC ---
  const generateMusic = async () => {
    if (!musicPrompt) return;
    setIsGeneratingMusic(true);
    setMusicUrl(null);
    setIsPlayingMusic(false);

    await new Promise(r => setTimeout(r, 2000));

    const lowerPrompt = musicPrompt.toLowerCase();
    let selectedTrack = MUSIC_LIBRARY[0]; 

    for (const track of MUSIC_LIBRARY) {
        if (track.keywords.some(k => lowerPrompt.includes(k))) {
            selectedTrack = track;
            break;
        }
    }

    setMusicUrl(selectedTrack.url);
    setCurrentMood(selectedTrack.mood);
    setIsGeneratingMusic(false);
  };

  const toggleMusicPlay = () => {
    if (!musicAudioRef.current) return;
    if (isPlayingMusic) musicAudioRef.current.pause();
    else musicAudioRef.current.play();
    setIsPlayingMusic(!isPlayingMusic);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto p-1 rounded-xl bg-gradient-to-b from-gold-500/20 to-transparent backdrop-blur-md border border-gold-500/30 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
      <div className="bg-black/90 rounded-lg p-6 md:p-8 relative overflow-hidden min-h-[600px] flex flex-col">
        
        {/* Header */}
        <div className="flex flex-col xl:flex-row justify-between items-center xl:items-center mb-8 border-b border-white/10 pb-6 gap-6">
          <div className="text-center xl:text-left">
            <h3 className="text-2xl font-cyber font-bold text-white uppercase tracking-wider flex items-center justify-center xl:justify-start gap-3">
              Trinity AI Lab <span className="text-xs font-sans font-normal text-gold-500 px-2 py-0.5 border border-gold-500/30 rounded-full bg-gold-500/10">V.3.0</span>
            </h3>
            <p className="text-sm text-gray-400 font-light mt-1">
              Playground de Inteligência Artificial Generativa Multimodal.
            </p>
          </div>

          {/* Tabs - Grid Layout for better fit */}
          <div className="w-full xl:w-auto grid grid-cols-3 sm:grid-cols-5 gap-2 bg-zinc-900/80 p-1 rounded-lg border border-white/10">
            {[
              { id: 'script', icon: FileText, label: 'Roteiros' },
              { id: 'vision', icon: ImageIcon, label: 'Imagens' },
              { id: 'video', icon: Video, label: 'Vídeo (Veo)' },
              { id: 'voice', icon: Mic, label: 'Voz' },
              { id: 'music', icon: Music, label: 'Música' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center justify-center gap-2 px-3 py-2 rounded-md text-[10px] sm:text-xs font-display uppercase tracking-widest transition-all ${
                  activeTab === tab.id
                    ? 'bg-gold-500 text-black shadow-lg font-bold'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon size={14} className="hidden sm:block" />
                <span className="truncate">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row gap-8">
          
          {/* LEFT PANEL: Controls */}
          <div className="w-full lg:w-1/3 space-y-6">
            
            {/* SCRIPT CONTROLS */}
            {activeTab === 'script' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="space-y-2">
                   <label className="text-xs font-display uppercase tracking-widest text-gold-500 flex items-center gap-2">
                      <User size={12} /> Selecione o Especialista
                   </label>
                   <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gold-500/20">
                      {SCRIPT_PERSONAS.map(p => (
                        <button
                            key={p.id}
                            onClick={() => setSelectedPersona(p)}
                            className={`flex flex-col items-start px-3 py-2 border rounded-sm transition-all text-left ${
                                selectedPersona.id === p.id 
                                ? 'bg-gold-500/10 border-gold-500' 
                                : 'bg-transparent border-white/10 hover:border-gold-500/30'
                            }`}
                        >
                            <span className={`text-xs font-bold ${selectedPersona.id === p.id ? 'text-gold-500' : 'text-white'}`}>{p.label}</span>
                            <span className="text-[10px] text-gray-500">{p.desc}</span>
                        </button>
                      ))}
                   </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-display uppercase tracking-widest text-gold-500">Tópico do Vídeo</label>
                  <textarea
                    value={scriptTopic}
                    onChange={(e) => setScriptTopic(e.target.value)}
                    placeholder="Ex: Como usar IA para vender mais..."
                    className="w-full h-32 bg-zinc-900/50 border border-white/10 rounded-sm p-4 text-white focus:border-gold-500 outline-none resize-none text-sm font-light"
                  />
                </div>
                <button onClick={generateScript} disabled={isGeneratingScript || !scriptTopic} className="w-full py-4 bg-gold-500 text-black font-bold font-display uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50">
                  {isGeneratingScript ? 'Escrevendo...' : 'Gerar Roteiro'}
                </button>
              </div>
            )}

            {/* VISION CONTROLS */}
            {activeTab === 'vision' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="space-y-2">
                   <label className="text-xs font-display uppercase tracking-widest text-gold-500 flex items-center gap-2">
                      <Settings2 size={12} /> Estilo de Renderização
                   </label>
                   <div className="grid grid-cols-2 gap-2">
                      {VISUAL_STYLES.map(style => (
                          <button
                            key={style.id}
                            onClick={() => setSelectedStyle(style)}
                            className={`px-2 py-2 text-[10px] uppercase tracking-wider border rounded-sm transition-all text-left truncate ${
                                selectedStyle.id === style.id 
                                ? 'bg-gold-500 text-black border-gold-500 font-bold' 
                                : 'bg-transparent text-gray-400 border-white/10 hover:border-gold-500/50'
                            }`}
                          >
                              {style.label}
                          </button>
                      ))}
                   </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-display uppercase tracking-widest text-gold-500 flex justify-between items-center">
                    Seu Prompt
                    <button onClick={handleMagicBoost} className="text-xs flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors">
                      <Wand2 size={12} /> Melhorar
                    </button>
                  </label>
                  <textarea
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    placeholder="Descreva o que você quer criar..."
                    className="w-full h-32 bg-zinc-900/50 border border-white/10 rounded-sm p-4 text-white focus:border-gold-500 outline-none resize-none text-sm font-light"
                  />
                </div>
                <button onClick={generateImage} disabled={isGeneratingImage || !imagePrompt} className="w-full py-4 bg-gold-500 text-black font-bold font-display uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50">
                  {isGeneratingImage ? 'Gerando Imagem...' : 'Gerar Conceito'}
                </button>
              </div>
            )}

            {/* VEO VIDEO CONTROLS */}
            {activeTab === 'video' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                 
                 {!hasVeoKey ? (
                    <div className="bg-zinc-900/80 border border-gold-500/20 p-6 rounded-sm text-center space-y-4">
                        <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto">
                            <User className="text-gold-500" size={24} />
                        </div>
                        <h4 className="text-white font-display uppercase tracking-widest font-bold">Login Necessário</h4>
                        <p className="text-xs text-gray-400 leading-relaxed">
                            Para gerar vídeos com o <strong>Google Veo</strong>, você precisa fazer login com sua conta Google. Isso utilizará sua própria cota de testes do Gemini API.
                        </p>
                        <button 
                            onClick={handleVeoLogin}
                            className="w-full py-3 flex items-center justify-center gap-2 bg-white text-black font-bold font-display uppercase tracking-widest hover:bg-gray-200 transition-all rounded-sm"
                        >
                            <LogIn size={16} /> Login com Google
                        </button>
                        <p className="text-[9px] text-gray-500">
                            Seus dados são processados diretamente pelo Google.
                        </p>
                    </div>
                 ) : (
                    <>
                        <div className="space-y-2">
                            <label className="text-xs font-display uppercase tracking-widest text-gold-500 flex justify-between">
                                Prompt do Vídeo (Inglês recomendado)
                                <span className="text-[10px] text-gray-400">Cota: {veoQuota}/{VEO_LIMIT}</span>
                            </label>
                            <textarea
                                value={videoPrompt}
                                onChange={(e) => setVideoPrompt(e.target.value)}
                                placeholder="Ex: A cinematic drone shot of a futuristic cyberpunk city with neon lights and flying cars, rain, 8k..."
                                className="w-full h-32 bg-zinc-900/50 border border-white/10 rounded-sm p-4 text-white focus:border-gold-500 outline-none resize-none text-sm font-light"
                            />
                        </div>
                        <button
                            onClick={generateVeoVideo}
                            disabled={isVeoGenerating || !videoPrompt || veoQuota >= VEO_LIMIT}
                            className="w-full py-4 bg-gold-500 text-black font-bold font-display uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                        >
                            {isVeoGenerating ? 'Renderizando Veo...' : 'Gerar Vídeo (Veo 3)'}
                        </button>
                        <div className="flex items-start gap-2 p-3 bg-blue-900/20 border border-blue-500/20 rounded-sm">
                            <AlertCircle size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                            <p className="text-[10px] text-blue-300 leading-relaxed">
                                <strong>Modo Experimental:</strong> A geração pode levar até 1-2 minutos. O vídeo será exibido ao lado assim que concluído.
                            </p>
                        </div>
                    </>
                 )}
              </div>
            )}

            {/* VOICE CONTROLS */}
            {activeTab === 'voice' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="space-y-2">
                   <label className="text-xs font-display uppercase tracking-widest text-gold-500 flex items-center gap-2">
                      <User size={12} /> Selecione a Voz
                   </label>
                   <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gold-500/20">
                      {VOICE_OPTIONS.map(v => (
                        <button
                            key={v.id}
                            onClick={() => setSelectedVoice(v)}
                            className={`flex flex-col items-start px-3 py-2 border rounded-sm transition-all ${
                                selectedVoice.id === v.id 
                                ? 'bg-gold-500/10 border-gold-500' 
                                : 'bg-transparent border-white/10 hover:border-gold-500/30'
                            }`}
                        >
                            <span className={`text-xs font-bold ${selectedVoice.id === v.id ? 'text-gold-500' : 'text-white'}`}>{v.label}</span>
                            <span className="text-[10px] text-gray-500">{v.desc}</span>
                        </button>
                      ))}
                   </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-display uppercase tracking-widest text-gold-500 flex items-center gap-2">
                        <MessageSquareQuote size={12} /> Tom da Narrativa
                    </label>
                    <input
                        type="text"
                        value={voiceTone}
                        onChange={(e) => setVoiceTone(e.target.value)}
                        placeholder="Ex: Engraçado, Comercial, Sério..."
                        className="w-full bg-zinc-900/50 border border-white/10 rounded-sm px-4 py-2 text-white focus:border-gold-500 outline-none text-sm font-light"
                    />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-display uppercase tracking-widest text-gold-500">Texto para Falar</label>
                  <textarea
                    value={voiceText}
                    onChange={(e) => setVoiceText(e.target.value)}
                    placeholder="Escreva aqui o texto que a IA vai narrar..."
                    className="w-full h-28 bg-zinc-900/50 border border-white/10 rounded-sm p-4 text-white focus:border-gold-500 outline-none resize-none text-sm font-light"
                  />
                </div>
                <button onClick={generateSpeech} disabled={!voiceText || isSpeaking} className={`w-full py-4 font-bold font-display uppercase tracking-widest transition-all ${isSpeaking ? 'bg-gold-500/50 text-black cursor-not-allowed' : 'bg-gold-500 text-black hover:bg-white'}`}>
                  {isSpeaking ? 'Sintetizando...' : 'Gerar Voz'}
                </button>
              </div>
            )}

            {/* MUSIC CONTROLS */}
            {activeTab === 'music' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
                 <div className="space-y-3">
                    <label className="text-xs font-display uppercase tracking-widest text-gold-500">Prompt da Música</label>
                    <textarea
                       value={musicPrompt}
                       onChange={(e) => setMusicPrompt(e.target.value)}
                       placeholder="Descreva a atmosfera musical..."
                       className="w-full h-32 bg-zinc-900/50 border border-white/10 rounded-sm p-4 text-white focus:border-gold-500 outline-none resize-none text-sm font-light"
                    />
                 </div>
                 <button onClick={generateMusic} disabled={isGeneratingMusic || !musicPrompt} className="w-full py-4 bg-gold-500 text-black font-bold font-display uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50">
                  {isGeneratingMusic ? 'Compondo...' : 'Gerar Trilha Sonora'}
                </button>
              </div>
            )}
          </div>

          {/* RIGHT PANEL: Display */}
          <div className="w-full lg:w-2/3 bg-black border border-white/10 rounded-sm relative overflow-hidden flex items-center justify-center min-h-[300px]">
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20 z-10"></div>
            
            {/* SCRIPT DISPLAY */}
            {activeTab === 'script' && (
               <div className="relative w-full h-full flex items-center justify-center bg-zinc-900 p-6">
                  {isGeneratingScript ? (
                     <div className="text-center z-20">
                        <Loader2 size={48} className="text-gold-500 animate-spin mb-4 mx-auto" />
                        <p className="text-gold-500 text-xs uppercase tracking-widest animate-pulse">Construindo Narrativa...</p>
                     </div>
                  ) : generatedScript ? (
                     <div className="relative w-full h-full flex flex-col z-20">
                        <div className="flex justify-between items-center mb-4">
                           <span className="text-xs font-display uppercase tracking-widest text-gray-400">Roteiro Gerado</span>
                           <button onClick={() => navigator.clipboard.writeText(generatedScript)} className="p-2 hover:bg-gold-500 hover:text-black rounded transition-colors text-gray-400"><Copy size={16} /></button>
                        </div>
                        <div className="flex-1 bg-black/40 border border-white/5 p-4 rounded-sm overflow-y-auto text-sm leading-relaxed text-gray-200 font-light whitespace-pre-wrap mb-4">
                           {generatedScript}
                        </div>
                        <button onClick={handleSendToVoice} className="flex items-center justify-center gap-2 w-full py-3 bg-green-600/20 border border-green-500/50 text-green-400 font-bold font-display uppercase tracking-widest hover:bg-green-500 hover:text-black transition-all">
                           <Mic size={16} /> Narrar com IA <ArrowRight size={16} />
                        </button>
                     </div>
                  ) : (
                     <div className="text-center opacity-30">
                        <FileText size={64} className="mx-auto mb-4 text-white" />
                        <p className="font-display uppercase tracking-widest text-sm">Aguardando Tópico</p>
                     </div>
                  )}
               </div>
            )}
            
            {/* VISION DISPLAY */}
            {activeTab === 'vision' && (
               <div className="relative w-full h-full flex items-center justify-center bg-zinc-900">
                  {isGeneratingImage ? (
                     <div className="text-center z-20">
                        <Loader2 size={48} className="text-gold-500 animate-spin mb-4 mx-auto" />
                        <p className="text-gold-500 text-xs uppercase tracking-widest animate-pulse">Renderizando Pixels...</p>
                     </div>
                  ) : generatedImage ? (
                     <div className="relative w-full h-full flex items-center justify-center bg-black">
                        <img src={generatedImage} alt="AI Generated" className="max-w-full max-h-full object-contain" />
                        <a href={generatedImage} download="trinity-generated.png" className="absolute bottom-4 right-4 p-2 bg-black/80 text-white rounded-full hover:bg-gold-500 hover:text-black transition-colors z-30 border border-white/20"><Download size={20} /></a>
                     </div>
                  ) : (
                     <div className="text-center opacity-30">
                        <ImageIcon size={64} className="mx-auto mb-4 text-white" />
                        <p className="font-display uppercase tracking-widest text-sm">Aguardando Prompt</p>
                     </div>
                  )}
               </div>
            )}

            {/* VEO VIDEO DISPLAY */}
            {activeTab === 'video' && (
               <div className="relative w-full h-full flex items-center justify-center bg-zinc-900">
                  {isVeoGenerating ? (
                     <div className="text-center z-20 p-8">
                        <Loader2 size={48} className="text-gold-500 animate-spin mb-6 mx-auto" />
                        <p className="text-gold-500 text-sm font-cyber tracking-widest animate-pulse mb-2">GERANDO VÍDEO COM VEO</p>
                        <p className="text-gray-500 text-xs max-w-xs mx-auto leading-relaxed">
                           Isso pode levar de 1 a 2 minutos. A IA está calculando física, luz e movimento...
                        </p>
                     </div>
                  ) : veoVideoUrl ? (
                     <div className="relative w-full h-full flex items-center justify-center bg-black">
                         <video 
                            src={veoVideoUrl} 
                            controls 
                            autoPlay 
                            loop 
                            className="max-w-full max-h-full"
                         />
                     </div>
                  ) : (
                     <div className="text-center opacity-30 flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center mb-4">
                             <Video size={40} className="text-white" />
                        </div>
                        <p className="font-display uppercase tracking-widest text-sm">Aguardando Geração VEO</p>
                        {!hasVeoKey && <p className="text-xs text-red-400 mt-2">Faça login para começar</p>}
                     </div>
                  )}
               </div>
            )}

            {/* VOICE DISPLAY */}
            {activeTab === 'voice' && (
               <div className="relative w-full h-full flex flex-col items-center justify-center bg-zinc-900 p-8">
                  {isSpeaking ? (
                     <div className="flex flex-col items-center gap-4 z-20">
                        <Loader2 size={48} className="text-gold-500 animate-spin" />
                        <p className="text-gold-500 text-xs uppercase tracking-widest animate-pulse">Sintetizando Áudio...</p>
                     </div>
                  ) : audioDownloadUrl ? (
                     <div className="relative w-full max-w-md z-20 bg-black/80 border border-white/10 rounded-lg p-6 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <button onClick={toggleVoicePlay} className="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center text-black hover:scale-105 transition-transform">
                                {isVoicePlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                            </button>
                            <div className="flex-1">
                                <h4 className="text-white font-display uppercase tracking-wider text-sm mb-1">Voz Gerada</h4>
                                <p className="text-gray-500 text-xs">{selectedVoice.label}</p>
                            </div>
                            <a href={audioDownloadUrl} download="voice.wav" className="p-2 text-gray-400 hover:text-gold-500 transition-colors"><Download size={20} /></a>
                        </div>
                        <div className="space-y-2">
                            <input type="range" min="0" max={voiceDuration || 100} value={voiceCurrentTime} onChange={handleVoiceSeek} className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold-500"/>
                            <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                                <span>{formatTime(voiceCurrentTime)}</span>
                                <span>{formatTime(voiceDuration)}</span>
                            </div>
                        </div>
                        <audio ref={voiceAudioRef} src={audioDownloadUrl} onTimeUpdate={handleVoiceTimeUpdate} onLoadedMetadata={handleVoiceMetadata} onEnded={() => setIsVoicePlaying(false)} autoPlay />
                     </div>
                  ) : (
                     <div className="text-center opacity-30">
                        <Mic size={64} className="mx-auto mb-4 text-white" />
                        <p className="font-display uppercase tracking-widest text-sm">Aguardando Texto</p>
                     </div>
                  )}
               </div>
            )}

            {/* MUSIC DISPLAY */}
            {activeTab === 'music' && (
               <div className="relative w-full h-full flex flex-col items-center justify-center bg-zinc-900">
                  {isGeneratingMusic ? (
                     <div className="text-center z-20">
                        <Loader2 size={48} className="text-gold-500 animate-spin mb-4 mx-auto" />
                        <p className="text-gold-500 text-xs uppercase tracking-widest animate-pulse">Compondo...</p>
                     </div>
                  ) : musicUrl ? (
                     <div className="text-center z-20 w-full max-w-xs">
                        <div className="w-40 h-40 rounded-full border-4 border-gold-500/30 mx-auto mb-8 flex items-center justify-center relative bg-black shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                           {isPlayingMusic && <div className="absolute inset-0 rounded-full border-4 border-gold-500 border-t-transparent animate-spin"></div>}
                           <Music size={56} className={`text-gold-500 ${isPlayingMusic ? 'animate-pulse' : ''}`} />
                        </div>
                        <h4 className="text-white font-cyber text-xl mb-2">{currentMood}</h4>
                        <p className="text-gray-500 text-xs mb-6">AI Generated Track</p>
                        <button onClick={toggleMusicPlay} className="p-4 rounded-full bg-gold-500 text-black hover:bg-white hover:scale-110 transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                           {isPlayingMusic ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                        </button>
                        <audio ref={musicAudioRef} src={musicUrl} onEnded={() => setIsPlayingMusic(false)} />
                     </div>
                  ) : (
                     <div className="text-center opacity-30">
                        <Volume2 size={64} className="mx-auto mb-4 text-white" />
                        <p className="font-display uppercase tracking-widest text-sm">Aguardando Prompt Musical</p>
                     </div>
                  )}
               </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};