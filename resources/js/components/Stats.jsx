import { useEffect, useRef, Fragment } from 'react';

// Generate a seeded random-ish contribution grid
const generateContributions = () => {
    const cells = [];
    const seed = [0,1,0,2,3,4,2,1,0,0,1,3,4,2,1,0,2,3,1,0,1,2,4,3,2,1,0,1,2,3,4,2,1,0,1,2,3,0,1,2,
                   4,3,2,1,0,1,3,4,2,0,1,2,3,4,1,0,2,3,4,2,1,0,1,3,2,4,1,0,2,3,1,4,2,0,1,3,2,4,3,1,
                   0,2,4,3,1,0,2,3,4,2,1,0,3,4,2,1,0,1,2,3,4,2,1,0,1,3,4,2,0,1,2,3,4,1,0,2,3,4,2,1,
                   0,1,2,3,4,2,1,0,1,3,2,4,1,0,2,3,1,4,2,0,1,3,2,4,3,1,0,2,4,3,1,0,2,3,4,2,1,0,3,4];
    for (let i = 0; i < 364; i++) {
        cells.push(seed[i % seed.length]);
    }
    return cells;
};

const STATS = [
    { value: '240+', key: 'Commits This Year' },
    { value: '18', key: 'Repositories' },
    { value: '4', key: 'Open Source Contributions' },
    { value: '6', key: 'Stars Earned' },
];

export default function Stats() {
    const ref = useRef(null);
    const contributions = generateContributions();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.1 }
        );
        ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section id="stats" className="section" ref={ref}>
            <div className="section-inner">
                <p className="section-label reveal">Open Source</p>
                <h2 className="section-title reveal reveal-delay-1">
                    GitHub <span className="gradient-text">Activity</span>
                </h2>

                <div className="github-grid" style={{ marginTop: '3rem' }}>
                    {STATS.map((s, i) => (
                        <div key={s.key} className={`glass-card github-stat reveal reveal-delay-${(i % 3) + 1}`}>
                            <div className="value">{s.value}</div>
                            <div className="key">{s.key}</div>
                        </div>
                    ))}
                </div>

                <div className="glass-card github-contrib reveal reveal-delay-2">
                    <p style={{
                        fontFamily: 'Orbitron, monospace',
                        fontSize: '0.75rem',
                        letterSpacing: '0.15em',
                        color: 'var(--text-muted)',
                        marginBottom: '1.5rem',
                        textAlign: 'left',
                    }}>
                        CONTRIBUTION ACTIVITY — 2024
                    </p>
                    <div className="contrib-grid">
                        {contributions.map((lvl, i) => (
                            <div
                                key={i}
                                className={`contrib-cell ${lvl > 0 ? `l${lvl}` : ''}`}
                                title={`${lvl * 3} contributions`}
                            />
                        ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem' }}>
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>Less</span>
                        {[0, 1, 2, 3, 4].map(l => (
                            <div key={l} className={`contrib-cell ${l > 0 ? `l${l}` : ''}`} />
                        ))}
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>More</span>
                    </div>
                </div>

                {/* GitHub button */}
                <div style={{ textAlign: 'center', marginTop: '2rem' }} className="reveal">
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline"
                        style={{ display: 'inline-flex' }}
                    >
                        <span>⭐</span>
                        <span>View GitHub Profile</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
