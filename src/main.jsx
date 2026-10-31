import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { initAnalytics } from "./analytics";
// Self-hosted variable type: Big Shoulders Display (headings), Geist (text)
// and Geist Mono (labels). No third-party font requests.
import "@fontsource-variable/big-shoulders-display";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "lenis/dist/lenis.css";
import "./index.css";
import "./styles/nero.css";

initAnalytics();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
