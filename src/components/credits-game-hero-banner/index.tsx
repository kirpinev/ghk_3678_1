import { Gap } from "@alfalab/core-components/gap";
import { Typography } from "@alfalab/core-components/typography";

import circle from "../../assets/credits-game/circle_white.svg";
import heroImage from "../../assets/credits-game/hero_image.png";
import { CreditsGameBadge } from "../credits-game-badge";

import styles from "./index.module.css";

export const CreditsGameHeroBanner = () => (
  <div className={styles.layout}>
    <div className={styles.content}>
      <Gap size={20} />
      <CreditsGameBadge text="Игра" />
      <Gap size={16} />
      <Typography.TitleResponsive
        tag="h1"
        view="large"
        color="primary"
        weight="bold"
      >
        Разгадайте код
      </Typography.TitleResponsive>
      <Gap size={8} />
      <Typography.Text view="primary-medium" color="primary">
        Выиграйте лучшие условия по кредиту
      </Typography.Text>
      <Gap size={16} />
      <img src={heroImage} alt="Картинка со смайликами" />
    </div>
    <img
      className={styles.image}
      src={circle}
      alt="Картинка крутящегося круга"
    />
  </div>
);
