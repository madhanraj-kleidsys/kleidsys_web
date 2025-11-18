// Navbar.js
import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const navLinks = [
  { title: "The Vault", href: "/product/vault" },
  { title: "Page Transition Course", href: "/product/page-transition-course" },
  { title: "Icon Library", href: "/product/icons" },
  { title: "Community", href: "/product/community" }
];

export default function Navbar() {
  const [dockOpen, setDockOpen] = useState(false);
  const dockRef = useRef();

  useEffect(() => {
    if (dockOpen) {
      gsap.to(dockRef.current, {
        height: "200px", // adjust as needed
        duration: 0.5,
        ease: "power2.out"
      });
    } else {
      gsap.to(dockRef.current, {
        height: "0px",
        duration: 0.45,
        ease: "power2.in"
      });
    }
  }, [dockOpen]);

  return (
    <nav className="nav-root">
      <div className="nav-bar">
        <div className="logo">OSMO</div>
        <ul className="nav-links">
          {navLinks.map(link => (
            <li key={link.title}><a href={link.href}>{link.title}</a></li>
          ))}
        </ul>
        <div className="nav-actions">
          <button className="dock-toggle" onClick={() => setDockOpen(v => !v)}>
            {dockOpen ? "Close Dock" : "Open Dock"}
          </button>
        </div>
      </div>
      <div className="expandable-dock" ref={dockRef}>
        {/* Any dock content (filters, resources, etc) */}
        <div style={{ padding: "32px", color: "#4d4e63" }}>
          <h3 style={{ margin: 0 }}>Dock: quick actions</h3>
          <ul>
            <li>⭐ Starred resources</li>
            <li>🔍 Search</li>
            <li>🕒 Recent items</li>
          </ul>
        </div>
      </div>
      <style jsx>{`
        .nav-root {
          position: sticky;
          top: 0;
          z-index: 50;
          background: #fff;
          border-bottom: 1px solid #edeff4;
        }
        .nav-bar {
          display: flex;
          align-items: center;
          padding: 0 32px;
          height: 60px;
          background: #f7f8fa;
        }
        .logo {
          font-weight: 800;
          font-size: 1.4rem;
          letter-spacing: 2px;
          color: #3763f4;
          margin-right: 2rem;
        }
        .nav-links {
          display: flex;
          gap: 1.6rem;
          list-style: none;
          flex: 1;
        }
        .nav-links a {
          color: #2b2d39;
          text-decoration: none;
          font-weight: 500;
        }
        .nav-actions {
          margin-left: auto;
        }
        .dock-toggle {
          padding: 6px 18px;
          background: #3763f4;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        .dock-toggle:hover {
          background: #233ea5;
        }
        .expandable-dock {
          overflow: hidden;
          height: 0;
          background: #eaf2fb;
          box-shadow: 0 4px 16px 2px #e7eefe;
          transition: height 0.4s;
        }
      `}</style>
    </nav>
  );
}
