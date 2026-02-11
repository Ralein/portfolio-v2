"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { GlowingEffect } from "./ui/glowing-effect";

const experiences = [
    {
        role: "Full Stack Developer Intern",
        company: "Bluekode Technologies",
        date: "Jun 2025 — Present",
        points: [
            "Developed full-stack applications using the MERN stack",
            "Built RESTful APIs and integrated React.js frontends with backend systems",
            "Collaborated with the team on scalable and maintainable codebases",
        ],
    },
    {
        role: "Software Developer Intern",
        company: "Virtusa",
        date: "Aug 2025 — Present",
        points: [
            "Built full-stack features using React, Spring Boot, and SQL",
            "Developed a Charge Management System with secure CRUD operations",
            "Handled 1,000+ records, improving backend response time by 20%",
        ],
    },
    {
        role: "Full Stack Developer Intern",
        company: "Pricol Pvt. Ltd., Coimbatore",
        date: "May 2025",
        points: [
            "Built an AI-powered Ticket Similarity Analyzer using Python and Streamlit with 85% classification accuracy",
            "Designed and implemented 5+ responsive dashboards and landing pages using Next.js and Tailwind CSS",
            "Improved usability and mobile responsiveness across multiple projects",
        ],
    },
    {
        role: "Hardware Technical Intern",
        company: "Grace Laser Jet Technologies",
        date: "May 2024",
        points: [
            "Assembled and configured PCs and optimized BIOS settings",
            "Diagnosed and resolved hardware issues to improve system performance",
            "Gained hands-on experience with hardware troubleshooting",
        ],
    },
];

export default function Experience() {
    const ref = useRef(null);
    const timelineRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start center", "end center"],
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <section className="section" id="experience" ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    style={{ textAlign: "center", marginBottom: 60 }}
                >
                    <span className="section-label" style={{ justifyContent: "center" }}>
                        Career
                    </span>
                    <h2 className="section-title">
                        My <span className="gradient-text">work experience</span>
                    </h2>
                    <p
                        className="section-subtitle"
                        style={{ margin: "0 auto" }}
                    >
                        Building real-world products across different tech stacks and
                        industries.
                    </p>
                </motion.div>

                <div className="timeline" ref={timelineRef}>
                    {/* Animated Line */}
                    <motion.div
                        style={{
                            scaleY,
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            left: "50%",
                            width: "2px",
                            background: "linear-gradient(to bottom, var(--accent-red), var(--accent-orange))",
                            transformOrigin: "top",
                            translateX: "-50%",
                            zIndex: 1, // Behind the dots (2) but above background
                        }}
                    />

                    {experiences.map((exp, i) => (
                        <motion.div
                            key={i}
                            className="timeline-item"
                            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                        >
                            <div className="timeline-dot" />
                            <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
                                <GlowingEffect
                                    spread={40}
                                    glow={true}
                                    disabled={false}
                                    proximity={64}
                                    inactiveZone={0.01}
                                    borderWidth={3}
                                />
                                <div className="timeline-card glass-card relative h-full rounded-xl">
                                    <span className="timeline-date">{exp.date}</span>
                                    <h3 className="timeline-role">{exp.role}</h3>
                                    <p className="timeline-company">{exp.company}</p>
                                    <ul className="timeline-points">
                                        {exp.points.map((point, j) => (
                                            <li key={j}>{point}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
