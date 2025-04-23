import { TypographyProps } from "@ui/Typography/common/types";
import { Typography } from "@ui/Typography";
import { TextTags } from "@common/constants/textTags";
import { UrlBuilder } from "@common/services/router";
import * as React from "react";
import useHistory from "@common/services/router/hooks/useHistory";


interface LinkProps extends TypographyProps {
  to: UrlBuilder;
}
const Link = (props: LinkProps) => {
  const { to } = props;
  const { push } = useHistory();
  const linkUrl = React.useMemo(() => to.toString(), [to]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    push(to);
  };

  return (
    <Typography tag={TextTags.A} onClick={handleClick} href={linkUrl} {...props} />
  )
}
export default Link;
