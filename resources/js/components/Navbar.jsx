import { useState, useEffect } from 'react';

const NAV_LINKS = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Music', href: '#music' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar({ theme, toggleTheme }) {
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 40);

            const sections = NAV_LINKS.map(l => l.href.slice(1));
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && window.scrollY >= el.offsetTop - 120) {
                    setActive(`#${sections[i]}`);
                    break;
                }
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleNav = (e, href) => {
        e.preventDefault();
        setMenuOpen(false);
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <a href="#hero" className="nav-logo" onClick={e => handleNav(e, '#hero')}>
                    DEV&amp;BEATS
                </a>

                <ul className="nav-links">
                    {NAV_LINKS.map(link => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className={active === link.href ? 'active' : ''}
                                onClick={e => handleNav(e, link.href)}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <button
                        id="theme-toggle-btn"
                        className="theme-toggle"
                        onClick={toggleTheme}
                        title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                    <button
                        className={`hamburger ${menuOpen ? 'open' : ''}`}
                        onClick={() => setMenuOpen(o => !o)}
                        aria-label="Menu"
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </nav>

            {/* Mobile nav overlay */}
            <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
                {NAV_LINKS.map(link => (
                    <a key={link.href} href={link.href} onClick={e => handleNav(e, link.href)}>
                        {link.label}
                    </a>
                ))}
                <a href="#contact" onClick={e => handleNav(e, '#contact')} style={{
                    padding: '0.6rem 1.5rem',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
                    color: 'white',
                    fontFamily: 'Orbitron, monospace',
                    fontSize: '0.85rem',
                }}>
                    Hire Me
                </a>
            </div>
        </>
    );
}
