import React, { Suspense, useCallback, useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useIsMobile } from "@/hooks/useIsMobile";
import { createSheet, SheetComponentProps } from "@/ui/Sheet/core/createSheet";
import { setOpenModalByUserId } from "@/modules/user/slice";

const LazyUserModal = React.lazy(() => import("@/modules/user/containers/user-modal/UserModal"));

const UserModalSheet = ({ onClose }: SheetComponentProps) => {
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();

  const handleClose = useCallback(() => {
    dispatch(setOpenModalByUserId(null));
    onClose?.();
  }, [dispatch, onClose]);

  useEffect(() => {
    if (!isMobile) {
      handleClose();
    }
  }, [isMobile, handleClose]);

  return (
    <Suspense fallback={null}>
      <LazyUserModal onClose={handleClose} />
    </Suspense>
  );
};

export const userSheet = createSheet(UserModalSheet, { withoutButtons: true });
