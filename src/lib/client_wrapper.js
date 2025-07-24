'use client';
import { useEffect } from "react";
import { logPageSectionSizes } from "./log_pg_sizes"; 

export default function ClientWrapper() {
  useEffect(() => {
    const logSizes = () => logPageSectionSizes();

    logSizes(); // initial

    window.addEventListener("resize", logSizes);
    const observer = new MutationObserver(logSizes);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    return () => {
      window.removeEventListener("resize", logSizes);
      observer.disconnect();
    };
  }, []);

  return null; // this component just runs effects
}
