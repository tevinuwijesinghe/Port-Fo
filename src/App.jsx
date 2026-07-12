import { useState } from 'react';
import '../resources/css/app.css';

import CustomCursor from '../resources/js/components/CustomCursor';
import Navbar from '../resources/js/components/Navbar';
import Hero from '../resources/js/components/Hero';
import About from '../resources/js/components/About';
import Projects from '../resources/js/components/Projects';
import Music from '../resources/js/components/Music';
import Skills from '../resources/js/components/Skills';
import Stats from '../resources/js/components/Stats';
import Contact from '../resources/js/components/Contact';
import Footer from '../resources/js/components/Footer';

export default function App() {
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        setTheme((currentTheme) => {
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.body.classList.toggle('light-mode', nextTheme === 'light');
            return nextTheme;
        });
    };

    return (
        <>
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
