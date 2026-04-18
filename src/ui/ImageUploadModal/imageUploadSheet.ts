import { createSheet } from "@/ui/Sheet/core/createSheet";
import { SheetKind } from "@/ui/Sheet/core/sheetKind";
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
export const imageUploadSheet = createSheet<ImageUploadSheetProps, void>(ImageUploadContent, SheetKind.ImageUpload, {
  width: 420,
  withoutButtons: true,
});
