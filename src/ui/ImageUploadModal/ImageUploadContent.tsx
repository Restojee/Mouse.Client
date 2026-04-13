import { ImageForm } from "@/ui/ImageForm/ImageForm";
import { Box } from "@/ui/Box";
import formStyles from "@/ui/Form/Form.module.scss";
import { Button } from "@/ui/Button";
import { useGlobalKeyDown } from "@/hooks/useGlobalKeyDown";
import { useState } from "react";
import { useAppTheme } from "@/hooks/useAppTheme";

type Props = {
  onAccess: (image: string) => Promise<unknown>;
  onClose: () => void;
};

export const ImageUploadContent = ({ onAccess, onClose }: Props) => {
  const [image, setImage] = useState<string | null>(null);
  const { theme } = useAppTheme();

  const handleAccess = async () => {
    if (image) {
      try {
        await onAccess(image);
      } catch (e) {
        console.error("[ImageUpload] onAccess threw:", e);
      }
      onClose();
    }
  };

  useGlobalKeyDown({
    Enter: handleAccess,
    Escape: onClose,
  });

  return (
    <div className={formStyles.content}>
      <ImageForm
        fileType="image"
        width="100%"
        height="180px"
        onChange={setImage}
        value={image}
      />
      <Box className={formStyles.cardActions}>
        <Button
          label="Отмена"
          onClick={onClose}
          type="button"
          bgColor={theme.colors.default.paperAccent}
        />
        <Button
          label="Подтвердить"
          onClick={handleAccess}
          type="button"
          disabled={!image}
        />
      </Box>
    </div>
  );
};
