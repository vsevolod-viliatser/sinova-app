"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Breed } from "@/types/breed";

interface Props {
  breeds: Breed[];
}

export default function AutoComplete({ breeds }: Props) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<Breed[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (query.trim() === "") {
      setFiltered([]);
      return;
    }

    const q = query.toLowerCase();
    setFiltered(
      breeds.filter((b) => b.name.toLowerCase().includes(q)).slice(0, 5)
    );
  }, [query, breeds]);

  return (
    <div className="relative w-full max-w-md mb-6">
      <input
        type="text"
        placeholder="Search breeds..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {filtered.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto">
          {filtered.map((b) => (
            <li
              key={b.id}
              onClick={() => router.push(`/${b.type}/${b.id}`)}
              className="px-4 py-2 cursor-pointer hover:bg-blue-100 text-black"
            >
              {b.name} ({b.type})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
