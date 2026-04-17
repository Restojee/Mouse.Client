import { ReactNode } from "react";
import { GetMapsApiArg } from "@/api/codegen/genMouseMapsApi";
import { StatisticCircle } from "@/layout/drawer/Statistic/components/StatisticCircle";
import { Row } from "@/ui/Row";
import styles from "./UserModal.module.scss";

export type StatisticItem = {
  title: string;
  filters: Partial<GetMapsApiArg>;
  count: number;
  icon: ReactNode;
  showPercent?: boolean;
};

type Props = {
  items: StatisticItem[];
  userId?: number;
  onFilterClick: (filters: Partial<GetMapsApiArg>) => void;
};

export const StatisticList = ({ items, userId, onFilterClick }: Props) => (
  <Row className={styles.stats}>
    {items.map((item) => (
      <StatisticCircle
        key={item.title}
        title={item.title}
        filters={item.filters}
        count={item.count}
        icon={item.icon}
        showPercent={item.showPercent}
        userId={userId}
        onClick={onFilterClick}
      />
    ))}
  </Row>
);
