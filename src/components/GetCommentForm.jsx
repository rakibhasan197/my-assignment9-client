import React from 'react';
import { EditCommentModal } from './EditCommentModal';

const GetCommentForm = async ({ ideaId }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/comments/${ideaId}`,
    {
      cache: "no-store",
    }
  );
  const comments = await res.json();
  const filteredComments = Array.isArray(comments) ? comments : [];

  return (
    <div className="mt-8">
      <h2 className="mb-6 text-2xl font-bold">Comments</h2>

      <div className="space-y-4">
        {filteredComments.length === 0 && (
          <p className="text-gray-500">No comments yet.</p>
        )}

        {filteredComments.map((comment) => (
          <div
            key={comment._id}
            className=" flex justify-between items-center gap-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md"
          >
            <div>
              <h1 className="text-lg font-semibold text-gray-800">
                {comment.username}
              </h1>

              <span className="text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </span>
              <p className="mt-3 leading-relaxed text-gray-700">
              {comment.comment}
            </p>
            </div>

            
           <div>
              <EditCommentModal comment={comment} />
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default GetCommentForm;
