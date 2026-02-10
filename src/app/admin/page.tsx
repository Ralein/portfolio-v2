"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    HiPlus,
    HiPencil,
    HiTrash,
    HiExternalLink,
    HiLogout,
} from "react-icons/hi";

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

const emptyProject: Omit<Project, "id"> = {
    title: "",
    description: "",
    category: "Web App",
    tags: [],
    liveUrl: "",
    githubUrl: "",
    image: "",
    featured: false,
};

export default function AdminDashboard() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [form, setForm] = useState(emptyProject);
    const [tagsInput, setTagsInput] = useState("");
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    const loadProjects = useCallback(async () => {
        try {
            const res = await fetch("/api/projects");
            if (res.ok) setProjects(await res.json());
        } catch { }
    }, []);

    useEffect(() => {
        loadProjects();
    }, [loadProjects]);

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/admin/login");
    };

    const openCreateModal = () => {
        setEditingProject(null);
        setForm(emptyProject);
        setTagsInput("");
        setModalOpen(true);
    };

    const openEditModal = (project: Project) => {
        setEditingProject(project);
        setForm({
            title: project.title,
            description: project.description,
            category: project.category,
            tags: project.tags,
            liveUrl: project.liveUrl,
            githubUrl: project.githubUrl,
            image: project.image,
            featured: project.featured,
        });
        setTagsInput(project.tags.join(", "));
        setModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const payload = {
            ...form,
            tags: tagsInput
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean),
        };

        try {
            if (editingProject) {
                await fetch("/api/projects", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...payload, id: editingProject.id }),
                });
            } else {
                await fetch("/api/projects", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
            }
            await loadProjects();
            setModalOpen(false);
        } catch { }
        setSaving(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        try {
            await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
            await loadProjects();
        } catch { }
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <div>
                    <h1>
                        <span className="gradient-text">Admin</span> Dashboard
                    </h1>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                        Manage your portfolio projects
                    </p>
                </div>
                <div className="admin-actions">
                    <motion.button
                        className="btn-primary"
                        onClick={openCreateModal}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <HiPlus /> Add Project
                    </motion.button>
                    <motion.button
                        className="btn-outline"
                        onClick={handleLogout}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <HiLogout /> Logout
                    </motion.button>
                    <motion.a
                        href="/"
                        className="btn-outline"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        target="_blank"
                    >
                        <HiExternalLink /> View Site
                    </motion.a>
                </div>
            </div>

            <div className="glass-card" style={{ overflow: "auto" }}>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Tags</th>
                            <th>Links</th>
                            <th style={{ textAlign: "right" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project.id}>
                                <td style={{ fontWeight: 500 }}>{project.title}</td>
                                <td>
                                    <span className="project-tag">{project.category}</span>
                                </td>
                                <td>
                                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                                        {project.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="project-tag"
                                                style={{ fontSize: "0.7rem" }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                        {project.tags.length > 3 && (
                                            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                                                +{project.tags.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <div style={{ display: "flex", gap: 8 }}>
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: "var(--accent-blue)", fontSize: "0.85rem" }}
                                            >
                                                Live
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}
                                            >
                                                GitHub
                                            </a>
                                        )}
                                    </div>
                                </td>
                                <td style={{ textAlign: "right" }}>
                                    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                                        <button
                                            className="admin-btn admin-btn-edit"
                                            onClick={() => openEditModal(project)}
                                        >
                                            <HiPencil /> Edit
                                        </button>
                                        <button
                                            className="admin-btn admin-btn-delete"
                                            onClick={() => handleDelete(project.id)}
                                        >
                                            <HiTrash /> Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {projects.length === 0 && (
                    <div
                        style={{
                            textAlign: "center",
                            padding: 60,
                            color: "var(--text-muted)",
                        }}
                    >
                        No projects yet. Click &quot;Add Project&quot; to get started.
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {modalOpen && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setModalOpen(false)}
                    >
                        <motion.div
                            className="modal-content"
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 30, scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2>
                                {editingProject ? "Edit" : "Add"}{" "}
                                <span className="gradient-text">Project</span>
                            </h2>

                            <form onSubmit={handleSave}>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        value={form.title}
                                        onChange={(e) =>
                                            setForm({ ...form, title: e.target.value })
                                        }
                                        placeholder="Project name"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        value={form.description}
                                        onChange={(e) =>
                                            setForm({ ...form, description: e.target.value })
                                        }
                                        placeholder="Brief project description"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Category</label>
                                    <select
                                        value={form.category}
                                        onChange={(e) =>
                                            setForm({ ...form, category: e.target.value })
                                        }
                                        style={{
                                            width: "100%",
                                            padding: "14px 18px",
                                            background: "rgba(5, 10, 21, 0.6)",
                                            border: "1px solid var(--glass-border)",
                                            borderRadius: "var(--radius-sm)",
                                            color: "var(--text-primary)",
                                            fontFamily: "'Inter', sans-serif",
                                            fontSize: "0.92rem",
                                        }}
                                    >
                                        <option value="AI/ML">AI/ML</option>
                                        <option value="Web App">Web App</option>
                                        <option value="UI/UX">UI/UX</option>
                                        <option value="Digital Media">Digital Media</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Tags (comma separated)</label>
                                    <input
                                        type="text"
                                        value={tagsInput}
                                        onChange={(e) => setTagsInput(e.target.value)}
                                        placeholder="React, Next.js, AI"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Live URL</label>
                                    <input
                                        type="url"
                                        value={form.liveUrl}
                                        onChange={(e) =>
                                            setForm({ ...form, liveUrl: e.target.value })
                                        }
                                        placeholder="https://..."
                                    />
                                </div>

                                <div className="form-group">
                                    <label>GitHub URL</label>
                                    <input
                                        type="url"
                                        value={form.githubUrl}
                                        onChange={(e) =>
                                            setForm({ ...form, githubUrl: e.target.value })
                                        }
                                        placeholder="https://github.com/..."
                                    />
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                        marginBottom: 24,
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        checked={form.featured}
                                        onChange={(e) =>
                                            setForm({ ...form, featured: e.target.checked })
                                        }
                                        style={{ width: 18, height: 18 }}
                                    />
                                    <label htmlFor="featured" style={{ margin: 0, cursor: "pointer" }}>
                                        Featured project
                                    </label>
                                </div>

                                <div style={{ display: "flex", gap: 12 }}>
                                    <motion.button
                                        type="submit"
                                        className="btn-primary"
                                        style={{ flex: 1 }}
                                        disabled={saving}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {saving
                                            ? "Saving..."
                                            : editingProject
                                                ? "Update Project"
                                                : "Add Project"}
                                    </motion.button>
                                    <button
                                        type="button"
                                        className="btn-outline"
                                        onClick={() => setModalOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
