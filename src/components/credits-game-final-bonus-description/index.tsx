import React from "react";

import { Gap } from "@alfalab/core-components/gap";
import { Typography } from "@alfalab/core-components/typography";

import checkedMark from "../../assets/credits-game/check_mark.png";

import styles from "../credits-game-final/index.module.css";

type Props = {
  lines: string[];
  extraLine?: string;
  boldFirst?: boolean;
};

export const CreditsGameFinalBonusDescription = ({
  lines,
  extraLine,
  boldFirst = false,
}: Props) => (
  <div className={styles.descriptions}>
    <div className={styles.description}>
      <img src={checkedMark} width={48} height={48} alt="" />
      <div className={styles.textContainer}>
        {lines.map((text, idx) => (
          <Typography.Text
            key={text}
            view="primary-medium"
            color="primary"
            weight={boldFirst && idx === 0 ? "bold" : "regular"}
          >
            {text}
          </Typography.Text>
        ))}
        {extraLine && (
          <React.Fragment>
            <Gap size={8} />
            <Typography.Text view="primary-medium" color="primary">
              {extraLine}
            </Typography.Text>
          </React.Fragment>
        )}
      </div>
    </div>
  </div>
);
