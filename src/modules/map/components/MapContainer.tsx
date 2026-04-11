import { getCurrentCollectName } from "@/common/utils/getCurrentCollectName";
import useFilterQueryParams from "@/hooks/useFilterQueryParams";
import { useIsMobile } from "@/hooks/useIsMobile";
import { PageFooter } from "@/layout/page/PageFooter";
import { PageHeader } from "@/layout/page/PageHeader";
import { StyledPageWrapper } from "@/layout/page/styles/StyledPageWrapper";
import { PageContent } from "@/modules/map/components/PageContent";
import { MapCreateSection } from "@/modules/map/containers/map-create/ui/MapCreateSection";
import { MapSearch } from "@/modules/map/containers/map-search/MapSearch";
import { useUser } from "@/modules/user/hooks/useUser";
import { StyledBox } from "@/ui/Box";
import { Typography } from "@/ui/Typography";
import { MapCreateContext } from "@/layout/common/MapCreateContext";
import React, { ReactNode, useCallback, useContext, useMemo, useState } from "react";
import mapStyles from "./MapContainer.module.scss";

type Props = {
  children: ReactNode;
};

export const MapPageContainer: React.FC<Partial<Props>> = (props) => {
  const { filter } = useFilterQueryParams();
  const { myId, getUserById, currentUser } = useUser();
  const isMobile = useIsMobile();
  const { createOpen } = useContext(MapCreateContext);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const onSearchOpenChange = useCallback((open: boolean) => {
    setIsSearchOpen(open);
  }, []);

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
  }, [filter, getUserById, myId]);

  return (
    <StyledPageWrapper>
      <PageHeader>
        <StyledBox
          align={"center"}
          padding={"0 10px"}
          gap={5}
          grow={1}
        >
          <div
            className={[
              mapStyles.titleWrapper,
              isMobile && isSearchOpen ? mapStyles.titleWrapperHidden : mapStyles.titleWrapperVisible,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <Typography
              opacity={0.6}
              fontSize={"1rem"}
            >
              {currentPageTitle.collect}
            </Typography>
            <Typography fontSize={"1rem"}>{currentPageTitle.username}</Typography>
          </div>
          <StyledBox margin={"0 0 0 auto"}>
            <MapSearch onOpenChange={onSearchOpenChange} />
          </StyledBox>
        </StyledBox>
      </PageHeader>
      <PageContent>{props.children}</PageContent>
      {(!isMobile || createOpen) && (
        <PageFooter>{currentUser && <MapCreateSection defaultExpanded={isMobile} />}</PageFooter>
      )}
    </StyledPageWrapper>
  );
};
