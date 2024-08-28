import { ArrowIcon } from "@/svg/ArrowIcon";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import styles from "./styles.module.css";

export const Pagination = (props: ReactPaginateProps) => {
  return (
    <ReactPaginate
      previousLinkClassName={styles.previous}
      nextLinkClassName={styles.next}
      breakLinkClassName={styles.break}
      containerClassName={styles.root}
      activeLinkClassName={styles.item_active}
      pageLinkClassName={styles.item}
      disabledLinkClassName={styles.item_disabled}
      previousLabel={<ArrowIcon rotate={"180deg"} />}
      nextLabel={<ArrowIcon />}
      {...props}
    />
  );
};
