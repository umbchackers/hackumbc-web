"use client";
import React from 'react';
import "../css/home.css"
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { useEffect } from 'react';
export default function LinkBox({ href, title, desc, color }) {

  useEffect(() => {
    AOS.init({
        duration: 1200,
        easing: 'ease-in-out',
        once: true,
    });
  }, []);

  return (
    <div className="link-box-container" data-aos="fade-in">
    <a
      href={href}
className="rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-neutral-700 hover:bg-neutral-800/30"
      rel="noopener noreferrer"
    >
      <h2 className="mb-3 text-2xl font-semibold">
        {title}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2> 
      <p className="m-0 max-w-[30ch] text-sm opacity-50">
        {desc}
      </p>
    </a>
    </div>
  );
}
