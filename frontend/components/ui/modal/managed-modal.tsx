"use client";

import { Modal, ModalContent } from "@nextui-org/react";
import { useModalAction, useModalState } from "./modal-context";
import DeleteFeedbackModal from "@/components/feedbacks/delete-feedback-view";

function renderModal(view: any, data: any) {
  switch (view) {
    case "DELETE_FEEDBACK":
      return <DeleteFeedbackModal feedbackId={data} />;

    default:
      return null;
  }
}

export default function ManagedModal() {
  const { isOpen, view, data } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Modal isOpen={isOpen} onOpenChange={closeModal}>
      <ModalContent>{renderModal(view, data)}</ModalContent>
    </Modal>
  );
}
