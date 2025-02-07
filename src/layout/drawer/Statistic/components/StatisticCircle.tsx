import { StyledStatisticIconContainer, StyledStatisticIconText } from "@/layout/drawer/Statistic/styled";
import { StyledBox } from "@/ui/Box";
import React, { ReactNode, useCallback } from "react";
import { GetMapsApiArg } from "@/api/codegen/genMouseMapsApi";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectStaticMapsInfo } from "@/modules/map/containers";
import { Display } from "@/ui/Display";

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

  return (
    <StyledBox
      grow="1"
      direction={"column"}
      align={"center"}
      gap={10}
      justify="center"
      title={title}
      onClick={onClickHandler}
    >
      <StyledStatisticIconContainer fillingPercent={`${getMapsPercent(count)}%`}>{icon}</StyledStatisticIconContainer>
      <StyledStatisticIconText>
        {count}
        <Display condition={showPercent}>
          <> ({getMapsPercent(count)}%)</>
        </Display>
      </StyledStatisticIconText>
    </StyledBox>
  );
};
