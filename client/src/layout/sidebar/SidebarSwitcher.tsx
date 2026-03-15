import { StyledSidebarSwitcher } from "@/layout/sidebar/styles/StyledSidebarSwitcher";
import { LeftSidebarArrowIcon } from "@/svg/SidebarArrowIcon";

type Props = {
  onClick?: () => void;
  isOpen?: boolean;
};
export const SidebarSwitcher = (props: Props) => {
  const { onClick } = props;
  return (
    <StyledSidebarSwitcher onClick={onClick}>
      <LeftSidebarArrowIcon rotate={props.isOpen ? "rotate(180deg)" : ""} />
    </StyledSidebarSwitcher>
  );
};
