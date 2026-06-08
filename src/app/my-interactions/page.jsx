import React, { Suspense } from 'react';
import CommentsList from '@/components/CommentsList';
import { LoadingSpinner } from '@/components/LoadingSpinner';

const MyInteractionsPage = async () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">My Interactions</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <CommentsList />
      </Suspense>
    </div>
  );
};

export default MyInteractionsPage;