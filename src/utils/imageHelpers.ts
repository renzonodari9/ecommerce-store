const productImages: Record<string, string> = {
  'iPhone 15 Pro Max': '/images/iPhone15ProMax.svg',
  'Samsung Galaxy S24 Ultra': '/images/SamsungGalaxyS24Ultra.svg',
  'MacBook Pro 16"': '/images/MacBookPro16.svg',
  'Sony WH-1000XM5': '/images/SonyWH1000XM5.svg',
  'Nike Air Max 270': '/images/NikeAirMax270.svg',
  'Adidas Ultraboost': '/images/AdidasUltraboost.svg',
  'iPad Pro 12.9"': '/images/iPadPro129.svg',
  'Apple Watch Ultra 2': '/images/AppleWatchUltra2.svg',
  'Bose QuietComfort': '/images/BoseQuietComfort.svg',
  'LG C3 OLED 55"': '/images/LGC3OLED55.svg',
  'PlayStation 5': '/images/PlayStation5.svg',
  'Xbox Series X': '/images/XboxSeriesX.svg',
};

const categoryImages: Record<string, string[]> = {
  'Electronics': [
    'https://picsum.photos/seed/electronics1/400/400',
    'https://picsum.photos/seed/electronics2/400/400',
    'https://picsum.photos/seed/electronics3/400/400',
  ],
  'Clothing': [
    'https://picsum.photos/seed/clothing1/400/400',
    'https://picsum.photos/seed/clothing2/400/400',
    'https://picsum.photos/seed/clothing3/400/400',
  ],
  'Accessories': [
    'https://picsum.photos/seed/accessories1/400/400',
    'https://picsum.photos/seed/accessories2/400/400',
    'https://picsum.photos/seed/accessories3/400/400',
  ],
  'Categoria': [
    'https://picsum.photos/seed/cat1/400/400',
    'https://picsum.photos/seed/cat2/400/400',
  ],
  'default': [
    'https://picsum.photos/seed/product/400/400',
  ],
};

export function getProductImage(product: { images?: string[]; category?: { name: string }; id?: string; name?: string }): string {
  if (product.images && product.images.length > 0 && product.images[0]) {
    return product.images[0];
  }
  
  if (product.name && productImages[product.name]) {
    return productImages[product.name];
  }
  
  const categoryName = product.category?.name || 'default';
  const images = categoryImages[categoryName] || categoryImages['default'];
  const index = product.id ? product.id.charCodeAt(0) % images.length : 0;
  
  return images[index];
}
