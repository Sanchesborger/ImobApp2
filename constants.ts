
import { Property, Realtor } from './types';

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Apartamento Moderno',
    type: 'Apartamento',
    price: 2500,
    status: 'Aluguel',
    location: 'Vila Mariana, São Paulo',
    neighborhood: 'Vila Mariana',
    beds: 2,
    baths: 2,
    parking: 1,
    area: 70,
    featured: true,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_A_RWxvTi0vF9sg-O-a3vBseNvRujlsPFhcN9PlYiSXThrObirEL3GwovfsQktgIvs083pt7aFMThRTg10ov2HfhjTeiEPmmA0DqIkry20Uq62EodPSuNRp7MWGMwvRhRzSJf8VL_Yk6rUHVRdxsa4TpF-nVdnbZWlboHZ-N8DmPlQZ9KP5GgdOYAnqE7GO0t8um5wo7k9lrHw1mzvFVA_Ix1Pus_jW1Hrj5lkZ0VQrAgvKtzaafeonK_P743_3oIOFfud5xQolc',
    agent: {
      name: 'Imobiliária Prime',
      agency: 'Imobiliária Prime',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCY3s7PQRLjb-1ZJK6uZ-Ett5BpxkJWg-eToc_9er_8OwFAKtelOJfLtQorr8D8gE3bStlDu0NXif86fZOAt9g09oqTgIEzF4falfLABnBQ3_x8Tuoxt6zVptx8HuZrkK97F7RTNhErqtN0htBbgJacFNnt42EoxRvNVrpZu9wbkPoFOOT-s4Bu_--cvwMT0TudlhKM_4E4zhYLFMqP85Bo0HotJ64vwhCgcgp5kP_tzAtT3IA__4XswQu54lTNLq9x7mvndWCDn0w'
    }
  },
  {
    id: '2',
    title: 'Casa em Condomínio',
    type: 'Casa',
    price: 850000,
    status: 'Venda',
    location: 'Pinheiros, São Paulo',
    neighborhood: 'Pinheiros',
    beds: 3,
    baths: 3,
    parking: 2,
    area: 120,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMwHLwBWxWPuy3HN53etCdru2bsmJWpFhqUGU0-v-7kILkNvJgZ3O1fgdrWYKcYKq8qr5vMhtVsSD2l6f1KqAJBFKl91oID7YzPM3y3wgk7lVr4KCFk1vvH0BAXlwy155PHQNGr9PffGEEPPyWMFY7h-kaBFzdJArhsaOMu0BBsjaLrmAsEj1MS5dptcqsH7AYPApVhIwJMSK46A4rSSLqu03KJ0CPRFNNnXM9xSyUTqR9XoDsTccyn8aApQTWC8ijXju5NXci1CM',
    agent: {
      name: 'Ana Corretora',
      agency: 'Independente',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7nygbPYdp4tlUdGIfCHs2Rho7uyP4bJ-YmXJKJFdD27gGceLAjL_R1yIeXoZmgx1A9HxUK2jo-HgiGr7TNOnlUPyvYtvSFbGfd4HAMZzRwQMlTGVwPplmUk0EABwSkVgbAo_H5-C5W45-OoWCE1fqiuTblc3bSjvX-5Jlj-qt6Hq3f51kc2gupASuSrJ6nOzGOwijhw1GSh0YodW337LDC0wOv0XSY-GyIJ0y6pSSmL60qpqkQyjIMUzu3U4FSQt0y7BLwWQWsgE'
    }
  },
  {
    id: '3',
    title: 'Loft Industrial',
    type: 'Loft',
    price: 3200,
    status: 'Aluguel',
    location: 'Jardins, São Paulo',
    neighborhood: 'Jardins',
    beds: 1,
    baths: 1,
    parking: 1,
    area: 55,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuTiK-nyndBnIUPPsFT8_vBdsOQbYTOS0ljERZBgA0Be4av_Z-H51mREUsTzpHyM8CSKYZGECJ89k85ZC7pg-s9ojOUFc6fzfOb1wt6QQkHMjEW-5Jr0sri9LgUwtv8I7nMNLcni-mNtKemDrHHM--5H7LEvHotNa-CijkVHwfB2rRZRh_gLmQyz6hwPsMR_OOG2m1XexVl5N5gkLpAqUTIiUs3JbArTdY78K6GUdY73VyzyiJqk9L8xmmncbD2GfNMsxFcJM_WXI',
    agent: {
      name: 'João Silva',
      agency: 'Imob Top',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDC8crniWUNq4UyB3DfRC46R8l2IF_y-DtbAuojgwWyYT3Jgt9UENUUecqTz-39l3nO2z7DYY0Z4hEEDEEvUyKs9JSUnUFwboLOtGRhh45oIRhxRNTHTxuGQOL1rtF4CcYDwmKsQfZM2nEYcAMeYG3jtVea2YMKe4c4rq6yKYGSfRPMwyPeJqaZfcndUEO3V89ril_rAd9ZRK0oAThapZ8vCHAitXOABLzawQQJ5IyccCfYIChwUm7cF7-NJQrjqOuauIjZvNLAN0I'
    }
  },
  {
    id: '4',
    title: 'Studio Compacto - Centro',
    type: 'Studio',
    price: 380000,
    status: 'Venda',
    location: 'Av. Ipiranga, São Paulo',
    neighborhood: 'Centro',
    beds: 1,
    baths: 1,
    parking: 0,
    area: 35,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2qlkAJiWjjRfuwHFdceAc9Ssj40azqOTzswJYj4QnLNSRho68lAB-P4nGJpjnRIwWhPce_iu3T3RKdkU-QrT2QvhO6nx2QxtBj8tJXRmADjSYKi7Yd1IllULbpNJXSoGKW69TgmWWkKPMdet43cL7GxTKvqeca6gWtLm5WRm6rHlFIsoJCga3yK6m4Y8M2-bo7xk-20YFwexvRUZL4GS_oErxWEv0YCjWZYvXaazxUkQDFeR0BiNmVmOXx73W6zJ3ybIkTO8eJKE',
    agent: {
      name: 'João Silva',
      agency: 'Imob Top',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDC8crniWUNq4UyB3DfRC46R8l2IF_y-DtbAuojgwWyYT3Jgt9UENUUecqTz-39l3nO2z7DYY0Z4hEEDEEvUyKs9JSUnUFwboLOtGRhh45oIRhxRNTHTxuGQOL1rtF4CcYDwmKsQfZM2nEYcAMeYG3jtVea2YMKe4c4rq6yKYGSfRPMwyPeJqaZfcndUEO3V89ril_rAd9ZRK0oAThapZ8vCHAitXOABLzawQQJ5IyccCfYIChwUm7cF7-NJQrjqOuauIjZvNLAN0I'
    }
  }
];

export const MOCK_REALTOR: Realtor = {
  id: 'ricardo',
  name: 'Ricardo Silva',
  role: 'Consultor de Luxo',
  creci: '12345-J',
  rating: 4.9,
  reviewCount: 128,
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLmXbru_-uT9M3-_DJFk9yzxRUAqjL_JDSFw8GixmH7-llKiCALXkFEGNauXrym-OGkQye-FlriD00ZThPeDCaINcs7lnrNQePUCKVeMsO0uCpB0JfPAfizDbrpcdbr9yRrCLGOB7oixofufZMbH3Y5XupZrK53tSzrPZa6Juur_zyqZ5DnK8FlBa4RAuaQVxIZI1mF7BhTVqVokKOIwl-_I7OBFS4CKUp5hGTNqQLZl50cWoH5Pg3QHGRe0cLOi5ur6JZJ84eBSg',
  experience: 10,
  soldCount: 120,
  activeCount: 24,
  about: 'Especialista em encontrar o lar perfeito na região da Zona Sul com mais de 10 anos de experiência no mercado de alto padrão. Focado em transparência e agilidade para garantir o melhor negócio.',
  tags: ['Luxo', 'Zona Sul', 'Investimentos', 'Aluguel']
};
