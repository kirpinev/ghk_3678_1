import { ButtonMobile } from "@alfalab/core-components/button/mobile";

import styles from "./index.module.css";

type Props = {
  onClick: () => void;
  text: string;
  isDisabled?: boolean;
};

export const CreditsGameStartButton = ({
  onClick,
  text,
  isDisabled = false,
}: Props) => (
  <div className={styles.bottomButton}>
    <ButtonMobile
      block={true}
      view="primary"
      onClick={onClick}
      disabled={isDisabled}
      style={{
        ...(isDisabled && { backgroundColor: "#eff3fa", color: "#c8d1e1" }),
        borderRadius: "20px",
      }}
    >
      {text}
    </ButtonMobile>
  </div>
);
