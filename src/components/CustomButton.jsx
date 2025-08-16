import React from "react";
import { motion } from "motion/react";

const t = { duration: 0.32, easing: "cubic-bezier(0.22,1,0.36,1)" };

const textTop   = { rest: { y: "0%"   }, hover: { y: "-100%" } };
const textBottom= { rest: { y: "100%" }, hover: { y: "0%"    } };
const arrow     = { rest: { x: -12, opacity: 0.6 }, hover: { x: 0, opacity: 1 } };

const CustomButton = ({ children = "More about us", className = "", onClick, ...props }) => {
  return (
    <div className="mx-auto w-full max-w-72">
      <motion.button
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
        transition={t}
        onClick={onClick}
        className={[
          // contraste sobre fondo negro
          "flex h-14 w-full items-center justify-between rounded-2xl cursor-pointer",
          "border border-white/15 bg-neutral-800 text-neutral-100",
          "px-6 text-base font-semibold",
          "shadow-[inset_0_1px_0_rgba(255,255,255,.06)]",
          "hover:bg-neutral-700 hover:border-white/25",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
          className,
        ].join(" ")}
        {...props}
      >
        {/* Texto: slide up con máscara */}
        <span className="relative h-[1em] overflow-hidden leading-none">
          <motion.span className="block" variants={textTop} transition={t}>
            {children}
          </motion.span>
          <motion.span className="absolute left-0 top-0 block" variants={textBottom} transition={t}>
            {children}
          </motion.span>
        </span>

        {/* Flecha: entra desde la izquierda */}
        <span className="pointer-events-none relative h-5 w-5 ">
          <motion.svg
            variants={arrow}
            transition={t}
            viewBox="0 0 24 24"
            className="absolute inset-0 text-white/80"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            height="20"
            width="20"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </motion.svg>
        </span>
      </motion.button>
    </div>
  );
};

export default CustomButton;
