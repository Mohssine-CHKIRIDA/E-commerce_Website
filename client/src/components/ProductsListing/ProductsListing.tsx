import React, { useState } from "react";
import ProductCard, { ProductProps } from "../Products/ProductCard";
import { Products } from "../Products/Products";
import { CartProvider } from "../Cart/CartContext";
import Header from "../Header";
import Footer from "../Footer";
import { FilterSidebar } from "./FilterSidebar";

const ProductsByCategory = () => {
  const [products] = useState<ProductProps[]>(Products);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeBrands, setActiveBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [minRating, setMinRating] = useState<number>(0);

  // Extract unique categories from products
  const categories = [...new Set(products.map((product) => product.category))];

  // Extract unique brands from products
  const brands = [...new Set(products.map((product) => product.brand))];

  // Get max price for range slider
  const maxPrice = Math.max(...products.map((product) => product.price));

  // Filter products based on all criteria
  const filteredProducts = products.filter((product) => {
    // Filter by category
    if (activeCategory !== "All" && product.category !== activeCategory) {
      return false;
    }

    // Filter by brand
    if (activeBrands.length > 0 && !activeBrands.includes(product.brand)) {
      return false;
    }

    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    // Filter by rating
    if (product.rating < minRating) {
      return false;
    }

    return true;
  });

  return (
    <CartProvider>
      <Header />

      <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Products</h1>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-64 flex-shrink-0">
            <FilterSidebar
              categories={categories}
              brands={brands}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              activeBrands={activeBrands}
              setActiveBrands={setActiveBrands}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              maxPrice={maxPrice}
              minRating={minRating}
              setMinRating={setMinRating}
            />
          </div>

          <div className="flex-grow">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                {filteredProducts.length} products found
              </p>
              <select className="border rounded-md px-2 py-1">
                <option value="default">Sort by: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Rating: High to Low</option>
              </select>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <p className="text-gray-600">
                  No products match your filters. Try adjusting your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </CartProvider>
  );
};

export default ProductsByCategory;
