"use client";

import { motion } from "framer-motion";
import { SITE } from "@/config/links";

/**
 * A stylized geometric avatar placeholder: a glowing hexagonal frame with the
 * first letter of SITE.name centered inside. Used on the About page.
 *
 * To use a real photo instead: replace the glowing core <div> with a Next.js
 * <Image> component and pass your photo as src.
 */
export function AvatarFrame({ size = 280 }: { size?: number }) {
  const letter = SITE.name.charAt(0).toUpperCase();

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-label={`${SITE.name} avatar`}
      role="img"
    >
      {/* rotating outer ring */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <polygon
            points="100,8 168,50 168,150 100,192 32,150 32,50"
            fill="none"
            stroke="var(--accent-blue)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
            opacity="0.6"
          />
        </svg>
      </motion.div>

      {/* counter-rotating inner ring */}
      <motion.div
        className="absolute inset-6"
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <polygon
            points="100,8 168,50 168,150 100,192 32,150 32,50"
            fill="none"
            stroke="var(--accent-glow)"
            strokeWidth="1"
            opacity="0.4"
          />
        </svg>
      </motion.div>

      {/* glowing core */}
      <div className="absolute inset-10 flex items-center justify-center rounded-full bg-gradient-to-br from-bg-tertiary to-bg-secondary shadow-glow-lg">
        <span className="font-wordmark text-7xl font-black text-accent-glow glow-text">
          {letter}
        </span>
      </div>

      {/* pulsing glow halo */}
      <motion.div
        className="absolute inset-8 rounded-full"
        style={{ boxShadow: "0 0 60px 8px rgba(79,158,255,0.25)" }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export default AvatarFrame;
