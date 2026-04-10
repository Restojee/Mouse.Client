import React, { ReactNode } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Property } from "csstype";

type StyledLinkProps = {
  fontSize?: Property.FontSize;
  isEllipsis?: boolean;
};

const StyledTextLink = styled.span<StyledLinkProps & { children?: React.ReactNode }>(({ theme, ...props }) => ({
  color: theme.colors.brandColor,
  cursor: "pointer",
  fontSize: props.fontSize,
  fontWeight: "bold",
  display: "inline",
  ...(props.isEllipsis && {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    display: "inline-block",
    maxWidth: "100%",
    verticalAlign: "bottom",
  }),
  "&:hover": {
    textDecoration: "underline",
  },
}));

const StyledAnchorLink = styled.a<StyledLinkProps & { children?: React.ReactNode }>(({ theme, ...props }) => ({
  color: theme.colors.brandColor,
  cursor: "pointer",
  fontSize: props.fontSize,
  fontWeight: "bold",
  display: "inline",
  textDecoration: "none",
  ...(props.isEllipsis && {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    display: "inline-block",
    maxWidth: "100%",
    verticalAlign: "bottom",
  }),
  "&:hover": {
    textDecoration: "underline",
  },
}));

type TextLinkProps = {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  fontSize?: Property.FontSize;
  isEllipsis?: boolean;
};

export const TextLink = ({ children, onClick, href, fontSize, isEllipsis }: TextLinkProps) => {
  if (href) {
    return (
      <Link
        href={href}
        passHref
        legacyBehavior
      >
        <StyledAnchorLink
          fontSize={fontSize}
          isEllipsis={isEllipsis}
          href={href}
        ></StyledAnchorLink>
      </Link>
    );
  }
  return (
    <StyledTextLink
      onClick={onClick}
      fontSize={fontSize}
      isEllipsis={isEllipsis}
    >
      {children}
    </StyledTextLink>
  );
};
