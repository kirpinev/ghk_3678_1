import { useCallback, useEffect, useState } from "react";

import { Gap } from "@alfalab/core-components/gap";

import circleGray from "../../assets/credits-game/circle_gray.svg";
import circleOrange from "../../assets/credits-game/circle_orange.svg";
import lockBottom from "../../assets/credits-game/lock_bottom.svg";
import lockBottomOrange from "../../assets/credits-game/lock_bottom_orange.svg";
import lockTop from "../../assets/credits-game/lock_top.svg";
import lockTopOrange from "../../assets/credits-game/lock_top_orange.svg";
import {
  ANSWER_COMBINATION,
  BONUS_CONFIG,
  INITIAL_LOCK_ID,
  MAX_ATTEMPTS,
  TIME_FOR_GAME_ANIMATION_DELAYS,
} from "../../constants/credits-game";
import { useTimeoutSafe } from "../../hooks/use-timeout-safe";
import { LS, LSKeys } from "../../ls";
import { type BonusKeys, type LandingVariant } from "../../types/credits-game";
import { CreditsGameAlert } from "../credits-game-alert";
import { CreditsGameAlertContainer } from "../credits-game-alert-container";
import { CreditsGameBonusStatus } from "../credits-game-bonus-status";
import { CreditsGameLock } from "../credits-game-lock";
import { CreditsGameStartButton } from "../credits-game-start-button";
import { CreditsGameTimer } from "../credits-game-timer";
import { useNavigate } from "react-router";

import styles from "./index.module.css";
import {v4 as uuidv4} from "uuid";

const getRandomSmiles = () => {
  const sourceArray = [0, 1, 2, 3];
  const randomArray = [];

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * sourceArray.length);

    randomArray.push(sourceArray[randomIndex]);
  }

  return randomArray;
};

type Props = {
  variant: LandingVariant;
};

