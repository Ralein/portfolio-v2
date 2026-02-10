"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { GlowingEffectDemo } from "@/components/demos/GlowingEffectDemo";

export default function Home() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <About />
                <Projects />
                <Experience />
                <Education />
                <section className="section">
                    <div className="container">
                        <GlowingEffectDemo />
                    </div>
                </section>
                <Contact />
            </main>
            <Footer />
        </>
    );
}
