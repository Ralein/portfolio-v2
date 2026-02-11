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

// Hardcoded Figma project card
const figmaProject = {
    id: "figma-raleinex",
    title: "Raleinex",
    description:
        "A premium Clothing brand UI/UX design built in Figma — featuring a modern dark interface with real-time trading dashboards, portfolio analytics, and seamless user flows. Scroll through the prototype to explore each page.",
    category: "UI/UX",
    tags: ["Figma", "UI/UX", "Photoshop", "Indesign"],
    figmaEmbedUrl:
        "https://embed.figma.com/proto/JeOAEcDRbsWibJIpSiR1RX/Raleinex?node-id=11-2&p=f&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=11%3A2&show-proto-sidebar=1&embed-host=share",
    figmaUrl:
        "https://www.figma.com/design/JeOAEcDRbsWibJIpSiR1RX/Raleinex?node-id=0-1",
};

const categories = ["All", "Live", "AI/ML", "Web App", "UI/UX"];

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

    const filtered = projects.filter((p) => {
        if (filter === "All") return true;
        if (filter === "Live") return !!p.liveUrl;
        return p.category === filter;
    });

    // Check if Figma card should show based on filter
    const showFigmaCard =
        filter === "All" || filter === "UI/UX";

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
                        {/* Figma Raleinex Card */}
                        {showFigmaCard && (
                            <motion.div
                                key={figmaProject.id}
                                layout
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
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
                                    <div className="figma-iframe-wrapper">
                                        <iframe
                                            src={figmaProject.figmaEmbedUrl}
                                            title={figmaProject.title}
                                            loading="lazy"
                                            allowFullScreen
                                            className="figma-iframe"
                                        />
                                    </div>

                                    <div className="project-info flex flex-col flex-grow">
                                        <span className="project-category">{figmaProject.category}</span>
                                        <h3 className="project-title">{figmaProject.title}</h3>
                                        <p className="project-desc">{figmaProject.description}</p>

                                        <div className="project-tags mt-auto">
                                            {figmaProject.tags.map((tag) => (
                                                <span key={tag} className="project-tag">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="project-links">
                                            <a
                                                href={figmaProject.figmaUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-link"
                                            >
                                                <HiExternalLink /> View in Figma
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Database Project Cards */}
                        {filtered.map((project, i) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: (i + 1) * 0.08 }}
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
                                            position: "relative",
                                        }}
                                    >
                                        {project.liveUrl ? (
                                            <iframe
                                                src={project.liveUrl}
                                                title={project.title}
                                                loading="lazy"
                                                className="border-0 absolute top-0 left-0"
                                                style={{
                                                    width: "250%",
                                                    height: "250%",
                                                    transform: "scale(0.4)",
                                                    transformOrigin: "top left",
                                                    pointerEvents: "none",
                                                }}
                                            />
                                        ) : (
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
                                        )}
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
