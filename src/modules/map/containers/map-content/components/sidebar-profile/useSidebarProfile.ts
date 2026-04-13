import { User } from "@/api/codegen/genMouseMapsApi";
import { getAvatarImageLink } from "@/common/utils";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useUser } from "@/modules/user/hooks/useUser";
import { useCallback, useMemo } from "react";

type UseSidebarProfileProps = {
  user?: User;
};

export const useSidebarProfile = ({ user }: UseSidebarProfileProps) => {
  const isMobile = useIsMobile();
  const { onOpenUserModal } = useUser();

  const avatarImage = useMemo(() => getAvatarImageLink(user?.avatar, "display"), [user?.avatar]);

  const onUsernameClick = useCallback(() => {
    if (user?.id) {
      onOpenUserModal(user.id);
    }
  }, [onOpenUserModal, user?.id]);

  return {
    isMobile,
    avatarImage,
    onUsernameClick,
  };
};
