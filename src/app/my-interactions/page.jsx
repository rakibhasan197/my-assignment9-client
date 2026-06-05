import React from 'react';

const MyInteractionsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`);
  const comments = await res.json();

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">My Interactions</h1>
      <div className="space-y-4">
  {comments.map((comment) => (
    <div
      key={comment._id}
      className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            {comment.username}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600">
          Comment
        </div>
      </div>

      <div className="mt-4 border-t border-gray-100 pt-4">
        <p className="leading-7 text-gray-700">
          {comment.comment}
        </p>
      </div>
    </div>
  ))}
</div>
    </div>
  );
};

export default MyInteractionsPage;