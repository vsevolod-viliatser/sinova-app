import { useQuery } from "@tanstack/react-query";
import { dogApi, catApi } from "@/lib/api";
import { Breed } from "@/types/breed";

function getRandomItems<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function useBreed(type: "dog" | "cat", id: string) {
  return useQuery<Breed | undefined>({
    queryKey: ["breed", type, id],
    queryFn: async () => {
      const api = type === "dog" ? dogApi : catApi;
      const res = await api.get("/breeds");
      const breed = res.data.find((b: any) =>
        type === "dog" ? String(b.id) === id : b.id === id
      );
      return breed ? { ...breed, id: String(breed.id), type } : undefined;
    },
  });
}
export function useAllBreeds() {
  return useQuery<Breed[]>({
    queryKey: ["allBreeds"],
    queryFn: async () => {
      const dogRes = await dogApi.get("/breeds");
      const dogs: Breed[] = dogRes.data.map((b: any) => ({
        ...b,
        id: String(b.id),
        type: "dog" as const,
      }));

      const catRes = await catApi.get("/breeds");
      const cats: Breed[] = catRes.data.map((b: any) => ({
        ...b,
        id: String(b.id),
        type: "cat" as const,
      }));

      const allBreeds = [...dogs, ...cats];

      
      const withImages = await Promise.all(
        allBreeds.map(async (breed) => {
          if (breed.image?.url) return breed;

          const api = breed.type === "dog" ? dogApi : catApi;
          const imgRes = await api.get("/images/search", {
            params: { breed_id: breed.type === "dog" ? Number(breed.id) : breed.id, limit: 1 },
          });

          return { ...breed, image: imgRes.data[0] };
        })
      );

      return withImages as Breed[]; // <-- cast to Breed[]
    },
  });
}

export function useDogBreeds() {
  return useQuery({
    queryKey: ["dogBreeds"],
    queryFn: async () => {
      const res = await dogApi.get("/breeds");
      const breeds: Breed[] = res.data.map((b: any) => ({
        ...b,
        id: String(b.id),
        type: "dog" as const,
      }));

      const randomBreeds = getRandomItems(breeds, 6);

      const withImages = await Promise.all(
        randomBreeds.map(async (breed) => {
          if (breed.image?.url) return breed;
          const imgRes = await dogApi.get("/images/search", {
            params: { breed_id: breed.id, limit: 1 },
          });
          return { ...breed, image: imgRes.data[0] };
        })
      );

      return withImages;
    },
  });
}

export function useCatBreeds() {
  return useQuery({
    queryKey: ["catBreeds"],
    queryFn: async () => {
      const res = await catApi.get("/breeds");
      const breeds: Breed[] = res.data.map((b: any) => ({
        ...b,
        id: String(b.id),
        type: "cat" as const,
      }));

      const randomBreeds = getRandomItems(breeds, 6);

      const withImages = await Promise.all(
        randomBreeds.map(async (breed) => {
          if (breed.image?.url) return breed;
          const imgRes = await catApi.get("/images/search", {
            params: { breed_id: breed.id, limit: 1 },
          });
          return { ...breed, image: imgRes.data[0] };
        })
      );

      return withImages;
    },
  });
}

export function useBreedImages(type: "dog" | "cat", breedId: string) {
  return useQuery({
    queryKey: ["breedImages", type, breedId],
    queryFn: async () => {
      const api = type === "dog" ? dogApi : catApi;
      const res = await api.get("/images/search", {
        params: { breed_id: type === "dog" ? Number(breedId) : breedId, limit: 6 },
      });
      return res.data;
    },
  });
}
