"use client";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function InfinityLoopDOM({
  words = ["design", "development", "marketing", "brands", "products"],
}: {
  words?: string[];
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);

  // Inyecta tu CSS con ajustes de contraste
  useEffect(() => {
    const id = "normalize-marquee-css";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
@import url('https://unpkg.com/normalize.css') layer(normalize);

@layer normalize, base, demo;

@layer demo {
  .container {
    --font-level: 8;
    opacity: 0;
    height: 3lh;
    display: flex;
    place-items: center;
    mask: linear-gradient(
      #0000 0.25lh,
      #fff calc(50% - 0.5lh) calc(50% + 0.5lh),
      #0000 calc(100% - 0.25lh)
    );
    /* 🔧 Alto contraste: */
    color: canvasText;
    text-align: center;
    position: relative;
  }
  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
    text-transform: uppercase;
    line-height: 1;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    height: 1lh;
    display: inline-grid;
    flex-direction: column;
    position: relative;
    padding-inline: 0.25em;
    align-items: center;
    align-content: center;
    justify-content: center;
    justify-items: center;
    text-align: center;
  }

  .indicator {
    --c: 0.175em;
    position: absolute;
    top: 50%;
    left: 50%;
    height: 0.8lh;
    translate: -50% -50%;
    border: 0.05em solid oklch(0.75 1 var(--h, 320));
    transition: width 0.25s, border-color 0.25s;
    width: calc((var(--width) * 1px) + var(--c));
    clip-path: polygon(
      0 0, var(--c) 0, var(--c) var(--c), 0 var(--c), 0 100%,
      0 calc(100% - var(--c)), var(--c) calc(100% - var(--c)), var(--c) 100%, 0 100%,
      calc(100% - var(--c)) 100%, calc(100% - var(--c)) calc(100% - var(--c)),
      100% calc(100% - var(--c)), 100% 100%, 100% var(--c),
      calc(100% - var(--c)) var(--c), calc(100% - var(--c)) 0, 100% 0, 100% 100%, 0 100%
    );
    pointer-events: none;
  }

  li {
    display: inline-block;
    width: fit-content;
    height: 1lh;
    grid-area: 1 / 1;
    line-height: 1.2;
    will-change: transform;
    color: canvasText;
  }
}

@layer base {
  :root {
    --font-size-min: 16;
    --font-size-max: 20;
    --font-ratio-min: 1.2;
    --font-ratio-max: 1.33;
    --font-width-min: 375;
    --font-width-max: 1500;
  }

  html { color-scheme: light dark; }

  :where(.fluid) {
    --fluid-min: calc(var(--font-size-min) * pow(var(--font-ratio-min), var(--font-level, 0)));
    --fluid-max: calc(var(--font-size-max) * pow(var(--font-ratio-max), var(--font-level, 0)));
    --fluid-preferred: calc((var(--fluid-max) - var(--fluid-min)) / (var(--font-width-max) - var(--font-width-min)));
    --fluid-type: clamp(
      (var(--fluid-min) / 16) * 1rem,
      ((var(--fluid-min) / 16) * 1rem) -
        (((var(--fluid-preferred) * var(--font-width-min)) / 16) * 1rem) +
        (var(--fluid-preferred) * var(--variable-unit, 100vi)),
      (var(--fluid-max) / 16) * 1rem
    );
    font-size: var(--fluid-type);
  }

  *, *:after, *:before { box-sizing: border-box; }

  body {

  }

  /*body::before {
    --size: 45px;
    --line: color-mix(in hsl, canvasText, transparent 70%);
    content: '';
    height: 100vh; width: 100vw; position: fixed;
    background:
      linear-gradient(90deg, var(--line) 1px, transparent 1px var(--size)) 50% 50%/var(--size) var(--size),
      linear-gradient(var(--line) 1px, transparent 1px var(--size)) 50% 50%/var(--size) var(--size);
    mask: linear-gradient(-20deg, transparent 50%, white);
    top: 0; transform-style: flat; pointer-events: none; z-index: -1;
  }*/

  .bear-link { color: canvasText; position: fixed; top: 1rem; left: 1rem; width: 48px; aspect-ratio: 1; display: grid; place-items: center; opacity: .8; }
  :where(.x-link, .bear-link):is(:hover, :focus-visible) { opacity: 1; }
  .bear-link svg { width: 75%; }

  .sr-only { position: absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border-width:0; }
}
    `;
    document.head.appendChild(style);
  }, []);

  // GSAP - Infinite visual carousel with duplicated elements
  useLayoutEffect(() => {
    if (!listRef.current || !containerRef.current || !indicatorRef.current) return;

    const ctx = gsap.context(() => {
      const allItems = Array.from(listRef.current!.querySelectorAll("li"));
      if (!allItems.length) return;

      const originalWordsCount = words.length;
      const totalSets = 3; // above, main, below
      const spacing = 100; // Distance between items in percentage

      // Position all items initially
      allItems.forEach((item, index) => {
        gsap.set(item, { 
          yPercent: (index - originalWordsCount) * spacing, // Center the main set at 0
          opacity: 1,
          scale: 1
        });
      });

      let currentCenterIndex = 0; // Index within the original words array
      let isTransitioning = false;

      // Define your custom colors (hue values 0-359)
      const customColors = [320, 200, 120, 60, 280, 40, 180]; // Purple, Blue, Green, Yellow, Magenta, Orange, Cyan

      // Find the item that is actually closest to center (yPercent = 0)
      const findCenteredItem = () => {
        let closestItem = allItems[0];
        let closestDistance = Infinity;
        
        allItems.forEach((item) => {
          const currentY = gsap.getProperty(item, "yPercent") as number;
          const distanceFromCenter = Math.abs(currentY);
          
          if (distanceFromCenter < closestDistance) {
            closestDistance = distanceFromCenter;
            closestItem = item;
          }
        });
        
        return closestItem;
      };

      // Find the item that will be centered after the next movement
      const findNextCenterItem = () => {
        let nextCenterItem = allItems[0];
        let smallestPositiveDistance = Infinity;
        
        allItems.forEach((item) => {
          const currentY = gsap.getProperty(item, "yPercent") as number;
          
          // Look for items that are below center (positive yPercent) and closest to spacing
          // After movement, the item at yPercent = spacing will be at center (0)
          const distanceFromNextCenter = Math.abs(currentY - spacing);
          
          if (currentY > 0 && distanceFromNextCenter < smallestPositiveDistance) {
            smallestPositiveDistance = distanceFromNextCenter;
            nextCenterItem = item;
          }
        });
        
        return nextCenterItem;
      };

      // Update indicator based on the actually centered item
      const updateIndicator = () => {
        const centerItem = findCenteredItem();
        if (!centerItem) return;
        
        const w = centerItem.getBoundingClientRect().width;
        console.log('Updating indicator for:', centerItem.textContent, 'width:', w);
        
        // Fast indicator update without interruptions
        const randomColor = customColors[Math.floor(Math.random() * customColors.length)];
        gsap.to(indicatorRef.current, {
          "--width": w,
          "--h": randomColor,
          duration: 0.1,
          ease: "power2.in",
          overwrite: true // Prevent interruptions
        });
      };

      // Update indicator for the next word that will be centered
      const updateIndicatorForNext = () => {
        const nextItem = findNextCenterItem();
        if (!nextItem) return;
        
        const w = nextItem.getBoundingClientRect().width;
        console.log('Updating indicator for NEXT word:', nextItem.textContent, 'width:', w);
        
        // Fast indicator update without interruptions
        const randomColor = customColors[Math.floor(Math.random() * customColors.length)];
        gsap.to(indicatorRef.current, {
          "--width": w,
          "--h": randomColor,
          duration: 0.1,
          ease: "power2.in",
          overwrite: true // Prevent interruptions
        });
      };

      // Step-by-step carousel with visual infinite loop
      const createInfiniteStepCarousel = () => {
        const nextStep = () => {
          if (isTransitioning) return;
          isTransitioning = true;

          // Calculate next center index
          const nextCenterIndex = (currentCenterIndex + 1) % originalWordsCount;

          // Update indicator IMMEDIATELY for the next word (anticipatory)
          currentCenterIndex = nextCenterIndex;
          updateIndicatorForNext();

          // Fast movement animation (0.6 seconds)
          const moveTL = gsap.timeline({
            onComplete: () => {
              // Reset transition flag and schedule next step after 2 seconds
              isTransitioning = false;
              gsap.delayedCall(2, nextStep);
            }
          });

          // Move all items up by one position quickly
          allItems.forEach((item) => {
            moveTL.to(item, {
              yPercent: `-=${spacing}`,
              duration: 0.7, // Fast movement
              ease: "back.inOut(2.7)",
              modifiers: {
                yPercent: (value) => {
                  const numValue = parseFloat(value);
                  
                  // True infinite wrapping - when items go too far up, wrap them to bottom
                  if (numValue <= -(spacing * 2)) {
                    // Move item to bottom of the visible area
                    return String(numValue + (spacing * originalWordsCount));
                  }
                  
                  // When items go too far down, wrap them to top
                  if (numValue >= (spacing * (originalWordsCount + 1))) {
                    // Move item to top of the visible area
                    return String(numValue - (spacing * originalWordsCount));
                  }
                  
                  return value;
                }
              }
            }, 0); // All items move simultaneously
          });
        };

        // Start the step sequence
        gsap.delayedCall(1, nextStep);
      };

      // Initial setup
      gsap.set(containerRef.current, { opacity: 1 });
      updateIndicator();
      
      // Start infinite step-by-step carousel
      createInfiniteStepCarousel();

      return () => {
        gsap.killTweensOf([allItems, containerRef.current, indicatorRef.current]);
      };
    }, containerRef);

    return () => ctx.revert();
  }, [words]);

  return (
    <div className="container fluid" ref={containerRef}>
      <div className="indicator" ref={indicatorRef} />
      <ul ref={listRef}>
        {/* Duplicates above for infinite visual effect */}
        {words.map((w, i) => (
          <li key={`above-${i}`} data-index={i} data-set="above">{w}</li>
        ))}
        {/* Main set - this is the "center" reference */}
        {words.map((w, i) => (
          <li key={`main-${i}`} data-index={i} data-set="main">{w}</li>
        ))}
        {/* Duplicates below for infinite visual effect */}
        {words.map((w, i) => (
          <li key={`below-${i}`} data-index={i} data-set="below">{w}</li>
        ))}
      </ul>
    </div>
  );
}