export const CreditsGame = ({ variant }: Props) => {
  const { set: setTimeoutSafe } = useTimeoutSafe();
  const [randomSmileVariants, setRandomSmileVariants] = useState(
    LS.getItem(LSKeys.TOTAL_WIN, false)
      ? ANSWER_COMBINATION
      : getRandomSmiles(),
  );
  const [attemptCount, setAttemptCount] = useState(
    LS.getItem(LSKeys.MAX_ATTEMPTS, MAX_ATTEMPTS),
  );
  const [lockId, setLockId] = useState(INITIAL_LOCK_ID);
  const [bonusStatuses, setBonusStatuses] = useState<
    Record<BonusKeys, boolean>
  >({
    bonus1: false,
    bonus2: false,
    bonus3: false,
    bonus4: false,
  });
  const [isStartButtonDisabled, setIsStartButtonDisabled] = useState(true);
  const [isRefreshButtonDisabled, setIsRefreshButtonDisabled] = useState(true);
  const [circleImage, setCircleImage] = useState(circleGray);
  const [isLockVisible, setIsLockVisible] = useState(false);
  const [lockImage, setLockImage] = useState({
    top: lockTop,
    bottom: lockBottom,
  });
  const [isLockColorChange, setIsLockColorChange] = useState(false);
  const [isBottomLockAnimated, setIsBottomLockAnimated] = useState(false);
  const [isVariantButtonVisible, setIsVariantButtonVisible] = useState(false);
  const [isAnswerChecking, setIsAnswerChecking] = useState(false);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isReloadingLock, setIsReloadingLock] = useState(false);
  const [isGameAlertVisible, setIsGameAlertVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const navigate = useNavigate();

  const isVariantAttempts = variant === "attempts";
  const isTotalWin =
    bonusStatuses.bonus1 &&
    bonusStatuses.bonus2 &&
    bonusStatuses.bonus3 &&
    bonusStatuses.bonus4;

  const showVariantButton = useCallback(() => {
    setIsVariantButtonVisible(true);
  }, []);

  const updateUserAnswers = useCallback(
    (index: number, answer: number) => {
      const answers = [...randomSmileVariants];

      answers[index] = answer;

      setRandomSmileVariants(answers);
    },
    [randomSmileVariants],
  );

  const changeLockColorToOrange = useCallback(() => {
    setTimeoutSafe(
      () =>
        setLockImage({
          top: lockTopOrange,
          bottom: lockBottomOrange,
        }),
      TIME_FOR_GAME_ANIMATION_DELAYS,
    );
  }, [setTimeoutSafe]);

  const changeLockColorToGray = useCallback(() => {
    setTimeoutSafe(
      () =>
        setLockImage({
          top: lockTop,
          bottom: lockBottom,
        }),
      TIME_FOR_GAME_ANIMATION_DELAYS,
    );
  }, [setTimeoutSafe]);

  const changeBonusStatuses = useCallback(() => {
    let correctAnswers = 0;
    const result: Record<string, boolean> = {
      bonus1: false,
      bonus2: false,
      bonus3: false,
      bonus4: false,
    };

    randomSmileVariants.forEach((varNum, index) => {
      if (varNum === ANSWER_COMBINATION[index]) {
        correctAnswers += 1;
      }
    });

    for (let i = 0; i < correctAnswers; i += 1) {
      result[`bonus${i + 1}`] = true;
    }

    if (result.bonus1 && result.bonus2 && result.bonus3 && result.bonus4) {
      LS.setItem(LSKeys.TOTAL_WIN, true);
    }

    setBonusStatuses(result);
    setIsGameAlertVisible(true);

    if (attemptCount > 0 || variant === "infinite") {
      setIsRefreshButtonDisabled(false);
    } else {
      setIsRefreshButtonDisabled(true);
    }

    setTimeoutSafe(() => {
      setIsStartButtonDisabled(false);
    }, TIME_FOR_GAME_ANIMATION_DELAYS * 8);
  }, [attemptCount, randomSmileVariants, variant, setTimeoutSafe]);

  const checkAnswer = useCallback(() => {
    window.gtag("event", "5422_open_lock_click", {
      variant_name: "ghk_5422_1",
      id: LS.getItem(LSKeys.USER_UUID, ""),
    });

    setAttemptCount((prevState) => {
      const newValue = prevState - 1;

      LS.setItem(LSKeys.MAX_ATTEMPTS, newValue);

      return newValue;
    });
    setCircleImage(circleOrange);
    setIsLockColorChange(true);
    changeLockColorToOrange();
    setIsBottomLockAnimated(true);
    setIsVariantButtonVisible(false);
    setIsAnswerChecking(true);
    setIsAnswerChecked(true);
    setIsStartButtonDisabled(true);
    setIsRefreshButtonDisabled(true);
  }, [changeLockColorToOrange]);

  const refreshGame = useCallback(() => {
    const activeBonus = BONUS_CONFIG.find(({ key }) => bonusStatuses[key]);

    window.gtag("event", "5422_again_click", {
      variant_name: activeBonus
        ? activeBonus.variantName
        : "ghk_5422_1_nothing",
      id: LS.getItem(LSKeys.USER_UUID, ""),
    });

    setLockId(attemptCount);
    setCircleImage(circleGray);
    changeLockColorToGray();
    setIsVariantButtonVisible(true);
    setIsAnswerChecking(false);
    setBonusStatuses({
      bonus1: false,
      bonus2: false,
      bonus3: false,
      bonus4: false,
    });
    setIsAnswerChecked(false);
    setRandomSmileVariants(getRandomSmiles());
    setIsBottomLockAnimated(false);
    setIsReloadingLock(true);
    setIsGameAlertVisible(false);
    setIsVariantButtonVisible(false);
  }, [attemptCount, changeLockColorToGray, bonusStatuses]);

  const getTimeUntilNextDay = (lastAttemptISO: string) => {
    const last = new Date(lastAttemptISO);
    const nextDay = new Date(last);

    nextDay.setDate(last.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0); // полночь следующего дня

    const now = new Date();
    const diff = nextDay.getTime() - now.getTime();

    if (diff <= 0) return null;

    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const pad = (n: number) => n.toString().padStart(2, "0");

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  useEffect(() => {
    setTimeoutSafe(() => {
      setIsLockVisible(true);
    }, TIME_FOR_GAME_ANIMATION_DELAYS);
    setTimeoutSafe(() => {
      setIsStartButtonDisabled(false);
    }, TIME_FOR_GAME_ANIMATION_DELAYS * 4);
  }, [setTimeoutSafe]);

  useEffect(() => {
    if (variant === "infinite") {
      return undefined;
    }

    let lastAttempt = LS.getItem(LSKeys.CREDITS_GAME_LAST_ATTEMPT, null);

    if (attemptCount === 0 && !lastAttempt) {
      const now = new Date().toISOString();

      LS.setItem(LSKeys.CREDITS_GAME_LAST_ATTEMPT, now);
    }

    lastAttempt = LS.getItem(LSKeys.CREDITS_GAME_LAST_ATTEMPT, null);

    if (lastAttempt) {
      setIsBlocked(true);

      const interval = setInterval(() => {
        const timeString = getTimeUntilNextDay(lastAttempt as string);

        if (timeString === null) {
          clearInterval(interval);
          LS.deleteItem(LSKeys.CREDITS_GAME_LAST_ATTEMPT);
          LS.deleteItem(LSKeys.MAX_ATTEMPTS);
          setIsBlocked(false);
          window.location.reload();
        } else {
          setTimeLeft(timeString);
        }
      }, 1000);

      return () => clearInterval(interval);
    }

    return () => setIsBlocked(false);
  }, [attemptCount, variant]);

  useEffect(() => {
    if (isTotalWin) {
      setIsBlocked(true);
    }
  }, [bonusStatuses]);

  useEffect(() => {
    if (LS.getItem(LSKeys.TOTAL_WIN, false)) {
      setBonusStatuses({
        bonus1: true,
        bonus2: true,
        bonus3: true,
        bonus4: true,
      });
      setIsGameAlertVisible(true);
      setLockImage({
        top: lockTopOrange,
        bottom: lockBottomOrange,
      });
      setCircleImage(circleOrange);
      setIsAnswerChecking(true);
    }
  }, []);

  useEffect(() => {
    if (LS.getItem(LSKeys.CREDITS_GAME_BONUS_CLICK, false)) {
      const activeBonus = BONUS_CONFIG.find(
        ({ bonusVariant }) =>
          bonusVariant ===
          LS.getItem(LSKeys.CREDITS_GAME_BONUS_VARIANT, LSKeys.NO_OPTIONS),
      );

      navigate(activeBonus?.href as string);
    }
  }, [bonusStatuses]);

  useEffect(() => {
    if (!LS.getItem(LSKeys.USER_UUID, "")) {
      LS.setItem(LSKeys.USER_UUID, uuidv4());
    }
  }, []);

  return (
    <div className={styles.layout}>
      <CreditsGameBonusStatus bonusStatuses={bonusStatuses} />
      <Gap size={2} />
      <CreditsGameLock
        lockTopImage={lockImage.top}
        lockBottomImage={lockImage.bottom}
        isVisible={isLockVisible}
        image={circleImage}
        isLockColorChange={isLockColorChange}
        isBottomLockAnimated={isBottomLockAnimated}
        randomSmileVariants={randomSmileVariants}
        answerCombination={ANSWER_COMBINATION}
        isVariantButtonVisible={isVariantButtonVisible}
        showVariantButton={showVariantButton}
        isAnswerChecking={isAnswerChecking}
        updateUserAnswers={updateUserAnswers}
        changeBonusStatuses={changeBonusStatuses}
        lockId={lockId}
        isReloadingLock={isReloadingLock}
      />
      {!isBlocked && (
        <CreditsGameStartButton
          isDisabled={
            isAnswerChecked ? isRefreshButtonDisabled : isStartButtonDisabled
          }
          text={isAnswerChecked ? "Попробовать еще раз" : "Открыть замок"}
          onClick={isAnswerChecked ? refreshGame : checkAnswer}
        />
      )}
      {isBlocked && timeLeft && isVariantAttempts && (
        <CreditsGameTimer timeLeft={timeLeft} />
      )}
      {isGameAlertVisible && (
        <CreditsGameAlertContainer isTotalWin={isTotalWin}>
          <CreditsGameAlert
            variant={variant}
            bonusStatuses={bonusStatuses}
            attemptCount={attemptCount}
          />
        </CreditsGameAlertContainer>
      )}
    </div>
  );
};
