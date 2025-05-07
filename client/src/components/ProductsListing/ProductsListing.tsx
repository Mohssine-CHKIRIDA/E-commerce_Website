import { useState, useMemo } from "react";
import ProductCard, { ProductProps } from "../Products/ProductCard";
import { Products } from "../Products/Products";

import { FilterSidebar } from "./FilterSidebar";

const ProductsListing = () => {
  const [products] = useState<ProductProps[]>(Products);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeBrands, setActiveBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortOption, setSortOption] = useState<string>("default");

  const categories = [...new Set(products.map((p) => p.category))];
  const brands = [...new Set(products.map((p) => p.brand))];
  const maxPrice = Math.max(...products.map((p) => p.price));

  const resetFilters = () => {
    setActiveCategory("All");
    setActiveBrands([]);
    setPriceRange([0, maxPrice]);
    setMinRating(0);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (activeCategory !== "All" && product.category !== activeCategory) {
        return false;
      }
      if (activeBrands.length > 0 && !activeBrands.includes(product.brand)) {
        return false;
      }
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      if (product.rating < minRating) {
        return false;
      }
      return true;
    });
  }, [products, activeCategory, activeBrands, priceRange, minRating]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortOption) {
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price);
      case "rating-desc":
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return sorted;
    }
  }, [filteredProducts, sortOption]);

  return (
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
            onResetFilters={resetFilters}
          />
        </div>

        {/* Product grid */}
        <div className="flex-grow">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">
              {sortedProducts.length} products found
            </p>
            <select
              className="border rounded-md px-2 py-1"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              aria-label="Sort products"
            >
              <option value="default">Sort by: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Rating: High to Low</option>
            </select>
          </div>

          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
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
  );
};

export default ProductsListing;
