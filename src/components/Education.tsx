"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HiAcademicCap } from "react-icons/hi";
import { HiBadgeCheck } from "react-icons/hi";

const education = [
    {
        year: "2021 — 2026",
        institution: "Sri Krishna College of Engineering and Technology",
        degree: "M.Tech in Computer Science and Engineering (Integrated)",
        detail: "Affiliated to Anna University · CGPA: 7.9 (until 8th semester)",
    },
    {
        year: "2023 — 2025",
        institution: "MAAC Institute",
        degree: "Advanced Program in Digital Media & Design",
        detail: "Specialized in motion graphics, 3D, and digital media",
    },
    {
        year: "2020 — 2021",
        institution: "PSG Public School",
        degree: "Higher Secondary (XII) · CBSE Board",
        detail: "Percentage: 93%",
    },
    {
        year: "2018 — 2019",
        institution: "PSG Public School",
        degree: "Secondary (X) · CBSE Board",
        detail: "Percentage: 89%",
    },
];

const certifications = [
    { name: "React", issuer: "Meta — 2024" },
    { name: "JavaScript", issuer: "Meta — 2024" },
    { name: "UI/UX Design", issuer: "Coursera — 2024" },
    { name: "Bootstrap", issuer: "Coursera — 2024" },
    { name: "SAP Fundamentals", issuer: "Coursera" },
];

export default function Education() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section className="section" id="education" ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <span className="section-label">Background</span>
                    <h2 className="section-title">
                        Education &{" "}
                        <span className="gradient-text">Certifications</span>
                    </h2>
                </motion.div>

                <div className="education-grid">
                    {education.map((edu, i) => (
                        <motion.div
                            key={i}
                            className="edu-card glass-card"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.1 + 0.2 }}
                            whileHover={{ y: -4 }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                    marginBottom: 8,
                                }}
                            >
                                <HiAcademicCap
                                    style={{ color: "var(--accent-blue)", fontSize: "1.2rem" }}
                                />
                                <span className="edu-year">{edu.year}</span>
                            </div>
                            <h3 className="edu-institution">{edu.institution}</h3>
                            <p className="edu-degree">{edu.degree}</p>
                            <p className="edu-detail">{edu.detail}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 }}
                >
                    <h3
                        style={{
                            fontSize: "1.2rem",
                            marginBottom: 4,
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                        }}
                    >
                        <HiBadgeCheck style={{ color: "var(--accent-gold)" }} />
                        Certifications
                    </h3>
                    <div className="certs-grid">
                        {certifications.map((cert, i) => (
                            <motion.div
                                key={i}
                                className="cert-card glass-card"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ delay: 0.6 + i * 0.08 }}
                                whileHover={{ scale: 1.03 }}
                            >
                                <div className="cert-icon">🏅</div>
                                <div>
                                    <div className="cert-name">{cert.name}</div>
                                    <div className="cert-issuer">{cert.issuer}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
