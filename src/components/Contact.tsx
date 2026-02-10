"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Lottie from "lottie-react";
import {
    HiMail,
    HiPhone,
    HiLocationMarker,
} from "react-icons/hi";
import { FiGithub, FiLinkedin, FiSend } from "react-icons/fi";

const LOTTIE_CONTACT =
    "https://lottie.host/f0b9c0e8-0e5e-4e0b-8e5a-8e5a8e5a8e5a/contact.json";

const contactInfo = [
    {
        icon: HiMail,
        label: "Email",
        value: "raleinnova@gmail.com",
        href: "mailto:raleinnova@gmail.com",
    },
    {
        icon: HiPhone,
        label: "Phone",
        value: "+91 8903541901",
        href: "tel:+918903541901",
    },
    {
        icon: HiLocationMarker,
        label: "Location",
        value: "Coimbatore, India",
        href: "",
    },
];

const socials = [
    {
        icon: FiGithub,
        href: "https://github.com/Ralein",
        label: "GitHub",
    },
    {
        icon: FiLinkedin,
        href: "https://www.linkedin.com/in/ralein",
        label: "LinkedIn",
    },
    {
        icon: HiMail,
        href: "mailto:raleinnova@gmail.com",
        label: "Email",
    },
];

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const name = (form.elements.namedItem("name") as HTMLInputElement).value;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const message = (form.elements.namedItem("message") as HTMLTextAreaElement)
            .value;

        const subject = `Portfolio Contact from ${name}`;
        const body = `Name: ${name}%0AEmail: ${email}%0A%0A${message}`;
        window.open(
            `mailto:raleinnova@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`,
            "_blank"
        );
    };

    return (
        <section className="section" id="contact" ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    style={{ textAlign: "center", marginBottom: 60 }}
                >
                    <span className="section-label" style={{ justifyContent: "center" }}>
                        Get In Touch
                    </span>
                    <h2 className="section-title">
                        Ready to{" "}
                        <span className="gradient-text">work together</span>?
                    </h2>
                    <p className="section-subtitle" style={{ margin: "0 auto" }}>
                        I&apos;m always open to new opportunities and collaborations.
                        Let&apos;s build something amazing!
                    </p>
                </motion.div>

                <div className="contact-grid">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 style={{ fontSize: "1.3rem", marginBottom: 8 }}>
                            Let&apos;s connect
                        </h3>
                        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                            Whether it&apos;s a project, internship, or just a chat — I&apos;d
                            love to hear from you.
                        </p>

                        <div className="contact-info-list">
                            {contactInfo.map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="contact-item"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                >
                                    <div className="contact-icon">
                                        <item.icon />
                                    </div>
                                    <div>
                                        <div className="contact-detail-label">{item.label}</div>
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                className="contact-detail-value"
                                                style={{ color: "var(--text-primary)" }}
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <div className="contact-detail-value">{item.value}</div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="social-links">
                            {socials.map((s, i) => (
                                <motion.a
                                    key={i}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    aria-label={s.label}
                                    whileHover={{ y: -3, scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <s.icon />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.form
                        className="contact-form glass-card"
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3 }}
                        onSubmit={handleSubmit}
                    >
                        <div className="form-group">
                            <label htmlFor="name">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="john@example.com"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Your Message</label>
                            <textarea
                                id="message"
                                name="message"
                                placeholder="Tell me about your project or idea..."
                                required
                            />
                        </div>
                        <motion.button
                            type="submit"
                            className="btn-primary form-submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Send Message
                            <FiSend />
                        </motion.button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
