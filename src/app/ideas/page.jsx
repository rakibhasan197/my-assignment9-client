import Image from "next/image";
import Link from "next/link";
import React from "react";

const ideasFetch = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideas`);
  const ideas = await res.json();

  return ideas;
};

const IdeasPage = async () => {
  const ideas = await ideasFetch();

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Explore Startup Ideas
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.map((idea) => (
          <div
            key={idea._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
          <Image
              src={idea.imageURL || "/placeholder.jpg"}
              alt={idea.title}
              width={400}
              height={200}
              className="w-full h-56 object-cover"
            />

            <div className="p-5 space-y-3">
           
              <span className="inline-block bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full">
                {idea.category}
              </span>

             
              <h2 className="text-xl font-bold text-gray-800">
                {idea.title}
              </h2>

              <p className="text-gray-600">
                💰 Budget: <span className="font-bold">${idea.estimatedBudget}</span>
              </p>

              
              <p className="text-gray-500 text-sm">
                📅 {new Date(idea.createdAt).toLocaleDateString()}
              </p>

          
              <Link href={`/ideas/${idea._id}`}>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IdeasPage;