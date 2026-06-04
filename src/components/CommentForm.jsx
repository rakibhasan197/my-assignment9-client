"use client";

import { authClient } from "@/lib/auth-client";
import { Button, TextArea } from "@heroui/react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CommentForm({ ideaId }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const comment = formData.get("comment")?.toString().trim();

    if (!comment) {
      toast.error("Please write a comment", {
        autoClose: 2000,
      });
      return;
    }

    const commentData = {
      ideaId,
      username: user?.name || "Anonymous",
      userEmail: user?.email || "",
      comment,
      createdAt: new Date().toISOString(),
    };

    setIsSubmitting(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      if (res.ok) {
        toast.success("Comment posted successfully", {
          autoClose: 2000,
        });

        form.reset();
      } else {
        const errorData = await res.json().catch(() => null);
        toast.error(errorData?.message || "Failed to post comment", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong", {
        autoClose: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TextArea
        name="comment"
        className="w-full"
        placeholder="Write a comment..."
      />

      <Button color="primary" type="submit" isDisabled={isSubmitting}>
        {isSubmitting ? "Posting..." : "Comment"}
      </Button>
    </form>
  );
}
