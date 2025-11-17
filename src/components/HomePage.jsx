import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const image = imageRef.current;
    const textOverlay = textRef.current;

    // Scroll expansion animation
    gsap.to(image, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        pin: true,
        markers: false,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Image expands
          gsap.set(image, {
            scale: 0.3 + progress * 1.2,
            y: -100 * progress,
          });

          // Text fades out
          gsap.set(textOverlay, {
            opacity: 1 - progress * 1.2,
            y: 50 * progress,
          });
        },
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden">
      {/* Hero Image - Scroll Expansion */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          ref={imageRef}
          src="/global-connectivity.jpg"
          alt="Global Connectivity"
          className="w-[30%] h-auto object-cover rounded-xl shadow-2xl"
          style={{
            transformOrigin: 'center center',
          }}
        />
      </div>

      {/* Text Overlay */}
      <div ref={textRef} className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            KleidSys
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-200 mb-2">
          AI-Powered ERP Solution
        </p>
        
        <p className="text-lg text-gray-300 max-w-2xl mb-8">
          Enterprise Resource Planning for Fashion & Apparel Industry
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 flex-wrap justify-center">
          <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg glow-effect smooth-transition transform hover:scale-105">
            Start Free Trial
          </button>
          <button className="bg-white/10 text-white px-8 py-3 rounded-lg font-semibold border border-white/30 hover:bg-white/20 smooth-transition">
            Watch Demo
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-3">
          <p className="text-white/60 text-sm">Scroll to explore</p>
          <svg className="w-6 h-6 text-white bounce-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}