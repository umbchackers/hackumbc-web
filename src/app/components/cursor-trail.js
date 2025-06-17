'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Array of music note emojis
const musicNotes = ['🎵', '🎶', '🎼'];
const getRandomNote = () =>
  musicNotes[Math.floor(Math.random() * musicNotes.length)];

const Note = ({ x, y, id, note }) => (
  <motion.div
    key={id}
    className="absolute text-2xl pointer-events-none"
    style={{
      top: y,
      left: x,
      transform: 'translate(-50%, -50%)',
    }}
    initial={{ opacity: 0, scale: 0.5, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{
      opacity: 0,
      scale: 0,
      y: -20,
      transition: { duration: 0.3, ease: 'easeOut' },
    }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
  >
    {note}
  </motion.div>
);

export default function CursorTrail() {
  const [points, setPoints] = useState([]);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isEnabled, setIsEnabled] = useState(true);

  const rawPos = useRef({ x: 0, y: 0 });
  const displayPos = useRef({ x: 0, y: 0 });
  const lastRawPos = useRef({ x: 0, y: 0 });
  const pointId = useRef(0);

  const MAX_POINTS = 25;
  const SMOOTHING_FACTOR = 0.15;
  const MIN_RAW_DISTANCE = 10; // only spawn when cursor moves ≥10px

  // desktop detection
  useEffect(() => {
    const check = () =>
      setIsDesktop(window.matchMedia('(hover: hover)').matches);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // track raw cursor/touch
  useEffect(() => {
    const onMouse = e => {
      if (isDesktop && isEnabled) {
        rawPos.current.x = e.clientX;
        rawPos.current.y = e.clientY;
      }
    };
    const onTouch = e => {
      const t = e.touches[0];
      rawPos.current.x = t.clientX;
      rawPos.current.y = t.clientY;
    };
    window.addEventListener('mousemove', onMouse);
    window.addEventListener('touchmove', onTouch, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('touchmove', onTouch);
    };
  }, [isDesktop, isEnabled]);

  // animation & spawning loop
  useEffect(() => {
    let frameId;
    const loop = () => {
      if (isEnabled && isDesktop) {
        // smooth follow
        const dx = rawPos.current.x - displayPos.current.x;
        const dy = rawPos.current.y - displayPos.current.y;
        displayPos.current.x += dx * SMOOTHING_FACTOR;
        displayPos.current.y += dy * SMOOTHING_FACTOR;

        // check raw movement
        const rawDX = rawPos.current.x - lastRawPos.current.x;
        const rawDY = rawPos.current.y - lastRawPos.current.y;
        const rawDist = Math.hypot(rawDX, rawDY);

        if (rawDist >= MIN_RAW_DISTANCE) {
          // spawn a new note
          setPoints(prev => {
            const newPoint = {
              x: displayPos.current.x,
              y: displayPos.current.y,
              id: pointId.current++,
              note: getRandomNote(),
            };
            return [newPoint, ...prev].slice(0, MAX_POINTS);
          });
          // reset the raw-pos tracker
          lastRawPos.current = { ...rawPos.current };
        }
      }
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [isDesktop, isEnabled]);

  if (!isDesktop) return null;

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
        <AnimatePresence>
          {isEnabled &&
            points.map(pt => (
              <Note
                key={pt.id}
                x={pt.x}
                y={pt.y}
                id={pt.id}
                note={pt.note}
              />
            ))}
        </AnimatePresence>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 right-6 z-50 bg-black/80 backdrop-blur-sm border border-[#f6c78b]/30 rounded-lg px-4 py-2 text-[#f6c78b] hover:bg-gray-900/80 transition-colors duration-300 hidden md:flex items-center gap-2"
        onClick={() => setIsEnabled(!isEnabled)}
        aria-label={isEnabled ? 'Disable cursor trail' : 'Enable cursor trail'}
      >
        {isEnabled ? (
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        )}
        <span className="text-sm font-medium">
          {isEnabled ? 'Disable Trail' : 'Enable Trail'}
        </span>
      </motion.button>
    </>
  );
}
