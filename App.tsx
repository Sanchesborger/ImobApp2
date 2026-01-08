
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ViewType, Property } from './types';
import { MOCK_PROPERTIES, MOCK_REALTOR } from './constants';
import { PropertyCard } from './components/PropertyCard';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.WELCOME);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  
  // AI Advisor State
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('imob_favorites');
      if (saved) setFavorites(JSON.parse(saved));
    } catch (e) {
      console.warn("LocalStorage access failed:", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('imob_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.warn("LocalStorage save failed:", e);
    }
  }, [favorites]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  }, []);

  const navigateTo = (view: ViewType, id?: string) => {
    if (id) setSelectedPropertyId(id);
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const askAi = async () => {
    if (!userInput.trim()) return;
    
    const message = userInput;
    setUserInput('');
    setChatMessages(prev => [...prev, { role: 'user', text: message }]);
    setIsTyping(true);

    try {
      // Inicializar IA apenas quando necessário
      const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: message,
        config: {
          systemInstruction: "Você é um consultor imobiliário especializado em São Paulo para o app ImobApp. Ajude o usuário a encontrar o imóvel ideal, explique as vantagens de bairros como Jardins, Pinheiros e Vila Mariana. Seja amigável, profissional e conciso."
        }
      });
      
      const aiText = response.text || "Desculpe, tive um problema ao processar sua consulta.";
      setChatMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setChatMessages(prev => [...prev, { role: 'ai', text: "Ocorreu um erro ao conectar com o consultor. Tente novamente mais tarde." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const selectedProperty = MOCK_PROPERTIES.find(p => p.id === selectedPropertyId) || MOCK_PROPERTIES[0];

  const renderWelcome = () => (
    <div className="relative flex h-[100dvh] w-full flex-col justify-between overflow-hidden bg-background-light dark:bg-background-dark">
      <div className="flex w-full items-center justify-between px-6 py-6 z-10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-background-dark shadow-sm">
            <span className="material-symbols-outlined">home</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-text-main-light dark:text-text-main-dark">ImobApp</span>
        </div>
        <button onClick={() => navigateTo(ViewType.HOME)} className="text-sm font-medium text-text-sec-light">Pular</button>
      </div>
      
      <div className="flex-1 flex flex-col justify-center w-full px-6">
        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl mb-6">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuApZdeAYzCBoOtxYwdfrwlA9j4cVN5rzf1vQ0oy8-ct4KfXZKwFriUbAJac-CR5i_LvZhGBVc2xV5WJ3YhOhmsKF7FmLMftG_q_qBSs4vvTuAg17JNUuh-p0QIJW3a1nP7VuJQluMaPZr6xMeo6-jMIcDyPyHWNqTNDUcFbBm8kAVg6PLLpY_pHt07P-T1o0eVrsJyHR5zrNHwrZhlLqIm7NwrRfHydugGYNibOb69xCqePKCj0kTOXP9UiSvhUS9VZy-V8Hemik3s')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark mb-2">Encontre o lar dos seus sonhos</h2>
          <p className="text-text-sec-light dark:text-text-sec-dark max-w-xs mx-auto">A maneira mais fácil e inteligente de comprar ou alugar imóveis.</p>
        </div>
      </div>

      <div className="p-6">
        <button 
          onClick={() => navigateTo(ViewType.HOME)}
          className="w-full h-14 rounded-2xl bg-primary text-background-dark font-bold shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          Começar
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );

  const renderHome = () => (
    <div className="pb-24 animate-in fade-in duration-500">
      <header className="sticky top-0 z-30 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center p-4 justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/20 p-2 rounded-lg text-primary">
              <span className="material-symbols-outlined">apartment</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-text-sec-light font-bold uppercase tracking-wider">Localização</span>
              <div className="flex items-center gap-1 text-text-main-light dark:text-text-main-dark font-bold text-sm">
                <span>São Paulo, SP</span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </div>
            </div>
          </div>
          <button className="p-2 text-text-main-light dark:text-text-main-dark hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
        
        <div className="px-4 pb-4">
          <div 
            onClick={() => navigateTo(ViewType.AI_ADVISOR)}
            className="w-full p-4 rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-background-dark flex items-center justify-between shadow-md mb-4 cursor-pointer overflow-hidden relative group"
          >
            <div className="z-10">
              <h3 className="font-bold text-sm">Dúvidas sobre onde morar?</h3>
              <p className="text-[10px] opacity-90 font-medium">Pergunte ao nosso Consultor IA especializado.</p>
            </div>
            <div className="z-10 size-10 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined animate-pulse">auto_awesome</span>
            </div>
          </div>

          <div 
            onClick={() => navigateTo(ViewType.FILTERS)}
            className="flex w-full items-center rounded-xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 h-12 px-4 gap-3 cursor-pointer shadow-sm active:shadow-inner"
          >
            <span className="material-symbols-outlined text-text-sec-light">search</span>
            <span className="text-gray-400 text-sm flex-1">Cidade, bairro ou endereço</span>
            <span className="material-symbols-outlined text-primary">tune</span>
          </div>
        </div>
      </header>

      <main className="p-4 flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <h2 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">Imóveis em destaque</h2>
          <button className="text-sm font-bold text-primary">Ver todos</button>
        </div>

        <div className="flex flex-col gap-6">
          {MOCK_PROPERTIES.map(property => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              isFavorite={favorites.includes(property.id)}
              onToggleFavorite={toggleFavorite}
              onClick={(id) => navigateTo(ViewType.DETAILS, id)}
            />
          ))}
        </div>
      </main>
    </div>
  );

  const renderAiAdvisor = () => (
    <div className="h-screen flex flex-col bg-background-light dark:bg-background-dark animate-in slide-in-from-right duration-500">
      <header className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-surface-dark z-10">
        <button onClick={() => navigateTo(ViewType.HOME)} className="p-2">
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="text-center">
          <h2 className="text-lg font-bold">Consultor IA</h2>
          <span className="text-[10px] text-primary flex items-center justify-center gap-1 uppercase font-bold tracking-widest">
            <span className="size-1.5 bg-primary rounded-full animate-ping"></span> Online
          </span>
        </div>
        <button onClick={() => setChatMessages([])} className="p-2 text-gray-400">
          <span className="material-symbols-outlined">delete_sweep</span>
        </button>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-gray-50/50 dark:bg-background-dark">
        {chatMessages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center gap-6 p-6">
            <div className="size-24 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-5xl">auto_awesome</span>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-lg text-text-main-light dark:text-text-main-dark">Como posso te ajudar hoje?</h3>
              <p className="text-sm text-gray-500">Ex: "Qual o melhor bairro para quem trabalha na Faria Lima?"</p>
            </div>
          </div>
        )}
        
        {chatMessages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm shadow-sm ${
              msg.role === 'user' 
                ? 'bg-primary text-background-dark rounded-tr-none' 
                : 'bg-white dark:bg-surface-dark text-text-main-light dark:text-text-main-dark border border-gray-100 dark:border-gray-800 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-surface-dark p-4 rounded-2xl border border-gray-100 dark:border-gray-800 flex gap-1">
              <span className="size-1.5 bg-primary rounded-full animate-bounce"></span>
              <span className="size-1.5 bg-primary rounded-full animate-bounce delay-100"></span>
              <span className="size-1.5 bg-primary rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 flex gap-2 pb-safe">
        <input 
          type="text" 
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && askAi()}
          placeholder="Digite sua dúvida..."
          className="flex-1 bg-gray-100 dark:bg-background-dark border-none rounded-xl px-4 py-3 text-sm focus:ring-primary dark:text-white"
        />
        <button 
          onClick={askAi}
          disabled={!userInput.trim() || isTyping}
          className="size-12 bg-primary text-background-dark rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-transform disabled:opacity-50"
        >
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case ViewType.WELCOME: return renderWelcome();
      case ViewType.HOME: return renderHome();
      case ViewType.AI_ADVISOR: return renderAiAdvisor();
      case ViewType.FAVORITES: return (
        <div className="pb-24 min-h-screen animate-in fade-in">
          <header className="sticky top-0 z-30 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
            <button onClick={() => navigateTo(ViewType.HOME)} className="p-2 rounded-full hover:bg-black/5"><span className="material-symbols-outlined">arrow_back</span></button>
            <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">Meus Favoritos</h2>
            <div className="size-10"></div>
          </header>
          <main className="p-4 flex flex-col gap-6">
            {MOCK_PROPERTIES.filter(p => favorites.includes(p.id)).length > 0 ? (
               MOCK_PROPERTIES.filter(p => favorites.includes(p.id)).map(p => (
                <PropertyCard key={p.id} property={p} isFavorite={true} onToggleFavorite={toggleFavorite} onClick={(id) => navigateTo(ViewType.DETAILS, id)} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
                <span className="material-symbols-outlined text-6xl text-gray-300">favorite_border</span>
                <p className="text-gray-400">Nenhum imóvel favoritado ainda.</p>
              </div>
            )}
          </main>
        </div>
      );
      case ViewType.DETAILS: return (
        <div className="pb-32 relative">
          <div className="relative h-[45vh] min-h-[350px]">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${selectedProperty.imageUrl}')` }} />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent"></div>
            <button onClick={() => navigateTo(ViewType.HOME)} className="absolute top-12 left-4 size-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center"><span className="material-symbols-outlined">arrow_back</span></button>
          </div>
          <div className="relative -mt-6 rounded-t-3xl bg-background-light dark:bg-background-dark p-6 shadow-xl border-t border-gray-100 dark:border-gray-800">
             <div className="w-12 h-1 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-6"></div>
             <h1 className="text-2xl font-bold mb-2 text-text-main-light dark:text-text-main-dark">{selectedProperty.title}</h1>
             <p className="text-gray-400 flex items-center gap-1 text-sm"><span className="material-symbols-outlined text-primary text-sm">location_on</span>{selectedProperty.location}</p>
             <h2 className="text-3xl font-bold text-primary my-4">R$ {selectedProperty.price.toLocaleString('pt-BR')}</h2>
             
             <div className="grid grid-cols-4 gap-2 mb-8">
               {[{i:'bed',v:selectedProperty.beds},{i:'bathtub',v:selectedProperty.baths},{i:'square_foot',v:selectedProperty.area + 'm²'},{i:'directions_car',v:selectedProperty.parking}].map((x,i)=>(
                 <div key={i} className="flex flex-col items-center p-3 bg-white dark:bg-surface-dark rounded-2xl border border-gray-50 shadow-sm">
                   <span className="material-symbols-outlined text-gray-400 text-lg">{x.i}</span>
                   <span className="font-bold text-xs mt-1 text-text-main-light dark:text-text-main-dark">{x.v}</span>
                 </div>
               ))}
             </div>
             
             <h3 className="font-bold mb-2 text-text-main-light dark:text-text-main-dark">Descrição</h3>
             <p className="text-sm text-gray-500 leading-relaxed mb-6">Imóvel de alto padrão com localização privilegiada. Agende sua visita e conheça seu futuro lar.</p>

             <div onClick={() => navigateTo(ViewType.PROFILE)} className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-surface-dark border border-gray-50 cursor-pointer active:bg-gray-50 transition-colors">
                <div className="size-12 rounded-full bg-cover bg-center" style={{ backgroundImage: `url('${MOCK_REALTOR.avatarUrl}')` }} />
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-text-main-light dark:text-text-main-dark">{MOCK_REALTOR.name}</h4>
                  <p className="text-[10px] text-gray-400">{MOCK_REALTOR.role}</p>
                </div>
                <span className="material-symbols-outlined text-primary">chat</span>
             </div>
          </div>
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-4 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 flex gap-3 z-50 rounded-t-3xl shadow-xl pb-safe">
            <button className="flex-1 h-12 rounded-xl border border-primary text-primary font-bold active:bg-primary/10 transition-colors">Ligar</button>
            <button className="flex-[2] h-12 rounded-xl bg-primary text-background-dark font-bold shadow-lg shadow-primary/20">Agendar Visita</button>
          </div>
        </div>
      );
      case ViewType.PROFILE: return (
        <div className="animate-in slide-in-from-right duration-500 pb-28">
          <header className="sticky top-0 z-30 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
            <button onClick={() => navigateTo(ViewType.HOME)} className="p-2"><span className="material-symbols-outlined">arrow_back</span></button>
            <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">Perfil do Corretor</h2>
            <div className="size-8"></div>
          </header>
          <div className="flex flex-col items-center p-8 gap-4">
             <div className="size-32 rounded-full border-4 border-white dark:border-gray-800 shadow-xl bg-cover bg-center" style={{ backgroundImage: `url('${MOCK_REALTOR.avatarUrl}')` }} />
             <div className="text-center">
               <h1 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark">{MOCK_REALTOR.name}</h1>
               <p className="text-text-sec-light text-sm font-medium">{MOCK_REALTOR.role}</p>
             </div>
          </div>
          <div className="grid grid-cols-3 gap-3 px-6">
            {[MOCK_REALTOR.soldCount + '+', MOCK_REALTOR.experience + ' Anos', MOCK_REALTOR.activeCount].map((v,i)=>(
              <div key={i} className="flex flex-col items-center p-4 bg-white dark:bg-surface-dark rounded-2xl border border-gray-50 shadow-sm">
                <span className="text-lg font-extrabold text-text-main-light dark:text-text-main-dark">{v}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">Ativos</span>
              </div>
            ))}
          </div>
          <div className="p-6">
             <h3 className="font-bold mb-2 text-text-main-light dark:text-text-main-dark">Sobre</h3>
             <p className="text-sm text-gray-500 leading-relaxed">{MOCK_REALTOR.about}</p>
          </div>
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-4 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 z-50 rounded-t-3xl shadow-xl pb-safe">
            <button className="w-full h-12 bg-primary text-background-dark font-bold rounded-full flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
              <span className="material-symbols-outlined">chat</span>Entrar em Contato
            </button>
          </div>
        </div>
      );
      default: return renderHome();
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen shadow-2xl bg-background-light dark:bg-background-dark relative overflow-x-hidden flex flex-col">
      <div className="flex-1">
        {renderContent()}
      </div>

      {[ViewType.HOME, ViewType.FAVORITES].includes(currentView) && (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 dark:bg-surface-dark/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 pb-safe pt-2 z-40 rounded-t-3xl shadow-[0_-8px_30px_rgb(0,0,0,0.06)]">
          <div className="flex justify-around items-center px-2 pb-2">
            {[
              { id: 'home', icon: 'home', label: 'Início', view: ViewType.HOME },
              { id: 'favs', icon: 'favorite', label: 'Favoritos', view: ViewType.FAVORITES },
              { id: 'ai', icon: 'auto_awesome', label: 'Assistente', view: ViewType.AI_ADVISOR },
              { id: 'profile', icon: 'person', label: 'Perfil', view: ViewType.PROFILE }
            ].map(item => (
              <button 
                key={item.id}
                onClick={() => { navigateTo(item.view); setActiveTab(item.id); }}
                className={`flex flex-col items-center gap-1 p-2 transition-all active:scale-90 ${activeTab === item.id ? 'text-primary' : 'text-gray-400'}`}
              >
                <span className={`material-symbols-outlined ${item.id === 'ai' ? 'animate-pulse' : ''}`} style={{ fontVariationSettings: `'FILL' ${activeTab === item.id ? 1 : 0}` }}>{item.icon}</span>
                <span className="text-[10px] font-bold">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
};

export default App;
