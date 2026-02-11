"use client";
import { motion } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="footer" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'var(--bg-secondary)', padding: '30px 0' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>

                    <p className="footer-copy" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
                        © {new Date().getFullYear()} <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Ralein Nova</span>. All rights reserved.
                    </p>

                    <motion.button
                        onClick={scrollToTop}
                        whileHover={{ y: -3, backgroundColor: 'rgba(255,255,255,0.1)' }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            background: 'transparent',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'var(--text-secondary)',
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontSize: '1.1rem',
                        }}
                        aria-label="Back to Top"
                    >
                        <FiArrowUp />
                    </motion.button>
                </div>
            </div>
        </footer>
    );
}
