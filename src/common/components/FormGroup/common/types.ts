import type * as React from 'react';

export interface FormItemProps {
  label?: string;
  children?: React.ReactNode;
  error?: string;
  valid?: boolean;
}

export interface FormRowProps {
  children?: React.ReactNode;
}

export interface FormProps {
  children?: React.ReactNode;
  onSubmit?(): void;
}
