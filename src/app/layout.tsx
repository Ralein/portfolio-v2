import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
    title: "Ralein Nova — Fullstack Developer & UI/UX Designer",
    description:
        "Portfolio of Ralein Nova R L — Fullstack Developer, UI/UX Designer, and Next.js Enthusiast. Building modern, accessible, and AI-powered web experiences.",
    keywords: [
        "Ralein Nova",
        "Fullstack Developer",
        "UI/UX Designer",
        "Next.js",
        "React",
        "Portfolio",
        "Web Developer",
    ],
    authors: [{ name: "Ralein Nova R L" }],
    openGraph: {
        title: "Ralein Nova — Portfolio",
        description:
            "Building modern, accessible, and AI-powered web experiences.",
        type: "website",
        url: "https://ralein.vercel.app",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
                {children}
            </body>
        </html>
    );
}
