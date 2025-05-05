import smile from "../../assets/credits-game/smile.png";
import { Typography } from "@alfalab/core-components/typography";
import { ButtonMobile } from "@alfalab/core-components/button/mobile";
import styles from "./index.module.css";
import { Gap } from "@alfalab/core-components/gap";
import { BONUS_CONFIG } from "../../constants/credits-game";
import { LS, LSKeys } from "../../ls";

export const CreditsGameStub = () => {
  const getOneMonthSub = () => {
    const activeBonus = BONUS_CONFIG.find(
      ({ bonusVariant }) =>
        bonusVariant ===
        LS.getItem(LSKeys.CREDITS_GAME_BONUS_VARIANT, "noOptions"),
    );

    window.gtag("event", "3678_podpiska_click", {
      variant_name: activeBonus
        ? activeBonus.variantName
        : "ghk_3678_1_nothing",
      id: LS.getItem(LSKeys.USER_UUID, ""),
    });
  };

  return (
    <>
      <div className={styles.container}>
        <img
          alt="Картинка ракеты"
          src={smile}
          width={48}
          className={styles.image}
        />
        <Typography.TitleResponsive
          font="system"
          tag="h1"
          view="small"
          defaultMargins={false}
          weight="bold"
          style={{ marginTop: "24px", marginBottom: "12px", fontWeight: 500 }}
        >
          Спасибо за участие
        </Typography.TitleResponsive>
        <Typography.Text tag="p" view="primary-medium">
          Сейчас дорабатываем игру — забрать награды за неё пока не получится.
          За участие дарим 1 месяц подписки для новых пользователей Альфа-Смарт
        </Typography.Text>
      </div>

      <div className={styles.button}>
        <ButtonMobile block view="primary" href="" onClick={getOneMonthSub}>
          1 месяц подписки бесплатно
        </ButtonMobile>
        <Gap size={16} />
        <ButtonMobile block view="secondary" href="https://online.alfabank.ru/">
          На главный
        </ButtonMobile>
      </div>
    </>
  );
};
