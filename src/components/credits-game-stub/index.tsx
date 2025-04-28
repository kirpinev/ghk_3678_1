import smile from "../../assets/credits-game/smile.png";
import { Typography } from "@alfalab/core-components/typography";
import { ButtonMobile } from "@alfalab/core-components/button/mobile";
import styles from "./index.module.css";
import { Gap } from "@alfalab/core-components/gap";

export const CreditsGameStub = () => {
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
        <ButtonMobile block view="primary" href="" onClick={() => {}}>
          1 месяц подписки бесплатно
        </ButtonMobile>
        <Gap size={16} />
        <ButtonMobile block view="secondary" href="" onClick={() => {}}>
          На главный
        </ButtonMobile>
      </div>
    </>
  );
};
