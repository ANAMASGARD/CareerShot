"use client"
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const MobileThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="fixed bottom-6 right-6 z-40 md:hidden"
    >
      <motion.button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-orange-400 via-yellow-400 to-orange-500 dark:from-indigo-600 dark:via-purple-600 dark:to-blue-700 p-1.5 shadow-2xl hover:shadow-3xl transition-shadow duration-300 group overflow-hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          boxShadow: isDark 
            ? '0 10px 40px -10px rgba(99, 102, 241, 0.4), 0 0 0 1px rgba(99, 102, 241, 0.2)' 
            : '0 10px 40px -10px rgba(251, 146, 60, 0.4), 0 0 0 1px rgba(251, 146, 60, 0.2)'
        }}
      >
        {/* Animated Background Rings */}
        <div className="absolute inset-0 rounded-full">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-300/60 via-yellow-300/60 to-orange-400/60 dark:from-indigo-600/60 dark:via-purple-600/60 dark:to-blue-800/60 animate-pulse" />
          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-orange-200/40 to-yellow-200/40 dark:from-indigo-700/40 dark:to-purple-700/40 animate-spin-slow" />
        </div>
        
        {/* Inner Circle */}
        <div className="relative w-full h-full rounded-full bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm flex items-center justify-center overflow-hidden border border-orange-200/50 dark:border-indigo-500/50">
          
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-orange-400 dark:bg-indigo-400 rounded-full animate-twinkle" />
            <div className="absolute bottom-2 left-2 w-1 h-1 bg-yellow-500 dark:bg-purple-400 rounded-full animate-twinkle delay-700" />
            <div className="absolute top-3 left-3 w-0.5 h-0.5 bg-orange-300 dark:bg-blue-400 rounded-full animate-twinkle delay-300" />
          </div>

          {/* Icon Container */}
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="moon"
                  initial={{ opacity: 0, rotate: -90, scale: 0.3 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.3 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="relative"
                >
                  {/* Moon Icon */}
                  <svg
                    className="w-6 h-6 text-indigo-600 drop-shadow-lg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                  {/* Floating Stars */}
                  <motion.div 
                    className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-indigo-400 rounded-full"
                    animate={{ 
                      scale: [1, 1.3, 1], 
                      opacity: [0.7, 1, 0.7] 
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  />
                  <motion.div 
                    className="absolute -bottom-1 -left-0.5 w-1 h-1 bg-purple-400 rounded-full"
                    animate={{ 
                      scale: [1, 1.2, 1], 
                      opacity: [0.5, 1, 0.5] 
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: 0.5 
                    }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ opacity: 0, rotate: -90, scale: 0.3 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.3 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="relative"
                >
                  {/* Sun Icon */}
                  <svg
                    className="w-6 h-6 text-orange-500 drop-shadow-lg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                  </svg>
                  {/* Animated Sun Rays */}
                  <motion.div 
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{ 
                      duration: 20, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                  >
                    <div className="absolute top-0 left-1/2 w-0.5 h-1.5 bg-orange-400 rounded-full -translate-x-0.5 -translate-y-3 opacity-70" />
                    <div className="absolute bottom-0 left-1/2 w-0.5 h-1.5 bg-orange-400 rounded-full -translate-x-0.5 translate-y-3 opacity-70" />
                    <div className="absolute left-0 top-1/2 w-1.5 h-0.5 bg-orange-400 rounded-full -translate-y-0.5 -translate-x-3 opacity-70" />
                    <div className="absolute right-0 top-1/2 w-1.5 h-0.5 bg-orange-400 rounded-full -translate-y-0.5 translate-x-3 opacity-70" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Hover ripple effect */}
          <motion.div 
            className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-white/10 opacity-0"
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.button>

      {/* Mobile Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute -top-12 left-1/2 transform -translate-x-1/2 pointer-events-none"
      >
        <div className="bg-black/90 dark:bg-white/90 text-white dark:text-black text-xs px-3 py-1.5 rounded-lg whitespace-nowrap font-medium shadow-lg">
          {isDark ? "Switch to light" : "Switch to dark"}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90 dark:border-t-white/90"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};
