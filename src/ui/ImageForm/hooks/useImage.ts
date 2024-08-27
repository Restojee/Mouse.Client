import { useCallback, useState } from "react";

export const useImage = () => {
  const [image, setImage] = useState("");

  const convertFileToDataUrl = useCallback((file: File, callback: (result: string | void) => void): string | void => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const dataUrl = e.target?.result;
      if (typeof dataUrl === "string") {
        callback(dataUrl);
      }
    };

    reader.readAsDataURL(file);
  }, []);

  const getDataUrlImage = useCallback(
    (files?: FileList | null) => {
      if (files && files.length) {
        const file = files[0];
        convertFileToDataUrl(file, (convertedFile) => {
          if (convertedFile) {
            setImage(convertedFile);
          }
        });
      }
    },
    [convertFileToDataUrl],
  );

  return {
    image,
    getDataUrlImage,
  };
};
