import * as React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

const coloredSegments = [
  { text: "WE WANT TO HELP", color: "#fff" },
  { text: "MAKE THE INTERNET", color: "#fff" },
  { text: "EVERYTHING", color: "#ff6600" },
  { text: "IT CAN BE", color: "#ff6600" },
];

export default function StickyScrollColorText() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const p = Math.min(1, scrollY / maxScroll);
      setProgress(p);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      minHeight="250vh"
      bgcolor="#000"
      position="relative"
    >
      {/* Sticky Centered Text */}
      <Box
        sx={{
          position: "sticky",
          top: "35vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "30vh",
          width: "100%",
          zIndex: 100,
        }}
      >
        <Typography
          level="h1"
          sx={{
            fontWeight: 900,
            fontSize: "clamp(2rem, 7vw, 5rem)",
            textTransform: "uppercase",
            textAlign: "center",
            letterSpacing: "-0.05em",
            lineHeight: 1.1,
          }}
        >
          {coloredSegments.map((seg, i) => {
            const reveal = progress > (i / coloredSegments.length);
            return (
              <Box
                key={seg.text}
                component="span"
                sx={{
                  color: reveal ? seg.color : "#222",
                  transition: "color 0.3s cubic-bezier(.7,0,.3,1)",
                  marginRight: "0.5rem",
                  display: "inline-block",
                }}
              >
                {seg.text}
                {(i === 0 || i === 1) && <br />}
              </Box>
            );
          })}
        </Typography>
      </Box>
    </Box>
  );
}
