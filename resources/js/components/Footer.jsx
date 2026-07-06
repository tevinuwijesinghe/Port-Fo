import { Fragment } from 'react';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            {/* Decorative top line */}
            <div style={{
                width: '80px',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #a855f7, transparent)',
                margin: '0 auto 1.5rem',
            }} />

            <p style={{ fontFamily: 'Orbitron, monospace', fontSize: '1rem', marginBottom: '0.5rem' }}>
                <span>DEV</span>
                <span style={{ color: 'var(--text-muted)', margin: '0 0.25rem' }}>&amp;</span>
                <span>BEATS</span>
            </p>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Software Engineer · Music Producer · Creative Technologist
            </p>

            <p>
                © {year} <span>Tevinu Wijesinghe</span>. Crafted with{' '}
                <span>♥</span> &amp; ☕ · Built with React + Laravel
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem', fontSize: '0.75rem' }}>
                {['About', 'Projects', 'Music', 'Skills', 'Contact'].map(link => (
                    <a
                        key={link}
                        href={`#${link.toLowerCase()}`}
                        style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.3s ease', letterSpacing: '0.05em' }}
                        onClick={e => {
                            e.preventDefault();
                            document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        onMouseEnter={e => e.target.style.color = 'var(--neon-purple)'}
                        onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                    >
                        {link}
                    </a>
                ))}
            </div>
        </footer>
    );
}
