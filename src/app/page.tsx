import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
export default async function Home() {
    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <About />
                <Projects />
                <Experience />
                <Education />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
