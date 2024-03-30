import { ArrowIcon } from "@/svg/ArrowIcon";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import styles from "./styles.module.css";

interface Props extends ReactPaginateProps {
}

export const Pagination = (props: Props) => {
  return (
    <ReactPaginate
      previousLinkClassName={styles.previous}
      nextLinkClassName={styles.next}
      breakLinkClassName={styles.break}
      containerClassName={styles.root}
      activeLinkClassName={styles.item_active}
      pageLinkClassName={styles.item}
      disabledLinkClassName={styles.item_disabled}
      previousLabel={<ArrowIcon rotate={"180deg"}/>}
      nextLabel={<ArrowIcon/>}
      {...props}
    />
  );
};

