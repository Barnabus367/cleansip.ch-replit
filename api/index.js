// Vercel Serverless Function wrapper for Express app
import '../dist/index.js';

export default async function handler(req, res) {
  // The Express app handles all requests
  // This is just a placeholder for Vercel
  res.status(200).json({ message: 'API is running' });
}