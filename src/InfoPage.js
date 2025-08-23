export default function GoogleFormEmbed() {
  return (
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        padding: 20,
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        borderRadius: 10,
        backgroundColor: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: 30,
          color: "#165FA9",
          fontWeight: "700",
        }}
      >
        Please fill out the form
      </h2>

      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSdLbXbPc1pKVcQzLe0xhZrY0aaRJqhptMi3-a0YkZdcyPmJ4A/viewform?embedded=true"
        width="100%"
        height="700"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="Google Form"
        style={{
          border: "none",
          overflow: "hidden",
          borderRadius: 8,
          // Hide scrollbars for Webkit browsers
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE 10+
        }}
        scrolling="yes" // try to disable scrolling in older browsers
      >
        Loading…
      </iframe>
    </div>
  );
}
