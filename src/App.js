import React, { useState } from "react";
import Header from "./Header";
import WheelPage from "./WheelPage";
import InfoPage from "./InfoPage";
import "./styles.css";

export default function App() {
  const [page, setPage] = useState("info");
  const [userInfo, setUserInfo] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  const handleUserSubmit = (info) => {
    setUserInfo(info);
    setPage("wheel");
  };

  const handleWheelResult = (result) => {
    const newEntry = { ...userInfo, WheelResult: result };
    setSubmissions([...submissions, newEntry]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Top Navigation Bar */}
      <div className="top-nav">
        <button
          className={`tab-button ${page === "wheel" ? "active" : ""}`}
          onClick={() => setPage("wheel")}
        >
          Spin Wheel
        </button>
        <button
          className={`tab-button ${page === "info" ? "active" : ""}`}
          onClick={() => setPage("info")}
        >
          Sign up Form
        </button>
      </div>

      {/* Optional Header below nav */}
      <div className="header-bar">
        <Header />
      </div>

      {/* Page Content */}
      <div style={{ flex: 1, padding: 20 }}>
        {page === "wheel" ? (
          <WheelPage onSpin={handleWheelResult} />
        ) : (
          <InfoPage onSubmit={handleUserSubmit} />
        )}
      </div>
    </div>
  );
}
