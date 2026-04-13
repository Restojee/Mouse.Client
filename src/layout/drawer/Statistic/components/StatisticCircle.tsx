import { Typography } from "@/ui/Typography/styles/Typography";
import React, { ReactNode, useCallback } from "react";
import { GetMapsApiArg } from "@/api/codegen/genMouseMapsApi";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectStaticMapsInfo } from "@/modules/map/containers";
import { Display } from "@/ui/Display";
import statStyles from "@/layout/drawer/Statistic/Statistic.module.scss";

interface Props {
  onClick: (filters: Partial<GetMapsApiArg>) => void;
  count: number;
  userId?: number;
  filters: Partial<GetMapsApiArg>;
  title: string;
  icon: ReactNode;
  showPercent?: boolean;
}

export const StatisticCircle = (props: Props) => {
  const { onClick, count, userId, filters, title, icon, showPercent } = props;

  const staticMapsInfo = useAppSelector(selectStaticMapsInfo);

  const onClickHandler = useCallback(() => {
    onClick({ ...filters, userId });
  }, [filters, onClick, userId]);

  const getMapsPercent = useCallback(
    (mapsCount: number = 0) => {
      const totalCount = staticMapsInfo?.totalItems || 0;
      return Math.round((mapsCount / totalCount) * 100);
    },
    [staticMapsInfo],
  );

  const fillingPercent = showPercent ? `${getMapsPercent(count)}%` : "0";
  const containerStyle = {
    background: `linear-gradient(to top, rgb(132, 208, 108) ${fillingPercent}, var(--color-secondary) ${fillingPercent})`,
  };

  return (
    <div
      className={statStyles.statisticCircleItem}
      title={title}
      onClick={onClickHandler}
    >
      <div
        className={statStyles.statisticIconContainer}
        style={containerStyle}
      >
        {icon}
      </div>
      <Typography className={statStyles.statisticIconText}>
        {count}
        <Display condition={showPercent}>
          <> ({getMapsPercent(count)}%)</>
        </Display>
      </Typography>
    </div>
  );
};
