import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

// Images
import party from "./images/party.png";
import kitty from "./images/kitty.png";
import heart from "./images/heart.png";
import computer from "./images/computer.png";
import present from "./images/present.png";
import bulb from "./images/bulb.png";
import cutebulb from "./images/cutebulb.png";
import watermelon from "./images/watermelon.png";
import logo from "./images/logo.png";

// Prize data
const data = [
  { image: { uri: party, landscape: true, sizeMultiplier: 0.75, offsetX: 0 }, style: { height: 48 } },
  { image: { uri: heart, landscape: true, sizeMultiplier: 0.75, offsetX: 0 }, style: { height: 48 } },
  { image: { uri: computer, landscape: true, sizeMultiplier: 0.75, offsetX: 0 }, style: { height: 48 } },
  { image: { uri: kitty, landscape: true, sizeMultiplier: 0.75, offsetX: 0 }, style: { height: 48 } },
  { image: { uri: present, landscape: true, sizeMultiplier: 0.75, offsetX: 0 }, style: { height: 48 } },
  { image: { uri: bulb, landscape: true, sizeMultiplier: 0.75, offsetX: 0 }, style: { height: 48 } },
  { image: { uri: watermelon, landscape: true, sizeMultiplier: 0.75, offsetX: 0 }, style: { height: 48 } },
  { image: { uri: cutebulb, landscape: true, sizeMultiplier: 0.75, offsetX: 0 }, style: { height: 48 } },
];

export default function WheelPage() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [startingIndex, setStartingIndex] = useState(0);
  const [result, setResult] = useState(null);

  const handleSpinClick = () => {
    if (mustSpin) return; // prevent double clicks
    const newPrizeNumber = Math.floor(Math.random() * data.length);

    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setResult(null);
  };

  const closePopup = () => setResult(null);

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      {/* Wheel + Center Logo */}
      <div style={{ position: "relative", display: "inline-block" }}>
        {/* Black outline around wheel */}
        <div
          style={{
            padding: 0.1,
            backgroundColor: "#000",
            borderRadius: "50%",
            display: "inline-block",
          }}
        >
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            startingOptionIndex={startingIndex}
            spinDuration={0.8}  // smooth spin
            data={data}
            outerBorderColor={"#fff"}
            outerBorderWidth={20}
            innerBorderColor={"transparent"}
            radiusLineColor={"#000"}
            radiusLineWidth={5}
            textColors={["#fff"]}
            textDistance={60}
            fontSize={[18]}
            fontWeight={[500]}
            backgroundColors={[
              "#BBB2E6",
              "#80A5E0",
              "#28599C",
              "#80A5E0",
              "#BBB2E6",
              "#80A5E0",
              "#28599C",
              "#80A5E0",
            ]}
            onStopSpinning={() => {
              setMustSpin(false);
              setStartingIndex(prizeNumber); // keep next spin smooth
              setResult(data[prizeNumber]);
            }}
          />
        </div>

        {/* Center Logo as Spin Button */}
        <img
          src={logo}
          alt="Spin Button"
          onClick={handleSpinClick}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: 100,
            width: 100,
            borderRadius: "50%",
            background: "#fff",
            padding: 10,
            boxShadow: "0 0 15px rgba(0,0,0,0.3)",
            cursor: "pointer",
            transition: "transform 0.2s",
            zIndex: 100,
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "translate(-50%, -50%)")}
        />
      </div>

      {/* Result Popup */}
{result && (
  <div
    onClick={closePopup}
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        backgroundColor: "#165FA9",
        padding: "40px 30px",
        borderRadius: "20px",
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.6)",
        color: "#fff",
        width: "90%",
        maxWidth: "400px",
        textAlign: "center",
        position: "relative",
        animation: "fadeInUp 0.4s ease-out",
      }}
    >
      <button
        onClick={closePopup}
        style={{
          position: "absolute",
          top: 12,
          right: 14,
          background: "transparent",
          border: "none",
          fontSize: 26,
          color: "#fff",
          cursor: "pointer",
          fontWeight: "bold",
        }}
        aria-label="Close"
      >
        ×
      </button>

      <h2 style={{ marginBottom: 15, fontSize: 26, fontWeight: "bold" }}> You Won!</h2>
      <img
        src={result.image.uri}
        alt="Prize"
        style={{
          height: 150,
          margin: "20px auto 10px",
          display: "block",
        }}
      />
    </div>
  </div>
)}
    </div>
  );
}
