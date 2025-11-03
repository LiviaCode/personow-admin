"use client";

import { ReactNode } from "react";

import { Button } from "@/components/ui/button";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="w-full max-w-lg rounded-[25px] bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Button
            onClick={onClose}
            className="rounded bg-transparent p-1 text-black hover:bg-transparent hover:text-orange-500"
          >
            X
          </Button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
