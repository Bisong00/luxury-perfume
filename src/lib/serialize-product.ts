export function serializeProduct(product: any) {
  return {
    ...product,

    price: Number(product.price),

    brand: product.brand
      ? {
          ...product.brand,
        }
      : null,

    category: product.category
      ? {
          ...product.category,
        }
      : null,

    images: product.images?.map((image: any) => ({
      ...image,
    })) || [],
  };
}


export function serializeProducts(products: any[]) {
  return products.map(serializeProduct);
}