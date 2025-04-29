import React, { useEffect, useState } from "react";

import { ButtonMobile } from "@alfalab/core-components/button/mobile";
import { Typography } from "@alfalab/core-components/typography";

import noBonusAlert from "../../assets/credits-game/no_bonus_alert.svg";
import {
  BONUS_CONFIG,
  CREDITS_GAME_FINAL_NO_OPTIONS,
} from "../../constants/credits-game";
import { LS, LSKeys } from "../../ls";
import {
  type LandingBonusVariant,
  type LandingVariant,
} from "../../types/credits-game";
import { useNavigate } from "react-router";

import styles from "./index.module.css";

type Props = {
  bonusStatuses: Record<string, boolean>;
  attemptCount: number;
  variant: LandingVariant;
};

const buttonStyles = {
  backgroundColor: "white",
  color: "black",
  borderRadius: "20px",
};

export const CreditsGameAlert = ({
  bonusStatuses,
  attemptCount,
  variant,
}: Props) => {
  const navigate = useNavigate();

  const [alertImage, setAlertImage] = useState(noBonusAlert);
  const [alertText, setAlertText] = useState("Ничего не разгадано");
  const [alertSubText, setAlertSubText] = useState<string[]>([]);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [buttonText, setButtonText] = useState("");
  const [bonusLandingHref, setBonusLandingHref] = useState("");
  const [bonusVariant, setBonusVariant] = useState("");
  const [isNoBonus, setIsNoBonus] = useState(false);

  const redirectToBonusLanding = () => {
    const activeBonus = BONUS_CONFIG.find(({ key }) => bonusStatuses[key]);

    window.gtag("event", "3678_award_click", {
      variant_name: activeBonus
        ? activeBonus.variantName
        : "ghk_3678_1_nothing",
      id: LS.getItem(LSKeys.USER_UUID, ""),
    });

    LS.setItem(LSKeys.CREDITS_GAME_BONUS_CLICK, true);
    LS.setItem(
      LSKeys.CREDITS_GAME_BONUS_VARIANT,
      bonusVariant as LandingBonusVariant,
    );

    navigate(bonusLandingHref);
  };

  useEffect(() => {
    const activeBonus = BONUS_CONFIG.find(({ key }) => bonusStatuses[key]);

    if (activeBonus) {
      setAlertImage(activeBonus.image);
      setAlertText(activeBonus.text);
      setAlertSubText(activeBonus.subText);
      setIsButtonVisible(true);
      setButtonText(activeBonus.buttonText);
      setBonusLandingHref(activeBonus.href);
      setBonusVariant(activeBonus.bonusVariant);
    } else {
      setAlertImage(noBonusAlert);
      setAlertText("Сожалеем, что вы ничего не\u00A0выиграли.");
      setAlertSubText(["Вы можете взять кредит прямо сейчас."]);
      setIsNoBonus(true);
      setIsButtonVisible(false);
      setBonusLandingHref(CREDITS_GAME_FINAL_NO_OPTIONS);
      setBonusVariant("noOptions");
    }
  }, [bonusStatuses, attemptCount, variant]);

  useEffect(() => {
    if (LS.getItem(LSKeys.CREDITS_GAME_BONUS_CLICK, false)) {
      navigate(bonusLandingHref);
    }
  }, []);

  return (
    <div className={styles.alert}>
      <div className={styles.textImageWrapper}>
        <img src={alertImage} width={60} height={60} alt="" />
        <div className={styles.textWrapper}>
          <Typography.Text
            view="primary-medium"
            color="primary-inverted"
            weight="bold"
          >
            {alertText}
          </Typography.Text>
          {alertSubText.length > 0 && (
            <React.Fragment>
              {alertSubText.map((text) => (
                <Typography.Text
                  key={text}
                  view="primary-medium"
                  color="primary-inverted"
                >
                  {alertSubText.length > 1 && "•"} {text}
                </Typography.Text>
              ))}
            </React.Fragment>
          )}
        </div>
      </div>
      {isButtonVisible && (
        <ButtonMobile
          block={true}
          onClick={redirectToBonusLanding}
          style={buttonStyles}
        >
          Забрать {buttonText} {variant === "attempts" && "сейчас"}
        </ButtonMobile>
      )}
      {isNoBonus && (
        <ButtonMobile
          block={true}
          onClick={redirectToBonusLanding}
          style={buttonStyles}
        >
          Отправить заявку
        </ButtonMobile>
      )}
    </div>
  );
};
