import { getCurrentCollectName } from "@/common/utils/getCurrentCollectName";
import useQueryParams from "@/hooks/useQueryParams";
import { MapSearch } from "../containers/map-search/MapSearch";
import { useUser } from "@/modules/user/hooks/useUser";
import { StyledBox } from "@/ui/Box";
import { Typography } from "@/ui/Typography";
import React, { ReactNode, useMemo } from "react";
import { PageHeader } from "@/layout/page/PageHeader";
import { StyledPageWrapper } from "@/layout/page/styles/StyledPageWrapper";
import { PageFooter } from "@/layout/page/PageFooter";
import { PageContent } from "@/modules/map/components/PageContent";
import { MapCreateSection } from "../containers/map-create/ui/MapCreateSection";

type Props = {
  children: ReactNode;
};
export const MapPageContainer: React.FC<Partial<Props>> = (props) => {
  const { filter } = useQueryParams();
  const { myId, getUserById } = useUser();

  const currentPageTitle = useMemo(() => {
    const userId = Number(filter.userId);
    const collect = getCurrentCollectName(filter);

    if (!collect.length || Object.entries(filter).length < 4) {
      return { collect, username: "" };
    }

    if (myId === userId) {
      return { collect: `Мои ${collect?.toLowerCase()}`, username: "" };
    }

    const username = getUserById(userId)?.username;

    return { username, collect };
  }, [filter]);

  return (
    <StyledPageWrapper>
      <PageHeader>
        <StyledBox
          align={"center"}
          padding={"0 10px"}
          gap={5}
          grow={1}
        >
          <Typography
            opacity={0.6}
            fontSize={"1rem"}
          >
            {currentPageTitle.collect}
          </Typography>
          <Typography fontSize={"1rem"}>{currentPageTitle.username}</Typography>
          <StyledBox margin={"0 0 0 auto"}>
            <MapSearch />
          </StyledBox>
        </StyledBox>
      </PageHeader>
      <PageContent>{props.children}</PageContent>
      <PageFooter>
        <MapCreateSection />
      </PageFooter>
    </StyledPageWrapper>
  );
};
