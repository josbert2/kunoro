import React from 'react';
import { useState } from 'react';

import Logo from "../assets/meow.png";

export default function Header() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    return (
       <nav className="framer-hk7g5j">
            <div className="framer-nk88tz-container">
                <p className="font-bold">KUNORO</p>
            </div>
            <div className="framer-z8d3vr">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 256"
                        focusable="false"
                        color="var(--token-a52a650f-fdc2-43f9-93f7-15f9ca573529, rgb(0, 0, 0))"
                        style={{
                            width: "24px",
                            height: "24px",
                            fill: "#8a8a8a",
                            
                        }}
                    >
                    <g
                    color="var(--token-a52a650f-fdc2-43f9-93f7-15f9ca573529, rgb(0, 0, 0))"
                    weight="bold"
                    >
                    <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,72a24,24,0,1,1,24-24A24,24,0,0,1,128,152ZM176,20H80A60.07,60.07,0,0,0,20,80v96a60.07,60.07,0,0,0,60,60h96a60.07,60.07,0,0,0,60-60V80A60.07,60.07,0,0,0,176,20Zm36,156a36,36,0,0,1-36,36H80a36,36,0,0,1-36-36V80A36,36,0,0,1,80,44h96a36,36,0,0,1,36,36ZM196,76a16,16,0,1,1-16-16A16,16,0,0,1,196,76Z" />
                    </g>
                </svg>

            </div>
        </nav>
    );
}