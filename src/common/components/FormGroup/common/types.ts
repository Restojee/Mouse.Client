import type * as React from 'react';

export interface FormItemProps {
  label?: string;
  children?: React.ReactNode;
  error?: string;
}

export interface FormRowProps {
  children?: React.ReactNode;
}

export interface FormProps {
  children?: React.ReactNode;
}
