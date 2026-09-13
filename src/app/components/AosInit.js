"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AosInit() {
  useEffect(() => {
    AOS.init({
      duration: 400,
      easing: "ease-in-out",
      once: true,
      disable: "mobile",
      throttleDelay: 99,
      debounceDelay: 50,
    });
  }, []);

  return null; 
}