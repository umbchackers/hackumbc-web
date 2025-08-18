'use client';
import { useEffect, useRef } from "react";
import { logPageSectionSizes } from "./log_pg_sizes"; 

export default function ClientWrapper() {
  const lastLogTime = useRef(0);
  const isLogging = useRef(false);

  useEffect(() => {
    const logSizes = () => {
      const now = Date.now();
      
      // Prevent logging more than once every 500ms
      if (now - lastLogTime.current < 500) {
        return;
      }
      
      // Prevent concurrent logging
      if (isLogging.current) {
        return;
      }
      
      isLogging.current = true;
      lastLogTime.current = now;
      
      try {
        logPageSectionSizes();
      } finally {
        isLogging.current = false;
      }
    };

    // Initial log after a short delay to let the page load
    const initialTimeout = setTimeout(logSizes, 1000);

    // Only log on resize, not on DOM changes
    window.addEventListener("resize", logSizes);

    return () => {
      clearTimeout(initialTimeout);
      window.removeEventListener("resize", logSizes);
    };
  }, []);

  return null;
}
