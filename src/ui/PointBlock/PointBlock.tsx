import React from "react";
import { Property } from "csstype";
import pointBlockStyles from "./PointBlock.module.scss";

type PointBlockViewPropsType = {
  header: string;
  children: React.ReactNode;
  width: Property.Width<number>;
  left: Property.Left;
  right: Property.Right;
  bottom: Property.Bottom;
  footer: React.ReactNode;
  isVisible: boolean;
  centeredTitle: boolean;
};

export function PointBlock(props: Partial<PointBlockViewPropsType>) {
  return (
    <div
      className={pointBlockStyles.container}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 0,
        bottom: props.bottom,
        left: props.left,
        right: props.right,
        width: props.width || 250,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: props.centeredTitle ? "center" : "initial",
          margin: "0 0 15px 0",
          textAlign: props.centeredTitle ? "center" : "initial",
        }}
      >
        {props.header}
      </div>
      <div style={{ display: "flex", gap: 20 }}>{props.children}</div>
      <div>{props.footer}</div>
    </div>
  );
}
