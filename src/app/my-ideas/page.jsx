"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

const MyIdeasPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const userEmail = session?.user?.email;
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isPending) return;
    if (!userEmail) return;
  

    const fetchMyIdeas = async () => {
      setLoading(true);
      setError("");
      try {
          const {data: tokenData} = await authClient.token()
          console.log(tokenData)
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/my-ideas?email=${encodeURIComponent(userEmail)}`,{
            headers: {
              authorization: `Bearer ${tokenData?.token}`
            }
          } 
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.message || "Failed to load your ideas");
        }

        setIdeas(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setError(error.message || "Failed to load your ideas");
        toast.error(error.message || "Failed to load your ideas");
      } finally {
        setLoading(false);
      }
    };

    fetchMyIdeas();
  }, [isPending, userEmail]);

  if (isPending || (userEmail && loading)) {
    return (
      <div className="text-center py-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">
        My Ideas
      </h1>

      {!session?.user ? (
        <div className="text-center text-gray-500">
          Please login to see your ideas.
          <div className="mt-4">
            <Link className="text-blue-600 font-semibold" href="/login">
              Go to login
            </Link>
          </div>
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : ideas.length === 0 ? (
        <p className="text-center text-gray-500">
          You have not added any ideas yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((idea) => (
            <div
              key={idea._id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <Image
                src={idea.imageURL || "/placeholder.jpg"}
                alt={idea.title}
                width={400}
                height={200}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">
                <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                  {idea.category}
                </span>

                <h2 className="text-xl font-bold mt-3">
                  {idea.title}
                </h2>

                <p className="text-gray-600 mt-2">
                  {idea.shortDescription}
                </p>

                <p className="mt-3 font-semibold text-green-600">
                  ${idea.estimatedBudget}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyIdeasPage;
