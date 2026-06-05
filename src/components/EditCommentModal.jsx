"use client";

import { Envelope } from "@gravity-ui/icons";
import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
  useOverlayState,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export function EditCommentModal({ comment }) {
  const { _id, comment: commentText } = comment;

  const [loading, setLoading] = useState(false);
  const modalState = useOverlayState();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const updatedComment = formData.get("comment")?.toString().trim();

    if (!updatedComment) {
      toast.error("Please write a comment", {
        autoClose: 2000,
      });
      return;
    }

    const commentData = {
      comment: updatedComment,
    };

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentData),
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        toast.error(errorData?.message || "Failed to update comment", {
          autoClose: 2000,
        });
        return;
      }

      toast.success("Comment updated successfully", {
        autoClose: 2000,
      });

      modalState.close();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", {
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal state={modalState}>
      <Button variant="secondary">Edit Comment</Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Envelope className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Edit Comment</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Update your comment below.
              </p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                  <TextField
                    className="w-full"
                    name="comment"
                    variant="secondary"
                    defaultValue={commentText}
                  >
                    <Label>Comment</Label>
                    <Input />
                  </TextField>

                  <div className="flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="secondary"
                      isDisabled={loading}
                      onPress={modalState.close}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" isDisabled={loading}>
                      {loading ? "Updating..." : "Update Comment"}
                    </Button>
                  </div>
                </form>
              </Surface>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
