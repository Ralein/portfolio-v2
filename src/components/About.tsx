"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
    SiReact,
    SiNextdotjs,
    SiNodedotjs,
    SiPython,
    SiTypescript,
    SiJavascript,
    SiMongodb,
    SiMysql,
    SiFigma,
    SiTailwindcss,
    SiGit,
    SiDocker,
    SiAdobeillustrator,
    SiAdobeindesign,
    SiAdobepremierepro,
    SiAdobeaudition,
    SiCoreldraw,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { DiPhotoshop } from "react-icons/di";
import { TbBrandFramerMotion } from "react-icons/tb";
import { BiLogoSpringBoot } from "react-icons/bi";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const AdobeAnimateIcon = ({ className, style }: { className?: string; style?: any }) => (
    <img
        src="/an.png"
        alt="Adobe Animate"
        className={className}
        style={{ ...style, width: "1em", height: "1em", objectFit: "contain", borderRadius: 4 }}
    />
);

const techStack = [
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#fff" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "Java", icon: FaJava, color: "#ED8B00" },
    { name: "Spring Boot", icon: BiLogoSpringBoot, color: "#6DB33F" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "MySQL", icon: SiMysql, color: "#4479A1" },
    { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "Framer", icon: TbBrandFramerMotion, color: "#ff4d4d" },
    { name: "Figma", icon: SiFigma, color: "#F24E1E" },
    { name: "Photoshop", icon: DiPhotoshop, color: "#31A8FF" },
    { name: "Illustrator", icon: SiAdobeillustrator, color: "#FF9A00" },
    { name: "InDesign", icon: SiAdobeindesign, color: "#FF3366" },
    { name: "Premiere Pro", icon: SiAdobepremierepro, color: "#2dd4bf" },
    { name: "Audition", icon: SiAdobeaudition, color: "#2dd4bf" },
    { name: "Adobe Animate", icon: AdobeAnimateIcon, color: "#CC2900" },

    { name: "CorelDRAW", icon: SiCoreldraw, color: "#00E472" },
    { name: "Git", icon: SiGit, color: "#F05032" },
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
];

const stats = [
    { number: "50+", label: "Repositories" },
    { number: "8+", label: "Live Projects" },
];

const ITEMS_PER_PAGE = 16;

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [page, setPage] = useState(0);

    const totalPages = Math.ceil(techStack.length / ITEMS_PER_PAGE);
    const currentTech = techStack.slice(
        page * ITEMS_PER_PAGE,
        (page + 1) * ITEMS_PER_PAGE
    );

    const nextPage = () => {
        if (page < totalPages - 1) setPage(page + 1);
    };

    const prevPage = () => {
        if (page > 0) setPage(page - 1);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <section className="section" id="about" ref={ref}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <span className="section-label">About Me</span>
                    <h2 className="section-title">
                        Passionate about building{" "}
                        <span className="gradient-text">digital experiences</span>
                    </h2>
                </motion.div>

                <div className="about-grid">
                    <motion.div
                        className="about-bio"
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <p>
                            I&apos;m a results-driven <strong>M.Tech Computer Science</strong>{" "}
                            student passionate about web development, programming, and digital
                            media design. Skilled in problem-solving and teamwork, with a track
                            record of delivering high-quality projects.
                        </p>
                        <p>
                            I combine technical skill with artistic flair to build modern,
                            responsive, and user-centered digital experiences. My work spans
                            full-stack web apps, AI-powered tools, inclusive platforms, and
                            creative UI/UX design.
                        </p>
                        <p>
                            Currently exploring the MERN stack, AI-enhanced tools with
                            Langchain and Ollama, and accessible design patterns that make
                            technology inclusive for everyone.
                        </p>

                        <div className="about-stats">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    className="stat-card glass-card"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                >
                                    <div className="stat-number">{stat.number}</div>
                                    <div className="stat-label">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <div className="about-tech-container">
                        <motion.h3
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            style={{
                                fontSize: "1.1rem",
                                marginBottom: 20,
                                color: "var(--text-secondary)",
                            }}
                        >
                            Technologies I work with
                        </motion.h3>

                        <div style={{ minHeight: "360px", position: "relative" }}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={page}
                                    className="tech-grid"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {currentTech.map((tech) => (
                                        <motion.div
                                            key={tech.name}
                                            className="tech-item glass-card"
                                            variants={itemVariants}
                                            initial="hidden"
                                            animate="visible"
                                            whileHover={{ y: -4, scale: 1.05 }}
                                        >
                                            <tech.icon
                                                className="tech-icon"
                                                style={{ color: tech.color }}
                                            />
                                            <span className="tech-name">{tech.name}</span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {totalPages > 1 && (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    marginTop: 20,
                                    gap: 12,
                                }}
                            >
                                <button
                                    onClick={prevPage}
                                    disabled={page === 0}
                                    className="btn-outline"
                                    style={{
                                        padding: "8px 12px",
                                        opacity: page === 0 ? 0.3 : 1,
                                        pointerEvents: page === 0 ? "none" : "auto",
                                    }}
                                >
                                    <HiChevronLeft />
                                </button>
                                <button
                                    onClick={nextPage}
                                    disabled={page === totalPages - 1}
                                    className="btn-outline"
                                    style={{
                                        padding: "8px 12px",
                                        opacity: page === totalPages - 1 ? 0.3 : 1,
                                        pointerEvents: page === totalPages - 1 ? "none" : "auto",
                                    }}
                                >
                                    <HiChevronRight />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
