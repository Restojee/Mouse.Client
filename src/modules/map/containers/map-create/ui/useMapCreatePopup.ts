import React, { useCallback } from "react";

type UseMapCreatePopupProps = {
  setName?: (name: string) => void;
  onMapCreate?: () => void;
};

export const useMapCreatePopup = ({ setName, onMapCreate }: UseMapCreatePopupProps) => {
  const onNameChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName?.(e.currentTarget.value);
    },
    [setName],
  );

  const onKeyDownHandler = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && onMapCreate) {
        onMapCreate();
      }
    },
    [onMapCreate],
  );

  return { onNameChangeHandler, onKeyDownHandler };
};
