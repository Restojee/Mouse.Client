import styles from "./styles.module.scss";
import { StarIcon } from "@/svg/StarIcon";

interface Props {
  count?: number;
  size?: "lg" | "md";
}

const StarRating = ({ count = 5, size = "md" }: Props) => {
  if (!count || count > 5) {
    return null;
  }

  return (
    <div className={`${styles.starContainer} ${styles[size]}`}>
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className={styles.star}
        >
          <StarIcon />
        </span>
      ))}
    </div>
  );
};

export default StarRating;
