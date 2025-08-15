// components/common/NoteModal.tsx
"use client";
import React, { useEffect, useRef } from "react";
import { Modal, Input, Button } from "antd";
import type { ModalProps } from "antd";

const { TextArea } = Input;

interface NoteModalProps extends Pick<ModalProps, "open" | "onCancel"> {
  onSubmit: (note: string) => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ open, onCancel, onSubmit }) => {
  const [note, setNote] = React.useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus the text area when modal opens
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <Modal
      open={open}
      title="Add a Note (Optional)"
      onCancel={onCancel}
      onOk={() => onSubmit(note)}
      okText="Submit"
      cancelText="Cancel"
      centered
      destroyOnHidden
      maskClosable={false}
      keyboard
      width={400}
    >
      <TextArea
        ref={inputRef}
        rows={4}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Enter a note (e.g., shift details)"
        aria-label="Optional note input"
      />
    </Modal>
  );
};

export default NoteModal;
