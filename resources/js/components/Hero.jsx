import { useEffect, useRef } from 'react';

export default function Hero() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Particle network
        const particleCount = window.innerWidth < 768 ? 50 : 100;
        const particles = Array.from({ length: particleCount }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            r: Math.random() * 1.5 + 0.5,
            color: ['#a855f7', '#3b82f6', '#ec4899', '#06b6d4'][Math.floor(Math.random() * 4)],
        }));

        let mouse = { x: -9999, y: -9999 };
        const onMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };
        canvas.addEventListener('mousemove', onMouseMove);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw gradient background glow
            const gradient = ctx.createRadialGradient(
                canvas.width * 0.3, canvas.height * 0.4, 0,
                canvas.width * 0.3, canvas.height * 0.4, canvas.width * 0.6
            );
            gradient.addColorStop(0, 'rgba(168, 85, 247, 0.06)');
            gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.04)');
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                // Mouse repulsion
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    p.x += dx / dist * 2;
                    p.y += dy / dist * 2;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.shadowBlur = 6;
                ctx.shadowColor = p.color;
                ctx.fill();
                ctx.shadowBlur = 0;
            });

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < 120) {
                        const alpha = (1 - d / 120) * 0.35;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }

            animId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" className="hero section">
            <canvas ref={canvasRef} className="hero-canvas" style={{ width: '100%', height: '100%' }} />

            {/* Right-side decorative glow */}
            <div style={{
                position: 'absolute', top: '10%', right: '-5%', width: '500px', height: '500px',
                borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute', bottom: '5%', left: '-5%', width: '400px', height: '400px',
                borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div className="section-inner" style={{ paddingTop: '100px' }}>
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="dot" />
                        Available for Collaboration
                    </div>

                    <h1 className="hero-name">
                        <span className="gradient-text">Tevinu</span>
                        <br />
                        <span style={{ color: 'var(--text-primary)' }}>Wijesinghe</span>
                    </h1>

                    <p className="hero-tagline">
                        <span className="gradient-text">Software Engineer</span>
                        <span style={{ color: 'var(--text-muted)', margin: '0 0.75rem' }}>&amp;</span>
                        <span style={{ color: 'var(--neon-cyan)' }}>Music Producer</span>
                    </p>

                    <p className="hero-desc">
                        Passionate about building scalable digital products and creating music that
                        blends technology and creativity. I craft elegant code by day and
                        soulful beats by night.
                    </p>

                    <div className="hero-buttons">
                        <a href="#projects" className="btn-primary" onClick={e => { e.preventDefault(); scrollTo('projects'); }}>
                            <span>⚡</span>
                            <span>View Projects</span>
                        </a>
                        <a href="#music" className="btn-outline" onClick={e => { e.preventDefault(); scrollTo('music'); }}>
                            <span>🎵</span>
                            <span>Listen to Music</span>
                        </a>
                    </div>

                    {/* Tech stack pills */}
                    <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', marginTop: '2.5rem', opacity: 0.7 }}>
                        {['Java','React', 'Laravel','Jakarta EE', 'Firebase', 'Android', 'FL Studio', 'Cubase'].map(t => (
                            <span key={t} style={{
                                padding: '0.25rem 0.65rem',
                                borderRadius: '999px',
                                fontSize: '0.68rem',
                                fontFamily: 'Orbitron, monospace',
                                letterSpacing: '0.06em',
                                border: '1px solid rgba(168,85,247,0.25)',
                                color: 'var(--text-muted)',
                            }}>{t}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="hero-scroll">
                <span>SCROLL</span>
                <div className="scroll-line" />
            </div>
        </section>
    );
}
