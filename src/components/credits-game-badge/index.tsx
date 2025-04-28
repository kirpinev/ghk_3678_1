import { Typography } from "@alfalab/core-components/typography";

import styles from "./index.module.css";

type Props = {
  text: string;
};

export const CreditsGameBadge = ({ text }: Props) => (
  <div className={styles.badge}>
    <Typography.Text view="primary-medium" color="primary">
      {text}
    </Typography.Text>
  </div>
);
