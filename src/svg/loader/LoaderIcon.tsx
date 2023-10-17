export const LoaderIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             version="1.0" width="64px" height="64px" viewBox="0 0 128 128"
        >
            <g>
                <circle cx="16" cy="64" r="16" fill="rgba(0, 0, 0, 0.5)"/>
                <circle cx="16" cy="64" r="16" fill="rgba(0, 0, 0, 0.45)" transform="rotate(45,64,64)"/>
                <circle cx="16" cy="64" r="16" fill="rgba(0, 0, 0, 0.35)" transform="rotate(90,64,64)"/>
                <circle cx="16" cy="64" r="16" fill="rgba(0, 0, 0, 0.30)" transform="rotate(135,64,64)"/>
                <circle cx="16" cy="64" r="16" fill="rgba(0, 0, 0, 0.25)" transform="rotate(180,64,64)"/>
                <circle cx="16" cy="64" r="16" fill="rgba(0, 0, 0, 0.20)" transform="rotate(225,64,64)"/>
                <circle cx="16" cy="64" r="16" fill="rgba(0, 0, 0, 0.15)" transform="rotate(270,64,64)"/>
                <circle cx="16" cy="64" r="16" fill="rgba(0, 0, 0, 0.1)" transform="rotate(315,64,64)"/>
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64"
                    calcMode="discrete"
                    dur="960ms"
                    repeatCount="indefinite"
                />
            </g>
        </svg>
    );
};

