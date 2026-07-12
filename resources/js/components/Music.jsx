import { useEffect, useRef } from 'react';

const TRACKS = [
    {
        title: 'Neon',
        artist: 'Tevinu Wijesinghe',
        genre: 'Electronic / Afrobeats',
        year: '2024',
        emoji: '🎶',
        color: '#a855f7',
        // SoundCloud embed or YouTube - using YouTube here
        youtubeId: 'jfKfPfyJRdk', // placeholder lofi
        featured: false,
    },
    {
        title: 'Digital Soul',
        artist: 'Tevinu Wijesinghe',
        genre: 'R&B / Lo-fi',
        year: '2024',
        emoji: '🎵',
        color: '#3b82f6',
        youtubeId: 'DWcJFNfaw9c',
        featured: false,
    },
    {
        title: 'Code & Rhythm',
        artist: 'Tevinu Wijesinghe',
        genre: 'Afrobeats / Trap',
        year: '2023',
        emoji: '🥁',
        color: '#ec4899',
        youtubeId: 'lTRiuFIWV54',
        featured: false,
    },
];

const RECORDINGS = [
    {
        title: 'Studio Session #1',
        artist: 'Tevinu Wijesinghe',
        genre: 'Raw Audio',
        year: '2025',
        emoji: '🎙️',
        color: '#f59e0b',
        audioSrc: '/recordings/perawadanak_nathi.mp3', // <-- Replace with your actual audio path
        featured: false,
    },
    {
        title: 'Studio Session #1',
        artist: 'Tevinu Wijesinghe',
        genre: 'Raw Audio',
        year: '2025',
        emoji: '🎙️',
        color: '#f59e0b',
        audioSrc: '/recordings/lu_010408.mp3', // <-- Replace with your actual audio path
        featured: false,
    },
];

const TIKTOK_VIDEOS = [
    {
        title: 'Nawum Kale',
        artist: 'Charitha Attalage | Chamara Nirmal | Chandrasena Thalangama',
        genre: '',
        year: '2025',
        emoji: '🌙',
        color: '#000000',
        tiktokId: '7633064254299573511',
        featured: false,
    },
    {
        title: 'By Me',
        artist: 'Tevinu Wijesinghe',
        genre: 'Music Production',
        year: '2025',
        emoji: '🎧',
        color: '#25f4ee',
        tiktokId:'7602172014605978888',
        featured: false,
    },
];

const FEATURED = {
    title: 'Nawum Kale',
    artist: 'Charitha Attalage | Chamara Nirmal | Chandrasena Thalangama',
    genre: '',
    desc: 'A fusion of soulful melodies and electronic production — inspired by late night coding sessions and the rhythm of data flowing through circuits.',
    tiktokId: '7633064254299573511',
    emoji: '🌙',
};

