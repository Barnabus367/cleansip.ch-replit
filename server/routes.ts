import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNewsletterSchema } from "@shared/schema";

// Shopify Storefront API configuration
const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const STOREFRONT_API_URL = `https://${SHOPIFY_DOMAIN}/api/2023-10/graphql.json`;

// GraphQL query to get products with color variants focus
const GET_PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          descriptionHtml
          availableForSale
          totalInventory
          productType
          vendor
          tags
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 10) {
            edges {
              node {
                id
                url
                altText
                width
                height
              }
            }
          }
          variants(first: 50) {
            edges {
              node {
                id
                title
                availableForSale
                quantityAvailable
                priceV2 {
                  amount
                  currencyCode
                }
                image {
                  id
                  url
                  altText
                  width
                  height
                }
                selectedOptions {
                  name
                  value
                }
                sku
                weight
                weightUnit
              }
            }
          }
          options {
            id
            name
            values
          }
        }
      }
    }
  }
`;

const GET_PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      availableForSale
      totalInventory
      productType
      vendor
      tags
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            id
            url
            altText
            width
            height
          }
        }
      }
      variants(first: 50) {
        edges {
          node {
            id
            title
            availableForSale
            quantityAvailable
            priceV2 {
              amount
              currencyCode
            }
            image {
              id
              url
              altText
              width
              height
            }
            selectedOptions {
              name
              value
            }
            sku
            weight
            weightUnit
          }
        }
      }
      options {
        id
        name
        values
      }
      seo {
        title
        description
      }
    }
  }
`;

// Shopify API fetch function
async function shopifyFetch(query: string, variables: any = {}) {
  if (!SHOPIFY_DOMAIN || !STOREFRONT_ACCESS_TOKEN) {
    throw new Error('Shopify credentials not configured');
  }

  const response = await fetch(STOREFRONT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.statusText}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
  }

  return data;
}

// Transform Shopify data for CleanSip with focus on single product + colors
function transformShopifyProductForCleanSip(shopifyProduct: any) {
  if (!shopifyProduct) return null;
  
  const edges = shopifyProduct.variants?.edges || [];
  const variants = edges.map((edge: any) => edge.node);
  
  // Focus on color variants for CleanSip's single product approach
  const colorVariants = variants.reduce((acc: any, variant: any) => {
    const colorOption = variant.selectedOptions?.find((opt: any) => 
      opt.name.toLowerCase().includes('color') || 
      opt.name.toLowerCase().includes('farbe') ||
      opt.name.toLowerCase().includes('colour')
    );
    
    if (colorOption) {
      const color = colorOption.value;
      if (!acc[color]) {
        acc[color] = [];
      }
      acc[color].push({
        id: variant.id,
        title: variant.title,
        price: parseFloat(variant.priceV2.amount),
        currency: variant.priceV2.currencyCode,
        availableForSale: variant.availableForSale,
        quantityAvailable: variant.quantityAvailable,
        image: variant.image,
        selectedOptions: variant.selectedOptions,
        sku: variant.sku,
      });
    }
    return acc;
  }, {});

  const availableColors = Object.keys(colorVariants);
  const basePrice = parseFloat(shopifyProduct.priceRange.minVariantPrice.amount);
  
  // Enhanced images from edges
  const images = shopifyProduct.images?.edges?.map((edge: any) => ({
    id: edge.node.id,
    url: edge.node.url,
    altText: edge.node.altText || `${shopifyProduct.title} - CleanSip Premium Strohhalme`,
    width: edge.node.width,
    height: edge.node.height,
  })) || [];
  
  return {
    id: shopifyProduct.handle,
    title: shopifyProduct.title,
    subtitle: `${availableColors.length > 1 ? `${availableColors.length} Farben verfügbar - ` : ''}Die Unbeugsamen`,
    handle: shopifyProduct.handle,
    description: shopifyProduct.description,
    descriptionHtml: shopifyProduct.descriptionHtml || enhanceProductDescription(shopifyProduct, availableColors.length),
    price: basePrice,
    currency: shopifyProduct.priceRange.minVariantPrice.currencyCode,
    availableForSale: shopifyProduct.availableForSale,
    totalInventory: shopifyProduct.totalInventory,
    productType: shopifyProduct.productType,
    vendor: shopifyProduct.vendor,
    tags: shopifyProduct.tags || [],
    images,
    colorVariants,
    availableColors,
    defaultColor: availableColors[0] || null,
    variants,
    options: shopifyProduct.options || [],
    features: generateCleanSipFeatures(shopifyProduct, availableColors.length),
    pricePerUnit: calculatePricePerUnit(basePrice, variants),
    rebelliousScore: calculateRebelliousScore(availableColors.length, variants.length, basePrice),
  };
}

