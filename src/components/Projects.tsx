"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { HiExternalLink } from "react-icons/hi";
import { FiGithub } from "react-icons/fi";
import { GlowingEffect } from "./ui/glowing-effect";

interface Project {
    id: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
    liveUrl: string;
    githubUrl: string;
    image: string;
    featured: boolean;
}

const categories = ["All", "AI/ML", "Web App", "UI/UX"];

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filter, setFilter] = useState("All");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        fetch("/api/projects")
            .then((res) => res.json())
            .then(setProjects)
            .catch(() => { });
    }, []);

    const filtered =
        filter === "All"
            ? projects
            : projects.filter((p) => p.category === filter);

    // Generate gradient backgrounds for project cards without images
    const gradients = [
        "linear-gradient(135deg, #020617 0%, #7f1d1d 50%, #020617 100%)",
        "linear-gradient(135deg, #020617 0%, #9a3412 50%, #020617 100%)",
        "linear-gradient(135deg, #0f172a 0%, #450a0a 50%, #0f172a 100%)",
        "linear-gradient(135deg, #1c1917 0%, #7c2d12 50%, #1c1917 100%)",
        "linear-gradient(135deg, #020617 0%, #b91c1c 50%, #020617 100%)",
        "linear-gradient(135deg, #0f172a 0%, #7f1d1d 50%, #450606 100%)",
        "linear-gradient(135deg, #020617 0%, #c2410c 50%, #020617 100%)",
        "linear-gradient(135deg, #0f172a 0%, #991b1b 50%, #0f172a 100%)",
    ];

    return (
        <section className="section" id="projects" ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <span className="section-label">Portfolio</span>
                    <h2 className="section-title">
                        A selection of{" "}
                        <span className="gradient-text">recent projects</span>
                    </h2>
                    <p className="section-subtitle">
                        From AI-powered tools to accessible web platforms — here&apos;s what
                        I&apos;ve been building.
                    </p>
                </motion.div>

                <motion.div
                    className="projects-filter"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2 }}
                    style={{ marginTop: 32 }}
                >
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`filter-btn ${filter === cat ? "active" : ""}`}
                            onClick={() => setFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                <motion.div className="projects-grid" layout>
                    <AnimatePresence mode="popLayout">
                        {filtered.map((project, i) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: i * 0.08 }}
                                whileHover={{ y: -6 }}
                                className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3"
                            >
                                <GlowingEffect
                                    spread={40}
                                    glow={true}
                                    disabled={false}
                                    proximity={64}
                                    inactiveZone={0.01}
                                    borderWidth={3}
                                />
                                <div className="project-card glass-card relative h-full rounded-xl overflow-hidden flex flex-col">
                                    <div
                                        className="project-image"
                                        style={{
                                            background: gradients[i % gradients.length],
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            minHeight: "200px",
                                            width: "100%",
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: "2.5rem",
                                                fontFamily: "'Space Grotesk', sans-serif",
                                                fontWeight: 700,
                                                color: "rgba(255,255,255,0.12)",
                                                letterSpacing: "-0.02em",
                                                textAlign: "center",
                                                padding: "0 24px",
                                            }}
                                        >
                                            {project.title.split("—")[0].trim()}
                                        </span>
                                    </div>

                                    <div className="project-info flex flex-col flex-grow">
                                        <span className="project-category">{project.category}</span>
                                        <h3 className="project-title">{project.title}</h3>
                                        <p className="project-desc">{project.description}</p>

                                        <div className="project-tags mt-auto">
                                            {project.tags.map((tag) => (
                                                <span key={tag} className="project-tag">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="project-links">
                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="project-link"
                                                >
                                                    <HiExternalLink /> Live Demo
                                                </a>
                                            )}
                                            {project.githubUrl && (
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="project-link"
                                                >
                                                    <FiGithub /> Source
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
