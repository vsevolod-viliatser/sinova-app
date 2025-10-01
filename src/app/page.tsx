"use client";

import { useDogBreeds, useCatBreeds, useAllBreeds } from "@/hooks/useBreeds";
import BreedCard from "@/components/BreedCard";
import shuffle from "@/adds/shuffle";
import AutoComplete from "@/components/AutoComplete";
import { Breed } from "@/types/breed";
export default function HomePage() {
  const { data: dogs, isLoading: dogsLoading, error: dogsError } = useDogBreeds();
  const { data: cats, isLoading: catsLoading, error: catsError } = useCatBreeds();
  const {data:allBreeds}=useAllBreeds()
  if (dogsLoading || catsLoading) {
    return <p className="p-4">Loading breeds...</p>;
  }

  if (dogsError || catsError) {
    return <p className="p-4 text-red-500">Failed to load breeds.</p>;
  }

  let breeds: Breed[] = [];

  if (dogs && cats) {
    breeds = shuffle([...dogs, ...cats]).slice(0, 6);
  }
  
  return (
    <main className="container mx-auto px-4 py-8">
        {/* Search */}
        <AutoComplete breeds={allBreeds ?? []}  />

      <h1 className="text-3xl font-bold mb-6">Random Cat & Dog Breeds</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {breeds.map((breed) => (
          <BreedCard key={breed.id} breed={breed} type={breed.type} />
        ))}
      </div>
    </main>
  );
}
