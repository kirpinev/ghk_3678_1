import cn from "classnames";

import styles from "./index.module.css";

type Props = {
  activeImage: string;
  disabledImage: string;
  isActive: boolean;
};

export const CreditsGameBonus = ({
  activeImage,
  disabledImage,
  isActive,
}: Props) => (
  <img
    className={cn({
      [styles.animated]: isActive,
    })}
    src={isActive ? activeImage : disabledImage}
    alt="Картинка бонуса"
  />
);
