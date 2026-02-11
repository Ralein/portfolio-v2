"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
    HiMail,
    HiPhone,
    HiLocationMarker,
} from "react-icons/hi";
import { FiGithub, FiLinkedin, FiSend, FiCheck } from "react-icons/fi";
import { FaBehance } from "react-icons/fa";

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
        icon: FaBehance,
        href: "https://www.behance.net/raleinnova",
        label: "Behance",
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
    const [isSubmitted, setIsSubmitted] = useState(false);

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

        setIsSubmitted(true);
        form.reset();
        setTimeout(() => setIsSubmitted(false), 5000);
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
                        Let's work together
                    </h2>
                </motion.div>

                <div className="contact-grid">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2 }}
                        style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '20px 0' }}
                    >
                        <h3 style={{ fontSize: "1.8rem", marginBottom: 16 }}>
                            Have a project in mind?
                        </h3>
                        <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.6, marginBottom: 40, maxWidth: 400 }}>
                            Whether you need a modern web app, a redesign, or just want to chat about tech — I'm all ears.
                        </p>

                        <div className="contact-info-list" style={{ marginTop: 0, gap: 30 }}>
                            {contactInfo.map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="contact-item"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                >
                                    <div className="contact-icon" style={{ background: 'transparent', border: 'none', padding: 0, width: 'auto', height: 'auto', fontSize: '1.4rem' }}>
                                        <item.icon />
                                    </div>
                                    <div>
                                        <div className="contact-detail-label" style={{ marginBottom: 4 }}>{item.label}</div>
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                className="contact-detail-value"
                                                style={{ color: "var(--text-primary)", fontSize: '1.05rem' }}
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <div className="contact-detail-value" style={{ fontSize: '1.05rem' }}>{item.value}</div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="social-links" style={{ marginTop: 'auto', paddingTop: 40 }}>
                            {socials.map((s, i) => (
                                <motion.a
                                    key={i}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    aria-label={s.label}
                                    whileHover={{ y: -3, scale: 1.1, backgroundColor: 'var(--gradient-primary)', color: '#fff', borderColor: 'transparent' }}
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
                        style={{ height: '100%' }}
                    >
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Your Name"
                                required
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="name@example.com"
                                required
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                placeholder="How can I help you?"
                                required
                                style={{ width: '100%', minHeight: 150 }}
                            />
                        </div>
                        <motion.button
                            type="submit"
                            className="btn-primary form-submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 10,
                                marginTop: 10
                            }}
                        >
                            {isSubmitted ? (
                                <>
                                    Message Sent! <FiCheck />
                                </>
                            ) : (
                                <>
                                    Send Message <FiSend />
                                </>
                            )}
                        </motion.button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
