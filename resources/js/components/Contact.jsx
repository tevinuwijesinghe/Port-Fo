import { useEffect, useRef, useState } from 'react';

const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

function SocialIcon({ platform }) {
    switch (platform) {
        case 'github':
            return (
                <svg viewBox="0 0 24 24" aria-hidden="true" className="social-icon-svg">
                    <path
                        fill="currentColor"
                        d="M12 1.5C5.9 1.5 1 6.4 1 12.5c0 4.8 3.1 8.9 7.4 10.3.5.1.7-.2.7-.5v-1.8c-3 0-3.7-1.3-3.7-1.3-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.8-1.5-2.4-.3-4.9-1.2-4.9-5.3 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 2.9 1.1a10 10 0 0 1 5.2 0c2-1.4 2.9-1.1 2.9-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.8 1.1 3 0 4.1-2.5 5-4.9 5.3.4.3.7 1 .7 2v2.9c0 .3.2.6.7.5A11.5 11.5 0 0 0 23 12.5C23 6.4 18.1 1.5 12 1.5Z"
                    />
                </svg>
            );
        case 'linkedin':
            return (
                <svg viewBox="0 0 24 24" aria-hidden="true" className="social-icon-svg">
                    <path
                        fill="currentColor"
                        d="M6.94 3.75a1.56 1.56 0 1 1 0 3.12 1.56 1.56 0 0 1 0-3.12Zm-1.44 2.3h2.88v8.25H5.5V6.05Zm4.7 0h2.76v1.12h.04c.38-.72 1.32-1.48 2.72-1.48 2.91 0 3.45 1.91 3.45 4.4v5.21h-2.88v-4.9c0-1.17-.03-2.68-1.64-2.68-1.64 0-1.89 1.28-1.89 2.6v5h-2.88V6.05Z"
                    />
                </svg>
            );
        case 'instagram':
            return (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                        fill="currentColor"
                        d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm4.5 3a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm5.25-2.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
                    />
                </svg>
            );
        case 'facebook':
            return (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                        fill="currentColor"
                        d="M13.5 22v-8.5h2.85l.43-3.3H13.5V4.8c0-.95.26-1.6 1.64-1.6h1.75V.15A23.73 23.73 0 0 0 14.25 0c-2.52 0-4.25 1.54-4.25 4.37v2.44H7.15v3.3h2.85V22h3.5Z"
                    />
                </svg>
            );
        default:
            return null;
    }
}

