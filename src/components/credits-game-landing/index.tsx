import { useCallback, useEffect } from "react";

import { Gap } from "@alfalab/core-components/gap";

import {
  CREDITS_GAME_INTERACTION_ATTEMPTS,
  CREDITS_GAME_INTERACTION_INFINITE,
  LANDING_BONUS_HREFS,
} from "../../constants/credits-game";
import { type LandingVariant } from "../../types/credits-game";
import { CreditsGameHeroBanner } from "../credits-game-hero-banner";
import { CreditsGameRules } from "../credits-game-rules";
import { CreditsGameStartButton } from "../credits-game-start-button";
import { useNavigate } from "react-router";
import { LS, LSKeys } from "../../ls";
import styles from "./index.module.css";

type Props = {
  variant: LandingVariant;
};

export const CreditsGameLanding = ({ variant }: Props) => {
  const navigate = useNavigate();

  const gameVariantHref =
    variant === "attempts"
      ? CREDITS_GAME_INTERACTION_ATTEMPTS
      : CREDITS_GAME_INTERACTION_INFINITE;

  const redirectUrl = LS.getItem(
    LSKeys.CREDITS_GAME_BONUS_VARIANT,
    "noOptions",
  );

  const redirectToLandingWithBonus = useCallback(() => {
    navigate(`${LANDING_BONUS_HREFS[redirectUrl]}`);
  }, []);

  const redirectToGame = () => {
    LS.setItem(LSKeys.CREDITS_GAME_LANDING_CLICK, true);

    navigate(`${gameVariantHref}`);
  };

  useEffect(() => {
    if (LS.getItem(LSKeys.CREDITS_GAME_BONUS_CLICK, false)) {
      redirectToLandingWithBonus();
    } else if (LS.getItem(LSKeys.CREDITS_GAME_LANDING_CLICK, false)) {
      navigate(`${gameVariantHref}`);
    }
  }, [gameVariantHref, redirectToLandingWithBonus, variant]);

  return (
    <div className={styles.container}>
      <Gap size={16} />
      <CreditsGameHeroBanner />
      <Gap size={16} />
      <CreditsGameRules />
      <Gap size={96} />
      <CreditsGameStartButton onClick={redirectToGame} text="Начать игру" />
    </div>
  );
};
