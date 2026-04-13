import { ImageForm } from "@/ui/ImageForm/ImageForm";
import { Box } from "@/ui/Box";
import { useGlobalKeyDown } from "@/hooks/useGlobalKeyDown";
import { useState } from "react";

type Props = {
  onAccess: (image: string) => Promise<unknown>;
  onClose: () => void;
};

export const ImageUploadContent = ({ onAccess, onClose }: Props) => {
  const [image, setImage] = useState<string | null>(null);

  const handleAccess = async () => {
    if (image) {
      await onAccess(image);
      onClose();
    }
  };

  useGlobalKeyDown({
    Enter: handleAccess,
    Escape: onClose,
  });

  return (
    <>
      <ImageForm
        fileType="image"
        width="100%"
        height="180px"
        onChange={setImage}
        value={image}
      />
      <Box />
    </>
  );
};
