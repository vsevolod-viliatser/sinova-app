"use client";

import { useParams } from "next/navigation";
import { useBreed, useBreedImages } from "@/hooks/useBreeds";
import { BreedImage } from "@/types/breed";
import Image from "next/image";
export default function BreedPage() {
  const { id, type } = useParams() as { id: string; type: "dog" | "cat" };
  const { data: breed, isLoading } = useBreed(type, id);
  const { data: images } = useBreedImages(type, id);

  if (isLoading || !breed) return <p className="p-4">Loading breed...</p>;

  return (
    <main className="container mx-auto px-4 py-8">
      <button
        onClick={() => history.back()}
        className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-4">{breed.name}</h1>
      <p className="mb-2">Origin: {breed.origin ?? "Unknown"}</p>
      <p className="mb-2">Life span: {breed.life_span}</p>
      {breed.temperament && <p className="mb-2">Temperament: {breed.temperament}</p>}
      {breed.description && <p className="mb-4">{breed.description}</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images?.map((img: BreedImage, i: number) => (
          <Image
            key={i}
            src={img.url}
            alt={breed.name}
            className="rounded-xl object-cover w-full h-48"
          />
        ))}
      </div>
    </main>
  );
}
