import { SidebarSwitcher as SidebarSwitcherRoot } from "@/layout/sidebar/styles/SidebarSwitcher";
import { LeftSidebarArrowIcon } from "@/svg/SidebarArrowIcon";

type Props = {
  onClick?: () => void;
  isOpen?: boolean;
};
export const SidebarSwitcher = (props: Props) => {
  const { onClick } = props;
  return (
    <SidebarSwitcherRoot onClick={onClick}>
      <LeftSidebarArrowIcon rotate={props.isOpen ? "rotate(180deg)" : ""} />
    </SidebarSwitcherRoot>
  );
};
