import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectSheetStack } from "../slice";
import { sheetData } from "../core/sheetData";
import { sheetRegistry } from "../core/sheetRegistry";
import SheetProvider from "./SheetEntryRenderer/SheetProvider";

export const SheetHost = () => {
  const dispatch = useAppDispatch();
  const stack = useAppSelector(selectSheetStack);

  useEffect(() => {
    sheetData.init(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (stack.length === 0) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [stack.length]);

  return (
    <>
      {stack.map((entry) => {
        const Component = sheetRegistry.get(entry.kind);
        if (!Component) return null;
        return (
          <SheetProvider
            key={entry.id}
            instance={{
              id: entry.id,
              component: Component,
              props: (entry.props ?? {}) as object,
              config: entry.config,
            }}
            onClose={(result) => sheetData.remove(entry.id, result)}
          />
        );
      })}
    </>
  );
};
