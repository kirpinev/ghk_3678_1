import { type ReactNode } from "react";

import styles from "./index.module.css";

type Props = {
  children: ReactNode;
};

export const CreditsGameAlertContainer = ({ children }: Props) => (
  <div className={styles.layout}>{children}</div>
);
