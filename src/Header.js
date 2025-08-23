import mascot from "./images/mascot.png";
import wids from "./images/wids.png";

export default function Header() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "4vw",
        marginBottom: 20,
        flexWrap: "nowrap",
      }}
    >
      {/* Left Image */}
      <img
        src={mascot}
        alt="Mascot"
        style={{
          maxHeight: 240,
          maxWidth: "clamp(80px, 20vw, 140px)",
          borderRadius: 10,
          objectFit: "cover",
        }}
      />

      {/* Right Side */}
      <div
        style={{
          textAlign: "center",
          width: "clamp(120px, 35vw, 300px)",
          userSelect: "none",
        }}
      >
        <div
          style={{
            fontSize: "clamp(16px, 4vw, 28px)",
            fontWeight: "bold",
            marginBottom: 10,
            color: "#333",
          }}
        >
          Join
        </div>
        <img
          src={wids}
          alt="WIDS"
          style={{
            maxHeight: 200,
            width: "100%",
            borderRadius: 10,
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
}
