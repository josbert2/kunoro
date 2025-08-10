// src/components/TextIntroEffect.tsx
"use client";
import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "motion/react";

interface TextIntroEffectProps {
  text: string;
  duration?: number; // segundos para cada fase
  onComplete?: () => void;
}

export function TextIntroEffect({
  text,
  duration = 1.2,
  onComplete,
}: TextIntroEffectProps) {
  const controls = useAnimation();
  const maskId = useRef(`mask-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    // 1) Dibuja el trazo
    controls.start({ strokeDashoffset: 0, transition: { duration, ease: "easeInOut" } })
      .then(() => {
        // 2) Revela gradiente
        return controls.start({
          r: "150%",
          transition: { duration: duration * 1.2, ease: "easeOut" },
        });
      })
      .then(() => {
        if (onComplete) onComplete();
      });
  }, [controls, duration, onComplete]);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 600 100"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none"
    >
      <defs>
        <linearGradient id="introGradient" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#eab308" />
          <stop offset="25%" stopColor="#ef4444" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="75%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>

        <motion.radialGradient
          id={maskId.current}
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          initial={{ r: "0%" }}
          animate={controls}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>

        <mask id={`${maskId.current}-mask`}>
          <rect x="0" y="0" width="100%" height="100%" fill={`url(#${maskId.current})`} />
        </mask>
      </defs>

      {/* Trazo */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-transparent stroke-neutral-200 font-bold text-6xl"
        strokeWidth="0.4"
        initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
        animate={controls}
      >
        {text}
      </motion.text>

      {/* Gradient revelado */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-transparent font-bold text-6xl"
        stroke="url(#introGradient)"
        strokeWidth="0.4"
        mask={`url(#${maskId.current}-mask)`}
      >
        {text}
      </text>
    </svg>
  );
}
