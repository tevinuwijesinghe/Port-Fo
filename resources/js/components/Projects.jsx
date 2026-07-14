import { useEffect, useRef } from 'react';

const PROJECTS = [
    {
        title: 'ServiGo Mobile App',
        desc: 'A home-service booking app that connects customers with skilled technicians. It includes online booking, PayHere payments, live location tracking, ratings, notifications, and an admin panel.',
        stack: ['Android Java','Firebase','PHP REST API','Laravel','MySQL','Google Maps','PayHere',],
        emoji: '📱',
        image: '/images/servilogonobg.png',
        gradient: 'from-purple-500 to-blue-500',
        color: '#a855f7',
        demo: '#',
        github: '#',
        doc: '/docs/ServiGo Project Documentation - Portfolio.pdf',
    },
    {
        title: 'Admin Analytics Dashboard',
        desc: 'A comprehensive admin panel with real-time analytics, user management, role-based access control, and data visualization for multiple service verticals.',
        stack: ['React', 'Laravel', 'MySQL', 'Chart.js'],
        emoji: '📊',
        gradient: 'from-blue-500 to-cyan-500',
        color: '#3b82f6',
        demo: '#',
        github: '#',
        doc: '#',
    },
    {
        title: 'SmartBook — Booking System',
        desc: 'Fully featured appointment and resource booking system with calendar sync, automated reminders, payment processing, and an intuitive staff management interface.',
        stack: ['Vue.js', 'Laravel', 'MySQL', 'Twilio'],
        emoji: '📅',
        gradient: 'from-pink-500 to-purple-500',
        color: '#ec4899',
        demo: '#',
        github: '#',
        doc: '#',
    },
    {
        title: 'Artist Portfolio Platform',
        desc: 'A dynamic portfolio and fan engagement platform for music artists — featuring song showcases, lyric pages, gallery sections, and integrated media players.',
        stack: ['Next.js', 'Tailwind', 'Firebase', 'Vercel'],
        emoji: '🎨',
        gradient: 'from-cyan-500 to-green-500',
        color: '#06b6d4',
        demo: '#',
        github: '#',
        doc: '#',
    },
];

export default function Projects() {
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.1 }
        );
        ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section id="projects" className="section" ref={ref} style={{ background: 'rgba(15,23,42,0.3)' }}>
            <div className="section-inner">
                <p className="section-label reveal">Portfolio</p>
                <h2 className="section-title reveal reveal-delay-1">
                    Featured <span className="gradient-text">Projects</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', maxWidth: 520, fontSize: '0.95rem', lineHeight: 1.8, marginTop: '0.75rem', marginBottom: '3rem' }}
                   className="reveal reveal-delay-2">
                    A selection of projects demonstrating my experience in web development, enterprise Java, mobile applications, databases, and software architecture.
                </p>

                <div className="projects-grid">
                    {PROJECTS.map((p, i) => (
                        <div
                            key={p.title}
                            className={`glass-card project-card reveal reveal-delay-${(i % 2) + 1}`}
                            style={{ gridTemplateColumns: '1fr 1fr' }}
                        >
                            {/* Visual Side */}
                            <div style={{ position: 'relative', overflow: 'hidden' }}>
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    minHeight: '220px',
                                    background: `linear-gradient(135deg, rgba(${p.color === '#a855f7' ? '168,85,247' : p.color === '#3b82f6' ? '59,130,246' : p.color === '#ec4899' ? '236,72,153' : '6,182,212'},0.15), rgba(${p.color === '#a855f7' ? '59,130,246' : p.color === '#3b82f6' ? '6,182,212' : p.color === '#ec4899' ? '168,85,247' : '16,185,129'},0.1))`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    gap: '0.5rem',
                                    borderRight: '1px solid rgba(168,85,247,0.1)',
                                    position: 'relative',
                                    transition: 'all 0.4s ease',
                                }}>
                                    {p.image ? (
                                        <img
                                            src={p.image}
                                            alt={`${p.title} preview`}
                                            style={{
                                                maxWidth: '72%',
                                                maxHeight: '72%',
                                                objectFit: 'contain',
                                                filter: 'drop-shadow(0 0 18px rgba(255,255,255,0.16))',
                                            }}
                                        />
                                    ) : (
                                        <div style={{ fontSize: '3.5rem', lineHeight: 1 }}>{p.emoji}</div>
                                    )}
                                    {/* Decorative circles */}
                                    <div style={{
                                        position: 'absolute', width: '120px', height: '120px',
                                        borderRadius: '50%', border: `1px solid ${p.color}30`,
                                        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                        animation: 'pulse 3s ease infinite',
                                    }} />
                                    <div style={{
                                        position: 'absolute', width: '180px', height: '180px',
                                        borderRadius: '50%', border: `1px solid ${p.color}15`,
                                        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                    }} />
                                    <div style={{
                                        fontFamily: 'Orbitron, monospace',
                                        fontSize: '0.55rem',
                                        letterSpacing: '0.15em',
                                        color: p.color,
                                        opacity: 0.8,
                                    }}>
                                        0{i + 1}
                                    </div>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="project-body">
                                <div>
                                    <h3 className="project-title">{p.title}</h3>
                                    <p className="project-desc">{p.desc}</p>
                                    <div className="project-stack">
                                        {p.stack.map(t => (
                                            <span key={t} className="tech-tag" style={{ borderColor: `${p.color}40`, color: p.color }}>
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="project-links" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                    <a href={p.demo} className="project-btn primary" target="_blank" rel="noopener noreferrer"
                                       style={{ background: `linear-gradient(135deg, ${p.color}, #3b82f6)` }}>
                                        🚀 Live Demo
                                    </a>
                                    <a href={p.github} className="project-btn secondary" target="_blank" rel="noopener noreferrer"
                                       style={{ borderColor: `${p.color}50`, color: p.color }}>
                                        ⭐ GitHub
                                    </a>
                                    {p.doc && (
                                        <a href={p.doc} className="project-btn secondary" target="_blank" rel="noopener noreferrer"
                                           style={{ borderColor: `${p.color}50`, color: p.color }}>
                                            📄 Docs
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View/Download All Projects Doc */}
                <div style={{ textAlign: 'center', marginTop: '4rem' }} className="reveal">
                    <a href="/docs/projects-portfolio.pdf" className="btn-primary" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', padding: '1rem 2rem', fontSize: '1rem', background: 'linear-gradient(135deg, #a855f7, #3b82f6)', boxShadow: '0 10px 25px -5px rgba(168,85,247,0.4)' }}>
                        <span>📄</span>
                        <span>View Projects Document</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
