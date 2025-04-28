import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router";
import "swiper/css";
import { App } from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
