import { CategoryItemViewProps } from "@/modules/navigation/view/Categories/types";

export interface SectionMainViewProps {
  title: string;
  categories: CategoryItemViewProps[];
  caption?: string;
  isCompact?: boolean;
}

export interface SectionHeaderViewProps {
  title: string;
}
