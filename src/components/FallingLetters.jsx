import * as Scrollytelling from "@bsmnt/scrollytelling";

const AnimatedCaps = ({ text }) => {
  const letters = text.split("");

  return (
    <Scrollytelling.Root style={{ height: "200vh" }}>
      <div style={{ position: "sticky", top: "30vh", display: "flex", justifyContent: "center" }}>
        {letters.map((char, i) => (
          <Scrollytelling.Animation
            key={i}
            tween={{
              start: i * 8,        // Each letter starts later, so colors animate on scroll
              end: i * 8 + 16,     // Adjust for smoother/faster transition
              from: { color: "#bbb", y: -80 },
              to: { color: "#1976d2", y: 0 }
            }}
            style={{
              fontSize: "5vw",
              fontWeight: "900",
              margin: "0 0.02em",
              display: char === " " ? "inline-block" : "inline-block"
            }}
          >
            {char === " " ? "\u00A0" : char}
          </Scrollytelling.Animation>
        ))}
      </div>
    </Scrollytelling.Root>
  );
};

export default function Demo() {
  return <AnimatedCaps text="SCROLLYTELLING DEMO" />;
}
