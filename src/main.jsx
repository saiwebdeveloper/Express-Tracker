import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <GoogleReCaptchaProvider
        reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
        scriptProps={{ async: true, defer: true }}
      >
        <BrowserRouter>
          <App />
          <SpeedInsights />
        </BrowserRouter>
      </GoogleReCaptchaProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
