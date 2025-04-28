import React from "react";

import { Gap } from "@alfalab/core-components/gap";
import { Typography } from "@alfalab/core-components/typography";
import { CheckmarkCircleMIcon } from "@alfalab/icons-glyph/CheckmarkCircleMIcon";

import bonus1 from "../../assets/credits-game/bonus1.svg";
import bonus2 from "../../assets/credits-game/bonus2.svg";
import bonus3 from "../../assets/credits-game/bonus3.svg";
import bonus4 from "../../assets/credits-game/bonus4.svg";

import styles from "./index.module.css";

export const CreditsGameRules = () => (
  <React.Fragment>
    <Typography.TitleResponsive
      tag="div"
      view="medium"
      color="primary"
      weight="semibold"
    >
      Код состоит из 4 элементов и <i>не меняется</i>
    </Typography.TitleResponsive>
    <Gap size={8} />
    <Typography.Text view="primary-medium" color="primary">
      За каждый разгаданный элемент полагается награда:
    </Typography.Text>
    <Gap size={16} />
    <div className={styles.wrapper}>
      <div className={styles.statusContainer}>
        <div className={styles.iconContainer}>
          <CheckmarkCircleMIcon color="#ff1913" width={20} height={20} />
          <div className={styles.wand} />
        </div>
        <div className={styles.iconContainer}>
          <CheckmarkCircleMIcon color="#ff5413" width={20} height={20} />
          <div className={styles.wand} />
        </div>
        <div className={styles.iconContainer}>
          <CheckmarkCircleMIcon color="#ff8917" width={20} height={20} />
          <div className={styles.wand} />
        </div>
        <div className={styles.iconContainer}>
          <CheckmarkCircleMIcon color="#ffba12" width={20} height={20} />
        </div>
      </div>
      <div className={styles.rulesContainer}>
        <div className={styles.rule}>
          <div className={styles.infoContainer}>
            <img src={bonus4} width={60} height={60} alt="" />
            <Typography.Text view="primary-medium" color="primary">
              Снижение ставки на 1%
            </Typography.Text>
          </div>
        </div>
        <div className={styles.rule}>
          <div className={styles.infoContainer}>
            <img src={bonus3} width={60} height={60} alt="" />
            <Typography.Text view="primary-medium" color="primary">
              Выбор даты платежа
            </Typography.Text>
          </div>
        </div>
        <div className={styles.rule}>
          <div className={styles.infoContainer}>
            <img src={bonus2} width={60} height={60} alt="" />
            <Typography.Text view="primary-medium" color="primary">
              Защита от просрочки
            </Typography.Text>
          </div>
        </div>
        <div className={styles.rule}>
          <div className={styles.infoContainer}>
            <img src={bonus1} width={60} height={60} alt="" />
            <Typography.Text view="primary-medium" color="primary">
              Гибкий график платежей
            </Typography.Text>
          </div>
        </div>
      </div>
    </div>

    <Gap size={32} />

    <div className={styles.caption}>
      <Typography.Text view="primary-small" color="secondary">
        Все полученные награды складываются.
      </Typography.Text>
      <Gap size={8} />
      <Typography.Text view="primary-small" color="secondary">
        Все полученные награды могут быть сразу применены к оформлению нового
        кредитного продукта.
      </Typography.Text>
    </div>
  </React.Fragment>
);
