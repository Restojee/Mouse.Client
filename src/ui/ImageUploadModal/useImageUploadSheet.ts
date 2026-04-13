import { useCallback } from "react";
import { imageUploadSheet } from "./imageUploadSheet";

export const useImageUploadSheet = () => {
  return useCallback((title: string, onAccess: (image: string) => Promise<unknown>) => {
    imageUploadSheet.show({ onAccess }, { title });
  }, []);
};
