export interface Breed {
    id: string;
    name: string;
    image?: {
      url: string;
    };
    temperament?: string;
    life_span?: string;
    origin?: string;
    description?: string; // only cat API 
    type:'dog'|'cat'
  }
  