import CommentForm from "@/components/CommentForm";
import { DeleteModal } from "@/components/DeleteModal";
import GetCommentForm from "@/components/GetCommentForm";
import Image from "next/image";

const fetchIdeaDetails = async (id) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideas/${id}`);



  return res.json();
};

const IdeasDetailsPage = async ({ params }) => {
  const { id } = await params;

  const idea = await fetchIdeaDetails(id);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">

      
<Image
  src={idea.imageURL}
  alt={idea.title}
  width={800}
  height={600}
  unoptimized
/>
      

      
      <h1 className="text-3xl font-bold">{idea.title}</h1>

    
      <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
        {idea.category}
      </span>

   
      <p className="text-gray-700">{idea.detailedDescription}</p>

   
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
        <p>💰 Budget: <span className="font-bold text-xl">${idea.estimatedBudget}</span></p>
        <p>🎯 Audience: {idea.targetAudience}</p>
        <p>👤 Owner: {idea.ownerName}</p>
        <p>📅 Created: {new Date(idea.createdAt).toLocaleDateString()}</p>
      </div>

      
      <div className="space-y-3">
        <p><b>Problem:</b> {idea.problemStatement}</p>
        <p><b>Solution:</b> {idea.proposedSolution}</p>
      </div>

      <div>
        <CommentForm ideaId={idea._id || idea.id || id} />
      </div>
      <div>
        <GetCommentForm ideaId={idea._id || idea.id || id}></GetCommentForm>
      </div>
     

    </div>
  );
};

export default IdeasDetailsPage;
