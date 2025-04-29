import { LandingBonusVariant } from "../types/credits-game";

export const enum LSKeys {
  CREDITS_GAME_LANDING_CLICK = "credits_game_landing_click_3678_1",
  CREDITS_GAME_BONUS_CLICK = "credits_game_bonus_click_3678_1",
  CREDITS_GAME_BONUS_VARIANT = "credits_game_bonus_variant_3678_1",
  CREDITS_GAME_FINAL_CLICK = "credits_game_final_click_3678_1",
  CREDITS_GAME_LAST_ATTEMPT = "credits_game_last_attempt_3678_1",
  NO_OPTIONS = "noOptions",
  REDUCED_RATE = "reducedRate",
  PAYMENT_DATE = "paymentDate",
  PROTECTION = "protection",
  PAYMENT_SCHEDULE = "paymentSchedule",
  MAX_ATTEMPTS = "maxAttempts_3678_1",
  TOTAL_WIN = "total_win_3678_1",
  USER_UUID = "userUUID_3678_1",
}

export interface LSData {
  [LSKeys.CREDITS_GAME_LANDING_CLICK]: boolean | string | null;
  [LSKeys.CREDITS_GAME_BONUS_CLICK]: boolean | string | null;
  [LSKeys.CREDITS_GAME_BONUS_VARIANT]: LandingBonusVariant;
  [LSKeys.CREDITS_GAME_FINAL_CLICK]: boolean | string | null;
  [LSKeys.CREDITS_GAME_LAST_ATTEMPT]: boolean | string | null;
  [LSKeys.NO_OPTIONS]: boolean | string | null;
  [LSKeys.REDUCED_RATE]: boolean | string | null;
  [LSKeys.PAYMENT_DATE]: boolean | string | null;
  [LSKeys.PROTECTION]: boolean | string | null;
  [LSKeys.PAYMENT_SCHEDULE]: boolean | string | null;
  [LSKeys.MAX_ATTEMPTS]: number;
  [LSKeys.TOTAL_WIN]: boolean;
  [LSKeys.USER_UUID]: string;
}

const getItem = <K extends LSKeys>(
  key: K,
  defaultValue: LSData[K],
): LSData[K] => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : defaultValue;
  } catch {
    return defaultValue;
  }
};
const setItem = <K extends LSKeys>(key: K, value: LSData[K]) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};
const deleteItem = <K extends LSKeys>(key: K) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};

export const LS = {
  getItem,
  setItem,
  deleteItem,
};
