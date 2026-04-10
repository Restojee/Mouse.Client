import React, { ReactNode } from "react";
import Link from "next/link";
import { Property } from "csstype";
import styles from "./TextLink.module.scss";

type TextLinkProps = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  fontSize?: Property.FontSize;
  isEllipsis?: boolean;
};

export const TextLink = ({ children, onClick, href, fontSize, isEllipsis }: TextLinkProps) => {
  const classes = [styles.textLink, isEllipsis && styles.ellipsis].filter(Boolean).join(" ");

  if (href) {
    return (
      <Link href={href} passHref legacyBehavior>
        <a className={classes} style={{ fontSize }} href={href}>
          {children}
        </a>
      </Link>
    );
  }
  return (
    <span onClick={onClick} className={classes} style={{ fontSize }}>
      {children}
    </span>
  );
};
