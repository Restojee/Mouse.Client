import React, { useEffect, useRef } from "react";
import { getMapImageLink } from "@/common/utils";
import { EditFillIcon } from "@/svg/EditFillIcon";
import { useImage } from "@/ui/ImageForm/hooks/useImage";
import styles from "./UpdateAvatar.module.scss";

type UpdateAvatarType = {
  currentImage?: string;
  size?: number;
  onChange?: (image: string) => void;
};
export const UpdateAvatar = (props: UpdateAvatarType) => {
  const { currentImage, onChange } = props;

  const { image, getDataUrlImage } = useImage();

  const inputFile = useRef<HTMLInputElement | null>(null);

  const onClickHandler = () => {
    inputFile.current?.click();
  };

  const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    getDataUrlImage(files);
  };

  useEffect(() => {
    if (image && onChange) {
      onChange(image);
    }
  }, [image]);

  return (
    <div
      className={styles.avatar}
      style={{ backgroundImage: `url(${image || getMapImageLink(currentImage, "display")})` || "" }}
      onClick={onClickHandler}
    >
      <input
        type={"file"}
        onChange={uploadHandler}
        ref={inputFile}
        accept={".png, .jpg, .jpeg"}
        style={{ display: "none" }}
      />
      <div className={styles.shadow}>
        <EditFillIcon size={30} />
      </div>
    </div>
  );
};
