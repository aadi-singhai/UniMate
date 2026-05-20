import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    // 2200ms of active animation + 300ms for exit fadeout = 2500ms total
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2.2, duration: 0.3, ease: 'easeInOut' }} // Smooth exit fade out
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary via-primary to-accent select-none"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // Custom ultra-smooth easeOutExpo
        className="flex flex-col items-center gap-6"
      >
        <div className="relative">
          {/* Main Logo Card Container */}
          <motion.div
            animate={{
              rotate: [0, -10, 15, 0], // Playful initial rock transition
              scale: [1, 1.08, 0.95, 1]
            }}
            transition={{ duration: 1.8, ease: 'easeInOut', delay: 0.2 }}
            className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-xl shadow-primary-foreground/10 z-10 relative"
          >
            <GraduationCap className="w-12 h-12 text-primary" />
          </motion.div>

          {/* Pulse Ripple Rings - Timed cleanly to disperse out once */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0.6 }}
            animate={{
              scale: [1, 2],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 1.4,
              delay: 0.6,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="absolute inset-0 border-2 border-white/40 rounded-2xl pointer-events-none"
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0.4 }}
            animate={{
              scale: [1, 2.4],
              opacity: [0.4, 0],
            }}
            transition={{
              duration: 1.4,
              delay: 0.8,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none"
          />
        </div>

        {/* Text Metadata */}
        <div className="text-center space-y-1">
          <motion.h1
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
            className="text-white text-4xl font-bold tracking-tight"
          >
            UniMate
          </motion.h1>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 0.85 }}
            transition={{ delay: 0.45, duration: 0.5, ease: 'easeOut' }}
            className="text-white text-sm font-medium tracking-wide"
          >
            Smart Campus Management
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}