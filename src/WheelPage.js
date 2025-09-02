import React, { useState, useEffect } from "react";
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

// Simple confetti component
const Confetti = ({ recycle, numberOfPieces }) => {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (!recycle && pieces.length === 0) {
      // Create initial confetti pieces
      const newPieces = [];
      for (let i = 0; i < numberOfPieces; i++) {
        newPieces.push({
          id: i,
          left: Math.random() * 100,
          animationDelay: Math.random() * 3,
          size: Math.random() * 10 + 5,
          color: `hsl(${Math.random() * 360}, 100%, 50%)`,
          fallDuration: Math.random() * 3 + 2,
        });
      }
      setPieces(newPieces);
    } else if (recycle) {
      setPieces([]);
    }
  }, [recycle, numberOfPieces, pieces.length]);

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 10000,
    }}>
      {pieces.map(piece => (
        <div
          key={piece.id}
          style={{
            position: "absolute",
            top: "-10%",
            left: `${piece.left}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            borderRadius: "30%",
            opacity: 0.8,
            animation: `fall ${piece.fallDuration}s ease-in ${piece.animationDelay}s forwards`,
          }}
        />
      ))}
    </div>
  );
};

export default function WheelPage({ onSpin }) {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [startingIndex, setStartingIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  const handleSpinClick = () => {
    if (mustSpin) return;
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setResult(null);
    setShowConfetti(false);
  };

  const closePopup = () => {
    setResult(null);
    setShowConfetti(false);
  };

  useEffect(() => {
    if (result) {
      setShowConfetti(true);
      
      // Preload image to get its dimensions for proper aspect ratio
      const img = new Image();
      img.onload = () => {
        setImageDimensions({
          width: img.width,
          height: img.height
        });
      };
      img.src = result.image.uri;
      
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000); // Stop confetti after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [result]);

  return (
    <div className="wheel-container">
      <div style={{ 
        position: "relative", 
        display: "inline-block",
        marginTop: "0", // No margin
      }}>
        {/* Wheel with outline */}
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
            spinDuration={0.8}
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
              setStartingIndex(prizeNumber);
              setResult(data[prizeNumber]);
              if (onSpin) onSpin(data[prizeNumber]);
            }}
          />
        </div>

        {/* Center Logo Spin Button */}
        <img
          src={logo}
          alt="Spin Button"
          onClick={handleSpinClick}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: 80,
            width: 80,
            borderRadius: "50%",
            background: "#fff",
            padding: 8,
            boxShadow: "0 0 15px rgba(0,0,0,0.3)",
            cursor: "pointer",
            transition: "transform 0.2s",
            zIndex: 100,
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.transform =
              "translate(-50%, -50%) scale(1.1)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.transform = "translate(-50%, -50%)")
          }
        />
      </div>

      {/* Result Popup with confetti in front */}
      {result && (
        <>
          {/* Confetti in front of the popup */}
          {showConfetti && (
            <Confetti recycle={false} numberOfPieces={150} />
          )}
          
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
              padding: "16px",
              boxSizing: "border-box",
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: "#165FA9",
                padding: "30px 20px",
                borderRadius: "20px",
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.6)",
                color: "white",
                width: "100%",
                maxWidth: "350px",
                textAlign: "center",
                position: "relative",
                maxHeight: "90vh",
                overflowY: "auto",
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
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                  zIndex: 10001,
                }}
                aria-label="Close"
              >
                ×
              </button>

              <h2 style={{ 
                marginBottom: 15, 
                fontSize: "clamp(20px, 6vw, 28px)", 
                fontWeight: "bold",
                marginTop: 0 
              }}>
                You Won!
              </h2>
              
              {/* Image container with fixed aspect ratio */}
              <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "140px",
                margin: "20px auto 10px",
              }}>
                <img
                  src={result.image.uri}
                  alt="Prize"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                  onLoad={(e) => {
                    const img = e.target;
                    setImageDimensions({
                      width: img.naturalWidth,
                      height: img.naturalHeight
                    });
                  }}
                />
              </div>
              
              <p style={{ 
                fontSize: "clamp(16px, 4vw, 18px)", 
                margin: "20px 0",
                lineHeight: 1.4 
              }}>
                Congratulations! You've won a special prize!
              </p>
              <button
                onClick={closePopup}
                style={{
                  backgroundColor: "#FFD700",
                  color: "#000",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "30px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginTop: "10px",
                  width: "100%",
                  maxWidth: "200px"
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </>
      )}

      {/* Add CSS animation for confetti */}
      <style>
        {`
          @keyframes fall {
            0% {
              top: -10%;
              transform: rotate(0deg);
            }
            100% {
              top: 110%;
              transform: rotate(${Math.random() * 360}deg);
            }
          }
        `}
      </style>
    </div>
  );
}