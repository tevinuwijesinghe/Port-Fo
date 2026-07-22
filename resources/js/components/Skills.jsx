import { useEffect, useRef, useState } from 'react';

const CATEGORIES = [
    {
        title: 'Frontend',
        icon: '🖥️',
        color: '#a855f7',
        skills: [
            { name: 'React.js', pct: 90 },
            { name: 'JavaScript (ES6+)', pct: 88 },
            { name: 'Tailwind CSS', pct: 92 },
            { name: 'HTML5 / CSS3', pct: 95 },
            { name: 'Next.js', pct: 78 },
        ],
    },
    {
        title: 'Backend',
        icon: '⚙️',
        color: '#3b82f6',
        skills: [
            { name: 'Laravel / PHP', pct: 88 },
            { name: 'RESTful APIs', pct: 85 },
            { name: 'MySQL / PostgreSQL', pct: 80 },
            { name: 'Node.js', pct: 72 },
            { name: 'Python', pct: 35 },
        ],
    },
    {
        title: 'Mobile',
        icon: '📱',
        color: '#ec4899',
        skills: [
            { name: 'Android (Java)', pct: 82 },
            { name: 'React Native', pct: 75 },
            { name: 'Flutter (Basics)', pct: 55 },
        ],
    },
    {
        title: 'Tools & Music',
        icon: '🛠️',
        color: '#06b6d4',
        skills: [
            { name: 'Firebase / Firestore', pct: 87 },
            { name: 'Git / GitHub', pct: 90 },
            { name: 'Figma / UI Design', pct: 75 },
            { name: 'FL Studio', pct: 88 },
            { name: 'Ableton Live', pct: 72 },
        ],
    },
];

function SkillBar({ pct, color, visible }) {
    return (
        <div className="skill-bar">
            <div
                className="skill-fill"
                style={{
                    width: visible ? `${pct}%` : '0%',
                    background: `linear-gradient(90deg, ${color}, ${color === '#a855f7' ? '#3b82f6' : color === '#3b82f6' ? '#06b6d4' : color === '#ec4899' ? '#a855f7' : '#a855f7'})`,
                    boxShadow: `0 0 8px ${color}60`,
                }}
            />
        </div>
    );
}

export default function Skills() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(e => {
                    if (e.isIntersecting) {
                        e.target.classList.add('visible');
                        setVisible(true);
                    }
                });
            },
            { threshold: 0.15 }
        );
        ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="skills" className="section" ref={ref} style={{ background: 'rgba(15,23,42,0.3)' }}>
            <div className="section-inner">
                <p className="section-label reveal">Expertise</p>
                <h2 className="section-title reveal reveal-delay-1">
                    Skills &amp; <span className="gradient-text">Technologies</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', maxWidth: 520, fontSize: '0.95rem', lineHeight: 1.8, marginTop: '0.75rem', marginBottom: '3rem' }}
                   className="reveal reveal-delay-2">
                    A versatile toolkit spanning full-stack development, mobile engineering, and music production.
                </p>

                <div className="skills-container">
                    {CATEGORIES.map((cat, ci) => (
                        <div key={cat.title} className={`glass-card skill-category reveal reveal-delay-${(ci % 3) + 1}`}>
                            <div className="skill-category-title" style={{ color: cat.color }}>
                                <div className="skill-icon-circle" style={{
                                    background: `${cat.color}15`,
                                    border: `1px solid ${cat.color}30`,
                                }}>
                                    {cat.icon}
                                </div>
                                {cat.title}
                            </div>

                            {cat.skills.map(skill => (
                                <div key={skill.name} className="skill-item">
                                    <div className="skill-meta">
                                        <span className="skill-name">{skill.name}</span>
                                        <span className="skill-pct" style={{ color: cat.color }}>{skill.pct}%</span>
                                    </div>
                                    <SkillBar pct={skill.pct} color={cat.color} visible={visible} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Tech icon cloud */}
                <div style={{ marginTop: '4rem', textAlign: 'center' }} className="reveal">
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontFamily: 'Orbitron, monospace', letterSpacing: '0.15em', marginBottom: '2rem' }}>
                        ALSO FAMILIAR WITH
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', justifyContent: 'center', maxWidth: '700px', margin: '0 auto' }}>
                        {['WordPress', 'TypeScript', 'Sass', 'AWS Basics', 'Postman', 'VS Code', 'Webpack', 'Vite', 'NetBeans'].map(t => (
                            <span key={t} style={{
                                padding: '0.4rem 0.9rem',
                                borderRadius: '999px',
                                fontSize: '0.72rem',
                                fontFamily: 'Orbitron, monospace',
                                letterSpacing: '0.05em',
                                border: '1px solid rgba(168,85,247,0.2)',
                                color: 'var(--text-muted)',
                                background: 'rgba(168,85,247,0.04)',
                                transition: 'all 0.3s ease',
                                cursor: 'default',
                            }}
                            onMouseEnter={e => {
                                e.target.style.borderColor = 'rgba(168,85,247,0.5)';
                                e.target.style.color = 'var(--neon-purple)';
                                e.target.style.background = 'rgba(168,85,247,0.1)';
                            }}
                            onMouseLeave={e => {
                                e.target.style.borderColor = 'rgba(168,85,247,0.2)';
                                e.target.style.color = 'var(--text-muted)';
                                e.target.style.background = 'rgba(168,85,247,0.04)';
                            }}
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
