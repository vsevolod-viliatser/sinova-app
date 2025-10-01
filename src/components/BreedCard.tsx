import Link from "next/link";
import Image from "next/image";
import { Breed } from "@/types/breed";

export default function BreedCard({
  breed,
  type,

}: {
  breed: Breed;
  type: "dog" | "cat";
}) {
  return (
    <Link
      href={`/${type}/${breed.id}`}
      className="block rounded-2xl shadow hover:shadow-lg transition p-4"
    >
      <div className="relative w-full h-48">
        <Image
          src={breed.image?.url || "/placeholder.png"}
          alt={breed.name}
          fill
          className="object-cover rounded-xl"
        />
      </div>
      <h2 className="mt-2 text-lg font-semibold">{breed.name}</h2>
    </Link>
  );
}
