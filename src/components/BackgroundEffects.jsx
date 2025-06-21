import React, { useMemo } from 'react';

export default function BackgroundEffects() {
  const rainElements = useMemo(() => {
    const pool = [
      'learn', 'word', 'speak', 'write', 'read', 'hello', 'story',
      'quiz', 'grammar', 'vocab', 'memory', 'fluent', 'language',
      'context', 'review', 'practice', 'insight', 'effortless'
    ];
    return Array.from({ length: 70 }, () => {
      const text = pool[Math.floor(Math.random() * pool.length)];
      return {
        text,
        left: Math.random() * 100, // percentage
        duration: 15 + Math.random() * 20, // 15-35s
        delay: Math.random() * 30, // 0-30s
        fontSize: 0.8 + Math.random() * 1.2, // 0.8-2.0rem
      };
    });
  }, []);

  return (
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
          }}
        >
          {el.text}
        </span>
      ))}
    </div>
  );
} 