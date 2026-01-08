
import React from 'react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClick: (id: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  isFavorite, 
  onToggleFavorite,
  onClick
}) => {
  return (
    <div 
      className="group relative flex flex-col rounded-2xl bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer"
      onClick={() => onClick(property.id)}
    >
      <div className="relative h-56 w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
          style={{ backgroundImage: `url('${property.imageUrl}')` }}
        />
        {property.featured && (
          <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-text-main-light dark:text-white uppercase tracking-wider shadow-sm">
            Destaque
          </div>
        )}
        <div className="absolute top-3 right-3">
          <button 
            className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-colors ${
              isFavorite ? 'bg-primary text-background-dark' : 'bg-white/30 text-white hover:bg-white hover:text-red-500'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(property.id);
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px', fontVariationSettings: `'FILL' ${isFavorite ? 1 : 0}` }}>
              favorite
            </span>
          </button>
        </div>
        <div className="absolute bottom-3 left-3 flex gap-2">
          <div className="bg-primary px-3 py-1 rounded-lg text-sm font-bold text-background-dark shadow-sm">
            R$ {property.price.toLocaleString('pt-BR')} 
            {property.status === 'Aluguel' && <span className="text-xs font-normal opacity-80"> /mês</span>}
          </div>
        </div>
      </div>
      <div className="flex flex-col p-4 gap-3">
        <div>
          <h3 className="text-lg font-bold text-text-main-light dark:text-text-main-dark leading-tight mb-1">
            {property.title}
          </h3>
          <div className="flex items-center gap-1 text-text-sec-light dark:text-text-sec-dark text-sm">
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>location_on</span>
            <p>{property.location}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 py-2 border-t border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-text-sec-light dark:text-text-sec-dark" style={{ fontSize: '20px' }}>bed</span>
            <span className="text-sm font-semibold text-text-main-light dark:text-text-main-dark">{property.beds}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-text-sec-light dark:text-text-sec-dark" style={{ fontSize: '20px' }}>bathtub</span>
            <span className="text-sm font-semibold text-text-main-light dark:text-text-main-dark">{property.baths}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-text-sec-light dark:text-text-sec-dark" style={{ fontSize: '20px' }}>square_foot</span>
            <span className="text-sm font-semibold text-text-main-light dark:text-text-main-dark">{property.area}m²</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <div 
              className="h-8 w-8 rounded-full bg-gray-300 bg-cover bg-center" 
              style={{ backgroundImage: `url('${property.agent.avatarUrl}')` }}
            />
            <span className="text-xs font-medium text-text-sec-light dark:text-text-sec-dark">{property.agent.name}</span>
          </div>
          <button className="text-primary text-sm font-bold hover:underline">Ver detalhes</button>
        </div>
      </div>
    </div>
  );
};
