const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600",
];

export function getProductImageUrl(product: any, index = 0) {
  if (!product) return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
  
  // 1. Priority: Direct image_url (from AI or raw SQL)
  if (typeof product.image_url === 'string' && product.image_url.length > 5) {
    let url = product.image_url;
    // If it's a prefix, skip it and look at images array
    if (url === 'https://cloudinary.images-iherb.com/image/upload/f_auto') {
      // continue to images array
    } else {
      if (url.startsWith('http')) return url;
      if (url.startsWith('q_auto') || url.includes('images/')) {
         return `https://cloudinary.images-iherb.com/image/upload/f_auto,${url}`;
      }
    }
  }

  // 2. Secondary: images array (Prisma/NestJS)
  const images = product.images || [];
  
  // Clean incomplete links (some products have a "prefix link" as the first image)
  const validImages = images.filter((i: any) => 
    i && i.url && 
    i.url !== 'https://cloudinary.images-iherb.com/image/upload/f_auto'
  );

  const preferredImg = validImages.find((i: any) => i.url && (i.url.startsWith('q_auto') || i.url.includes('images/'))) 
                   || validImages.find((i: any) => i.url && i.url.startsWith('http'));

  if (preferredImg) {
    let url = preferredImg.url;
    if (url.startsWith('http')) return url;
    if (url.startsWith('q_auto') || url.includes('images/')) {
       return `https://cloudinary.images-iherb.com/image/upload/f_auto,${url}`;
    }
    return url;
  }

  // 3. Fallback to Unsplash images
  return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
}
