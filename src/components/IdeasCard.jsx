import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const IdeasCard = ({idea}) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
  <Image
    src={idea.imageURL || "/placeholder.jpg"}
    alt={idea.title}
    width={400}
    height={200}
    className="w-full h-56 object-cover"
  />

  <div className="p-5 space-y-3">
    <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-600 rounded-full">
      {idea.category}
    </span>

    <h3 className="text-xl font-bold line-clamp-1">
      {idea.title}
    </h3>

    <p className="text-gray-600 line-clamp-2">
      {idea.shortDescription}
    </p>

    <div className="flex justify-between items-center pt-2">
      <div>
        <p className="text-sm text-gray-500">
          Estimated Budget
        </p>
        <p className="font-bold text-lg text-green-600">
          ${idea.estimatedBudget}
        </p>
      </div>

      <Link href="/ideas">
        <Button color="primary">
          View Details
        </Button>
      </Link>
    </div>
  </div>
</div>
  );
};

export default IdeasCard;