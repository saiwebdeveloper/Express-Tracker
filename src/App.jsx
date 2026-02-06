import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import Login from "./Login";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";
import Terms from "./Terms";
import PrivacyPolicy from "./PrivacyPolicy";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>

      {/* ✅ Vercel Analytics */}
      <Analytics />

      {/* ✅ Vercel Speed Insights */}
      <SpeedInsights strategy="afterInteractive" />
    </>
  );
}

export default App;
