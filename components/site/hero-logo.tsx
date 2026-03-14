"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { company } from "@/lib/site-content";

export function HeroLogo() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.2, 0.65, 0.3, 0.98] }}
      className="relative w-fit"
    >
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative rounded-2xl border border-[color:var(--border)] bg-[color:rgba(16,23,34,0.66)] px-5 py-4 shadow-[0_18px_38px_-20px_rgba(34,211,238,0.42)] backdrop-blur-sm"
      >
        <Image
          src="/simple-core-logo.svg"
          alt={`${company.name} logo`}
          width={230}
          height={64}
          className="h-12 w-auto md:h-14"
          priority
        />
        <motion.div
          aria-hidden
          animate={reduceMotion ? undefined : { opacity: [0.2, 0.34, 0.2] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-0 rounded-2xl border border-[color:rgba(34,211,238,0.28)]"
        />
      </motion.div>
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-full mt-1 h-14 overflow-hidden opacity-30 blur-[1px] md:h-16"
      >
        <Image
          src="/simple-core-logo.svg"
          alt=""
          width={230}
          height={64}
          className="mx-auto h-12 w-auto scale-y-[-1] md:h-14"
          style={{
            maskImage: "linear-gradient(to bottom, rgba(255,255,255,0.55), rgba(255,255,255,0))",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(255,255,255,0.55), rgba(255,255,255,0))",
          }}
        />
      </div>
    </motion.div>
  );
}

