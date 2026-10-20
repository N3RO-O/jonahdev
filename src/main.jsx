import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { initAnalytics } from "./analytics";
// Self-hosted type: Tomorrow (display + text), VT323 (pixel accents),
// Fragment Mono (labels and code). No third-party font requests.
import "@fontsource/tomorrow/400.css";
import "@fontsource/tomorrow/500.css";
import "@fontsource/tomorrow/600.css";
import "@fontsource/vt323/400.css";
import "@fontsource/fragment-mono/400.css";
import "lenis/dist/lenis.css";
import "./index.css";
import "./styles/nero.css";

initAnalytics();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
