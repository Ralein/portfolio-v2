"use client";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const footerLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
];

const socialLinks = [
    { icon: FiGithub, href: "https://github.com/Ralein", label: "GitHub" },
    {
        icon: FiLinkedin,
        href: "https://www.linkedin.com/in/ralein",
        label: "LinkedIn",
    },
    { icon: FiMail, href: "mailto:raleinnova@gmail.com", label: "Email" },
];

export default function Footer() {
    const handleClick = (href: string) => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-inner">
                    <p className="footer-copy">
                        © {new Date().getFullYear()}{" "}
                        <span className="gradient-text" style={{ fontWeight: 600 }}>
                            Ralein Nova
                        </span>
                        . All rights reserved.
                    </p>

                    <ul className="footer-nav">
                        {footerLinks.map((link) => (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleClick(link.href);
                                    }}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div style={{ display: "flex", gap: 12 }}>
                        {socialLinks.map((s, i) => (
                            <motion.a
                                key={i}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-link"
                                aria-label={s.label}
                                whileHover={{ y: -2 }}
                                style={{ width: 36, height: 36, fontSize: "1rem" }}
                            >
                                <s.icon />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
