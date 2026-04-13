import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { LoaderIcon } from "@/svg/loader/LoaderIcon";
import styles from "./BoxLoader.module.scss";

type BoxLoaderPropsType = {
  isLoading: boolean;
  isAbsolute?: boolean;
  delay?: number;
};

export const BoxLoader = (props: BoxLoaderPropsType) => {
  const { isLoading, isAbsolute, delay = 1000 } = props;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setVisible(false);
      return;
    }
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [isLoading, delay]);

  if (!visible) {
    return null;
  }

  const className = clsx(styles.root, isAbsolute && styles.absolute);

  return (
    <div className={className}>
      <LoaderIcon />
    </div>
  );
};
