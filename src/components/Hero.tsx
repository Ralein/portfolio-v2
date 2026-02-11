"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { HiArrowDown } from "react-icons/hi";

const roles = [
    "Fullstack Developer",
    "UI/UX Designer",
    "Next.js Enthusiast",
    "Digital Media Designer",
    "AI Builder",
];

interface HeroProps {
}

export default function Hero({ }: HeroProps) {
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

    useEffect(() => {
        const currentRole = roles[roleIndex];
        const speed = isDeleting ? 40 : 80;

        if (!isDeleting && displayText === currentRole) {
            timeoutRef.current = setTimeout(() => setIsDeleting(true), 3000);
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
            transition: { staggerChildren: 0.15, delayChildren: 2.0 },
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
        <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden" id="home">
            {/* Dynamic Background Elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <video
                    autoPlay
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-[100%] md:h-[111%] object-cover object-top opacity-40 mix-blend-screen pointer-events-none"
                >
                    <source src="/bg.webm" type="video/webm" />
                </video>

                {/* Refined Mesh Gradient (Clean Red/Dark) */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,77,77,0.04),transparent_70%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,77,77,0.06),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(255,77,77,0.03),transparent_60%)]" />

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

                {/* Overlays at the end to ensure they are on top */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black via-black/50 to-transparent pointer-events-none z-[2]" />
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none z-[2]" />
            </div>

            {/* Background Orbs with enhanced blur and scale */}
            <div className="hero-orb hero-orb-1 opacity-25 blur-[120px] scale-125" />
            <div className="hero-orb hero-orb-2 opacity-25 blur-[120px] scale-125" />
            <div className="hero-orb hero-orb-3 opacity-15 blur-[100px]" />

            <div className="container relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto px-6 py-12 rounded-3xl backdrop-blur-[2px] bg-black/5 border border-white/5"
                >
                    <motion.div className="hero-role mx-auto mb-6 px-5 py-2 rounded-full bg-accent-red/10 border border-accent-red/20 backdrop-blur-md" variants={itemVariants}>
                        <span className="dot bg-accent-red" />
                        <span className="text-accent-red font-medium tracking-wide">Available for opportunities</span>
                    </motion.div>

                    <motion.h1
                        className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tighter"
                        variants={itemVariants}
                    >
                        Hey! I&apos;m
                        <span className="name-highlight block md:inline md:ml-4 bg-gradient-to-r from-accent-red via-accent-orange to-accent-red bg-[length:200%_auto] animate-gradient-text">Ralein Nova</span>
                    </motion.h1>

                    <motion.p className="text-xl md:text-3xl text-text-secondary mb-12 leading-relaxed font-light" variants={itemVariants}>
                        A{" "}
                        <span className="gradient-text font-bold">
                            {displayText}
                        </span>
                        <span
                            className="inline-block w-[3px] h-[1.1em] bg-accent-red translate-y-1 ml-1 animate-pulse shadow-[0_0_10px_var(--accent-red)]"
                        />
                        <br />
                        <span className="text-base md:text-xl opacity-70 mt-6 block max-w-2xl mx-auto">
                            crafting high-performance, modern applications with a focus on immersive UI/UX and seamless AI integration.
                        </span>
                    </motion.p>

                    <motion.div className="flex justify-center items-center gap-6" variants={itemVariants}>
                        <motion.a
                            href="#projects"
                            className="btn-primary group relative overflow-hidden px-8 py-4 rounded-full bg-accent-red text-white font-semibold transition-all hover:shadow-[0_0_20px_rgba(255,77,77,0.4)]"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                                e.preventDefault();
                                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                            }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                View My Work
                                <HiArrowDown className="transition-transform group-hover:translate-y-1" />
                            </span>
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>

            <motion.div
                className="scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
            >
                <div className="mouse" />
                <span>Scroll</span>
            </motion.div>
        </section>
    );
}

