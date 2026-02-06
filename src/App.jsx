import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import Login from "./Login";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";
import Terms from "./Terms";
import PrivacyPolicy from "./PrivacyPolicy";

function App() {
  useEffect(() => {
    // Show custom message
    const showMessage = () => {
      const msg = document.getElementById("block-msg");
      if (!msg) return;

      msg.style.display = "block";
      setTimeout(() => {
        msg.style.display = "none";
      }, 1500);
    };

    // Disable right click
    const disableContextMenu = (e) => {
      e.preventDefault();
      showMessage();
    };

    // Disable keyboard shortcuts
    const disableKeys = (e) => {
      if (e.ctrlKey && ["c", "v", "u"].includes(e.key.toLowerCase())) {
        e.preventDefault();
        showMessage();
      }

      if (e.key === "F6") {
        e.preventDefault();
        showMessage();
      }
    };

    document.addEventListener("contextmenu", disableContextMenu);
    document.addEventListener("keydown", disableKeys);

    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
      document.removeEventListener("keydown", disableKeys);
    };
  }, []);

  return (
    <>
      {/* 🔒 Block message popup */}
      <div
        id="block-msg"
        style={{
          display: "none",
          position: "fixed",
          top: "20px",
          right: "20px",
          background: "#000",
          color: "#fff",
          padding: "10px 15px",
          borderRadius: "6px",
          zIndex: 9999,
          fontSize: "14px",
        }}
      >
        This action is disabled
      </div>

      {/* 🔀 Routes */}
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
