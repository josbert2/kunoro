'use client';
import React, { useEffect, useMemo, useRef } from "react";

/**
 * FlowLinesBackground (v2 – "it just shows")
 * Animated glossy flow lines for dark sites.
 *
 * Fixes:
 * - Safe on Next.js (SSR) with 'use client'
 * - Works even if parent has 0 height (falls back to viewport)
 * - Auto-resizes; simpler seeding; brighter defaults
 */
export default function FlowLinesBackground({
  lineCount,
  lineWidth = 1.2,
  speed = 0.6,
  brightness = 1.15,
  color = "#ffffff",
  background = "#000000",
  className = "absolute inset-0 pointer-events-none z-0",
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const seedsRef = useRef([]); // generated after size known
  const lastW = useRef(0);

  // motion preference
  const prefersReduced = useMemo(
    () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    function ensureSize() {
      // get parent size; if zero, fall back to viewport
      let { width, height } = wrap.getBoundingClientRect();
      if (width < 2 || height < 2) {
        width = window.innerWidth;
        height = Math.max(480, Math.round(window.innerHeight * 0.7));
        // give wrapper a minimum height so it becomes visible
        wrap.style.minHeight = height + "px";
        wrap.style.position = wrap.style.position || "relative";
      }
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // (Re)seed when width changes noticeably or first run
      if (!seedsRef.current.length || Math.abs(lastW.current - width) > 80) {
        seedsRef.current = makeSeeds(width, lineCount);
        lastW.current = width;
      }
    }

    function makeSeeds(width, countProp) {
      // stable seeded rng
      let s = 1337;
      const rnd = () => (s = (s * 1664525 + 1013904223) >>> 0, s / 2 ** 32);
      const autoCount = Math.max(28, Math.floor(width / 30));
      const count = Math.min(160, countProp ?? autoCount);
      const arr = Array.from({ length: count }, () => ({
        xNorm: 0.04 + rnd() * 0.92,
        amp: 0.05 + rnd() * 0.22,
        phase: rnd() * Math.PI * 2,
        weight: 0.8 + rnd() * 1.1,
        twist: 0.25 + rnd() * 0.75,
        wobble: 0.35 + rnd() * 1.3,
      }));
      return arr.sort((a, b) => a.xNorm - b.xNorm);
    }

    function clear() {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const noise = (y, phase, seed = 1) =>
      Math.sin(y * (0.002 + 0.0006 * seed) + phase * 0.9) * 0.62 +
      Math.sin(y * (0.0041 + 0.0009 * (seed + 1)) + phase * 0.7) * 0.28 +
      Math.sin(y * (0.0072 + 0.0004 * (seed + 2)) - phase * 0.45) * 0.1;

    function traceLine(ctx, baseX, A, phase, Hcss, twist, wobble) {
      const step = 8;
      const margin = 30;
      const H = Hcss + margin * 2;
      ctx.beginPath();
      const ease = (u) => u * (1 - u);
      for (let y = -margin, idx = 0; y <= H; y += step, idx++) {
        const u = Math.min(1, Math.max(0, (y + margin) / H));
        const local = noise(y * twist, phase, wobble);
        const x = baseX + A * ease(u) * local;
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    let start = performance.now();

    function frame(now) {
      const dt = (now - start) / 1000;
      const { width, height } = canvas;
      clear();

      // vignette
      const g = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.35,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.8
      );
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(1, "rgba(0,0,0,0.45)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      ctx.globalCompositeOperation = "lighter";

      const seeds = seedsRef.current;
      for (let i = 0; i < seeds.length; i++) {
        const s = seeds[i];
        const baseX = s.xNorm * width;
        const A = s.amp * width;
        const phase = s.phase + dt * speed * 1.1;
        const w1 = Math.max(0.7, lineWidth * s.weight);
        const w2 = w1 * 2.2;
        // outer glow
        ctx.lineWidth = w2;
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.11 * brightness;
        ctx.shadowBlur = 20;
        ctx.shadowColor = color;
        traceLine(ctx, baseX, A, phase, height / dpr, s.twist, s.wobble);
        // inner core
        ctx.lineWidth = w1;
        ctx.globalAlpha = 0.72 * brightness;
        ctx.shadowBlur = 2;
        ctx.shadowColor = color;
        traceLine(ctx, baseX, A * 0.85, phase * 0.98, height / dpr, s.twist, s.wobble * 0.7);
      }

      if (!prefersReduced) rafRef.current = requestAnimationFrame(frame);
    }

    function startAnimating() {
      cancelAnimationFrame(rafRef.current);
      start = performance.now();
      frame(start);
    }

    ensureSize();
    startAnimating();

    const ro = new ResizeObserver(() => {
      ensureSize();
      startAnimating();
    });
    ro.observe(wrap);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [lineCount, lineWidth, speed, brightness, color, background, prefersReduced]);

  return (
    <div ref={wrapRef} className={className}>
      <canvas ref={canvasRef} className="h-full w-full block" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_70%_at_50%_-10%,rgba(255,255,255,0.08),rgba(0,0,0,0)_60%),radial-gradient(120%_70%_at_50%_110%,rgba(255,255,255,0.08),rgba(0,0,0,0)_60%)] mix-blend-screen" />
    </div>
  );
}
