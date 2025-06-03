import { Routes, Route } from "react-router";
import {
  CREDITS_GAME_FINAL_NO_OPTIONS,
  CREDITS_GAME_FINAL_PAYMENT_DATE,
  CREDITS_GAME_FINAL_PAYMENT_SCHEDULE,
  CREDITS_GAME_FINAL_PROTECTION,
  CREDITS_GAME_FINAL_REDUCED_RATE,
  CREDITS_GAME_INTERACTION_ATTEMPTS,
  CREDITS_GAME_STUB,
} from "./constants/credits-game";
import { CreditsGame } from "./components/credits-game";
import { CreditsGameFinal } from "./components/credits-game-final";
import { CreditsGameStub } from "./components/credits-game-stub";

export const App = () => {
  return (
    <Routes>
      <Route
        path={CREDITS_GAME_INTERACTION_ATTEMPTS}
        element={<CreditsGame variant="attempts" />}
      />
      <Route
        path={CREDITS_GAME_FINAL_NO_OPTIONS}
        element={<CreditsGameFinal variant="noOptions" />}
      />
      <Route
        path={CREDITS_GAME_FINAL_REDUCED_RATE}
        element={<CreditsGameFinal variant="reducedRate" />}
      />
      <Route
        path={CREDITS_GAME_FINAL_PAYMENT_DATE}
        element={<CreditsGameFinal variant="paymentDate" />}
      />
      <Route
        path={CREDITS_GAME_FINAL_PROTECTION}
        element={<CreditsGameFinal variant="protection" />}
      />
      <Route
        path={CREDITS_GAME_FINAL_PAYMENT_SCHEDULE}
        element={<CreditsGameFinal variant="paymentSchedule" />}
      />
      <Route path={CREDITS_GAME_STUB} element={<CreditsGameStub />} />
    </Routes>
  );
};
