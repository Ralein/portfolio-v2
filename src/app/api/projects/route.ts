import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sql } from "@/lib/db";

// Helper to map DB row to frontend project object
function mapProject(row: any) {
    return {
        ...row,
        id: row.id.toString(), // Ensure ID is string for frontend
        liveUrl: row.live_url,
        githubUrl: row.github_url,
        createdAt: row.created_at,
        position: row.position || 0,
    };
}

// GET – public, no auth needed
export async function GET() {
    try {
        const projects = await sql`SELECT * FROM projects ORDER BY position ASC, created_at DESC`;
        return NextResponse.json(projects.map(mapProject));
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
}

// POST – add project (auth checked via cookie)
export async function POST(request: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { title, description, category, tags, liveUrl, githubUrl, image, featured } = body;

        // Get max position to put new project at the end
        const maxPosResult = await sql`SELECT MAX(position) as max_pos FROM projects`;
        const nextPos = (maxPosResult[0]?.max_pos || 0) + 1;

        const newProject = await sql`
      INSERT INTO projects (title, description, category, tags, live_url, github_url, image, featured, position)
      VALUES (${title}, ${description}, ${category}, ${tags}, ${liveUrl}, ${githubUrl}, ${image}, ${featured}, ${nextPos})
      RETURNING *
    `;

        return NextResponse.json(mapProject(newProject[0]), { status: 201 });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}

// PUT – update project
export async function PUT(request: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { id, title, description, category, tags, liveUrl, githubUrl, image, featured } = body;

        const updatedProject = await sql`
      UPDATE projects
      SET title = ${title},
          description = ${description},
          category = ${category},
          tags = ${tags},
          live_url = ${liveUrl},
          github_url = ${githubUrl},
          image = ${image},
          featured = ${featured}
      WHERE id = ${id}
      RETURNING *
    `;

        if (updatedProject.length === 0) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        return NextResponse.json(mapProject(updatedProject[0]));
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
}

// PATCH – bulk update positions (auth checked)
export async function PATCH(request: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { positions } = body; // Array of {id, position}

        for (const item of positions) {
            await sql`UPDATE projects SET position = ${item.position} WHERE id = ${item.id}`;
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Failed to update positions" }, { status: 500 });
    }
}

// DELETE – remove project
export async function DELETE(request: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    try {
        await sql`DELETE FROM projects WHERE id = ${id}`;
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}
