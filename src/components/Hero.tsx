"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { HiArrowDown } from "react-icons/hi";

// We'll use a Lottie animation URL since we don't have local files
const LOTTIE_URL =
    "https://lottie.host/7ac4472a-b56a-4351-a4f9-bf7ee41e4de5/ufDPFCYnJi.json";

const roles = [
    "Fullstack Developer",
    "UI/UX Designer",
    "Next.js Enthusiast",
    "Digital Media Designer",
    "AI Builder",
];

export default function Hero() {
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [lottieData, setLottieData] = useState(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

    // Load Lottie JSON
    useEffect(() => {
        fetch(LOTTIE_URL)
            .then((res) => res.json())
            .then(setLottieData)
            .catch(() => { });
    }, []);

    // Typing effect
    useEffect(() => {
        const currentRole = roles[roleIndex];
        const speed = isDeleting ? 40 : 80;

        if (!isDeleting && displayText === currentRole) {
            timeoutRef.current = setTimeout(() => setIsDeleting(true), 2000);
            return;
        }

        if (isDeleting && displayText === "") {
            setIsDeleting(false);
            setRoleIndex((prev) => (prev + 1) % roles.length);
            return;
        }

        timeoutRef.current = setTimeout(() => {
            setDisplayText(
                isDeleting
                    ? currentRole.substring(0, displayText.length - 1)
                    : currentRole.substring(0, displayText.length + 1)
            );
        }, speed);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [displayText, isDeleting, roleIndex]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <section className="hero" id="home">
            {/* Background Orbs */}
            <div className="hero-orb hero-orb-1" />
            <div className="hero-orb hero-orb-2" />
            <div className="hero-orb hero-orb-3" />

            <div className="hero-content">
                <motion.div
                    className="hero-text"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div className="hero-role" variants={itemVariants}>
                        <span className="dot" />
                        Available for opportunities
                    </motion.div>

                    <motion.h1 variants={itemVariants}>
                        Hey! I&apos;m
                        <span className="name-highlight">Ralein Nova</span>
                    </motion.h1>

                    <motion.p className="hero-tagline" variants={itemVariants}>
                        A{" "}
                        <span className="gradient-text" style={{ fontWeight: 600 }}>
                            {displayText}
                        </span>
                        <span
                            style={{
                                borderRight: "2px solid var(--accent-blue)",
                                marginLeft: 2,
                                animation: "pulse-glow 1s ease-in-out infinite",
                            }}
                        />
                        <br />
                        crafting fast, modern apps with a focus on UI/UX and AI
                        integration.
                    </motion.p>

                    <motion.div className="hero-buttons" variants={itemVariants}>
                        <motion.a
                            href="#projects"
                            className="btn-primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                                e.preventDefault();
                                document
                                    .querySelector("#projects")
                                    ?.scrollIntoView({ behavior: "smooth" });
                            }}
                        >
                            View My Work
                            <HiArrowDown />
                        </motion.a>

                    </motion.div>
                </motion.div>

                <motion.div
                    className="hero-visual"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <div className="hero-lottie-wrapper">
                        {lottieData && (
                            <Lottie
                                animationData={lottieData}
                                loop
                                style={{ width: "100%", height: "auto" }}
                            />
                        )}
                    </div>
                </motion.div>
            </div>

            <motion.div
                className="scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
            >
                <div className="mouse" />
                <span>Scroll</span>
            </motion.div>
        </section>
    );
}
