import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import slugify from "slugify";

import ProductCard, { ProductProps } from "../Products/ProductCard";
import { Products } from "../Products/Products";
import { FilterSidebar } from "./FilterSidebar";
import { categories } from "../Categories/cat";

const ProductsListing = () => {
  const { name, parent, child } = useParams<{
    name?: string;
    parent?: string;
    child?: string;
  }>();

  const routeCategory = name ?? child ?? parent;
  const navigate = useNavigate();
  const [products] = useState<ProductProps[]>(Products);

  // Max price computed from products dynamically
  const maxPrice = Math.max(...products.map((p) => p.price), 2000);

  // Filters state
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeSubCategory, setActiveSubCategory] = useState<string>("All");
  const [activeBrands, setActiveBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortOption, setSortOption] = useState<string>("default");

  // Displayed brands depend on active category
  const [displayedBrands, setDisplayedBrands] = useState<string[]>([
    ...new Set(products.map((p) => p.brand)),
  ]);

  // Update displayed brands & reset brand filters when category changes
  useEffect(() => {
    if (activeCategory === "All") {
      const allBrands = [...new Set(products.map((p) => p.brand))];
      setDisplayedBrands(allBrands);
    } else {
      const categoryObj = categories.find(
        (cat) =>
          cat.name === activeCategory ||
          cat.subcategories.includes(activeCategory)
      );
      if (categoryObj) {
        setDisplayedBrands(categoryObj.brands ?? []);
      } else {
        setDisplayedBrands([]);
      }
    }
    setActiveBrands([]); // Reset brands when category changes
  }, [activeCategory, products]);

  // Sync filters with URL param on mount or when routeCategory changes
  useEffect(() => {
    if (routeCategory) {
      const decoded = decodeURIComponent(routeCategory);
      const decodedSlug = slugify(decoded, { lower: true });

      const categoryObj = categories.find((cat) => {
        const catSlug = slugify(cat.name, { lower: true });
        if (catSlug === decodedSlug) return true;
        return cat.subcategories.some(
          (sub) => slugify(sub, { lower: true }) === decodedSlug
        );
      });

      if (categoryObj) {
        if (slugify(categoryObj.name, { lower: true }) === decodedSlug) {
          setActiveCategory(categoryObj.name);
          setActiveSubCategory("All");
        } else {
          const matchedSub = categoryObj.subcategories.find(
            (sub) => slugify(sub, { lower: true }) === decodedSlug
          );
          setActiveCategory(categoryObj.name);
          setActiveSubCategory(matchedSub ?? "All");
        }
      } else {
        setActiveCategory("All");
        setActiveSubCategory("All");
      }
      setActiveBrands([]);
      setPriceRange([0, maxPrice]);
      setMinRating(0);
    } else {
      setActiveCategory("All");
      setActiveSubCategory("All");
      setActiveBrands([]);
      setPriceRange([0, maxPrice]);
      setMinRating(0);
    }
  }, [routeCategory, maxPrice]);

  // Update URL when category or subcategory changes
  useEffect(() => {
    if (activeCategory === "All") {
      navigate("/products");
    } else {
      if (activeSubCategory === "All") {
        const catSlug = slugify(activeCategory, { lower: true });
        navigate(`/products/${catSlug}`);
      } else {
        const catSlug = slugify(activeCategory, { lower: true });
        const subSlug = slugify(activeSubCategory, { lower: true });
        navigate(`/products/${catSlug}/${subSlug}`);
        // Alternatively, if you want both cat and sub in URL,
        // you can do something like `/products/${catSlug}/${subSlug}`
      }
    }
  }, [activeCategory, activeSubCategory, navigate]);

  // Memoized subcategories for sidebar filter display
  const displayedSubcategories = useMemo(() => {
    if (activeCategory === "All") return [];
    const categoryObj = categories.find((cat) => cat.name === activeCategory);
    return categoryObj?.subcategories ?? [];
  }, [activeCategory]);

  const resetFilters = () => {
    setActiveCategory("All");
    setActiveSubCategory("All");
    setActiveBrands([]);
    setPriceRange([0, maxPrice]);
    setMinRating(0);
  };

  // Filter products by all active filters
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (activeCategory !== "All" && product.category !== activeCategory) {
        return false;
      }
      if (
        activeSubCategory !== "All" &&
        product.subcategory &&
        product.subcategory !== activeSubCategory
      ) {
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
  }, [
    products,
    activeCategory,
    activeBrands,
    activeSubCategory,
    priceRange,
    minRating,
  ]);

  // Sort filtered products
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
            brands={displayedBrands}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            subcategories={displayedSubcategories}
            activeSubCategory={activeSubCategory}
            setActiveSubCategory={setActiveSubCategory}
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

        <div className="flex-grow">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">
              {sortedProducts.length} products found
            </p>
            <select
              className="border rounded-md px-2 py-1"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
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
