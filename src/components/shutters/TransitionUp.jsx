import React, { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

// Custom Transition component with intro support
const Transition = ({ 
  children, 
  intro, 
  className, 
  introDuration = 1.5, 
  transitionDuration = 1.0, 
  type = "curved", 
  direction = "bottom",
  key 
}) => {
  const [showIntro, setShowIntro] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  React.useEffect(() => {
    // Reset intro state when key changes
    setShowIntro(true);
    setIsExiting(false);
    
    const introTimer = setTimeout(() => {
      setShowIntro(false);
      setIsExiting(true);
    }, introDuration * 1000);

    return () => clearTimeout(introTimer);
  }, [key, introDuration]);

  return (
    <div className={`relative ${className}`}>
      {/* Intro overlay */}
      {showIntro && intro && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ 
            opacity: isExiting ? 0 : 1,
            y: direction === "bottom" ? 0 : direction === "top" ? 0 : 0
          }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: transitionDuration, 
            ease: type === "curved" ? "easeInOut" : "linear" 
          }}
        >
          {intro}
        </motion.div>
      )}
      
      {/* Main content */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showIntro ? 0 : 1,
          y: showIntro ? (direction === "bottom" ? 50 : -50) : 0
        }}
        transition={{ 
          duration: transitionDuration, 
          delay: introDuration,
          ease: type === "curved" ? "easeOut" : "linear" 
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Button component (replacing shadcn/ui Button)
const Button = ({ children, onClick, variant = "default", className = "" }) => {
  const baseClasses = "px-4 py-2 rounded-md font-medium flex items-center space-x-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline: "border border-gray-300 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-gray-500"
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant] || variantClasses.default} ${className}`}
    >
      {children}
    </button>
  );
};

export default function TransitionDemo() {
  const [key, setKey] = useState(0);
  const [rotate, setRotate] = useState(false);

  const handleReload = () => {
    setRotate(true);
    setKey((prev) => prev + 1);
    setTimeout(() => setRotate(false), 600);
  };

  return (
    <div className="relative w-full min-h-[350px] flex items-center justify-center">
      <Transition
        key={key}
        introDuration={1.5}
        transitionDuration={1.0}
        type="curved"
        direction="bottom"
        className="bg-black dark:bg-white w-full"
        intro={
          <div className="flex flex-col items-center justify-center h-full w-full">
            <h1 className="text-4xl md:text-6xl font-bold text-white dark:text-black">
              ScrollX UI
            </h1>
            <p className="mt-2 text-base md:text-lg text-gray-400 dark:text-gray-600">
              Build modern interfaces with ease
            </p>
          </div>
        }
      >
        <div className="flex flex-col items-center justify-center min-h-[350px] w-full space-y-4 bg-gray-50 dark:bg-gray-900 py-10">
          <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white text-center ">
            Smooth transitions,
            <br />
            zero effort.
          </h2>

          <Button
            onClick={handleReload}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <motion.div
              animate={{ rotate: rotate ? 360 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <RefreshCw className="w-5 h-5" />
            </motion.div>
            <span>Replay Transition</span>
          </Button>
        </div>
      </Transition>
    </div>
  );
}