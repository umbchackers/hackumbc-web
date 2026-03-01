'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Swords, Crown, Flame, Shield, Gem, Star, Sparkles, Wand2, Feather, Skull, Zap } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function CursorTrail() {
  const medievalIconsRef = useRef([]);
  const particlesRef = useRef([]);
  const magicRingsRef = useRef([]);

  const pathname = usePathname();
  const [medievalIcons, setMedievalIcons] = useState([]);
  const [particles, setParticles] = useState([]);
  const [magicRings, setMagicRings] = useState([]);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isEnabled, setIsEnabled] = useState(pathname !== '/sign-up');

  // for position tracking
  const rawPos = useRef({ x: 0, y: 0 });
  const displayPos = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const acceleration = useRef({ x: 0, y: 0 });

  const iconId = useRef(0);
  const particleId = useRef(0);
  const ringId = useRef(0);
  
  const MAX_ICONS = 12;
  const SMOOTHING_FACTOR = 0.92;
  const VELOCITY_DECAY = 0.95;
  const MAX_PARTICLES = 30;
  const MAX_RINGS = 4;

  // medieval icons array using the color palette from the design sheet
  const medievalIconsdefs = [
    { icon: Swords, color: '#E8C48D', size: 22 },
    { icon: Crown, color: '#DD9E45', size: 20 },
    { icon: Flame, color: '#A34F2B', size: 20 },
    { icon: Shield, color: '#690010', size: 22 },
    { icon: Gem, color: '#391C36', size: 18 },
    { icon: Star, color: '#DD9E45', size: 16 },
    { icon: Sparkles, color: '#E8C48D', size: 18 },
    { icon: Wand2, color: '#510E23', size: 20 },
    { icon: Feather, color: '#515128', size: 18 },
    { icon: Skull, color: '#C68A5C', size: 18 },
    { icon: Zap, color: '#977837', size: 16 }
  ];

  // desktop detection
  useEffect(() => {
    const check = () => setIsDesktop(window.matchMedia('(hover: hover)').matches);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // input handling physics
  useEffect(() => {
    const onMouse = (e) => {
      if(isDesktop && isEnabled) {
        const newX = e.clientX;
        const newY = e.clientY;
        
        // calc velocity and acceleration
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

  // main animation loop 
  useEffect(() => {
    let frameId;
    let time = 0;
    
    const loop = () => {
      if(isEnabled && isDesktop) {
        time += 0.016;
        
        // physics to display position
        const dx = rawPos.current.x - displayPos.current.x;
        const dy = rawPos.current.y - displayPos.current.y;
        
        displayPos.current.x += dx * SMOOTHING_FACTOR;
        displayPos.current.y += dy * SMOOTHING_FACTOR;
        
        // decay velocity
        velocity.current.x *= VELOCITY_DECAY;
        velocity.current.y *= VELOCITY_DECAY;
        
        const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
        const accel = Math.sqrt(acceleration.current.x ** 2 + acceleration.current.y ** 2);
        
        //midieval icons trail
        const icons = medievalIconsRef.current; 
        const lastIcon = icons[0];
        if(!lastIcon || 
            Math.abs(displayPos.current.x - lastIcon.x) > 8 || 
            Math.abs(displayPos.current.y - lastIcon.y) > 8 ||
            speed > 5) {
          
          const pick = medievalIconsdefs[Math.floor(Math.random() * medievalIconsdefs.length)];
          const randomRotation = (Math.random() - 0.5) * 60;
          const randomScale = 0.8 + Math.random() * 0.4;
          
          icons.unshift({
            id: iconId.current++,
            x: displayPos.current.x + (Math.random() - 0.5) * 20,
            y: displayPos.current.y + (Math.random() - 0.5) * 20,
            time: time,
            speed: speed,
            acceleration: accel,
            velocity: { x: velocity.current.x, y: velocity.current.y },
            icon: pick.icon,
            color: pick.color,
            size: pick.size,
            rotation: randomRotation,
            scale: randomScale,
            life: 1,
            decay: 0.008 + Math.random() * 0.004
          });
        }
        
        // update existing notes
        medievalIconsRef.current = icons
          .map(icon => ({
            ...icon,
            life: icon.life - icon.decay,
            scale: icon.scale * 0.995, // slowly shrink
            rotation: icon.rotation + (icon.speed * 0.5) // rotate based on speed
          }))
          .filter(icon => icon.life > 0)
          .slice(0, MAX_ICONS);

        // enhanced particle generation
        if(speed > 2) {
          if (Math.random() < 0.3) {
            const angle = Math.atan2(velocity.current.y, velocity.current.x);
            const spread = (Math.random() - 0.5) * Math.PI / 2;
            const finalAngle = angle + spread;
            const particleSpeed = 3 + Math.random() * 5;
            
            particlesRef.current.push({
              id: particleId.current++,
              x: displayPos.current.x + Math.cos(finalAngle) * 15,
              y: displayPos.current.y + Math.sin(finalAngle) * 15,
              vx: Math.cos(finalAngle) * particleSpeed,
              vy: Math.sin(finalAngle) * particleSpeed,
              life: 1,
              decay: 0.02 + Math.random() * 0.02,
              size: 4 + Math.random() * 8,
              color: ['#A34F2B', '#DD9E45', '#977837', '#690010', '#E8C48D'][Math.floor(Math.random() * 5)],
              type: 'sparkle',
              rotation: Math.random() * 360
            });
          }
          particlesRef.current = particlesRef.current
            .map(p => ({ ...p, life: p.life - p.decay }))
            .filter(p => p.life > 0)
            .slice(0, MAX_PARTICLES);              
        }

        // dynamic magic ripples generation 
        if(Math.random() < 0.005 + (speed * 0.002)) {
          magicRingsRef.current.push({
            id: ringId.current++,
            x: displayPos.current.x,
            y: displayPos.current.y,
            radius: 0,
            maxRadius: 1 + Math.random() * 0.02 + speed / 10,
            speed: 1 + Math.random() * 0.25 + speed * 0.04,
            opacity: .7,
            color: ['#DD9E45', '#690010', '#391C36', '#977837'][Math.floor(Math.random() * 4)],
            thickness: 1 + Math.random() * 2
          });
          magicRingsRef.current = magicRingsRef.current.slice(-MAX_RINGS);
        }
        magicRingsRef.current = magicRingsRef.current
          .map(ring => ({
            ...ring,
            radius: ring.radius + ring.speed,
            opacity: ring.opacity - 0.01
          }))
          .filter(ring => ring.opacity > 0)
      }
      frameId = requestAnimationFrame(loop);
    };
    
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [isDesktop, isEnabled]);

  useEffect(() => {
    const syncInterval = setInterval(() => {
      setMedievalIcons([...medievalIconsRef.current]);
      setParticles([...particlesRef.current]);
      setMagicRings([...magicRingsRef.current]);
    }, 1000 / 60); // 60 fps
    return () => clearInterval(syncInterval);
  }, []);

  if(!isDesktop) return null;

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
              {/* magic ripples with enhanced visuals */}
              {magicRings.map(ring => (
                <motion.circle
                  key={ring.id}
                  cx={ring.x}
                  cy={ring.y}
                  r={ring.radius}
                  fill="none"
                  stroke={ring.color}
                  strokeWidth={ring.thickness}
                  opacity={ring.opacity}
                />
              ))}
            </svg>

            {/* medieval icon trail */}
            {medievalIcons.map(item => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.id}
                  className="absolute pointer-events-none"
                  style={{
                    left: item.x - item.size / 2,
                    top: item.y - item.size / 2,
                    opacity: item.life,
                  }}
                  animate={{
                    scale: item.scale,
                    rotate: item.rotation,
                    y: [0, -10, -20],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeOut",
                  }}
                >
                  <IconComponent
                    size={item.size}
                    color={item.color}
                    className="drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]"
                    style={{
                      filter: `drop-shadow(0 0 6px ${item.color}40)`,
                    }}
                  />
                </motion.div>
              );
            })}

            {/* enhanced particles with better physics */}
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

            {/* enhanced cursor highlight */}
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
              {/* outer ring - crimson glow */}
              <div
                className="w-full h-full rounded-full opacity-80 blur-sm"
                style={{ background: 'radial-gradient(circle, #DD9E45, #690010)' }}
              />
              {/* inner ring - parchment gold */}
              <div
                className="absolute inset-1 rounded-full opacity-90"
                style={{ background: 'radial-gradient(circle, #E8C48D, #977837)' }}
              />
                {/* inner core - bright gold */}
              <div
                className="absolute inset-2 rounded-full"
                style={{ background: 'radial-gradient(circle, #FFE599, #DD9E45)' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* enhanced toggle button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
         className="fixed bottom-6 right-6 z-50 backdrop-blur-lg rounded-2xl px-5 py-3 hidden md:flex items-center gap-3 shadow-2xl transition-all duration-300"
        style={{
          backgroundColor: 'rgba(26, 10, 5, 0.95)',
          border: '1px solid #977837',
          boxShadow: '0 0 20px #69001044',
        }}
        onClick={() => setIsEnabled(!isEnabled)}
        aria-label={isEnabled ? "Disable cursor trail" : "Enable cursor trail"}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        {isEnabled ? (
        <Swords className="w-5 h-5" style={{ color: '#DD9E45' }} />
        ) : (
          <Sparkles className="w-5 h-5" style={{ color: '#DD9E45' }} />
        )}
        <span
          className="text-sm font-bold"
          style={{
            background: 'linear-gradient(to right, #DD9E45, #E8C48D, #977837)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {isEnabled ? 'Disable cursor trail' : 'Enable cursor trail'}
        </span>
      </motion.button>
    </>
  );
}