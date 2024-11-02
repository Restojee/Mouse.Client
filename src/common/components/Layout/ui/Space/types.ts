import type { FlexProps } from '@/common';
import React from 'react';

export interface SpaceProps extends Pick<FlexProps, 'direction'>{
  children?: React.ReactNode;
}