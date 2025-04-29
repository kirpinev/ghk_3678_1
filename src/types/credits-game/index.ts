export type LandingBonusVariant =
  | "noOptions"
  | "reducedRate"
  | "paymentDate"
  | "protection"
  | "paymentSchedule";

export type LandingVariant = "infinite" | "attempts";

export type BonusKeys = "bonus1" | "bonus2" | "bonus3" | "bonus4";

export type BonusConfig = {
  key: BonusKeys;
  image: string;
  text: string;
  subText: string[];
  buttonText: string;
  href: string;
  bonusVariant: LandingBonusVariant;
  variantName: string;
  win_option: string;
};
