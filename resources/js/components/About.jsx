import { useEffect, useRef } from 'react';

export default function About() {
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.15 }
        );
        ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section id="about" className="section" ref={ref}>
            <div className="section-inner">
                <p className="section-label reveal">The Story</p>
                <h2 className="section-title reveal reveal-delay-1">
                    Where <span className="gradient-text">Code</span> Meets <span style={{ color: 'var(--neon-cyan)' }}>Creativity</span>
                </h2>

                <div className="about-grid" style={{ marginTop: '3.5rem' }}>
                    {/* Image side */}
                    <div className="about-image-wrapper reveal reveal-delay-1">
                        <div className="about-image-bg" />
                        <div style={{
                            position: 'relative',
                            zIndex: 1,
                            width: '100%',
                            aspectRatio: '1',
                            borderRadius: '20px',
                            background: 'linear-gradient(135deg, rgba(168,85,247,0.25), rgba(59,130,246,0.2), rgba(236,72,153,0.15))',
                            border: '2px solid rgba(168,85,247,0.35)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '5rem',
                            overflow: 'hidden',
                        }}>
                            {/* Profile Photo */}
                            <img src="/images/avatar.png" alt="Tevinu Wijesinghe" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>

                        <div className="glass-card about-badge">
                            <div className="num">3+</div>
                            <div className="label">Years Coding</div>
                        </div>

                        {/* Music badge */}
                        <div className="glass-card" style={{
                            position: 'absolute',
                            top: '-20px',
                            left: '-20px',
                            zIndex: 2,
                            padding: '0.85rem 1.1rem',
                            textAlign: 'center',
                        }}>
                            <div style={{ fontSize: '1.5rem', lineHeight: 1 }}>🎹</div>
                            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.55rem', color: 'var(--neon-cyan)', marginTop: '0.25rem', letterSpacing: '0.1em' }}>
                                PRODUCER
                            </div>
                        </div>
                    </div>

                    {/* Text side */}
                    <div className="about-text">
                        <p className="reveal reveal-delay-2">
                            I am a Software Engineering undergraduate based in Rajagiriya, Colombo, Sri Lanka. I am currently completing my BSc (Hons) in Software Engineering at
                            the Java Institute for Advanced Technology, affiliated with Birmingham City University.
                            My experience includes full-stack development, frontend development, mobile application development, software testing, debugging, and database management. 
                            During my internship at Think Tank Technologies, I completed more than 960 hours of industry training and gained practical experience working within the software development lifecycle.
                        </p>
                        <p className="reveal reveal-delay-2">
                            I have developed projects such as <strong style={{ color: 'var(--text-primary)' }}>home-service booking platforms, project management systems, e-commerce applications, 
                            real-time chat systems, mobile applications, WordPress websites, and desktop point-of-sale systems</strong>.

                            My main technologies include <strong style={{ color: 'var(--neon-purple)' }}>Java, PHP, Laravel, React.js, JavaScript, TypeScript, Tailwind CSS, MySQL, 
                            PostgreSQL, Firebase, Hibernate, Jakarta EE, and Android development</strong>.

                        </p>
                        <p className="reveal reveal-delay-3">
                           Outside software development, I enjoy exploring music production and creative digital projects. 
                           Both software and music require creativity, patience, experimentation, and continuous improvement.
                        </p>

                        <div className="about-stats reveal reveal-delay-3">
                            <div className="stat-item">
                                <div className="stat-num">960+</div>
                                <div className="stat-label">Internship Hours</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-num">15+</div>
                                <div className="stat-label">Software Projects</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-num">1+</div>
                                <div className="stat-label">Happy Clients</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-num">2026</div>
                                <div className="stat-label">Expected Graduation Year</div>
                            </div>
                        </div>

                        <a href="#contact" className="btn-primary" style={{ marginTop: '2rem', display: 'inline-flex' }}
                            onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                            <span>📩</span>
                            <span>Let's Work Together</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
