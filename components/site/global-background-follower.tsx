"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export function GlobalBackgroundFollower() {
  const reduceMotion = useReducedMotion();
  const [canHover, setCanHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const pointerX = useMotionValue(-60);
  const pointerY = useMotionValue(-60);
  const smoothX = useSpring(pointerX, { stiffness: 160, damping: 26, mass: 0.25 });
  const smoothY = useSpring(pointerY, { stiffness: 160, damping: 26, mass: 0.25 });

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateCapability = () => setCanHover(media.matches);
    updateCapability();
    media.addEventListener("change", updateCapability);

    const updatePointer = (event: PointerEvent) => {
      if (!media.matches || reduceMotion) return;
      pointerX.set(event.clientX - 60);
      pointerY.set(event.clientY - 60);
      setVisible(true);
    };

    const hidePointer = () => setVisible(false);

    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointerleave", hidePointer);

    return () => {
      media.removeEventListener("change", updateCapability);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerleave", hidePointer);
    };
  }, [pointerX, pointerY, reduceMotion]);

  if (!canHover || reduceMotion) {
    return null;
  }

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[120px] w-[120px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.32)_0%,rgba(29,78,216,0.22)_38%,rgba(10,15,20,0)_76%)] blur-xl"
      style={{ x: smoothX, y: smoothY, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.18 }}
    />
  );
}
