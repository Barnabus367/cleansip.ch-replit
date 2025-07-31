import type { VercelRequest, VercelResponse } from '@vercel/node';

// Mock products data
const mockProducts = [
    {
        id: "plastik-strohhalm",
        title: "CleanSip Premium Strohhalme",
        subtitle: "3 Farben verfügbar - Die Unbeugsamen",
        handle: "plastik-strohhalm",
        description: "Zuverlässige Plastikstrohhalme für alle, die keine Kompromisse eingehen.",
        price: 1490,
        currency: "CHF",
        availableForSale: true,
        totalInventory: 100,
        productType: "Strohhalme",
        vendor: "CleanSip",
        tags: ["plastik", "strohhalm", "party", "rebellion"],
        images: [
            {
                id: "1",
                url: "/assets/Produktbild-schwarzer-Strohhalm_1753910576700.jpg",
                altText: "CleanSip Premium Strohhalme",
                width: 800,
                height: 800
            }
        ],
        availableColors: ["Schwarz", "Weiss", "Blau"],
        defaultColor: "Schwarz"
    }
];

export default function handler(req: VercelRequest, res: VercelResponse) {
    const { method } = req;

    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (method === 'GET') {
        const limit = parseInt(req.query.limit as string) || 10;
        return res.status(200).json(mockProducts.slice(0, limit));
    }

    return res.status(405).json({ error: 'Method not allowed' });
}
