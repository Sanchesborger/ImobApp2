
import React, { useState, useEffect, useCallback } from 'react';
import { ViewType, Property } from './types';
import { MOCK_PROPERTIES, MOCK_REALTOR } from './constants';
import { PropertyCard } from './components/PropertyCard';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.WELCOME);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('home');

  // Load favorites from local storage
  useEffect(() => {
    const saved = localStorage.getItem('imob_favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // Save favorites to local storage
  useEffect(() => {
    localStorage.setItem('imob_favorites', JSON.stringify(favorites));
  }, [favorites]);

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

  const selectedProperty = MOCK_PROPERTIES.find(p => p.id === selectedPropertyId) || MOCK_PROPERTIES[0];

  const renderWelcome = () => (
    <div className="relative flex h-[100dvh] w-full flex-col justify-between overflow-hidden bg-background-light dark:bg-background-dark">
      <div className="flex w-full items-center justify-between px-6 py-6 z-10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-background-dark">
            <span className="material-symbols-outlined">home</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-text-main-light dark:text-text-main-dark">ImobApp</span>
        </div>
        <button onClick={() => navigateTo(ViewType.HOME)} className="text-sm font-medium text-text-sec-light dark:text-text-sec-dark">Pular</button>
      </div>
      
      <div className="flex-1 flex flex-col justify-center w-full px-6">
        <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl shadow-xl mb-6">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuApZdeAYzCBoOtxYwdfrwlA9j4cVN5rzf1vQ0oy8-ct4KfXZKwFriUbAJac-CR5i_LvZhGBVc2xV5WJ3YhOhmsKF7FmLMftG_q_qBSs4vvTuAg17JNUuh-p0QIJW3a1nP7VuJQluMaPZr6xMeo6-jMIcDyPyHWNqTNDUcFbBm8kAVg6PLLpY_pHt07P-T1o0eVrsJyHR5zrNHwrZhlLqIm7NwrRfHydugGYNibOb69xCqePKCj0kTOXP9UiSvhUS9VZy-V8Hemik3s')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark mb-2">Encontre o lar dos seus sonhos</h2>
          <p className="text-text-sec-light dark:text-text-sec-dark">A maneira mais fácil de comprar ou alugar imóveis.</p>
        </div>
      </div>

      <div className="p-6">
        <button 
          onClick={() => navigateTo(ViewType.HOME)}
          className="w-full h-14 rounded-2xl bg-primary text-background-dark font-bold shadow-lg flex items-center justify-center gap-2"
        >
          Começar
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );

  const renderHome = () => (
    <div className="pb-24 animate-in fade-in duration-500">
      <header className="sticky top-0 z-30 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center p-4 justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/20 p-2 rounded-lg text-primary">
              <span className="material-symbols-outlined">apartment</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-text-sec-light dark:text-text-sec-dark font-bold uppercase tracking-wider">Localização</span>
              <div className="flex items-center gap-1 text-text-main-light dark:text-text-main-dark font-bold text-sm">
                <span>São Paulo, SP</span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </div>
            </div>
          </div>
          <button className="relative p-2 text-text-main-light dark:text-text-main-dark hover:bg-black/5 dark:hover:bg-white/10 rounded-full">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-background-light"></span>
          </button>
        </div>
        <div className="px-4 pb-4">
          <div 
            onClick={() => navigateTo(ViewType.FILTERS)}
            className="flex w-full items-center rounded-xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 h-12 px-4 gap-3 cursor-pointer"
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

  const renderFavorites = () => {
    const favoriteProperties = MOCK_PROPERTIES.filter(p => favorites.includes(p.id));

    return (
      <div className="pb-24 min-h-screen animate-in fade-in duration-500">
        <header className="sticky top-0 z-30 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
          <button onClick={() => navigateTo(ViewType.HOME)} className="p-2 rounded-full hover:bg-black/5">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">Meus Favoritos</h2>
          <button className="text-primary font-bold text-sm">Editar</button>
        </header>

        <main className="p-4 flex flex-col gap-6">
          {favoriteProperties.length > 0 ? (
            <div className="flex flex-col gap-6">
              {favoriteProperties.map(property => (
                <PropertyCard 
                  key={property.id} 
                  property={property} 
                  isFavorite={true}
                  onToggleFavorite={toggleFavorite}
                  onClick={(id) => navigateTo(ViewType.DETAILS, id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
              <div className="size-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-gray-400">heart_broken</span>
              </div>
              <h3 className="text-lg font-bold">Nenhum favorito ainda</h3>
              <p className="text-gray-400">Favorite imóveis para vê-los aqui.</p>
              <button 
                onClick={() => navigateTo(ViewType.HOME)}
                className="mt-4 px-6 py-2 bg-primary rounded-full text-background-dark font-bold"
              >
                Explorar Imóveis
              </button>
            </div>
          )}
        </main>
      </div>
    );
  };

  const renderDetails = () => (
    <div className="animate-in slide-in-from-bottom duration-500 pb-28">
      <div className="relative h-[45vh] min-h-[350px]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${selectedProperty.imageUrl}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/30"></div>
        <div className="absolute top-0 left-0 w-full flex items-center justify-between p-4 pt-12">
          <button onClick={() => navigateTo(ViewType.HOME)} className="size-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex gap-2">
            <button className="size-10 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center">
              <span className="material-symbols-outlined">share</span>
            </button>
            <button 
              onClick={() => toggleFavorite(selectedProperty.id)}
              className={`size-10 rounded-full backdrop-blur-md flex items-center justify-center ${favorites.includes(selectedProperty.id) ? 'bg-primary text-background-dark' : 'bg-white/20 text-white'}`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: `'FILL' ${favorites.includes(selectedProperty.id) ? 1 : 0}` }}>favorite</span>
            </button>
          </div>
        </div>
      </div>

      <div className="relative -mt-6 rounded-t-3xl bg-background-light dark:bg-background-dark p-6 shadow-xl">
        <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-6"></div>
        <div className="mb-6">
          <span className="inline-block px-2 py-1 bg-primary/20 text-green-800 dark:text-green-300 text-xs font-bold uppercase rounded mb-2">
            {selectedProperty.status}
          </span>
          <h1 className="text-2xl font-bold text-text-main-light dark:text-white">{selectedProperty.title}</h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
            <span className="material-symbols-outlined text-primary">location_on</span>
            <span>{selectedProperty.location}</span>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-bold text-primary">R$ {selectedProperty.price.toLocaleString('pt-BR')}</h2>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-8">
          {[
            { icon: 'bed', val: selectedProperty.beds, label: 'Quartos' },
            { icon: 'bathtub', val: selectedProperty.baths, label: 'Banh.' },
            { icon: 'square_foot', val: selectedProperty.area, label: 'm²' },
            { icon: 'directions_car', val: selectedProperty.parking, label: 'Vagas' }
          ].map((f, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-3 bg-white dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <span className="material-symbols-outlined text-gray-400 mb-1">{f.icon}</span>
              <span className="font-bold">{f.val}</span>
              <span className="text-[10px] text-gray-400">{f.label}</span>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold mb-3">Sobre o imóvel</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Este incrível imóvel recém reformado conta com acabamentos de alto padrão e uma vista deslumbrante da cidade. 
            Localizado em um dos melhores pontos da região.
          </p>
        </div>

        <div 
          onClick={() => navigateTo(ViewType.PROFILE)}
          className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm cursor-pointer"
        >
          <div 
            className="size-14 rounded-full bg-cover bg-center" 
            style={{ backgroundImage: `url('${MOCK_REALTOR.avatarUrl}')` }}
          />
          <div className="flex-1">
            <h4 className="font-bold">{MOCK_REALTOR.name}</h4>
            <p className="text-xs text-gray-400">{MOCK_REALTOR.role}</p>
          </div>
          <span className="material-symbols-outlined text-primary">chat</span>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-4 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 flex gap-3 z-50">
        <button className="flex-1 h-12 rounded-xl border border-primary text-primary font-bold">Lugar</button>
        <button className="flex-[2] h-12 rounded-xl bg-primary text-background-dark font-bold shadow-lg shadow-primary/20">Agendar Visita</button>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="animate-in slide-in-from-right duration-500 pb-28">
      <header className="sticky top-0 z-30 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
        <button onClick={() => navigateTo(ViewType.HOME)} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold">Perfil do Corretor</h2>
        <div className="size-8"></div>
      </header>

      <div className="flex flex-col items-center p-6 gap-4">
        <div className="relative">
          <div 
            className="size-32 rounded-full border-4 border-white dark:border-gray-800 shadow-xl bg-cover bg-center"
            style={{ backgroundImage: `url('${MOCK_REALTOR.avatarUrl}')` }}
          />
          <div className="absolute bottom-0 right-0 bg-primary text-background-dark px-2 py-1 rounded-full text-xs font-bold border-2 border-white">
            PRO
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold">{MOCK_REALTOR.name}</h1>
          <p className="text-text-sec-light font-medium">{MOCK_REALTOR.role} | {MOCK_REALTOR.creci}</p>
          <div className="flex items-center justify-center gap-1 text-yellow-500 mt-2">
            <span className="material-symbols-outlined text-sm">star</span>
            <span className="text-sm font-bold">{MOCK_REALTOR.rating} ({MOCK_REALTOR.reviewCount} avaliações)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 px-6 py-4">
        {[
          { icon: 'call', label: 'Ligar', color: 'blue' },
          { icon: 'mail', label: 'Email', color: 'purple' },
          { icon: 'share', label: 'Perfil', color: 'gray' }
        ].map((btn, i) => (
          <button key={i} className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm transition-transform active:scale-95">
            <span className={`material-symbols-outlined text-${btn.color}-500`}>{btn.icon}</span>
            <span className="text-xs font-medium">{btn.label}</span>
          </button>
        ))}
      </div>

      <div className="flex px-6 gap-3 py-4 overflow-x-auto no-scrollbar">
        {[
          { val: MOCK_REALTOR.soldCount + '+', label: 'Vendidos' },
          { val: MOCK_REALTOR.experience + ' Anos', label: 'Experiência' },
          { val: MOCK_REALTOR.activeCount, label: 'Ativos' }
        ].map((stat, i) => (
          <div key={i} className="flex-1 min-w-[100px] flex flex-col items-center p-4 bg-white dark:bg-surface-dark rounded-2xl border border-primary/10 shadow-sm">
            <span className="text-xl font-extrabold">{stat.val}</span>
            <span className="text-xs text-text-sec-light">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="px-6 py-4">
        <h3 className="font-bold mb-2">Sobre</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{MOCK_REALTOR.about}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {MOCK_REALTOR.tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 bg-primary/10 text-primary font-bold text-xs rounded-full">{tag}</span>
          ))}
        </div>
      </div>

      {/* Botão de Contato ajustado para Mobile */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-4 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 z-50">
        <button className="w-full h-12 bg-primary text-background-dark font-bold rounded-full flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98] transition-all">
          <span className="material-symbols-outlined">chat</span>
          Entrar em Contato
        </button>
      </div>
    </div>
  );

  const renderFilters = () => (
    <div className="fixed inset-0 z-[100] bg-background-light dark:bg-background-dark animate-in slide-in-from-bottom duration-500 flex flex-col">
      <header className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
        <button onClick={() => navigateTo(ViewType.HOME)} className="text-sm font-bold text-gray-400">Limpar</button>
        <h2 className="text-lg font-bold">Filtros</h2>
        <button onClick={() => navigateTo(ViewType.HOME)} className="size-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <span className="material-symbols-outlined">close</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
        <div>
          <div className="relative">
            <span className="absolute left-3 top-3 text-primary material-symbols-outlined">location_on</span>
            <input 
              type="text" 
              defaultValue="Jardins, São Paulo" 
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-surface-dark border-none rounded-xl ring-1 ring-gray-100 focus:ring-primary shadow-sm font-medium"
            />
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-4">Tipo de Imóvel</h3>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {['Casa', 'Apartamento', 'Comercial', 'Terreno'].map((t, i) => (
              <button key={i} className={`px-5 py-2 rounded-lg text-sm font-bold whitespace-nowrap ${i === 1 ? 'bg-primary text-background-dark' : 'bg-gray-100 dark:bg-gray-800'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-4">
            <h3 className="font-bold">Faixa de Preço</h3>
            <span className="text-primary text-sm font-bold">R$ 2.500 - R$ 8.000</span>
          </div>
          <div className="relative h-12 flex items-center">
            <div className="absolute w-full h-1 bg-gray-200 rounded-full"></div>
            <div className="absolute left-[20%] right-[30%] h-1 bg-primary"></div>
            <div className="absolute left-[20%] size-6 bg-white border border-gray-200 rounded-full shadow transform -translate-x-1/2"></div>
            <div className="absolute right-[30%] size-6 bg-white border border-gray-200 rounded-full shadow transform translate-x-1/2"></div>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-4">Comodidades</h3>
          <div className="flex flex-wrap gap-2">
            {['Piscina', 'Academia', 'Pet Friendly', 'Portaria 24h', 'Churrasqueira'].map((c, i) => (
              <button key={i} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 border ${[0, 3].includes(i) ? 'bg-primary/10 border-primary text-primary' : 'border-gray-100 dark:border-gray-800'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </main>

      <div className="p-6 border-t border-gray-100 dark:border-gray-800">
        <button 
          onClick={() => navigateTo(ViewType.HOME)}
          className="w-full h-14 bg-primary text-background-dark font-bold rounded-xl flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">search</span>
          Ver 124 Imóveis
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentView) {
      case ViewType.WELCOME: return renderWelcome();
      case ViewType.HOME: return renderHome();
      case ViewType.FAVORITES: return renderFavorites();
      case ViewType.DETAILS: return renderDetails();
      case ViewType.PROFILE: return renderProfile();
      case ViewType.FILTERS: return renderFilters();
      default: return renderHome();
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen shadow-2xl bg-background-light dark:bg-background-dark relative overflow-x-hidden">
      {renderContent()}

      {/* Persistent Bottom Nav ajustado para Mobile */}
      {[ViewType.HOME, ViewType.FAVORITES].includes(currentView) && (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/95 dark:bg-surface-dark/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 pb-safe pt-2 z-40 rounded-t-3xl shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
          <div className="flex justify-around items-center px-2 pb-4">
            <button 
              onClick={() => { navigateTo(ViewType.HOME); setActiveTab('home'); }}
              className={`flex flex-col items-center gap-1 p-2 transition-colors ${activeTab === 'home' ? 'text-primary' : 'text-gray-400'}`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: `'FILL' ${activeTab === 'home' ? 1 : 0}` }}>home</span>
              <span className="text-[10px] font-bold">Início</span>
            </button>
            <button 
              onClick={() => { navigateTo(ViewType.FAVORITES); setActiveTab('favs'); }}
              className={`flex flex-col items-center gap-1 p-2 transition-colors ${activeTab === 'favs' ? 'text-primary' : 'text-gray-400'}`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: `'FILL' ${activeTab === 'favs' ? 1 : 0}` }}>favorite</span>
              <span className="text-[10px] font-bold">Favoritos</span>
            </button>
            <button className="flex flex-col items-center gap-1 p-2 text-gray-400">
              <span className="material-symbols-outlined">chat</span>
              <span className="text-[10px] font-bold">Mensagens</span>
            </button>
            <button 
              onClick={() => { navigateTo(ViewType.PROFILE); setActiveTab('profile'); }}
              className={`flex flex-col items-center gap-1 p-2 transition-colors ${activeTab === 'profile' ? 'text-primary' : 'text-gray-400'}`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: `'FILL' ${activeTab === 'profile' ? 1 : 0}` }}>person</span>
              <span className="text-[10px] font-bold">Perfil</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
};

export default App;
