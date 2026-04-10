export type ThemeSizes = "sm" | "md" | "lg";

export interface ListItemOptions {
  id: string | number;
  label: string;
  icon?: React.ReactNode;
  /** URL аватарки — если задан, рендерится слева через <Avatar> */
  avatar?: string;
  disabled?: boolean;
  divider?: boolean;
  submenu?: ListItemOptions[];
  checked?: boolean;
  showCheckbox?: boolean;
}
