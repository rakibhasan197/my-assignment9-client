import React from 'react';

const GetCommentForm = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`);
  const comments = await res.json();

  return (
    <div className="mt-8">
      <h2 className="mb-6 text-2xl font-bold">Comments</h2>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md"
          >
            <div>
              <h1 className="text-lg font-semibold text-gray-800">
                {comment.username}
              </h1>

              <span className="text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </span>
            </div>

            <p className="mt-3 leading-relaxed text-gray-700">
              {comment.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetCommentForm;