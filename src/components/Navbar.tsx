"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = navLinks.map((l) => l.href.replace("#", ""));
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && el.getBoundingClientRect().top <= 200) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = (href: string) => {
        setMobileOpen(false);
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <motion.nav
                className={`navbar ${scrolled ? "scrolled" : ""}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                <div className="navbar-inner">
                    <motion.div
                        className="navbar-logo"
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleClick("#home")}
                    >
                        {"<Ralein />"}
                    </motion.div>

                    <ul className="navbar-links">
                        {navLinks.map((link) => (
                            <li key={link.href}>
                                <a
                                    className={activeSection === link.href.replace("#", "") ? "active" : ""}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleClick(link.href);
                                    }}
                                    href={link.href}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>


                    <button
                        className={`hamburger ${mobileOpen ? "open" : ""}`}
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
            </motion.nav>

            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            className="mobile-overlay open"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                        />
                        <motion.div
                            className="mobile-menu open"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        >
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 + 0.1 }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleClick(link.href);
                                    }}
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
