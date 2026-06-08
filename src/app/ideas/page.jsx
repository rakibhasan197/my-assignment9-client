"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";

export default function IdeasPage() {
  const [ideas, setIdeas] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchIdeas = async () => {
    setLoading(true); // 🔥 start loading

    try {
      const params = new URLSearchParams();

      if (search) params.append("search", search);
      if (category) params.append("category", category);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ideas?${params.toString()}`
      );

      const data = await res.json();
      setIdeas(data);
    } finally {
      setLoading(false); // 🔥 stop loading
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchIdeas();
    }, 400);

    return () => clearTimeout(timer);
  }, [search, category]);

  return (
    <div className="container mx-auto px-4 py-10">

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center mb-6">
        Explore Startup Ideas
      </h1>

      {/* SEARCH + CATEGORY */}
      <div className="mb-8 grid gap-4 md:grid-cols-2">

        <input
          type="text"
          placeholder="Search ideas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded border px-3 py-2"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded border px-3 py-2"
        >
          <option value="">All Category</option>
          <option value="AI">AI</option>
          <option value="Startup">Startup</option>
          <option value="App">App</option>
          <option value="Web">Web</option>
        </select>

      </div>

      {/* LOADING UI */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Spinner size="lg" />
        </div>
      ) : ideas.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-700">
            No Ideas Found 😢
          </h2>
          <p className="text-gray-500 mt-2">
            Try another search or category
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {ideas.map((idea) => (
            <div key={idea._id} className="rounded-xl bg-white shadow p-4">

              <Image
                src={idea.imageURL || "/placeholder.jpg"}
                width={400}
                height={200}
                className="h-52 w-full object-cover rounded"
                alt={idea.title}
              />

              <h2 className="mt-3 text-xl font-bold">
                {idea.title}
              </h2>

              <p className="text-gray-500">
                {idea.category}
              </p>

              <Link href={`/ideas/${idea._id}`}>
                <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded">
                  View
                </button>
              </Link>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}