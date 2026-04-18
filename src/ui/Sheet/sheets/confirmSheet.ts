import { createSheet } from "@/ui/Sheet/core/createSheet";
import { SheetKind } from "@/ui/Sheet/core/sheetKind";
import { ConfirmContent, ConfirmContentProps } from "@/ui/Sheet/components/ConfirmContent";

/**
 * Универсальный confirm-sheet с Promise API.
 * Резолвится с true при "Подтвердить", с undefined при отмене/закрытии.
 *
 * @example
 * const ok = await confirmSheet.show({ text: "Удалить?" })
 * if (ok) doDelete()
 */
export const confirmSheet = createSheet<ConfirmContentProps, boolean>(ConfirmContent, SheetKind.Confirm);