export default function Contact() {
    const ref = useRef(null);
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [sent, setSent] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.1 }
        );
        ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
    e.preventDefault();

    setSending(true);
    setSent(false);
    setError('');

    try {
        const apiBase = (
            import.meta.env.VITE_API_URL || ''
        ).replace(/\/$/, '');

        const response = await fetch(`${apiBase}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(form),
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            const validationError = data.errors
                ? Object.values(data.errors).flat()[0]
                : null;

            throw new Error(
                validationError ||
                data.message ||
                'Unable to send the message.'
            );
        }

        setSent(true);
        setForm({
            name: '',
            email: '',
            message: '',
        });

        setTimeout(() => {
            setSent(false);
        }, 4000);
    } catch (submitError) {
        setError(
            submitError instanceof Error
                ? submitError.message
                : 'Unable to send the message.'
        );
    } finally {
        setSending(false);
    }
};

    // return (
    //     <section id="contact" className="section" ref={ref} style={{ background: 'rgba(15,23,42,0.3)' }}>
    //         <div className="section-inner">
    //             <p className="section-label reveal">Get In Touch</p>
    //             <h2 className="section-title reveal reveal-delay-1">
    //                 Let's <span className="gradient-text">Collaborate</span>
    //             </h2>

    //             <div className="contact-grid" style={{ marginTop: '3.5rem' }}>
    //                 {/* Left - Info */}
    //                 <div className="contact-info reveal reveal-delay-1">
    //                     <h3>Have a project in mind?</h3>
    //                     <p>
    //                         Whether you need a scalable web app, a mobile solution, or want to collaborate
    //                         on a music project — I'm open to exciting opportunities. Let's create something
    //                         extraordinary together.
    //                     </p>

    //                     <a href="mailto:tevinuwijesinghe@gmail.com" className="contact-detail">
    //                         <span className="contact-detail-icon">📧</span>
    //                         tevinuwijesinghe@gmail.com
    //                     </a>
    //                     <a href="tel:+94740927966" className="contact-detail">
    //                         <span className="contact-detail-icon">📞</span>
    //                         +94 740 927 966
    //                     </a>
    //                     <span className="contact-detail">
    //                         <span className="contact-detail-icon">📍</span>
    //                         No.22, Ambagaha Junction, Rajagiriya, Colombo, Sri Lanka
    //                     </span>

    //                     <a href="/cv.pdf" download className="cv-btn">
    //                         ⬇️ Download CV / Resume
    //                     </a>

    //                     <div className="social-links" style={{ marginTop: '2rem' }}>
    //                         {[
    //                             { platform: 'github', href: 'https://github.com/tevinuwijesinghe', label: 'GitHub' },
    //                             { platform: 'linkedin', href: 'https://www.linkedin.com/in/tevinu-wijesinghe-04786a311', label: 'LinkedIn' },
    //                             { platform: 'instagram', href: 'https://www.instagram.com/tevinu_manuditha/?hl=en', label: 'Instagram' },
    //                             { platform: 'facebook', href: 'https://web.facebook.com/profile.php?id=100083221419517', label: 'Facebook' },
    //                         ].map((social) => (
    //                             <a
    //                                 key={social.label}
    //                                 href={social.href}
    //                                 className="social-link"
    //                                 target="_blank"
    //                                 rel="noopener noreferrer"
    //                                 title={social.label}
    //                                 aria-label={social.label}
    //                             >
    //                                 <SocialIcon platform={social.platform} />
    //                             </a>
    //                         ))}
    //                     </div>

    //                     {/* Availability badge */}
    //                     <div style={{
    //                         marginTop: '2rem',
    //                         display: 'inline-flex',
    //                         alignItems: 'center',
    //                         gap: '0.5rem',
    //                         padding: '0.5rem 1rem',
    //                         borderRadius: '999px',
    //                         border: '1px solid rgba(16,185,129,0.3)',
    //                         background: 'rgba(16,185,129,0.05)',
    //                         fontSize: '0.78rem',
    //                         color: '#10b981',
    //                     }}>
    //                         <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981', display: 'block', animation: 'pulse-dot 2s infinite' }} />
    //                         Available for freelance &amp; full-time
    //                     </div>
    //                 </div>

    //                 {/* Right - Form */}
    //                 {/* <div className="glass-card" style={{ padding: '2.5rem' }}>
    //                     {sent ? (
    //                         <div style={{
    //                             textAlign: 'center',
    //                             padding: '3rem 1rem',
    //                         }}>
    //                             <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
    //                             <h3 style={{ fontFamily: 'Orbitron, monospace', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Message Sent!</h3>
    //                             <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Thanks for reaching out. I'll get back to you soon.</p>
    //                         </div>
    //                     ) : (
    //                         <form className="contact-form" onSubmit={handleSubmit}>
    //                             <div style={{
    //                                 fontFamily: 'Orbitron, monospace',
    //                                 fontSize: '0.7rem',
    //                                 letterSpacing: '0.2em',
    //                                 color: 'var(--neon-purple)',
    //                                 marginBottom: '0.5rem',
    //                             }}>
    //                                 SEND A MESSAGE
    //                             </div>

    //                             <div className="form-group">
    //                                 <label className="form-label" htmlFor="contact-name">YOUR NAME</label>
    //                                 <input
    //                                     id="contact-name"
    //                                     name="name"
    //                                     type="text"
    //                                     className="form-input"
    //                                     placeholder="John Doe"
    //                                     value={form.name}
    //                                     onChange={handleChange}
    //                                     required
    //                                 />
    //                             </div>

    //                             <div className="form-group">
    //                                 <label className="form-label" htmlFor="contact-email">EMAIL ADDRESS</label>
    //                                 <input
    //                                     id="contact-email"
    //                                     name="email"
    //                                     type="email"
    //                                     className="form-input"
    //                                     placeholder="john@example.com"
    //                                     value={form.email}
    //                                     onChange={handleChange}
    //                                     required
    //                                 />
    //                             </div>

    //                             <div className="form-group">
    //                                 <label className="form-label" htmlFor="contact-message">YOUR MESSAGE</label>
    //                                 <textarea
    //                                     id="contact-message"
    //                                     name="message"
    //                                     className="form-textarea"
    //                                     placeholder="Tell me about your project or idea..."
    //                                     value={form.message}
    //                                     onChange={handleChange}
    //                                     required
    //                                 />
    //                             </div>

    //                             <button type="submit" className="form-submit" disabled={sending}>
    //                                 {sending ? '⏳ SENDING...' : '🚀 SEND MESSAGE'}
    //                             </button>
    //                             {error ? <p style={{ color: '#f87171', fontSize: '0.85rem', marginTop: '0.5rem' }}>{error}</p> : null}
    //                         </form>
    //                     )}
    //                 </div> */}
    //             </div>
    //         </div>
    //     </section>
    // );

    return (
    <section
        id="contact"
        className="section"
        ref={ref}
        style={{ background: 'rgba(15,23,42,0.3)' }}
    >
        <div className="section-inner">
            <p className="section-label reveal">Get In Touch</p>

            <h2 className="section-title reveal reveal-delay-1">
                Let's <span className="gradient-text">Collaborate</span>
            </h2>

            <div
                className="contact-grid"
                style={{
                    marginTop: '3.5rem',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <div
                    className="contact-info reveal reveal-delay-1 glass-card"
                    style={{
                        width: '100%',
                        maxWidth: '750px',
                        padding: '2.5rem',
                        textAlign: 'center',
                    }}
                >
                    <h3>Have a project in mind?</h3>

                    <p
                        style={{
                            maxWidth: '620px',
                            margin: '1rem auto 2rem',
                        }}
                    >
                        Whether you need a scalable web application, a mobile
                        solution, or want to collaborate on a music project,
                        I'm open to exciting opportunities. Let's create
                        something extraordinary together.
                    </p>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'left',
                            marginLeft: '20%',
                            marginRight: 'auto',
                            gap: '0.75rem',
                        }}
                    >
                        <a
                            href="mailto:tevinuwijesinghe@gmail.com"
                            className="contact-detail"
                        >
                            <span className="contact-detail-icon">📧</span>
                            tevinuwijesinghe@gmail.com
                        </a>

                        <a
                            href="tel:+94740927966"
                            className="contact-detail"
                        >
                            <span className="contact-detail-icon">📞</span>
                            +94 740 927 966
                        </a>

                        <span className="contact-detail">
                            <span className="contact-detail-icon">📍</span>
                            No. 22, Ambagaha Junction, Rajagiriya, Colombo,
                            Sri Lanka
                        </span>
                    </div>

                    <a
                        href="/cv.pdf"
                        download
                        className="cv-btn"
                        style={{
                            display: 'inline-flex',
                            marginTop: '2rem',
                        }}
                    >
                        ⬇️ Download CV / Resume
                    </a>

                    <div
                        className="social-links"
                        style={{
                            marginTop: '2rem',
                            justifyContent: 'center',
                        }}
                    >
                        {[
                            {
                                platform: 'github',
                                href: 'https://github.com/tevinuwijesinghe',
                                label: 'GitHub',
                            },
                            {
                                platform: 'linkedin',
                                href: 'https://www.linkedin.com/in/tevinu-wijesinghe-04786a311',
                                label: 'LinkedIn',
                            },
                            {
                                platform: 'instagram',
                                href: 'https://www.instagram.com/tevinu_manuditha/?hl=en',
                                label: 'Instagram',
                            },
                            {
                                platform: 'facebook',
                                href: 'https://web.facebook.com/profile.php?id=100083221419517',
                                label: 'Facebook',
                            },
                        ].map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                className="social-link"
                                target="_blank"
                                rel="noopener noreferrer"
                                title={social.label}
                                aria-label={social.label}
                            >
                                <SocialIcon platform={social.platform} />
                            </a>
                        ))}
                    </div>

                    <div
                        style={{
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
                        }}
                    >
                        <span
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                background: '#10b981',
                                boxShadow: '0 0 8px #10b981',
                                display: 'block',
                                animation: 'pulse-dot 2s infinite',
                            }}
                        />

                        Available for freelance &amp; full-time
                    </div>
                </div>

                {/*
                    Contact email form has been temporarily disabled.
                    Add the form component here when the backend email
                    service is ready.
                */}
            </div>
        </div>
    </section>
);
}
