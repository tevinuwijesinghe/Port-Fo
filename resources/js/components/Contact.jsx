import { useEffect, useRef, useState } from 'react';

export default function Contact() {
    const ref = useRef(null);
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [sent, setSent] = useState(false);
    const [sending, setSending] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.1 }
        );
        ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setSending(true);
        // Simulate send
        setTimeout(() => {
            setSending(false);
            setSent(true);
            setForm({ name: '', email: '', message: '' });
            setTimeout(() => setSent(false), 4000);
        }, 1500);
    };

    return (
        <section id="contact" className="section" ref={ref} style={{ background: 'rgba(15,23,42,0.3)' }}>
            <div className="section-inner">
                <p className="section-label reveal">Get In Touch</p>
                <h2 className="section-title reveal reveal-delay-1">
                    Let's <span className="gradient-text">Collaborate</span>
                </h2>

                <div className="contact-grid" style={{ marginTop: '3.5rem' }}>
                    {/* Left - Info */}
                    <div className="contact-info reveal reveal-delay-1">
                        <h3>Have a project in mind?</h3>
                        <p>
                            Whether you need a scalable web app, a mobile solution, or want to collaborate
                            on a music project — I'm open to exciting opportunities. Let's create something
                            extraordinary together.
                        </p>

                        <a href="mailto:Tevinu@example.com" className="contact-detail">
                            <span className="contact-detail-icon">📧</span>
                            Tevinu@example.com
                        </a>
                        <a href="tel:+254700000000" className="contact-detail">
                            <span className="contact-detail-icon">📞</span>
                            +254 700 000 000
                        </a>
                        <span className="contact-detail">
                            <span className="contact-detail-icon">📍</span>
                            Nairobi, Kenya
                        </span>

                        <a href="/cv.pdf" download className="cv-btn">
                            ⬇️ Download CV / Resume
                        </a>

                        <div className="social-links" style={{ marginTop: '2rem' }}>
                            {[
                                { icon: '💻', href: 'https://github.com', label: 'GitHub' },
                                { icon: '🔗', href: 'https://linkedin.com', label: 'LinkedIn' },
                                { icon: '📸', href: 'https://instagram.com', label: 'Instagram' },
                                { icon: '🐦', href: 'https://twitter.com', label: 'Twitter' },
                                { icon: '☁️', href: '#', label: 'SoundCloud' },
                            ].map(s => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    className="social-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={s.label}
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>

                        {/* Availability badge */}
                        <div style={{
                            marginTop: '2rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            borderRadius: '999px',
                            border: '1px solid rgba(16,185,129,0.3)',
                            background: 'rgba(16,185,129,0.05)',
                            fontSize: '0.78rem',
                            color: '#10b981',
                        }}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981', display: 'block', animation: 'pulse-dot 2s infinite' }} />
                            Available for freelance &amp; full-time
                        </div>
                    </div>

                    {/* Right - Form */}
                    <div className="glass-card" style={{ padding: '2.5rem' }}>
                        {sent ? (
                            <div style={{
                                textAlign: 'center',
                                padding: '3rem 1rem',
                            }}>
                                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                                <h3 style={{ fontFamily: 'Orbitron, monospace', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Message Sent!</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Thanks for reaching out. I'll get back to you soon.</p>
                            </div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div style={{
                                    fontFamily: 'Orbitron, monospace',
                                    fontSize: '0.7rem',
                                    letterSpacing: '0.2em',
                                    color: 'var(--neon-purple)',
                                    marginBottom: '0.5rem',
                                }}>
                                    SEND A MESSAGE
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="contact-name">YOUR NAME</label>
                                    <input
                                        id="contact-name"
                                        name="name"
                                        type="text"
                                        className="form-input"
                                        placeholder="John Doe"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="contact-email">EMAIL ADDRESS</label>
                                    <input
                                        id="contact-email"
                                        name="email"
                                        type="email"
                                        className="form-input"
                                        placeholder="john@example.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="contact-message">YOUR MESSAGE</label>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        className="form-textarea"
                                        placeholder="Tell me about your project or idea..."
                                        value={form.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button type="submit" className="form-submit" disabled={sending}>
                                    {sending ? '⏳ SENDING...' : '🚀 SEND MESSAGE'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
