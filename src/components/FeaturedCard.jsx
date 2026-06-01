import React from 'react';
import IdeasCard from './IdeasCard';


const FeaturedCard = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured`);
  const ideas = await res.json();
   
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Trending Ideas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          ideas.map((idea)=> <IdeasCard key={idea._id} idea={idea}></IdeasCard>)
        }
      </div>
     
    </div>
  );
};

export default FeaturedCard;