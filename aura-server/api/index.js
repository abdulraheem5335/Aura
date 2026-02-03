import app, { connectDB } from '../server.js';

export default async function handler(req, res) {
    // Ensure DB connection before handling request
    await connectDB();

    // Forward to express app
    return app(req, res);
}
