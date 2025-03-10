import type * as React from 'react';
import ConfigurableForm from "@common/store/form/ConfigurableForm";
import Entity from "@common/store/entity/Entity";

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
  // provider: ConfigurableForm
}
