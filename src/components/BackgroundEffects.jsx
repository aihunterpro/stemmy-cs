import React, { useMemo } from 'react';

/**
 * BackgroundEffects
 * ------------------
 * A standalone component that renders:
 * 1. Animated floating blobs
 * 2. A subtle grid overlay
 * 3. Randomly-generated "raining" vocabulary words
 *
 * Keeping these visuals separate from the main page logic keeps App.jsx tidy
 * and allows us to tweak or disable effects from one place.
 */
export default function BackgroundEffects() {
  // Pre-generate the rain word elements so they remain consistent per mount.
  const rainElements = useMemo(() => {
    const pool = [
      'learn',
      'word',
      'speak',
      'write',
      'read',
      'hello',
      'story',
      'quiz',
      'grammar',
      'vocab',
      'memory',
    ];
    return Array.from({ length: 60 }, () => {
      const text = pool[Math.floor(Math.random() * pool.length)];
      return {
        text,
        left: Math.random() * 100, // percentage across the screen
        duration: 10 + Math.random() * 15, // 10-25s
        delay: Math.random() * 20, // 0-20s
        fontSize: 0.8 + Math.random() * 2.2, // 0.8-3rem
        rotation: -15 + Math.random() * 30, // small rotation for variety
      };
    });
  }, []);

  return (
    <>
      {/* Raining words */}
      <div className="rain-container select-none">
        {rainElements.map((el, i) => (
          <span
            key={i}
            className="rain-word"
            style={{
              left: `${el.left}%`,
              animationDuration: `${el.duration}s`,
              animationDelay: `${el.delay}s`,
              fontSize: `${el.fontSize}rem`,
              transform: `rotate(${el.rotation}deg)`,
            }}
          >
            {el.text}
          </span>
        ))}
      </div>

      {/* Grid overlay */}
      <div className="background-grid" />

      {/* Floating blurred blobs */}
      <div className="background-blobs">
        <div className="blob-1" />
        <div className="blob-2" />
        <div className="blob-3" />
        <div className="blob-4" />
      </div>
    </>
  );
} 