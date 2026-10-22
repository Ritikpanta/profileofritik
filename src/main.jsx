// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// self-hosted fonts
import "@fontsource/courier-prime/400.css";
import "@fontsource/courier-prime/400-italic.css";
import "@fontsource/courier-prime/700.css";
// only the subsets the site uses: the pen hand is English, the brush and serif are Nepali
import "@fontsource/nanum-pen-script/latin-400.css";
import "@fontsource/yatra-one/devanagari-400.css";
import "@fontsource/noto-serif-devanagari/devanagari-400.css";
import "@fontsource/noto-serif-devanagari/devanagari-600.css";

import App from "./App.jsx";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
