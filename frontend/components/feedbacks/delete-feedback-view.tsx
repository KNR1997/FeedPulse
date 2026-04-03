"use client";

import { ModalBody, ModalFooter, ModalHeader, Button } from "@nextui-org/react";
// hooks
import { useDeleteFeedbackMutation } from "@/data/feedback";
import { useModalAction } from "@/components/ui/modal/modal-context";

export default function DeleteFeedbackModal({
  feedbackId,
}: {
  feedbackId: string;
}) {
  const { closeModal } = useModalAction();
  // mutation
  const { mutate: deleteFeedback, isPending } = useDeleteFeedbackMutation();

  return (
    <>
      <ModalHeader>Delete Feedback</ModalHeader>

      <ModalBody>
        <p>Are you sure you want to delete this feedback?</p>
      </ModalBody>

      <ModalFooter>
        <Button variant="flat" onPress={closeModal}>
          Cancel
        </Button>

        <Button
          color="danger"
          isLoading={isPending}
          onPress={() => deleteFeedback(feedbackId)}
        >
          Delete
        </Button>
      </ModalFooter>
    </>
  );
}
