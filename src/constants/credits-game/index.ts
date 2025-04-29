import bonus4 from "../../assets/credits-game/bonus1.svg";
import bonus3 from "../../assets/credits-game/bonus2.svg";
import bonus2 from "../../assets/credits-game/bonus3.svg";
import bonus1 from "../../assets/credits-game/bonus4.svg";
import loader from "../../assets/credits-game/loader.png";
import smile1 from "../../assets/credits-game/smile1.png";
import smile2 from "../../assets/credits-game/smile2.png";
import smile3 from "../../assets/credits-game/smile3.png";
import smile4 from "../../assets/credits-game/smile4.png";
import {
  type BonusConfig,
  type LandingBonusVariant,
} from "../../types/credits-game";

export const CREDITS_GAME_LANDING_ATTEMPTS = "/";
export const CREDITS_GAME_LANDING_INFINITE = "/credits-game-landing-infinite";
export const CREDITS_GAME_INTERACTION_ATTEMPTS =
  "/credits-game-interaction-attempts";
export const CREDITS_GAME_INTERACTION_INFINITE =
  "/credits-game-interaction-infinite";
export const CREDITS_GAME_FINAL_NO_OPTIONS = "/credits-game-final-no-options";
export const CREDITS_GAME_FINAL_REDUCED_RATE =
  "/credits-game-final-reduced-rate";
export const CREDITS_GAME_FINAL_PAYMENT_DATE =
  "/credits-game-final-payment-date";
export const CREDITS_GAME_FINAL_PROTECTION = "/credits-game-final-protection";
export const CREDITS_GAME_FINAL_PAYMENT_SCHEDULE =
  "/credits-game-final-payment-schedule";
export const CREDITS_GAME_STUB = "/credits-game-stub";

export const ANSWER_COMBINATION = [2, 2, 0, 1];
export const MAX_ATTEMPTS = 3;
export const INITIAL_LOCK_ID = 3;
export const INTEREST_RATE = 33;
export const TIME_FOR_SMILE_LOADING_ANIMATION_DELAY = [400, 500, 600, 700];
export const TIME_FOR_STATUS_LOADING_ANIMATION_DELAY = [100, 300, 500, 700];
export const TIME_FOR_GAME_BUTTON_ANIMATION_DELAY = 1000;
export const TIME_FOR_GAME_ANIMATION_DELAYS = 200;
export const SMILE_IMAGES = [smile1, smile2, smile3, smile4];
export const LOADER_IMAGE = loader;
export const LANDING_BONUS_HREFS: Record<LandingBonusVariant, string> = {
  noOptions: CREDITS_GAME_FINAL_NO_OPTIONS,
  reducedRate: CREDITS_GAME_FINAL_REDUCED_RATE,
  paymentDate: CREDITS_GAME_FINAL_PAYMENT_DATE,
  protection: CREDITS_GAME_FINAL_PROTECTION,
  paymentSchedule: CREDITS_GAME_FINAL_PAYMENT_SCHEDULE,
};

export const BONUS_CONFIG: BonusConfig[] = [
  {
    key: "bonus4",
    image: bonus4,
    text: "Вы выиграли",
    subText: [
      "Снижение ставки на 1%",
      "Выбор даты платежа",
      "Защита от просрочки",
      "Гибкий график платежей",
    ],
    buttonText: "награды",
    href: CREDITS_GAME_FINAL_PAYMENT_SCHEDULE,
    bonusVariant: "paymentSchedule",
    variantName: "ghk_3678_1_gybkiy_graphic",
    win_option: "gybkiy_graphic",
  },
  {
    key: "bonus3",
    image: bonus3,
    text: "Вы выиграли",
    subText: [
      "Снижение ставки на 1%",
      "Выбор даты платежа",
      "Защита от просрочки",
    ],
    buttonText: "награды",
    href: CREDITS_GAME_FINAL_PROTECTION,
    bonusVariant: "protection",
    variantName: "ghk_3678_1_zashita_ot_prosrochki",
    win_option: "zashita_ot_prosrochki",
  },
  {
    key: "bonus2",
    image: bonus2,
    text: "Вы выиграли",
    subText: ["Снижение ставки на 1%", "Выбор даты платежа"],
    buttonText: "награды",
    href: CREDITS_GAME_FINAL_PAYMENT_DATE,
    bonusVariant: "paymentDate",
    variantName: "ghk_3678_1_vybor_daty",
    win_option: "vybor_daty",
  },
  {
    key: "bonus1",
    image: bonus1,
    text: "Вы выиграли",
    subText: ["Снижение ставки на 1%"],
    buttonText: "награду",
    href: CREDITS_GAME_FINAL_REDUCED_RATE,
    bonusVariant: "reducedRate",
    variantName: "ghk_3678_1_snizhenie",
    win_option: "snizhenie",
  },
];