export default function Music() {
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.1 }
        );
        ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    // Reload TikTok embeds when component mounts
    useEffect(() => {
        if (window.tiktok && window.tiktok.embed) {
            window.tiktok.embed.process();
        }
    }, []);

    return (
        <section id="music" className="section" ref={ref}>
            <div className="section-inner">
                <p className="section-label reveal">Sound</p>
                <h2 className="section-title reveal reveal-delay-1">
                    The <span className="gradient-text">Music</span>
                </h2>
                <p style={{ color: 'var(--text-muted)', maxWidth: 520, fontSize: '0.95rem', lineHeight: 1.8, marginTop: '0.75rem', marginBottom: '3rem' }}
                    className="reveal reveal-delay-2">
                    Where technology meets emotion. Beats crafted with precision, feeling every frequency.
                </p>

                {/* Featured Track */}
                <div className="glass-card music-featured reveal reveal-delay-2">
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        fontSize: '0.65rem', fontFamily: 'Orbitron, monospace', letterSpacing: '0.2em',
                        color: '#ec4899', background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.3)',
                        padding: '0.3rem 0.8rem', borderRadius: '999px', marginBottom: '1.5rem',
                    }}>
                        ✨ FEATURED TRACK
                    </div>

                    <div className="featured-track-info">
                        <div>
                            <div style={{
                                fontSize: '4rem', lineHeight: 1, marginBottom: '1rem',
                                filter: 'drop-shadow(0 0 20px rgba(168,85,247,0.5))',
                            }}>
                                {FEATURED.emoji}
                            </div>
                            <h3 style={{
                                fontFamily: 'Orbitron, monospace', fontSize: '1.4rem', fontWeight: 900,
                                background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                                backgroundClip: 'text', WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent', marginBottom: '0.5rem',
                            }}>
                                {FEATURED.title}
                            </h3>
                            <p style={{ color: 'var(--neon-purple)', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                                {FEATURED.artist}
                            </p>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', fontFamily: 'Orbitron, monospace', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                                {FEATURED.genre}
                            </p>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.8 }}>
                                {FEATURED.desc}
                            </p>
                        </div>

                        <div className="featured-embed">
                            {FEATURED.youtubeId ? (
                                <iframe
                                    width="100%"
                                    height="315"
                                    src={`https://www.youtube.com/embed/${FEATURED.youtubeId}?rel=0&modestbranding=1`}
                                    title={FEATURED.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    loading="lazy"
                                />
                            ) : (
                                <iframe
                                    src={`https://www.tiktok.com/player/v1/${FEATURED.tiktokId}?&music_info=1&description=1&rel=0`}
                                    width="100%"
                                    height="550"
                                    allow="fullscreen"
                                    title={FEATURED.title}
                                    style={{ border: 'none', borderRadius: '12px' }}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Track Grid */}
                <div className="music-grid">
                    {[...TRACKS, ...TIKTOK_VIDEOS].map((item, i) => (
                        <div key={item.title} className={`glass-card track-card reveal reveal-delay-${i + 1}`}>
                            {/* Cover art placeholder */}
                            <div style={{
                                width: '100%',
                                aspectRatio: '1',
                                borderRadius: '12px',
                                background: `linear-gradient(135deg, ${item.color}25, rgba(59,130,246,0.15))`,
                                border: `1px solid ${item.color}30`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '3rem',
                                position: 'relative',
                                overflow: 'hidden',
                            }}>
                                {item.emoji}
                                {/* Waveform decoration */}
                                <div style={{
                                    position: 'absolute',
                                    bottom: '0.75rem',
                                    left: '1rem',
                                    right: '1rem',
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    gap: '2px',
                                    height: '30px',
                                }}>
                                    {Array.from({ length: 30 }, (_, j) => (
                                        <div key={j} style={{
                                            flex: 1,
                                            height: `${Math.random() * 100}%`,
                                            minHeight: '3px',
                                            background: item.color,
                                            opacity: 0.5,
                                            borderRadius: '1px',
                                        }} />
                                    ))}
                                </div>
                            </div>

                            <div className="track-info">
                                <h3 style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                                <p style={{ color: 'var(--text-muted)' }}>{item.genre} · {item.year}</p>
                            </div>

                            <div className="track-player">
                                {item.youtubeId ? (
                                    <iframe
                                        width="100%"
                                        height="120"
                                        src={`https://www.youtube.com/embed/${item.youtubeId}?rel=0&modestbranding=1`}
                                        title={item.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        loading="lazy"
                                    />
                                ) : item.tiktokId ? (
                                    <iframe
                                        src={`https://www.tiktok.com/player/v1/${item.tiktokId}?&music_info=1&description=1&rel=0`}
                                        width="100%"
                                        height="400"
                                        allow="fullscreen"
                                        title={item.title}
                                        style={{ border: 'none', borderRadius: '12px' }}
                                    />
                                ) : item.audioSrc ? (
                                    <div style={{ display: 'flex', alignItems: 'center', height: '100%', minHeight: '60px', padding: '0 0.5rem' }}>
                                        <audio
                                            controls
                                            controlsList="nodownload noplaybackrate"
                                            onContextMenu={(e) => e.preventDefault()}
                                            src={item.audioSrc}
                                            style={{ width: '100%', outline: 'none' }}
                                        >
                                            Your browser does not support the audio element.
                                        </audio>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Draft Recordings */}
                <div style={{ marginTop: '4rem' }}>
                    <h3 className="reveal" style={{
                        fontFamily: 'Orbitron, monospace', fontSize: '1.5rem', fontWeight: 700,
                        color: 'var(--text-primary)', marginBottom: '1.5rem',
                        display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}>
                        <span style={{ color: '#f59e0b' }}>🎙️</span> Draft Recordings
                    </h3>
                    <div className="music-grid">
                        {RECORDINGS.map((item, i) => (
                            <div key={item.title} className={`glass-card track-card reveal reveal-delay-${i + 1}`}>
                                {/* Cover art placeholder */}
                                <div style={{
                                    width: '100%',
                                    aspectRatio: '1',
                                    borderRadius: '12px',
                                    background: `linear-gradient(135deg, ${item.color}25, rgba(59,130,246,0.15))`,
                                    border: `1px solid ${item.color}30`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '3rem',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}>
                                    {item.emoji}
                                    {/* Waveform decoration */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '0.75rem',
                                        left: '1rem',
                                        right: '1rem',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        gap: '2px',
                                        height: '30px',
                                    }}>
                                        {Array.from({ length: 30 }, (_, j) => (
                                            <div key={j} style={{
                                                flex: 1,
                                                height: `${Math.random() * 100}%`,
                                                minHeight: '3px',
                                                background: item.color,
                                                opacity: 0.5,
                                                borderRadius: '1px',
                                            }} />
                                        ))}
                                    </div>
                                </div>

                                <div className="track-info">
                                    <h3 style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
                                    <p style={{ color: 'var(--text-muted)' }}>{item.genre} · {item.year}</p>
                                </div>

                                <div className="track-player">
                                    <div style={{ display: 'flex', alignItems: 'center', height: '100%', minHeight: '60px', padding: '0 0.5rem' }}>
                                        <audio
                                            controls
                                            controlsList="nodownload noplaybackrate"
                                            onContextMenu={(e) => e.preventDefault()}
                                            src={item.audioSrc}
                                            style={{ width: '100%', outline: 'none' }}
                                        >
                                            Your browser does not support the audio element.
                                        </audio>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Soundcloud / Spotify links */}
                <div style={{ textAlign: 'center', marginTop: '4rem' }} className="reveal">
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                        Find my music on your favorite platforms
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        {[
                            { label: '🎵 Spotify', href: '#', color: '#1db954' },
                            { label: '☁️ SoundCloud', href: '#', color: '#ff5500' },
                            { label: '▶️ YouTube', href: '#', color: '#ff0000' },
                            { label: '🎛️ Apple Music', href: '#', color: '#fc3c44' },
                        ].map(p => (
                            <a key={p.label} href={p.href} style={{
                                padding: '0.5rem 1.25rem',
                                borderRadius: '999px',
                                border: `1px solid ${p.color}40`,
                                color: p.color,
                                fontSize: '0.82rem',
                                textDecoration: 'none',
                                background: `${p.color}08`,
                                transition: 'all 0.3s ease',
                                fontWeight: 600,
                            }}
                                onMouseEnter={e => { e.target.style.background = `${p.color}18`; e.target.style.boxShadow = `0 0 15px ${p.color}30`; }}
                                onMouseLeave={e => { e.target.style.background = `${p.color}08`; e.target.style.boxShadow = 'none'; }}
                            >
                                {p.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
