import React from "react";

export default function Page404() {
    return (
        <div className="wrapper404">
            <svg>
                <defs>
                    <pattern
                        id="gif"
                        patternUnits="userSpaceOnUse"
                        width="100vw"
                        height="100vh"
                    >
                        <image xlinkHref="background.gif" />
                    </pattern>
                </defs>
                <text y="50%" x="33.4%">
                    404
                </text>
            </svg>
            <div id="back-container">
                <a id="back" href="/">
                    BACK
                </a>
            </div>
        </div>
    );
}
