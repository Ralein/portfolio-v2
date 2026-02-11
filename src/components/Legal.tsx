"use client";
import { useEffect } from "react";

export default function Legal() {
    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            // F12
            if (e.key === "F12") {
                e.preventDefault();
            }
            // Ctrl+Shift+I or Cmd+Opt+I (Mac) - Inspector
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "I" || e.key === "i")) {
                e.preventDefault();
            }
            // Ctrl+Shift+J or Cmd+Opt+J (Mac) - Console
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "J" || e.key === "j")) {
                e.preventDefault();
            }
            // Ctrl+Shift+C or Cmd+Opt+C (Mac) - Inspect Element
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "C" || e.key === "c")) {
                e.preventDefault();
            }
            // Ctrl+U or Cmd+U (Source)
            if ((e.ctrlKey || e.metaKey) && (e.key === "u" || e.key === "U")) {
                e.preventDefault();
            }
        };

        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return null;
}
