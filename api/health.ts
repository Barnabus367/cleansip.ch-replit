import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req;
  
  if (method === 'GET') {
    return res.status(200).json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      shopify: {
        configured: !!(process.env.SHOPIFY_STORE_DOMAIN && process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN),
        domain: process.env.SHOPIFY_STORE_DOMAIN ? 
          `${process.env.SHOPIFY_STORE_DOMAIN.substring(0, 10)}...` : 
          'Not configured'
      }
    });
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}
