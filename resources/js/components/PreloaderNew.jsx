import { useEffect, useState } from 'react';

export default function Preloader({ onDone }) {
    const [pct, setPct] = useState(0);
    const [fading, setFading] = useState(false);

    useEffect(() => {
        let p = 0;
        const interval = setInterval(() => {
            p += 3;
            setPct(Math.min(p, 100));
            if (p >= 100) {
                clearInterval(interval);
                setFading(true);
                setTimeout(() => {
                    onDone();
                }, 600);
            }
        }, 40);
        
        return () => clearInterval(interval);
    }, [onDone]);

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                background: 'var(--bg-primary, #030712)',
                zIndex: 99990,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 0.6s ease',
                opacity: fading ? 0 : 1,
                pointerEvents: fading ? 'none' : 'all',
            }}
        >
            <div style={{
                fontFamily: 'Orbitron, monospace',
                fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                fontWeight: 900,
                background: 'linear-gradient(135deg, #a855f7, #3b82f6, #ec4899)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.15em',
            }}>
                DEV&amp;BEATS
            </div>

            <p style={{
                color: '#94a3b8',
                fontSize: '0.72rem',
                letterSpacing: '0.25em',
                marginTop: '1rem',
                fontFamily: 'Orbitron, monospace',
            }}>
                LOADING EXPERIENCE...
            </p>

            <div style={{
                width: '200px',
                height: '2px',
                background: 'rgba(168,85,247,0.2)',
                borderRadius: '2px',
                marginTop: '2rem',
                overflow: 'hidden',
            }}>
                <div style={{
                    height: '100%',
                    width: `${pct}%`,
                    background: 'linear-gradient(90deg, #a855f7, #3b82f6, #ec4899)',
                    borderRadius: '2px',
                    transition: 'width 0.04s linear',
                    boxShadow: '0 0 10px #a855f7',
                }} />
            </div>

            <p style={{
                color: '#a855f7',
                fontSize: '0.7rem',
                fontFamily: 'Orbitron, monospace',
                marginTop: '0.75rem',
            }}>
                {pct}%
            </p>
        </div>
    );
}
