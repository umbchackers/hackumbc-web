import React from 'react';
import "../css/home.css"

export default function SectionTitle({ title, color = "text-black" }) {
    return (
        <div className="flex justify-center w-full">
            <h1 className={`font-extrabold text-3xl tracking-widest ${color} relative text-center`}> 
                <span className="before-content">{title}</span>
            </h1>
        </div>
    );
};
