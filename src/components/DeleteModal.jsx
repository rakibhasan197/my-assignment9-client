"use client";

import {AlertDialog, Button} from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function DeleteModal({ comment }) {
  const router = useRouter()
  const { _id, comment: commentText } = comment;
  
const handleDelete = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/comments/${_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();
  toast.success("Comment deleted successfully", {
    autoClose: 2000,
  });
  console.log(data);
  router.refresh();
};
  return (
    <AlertDialog>
      <Button variant="danger">Delete Comment</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete comment permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger">
                Delete Comment
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}