// Direct Shopify Storefront API integration for static deployment
// This file replaces the server-proxy approach with direct API calls

const SHOPIFY_STORE_DOMAIN = 'jufprz-44.myshopify.com';
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = '3f686c1deba9e9533ccf323c9a0c86e6';
const SHOPIFY_STOREFRONT_API_VERSION = '2024-01';

const STOREFRONT_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_STOREFRONT_API_VERSION}/graphql.json`;

// GraphQL query to fetch products
const PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          availableForSale
          productType
          vendor
          tags
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
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
          variants(first: 10) {
            edges {
              node {
                id
                title
                availableForSale
                quantityAvailable
                sku
                priceV2 {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
                image {
                  url
                  altText
                }
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

// GraphQL query to fetch a single product by handle
const PRODUCT_BY_HANDLE_QUERY = `
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      availableForSale
      productType
      vendor
      tags
      totalInventory
      priceRange {
        minVariantPrice {
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
      variants(first: 20) {
        edges {
          node {
            id
            title
            availableForSale
            quantityAvailable
            sku
            priceV2 {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
            }
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
`;

// Helper function to make GraphQL requests
async function shopifyFetch(query: string, variables: any = {}) {
  try {
    const response = await fetch(STOREFRONT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
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

    return data.data;
  } catch (error) {
    console.error('Shopify fetch error:', error);
    throw error;
  }
}

// Transform edge-based response to simpler format
function transformEdges(edges: any[]) {
  return edges.map(edge => edge.node);
}

// Export functions that match the existing API
export async function getProducts(limit: number = 10) {
  try {
    const data = await shopifyFetch(PRODUCTS_QUERY, { first: limit });
    const products = transformEdges(data.products.edges);
    
    // Transform to match existing format
    return products.map(product => ({
      ...product,
      images: transformEdges(product.images.edges),
      variants: transformEdges(product.variants.edges),
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return mock data for development
    return getMockProducts();
  }
}

export async function getProductByHandle(handle: string) {
  try {
    const data = await shopifyFetch(PRODUCT_BY_HANDLE_QUERY, { handle });
    const product = data.productByHandle;
    
    if (!product) {
      throw new Error('Product not found');
    }
    
    // Transform to match existing format
    return {
      ...product,
      images: transformEdges(product.images.edges),
      variants: transformEdges(product.variants.edges),
    };
  } catch (error) {
    console.error('Error fetching product by handle:', error);
    // Return mock data for development
    return getMockProductByHandle(handle);
  }
}

// Mock data for development/fallback
function getMockProducts() {
  return [
    {
      id: 'mock-1',
      handle: 'plastik-strohhalm',
      title: 'CleanSip Premium Strohhalme',
      description: 'Die Revolution des stabilen Trinkens',
      availableForSale: true,
      productType: 'Strohhalme',
      vendor: 'CleanSip',
      tags: ['Premium', 'Stabil', 'Swiss Made'],
      priceRange: {
        minVariantPrice: {
          amount: '14.99',
          currencyCode: 'CHF'
        }
      },
      images: [
        {
          id: 'img-1',
          url: '/images/Produktbild-schwarzer-Strohhalm_1753910576700.jpg',
          altText: 'CleanSip Schwarze Strohhalme',
          width: 1200,
          height: 800
        }
      ],
      variants: [
        {
          id: 'var-1',
          title: 'Schwarz - 100 Stück',
          availableForSale: true,
          quantityAvailable: 100,
          sku: 'CS-BLACK-100',
          priceV2: {
            amount: '14.99',
            currencyCode: 'CHF'
          },
          selectedOptions: [
            { name: 'Farbe', value: 'Schwarz' },
            { name: 'Menge', value: '100 Stück' }
          ]
        }
      ],
      options: [
        { id: 'opt-1', name: 'Farbe', values: ['Schwarz', 'Weiss', 'Bunt'] },
        { id: 'opt-2', name: 'Menge', values: ['100 Stück', '200 Stück', '500 Stück'] }
      ]
    }
  ];
}

function getMockProductByHandle(handle: string) {
  const products = getMockProducts();
  return products.find(p => p.handle === handle) || products[0];
}

// Re-export the transform function from the original file
export { transformShopifyProduct } from './shopify';