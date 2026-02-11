"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HiAcademicCap } from "react-icons/hi";

import { GlowingEffect } from "./ui/glowing-effect";

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
        detail: "Specialized in motion graphics, 2D, and digital media",
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
                        <span className="gradient-text">Education</span>
                    </h2>
                </motion.div>

                <div className="education-grid">
                    {education.map((edu, i) => (
                        <div key={i} className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
                            <GlowingEffect
                                spread={40}
                                glow={true}
                                disabled={false}
                                proximity={64}
                                inactiveZone={0.01}
                                borderWidth={3}
                            />
                            <motion.div
                                className="edu-card glass-card relative h-full rounded-xl"
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
                                        style={{ color: "var(--accent-red)", fontSize: "1.2rem" }}
                                    />
                                    <span className="edu-year">{edu.year}</span>
                                </div>
                                <h3 className="edu-institution">{edu.institution}</h3>
                                <p className="edu-degree">{edu.degree}</p>
                                <p className="edu-detail">{edu.detail}</p>
                            </motion.div>
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
}
