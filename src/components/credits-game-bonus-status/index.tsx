import React, { useCallback } from "react";

import { BottomSheet } from "@alfalab/core-components/bottom-sheet";
import { ButtonMobile } from "@alfalab/core-components/button/mobile";
import { Gap } from "@alfalab/core-components/gap";
import { Typography } from "@alfalab/core-components/typography";
import { InformationCircleMIcon } from "@alfalab/icons-glyph/InformationCircleMIcon";

import bonus4 from "../../assets/credits-game/bonus1.svg";
import bonus4Disabled from "../../assets/credits-game/bonus1_disabled.svg";
import bonus2 from "../../assets/credits-game/bonus2.svg";
import bonus2Disabled from "../..//assets/credits-game/bonus2_disabled.svg";
import bonus3 from "../../assets/credits-game/bonus3.svg";
import bonus3Disabled from "../../assets/credits-game/bonus3_disabled.svg";
import bonus1 from "../../assets/credits-game/bonus4.svg";
import bonus1Disabled from "../../assets/credits-game/bonus4_disabled.svg";
import { type LandingVariant } from "../../types/credits-game";
import { CreditsGameBadge } from "../credits-game-badge";
import { CreditsGameBonus } from "../credits-game-bonus";
import { CreditsGameRules } from "../credits-game-rules";

import styles from "./index.module.css";

type Props = {
  attemptCount: number;
  bonusStatuses: Record<string, boolean>;
  variant: LandingVariant;
};

export const CreditsGameBonusStatus = ({
  attemptCount,
  bonusStatuses,
  variant,
}: Props) => {
  const [isRulesModalOpen, setIsRulesModalOpen] = React.useState(false);

  const closeRulesModal = useCallback(() => setIsRulesModalOpen(false), []);

  const changeBadgeTextEnding = () => {
    if (attemptCount === 0) {
      return "попыток";
    }

    if (attemptCount === 1) {
      return "попытка";
    }

    return "попытки";
  };

  return (
    <React.Fragment>
      <div
        className={styles.layout}
        onClick={() => setIsRulesModalOpen(true)}
        aria-hidden={true}
      >
        <Typography.TitleResponsive
          tag="h1"
          view="large"
          color="primary"
          weight="bold"
        >
          Подберите код
        </Typography.TitleResponsive>
        <Gap size={16} />
        <div className={styles.attemptsContainer}>
          {variant === "attempts" ? (
            <CreditsGameBadge
              text={`Осталось ${attemptCount} ${changeBadgeTextEnding()}`}
            />
          ) : (
            <CreditsGameBadge text="Собери до 4х наград" />
          )}

          <InformationCircleMIcon className={styles.iconContainer} />
        </div>
        <Gap size={16} />
        <div className={styles.bonusesContainer}>
          <CreditsGameBonus
            activeImage={bonus1}
            disabledImage={bonus1Disabled}
            isActive={bonusStatuses.bonus1}
          />
          <CreditsGameBonus
            activeImage={bonus3}
            disabledImage={bonus3Disabled}
            isActive={bonusStatuses.bonus2}
          />
          <CreditsGameBonus
            activeImage={bonus2}
            disabledImage={bonus2Disabled}
            isActive={bonusStatuses.bonus3}
          />
          <CreditsGameBonus
            activeImage={bonus4}
            disabledImage={bonus4Disabled}
            isActive={bonusStatuses.bonus4}
          />
        </div>
      </div>
      <BottomSheet
        open={isRulesModalOpen}
        onClose={closeRulesModal}
        actionButton={
          <ButtonMobile block={true} view="primary" onClick={closeRulesModal}>
            Понятно
          </ButtonMobile>
        }
      >
        <CreditsGameRules />
      </BottomSheet>
    </React.Fragment>
  );
};
