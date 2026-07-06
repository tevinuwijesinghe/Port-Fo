import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '../css/app.css';

// import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Music from './components/Music';
import Skills from './components/Skills';
import Stats from './components/Stats';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        setTheme(t => {
            const next = t === 'dark' ? 'light' : 'dark';
            document.body.classList.toggle('light-mode', next === 'light');
            return next;
        });
    };

    return (
        <>
            {/* {loading && (
                // <Preloader onDone={() => setLoading(false)} />
            )} */}

            <CustomCursor />
            <Navbar theme={theme} toggleTheme={toggleTheme} />

            <main>
                <Hero />
                <About />
                <Projects />
                <Music />
                <Skills />
                <Stats />
                <Contact />
            </main>

            <Footer />
        </>
    );
}

const root = document.getElementById('app');
if (root) {
    createRoot(root).render(
        <StrictMode>
            <App />
        </StrictMode>
    );
}