function enhanceProductDescription(product: any, colorCount: number) {
  const baseDescription = product.description || '';
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  
  return `
    <div class="cleansip-product-story">
      <p><strong>Die Wahrheit über Strohhalme:</strong></p>
      <p>Während andere nach 30 Sekunden aufgeben, bleiben CleanSip Strohhalme standhaft. 
      Entwickelt für Menschen, die keine Lust auf Kompromisse haben.</p>
      
      <h3>Warum CleanSip ${product.title}?</h3>
      <ul>
        <li>🛡️ 100% Formstabil - vom ersten bis zum letzten Schluck</li>
        <li>⚡ In 48h bei dir - aus Schweizer Lager</li>
        <li>💎 Premium-Qualität - BPA-frei & lebensmittelecht</li>
        <li>🎯 Fair - nur CHF ${(price / 100).toFixed(3)} pro stabilem Trinkerlebnis</li>
        ${colorCount > 1 ? `<li>🎨 ${colorCount} Farben - für jede rebellische Stimmung</li>` : ''}
      </ul>
      
      ${baseDescription ? `<h3>Produktdetails</h3><div>${baseDescription}</div>` : ''}
    </div>
  `;
}

function generateCleanSipFeatures(product: any, colorCount: number) {
  const features = [
    { icon: 'Shield', text: 'Garantiert kein Aufweichen' },
    { icon: 'Zap', text: '48h Lieferung aus der Schweiz' },
    { icon: 'Heart', text: 'Von 500+ Schweizern geliebt' }
  ];

  if (colorCount > 1) {
    features.push({ 
      icon: 'Palette', 
      text: `${colorCount} rebellische Farben zur Auswahl` 
    });
  }

  return features;
}

function calculatePricePerUnit(basePrice: number, variants: any[]) {
  const firstVariant = variants?.[0];
  if (firstVariant?.selectedOptions) {
    const quantityOption = firstVariant.selectedOptions.find((opt: any) => 
      opt.name.toLowerCase().includes('size') || 
      opt.name.toLowerCase().includes('pack') ||
      opt.name.toLowerCase().includes('anzahl')
    );
    
    if (quantityOption) {
      const match = quantityOption.value.match(/(\d+)/);
      if (match) {
        const quantity = parseInt(match[1]);
        return (basePrice / quantity).toFixed(3);
      }
    }
  }
  
  return (basePrice / 100).toFixed(3);
}

function calculateRebelliousScore(colorCount: number, variantCount: number, price: number) {
  let score = 50;
  score += Math.min(colorCount * 10, 30);
  score += Math.min(variantCount * 3, 20);
  if (price < 20) score += 20;
  else if (price < 30) score += 10;
  return Math.min(score, 100);
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Newsletter subscription endpoint
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      const subscription = await storage.createNewsletterSubscription(validatedData);
      res.json({ success: true, subscription });
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      res.status(400).json({ 
        success: false, 
        error: "Invalid email or subscription already exists" 
      });
    }
  });

  // Get all newsletter subscriptions (admin endpoint)
  app.get("/api/newsletter", async (req, res) => {
    try {
      const subscriptions = await storage.getAllNewsletterSubscriptions();
      res.json({ subscriptions });
    } catch (error) {
      console.error("Get newsletter subscriptions error:", error);
      res.status(500).json({ error: "Failed to fetch subscriptions" });
    }
  });

  // Shopify product endpoints - real data integration
  app.get("/api/shopify/products", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      console.log('Fetching products from Shopify with limit:', limit);
      
      const response = await shopifyFetch(GET_PRODUCTS_QUERY, { first: limit });
      const products = response.data?.products?.edges?.map((edge: any) => edge.node) || [];
      
      // Transform all products for CleanSip focus on colors
      const transformedProducts = products.map(transformShopifyProductForCleanSip).filter(Boolean);
      
      console.log(`Successfully fetched ${transformedProducts.length} products`);
      res.json(transformedProducts);
    } catch (error) {
      console.error("Error fetching products from Shopify:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch products",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.get("/api/shopify/products/:handle", async (req, res) => {
    try {
      const { handle } = req.params;
      console.log('Fetching product by handle:', handle);
      
      const response = await shopifyFetch(GET_PRODUCT_BY_HANDLE_QUERY, { handle });
      const product = response.data?.productByHandle;
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found"
        });
      }
      
      const transformedProduct = transformShopifyProductForCleanSip(product);
      console.log('Successfully fetched product:', transformedProduct?.title);
      
      res.json(transformedProduct);
    } catch (error) {
      console.error("Error fetching product from Shopify:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch product",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Legacy product endpoints (for backward compatibility)
  app.get("/api/products", async (req, res) => {
    try {
      // Redirect to Shopify products for real data
      const response = await fetch(`${req.protocol}://${req.get('host')}/api/shopify/products?limit=10`);
      const products = await response.json();
      res.json({ products });
    } catch (error) {
      console.error("Get products error:", error);
      // Fallback to storage if Shopify fails
      try {
        const products = await storage.getAllProducts();
        res.json({ products });
      } catch (storageError) {
        res.status(500).json({ error: "Failed to fetch products" });
      }
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      // Try Shopify first
      const response = await fetch(`${req.protocol}://${req.get('host')}/api/shopify/products/${req.params.id}`);
      if (response.ok) {
        const product = await response.json();
        res.json({ product });
        return;
      }
    } catch (error) {
      console.log("Shopify fetch failed, trying storage...");
    }
    
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json({ product });
    } catch (error) {
      console.error("Get product error:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Health check with Shopify status
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "OK", 
      timestamp: new Date().toISOString(),
      shopify: {
        configured: !!(SHOPIFY_DOMAIN && STOREFRONT_ACCESS_TOKEN),
        domain: SHOPIFY_DOMAIN ? `${SHOPIFY_DOMAIN.substring(0, 10)}...` : 'Not configured'
      }
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
