import React from "react";
import clsx from "clsx";
import textareaStyles from "@/ui/Textarea/Textarea.module.scss";
import styles from "./MapContentNoteForm.module.scss";

export const MapContentNoteForm = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  const rootClassName = clsx(textareaStyles.textarea, styles.root, className);
  return (
    <textarea
      ref={ref}
      className={rootClassName}
      {...props}
    />
  );
});
MapContentNoteForm.displayName = "MapContentNoteForm";
