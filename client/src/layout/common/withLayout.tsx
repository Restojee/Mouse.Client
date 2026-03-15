import { LayoutContainer } from "@/layout/common/LayoutContainer";
import React from "react";

export type LayoutProps = {
  children: React.ReactElement;
};

export const withLayout =
  (Component: React.FC, layout: React.FC<LayoutProps>): React.FC =>
  () => {
    return (
      <LayoutContainer layout={layout}>
        <Component />
      </LayoutContainer>
    );
  };
