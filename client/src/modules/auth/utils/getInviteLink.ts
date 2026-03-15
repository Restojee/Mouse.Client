export const getInviteLink = (token: string) => {
  return window.location.origin + "/?invite=" + token;
};
