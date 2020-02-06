import React from "react";
import { Link } from "react-router-dom";

export default function Page404() {
    return (
        <div className="wrap-404">
            <svg>
                <pattern
                    id="pattern"
                    viewBox="0 0 300 100"
                    patternUnits="userSpaceOnUse"
                    width="750"
                    height="800"
                >
                    <img className="background404" src="background.gif" />
                </pattern>
                <text x="0" y="80" className="text-404">
                    404
                </text>
            </svg>
        </div>
    );
}
