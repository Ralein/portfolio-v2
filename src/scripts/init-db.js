const { Client } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not defined in .env.local');
    process.exit(1);
}

const client = new Client(process.env.DATABASE_URL);

async function main() {
    try {
        await client.connect();
        console.log('Connected to database.');

        console.log('Creating schema...');
        const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
        await client.query(schema);
        console.log('Schema created successfully.');

        // Seed initial data if table is empty
        const { rows } = await client.query('SELECT COUNT(*) FROM projects');
        if (rows[0].count === '0') {
            console.log('Seeding initial data...');
            const projects = require('../data/projects.json');

            for (const p of projects) {
                await client.query(
                    `INSERT INTO projects (title, description, category, tags, live_url, github_url, image, featured)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                    [p.title, p.description, p.category, p.tags, p.liveUrl, p.githubUrl, p.image, p.featured]
                );
            }
            console.log(`Seeded ${projects.length} projects.`);
        } else {
            console.log('Table already has data, skipping seed.');
        }

    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
    } finally {
        await client.end();
    }
}

main();
