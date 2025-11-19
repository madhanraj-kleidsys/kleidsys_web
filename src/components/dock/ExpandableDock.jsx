import React, { useState, useRef, useEffect } from "react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/joy";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaTimes,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import { HiMenuAlt4 } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import WaveText from "./WaveText";
import ImagePeelEffect from "./ImagePeelEffect";
import dockRight from "../../assets/dockRight.jpg";
// import ElasticKleidsysSVG from './ElasticKleidsysSVG';

gsap.registerPlugin(useGSAP);

const ExpandableDock = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);
  const kleidsysLogoRef = useRef(null);
  const kLogoRef = useRef(null);
  const contentRef = useRef(null);
  const navLinksRef = useRef([]);
  const overlayRef = useRef(null);
  const timelineRef = useRef(null);
  const navigate = useNavigate();

  // KLEIDSYS Logo stretch animation on mount
  useGSAP(() => {
    gsap.fromTo(
      kleidsysLogoRef.current,
      { scaleX: 0.5, opacity: 0 },
      {
        scaleX: 2.3,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(kleidsysLogoRef.current, {
            scaleX: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
          });
        },
      }
    );
  }, []);

  // K Logo drawing animation when expanded
  useEffect(() => {
    if (isOpen && kLogoRef.current) {
      const paths = kLogoRef.current.querySelectorAll("path");
      const tweens = [];

      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          fill: "transparent",
        });

        const tween1 = gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.inOut",
          delay: 0.3,
        });

        const tween2 = gsap.to(path, {
          fill: path.getAttribute("fill"),
          duration: 0.5,
          delay: 1.5,
        });

        tweens.push(tween1, tween2);
      });

      // Cleanup function
      return () => {
        tweens.forEach((tween) => tween.kill());
      };
    }
  }, [isOpen]);

  const openDock = () => {
    if (!navbarRef.current || !overlayRef.current) {
      console.log("Refs not ready");
      return;
    }

    setIsOpen(true);

    // Kill any existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const tl = gsap.timeline();
    timelineRef.current = tl;

    tl.to(navbarRef.current, {
      height: "calc(60vh)",
      borderRadius: "24px",
      duration: 0.8,
      ease: "power3.out",
    })
      .to(
        overlayRef.current,
        {
          opacity: 1,
          duration: 0.4,
        },
        "-=0.6"
      )
      .to(
        contentRef.current,
        {
          opacity: 1,
          y: 0,
          display: "flex", // Make visible
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .from(
        navLinksRef.current.filter(Boolean), // Filter out null refs
        {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .from(
        ".social-icon",
        {
          scale: 0,
          rotation: -180,
          stagger: 0.08,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      );
  };


  // Replace your closeDock function with this:
  const closeDock = () => {
    if (!contentRef.current || !navbarRef.current || !overlayRef.current) {
      return;
    }

    // Kill any existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const tl = gsap.timeline({
      onComplete: () => setIsOpen(false),
    });
    timelineRef.current = tl;

    tl.to(contentRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
    })
      .to(
        kLogoRef.current,
        {
          opacity: 0,
          scale: 0,
          duration: 0.3,
        },
        "-=0.2"
      )
      .to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.3,
        },
        "-=0.2"
      )
      .to(navbarRef.current, {
        height: "70px",
        borderRadius: "20px",
        duration: 0.6,
        ease: "power3.in",
      });
  };

  const toggleDock = () => {
    console.log("Toggle clicked, isOpen:", isOpen);
    console.log("Refs:", {
      navbar: navbarRef.current,
      content: contentRef.current,
      overlay: overlayRef.current
    });
    if (!isOpen) {
      openDock();
    } else {
      closeDock();
    }
  };

  // Navigation handler
  const handleNavigation = (path) => {
    closeDock(); // Close the dock first
    setTimeout(() => {
      navigate(path); // Then navigate to the page
    }, 300); // Delay to allow close animation to start
  };

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeDock();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "KleidSys", path: "/kleidsys" },
    { label: "Our Partners", path: "/partners" },
    { label: "Contact Us", path: "/contact" },
  ];

  const socialLinks = [
    { icon: FaInstagram, color: "#E4405F", label: "Instagram", path: "#" },
    { icon: FaFacebookF, color: "#1877F2", label: "Facebook", path: "#" },
    { icon: FaLinkedinIn, color: "#0A66C2", label: "LinkedIn", path: "#" },
    { icon: FaTwitter, color: "#1DA1F2", label: "Twitter", path: "#" },
    { icon: FaWhatsapp, color: "#25D366", label: "WhatsApp", path: "#" },
    { icon: FaEnvelope, color: "#22d3ee", label: "Email", path: "#" },
  ];

  // Add this useEffect at the end, before the return statement:
  useEffect(() => {
    return () => {
      // Cleanup all GSAP animations on unmount
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      gsap.killTweensOf([
        navbarRef.current,
        contentRef.current,
        overlayRef.current,
        kLogoRef.current,
        kleidsysLogoRef.current,
      ]);
    };
  }, []);


  return (
    <>
      {/* Backdrop Overlay */}
      <Box
        ref={overlayRef}
        onClick={closeDock}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(8px)",
          opacity: 0,
          pointerEvents: isOpen ? "auto" : "none",
          zIndex: 998,
        }}
      />
      {/* Expandable Navbar/Dock */}
      <Box
        ref={navbarRef}
        sx={{
          m: { xs: 2, sm: 3, md: 4 },
          mx: { md: 40 },
          // py:{md:2},
          borderRadius: "20px",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "70px",
          background: "linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)",
          boxShadow: isOpen
            ? "0 20px 60px rgba(0,0,0,0.15)"
            : "0 2px 18px 0 #bae6fd90, 0 3px 20px rgba(0,0,0,0.05)",
          zIndex: 999,
          overflow: "hidden",
        }}
      >
        {/* Top Bar (Always Visible) */}
        <Box
          sx={{
            height: "70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: { xs: 2, md: 4 },
          }}
        >
          {/* Menu Button */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              cursor: "pointer",
            }}
            onClick={toggleDock}
          >
            <IconButton
              variant="plain"
              sx={{
                fontSize: "1.8rem",
                color: "#0ea5e9",
                backgroundColor: "#ffffffb9",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                transition: "all 0.7s",
                "&:hover": {
                  transform: "rotate(90deg)",
                  color: "#0ea5e9",
                  backgroundColor: "#c0b8b810",
                },
              }}
            >
              {isOpen ? <FaTimes /> : <HiMenuAlt4 />}
            </IconButton>
            <Typography
              level="h4"
              sx={{
                fontWeight: 700,
                color: "#2d3748",
                letterSpacing: "1px",
                fontSize: { xs: "1rem", md: "1.2rem" },
                transition: "all 0.3s",
                "&:hover": {
                  transform: "rotate(-2deg)",
                  color: "#0ea5e9",
                },
              }}
            >
              Menu
            </Typography>
          </Box>

          {/* Center - KLEIDSYS Logo (visible when closed) */}
          <Box
            ref={kleidsysLogoRef}
            onClick={() => handleNavigation("/")}
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              cursor: "pointer",
              transition: "transform 0.3s ease-in-out",
              zIndex: 10,
              "&:hover": {
                transform: "translateX(-50%) scale(1.05)",
              },
            }}
          >
            {!isOpen && (
              <svg
                width="200"
                height="40"
                viewBox="0 220 1700 800"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="#002060" stroke="#002060" strokeWidth="18">
                  <path d="M33 661 l0 -121 11.6 0 11.6 0 -0.5 49.8 c-0.3 27.3 -0.9 51.4 -1.2 53.5 l-0.7 3.7 16.8 0 c9.3 0 17.4 -0.4 17.9 -0.8 1.2 -0.9 5.5 -6.9 5.5 -7.7 0 -0.4 1.4 -2 3 -3.7 1.7 -1.6 3 -3.6 3 -4.3 0 -0.8 0.8 -2 1.8 -2.7 2 -1.5 7.2 -9.3 7.2 -10.8 0 -0.5 0.4 -1 1 -1 0.5 0 2.2 -1.9 3.7 -4.2 1.6 -2.3 3.6 -5 4.5 -6 1 -1 1.8 -2.2 1.8 -2.7 0 -0.4 1.1 -1.9 2.4 -3.3 1.2 -1.4 3.4 -4.3 4.6 -6.4 1.3 -2.2 3.6 -5.2 5.2 -6.8 1.5 -1.7 2.8 -3.5 2.8 -4.2 0 -0.7 0.8 -1.9 1.9 -2.6 1 -0.7 2.6 -2.8 3.5 -4.6 0.9 -1.8 2.4 -3.6 3.2 -3.9 0.7 -0.3 1.4 -0.9 1.4 -1.5 0 -0.5 1.1 -2.4 2.5 -4.2 1.4 -1.8 2.5 -3.8 2.5 -4.4 0 -0.7 0.4 -1.2 1 -1.2 0.5 0 2.2 -1.9 3.6 -4.2 1.5 -2.4 3.3 -4.7 4 -5.1 0.8 -0.4 1.4 -1.2 1.4 -1.8 0 -1.1 4 -7 5.5 -8.1 0.6 -0.4 6.5 -0.8 13.3 -0.8 12.1 0 12.2 0 10.3 1.9 -1.1 1.1 -2.7 3.4 -3.6 5 -0.8 1.7 -2 3.1 -2.5 3.1 -0.5 0 -1.1 0.9 -1.5 1.9 -0.3 1.1 -1.8 3.3 -3.3 4.9 -1.5 1.6 -3.3 4 -4 5.4 -0.8 1.4 -2.7 4 -4.3 5.9 -1.6 1.9 -3.7 4.9 -4.6 6.7 -0.8 1.7 -1.9 3.2 -2.3 3.2 -0.5 0 -2 2 -3.4 4.5 -1.5 2.4 -4 5.9 -5.6 7.7 -1.7 1.8 -3 3.8 -3 4.5 0 0.6 -0.6 1.6 -1.4 2 -0.7 0.4 -2.6 2.8 -4.1 5.3 -1.5 2.5 -3.1 4.7 -3.4 5 -1.5 1.2 -6.1 8 -6.1 8.9 0 0.6 -0.4 1.1 -1 1.1 -0.5 0 -2.1 2 -3.6 4.5 -1.4 2.5 -3 4.5 -3.5 4.5 -0.5 0 -0.9 0.5 -0.9 1.1 0 0.9 -4.6 7.7 -6.1 8.9 -0.3 0.3 -1.8 2.5 -3.3 4.9 -1.5 2.4 -5 6.5 -7.7 9.1 -2.7 2.6 -4.9 5.3 -4.9 5.9 0 0.7 1.8 2.9 4 4.8 2.2 2 4 4.1 4 4.6 0 0.5 1.1 1.8 2.5 2.9 1.4 1.1 2.5 2.5 2.5 3.3 0 0.7 1.4 2.6 3 4.2 1.7 1.5 3 3.3 3 3.9 0 0.6 1 2.2 2.3 3.6 2.7 3.1 4.2 5.3 6.4 9.6 0.9 1.7 2 3.2 2.4 3.2 0.4 0 1.9 2 3.3 4.5 1.5 2.5 3.1 4.5 3.6 4.5 0.6 0 1 0.5 1 1.2 0 0.6 1.1 2.6 2.5 4.4 1.4 1.8 2.5 3.7 2.5 4.3 0 0.6 0.4 1.1 1 1.1 0.5 0 1.9 1.8 3 3.9 1.1 2.2 2.6 4.4 3.2 4.8 1.3 0.8 2.9 3.3 5.5 8.5 0.7 1.4 1.9 2.8 2.6 3.1 0.7 0.3 2.3 2.5 3.6 5.1 1.3 2.5 2.8 4.6 3.2 4.6 0.5 0 1.5 1.2 2.3 2.8 0.8 1.5 2.5 4 3.9 5.6 1.4 1.6 3.1 4.1 3.8 5.5 0.8 1.4 2.6 3.9 4.1 5.5 1.6 1.7 2.8 3.5 2.8 4 0 1 0.9 2.2 6.8 9.7 l2.4 2.9 -13.1 0 c-13 0 -13.2 0 -14.1 -2.5 -0.5 -1.3 -1.8 -3.3 -2.9 -4.4 -1 -1 -3.1 -4 -4.6 -6.5 -1.5 -2.5 -3 -4.6 -3.4 -4.6 -0.4 0 -1.9 -2.1 -3.2 -4.6 -1.3 -2.6 -2.9 -4.9 -3.6 -5.1 -0.7 -0.3 -2 -1.9 -2.8 -3.7 -0.8 -1.7 -2.8 -4.7 -4.5 -6.6 -1.6 -1.9 -3 -4 -3 -4.7 0 -0.6 -1.3 -2.4 -3 -4 -1.6 -1.5 -3 -3.3 -3 -3.9 0 -0.6 -1.1 -2.3 -2.5 -3.8 -1.3 -1.4 -3.7 -4.8 -5.2 -7.4 -1.5 -2.6 -3.5 -5.3 -4.5 -6 -1 -0.7 -1.8 -1.9 -1.8 -2.6 0 -0.7 -1.1 -2.5 -2.5 -4 -1.4 -1.5 -2.5 -2.9 -2.5 -3.2 0 -0.3 -1.1 -2 -2.5 -3.8 -1.4 -1.8 -2.5 -3.8 -2.5 -4.3 0 -0.6 -0.7 -1.3 -1.5 -1.6 -0.8 -0.4 -2.3 -2.4 -3.5 -4.7 -1.1 -2.2 -2.5 -4 -3 -4 -0.6 0 -1 -0.5 -1 -1.1 0 -0.6 -1.1 -2.5 -2.5 -4.3 -1.4 -1.8 -2.5 -3.8 -2.5 -4.3 0 -0.6 -0.7 -1.3 -1.5 -1.6 -0.8 -0.4 -2.3 -2.4 -3.4 -4.5 -1.1 -2.2 -2.7 -4.2 -3.6 -4.6 -0.9 -0.3 -9.1 -0.6 -18.2 -0.6 l-16.5 0 0.7 3.3 c0.4 1.7 0.9 28.1 1.2 58.5 l0.5 55.2 -11.6 0 -11.6 0 0 -121z" />
                  <path d="M298.8 781.3 c-2.1 -0.2 -3.8 -0.8 -3.8 -1.2 0 -0.5 -1.3 -1.1 -3 -1.4 -3.8 -0.8 -12 -4.5 -12 -5.5 0 -0.4 -1.4 -1.6 -3 -2.7 -1.7 -1.1 -4.3 -4.5 -5.8 -7.5 -1.5 -3 -3 -5.7 -3.4 -6 -2.4 -1.8 -2.8 -19.3 -2.8 -115.2 l0 -101.8 11.5 0 11.5 0 0.2 103.8 c0.3 97.1 0.4 103.9 2.1 107 1 1.7 2.2 3.2 2.7 3.2 0.6 0 1 0.6 1 1.4 0 1.4 7.4 5.6 9.8 5.6 0.7 0 1.2 0.5 1.2 1 0 0.7 17.2 1 49.5 1 l49.5 0 0 8 0 8 -4.9 0 c-2.7 0 -5.1 0.4 -5.3 1 -0.3 1 -88 2.2 -95 1.3z" />
                  <path d="M505.8 781.4 c-1.6 -0.3 -2.8 -1 -2.8 -1.5 0 -0.5 -0.7 -0.9 -1.6 -0.9 -3.2 0 -11.1 -3.2 -14 -5.7 -1.6 -1.4 -3.8 -3.2 -4.9 -4.2 -1.1 -0.9 -3.1 -3.8 -4.5 -6.6 -1.4 -2.7 -2.8 -5.2 -3.2 -5.6 -2.4 -1.7 -2.8 -16.3 -2.8 -95.9 0 -80.7 0.4 -94.4 2.9 -95.9 0.5 -0.4 1.6 -2.3 2.4 -4.4 0.9 -2 2.3 -4 3.2 -4.3 0.8 -0.3 1.5 -1.2 1.5 -1.9 0 -0.8 1.2 -2.3 2.8 -3.4 1.5 -1.2 3.4 -2.6 4.2 -3.3 1.8 -1.6 9.9 -4.8 12.2 -4.8 0.9 0 1.8 -0.6 2.1 -1.2 0.5 -1.7 104 -1.5 104.5 0.1 0.2 0.6 2.6 1.1 5.3 1.1 l4.9 0 0 4.5 c0 2.5 -0.4 4.5 -1 4.5 -0.5 0 -1 1.6 -1 3.5 l0 3.5 -52.5 0 c-28.9 0 -52.5 0.4 -52.5 0.8 0 0.5 -1.7 1.4 -3.7 2.1 -6.2 1.9 -8.6 4.6 -11.2 13 -0.7 2.2 -1.1 15.4 -1.1 36.2 l0 32.9 53.5 0 53.5 0 0 9 0 9 -53.5 0 -53.6 0 0.3 43.3 c0.3 41.1 0.4 43.4 2.3 46.7 2.7 4.6 5.2 6.7 9.8 8.1 2 0.7 3.7 1.6 3.7 2.1 0 0.4 23.6 0.8 52.5 0.8 l52.5 0 0 3.5 c0 1.9 0.5 3.5 1 3.5 0.6 0 1 2 1 4.5 l0 4.5 -4.9 0 c-2.7 0 -5.1 0.5 -5.3 1 -0.3 1.1 -96.6 2.3 -102 1.4z" />
                  <path d="M699 661 l0 -121 11.5 0 11.5 0 0 121 0 121 -11.5 0 -11.5 0 0 -121z" />
                  <path d="M849.5 784 c-9.3 -0.5 -20.7 -1.2 -25.2 -1.5 l-8.3 -0.7 0 -120.8 0 -120.8 4.3 -0.6 c9.2 -1.2 65.3 -2.8 82.7 -2.3 16.9 0.5 34.6 2.7 36 4.5 0.3 0.4 3 1.6 6 2.6 3 1 6 2.4 6.5 3 1 1 2.3 1.9 8 5.1 2.8 1.6 10.5 9 10.5 10.1 0 0.5 1 2 2.3 3.4 2.3 2.5 7.7 12.9 7.7 14.9 0 0.6 0.3 1.1 0.8 1.1 1 0 2.6 5.6 4.8 16.5 1 5 2.2 9.2 2.5 9.5 1.7 1.2 3.4 27.4 3.4 53 0 27.1 -1.7 52.2 -3.6 52.8 -0.5 0.2 -0.9 1.6 -0.9 3.1 0 3.5 -5 23.4 -6 24.1 -0.4 0.3 -1.8 3 -3.1 6 -1.2 3 -3.3 6.6 -4.6 7.9 -1.3 1.3 -2.3 2.8 -2.3 3.4 0 1.2 -9.5 10.7 -10.7 10.7 -0.5 0 -1.9 1 -3.3 2.3 -2.7 2.4 -7 4.6 -13.5 6.8 -2.2 0.8 -4.2 1.7 -4.5 2.1 -0.3 0.3 -4.3 1.4 -9 2.4 -10 2 -52.7 2.7 -80.5 1.4z m69.4 -19.4 c5.2 -0.8 9.7 -1.8 10 -2.3 0.3 -0.5 3.2 -2 6.3 -3.2 6.4 -2.6 16.1 -11.4 18.4 -16.8 0.8 -1.8 1.8 -3.3 2.3 -3.3 0.5 0 2.2 -3.9 3.7 -8.7 1.5 -4.9 3.1 -9 3.5 -9.3 0.3 -0.3 1.5 -5.9 2.5 -12.5 2.6 -16.7 2.6 -76.1 0.1 -93.5 -0.9 -6.3 -2.1 -11.6 -2.7 -11.8 -0.5 -0.2 -1 -1.1 -1 -2 0 -3.3 -4.4 -15.8 -6.2 -17.5 -1 -1 -1.8 -2.4 -1.8 -3.1 0 -0.7 -1.6 -3.1 -3.6 -5.2 -2 -2.2 -4.6 -5.1 -5.8 -6.5 -2 -2.4 -12.2 -7.9 -14.5 -7.9 -0.6 0 -1.1 -0.4 -1.1 -0.9 0 -3.1 -38.7 -5 -72.7 -3.6 l-17.3 0.7 0 103.8 c0 82.1 0.3 103.9 1.3 104.3 0.6 0.3 16.5 0.6 35.2 0.6 24.5 0.1 36.6 -0.3 43.4 -1.3z" />
                  <path d="M1107 784 c-6.3 -0.4 -17.1 -1.3 -24 -2 l-12.5 -1.2 0.3 -7.7 c0.2 -4.2 0.7 -7.9 1 -8.2 0.4 -0.3 10.6 -0.2 22.7 0.3 40.8 1.7 82.9 0.1 85.5 -3.3 0.3 -0.3 2.1 -1.4 4 -2.3 1.9 -0.9 4.2 -2.2 5 -2.9 2.6 -2 5.8 -8 6.6 -12.2 0.4 -2.2 1.2 -4.3 1.8 -4.7 1.7 -1.1 1.5 -38 -0.1 -38.6 -0.7 -0.2 -1.3 -1.2 -1.3 -2.2 0 -3.2 -3.4 -9.5 -7.3 -13.3 -3.8 -3.9 -10.7 -7.6 -13.9 -7.7 -1 0 -1.8 -0.4 -1.8 -0.8 0 -0.8 -6.8 -2.3 -24.5 -5.4 -3.8 -0.6 -7.2 -1.5 -7.5 -1.9 -0.3 -0.4 -7.5 -1.9 -16 -3.4 -8.5 -1.5 -15.7 -3 -16 -3.4 -0.3 -0.4 -2.5 -1.3 -5 -1.9 -5.7 -1.6 -12 -4.3 -14.1 -6.1 -5.8 -4.7 -12.6 -12 -14.2 -15 -1.1 -2 -2.2 -3.8 -2.6 -4.1 -2.3 -1.9 -5 -16.1 -5.8 -31 -0.8 -15.7 2.5 -41.9 5.6 -44 0.4 -0.3 2 -2.6 3.5 -5.2 1.5 -2.7 3.2 -4.8 3.6 -4.8 0.5 0 2.1 -1.3 3.6 -2.9 1.5 -1.6 4.5 -3.5 6.8 -4.2 2.3 -0.7 4.4 -1.7 4.7 -2.1 3.7 -5.3 67.3 -6.2 105.2 -1.6 9 1.1 9.8 1.4 10.4 3.6 0.5 2.2 -0.2 13.1 -0.9 13.7 -0.2 0.1 -10.2 -0.2 -22.3 -0.7 -25.7 -1.1 -71.2 -0.5 -77 1 -2.2 0.6 -4.1 1.6 -4.3 2.1 -0.2 0.6 -0.9 1.1 -1.5 1.1 -0.6 0 -2.8 1.2 -4.8 2.6 -3.5 2.4 -7.9 10.1 -7.9 13.8 0 0.8 -0.6 1.6 -1.2 1.9 -1.8 0.5 -1.9 38.4 -0.1 39.5 0.6 0.4 1.5 2.1 1.9 3.7 0.9 3.6 4.3 10.5 5.3 10.5 0.3 0 2 1.3 3.7 2.9 3.8 3.6 8.5 5.6 16.4 7.2 3.3 0.6 6 1.6 6 2 0 0.5 0.8 0.9 1.8 0.9 3.6 0 31.7 5.4 32 6.2 0.2 0.4 1.2 0.8 2.2 0.8 3.2 0 22.5 4.1 23 4.9 0.3 0.4 3.2 1.6 6.4 2.6 3.2 1 7 2.9 8.4 4.2 1.4 1.3 2.9 2.3 3.4 2.3 1.6 0 9.9 9.2 11.4 12.8 0.8 2 1.9 3.9 2.4 4.2 2.1 1.3 5 16.9 5.6 30 0.8 17.2 -1.8 39.9 -4.9 43.3 -0.7 0.7 -2.1 3 -3.2 5.2 -1.1 2.2 -3.8 5.7 -6 7.9 -3.8 3.6 -12.5 8.6 -15.2 8.6 -0.7 0 -1.3 0.4 -1.3 0.8 0 1.3 -9 3.1 -20.5 4.2 -11.1 1.1 -44.8 1.1 -62.5 0z" />
                  <path d="M1357 737.6 c0 -38.7 -0.2 -44.7 -1.5 -46 -0.9 -0.8 -2.7 -4.1 -4.1 -7.3 -1.4 -3.2 -2.9 -6 -3.3 -6.3 -0.4 -0.3 -1.7 -3 -3 -6 -1.3 -3 -2.8 -5.9 -3.5 -6.5 -0.6 -0.5 -2.4 -3.9 -4 -7.5 -1.5 -3.6 -3.1 -6.7 -3.4 -7 -0.4 -0.3 -2 -3.2 -3.6 -6.5 -1.6 -3.3 -3.3 -6.2 -3.7 -6.5 -0.4 -0.3 -1.9 -3.4 -3.4 -7 -1.5 -3.6 -3 -6.7 -3.4 -7 -0.4 -0.3 -1.8 -2.7 -3.1 -5.5 -1.4 -2.7 -2.8 -5.2 -3.2 -5.5 -0.3 -0.3 -1.9 -3.4 -3.4 -7 -1.6 -3.6 -3.5 -7.3 -4.4 -8.2 -0.8 -0.9 -2.4 -3.9 -3.5 -6.7 -1.1 -2.8 -2.2 -5.1 -2.6 -5.1 -0.4 0 -1.7 -2.5 -2.9 -5.5 -1.2 -3.1 -2.8 -5.9 -3.4 -6.3 -0.6 -0.4 -2.5 -3.8 -4.1 -7.7 -1.6 -3.8 -3.2 -7.2 -3.6 -7.5 -0.3 -0.3 -1.8 -3.1 -3.3 -6.2 -1.5 -3.2 -3.1 -5.8 -3.6 -5.8 -0.4 0 -1 -0.8 -1.3 -1.7 -0.2 -1 -0.8 -2.6 -1.2 -3.5 -0.7 -1.7 0.2 -1.8 11.2 -1.8 l11.9 0 1.9 5 c1.1 2.8 2.2 5 2.5 5 0.3 0 1.9 2.8 3.5 6.3 1.6 3.4 3.2 6.4 3.6 6.7 0.4 0.3 2 3.4 3.5 7 1.6 3.6 3.1 6.7 3.5 7 0.4 0.3 2 3.4 3.6 7 1.5 3.6 3.5 7.2 4.4 8.1 0.9 0.9 2.4 3.9 3.4 6.7 1.1 2.9 2.2 5.2 2.5 5.2 0.4 0 2 3 3.5 6.8 1.6 3.7 3.2 6.9 3.6 7.2 0.4 0.3 1.7 2.7 2.8 5.3 1.1 2.6 2.4 4.7 2.9 4.7 0.5 0 2.2 3.2 3.7 7 1.5 3.9 3.1 7 3.5 7 0.4 0 2 3.2 3.5 7 1.5 3.9 3.1 7 3.5 7 0.3 0 1.9 3.8 3.5 8.5 2.8 8.1 4.9 10.6 7.4 9.1 0.4 -0.3 1.4 -2.6 2.1 -5.2 0.7 -2.5 1.9 -5.2 2.7 -6 0.8 -0.7 2.5 -4.4 3.8 -8 1.4 -3.7 2.8 -7 3.3 -7.3 0.5 -0.3 1.7 -2.8 2.8 -5.4 1 -2.6 2.7 -5.7 3.6 -6.7 1 -1 3 -4.8 4.5 -8.4 1.4 -3.6 3 -6.6 3.3 -6.6 0.4 0 2 -3.1 3.5 -7 1.5 -3.8 3.2 -7 3.6 -7 0.4 0 1.5 -2.3 2.5 -5 1 -2.8 2.6 -5.9 3.6 -6.9 0.9 -1.1 2.9 -4.8 4.4 -8.2 1.4 -3.5 3 -6.6 3.4 -6.9 0.4 -0.3 2 -3.4 3.5 -7 1.5 -3.6 3 -6.7 3.4 -7 0.4 -0.3 1.8 -2.7 3.1 -5.5 1.3 -2.7 2.9 -5.5 3.5 -6.1 0.6 -0.6 2.2 -3.9 3.5 -7.3 l2.5 -6.1 11.7 0 11.7 0 -2.1 4.8 c-1.1 2.6 -2.4 4.9 -2.8 5.2 -0.4 0.3 -1.8 3 -3.1 6 -1.3 3 -2.9 6 -3.5 6.5 -0.7 0.6 -2.2 3.5 -3.5 6.5 -1.3 3 -2.6 5.7 -3 6 -0.4 0.3 -2 3.4 -3.5 7 -1.6 3.6 -3.4 7 -4 7.5 -0.7 0.6 -2.2 3.5 -3.5 6.5 -1.3 3 -2.6 5.7 -3 6 -0.4 0.3 -2 3.4 -3.6 7 -1.5 3.6 -3.5 7.2 -4.4 8.1 -0.9 0.9 -2.4 3.9 -3.4 6.7 -1.1 2.9 -2.2 5.2 -2.5 5.2 -0.4 0 -2 3 -3.5 6.8 -1.6 3.7 -3.4 7 -4.1 7.4 -0.6 0.4 -2.2 3.2 -3.4 6.3 -1.2 3 -2.5 5.5 -2.9 5.5 -0.3 0 -1.7 2.7 -3 6 -1.3 3.3 -2.7 6 -3.1 6 -0.4 0 -2.1 2.9 -3.6 6.5 -1.6 3.6 -3.1 6.5 -3.5 6.5 -0.3 0 -1.9 3.2 -3.4 7 -1.5 3.9 -3.2 7 -3.7 7 -0.4 0 -0.8 19.8 -0.8 44 l0 44 -11 0 -11 0 0 -44.4z" />
                  <path d="M1556 784 c-19.5 -1.3 -37 -3.3 -37 -4.2 0 -0.4 0.4 -0.8 1 -0.8 0.5 0 1 -3.3 1.2 -7.2 l0.3 -7.3 16 0.5 c33 1 78.7 0.5 85 -0.9 3.3 -0.7 6.2 -1.6 6.5 -2 0.3 -0.3 2.6 -1.6 5.3 -2.9 2.7 -1.4 5.3 -3.5 6.2 -5.2 0.8 -1.5 2.1 -3.4 2.9 -4.2 5.7 -5.7 6.1 -49.5 0.5 -55.9 -1.1 -1.2 -1.9 -2.8 -1.9 -3.4 0 -2.4 -10 -10.2 -14.8 -11.6 -2.6 -0.7 -4.9 -1.6 -5.2 -2 -0.5 -0.7 -12 -3.1 -27 -5.6 -1.9 -0.3 -3.7 -0.9 -4 -1.3 -0.3 -0.3 -7.7 -1.9 -16.5 -3.5 -8.8 -1.5 -16.2 -3.1 -16.5 -3.5 -0.3 -0.4 -3.7 -1.6 -7.6 -2.8 -3.9 -1.2 -8.1 -3.1 -9.4 -4.2 -1.3 -1.1 -2.6 -2 -3 -2 -0.4 0 -3.1 -2.4 -6.1 -5.3 -5.4 -5.4 -9.9 -12.2 -9.9 -15 0 -0.9 -0.6 -2.2 -1.4 -2.9 -2.4 -2.5 -4.1 -15.6 -4.1 -32.3 0 -14.7 1.7 -30.2 3.4 -31.5 0.4 -0.3 1.5 -2.7 2.5 -5.4 2.4 -6.2 11.8 -15.9 17.2 -17.6 2.2 -0.7 4.1 -1.6 4.4 -1.9 1 -1.4 9.2 -3.2 18.7 -4.1 19.4 -1.9 60.4 -0.8 86.1 2.2 9.5 1.1 10.3 1.4 10.9 3.6 0.5 2.2 -0.2 13.1 -0.9 13.7 -0.2 0.1 -10.2 -0.2 -22.3 -0.7 -25.2 -1.1 -71.2 -0.5 -76.7 1 -2 0.5 -4.4 1.7 -5.3 2.6 -0.9 0.9 -2.2 1.6 -3 1.6 -2.4 0 -8.5 8.2 -10.3 13.9 -2.5 8.2 -2.4 38.1 0.2 46.4 1 3.2 2.4 6.1 3.2 6.4 0.8 0.3 1.4 1 1.4 1.6 0 1.5 5.1 6.7 6.6 6.7 0.6 0 1.4 0.6 1.7 1.3 0.5 1.3 8.4 4.1 15.2 5.3 2.2 0.4 4.2 1 4.5 1.4 0.3 0.3 7.9 1.9 17 3.5 9.1 1.6 16.7 3.2 17 3.6 0.3 0.3 5.6 1.6 11.9 2.7 6.3 1.2 11.7 2.5 12 3 0.3 0.4 3.2 1.6 6.4 2.6 3.2 0.9 6.7 2.6 7.8 3.7 1 1 2.1 1.9 2.4 1.9 2.7 0 12.5 10.2 12.5 13 0 0.6 0.4 1 0.9 1 1.1 0 4.5 8.9 5.6 14.5 0.4 2.2 1.2 4.3 1.8 4.7 1.6 1 1.7 41.6 0.1 42.6 -0.6 0.4 -1.5 2.9 -1.9 5.6 -0.9 6.2 -4.2 14.8 -6.1 15.9 -0.8 0.4 -1.4 1.4 -1.4 2.1 0 3.1 -14.9 13.6 -19.4 13.6 -0.8 0 -1.6 0.5 -1.8 1 -0.2 0.6 -3.9 1.8 -8.3 2.6 -9.4 1.8 -56.5 2.7 -74.5 1.4z" />
                </g>
              </svg>
            )}

            {isOpen && (
              <svg
                ref={kLogoRef}
                width="50"
                height="50"
                viewBox="690 5 280 460"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  marginTop: "5px",
                  opacity: 1,
                  transform: "scale(1)",
                }}
              >
                <g fill="#00aff0" stroke="#00aff0" strokeWidth="3">
                  <path d="M711 216.6 l0 -209.6 37 0 37 0 0.2 169.8 0.3 169.7 37.5 -35.4 c20.6 -19.5 40.1 -37.9 43.2 -40.9 l5.7 -5.5 2 2.4 c1.1 1.3 2 2.7 2.1 3.1 0 0.7 -161.5 153.8 -163.8 155.2 -0.9 0.6 -1.2 -44.7 -1.2 -208.8z m44.8 157.9 l22.2 -21 0 -169.7 0 -169.8 -29.5 0 -29.5 0 0 197.6 0 197.7 7.3 -6.9 c4 -3.8 17.3 -16.3 29.5 -27.9z" />
                </g>
                <g fill="#002060" stroke="#002060" strokeWidth="3">
                  <path d="M919.7 395.8 c-0.4 -19.4 -0.7 -48.2 -0.7 -64 l0 -28.8 4 0 4 0 0 60 0 60 27.5 0 27.5 0 0 -72.2 c0 -70.6 -0.1 -72.4 -2.1 -76.8 -1.5 -3.3 -10.6 -13.2 -34.3 -37 -21.1 -21.2 -33.2 -34.1 -34.7 -37 -1.7 -3.3 -2.3 -6.2 -2.4 -11 0 -10.7 1.8 -13 40.1 -51.1 l33.9 -33.8 0.3 -42.1 c0.2 -23.1 -0.1 -42 -0.5 -42 -0.4 0.1 -33.9 33 -74.5 73.3 -69.6 69.2 -73.8 73.6 -77 80.2 -2.9 6.2 -3.3 7.9 -3.3 15.5 0 13.6 1.9 16.7 29.1 47.1 12.6 14 23.6 26.3 24.4 27.3 1.3 1.7 1.1 2.2 -3 5.8 l-4.5 3.8 -2.3 -2.6 c-2.1 -2.4 -2.2 -2.8 -0.7 -4.4 1.5 -1.7 0.5 -3 -16.2 -21.7 -9.8 -10.9 -19.9 -22.1 -22.4 -25 -9.1 -10.3 -13.8 -24.3 -11.9 -36 0.5 -3.1 2.5 -9.1 4.5 -13.2 3.4 -7.5 4.7 -8.8 84.2 -87.8 l80.8 -80.3 0.3 52.2 0.2 52.2 -35.4 35.6 c-19.5 19.5 -36.1 36.9 -37 38.7 -2.1 4.1 -2 11.5 0.1 16.1 1 2.2 14.3 16.5 33.4 35.7 17.5 17.6 32.5 32.9 33.4 34 0.8 1.1 2.4 4.9 3.5 8.4 1.9 6.1 2 8.9 2 81.2 l0 74.9 -34.8 0 -34.9 0 -0.6 -35.2z" />
                </g>
              </svg>
            )}
          </Box>

          {/* Right Buttons */}
          <Stack direction="row" spacing={1.5}>
            {/* <Button
              variant="solid"
              sx={{
                background: "linear-gradient(135deg, #60a5fa 0%, #22d3ee 100%)",
                boxShadow: "0 8px 20px rgba(96, 165, 250, 0.25)",
                px: 3,
                py: 1,
                fontSize: { xs: "0.875rem", md: "1rem" },
                fontWeight: 600,
                borderRadius: "12px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  boxShadow: "0 12px 28px rgba(96, 165, 250, 0.35)",
                  transform: "scale(1.05) translateY(-2px)",
                },
              }}
            >
              Explore Now
            </Button> */}
            <Button
              variant="solid"
              sx={{
                background: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)",
                boxShadow: "0 8px 20px rgba(14, 165, 233, 0.25)",
                px: 3,
                py: 1,
                fontSize: { xs: "0.875rem", md: "1rem" },
                fontWeight: 600,
                borderRadius: "12px",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  boxShadow: "0 12px 28px rgba(14, 165, 233, 0.35)",
                  transform: "scale(1.05) translateY(-2px)",
                },
              }}
            >
              Contact Us
            </Button>
          </Stack>
        </Box>

        {/* Expanded Content (2-Grid Layout) */}
        {isOpen && (
          <Box
            ref={contentRef}
            sx={{
              width: "100%",
              height: "calc(100% - 70px)",
              opacity: 1,
              transform: "translateY(20px)",
              px: { xs: 3, md: 6 },
              pt: 4,
              pb: 2,
              display: "flex",
              flexDirection: "column",
              gap: 4,
              overflowY: "auto",
              pointerEvents: isOpen ? "auto" : "none",
            }}
          >
            {/* 2-Column Grid */}
            <Box
              sx={{
                flex: 1,
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                gap: { xs: 4, md: 6 },
                alignItems: "start",
              }}
            >
              {/* Left Column - Navigation Links */}
              <Stack spacing={3} sx={{
                ml: { xs: 0, md: 6}
              }}>
                {navItems.map((item, index) => (
                  <Box
                    key={item.label}
                    ref={(el) => (navLinksRef.current[index] = el)}
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleNavigation(item.path)}
                  >
                    <WaveText text={item.label} />
                  </Box>
                ))}
              </Stack>

              {/* Right Column - Image + Social Icons Below */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {/* Image Section */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "250px",
                  }}
                >
                  <ImagePeelEffect imageSrc={dockRight} />
                </Box>

                {/* Social Icons Section Below Image */}
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, mt: 4 }}>
                  <Typography
                    level="h5"
                    sx={{
                      fontWeight: 600,
                      color: "#2d3748",
                      textAlign: "center",
                      fontSize: { xs: "1rem", md: "1.25rem" },
                    }}
                  >
                    Reach Us at:
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={2}
                    flexWrap="wrap"
                    justifyContent="center"
                    sx={{ gap: 1 }}
                  >
                    {socialLinks.map((social) => (
                      <IconButton
                        key={social.label}
                        className="social-icon"
                        variant="soft"
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          background: "#ffffff",
                          color: social.color,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          "&:hover": {
                            background: social.color,
                            color: "#ffffff",
                            transform: "scale(1.15) rotate(10deg)",
                            boxShadow: `0 8px 20px ${social.color}40`,
                          },
                        }}
                      >
                        <social.icon size={20} />
                      </IconButton>
                    ))}
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Box>
        )}

      </Box>
    </>
  );
};

export default ExpandableDock;
