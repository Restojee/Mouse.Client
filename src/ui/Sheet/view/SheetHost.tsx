import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectSheetStack } from "../slice";
import { sheetData } from "../core/sheetData";
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
        const registryEntry = sheetData.getEntry(entry.id);
        if (!registryEntry) return null;
        return (
          <SheetProvider
            key={entry.id}
            instance={{
              id: entry.id,
              component: registryEntry.component,
              props: registryEntry.props,
              config: entry.config,
              resolve: registryEntry.resolve,
            }}
            onClose={(result) => {
              registryEntry.resolve(result);
              sheetData.remove(entry.id);
            }}
          />
        );
      })}
    </>
  );
};
