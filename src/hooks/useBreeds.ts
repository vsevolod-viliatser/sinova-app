import { useQuery } from "@tanstack/react-query";
import { dogApi, catApi } from "@/lib/api";
import { Breed, DogApiBreed, CatApiBreed, BreedImage } from "@/types/breed";

// Utility to pick random items
function getRandomItems<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Single breed hook
export function useBreed(type: "dog" | "cat", id: string) {
  return useQuery<Breed | undefined>({
    queryKey: ["breed", type, id],
    queryFn: async () => {
      if (type === "dog") {
        const res = await dogApi.get<DogApiBreed[]>("/breeds");
        const breedData = res.data.find(b => String(b.id) === id);
        if (!breedData) return undefined;

        return {
          ...breedData,
          id: String(breedData.id),
          type,
        };
      } else {
        const res = await catApi.get<CatApiBreed[]>("/breeds");
        const breedData = res.data.find(b => b.id === id);
        if (!breedData) return undefined;

        return {
          ...breedData,
          id: String(breedData.id),
          type,
        };
      }
    },
  });
}

// Fetch all breeds (for autocomplete)
export function useAllBreeds() {
  return useQuery<Breed[]>({
    queryKey: ["allBreeds"],
    queryFn: async () => {
      const dogRes = await dogApi.get<DogApiBreed[]>("/breeds");
      const catRes = await catApi.get<CatApiBreed[]>("/breeds");

      const dogs: Breed[] = dogRes.data.map(b => ({
        id: String(b.id),
        name: b.name,
        life_span: b.life_span,
        temperament: b.temperament,
        origin: b.origin,
        image: b.image,
        type: "dog",
      }));

      const cats: Breed[] = catRes.data.map(b => ({
        id: String(b.id),
        name: b.name,
        life_span: b.life_span,
        temperament: b.temperament,
        origin: b.origin,
        description: b.description,
        image: b.image,
        type: "cat",
      }));

      const allBreeds = [...dogs, ...cats];

      const withImages = await Promise.all(
        allBreeds.map(async breed => {
          if (breed.image?.url) return breed;

          const api = breed.type === "dog" ? dogApi : catApi;
          const imgRes = await api.get<BreedImage[]>("/images/search", {
            params: { breed_id: breed.type === "dog" ? Number(breed.id) : breed.id, limit: 1 },
          });

          return { ...breed, image: imgRes.data[0] };
        })
      );

      return withImages;
    },
  });
}

// Random 6 dogs
export function useDogBreeds() {
  return useQuery<Breed[]>({
    queryKey: ["dogBreeds"],
    queryFn: async () => {
      const res = await dogApi.get<DogApiBreed[]>("/breeds");
      const randomBreeds = getRandomItems(res.data, 6).map(b => ({
        id: String(b.id),
        name: b.name,
        life_span: b.life_span,
        temperament: b.temperament,
        origin: b.origin,
        image: b.image,
        type: "dog" as const,
      }));

      const withImages = await Promise.all(
        randomBreeds.map(async breed => {
          if (breed.image?.url) return breed;

          const imgRes = await dogApi.get<BreedImage[]>("/images/search", {
            params: { breed_id: Number(breed.id), limit: 1 },
          });

          return { ...breed, image: imgRes.data[0] };
        })
      );

      return withImages;
    },
  });
}

// Random 6 cats
export function useCatBreeds() {
  return useQuery<Breed[]>({
    queryKey: ["catBreeds"],
    queryFn: async () => {
      const res = await catApi.get<CatApiBreed[]>("/breeds");
      const randomBreeds = getRandomItems(res.data, 6).map(b => ({
        id: String(b.id),
        name: b.name,
        life_span: b.life_span,
        temperament: b.temperament,
        origin: b.origin,
        description: b.description,
        image: b.image,
        type: "cat" as const,
      }));

      const withImages = await Promise.all(
        randomBreeds.map(async breed => {
          if (breed.image?.url) return breed;

          const imgRes = await catApi.get<BreedImage[]>("/images/search", {
            params: { breed_id: breed.id, limit: 1 },
          });

          return { ...breed, image: imgRes.data[0] };
        })
      );

      return withImages;
    },
  });
}

// Breed images
export function useBreedImages(type: "dog" | "cat", breedId: string) {
  return useQuery<BreedImage[]>({
    queryKey: ["breedImages", type, breedId],
    queryFn: async () => {
      const api = type === "dog" ? dogApi : catApi;
      const res = await api.get<BreedImage[]>("/images/search", {
        params: { breed_id: type === "dog" ? Number(breedId) : breedId, limit: 6 },
      });
      return res.data;
    },
  });
}
