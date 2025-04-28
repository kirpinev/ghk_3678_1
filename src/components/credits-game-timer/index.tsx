import { ButtonMobile } from "@alfalab/core-components/button/mobile";

import styles from "./index.module.css";

type Props = {
  timeLeft: string;
};

export const CreditsGameTimer = ({ timeLeft }: Props) => (
  <div className={styles.bottomButton}>
    <ButtonMobile
      block={true}
      view="primary"
      disabled={true}
      style={{
        backgroundColor: "#eff3fa",
        // color: '#c8d1e1',
        borderRadius: "20px",
      }}
    >
      Продолжить игру через {timeLeft}
    </ButtonMobile>
  </div>
);
