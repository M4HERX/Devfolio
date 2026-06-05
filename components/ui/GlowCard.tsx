"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

type Props = HTMLMotionProps<"div"> & {
  /** intensify hover into a stronger glow + lift */
  interactive?: boolean;
};

/**
 * <GlowCard /> — the site's base surface: a bg-secondary panel with a subtle
 * border that lights up blue on hover. Wraps Framer Motion so callers can pass
 * `whileInView`, `transition`, etc.
 */
export const GlowCard = forwardRef<HTMLDivElement, Props>(function GlowCard(
  { interactive = true, className = "", children, ...rest },
  ref
) {
  return (
    <motion.div
      ref={ref}
      whileHover={interactive ? { scale: 1.02 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`group relative rounded-2xl border border-edge bg-bg-secondary p-6 transition-shadow duration-300 ${
        interactive ? "hover:glow-border-hover" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
});

export default GlowCard;
