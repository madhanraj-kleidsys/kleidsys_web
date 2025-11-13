import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from '@gsap/react';

export default function KleidSysLoader() {
  const [showText, setShowText] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const logoRef = useRef(null);
  const logoContainerRef = useRef(null);
  const textRef = useRef(null);
  const overlayRef = useRef(null);
  const heroRef = useRef(null);
  const titleRef = useRef(null);

  // KleidSys Brand Colors
  const BRAND_COLORS = {
    primary: '#002060',
    secondary: '#00aff0',
    accent: '#1e40af',
    background: '#f8fafc',
    dark: '#0f172a',
    white: '#ffffff',
    shadow: 'rgba(0, 160, 240, 0.3)'
  };

  // Hero animations (triggered after shutter closes)
  useGSAP(() => {
    if (!showContent) return;

    const tl = gsap.timeline({ delay: 0.5 });

    tl.from(titleRef.current, {
      y: 100,
      opacity: 0,
      rotationX: -20,
      scale: 0.7,
      duration: 1.2,
      ease: 'back.out(2)',
    });
  }, { scope: heroRef, dependencies: [showContent] });

  useEffect(() => {
    // PHASE 1: Hanging & Bounce Animation (0-2.5s)
    const tl = gsap.timeline();

    // Hang down from top with swing
    tl.from(logoContainerRef.current, {
      y: -300,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.in',
    }, 0);

    // Bounce effect after hanging
    tl.to(logoContainerRef.current, {
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1.2, 0.5)',
    });

    // Gentle floating animation
    tl.to(logoContainerRef.current, {
      y: -20,
      duration: 1.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    }, 2.1);

    // PHASE 2: SVG Path Drawing Animation (2.2-5s)
    const paths = logoRef.current.querySelectorAll(".logo-path");
    
    paths.forEach((path, index) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.stroke = BRAND_COLORS.white;
      path.style.fill = "none";
      path.style.strokeWidth = "2.8";

      // Staggered stroke drawing with easing
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2.0,
        delay: 2.2 + (index * 0.15), // Start after bounce
        ease: "power1.inOut",
      });
    });

    // PHASE 3: Dual Color Fill Animation (4.8-5.5s)
    gsap.to(".logo-path-primary", {
      fill: BRAND_COLORS.primary,
      duration: 0.5,
      delay: 4.8,
      ease: "back.out(1.2)",
    });

    gsap.to(".logo-path-accent", {
      fill: BRAND_COLORS.secondary,
      duration: 0.5,
      delay: 5.0,
      ease: "back.out(1.2)",
    });

    // Enhance glow after drawing
    gsap.to(".logo-svg", {
      filter: `drop-shadow(0 0 30px ${BRAND_COLORS.shadow})`,
      duration: 0.8,
      delay: 5.2,
      ease: "power2.out",
    });

    // PHASE 4: Text Reveal (5.5s)
    const timer1 = setTimeout(() => {
      setShowText(true);
    }, 5500);

    // PHASE 5: Shutter Effect (7.2s)
    const timer2 = setTimeout(() => {
      // Shutter slides up
      gsap.to(overlayRef.current, {
        top: "-100%",
        duration: 1.2,
        ease: "expo.inOut",
        onComplete: () => {
          setShowContent(true);
        },
      });
    }, 7200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Text letter-by-letter animation
  useEffect(() => {
    if (showText && textRef.current) {
      const letters = textRef.current.querySelectorAll(".letter");
      const tl = gsap.timeline();

      // Stagger each letter with 3D entrance
      tl.fromTo(
        letters,
        {
          opacity: 0,
          y: 40,
          rotationX: -90,
          scale: 0,
          transformOrigin: "center bottom",
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: "back.out(2)",
        }
      );

      // Add glow text shadow
      tl.to(
        letters,
        {
          textShadow: `0 0 20px ${BRAND_COLORS.secondary}, 0 0 40px ${BRAND_COLORS.shadow}`,
          duration: 0.8,
          ease: "power2.inOut",
        },
        0.2
      );

      // Bounce effect on letters
      letters.forEach((letter, i) => {
        tl.to(
          letter,
          {
            y: -8,
            duration: 0.3,
            ease: "power2.out",
          },
          0.6 + (i * 0.06)
        );
      });
    }
  }, [showText]);

  return (
    <div style={{ position: "relative", overflow: "hidden", width: "100vw", height: "100vh" }}>
      {/* SHUTTER OVERLAY */}
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: `linear-gradient(135deg, ${BRAND_COLORS.primary} 0%, ${BRAND_COLORS.accent} 50%, ${BRAND_COLORS.secondary} 100%)`,
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "80px",
          overflow: "hidden",
          margin: 0,
          padding: 0,
        }}
      >
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;800&family=Inter:wght@600;700&display=swap');

          html, body {
            width: 100vw;
            height: 100vh;
            overflow: hidden;
          }

          .logo-container {
            perspective: 1200px;
            display: flex;
            justify-content: center;
            will-change: transform;
          }

          .logo-svg {
            filter: drop-shadow(0 8px 20px rgba(0, 160, 240, 0.3));
            will-change: filter;
          }

          .logo-path {
            fill: none;
            stroke: ${BRAND_COLORS.white};
            stroke-width: 2.8;
            stroke-linecap: round;
            stroke-linejoin: round;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            will-change: stroke-dashoffset, fill;
          }

          .logo-path-primary {
            fill: ${BRAND_COLORS.primary} !important;
          }

          .logo-path-accent {
            fill: ${BRAND_COLORS.secondary} !important;
          }

          .text-wrapper {
            font-family: 'Montserrat', sans-serif;
            color: ${BRAND_COLORS.white};
            font-weight: 800;
            font-size: 72px;
            letter-spacing: 2px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
            flex-wrap: wrap;
            perspective: 1000px;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          }

          .letter {
            display: inline-block;
            min-width: 20px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            will-change: transform;
          }

          .letter:hover {
            transform: scale(1.15) rotateY(15deg);
            filter: brightness(1.3) drop-shadow(0 0 15px ${BRAND_COLORS.secondary});
          }

          .text-wrapper sup {
            font-size: 42px;
            font-weight: 600;
            vertical-align: super;
            margin-left: 8px;
          }

          /* MAIN CONTENT */
          .main-content {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(135deg, ${BRAND_COLORS.background} 0%, #e2e8f0 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .main-content.show {
            opacity: 1;
            pointer-events: auto;
          }

          .hero-section {
            position: relative;
            width: 100%;
            height: 100vh;
            background: linear-gradient(135deg, ${BRAND_COLORS.dark} 0%, ${BRAND_COLORS.primary} 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }

          .hero-image {
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at 30% 70%, ${BRAND_COLORS.secondary}20, transparent 50%),
                        radial-gradient(circle at 70% 20%, ${BRAND_COLORS.accent}15, transparent 50%);
            opacity: 0.3;
          }

          .hero-content {
            text-align: center;
            z-index: 2;
            max-width: 900px;
            padding: 4rem 2rem;
          }

          .hero-title {
            font-family: 'Montserrat', sans-serif;
            font-size: 5rem;
            font-weight: 800;
            background: linear-gradient(135deg, ${BRAND_COLORS.white} 0%, #f1f5f9 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            letter-spacing: -1px;
            line-height: 1.2;
            margin-bottom: 2rem;
          }

          @media (max-width: 768px) {
            .text-wrapper {
              font-size: 48px;
              letter-spacing: 1px;
            }

            .text-wrapper sup {
              font-size: 32px;
            }

            .logo-svg {
              width: 280px;
              height: 140px;
            }

            .hero-title {
              font-size: 3rem;
            }
          }

          @media (max-width: 480px) {
            .text-wrapper {
              font-size: 36px;
              letter-spacing: 0.5px;
            }

            .logo-svg {
              width: 220px;
              height: 110px;
            }

            .hero-title {
              font-size: 2.2rem;
            }
          }
        `}</style>

        {/* LOGO WITH BOUNCE & DRAWING ANIMATION */}
        <div ref={logoContainerRef} className="logo-container">
          <svg
            ref={logoRef}
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="380"
            height="190"
            viewBox="0 0 1935 854"
            preserveAspectRatio="xMidYMid meet"
            className="logo-svg"
          >
            {/* Primary Dark Blue Paths - All with class for fill animation */}
            <path
              className="logo-path logo-path-primary"
              d="M849.5 784 c-9.3 -0.5 -20.7 -1.2 -25.2 -1.5 l-8.3 -0.7 0 -120.8 0 -120.8 4.3 -0.6 c9.2 -1.2 65.3 -2.8 82.7 -2.3 16.9 0.5 34.6 2.7 36 4.5 0.3 0.4 3 1.6 6 2.6 3 1 6 2.4 6.5 3 1 1 2.3 1.9 8 5.1 2.8 1.6 10.5 9 10.5 10.1 0 0.5 1 2 2.3 3.4 2.3 2.5 7.7 12.9 7.7 14.9 0 0.6 0.3 1.1 0.8 1.1 1 0 2.6 5.6 4.8 16.5 1 5 2.2 9.2 2.5 9.5 1.7 1.2 3.4 27.4 3.4 53 0 27.1 -1.7 52.2 -3.6 52.8 -0.5 0.2 -0.9 1.6 -0.9 3.1 0 3.5 -5 23.4 -6 24.1 -0.4 0.3 -1.8 3 -3.1 6 -1.2 3 -3.3 6.6 -4.6 7.9 -1.3 1.3 -2.3 2.8 -2.3 3.4 0 1.2 -9.5 10.7 -10.7 10.7 -0.5 0 -1.9 1 -3.3 2.3 -2.7 2.4 -7 4.6 -13.5 6.8 -2.2 0.8 -4.2 1.7 -4.5 2.1 -0.3 0.3 -4.3 1.4 -9 2.4 -10 2 -52.7 2.7 -80.5 1.4z m69.4 -19.4 c5.2 -0.8 9.7 -1.8 10 -2.3 0.3 -0.5 3.2 -2 6.3 -3.2 6.4 -2.6 16.1 -11.4 18.4 -16.8 0.8 -1.8 1.8 -3.3 2.3 -3.3 0.5 0 2.2 -3.9 3.7 -8.7 1.5 -4.9 3.1 -9 3.5 -9.3 0.3 -0.3 1.5 -5.9 2.5 -12.5 2.6 -16.7 2.6 -76.1 0.1 -93.5 -0.9 -6.3 -2.1 -11.6 -2.7 -11.8 -0.5 -0.2 -1 -1.1 -1 -2 0 -3.3 -4.4 -15.8 -6.2 -17.5 -1 -1 -1.8 -2.4 -1.8 -3.1 0 -0.7 -1.6 -3.1 -3.6 -5.2 -2 -2.2 -4.6 -5.1 -5.8 -6.5 -2 -2.4 -12.2 -7.9 -14.5 -7.9 -0.6 0 -1.1 -0.4 -1.1 -0.9 0 -3.1 -38.7 -5 -72.7 -3.6 l-17.3 0.7 0 103.8 c0 82.1 0.3 103.9 1.3 104.3 0.6 0.3 16.5 0.6 35.2 0.6 24.5 0.1 36.6 -0.3 43.4 -1.3z"
            />
            <path
              className="logo-path logo-path-primary"
              d="M1107 784 c-6.3 -0.4 -17.1 -1.3 -24 -2 l-12.5 -1.2 0.3 -7.7 c0.2 -4.2 0.7 -7.9 1 -8.2 0.4 -0.3 10.6 -0.2 22.7 0.3 40.8 1.7 82.9 0.1 85.5 -3.3 0.3 -0.3 2.1 -1.4 4 -2.3 1.9 -0.9 4.2 -2.2 5 -2.9 2.6 -2 5.8 -8 6.6 -12.2 0.4 -2.2 1.2 -4.3 1.8 -4.7 1.7 -1.1 1.5 -38 -0.1 -38.6 -0.7 -0.2 -1.3 -1.2 -1.3 -2.2 0 -3.2 -3.4 -9.5 -7.3 -13.3 -3.8 -3.9 -10.7 -7.6 -13.9 -7.7 -1 0 -1.8 -0.4 -1.8 -0.8 0 -0.8 -6.8 -2.3 -24.5 -5.4 -3.8 -0.6 -7.2 -1.5 -7.5 -1.9 -0.3 -0.4 -7.5 -1.9 -16 -3.4 -8.5 -1.5 -15.7 -3 -16 -3.4 -0.3 -0.4 -2.5 -1.3 -5 -1.9 -5.7 -1.6 -12 -4.3 -14.1 -6.1 -5.8 -4.7 -12.6 -12 -14.2 -15 -1.1 -2 -2.2 -3.8 -2.6 -4.1 -2.3 -1.9 -5 -16.1 -5.8 -31 -0.8 -15.7 2.5 -41.9 5.6 -44 0.4 -0.3 2 -2.6 3.5 -5.2 1.5 -2.7 3.2 -4.8 3.6 -4.8 0.5 0 2.1 -1.3 3.6 -2.9 1.5 -1.6 4.5 -3.5 6.8 -4.2 2.3 -0.7 4.4 -1.7 4.7 -2.1 3.7 -5.3 67.3 -6.2 105.2 -1.6 9 1.1 9.8 1.4 10.4 3.6 0.5 2.2 -0.2 13.1 -0.9 13.7 -0.2 0.1 -10.2 -0.2 -22.3 -0.7 -25.7 -1.1 -71.2 -0.5 -77 1 -2.2 0.6 -4.1 1.6 -4.3 2.1 -0.2 0.6 -0.9 1.1 -1.5 1.1 -0.6 0 -2.8 1.2 -4.8 2.6 -3.5 2.4 -7.9 10.1 -7.9 13.8 0 0.8 -0.6 1.6 -1.2 1.9 -1.8 0.5 -1.9 38.4 -0.1 39.5 0.6 0.4 1.5 2.1 1.9 3.7 0.9 3.6 4.3 10.5 5.3 10.5 0.3 0 2 1.3 3.7 2.9 3.8 3.6 8.5 5.6 16.4 7.2 3.3 0.6 6 1.6 6 2 0 0.5 0.8 0.9 1.8 0.9 3.6 0 31.7 5.4 32 6.2 0.2 0.4 1.2 0.8 2.2 0.8 3.2 0 22.5 4.1 23 4.9 0.3 0.4 3.2 1.6 6.4 2.6 3.2 1 7 2.9 8.4 4.2 1.4 1.3 2.9 2.3 3.4 2.3 1.6 0 9.9 9.2 11.4 12.8 0.8 2 1.9 3.9 2.4 4.2 2.1 1.3 5 16.9 5.6 30 0.8 17.2 -1.8 39.9 -4.9 43.3 -0.7 0.7 -2.1 3 -3.2 5.2 -1.1 2.2 -3.8 5.7 -6 7.9 -3.8 3.6 -12.5 8.6 -15.2 8.6 -0.7 0 -1.3 0.4 -1.3 0.8 0 1.3 -9 3.1 -20.5 4.2 -11.1 1.1 -44.8 1.1 -62.5 0z"
            />
            <path
              className="logo-path logo-path-primary"
              d="M1556 784 c-19.5 -1.3 -37 -3.3 -37 -4.2 0 -0.4 0.4 -0.8 1 -0.8 0.5 0 1 -3.3 1.2 -7.2 l0.3 -7.3 16 0.5 c33 1 78.7 0.5 85 -0.9 3.3 -0.7 6.2 -1.6 6.5 -2 0.3 -0.3 2.6 -1.6 5.3 -2.9 2.7 -1.4 5.3 -3.5 6.2 -5.2 0.8 -1.5 2.1 -3.4 2.9 -4.2 5.7 -5.7 6.1 -49.5 0.5 -55.9 -1.1 -1.2 -1.9 -2.8 -1.9 -3.4 0 -2.4 -10 -10.2 -14.8 -11.6 -2.6 -0.7 -4.9 -1.6 -5.2 -2 -0.5 -0.7 -12 -3.1 -27 -5.6 -1.9 -0.3 -3.7 -0.9 -4 -1.3 -0.3 -0.3 -7.7 -1.9 -16.5 -3.5 -8.8 -1.5 -16.2 -3.1 -16.5 -3.5 -0.3 -0.4 -3.7 -1.6 -7.6 -2.8 -3.9 -1.2 -8.1 -3.1 -9.4 -4.2 -1.3 -1.1 -2.6 -2 -3 -2 -0.4 0 -3.1 -2.4 -6.1 -5.3 -5.4 -5.4 -9.9 -12.2 -9.9 -15 0 -0.9 -0.6 -2.2 -1.4 -2.9 -2.4 -2.5 -4.1 -15.6 -4.1 -32.3 0 -14.7 1.7 -30.2 3.4 -31.5 0.4 -0.3 1.5 -2.7 2.5 -5.4 2.4 -6.2 11.8 -15.9 17.2 -17.6 2.2 -0.7 4.1 -1.6 4.4 -1.9 1 -1.4 9.2 -3.2 18.7 -4.1 19.4 -1.9 60.4 -0.8 86.1 2.2 9.5 1.1 10.3 1.4 10.9 3.6 0.5 2.2 -0.2 13.1 -0.9 13.7 -0.2 0.1 -10.2 -0.2 -22.3 -0.7 -25.2 -1.1 -71.2 -0.5 -76.7 1 -2 0.5 -4.4 1.7 -5.3 2.6 -0.9 0.9 -2.2 1.6 -3 1.6 -2.4 0 -8.5 8.2 -10.3 13.9 -2.5 8.2 -2.4 38.1 0.2 46.4 1 3.2 2.4 6.1 3.2 6.4 0.8 0.3 1.4 1 1.4 1.6 0 1.5 5.1 6.7 6.6 6.7 0.6 0 1.4 0.6 1.7 1.3 0.5 1.3 8.4 4.1 15.2 5.3 2.2 0.4 4.2 1 4.5 1.4 0.3 0.3 7.9 1.9 17 3.5 9.1 1.6 16.7 3.2 17 3.6 0.3 0.3 5.6 1.6 11.9 2.7 6.3 1.2 11.7 2.5 12 3 0.3 0.4 3.2 1.6 6.4 2.6 3.2 0.9 6.7 2.6 7.8 3.7 1 1 2.1 1.9 2.4 1.9 2.7 0 12.5 10.2 12.5 13 0 0.6 0.4 1 0.9 1 1.1 0 4.5 8.9 5.6 14.5 0.4 2.2 1.2 4.3 1.8 4.7 1.6 1 1.7 41.6 0.1 42.6 -0.6 0.4 -1.5 2.9 -1.9 5.6 -0.9 6.2 -4.2 14.8 -6.1 15.9 -0.8 0.4 -1.4 1.4 -1.4 2.1 0 3.1 -14.9 13.6 -19.4 13.6 -0.8 0 -1.6 0.5 -1.8 1 -0.2 0.6 -3.9 1.8 -8.3 2.6 -9.4 1.8 -56.5 2.7 -74.5 1.4z"
            />
            <path
              className="logo-path logo-path-primary"
              d="M33 661 l0 -121 11.6 0 11.6 0 -0.5 49.8 c-0.3 27.3 -0.9 51.4 -1.2 53.5 l-0.7 3.7 16.8 0 c9.3 0 17.4 -0.4 17.9 -0.8 1.2 -0.9 5.5 -6.9 5.5 -7.7 0 -0.4 1.4 -2 3 -3.7 1.7 -1.6 3 -3.6 3 -4.3 0 -0.8 0.8 -2 1.8 -2.7 2 -1.5 7.2 -9.3 7.2 -10.8 0 -0.5 0.4 -1 1 -1 0.5 0 2.2 -1.9 3.7 -4.2 1.6 -2.3 3.6 -5 4.5 -6 1 -1 1.8 -2.2 1.8 -2.7 0 -0.4 1.1 -1.9 2.4 -3.3 1.2 -1.4 3.4 -4.3 4.6 -6.4 1.3 -2.2 3.6 -5.2 5.2 -6.8 1.5 -1.7 2.8 -3.5 2.8 -4.2 0 -0.7 0.8 -1.9 1.9 -2.6 1 -0.7 2.6 -2.8 3.5 -4.6 0.9 -1.8 2.4 -3.6 3.2 -3.9 0.7 -0.3 1.4 -0.9 1.4 -1.5 0 -0.5 1.1 -2.4 2.5 -4.2 1.4 -1.8 2.5 -3.8 2.5 -4.4 0 -0.7 0.4 -1.2 1 -1.2 0.5 0 2.2 -1.9 3.6 -4.2 1.5 -2.4 3.3 -4.7 4 -5.1 0.8 -0.4 1.4 -1.2 1.4 -1.8 0 -1.1 4 -7 5.5 -8.1 0.6 -0.4 6.5 -0.8 13.3 -0.8 12.1 0 12.2 0 10.3 1.9 -1.1 1.1 -2.7 3.4 -3.6 5 -0.8 1.7 -2 3.1 -2.5 3.1 -0.5 0 -1.1 0.9 -1.5 1.9 -0.3 1.1 -1.8 3.3 -3.3 4.9 -1.5 1.6 -3.3 4 -4 5.4 -0.8 1.4 -2.7 4 -4.3 5.9 -1.6 1.9 -3.7 4.9 -4.6 6.7 -0.8 1.7 -1.9 3.2 -2.3 3.2 -0.5 0 -2 2 -3.4 4.5 -1.5 2.4 -4 5.9 -5.6 7.7 -1.7 1.8 -3 3.8 -3 4.5 0 0.6 -0.6 1.6 -1.4 2 -0.7 0.4 -2.6 2.8 -4.1 5.3 -1.5 2.5 -3.1 4.7 -3.4 5 -1.5 1.2 -6.1 8 -6.1 8.9 0 0.6 -0.4 1.1 -1 1.1 -0.5 0 -2.1 2 -3.6 4.5 -1.4 2.5 -3 4.5 -3.5 4.5 -0.5 0 -0.9 0.5 -0.9 1.1 0 0.9 -4.6 7.7 -6.1 8.9 -0.3 0.3 -1.8 2.5 -3.3 4.9 -1.5 2.4 -5 6.5 -7.7 9.1 -2.7 2.6 -4.9 5.3 -4.9 5.9 0 0.7 1.8 2.9 4 4.8 2.2 2 4 4.1 4 4.6 0 0.5 1.1 1.8 2.5 2.9 1.4 1.1 2.5 2.5 2.5 3.3 0 0.7 1.4 2.6 3 4.2 1.7 1.5 3 3.3 3 3.9 0 0.6 1 2.2 2.3 3.6 2.7 3.1 4.2 5.3 6.4 9.6 0.9 1.7 2 3.2 2.4 3.2 0.4 0 1.9 2 3.3 4.5 1.5 2.5 3.1 4.5 3.6 4.5 0.6 0 1 0.5 1 1.2 0 0.6 1.1 2.6 2.5 4.4 1.4 1.8 2.5 3.7 2.5 4.3 0 0.6 0.4 1.1 1 1.1 0.5 0 1.9 1.8 3 3.9 1.1 2.2 2.6 4.4 3.2 4.8 1.3 0.8 2.9 3.3 5.5 8.5 0.7 1.4 1.9 2.8 2.6 3.1 0.7 0.3 2.3 2.5 3.6 5.1 1.3 2.5 2.8 4.6 3.2 4.6 0.5 0 1.5 1.2 2.3 2.8 0.8 1.5 2.5 4 3.9 5.6 1.4 1.6 3.1 4.1 3.8 5.5 0.8 1.4 2.6 3.9 4.1 5.5 1.6 1.7 2.8 3.5 2.8 4 0 1 0.9 2.2 6.8 9.7 l2.4 2.9 -13.1 0 c-13 0 -13.2 0 -14.1 -2.5 -0.5 -1.3 -1.8 -3.3 -2.9 -4.4 -1 -1 -3.1 -4 -4.6 -6.5 -1.5 -2.5 -3 -4.6 -3.4 -4.6 -0.4 0 -1.9 -2.1 -3.2 -4.6 -1.3 -2.6 -2.9 -4.9 -3.6 -5.1 -0.7 -0.3 -2 -1.9 -2.8 -3.7 -0.8 -1.7 -2.8 -4.7 -4.5 -6.6 -1.6 -1.9 -3 -4 -3 -4.7 0 -0.6 -1.3 -2.4 -3 -4 -1.6 -1.5 -3 -3.3 -3 -3.9 0 -0.6 -1.1 -2.3 -2.5 -3.8 -1.3 -1.4 -3.7 -4.8 -5.2 -7.4 -1.5 -2.6 -3.5 -5.3 -4.5 -6 -1 -0.7 -1.8 -1.9 -1.8 -2.6 0 -0.7 -1.1 -2.5 -2.5 -4 -1.4 -1.5 -2.5 -2.9 -2.5 -3.2 0 -0.3 -1.1 -2 -2.5 -3.8 -1.4 -1.8 -2.5 -3.8 -2.5 -4.3 0 -0.6 -0.7 -1.3 -1.5 -1.6 -0.8 -0.4 -2.3 -2.4 -3.5 -4.7 -1.1 -2.2 -2.5 -4 -3 -4 -0.6 0 -1 -0.5 -1 -1.1 0 -0.6 -1.1 -2.5 -2.5 -4.3 -1.4 -1.8 -2.5 -3.8 -2.5 -4.3 0 -0.6 -0.7 -1.3 -1.5 -1.6 -0.8 -0.4 -2.3 -2.4 -3.4 -4.5 -1.1 -2.2 -2.7 -4.2 -3.6 -4.6 -0.9 -0.3 -9.1 -0.6 -18.2 -0.6 l-16.5 0 0.7 3.3 c0.4 1.7 0.9 28.1 1.2 58.5 l0.5 55.2 -11.6 0 -11.6 0 0 -121z"
            />
            <path
              className="logo-path logo-path-primary"
              d="M298.8 781.3 c-2.1 -0.2 -3.8 -0.8 -3.8 -1.2 0 -0.5 -1.3 -1.1 -3 -1.4 -3.8 -0.8 -12 -4.5 -12 -5.5 0 -0.4 -1.4 -1.6 -3 -2.7 -1.7 -1.1 -4.3 -4.5 -5.8 -7.5 -1.5 -3 -3 -5.7 -3.4 -6 -2.4 -1.8 -2.8 -19.3 -2.8 -115.2 l0 -101.8 11.5 0 11.5 0 0.2 103.8 c0.3 97.1 0.4 103.9 2.1 107 1 1.7 2.2 3.2 2.7 3.2 0.6 0 1 0.6 1 1.4 0 1.4 7.4 5.6 9.8 5.6 0.7 0 1.2 0.5 1.2 1 0 0.7 17.2 1 49.5 1 l49.5 0 0 8 0 8 -4.9 0 c-2.7 0 -5.1 0.4 -5.3 1 -0.3 1 -88 2.2 -95 1.3z"
            />
            <path
              className="logo-path logo-path-primary"
              d="M505.8 781.4 c-1.6 -0.3 -2.8 -1 -2.8 -1.5 0 -0.5 -0.7 -0.9 -1.6 -0.9 -3.2 0 -11.1 -3.2 -14 -5.7 -1.6 -1.4 -3.8 -3.2 -4.9 -4.2 -1.1 -0.9 -3.1 -3.8 -4.5 -6.6 -1.4 -2.7 -2.8 -5.2 -3.2 -5.6 -2.4 -1.7 -2.8 -16.3 -2.8 -95.9 0 -80.7 0.4 -94.4 2.9 -95.9 0.5 -0.4 1.6 -2.3 2.4 -4.4 0.9 -2 2.3 -4 3.2 -4.3 0.8 -0.3 1.5 -1.2 1.5 -1.9 0 -0.8 1.2 -2.3 2.8 -3.4 1.5 -1.2 3.4 -2.6 4.2 -3.3 1.8 -1.6 9.9 -4.8 12.2 -4.8 0.9 0 1.8 -0.6 2.1 -1.2 0.5 -1.7 104 -1.5 104.5 0.1 0.2 0.6 2.6 1.1 5.3 1.1 l4.9 0 0 4.5 c0 2.5 -0.4 4.5 -1 4.5 -0.5 0 -1 1.6 -1 3.5 l0 3.5 -52.5 0 c-28.9 0 -52.5 0.4 -52.5 0.8 0 0.5 -1.7 1.4 -3.7 2.1 -6.2 1.9 -8.6 4.6 -11.2 13 -0.7 2.2 -1.1 15.4 -1.1 36.2 l0 32.9 53.5 0 53.5 0 0 9 0 9 -53.5 0 -53.6 0 0.3 43.3 c0.3 41.1 0.4 43.4 2.3 46.7 2.7 4.6 5.2 6.7 9.8 8.1 2 0.7 3.7 1.6 3.7 2.1 0 0.4 23.6 0.8 52.5 0.8 l52.5 0 0 3.5 c0 1.9 0.5 3.5 1 3.5 0.6 0 1 2 1 4.5 l0 4.5 -4.9 0 c-2.7 0 -5.1 0.5 -5.3 1 -0.3 1.1 -96.6 2.3 -102 1.4z"
            />
            <path
              className="logo-path logo-path-primary"
              d="M699 661 l0 -121 11.5 0 11.5 0 0 121 0 121 -11.5 0 -11.5 0 0 -121z"
            />
            <path
              className="logo-path logo-path-primary"
              d="M1357 737.6 c0 -38.7 -0.2 -44.7 -1.5 -46 -0.9 -0.8 -2.7 -4.1 -4.1 -7.3 -1.4 -3.2 -2.9 -6 -3.3 -6.3 -0.4 -0.3 -1.7 -3 -3 -6 -1.3 -3 -2.8 -5.9 -3.5 -6.5 -0.6 -0.5 -2.4 -3.9 -4 -7.5 -1.5 -3.6 -3.1 -6.7 -3.4 -7 -0.4 -0.3 -2 -3.2 -3.6 -6.5 -1.6 -3.3 -3.3 -6.2 -3.7 -6.5 -0.4 -0.3 -1.9 -3.4 -3.4 -7 -1.5 -3.6 -3 -6.7 -3.4 -7 -0.4 -0.3 -1.8 -2.7 -3.1 -5.5 -1.4 -2.7 -2.8 -5.2 -3.2 -5.5 -0.3 -0.3 -1.9 -3.4 -3.4 -7 -1.6 -3.6 -3.5 -7.3 -4.4 -8.2 -0.8 -0.9 -2.4 -3.9 -3.5 -6.7 -1.1 -2.8 -2.2 -5.1 -2.6 -5.1 -0.4 0 -1.7 -2.5 -2.9 -5.5 -1.2 -3.1 -2.8 -5.9 -3.4 -6.3 -0.6 -0.4 -2.5 -3.8 -4.1 -7.7 -1.6 -3.8 -3.2 -7.2 -3.6 -7.5 -0.3 -0.3 -1.8 -3.1 -3.3 -6.2 -1.5 -3.2 -3.1 -5.8 -3.6 -5.8 -0.4 0 -1 -0.8 -1.3 -1.7 -0.2 -1 -0.8 -2.6 -1.2 -3.5 -0.7 -1.7 0.2 -1.8 11.2 -1.8 l11.9 0 1.9 5 c1.1 2.8 2.2 5 2.5 5 0.3 0 1.9 2.8 3.5 6.3 1.6 3.4 3.2 6.4 3.6 6.7 0.4 0.3 2 3.4 3.5 7 1.6 3.6 3.1 6.7 3.5 7 0.4 0.3 2 3.4 3.6 7 1.5 3.6 3.5 7.2 4.4 8.1 0.9 0.9 2.4 3.9 3.4 6.7 1.1 2.9 2.2 5.2 2.5 5.2 0.4 0 2 3 3.5 6.8 1.6 3.7 3.2 6.9 3.6 7.2 0.4 0.3 1.7 2.7 2.8 5.3 1.1 2.6 2.4 4.7 2.9 4.7 0.5 0 2.2 3.2 3.7 7 1.5 3.9 3.1 7 3.5 7 0.4 0 2 3.2 3.5 7 1.5 3.9 3.1 7 3.5 7 0.3 0 1.9 3.8 3.5 8.5 2.8 8.1 4.9 10.6 7.4 9.1 0.4 -0.3 1.4 -2.6 2.1 -5.2 0.7 -2.5 1.9 -5.2 2.7 -6 0.8 -0.7 2.5 -4.4 3.8 -8 1.4 -3.7 2.8 -7 3.3 -7.3 0.5 -0.3 1.7 -2.8 2.8 -5.4 1 -2.6 2.7 -5.7 3.6 -6.7 1 -1 3 -4.8 4.5 -8.4 1.4 -3.6 3 -6.6 3.3 -6.6 0.4 0 2 -3.1 3.5 -7 1.5 -3.8 3.2 -7 3.6 -7 0.4 0 1.5 -2.3 2.5 -5 1 -2.8 2.6 -5.9 3.6 -6.9 0.9 -1.1 2.9 -4.8 4.4 -8.2 1.4 -3.5 3 -6.6 3.4 -6.9 0.4 -0.3 2 -3.4 3.5 -7 1.5 -3.6 3 -6.7 3.4 -7 0.4 -0.3 1.8 -2.7 3.1 -5.5 1.3 -2.7 2.9 -5.5 3.5 -6.1 0.6 -0.6 2.2 -3.9 3.5 -7.3 l2.5 -6.1 11.7 0 11.7 0 -2.1 4.8 c-1.1 2.6 -2.4 4.9 -2.8 5.2 -0.4 0.3 -1.8 3 -3.1 6 -1.3 3 -2.9 6 -3.5 6.5 -0.7 0.6 -2.2 3.5 -3.5 6.5 -1.3 3 -2.6 5.7 -3 6 -0.4 0.3 -2 3.4 -3.5 7 -1.6 3.6 -3.4 7 -4 7.5 -0.7 0.6 -2.2 3.5 -3.5 6.5 -1.3 3 -2.6 5.7 -3 6 -0.4 0.3 -2 3.4 -3.6 7 -1.5 3.6 -3.5 7.2 -4.4 8.1 -0.9 0.9 -2.4 3.9 -3.4 6.7 -1.1 2.9 -2.2 5.2 -2.5 5.2 -0.4 0 -2 3 -3.5 6.8 -1.6 3.7 -3.4 7 -4.1 7.4 -0.6 0.4 -2.2 3.2 -3.4 6.3 -1.2 3 -2.5 5.5 -2.9 5.5 -0.3 0 -1.7 2.7 -3 6 -1.3 3.3 -2.7 6 -3.1 6 -0.4 0 -2.1 2.9 -3.6 6.5 -1.6 3.6 -3.1 6.5 -3.5 6.5 -0.3 0 -1.9 3.2 -3.4 7 -1.5 3.9 -3.2 7 -3.7 7 -0.4 0 -0.8 19.8 -0.8 44 l0 44 -11 0 -11 0 0 -44.4z"
            />
            <path
              className="logo-path logo-path-primary"
              d="M919.7 395.8 c-0.4 -19.4 -0.7 -48.2 -0.7 -64 l0 -28.8 4 0 4 0 0 60 0 60 27.5 0 27.5 0 0 -72.2 c0 -70.6 -0.1 -72.4 -2.1 -76.8 -1.5 -3.3 -10.6 -13.2 -34.3 -37 -21.1 -21.2 -33.2 -34.1 -34.7 -37 -1.7 -3.3 -2.3 -6.2 -2.4 -11 0 -10.7 1.8 -13 40.1 -51.1 l33.9 -33.8 0.3 -42.1 c0.2 -23.1 -0.1 -42 -0.5 -42 -0.4 0.1 -33.9 33 -74.5 73.3 -69.6 69.2 -73.8 73.6 -77 80.2 -2.9 6.2 -3.3 7.9 -3.3 15.5 0 13.6 1.9 16.7 29.1 47.1 12.6 14 23.6 26.3 24.4 27.3 1.3 1.7 1.1 2.2 -3 5.8 l-4.5 3.8 -2.3 -2.6 c-2.1 -2.4 -2.2 -2.8 -0.7 -4.4 1.5 -1.7 0.5 -3 -16.2 -21.7 -9.8 -10.9 -19.9 -22.1 -22.4 -25 -9.1 -10.3 -13.8 -24.3 -11.9 -36 0.5 -3.1 2.5 -9.1 4.5 -13.2 3.4 -7.5 4.7 -8.8 84.2 -87.8 l80.8 -80.3 0.3 52.2 0.2 52.2 -35.4 35.6 c-19.5 19.5 -36.1 36.9 -37 38.7 -2.1 4.1 -2 11.5 0.1 16.1 1 2.2 14.3 16.5 33.4 35.7 17.5 17.6 32.5 32.9 33.4 34 0.8 1.1 2.4 4.9 3.5 8.4 1.9 6.1 2 8.9 2 81.2 l0 74.9 -34.8 0 -34.9 0 -0.6 -35.2z"
            />

            {/* Bright Blue Accent Path */}
            <path
              className="logo-path logo-path-accent"
              d="M711 216.6 l0 -209.6 37 0 37 0 0.2 169.8 0.3 169.7 37.5 -35.4 c20.6 -19.5 40.1 -37.9 43.2 -40.9 l5.7 -5.5 2 2.4 c1.1 1.3 2 2.7 2.1 3.1 0 0.7 -161.5 153.8 -163.8 155.2 -0.9 0.6 -1.2 -44.7 -1.2 -208.8z m44.8 157.9 l22.2 -21 0 -169.7 0 -169.8 -29.5 0 -29.5 0 0 197.6 0 197.7 7.3 -6.9 c4 -3.8 17.3 -16.3 29.5 -27.9z"
            />
          </svg>
        </div>

        {/* TEXT REVEAL */}
        {showText && (
          <div ref={textRef} className="text-wrapper">
            <span className="letter">K</span>
            <span className="letter">L</span>
            <span className="letter">E</span>
            <span className="letter">I</span>
            <span className="letter">D</span>
            <span className="letter">S</span>
            <span className="letter" style={{ marginRight: "12px" }}></span>
            <span className="letter">S</span>
            <span className="letter">Y</span>
            <span className="letter">S</span>
            <span className="letter" style={{ marginRight: "12px" }}></span>
            <span className="letter">P</span>
            <span className="letter">V</span>
            <span className="letter">T</span>
            <span className="letter" style={{ marginRight: "12px" }}></span>
            <span className="letter">L</span>
            <span className="letter">T</span>
            <span className="letter">D</span>
            <sup className="letter">®</sup>
          </div>
        )}
      </div>

      {/* MAIN CONTENT - HERO */}
      <div className="main-content">
        <div ref={heroRef} className="hero-section">
          <div className="hero-content">
            <div ref={titleRef} className="hero-title">
              KleidSys Technology
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

