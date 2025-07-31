// CleanSip Shopify Integration - Server-side proxy approach for security
// Environment variables are accessed server-side for security

// Re-export functions from the direct API implementation
export { getProducts, getProductByHandle } from './shopify-direct';

// Transform Shopify product to CleanSip format with rebellious branding
export function transformShopifyProduct(shopifyProduct: any) {
  if (!shopifyProduct) return null;
  
  const basePrice = parseFloat(shopifyProduct.priceRange.minVariantPrice.amount);
  const currency = shopifyProduct.priceRange.minVariantPrice.currencyCode;

  // Focus on color variants for CleanSip's product approach
  const colorVariants = shopifyProduct.variants?.reduce((acc: any, variant: any) => {
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
  }, {}) || {};

  const availableColors = Object.keys(colorVariants);
  
  return {
    id: shopifyProduct.handle,
    title: shopifyProduct.title,
    subtitle: `${availableColors.length > 1 ? `${availableColors.length} Farben verfügbar - ` : ''}Die Unbeugsamen`,
    handle: shopifyProduct.handle,
    description: shopifyProduct.description,
    descriptionHtml: enhanceProductDescription(shopifyProduct, availableColors.length),
    price: basePrice,
    currency,
    availableForSale: shopifyProduct.availableForSale,
    totalInventory: shopifyProduct.totalInventory,
    productType: shopifyProduct.productType,
    vendor: shopifyProduct.vendor,
    tags: shopifyProduct.tags || [],
    
    // Enhanced images with proper alt text
    images: shopifyProduct.images?.map((image: any) => ({
      id: image.id,
      url: image.url,
      altText: image.altText || `${shopifyProduct.title} - CleanSip Premium Strohhalme`,
      width: image.width,
      height: image.height,
    })) || [],
    
    // Color-focused variants for CleanSip
    colorVariants,
    availableColors,
    defaultColor: availableColors[0] || null,
    
    // All variants for compatibility
    variants: shopifyProduct.variants || [],
    
    // Product options
    options: shopifyProduct.options || [],
    
    // CleanSip specific features
    features: generateCleanSipFeatures(shopifyProduct, availableColors.length),
    rebelliousScore: calculateRebelliousScore(shopifyProduct, availableColors.length),
    
    // Swiss pricing display
    pricePerUnit: calculatePricePerUnit(basePrice, shopifyProduct.variants),
  };
}

// Generate CleanSip-specific features based on product data
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

  // Add quantity-based feature
  const firstVariant = product.variants?.[0];
  if (firstVariant?.selectedOptions) {
    const quantityOption = firstVariant.selectedOptions.find((opt: any) => 
      opt.name.toLowerCase().includes('size') || 
      opt.name.toLowerCase().includes('pack') ||
      opt.name.toLowerCase().includes('anzahl')
    );
    if (quantityOption && quantityOption.value.includes('100')) {
      features.push({ 
        icon: 'Package', 
        text: '100 Stück - perfekt für Events' 
      });
    }
  }

  return features;
}

// Calculate how "rebellious" a product is (for CleanSip branding)
function calculateRebelliousScore(product: any, colorCount: number) {
  let score = 50; // Base rebelliousness
  
  // More colors = more rebellious choices
  score += Math.min(colorCount * 10, 30);
  
  // More variants = more rebellion options
  const variantCount = product.variants?.length || 0;
  score += Math.min(variantCount * 3, 20);
  
  // Accessible pricing = rebellion for everyone
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  if (price < 20) score += 20;
  else if (price < 30) score += 10;
  
  return Math.min(score, 100);
}

// Calculate price per unit for Swiss value presentation
function calculatePricePerUnit(basePrice: number, variants: any[]) {
  // Try to find quantity from variant options
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
  
  // Default assumption for straws
  return (basePrice / 100).toFixed(3);
}

// Enhance product description with CleanSip personality
function enhanceProductDescription(product: any, colorCount: number) {
  const baseDescription = product.description || '';
  
  const enhancement = `
    <div class="cleansip-product-story">
      <p><strong>Die Wahrheit über Strohhalme:</strong></p>
      <p>Während andere nach 30 Sekunden aufgeben, bleiben CleanSip Strohhalme standhaft. 
      Entwickelt für Menschen, die keine Lust auf Kompromisse haben.</p>
      
      <h3>Warum CleanSip ${product.title}?</h3>
      <ul>
        <li>🛡️ 100% Formstabil - vom ersten bis zum letzten Schluck</li>
        <li>⚡ In 48h bei dir - aus Schweizer Lager</li>
        <li>💎 Premium-Qualität - BPA-frei & lebensmittelecht</li>
        <li>🎯 Fair - nur CHF ${(parseFloat(product.priceRange.minVariantPrice.amount) / 100).toFixed(3)} pro stabilem Trinkerlebnis</li>
        ${colorCount > 1 ? `<li>🎨 ${colorCount} Farben - für jede rebellische Stimmung</li>` : ''}
      </ul>
      
      ${baseDescription ? `<h3>Produktdetails</h3><div>${baseDescription}</div>` : ''}
      
      <div class="rebellion-guarantee">
        <h3>🔥 CleanSip Rebellion Garantie</h3>
        <p>Sollte ein CleanSip Strohhalm doch mal versagen, ersetzen wir die komplette Packung. 
        Kostenlos. Ohne Diskussion. Das ist unser Wort.</p>
      </div>
    </div>
  `;
  
  return enhancement;
}
