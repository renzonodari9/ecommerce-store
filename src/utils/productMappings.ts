interface ProductMapping {
  name: string;
  image: string;
  category: string;
}

export const productMappings: ProductMapping[] = [
  {
    name: 'iPhone 15 Pro Max',
    image: '/images/iPhone15ProMax.svg',
    category: 'Electronics',
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    image: '/images/SamsungGalaxyS24Ultra.svg',
    category: 'Electronics',
  },
  {
    name: 'MacBook Pro 16"',
    image: '/images/MacBookPro16.svg',
    category: 'Electronics',
  },
  {
    name: 'Sony WH-1000XM5',
    image: '/images/SonyWH1000XM5.svg',
    category: 'Electronics',
  },
  {
    name: 'Nike Air Max 270',
    image: '/images/NikeAirMax270.svg',
    category: 'Clothing',
  },
  {
    name: 'Adidas Ultraboost',
    image: '/images/AdidasUltraboost.svg',
    category: 'Clothing',
  },
  {
    name: 'iPad Pro 12.9"',
    image: '/images/iPadPro129.svg',
    category: 'Electronics',
  },
  {
    name: 'Apple Watch Ultra 2',
    image: '/images/AppleWatchUltra2.svg',
    category: 'Electronics',
  },
  {
    name: 'Bose QuietComfort',
    image: '/images/BoseQuietComfort.svg',
    category: 'Electronics',
  },
  {
    name: 'LG C3 OLED 55"',
    image: '/images/LGC3OLED55.svg',
    category: 'Electronics',
  },
  {
    name: 'PlayStation 5',
    image: '/images/PlayStation5.svg',
    category: 'Electronics',
  },
  {
    name: 'Xbox Series X',
    image: '/images/XboxSeriesX.svg',
    category: 'Electronics',
  },
];

export function applyProductMapping(product: any, index: number = 0): any {
  if (index < productMappings.length) {
    const mapping = productMappings[index];
    return {
      ...product,
      name: mapping.name,
      images: [mapping.image],
      category: { ...product.category, name: mapping.category },
    };
  }
  return product;
}

export function applyProductMappings(products: any[]): any[] {
  return products.map((product, index) => applyProductMapping(product, index));
}
