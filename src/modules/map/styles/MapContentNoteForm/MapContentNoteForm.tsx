import React from "react";
import { StyledTextarea } from "@/ui/Textarea/styled";
import styles from "./MapContentNoteForm.module.scss";

export const MapContentNoteForm = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <StyledTextarea ref={ref} className={[styles.root, className].filter(Boolean).join(" ")} {...props} />
));
MapContentNoteForm.displayName = "MapContentNoteForm";
