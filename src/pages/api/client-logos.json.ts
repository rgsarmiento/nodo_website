import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

export const GET: APIRoute = async () => {
    const clientsDir = path.join(process.cwd(), 'public', 'clients');

    try {
        if (!fs.existsSync(clientsDir)) {
            return new Response(JSON.stringify([]), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache, no-store, must-revalidate'
                }
            });
        }

        const logos = fs
            .readdirSync(clientsDir)
            .filter(file => /\.(png|jpg|jpeg|svg|webp)$/i.test(file))
            .map(file => `/clients/${file}`);

        return new Response(JSON.stringify(logos), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            }
        });
    } catch (error) {
        console.error('Error reading clients directory:', error);
        return new Response(JSON.stringify([]), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
