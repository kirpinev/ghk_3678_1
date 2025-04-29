import { type ReactNode } from "react";

import styles from "./index.module.css";
import cn from "classnames";

type Props = {
  children: ReactNode;
  isTotalWin: boolean;
};

export const CreditsGameAlertContainer = ({ children, isTotalWin }: Props) => (
  <div
    className={cn(styles.layout, {
      [styles.totalWin]: isTotalWin,
    })}
  >
    {children}
  </div>
);
