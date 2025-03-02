import React from 'react';
import "../css/home.css"

export default function SectionTitle({ title }) {
    return (
        <div className="flex justify-center w-full">
            <h1 className="font-extrabold text-3xl tracking-widest text-black relative text-center"> 
                <span className="before-content">{title}</span>
            </h1>
        </div>
    );
};
