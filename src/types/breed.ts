export interface BreedImage {
  url: string;
}

export interface Breed {
  id: string;
  name: string;
  type: "dog" | "cat";
  life_span?: string;
  temperament?: string;
  origin?: string;
  description?: string; // only cat
  image?: BreedImage;
}

// Dog API response
export interface DogApiBreed {
  id: number;
  name: string;
  life_span?: string;
  temperament?: string;
  origin?: string;
  image?: BreedImage;
}

// Cat API response
export interface CatApiBreed {
  id: string;
  name: string;
  life_span?: string;
  temperament?: string;
  origin?: string;
  description?: string;
  image?: BreedImage;
}
