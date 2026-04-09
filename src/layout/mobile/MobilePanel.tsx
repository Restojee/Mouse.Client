import * as React from "react";
import styled from "styled-components";
import { NavLink } from "@/layout/navigation/NavLink";
import { StyledNavLinkSection } from "@/layout/navigation/styles/StyledNavLinkSection";
import { TabsType } from "@/layout/panel/Panel";
import { BurgerIcon } from "@/svg/BurgerIcon";
import { ChatFillIcon } from "@/svg/ChatFillIcon";
import { NotificationsIcon } from "@/svg/NotificationIcon";
import { PaperIcon } from "@/svg/PaperIcon";
import { MobileNavDrawer } from "@/layout/mobile/MobileNavDrawer";
import { MobileUserMenu } from "@/layout/mobile/MobileUserMenu";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectIsAuth } from "@/modules/auth/slice";
import { useNotifications } from "@/modules/notifications";
import { useChat } from "@/modules/chat/hooks/useChat";

type Props = {
  activeTab: TabsType;
  isOpen: boolean;
  setActiveTab: (tab: TabsType) => void;
  setIsOpen: (isOpen: boolean) => void;
};

const Bar = styled.div(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",
  width: "100%",
  height: "50px",
  minHeight: "50px",
  backgroundColor: theme.colors.primary,
  padding: "0 16px",
}));

const DotsIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="5"
      cy="12"
      r="2"
      fill="#CCD2E3"
    />
    <circle
      cx="12"
      cy="12"
      r="2"
      fill="#CCD2E3"
    />
    <circle
      cx="19"
      cy="12"
      r="2"
      fill="#CCD2E3"
    />
  </svg>
);

export const MobilePanel: React.FC<Props> = ({ activeTab, isOpen, setActiveTab, setIsOpen }) => {
  const [navOpen, setNavOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  const isAuth = useAppSelector(selectIsAuth);
  const { isHasNewNotifications } = useNotifications();
  const { isHasNewMessage } = useChat();

  const onTabClick = (tab: TabsType) => {
    setActiveTab(tab);
    if (activeTab === tab && isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
    setUserMenuOpen(false);
  };

  const onOpenTab = (tab: TabsType) => {
    setActiveTab(tab);
    setIsOpen(true);
  };

  return (
    <>
      <MobileNavDrawer
        isOpen={navOpen}
        onClose={() => setNavOpen(false)}
      />
      <MobileUserMenu
        isOpen={userMenuOpen}
        onClose={() => setUserMenuOpen(false)}
        onOpenTab={onOpenTab}
      />
      <Bar>
        <NavLink
          onClick={() => setNavOpen(true)}
          prepend={
            <StyledNavLinkSection>
              <BurgerIcon />
            </StyledNavLinkSection>
          }
        />
        <NavLink
          hasPin={Boolean(isHasNewNotifications)}
          isChecked={activeTab === "notifications" && isOpen}
          onClick={() => onTabClick("notifications")}
          prepend={
            <StyledNavLinkSection>
              <NotificationsIcon />
            </StyledNavLinkSection>
          }
        />
        <NavLink
          hasPin={Boolean(isHasNewMessage && isAuth)}
          isDisabled={!isAuth}
          isChecked={activeTab === "chat" && isOpen}
          onClick={() => onTabClick("chat")}
          prepend={
            <StyledNavLinkSection>
              <ChatFillIcon />
            </StyledNavLinkSection>
          }
        />
        <NavLink
          isChecked={activeTab === "info" && isOpen}
          onClick={() => onTabClick("info")}
          prepend={
            <StyledNavLinkSection>
              <PaperIcon />
            </StyledNavLinkSection>
          }
        />
        <NavLink
          onClick={() => {
            setUserMenuOpen((v) => !v);
            if (isOpen) setIsOpen(false);
          }}
          prepend={
            <StyledNavLinkSection>
              <DotsIcon />
            </StyledNavLinkSection>
          }
        />
      </Bar>
    </>
  );
};
