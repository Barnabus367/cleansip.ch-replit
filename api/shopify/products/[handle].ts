import type { VercelRequest, VercelResponse } from '@vercel/node';

// Mock data for the main product
const mockProduct = {
  id: "plastik-strohhalm",
  title: "CleanSip Premium Strohhalme",
  subtitle: "3 Farben verfügbar - Die Unbeugsamen",
  handle: "plastik-strohhalm",
  description: "Zuverlässige Plastikstrohhalme für alle, die keine Kompromisse eingehen.",
  descriptionHtml: `
    <div class="cleansip-product-story">
      <p><strong>Die Wahrheit über Strohhalme:</strong></p>
      <p>Während andere nach 30 Sekunden aufgeben, bleiben CleanSip Strohhalme standhaft. 
      Entwickelt für Menschen, die keine Lust auf Kompromisse haben.</p>
      
      <h3>Warum CleanSip Premium Strohhalme?</h3>
      <ul>
        <li>🛡️ 100% Formstabil - vom ersten bis zum letzten Schluck</li>
        <li>⚡ In 48h bei dir - aus Schweizer Lager</li>
        <li>💎 Premium-Qualität - BPA-frei & lebensmittelecht</li>
        <li>🎯 Fair - nur CHF 0.149 pro stabilem Trinkerlebnis</li>
        <li>🎨 3 Farben - für jede rebellische Stimmung</li>
      </ul>
    </div>
  `,
  price: 1490, // in cents
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
      altText: "CleanSip Premium Strohhalme - Schwarz",
      width: 800,
      height: 800
    }
  ],
  colorVariants: {
    "Schwarz": [
      {
        id: "variant-black",
        title: "Schwarz",
        price: 1490,
        currency: "CHF",
        availableForSale: true,
        quantityAvailable: 50,
        image: {
          id: "1",
          url: "/assets/Produktbild-schwarzer-Strohhalm_1753910576700.jpg",
          altText: "CleanSip Premium Strohhalme - Schwarz"
        },
        selectedOptions: [{ name: "Farbe", value: "Schwarz" }],
        sku: "CS-100-BLACK"
      }
    ],
    "Weiss": [
      {
        id: "variant-white",
        title: "Weiss",
        price: 1490,
        currency: "CHF",
        availableForSale: true,
        quantityAvailable: 50,
        image: {
          id: "2",
          url: "/assets/Produktbild-schwarzer-Strohhalm_1753910576700.jpg",
          altText: "CleanSip Premium Strohhalme - Weiss"
        },
        selectedOptions: [{ name: "Farbe", value: "Weiss" }],
        sku: "CS-100-WHITE"
      }
    ],
    "Blau": [
      {
        id: "variant-blue",
        title: "Blau",
        price: 1490,
        currency: "CHF",
        availableForSale: true,
        quantityAvailable: 50,
        image: {
          id: "3",
          url: "/assets/Produktbild-schwarzer-Strohhalm_1753910576700.jpg",
          altText: "CleanSip Premium Strohhalme - Blau"
        },
        selectedOptions: [{ name: "Farbe", value: "Blau" }],
        sku: "CS-100-BLUE"
      }
    ]
  },
  availableColors: ["Schwarz", "Weiss", "Blau"],
  defaultColor: "Schwarz",
  variants: [],
  options: [
    {
      id: "color-option",
      name: "Farbe",
      values: ["Schwarz", "Weiss", "Blau"]
    }
  ],
  features: [
    { icon: "Shield", text: "Garantiert kein Aufweichen" },
    { icon: "Zap", text: "48h Lieferung aus der Schweiz" },
    { icon: "Heart", text: "Von 500+ Schweizern geliebt" },
    { icon: "Palette", text: "3 rebellische Farben zur Auswahl" }
  ],
  pricePerUnit: "0.149",
  rebelliousScore: 85
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req;
  const { handle } = req.query;
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (method === 'GET') {
    // Return the mock product for any handle (for now)
    return res.status(200).json(mockProduct);
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
