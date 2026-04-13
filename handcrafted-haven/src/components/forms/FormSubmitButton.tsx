"use client";

import { useFormStatus } from "react-dom";

type FormSubmitButtonProps = {
  idleLabel: string;
  pendingLabel: string;
  className?: string;
};

export default function FormSubmitButton({
  idleLabel,
  pendingLabel,
  className,
}: FormSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={className}>
      {pending ? pendingLabel : idleLabel}
    </button>
  );
}
