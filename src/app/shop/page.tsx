import ShopLayout from "@/components/shop/ShopLayout";

import {
  getAllBrands,
  getAllCategories,
  getAllProducts,
} from "@/services/product.service";


interface SearchParams {
  search?: string;
  brand?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
}


export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {


  const params =
    await searchParams;


  const [
    products,
    brands,
    categories,
  ] = await Promise.all([
    getAllProducts(),
    getAllBrands(),
    getAllCategories(),
  ]);



  let filteredProducts =
    products.map((product) => ({

      ...product,

      price:
        Number(product.price),

      images:
        product.images.map(
          (image) => ({
            ...image,
          })
        ),

      brand: {
        name:
          product.brand?.name ??
          "Unknown Brand",
      },

      category: {
        name:
          product.category?.name ??
          "Uncategorized",
      },

    }));



  // SEARCH

  if (params.search) {

    const search =
      params.search.toLowerCase();


    filteredProducts =
      filteredProducts.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(search) ||

          product.brand.name
            .toLowerCase()
            .includes(search)
      );

  }



  // BRAND FILTER

  if (params.brand) {

    filteredProducts =
      filteredProducts.filter(
        (product) =>
          product.brand.name
            .toLowerCase()
            .replaceAll(" ", "-") ===
          params.brand
      );

  }



  // CATEGORY FILTER

  if (params.category) {

    filteredProducts =
      filteredProducts.filter(
        (product) =>
          product.category.name
            .toLowerCase()
            .replaceAll(" ", "-") ===
          params.category
      );

  }




  // PRICE FILTER

  if (params.minPrice) {

    filteredProducts =
      filteredProducts.filter(
        (product) =>
          product.price >=
          Number(params.minPrice)
      );

  }


  if (params.maxPrice) {

    filteredProducts =
      filteredProducts.filter(
        (product) =>
          product.price <=
          Number(params.maxPrice)
      );

  }




  // SORT

  switch(params.sort) {


    case "price-asc":

      filteredProducts.sort(
        (a,b) =>
          a.price - b.price
      );

      break;



    case "price-desc":

      filteredProducts.sort(
        (a,b) =>
          b.price - a.price
      );

      break;



    case "name":

      filteredProducts.sort(
        (a,b) =>
          a.name.localeCompare(
            b.name
          )
      );

      break;



    case "best-seller":

      filteredProducts.sort(
        (a,b) =>
          Number(
            b.bestSeller
          ) -
          Number(
            a.bestSeller
          )
      );

      break;



    case "featured":

      filteredProducts.sort(
        (a,b) =>
          Number(
            b.featured
          ) -
          Number(
            a.featured
          )
      );

      break;


  }




  return (

    <ShopLayout

      products={
        filteredProducts
      }

      brands={
        brands
      }

      categories={
        categories
      }

    />

  );

}