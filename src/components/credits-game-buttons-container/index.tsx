import React, { useCallback, useEffect } from 'react';
import cn from 'classnames';

import { IconButton } from '@alfalab/core-components/icon-button';
import { CheckmarkCircleMIcon } from '@alfalab/icons-glyph/CheckmarkCircleMIcon';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { ChevronUpMIcon } from '@alfalab/icons-glyph/ChevronUpMIcon';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';

import {
    LOADER_IMAGE,
    SMILE_IMAGES,
    TIME_FOR_GAME_ANIMATION_DELAYS,
} from '../../constants/credits-game';
import { useTimeout } from '../../hooks/use-timeout';
import { useTimeoutSafe } from '../../hooks/use-timeout-safe';

import styles from './index.module.css';

type Props = {
    initialImageNumber: number;
    initialTimerForLoader: number;
    initialTimerForButton: number;
    initialTimerForAnswerCheck: number;
    isStartAnimation: boolean;
    answer: number;
    isVariantButtonVisible: boolean;
    showVariantButton: () => void;
    isAnswerChecking: boolean;
    updateUserAnswers: (index: number, answer: number) => void;
    variantNumber: number;
    changeBonusStatuses: () => void;
};

export const CreditsGameButtonsContainer = ({
    initialImageNumber,
    initialTimerForLoader,
    isStartAnimation,
    initialTimerForButton,
    initialTimerForAnswerCheck,
    answer,
    isVariantButtonVisible,
    showVariantButton,
    isAnswerChecking,
    updateUserAnswers,
    variantNumber,
    changeBonusStatuses,
}: Props) => {
    const { set: setTimeoutSafe } = useTimeoutSafe();
    const [imageNumber, setImageNumber] = React.useState(initialImageNumber);
    const [isSmileVisible, setIsSmileVisible] = React.useState(false);
    const [isAnswerStatusSet, setIsAnswerStatusSet] = React.useState(false);

    const goForward = () => {
        const res = imageNumber + 1;

        if (res === SMILE_IMAGES.length) {
            setImageNumber(0);
            updateUserAnswers(variantNumber, 0);
        } else {
            setImageNumber(res);
            updateUserAnswers(variantNumber, res);
        }
    };

    const goBackward = () => {
        const res = imageNumber - 1;

        if (res < 0) {
            setImageNumber(SMILE_IMAGES.length - 1);
            updateUserAnswers(variantNumber, SMILE_IMAGES.length - 1);
        } else {
            setImageNumber(res);
            updateUserAnswers(variantNumber, res);
        }
    };

    const checkAnswer = useCallback(() => answer === imageNumber, [answer, imageNumber]);

    useTimeout(() => setIsSmileVisible(true), initialTimerForLoader);

    useTimeout(() => showVariantButton(), initialTimerForButton);

    useEffect(() => {
        if (isAnswerChecking) {
            setTimeoutSafe(() => {
                setIsAnswerStatusSet(true);

                if (variantNumber === 3) {
                    setTimeoutSafe(() => {
                        changeBonusStatuses();
                    }, TIME_FOR_GAME_ANIMATION_DELAYS);
                }
            }, initialTimerForAnswerCheck);
        }
    }, [
        isAnswerChecking,
        checkAnswer,
        initialTimerForAnswerCheck,
        variantNumber,
        changeBonusStatuses,
        setTimeoutSafe,
    ]);

    return (
        <div
            className={cn(styles.layout, {
                [styles.error]: isAnswerStatusSet && !checkAnswer(),
                [styles.success]: isAnswerStatusSet && checkAnswer(),
            })}
        >
            {isStartAnimation && (
                <IconButton
                    className={cn(styles.buttonUp, {
                        [styles.visible]: isVariantButtonVisible,
                        [styles.hidden]: isAnswerChecking,
                    })}
                    icon={<ChevronUpMIcon color='#879fca' />}
                    onClick={goForward}
                />
            )}
            {isAnswerChecking && (
                <div className={styles.statusContainer}>
                    {isAnswerStatusSet && (
                        <IconButton
                            className={cn(styles.status)}
                            icon={
                                checkAnswer() ? (
                                    <CheckmarkCircleMIcon color='#71ce14' />
                                ) : (
                                    <CrossCircleMIcon color='#f63636' />
                                )
                            }
                            disabled={true}
                        />
                    )}
                </div>
            )}
            {isStartAnimation && (
                <div>
                    {isSmileVisible ? (
                        <img
                            key={imageNumber}
                            className={styles.image}
                            src={SMILE_IMAGES[imageNumber]}
                            alt='Картинка смайлика'
                        />
                    ) : (
                        <img
                            className={styles.loader}
                            src={LOADER_IMAGE}
                            alt='Лоадер'
                            width={30}
                            height={30}
                        />
                    )}
                </div>
            )}
            {isStartAnimation && (
                <IconButton
                    className={cn(styles.buttonDown, {
                        [styles.visible]: !isAnswerChecking && isVariantButtonVisible,
                        [styles.hiddenWithOpacity]: isAnswerChecking,
                    })}
                    icon={<ChevronDownMIcon color='#879fca' />}
                    onClick={goBackward}
                />
            )}
        </div>
    );
};
