import { createSheet } from "@/ui/Sheet/core/createSheet";
import { ImageUploadContent } from "./ImageUploadContent";

type ImageUploadSheetProps = {
  onAccess: (image: string) => Promise<unknown>;
};

/**
 * Sheet для загрузки изображения.
 * title передаётся через config в show():
 *
 * @example
 * await imageUploadSheet.show({ onAccess }, { title: "Загрузить аватар" })
 */
export const imageUploadSheet = createSheet<ImageUploadSheetProps, void>(ImageUploadContent, {
  width: 420,
});
