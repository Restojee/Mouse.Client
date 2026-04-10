import * as React from "react";

type IMapCreateContext = {
  createOpen: boolean;
  setCreateOpen: (open: boolean) => void;
};

export const MapCreateContext = React.createContext<IMapCreateContext>({
  createOpen: false,
  setCreateOpen: () => {},
});
