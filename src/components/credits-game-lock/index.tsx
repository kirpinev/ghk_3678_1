import cn from "classnames";

import {
  TIME_FOR_GAME_BUTTON_ANIMATION_DELAY,
  TIME_FOR_SMILE_LOADING_ANIMATION_DELAY,
  TIME_FOR_STATUS_LOADING_ANIMATION_DELAY,
} from "../../constants/credits-game";
import { CreditsGameButtonsContainer } from "../credits-game-buttons-container";

import styles from "./index.module.css";

type Props = {
  image: string;
  isVisible: boolean;
  lockTopImage: string;
  lockBottomImage: string;
  isLockColorChange: boolean;
  isBottomLockAnimated: boolean;
  randomSmileVariants: number[];
  answerCombination: number[];
  isVariantButtonVisible: boolean;
  showVariantButton: () => void;
  isAnswerChecking: boolean;
  updateUserAnswers: (index: number, answer: number) => void;
  changeBonusStatuses: () => void;
  lockId: number;
  isReloadingLock: boolean;
};

export const CreditsGameLock = ({
  image,
  isVisible,
  lockTopImage,
  lockBottomImage,
  isLockColorChange,
  isBottomLockAnimated,
  randomSmileVariants,
  answerCombination,
  isVariantButtonVisible,
  showVariantButton,
  isAnswerChecking,
  updateUserAnswers,
  changeBonusStatuses,
  lockId,
  isReloadingLock,
}: Props) => (
  <div className={styles.wrapper} key={lockId}>
    <div
      className={cn(styles.layout, {
        [styles.visible]: isVisible,
        [styles.hidden]: !isVisible,
        [styles.animated]: isReloadingLock,
      })}
    >
      <div
        className={cn(styles.buttonsContainer, {
          [styles.bottomAnimated]: isBottomLockAnimated,
        })}
      >
        {randomSmileVariants.map((variant, index) => (
          <CreditsGameButtonsContainer
            key={TIME_FOR_SMILE_LOADING_ANIMATION_DELAY[index]}
            isStartAnimation={isVisible}
            initialTimerForLoader={
              TIME_FOR_SMILE_LOADING_ANIMATION_DELAY[index]
            }
            initialTimerForButton={TIME_FOR_GAME_BUTTON_ANIMATION_DELAY}
            initialTimerForAnswerCheck={
              TIME_FOR_STATUS_LOADING_ANIMATION_DELAY[index]
            }
            initialImageNumber={variant}
            answer={answerCombination[index]}
            isVariantButtonVisible={isVariantButtonVisible}
            showVariantButton={showVariantButton}
            isAnswerChecking={isAnswerChecking}
            variantNumber={index}
            updateUserAnswers={updateUserAnswers}
            changeBonusStatuses={changeBonusStatuses}
          />
        ))}
      </div>
      <img
        className={cn({
          [styles.lockImage]: isLockColorChange,
        })}
        src={lockTopImage}
        alt="Верх замка"
      />
      <img
        className={cn({
          [styles.lockImage]: isLockColorChange,
          [styles.bottomAnimated]: isBottomLockAnimated,
        })}
        src={lockBottomImage}
        alt="Низ замка"
      />

      <img
        key={image}
        className={cn(styles.image, {
          [styles.visible]: isVisible,
        })}
        src={image}
        alt="Картинка крутящегося кружка"
      />
    </div>
  </div>
);
