import React, { type ChangeEvent, useMemo, useState } from "react";
import cn from "classnames";

import { AmountInput } from "@alfalab/core-components/amount-input";
import { Gap } from "@alfalab/core-components/gap";
import { SliderInput } from "@alfalab/core-components/slider-input";
import { Typography } from "@alfalab/core-components/typography";

import rublesRound from "../../assets/credits-game/ruble_round.png";
import rublesSmall from "../../assets/credits-game/ruble_small.png";
import rubles from "../../assets/credits-game/rubles.png";
import {
  BONUS_CONFIG,
  CREDITS_GAME_STUB,
  INTEREST_RATE,
} from "../../constants/credits-game";
import { LS, LSKeys } from "../../ls";
import { type LandingBonusVariant } from "../../types/credits-game";
import { CreditsGameFinalBonusDescription } from "../credits-game-final-bonus-description";
import { CreditsGameStartButton } from "../credits-game-start-button";
import { useNavigate } from "react-router";

import styles from "./index.module.css";
import { sendDataToGA } from "../../utils/events.ts";

type Props = {
  variant: LandingBonusVariant;
};

const bonusBlocks: Record<LandingBonusVariant, React.ReactNode> = {
  reducedRate: (
    <React.Fragment>
      <CreditsGameFinalBonusDescription
        lines={["Супер бонус:", "Ставка снижена на 1%"]}
      />
      <Gap size={16} />
    </React.Fragment>
  ),
  paymentDate: (
    <React.Fragment>
      <CreditsGameFinalBonusDescription
        lines={["Супер бонус:", "Выбор даты платежа"]}
        extraLine="Ставка снижена на 1%"
        boldFirst={true}
      />
      <Gap size={16} />
    </React.Fragment>
  ),
  protection: (
    <React.Fragment>
      <CreditsGameFinalBonusDescription
        lines={["Супер бонус:", "Защита от просрочки"]}
        extraLine="Если вы забудете перевести деньги на счёт погашения, произойдёт автоматическое пополнение с других ваших счетов в Альфа-банке"
        boldFirst={true}
      />
      <Gap size={16} />
    </React.Fragment>
  ),
  paymentSchedule: (
    <React.Fragment>
      <CreditsGameFinalBonusDescription
        lines={["Супер бонус:", "Гибкий график платежей"]}
        extraLine="Оплачивайте кредит, когда и как вам удобно. Можете пропустить месяц платежей, а потом внести больше"
        boldFirst={true}
      />
      <Gap size={16} />
    </React.Fragment>
  ),
  noOptions: null,
};

const calcPayment = (sumValue: number, percent: number, term: number) =>
  (((sumValue * percent) / 1200) * (1 + percent / 1200) ** term) /
  ((1 + percent / 1200) ** term - 1);

const formatPipsValue = (value: number) =>
  value < 1_000_000 ? `${value / 1_000} тыс` : `${value / 1_000_000} млн`;

export const CreditsGameFinal = ({ variant }: Props) => {
  const [amount, setAmount] = useState(500_000);
  const [years, setYears] = useState(5);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const finalPayment = useMemo(
    () => Math.round(calcPayment(amount, INTEREST_RATE, years * 12)),
    [amount, years],
  );

  const formattedPayment = useMemo(
    () => finalPayment.toLocaleString("ru-RU"),
    [finalPayment],
  );

  const clamp = (value: number, min: number, max: number) =>
    Math.max(min, Math.min(max, value));

  const handleSumInputChange = (
    _: ChangeEvent<HTMLInputElement>,
    { value }: { value: number | string },
  ) => setAmount(Number(value) / 100);

  const handleSumSliderChange = ({ value }: { value: number }) =>
    setAmount(value);

  const handleYearInputChange = (
    _: ChangeEvent<HTMLInputElement>,
    { value }: { value: number | string },
  ) => setYears(Number(value));

  const handleYearSliderChange = ({ value }: { value: number }) =>
    setYears(value);

  const sendBid = () => {
    const activeBonus = BONUS_CONFIG.find(
      ({ bonusVariant }) =>
        bonusVariant ===
        LS.getItem(LSKeys.CREDITS_GAME_BONUS_VARIANT, "noOptions"),
    );

    setIsLoading(true);
    sendDataToGA({
      win_option: activeBonus ? activeBonus.win_option : "nothing",
      srok_kredita: String(years),
      sum_cred: String(amount),
      id: LS.getItem(LSKeys.USER_UUID, ""),
    }).then(() => {
      setIsLoading(false);
      LS.setItem(LSKeys.CREDITS_GAME_FINAL_CLICK, true);
      navigate(CREDITS_GAME_STUB);
    });
  };

  return (
    <div className={styles.layout}>
      <img className={styles.image} src={rubles} alt="Картинка рублей" />
      <Typography.TitleResponsive
        tag="h1"
        view="medium"
        color="primary"
        weight="bold"
      >
        Кредит наличными
      </Typography.TitleResponsive>
      <Gap size={20} />
      <Typography.Text view="primary-large" color="primary">
        Получите деньги уже сегодня
      </Typography.Text>
      <Gap size={32} />

      {bonusBlocks[variant]}

      <div
        className={cn(styles.descriptions, {
          [styles.descriptionsTransparent]: variant !== "noOptions",
        })}
      >
        {[
          { img: rublesSmall, lines: ["За 2 минуты", "Решение по кредиту"] },
          { img: rublesRound, lines: ["От 1 до 5 лет", "Срок кредита"] },
        ].map(({ img, lines }) => (
          <div key={img} className={styles.description}>
            <img
              src={img}
              width={48}
              height={48}
              alt="Картинка решения по кредиту"
            />
            <div className={styles.textContainer}>
              {lines.map((text) => (
                <Typography.Text
                  key={text}
                  view="primary-medium"
                  color="primary"
                >
                  {text}
                </Typography.Text>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Gap size={40} />

      <div className={styles.inputsContainer}>
        <SliderInput
          block={true}
          value={amount * 100}
          sliderValue={amount}
          onInputChange={handleSumInputChange}
          onSliderChange={handleSumSliderChange}
          onBlur={() => setAmount((prev) => clamp(prev, 30_000, 7_500_000))}
          min={30_000}
          max={7_500_000}
          range={{ min: 30_000, max: 7_500_000 }}
          pips={{
            mode: "values",
            values: [30_000, 7_500_000],
            format: { to: formatPipsValue },
          }}
          step={1_000}
          label="Сумма кредита"
          Input={AmountInput}
          labelView="outer"
          size={48}
        />
        <SliderInput
          block={true}
          value={years}
          sliderValue={years}
          onInputChange={handleYearInputChange}
          onSliderChange={handleYearSliderChange}
          onBlur={() => setYears((prev) => clamp(prev, 1, 5))}
          min={1}
          max={5}
          range={{ min: 1, max: 5 }}
          pips={{ mode: "values", values: [1, 2, 3, 4, 5] }}
          step={1}
          label="Срок кредитования"
          labelView="outer"
          size={48}
        />
        <Typography.Text view="primary-medium" color="primary">
          Ежемесячный платеж: {formattedPayment} ₽
        </Typography.Text>
      </div>

      <Gap size={128} />
      <CreditsGameStartButton
        isLoading={isLoading}
        onClick={sendBid}
        text="Отправить заявку"
      />
    </div>
  );
};
