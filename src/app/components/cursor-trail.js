'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Music2, Music3, Music4, Headphones, Mic, Volume2, Play, Pause, SkipForward, SkipBack } from 'lucide-react';

export default function CursorTrail() {
  const [musicNotes, setMusicNotes] = useState([]);
  const [particles, setParticles] = useState([]);
  const [soundWaves, setSoundWaves] = useState([]);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isEnabled, setIsEnabled] = useState(true);

  // Advanced position tracking
  const rawPos = useRef({ x: 0, y: 0 });
  const displayPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const acceleration = useRef({ x: 0, y: 0 });

  const noteId = useRef(0);
  const particleId = useRef(0);
  const waveId = useRef(0);
  
  const MAX_NOTES = 12;
  const SMOOTHING_FACTOR = 0.92;
  const VELOCITY_DECAY = 0.95;
  const MAX_PARTICLES = 30;
  const MAX_WAVES = 6;

  // Musical note icons array
  const musicIcons = [
    { icon: Music, color: '#f6c78b', size: 20 },
    { icon: Music2, color: '#00ffff', size: 18 },
    { icon: Music3, color: '#ff00ff', size: 22 },
    { icon: Music4, color: '#ffff00', size: 16 },
    { icon: Headphones, color: '#00ff00', size: 24 },
    { icon: Mic, color: '#ff8800', size: 20 },
    { icon: Volume2, color: '#ff0080', size: 18 },
    { icon: Play, color: '#f6c78b', size: 16 },
    { icon: Pause, color: '#00ffff', size: 16 },
    { icon: SkipForward, color: '#ff00ff', size: 18 },
    { icon: SkipBack, color: '#ffff00', size: 18 }
  ];

  // Desktop detection
  useEffect(() => {
    const check = () => setIsDesktop(window.matchMedia('(hover: hover)').matches);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Enhanced input handling with physics
  useEffect(() => {
    const onMouse = (e) => {
      if (isDesktop && isEnabled) {
        const newX = e.clientX;
        const newY = e.clientY;
        
        // Calculate velocity and acceleration
        const newVx = newX - lastPos.current.x;
        const newVy = newY - lastPos.current.y;
        
        acceleration.current.x = newVx - velocity.current.x;
        acceleration.current.y = newVy - velocity.current.y;
        
        velocity.current.x = newVx;
        velocity.current.y = newVy;
        
        rawPos.current.x = newX;
        rawPos.current.y = newY;
        lastPos.current.x = newX;
        lastPos.current.y = newY;
      }
    };

    const onTouch = (e) => {
      const t = e.touches[0];
      const newX = t.clientX;
      const newY = t.clientY;
      
      const newVx = newX - lastPos.current.x;
      const newVy = newY - lastPos.current.y;
      
      acceleration.current.x = newVx - velocity.current.x;
      acceleration.current.y = newVy - velocity.current.y;
      
      velocity.current.x = newVx;
      velocity.current.y = newVy;
      
      rawPos.current.x = newX;
      rawPos.current.y = newY;
      lastPos.current.x = newX;
      lastPos.current.y = newY;
    };

    window.addEventListener('mousemove', onMouse);
    window.addEventListener('touchmove', onTouch, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('touchmove', onTouch);
    };
  }, [isDesktop, isEnabled]);

  // Ultra-smooth animation loop with musical notes
  useEffect(() => {
    let frameId;
    let time = 0;
    
    const loop = () => {
      if (isEnabled && isDesktop) {
        time += 0.016;
        
        // Apply physics to display position
        const dx = rawPos.current.x - displayPos.current.x;
        const dy = rawPos.current.y - displayPos.current.y;
        
        displayPos.current.x += dx * SMOOTHING_FACTOR;
        displayPos.current.y += dy * SMOOTHING_FACTOR;
        
        // Decay velocity
        velocity.current.x *= VELOCITY_DECAY;
        velocity.current.y *= VELOCITY_DECAY;
        
        const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
        const accel = Math.sqrt(acceleration.current.x ** 2 + acceleration.current.y ** 2);
        
        // Update musical notes trail
        setMusicNotes(prev => {
          const newNotes = [...prev];
          
          // Add new note if enough distance moved or speed is high
          const lastNote = newNotes[0];
          if (!lastNote || 
              Math.abs(displayPos.current.x - lastNote.x) > 8 || 
              Math.abs(displayPos.current.y - lastNote.y) > 8 ||
              speed > 5) {
            
            const randomIcon = musicIcons[Math.floor(Math.random() * musicIcons.length)];
            const randomRotation = (Math.random() - 0.5) * 60; // -30 to 30 degrees
            const randomScale = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
            
            newNotes.unshift({
              id: noteId.current++,
              x: displayPos.current.x + (Math.random() - 0.5) * 20,
              y: displayPos.current.y + (Math.random() - 0.5) * 20,
              time: time,
              speed: speed,
              acceleration: accel,
              velocity: { x: velocity.current.x, y: velocity.current.y },
              icon: randomIcon.icon,
              color: randomIcon.color,
              size: randomIcon.size,
              rotation: randomRotation,
              scale: randomScale,
              life: 1,
              decay: 0.008 + Math.random() * 0.004
            });
          }
          
          // Update existing notes
          const updatedNotes = newNotes.map(note => ({
            ...note,
            life: note.life - note.decay,
            scale: note.scale * 0.995, // Slowly shrink
            rotation: note.rotation + (note.speed * 0.5) // Rotate based on speed
          }));
          
          return updatedNotes
            .filter(note => note.life > 0)
            .slice(0, MAX_NOTES);
        });

        // Enhanced particle generation
        if (speed > 2) {
          setParticles(prev => {
            const newParticles = [...prev];
            if (Math.random() < 0.3) {
              const angle = Math.atan2(velocity.current.y, velocity.current.x);
              const spread = (Math.random() - 0.5) * Math.PI / 2;
              const finalAngle = angle + spread;
              const particleSpeed = 3 + Math.random() * 5;
              
              newParticles.push({
                id: particleId.current++,
                x: displayPos.current.x + Math.cos(finalAngle) * 15,
                y: displayPos.current.y + Math.sin(finalAngle) * 15,
                vx: Math.cos(finalAngle) * particleSpeed,
                vy: Math.sin(finalAngle) * particleSpeed,
                life: 1,
                decay: 0.02 + Math.random() * 0.02,
                size: 4 + Math.random() * 8,
                color: `hsl(${200 + Math.random() * 80}, 80%, ${60 + Math.random() * 20}%)`,
                type: 'sparkle',
                rotation: Math.random() * 360
              });
            }
            return newParticles
              .map(p => ({ ...p, life: p.life - p.decay }))
              .filter(p => p.life > 0)
              .slice(0, MAX_PARTICLES);
          });
        }

        // Dynamic sound wave generation
        if (Math.random() < 0.02 + (speed * 0.005)) {
          setSoundWaves(prev => {
            const newWaves = [...prev];
            newWaves.push({
              id: waveId.current++,
              x: displayPos.current.x,
              y: displayPos.current.y,
              radius: 0,
              maxRadius: 60 + Math.random() * 100 + speed * 3,
              speed: 1.5 + Math.random() * 2 + speed * 0.08,
              opacity: 0.8,
              color: `hsl(${180 + Math.random() * 60}, 80%, 60%)`,
              thickness: 1 + Math.random() * 2
            });
            return newWaves.slice(0, MAX_WAVES);
          });
        }

        // Update sound waves
        setSoundWaves(prev => 
          prev.map(wave => ({
            ...wave,
            radius: wave.radius + wave.speed,
            opacity: wave.opacity - 0.01
          })).filter(wave => wave.opacity > 0)
        );
      }
      frameId = requestAnimationFrame(loop);
    };
    
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [isDesktop, isEnabled]);

  if (!isDesktop) return null;

  return (
    <>
      <AnimatePresence>
        {isEnabled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50"
          >
            <svg className="absolute inset-0 w-full h-full">
              {/* Sound waves with enhanced visuals */}
              {soundWaves.map(wave => (
                <motion.circle
                  key={wave.id}
                  cx={wave.x}
                  cy={wave.y}
                  r={wave.radius}
                  fill="none"
                  stroke={wave.color}
                  strokeWidth={wave.thickness}
                  opacity={wave.opacity}
                  className="drop-shadow-[0_0_15px_rgba(0,255,255,0.6)]"
                />
              ))}
            </svg>

            {/* Musical notes trail */}
            {musicNotes.map(note => {
              const IconComponent = note.icon;
              return (
                <motion.div
                  key={note.id}
                  className="absolute pointer-events-none"
                  style={{
                    left: note.x - note.size / 2,
                    top: note.y - note.size / 2,
                    opacity: note.life,
                  }}
                  animate={{
                    scale: note.scale,
                    rotate: note.rotation,
                    y: [0, -10, -20],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeOut",
                  }}
                >
                  <IconComponent
                    size={note.size}
                    color={note.color}
                    className="drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]"
                    style={{
                      filter: `drop-shadow(0 0 6px ${note.color}40)`,
                    }}
                  />
                </motion.div>
              );
            })}

            {/* Enhanced particles with better physics */}
            {particles.map(particle => (
              <motion.div
                key={particle.id}
                className="absolute pointer-events-none"
                style={{
                  left: particle.x,
                  top: particle.y,
                  width: particle.size,
                  height: particle.size,
                  opacity: particle.life,
                  transform: `rotate(${particle.rotation}deg)`
                }}
                animate={{
                  x: particle.vx * 50,
                  y: particle.vy * 50,
                  scale: [1, 1.5, 0],
                  rotate: [particle.rotation, particle.rotation + 360],
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                }}
              >
                <div 
                  className="w-full h-full rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${particle.color} 0%, transparent 60%)`,
                    boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
                  }}
                />
              </motion.div>
            ))}

            {/* Enhanced cursor highlight */}
            <motion.div
              className="absolute w-8 h-8 pointer-events-none"
              style={{
                left: displayPos.current.x - 16,
                top: displayPos.current.y - 16,
              }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-r from-cyan-400 via-pink-500 to-yellow-400 opacity-90 blur-sm" />
              <div className="absolute inset-2 rounded-full bg-white opacity-70" />
              <div className="absolute inset-3 rounded-full bg-gradient-to-r from-cyan-300 to-purple-300 opacity-50" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced toggle button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 right-6 z-50 bg-black/95 backdrop-blur-lg border border-cyan-400/60 rounded-2xl px-5 py-3 text-cyan-400 hover:bg-gray-900/95 hover:border-cyan-300/80 transition-all duration-300 hidden md:flex items-center gap-3 shadow-2xl shadow-cyan-400/30"
        onClick={() => setIsEnabled(!isEnabled)}
        aria-label={isEnabled ? "Disable music trail" : "Enable music trail"}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
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
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <Music className="w-5 h-5" />
        )}
        <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          {isEnabled ? 'Disable Music Trail' : 'Enable Music Trail'}
        </span>
      </motion.button>
    </>
  );
} 