
export enum ViewType {
  WELCOME = 'welcome',
  HOME = 'home',
  FAVORITES = 'favorites',
  DETAILS = 'details',
  PROFILE = 'profile',
  FILTERS = 'filters'
}

export interface Property {
  id: string;
  title: string;
  type: 'Casa' | 'Apartamento' | 'Loft' | 'Studio' | 'Comercial';
  price: number;
  location: string;
  neighborhood: string;
  beds: number;
  baths: number;
  parking: number;
  area: number;
  imageUrl: string;
  agent: {
    name: string;
    avatarUrl: string;
    agency: string;
  };
  featured?: boolean;
  status: 'Venda' | 'Aluguel';
  description?: string;
}

export interface Realtor {
  id: string;
  name: string;
  role: string;
  creci: string;
  rating: number;
  reviewCount: number;
  avatarUrl: string;
  experience: number;
  soldCount: number;
  activeCount: number;
  about: string;
  tags: string[];
}
