import { createSheet } from "@/ui/Sheet/core/createSheet";
import { SheetKind } from "@/ui/Sheet/core/sheetKind";
import { CreateInfoModal } from "@/modules/info/containers/create-modal/CreateInfoModal";

/**
 * Sheet для создания/редактирования полезной инфы.
 * title передаётся через второй аргумент show():
 *
 * @example
 * await createInfoSheet.show({}, { title: "Редактировать" })
 */
export const createInfoSheet = createSheet<object, void>(CreateInfoModal, SheetKind.CreateInfo, {
  withoutButtons: true,
});
