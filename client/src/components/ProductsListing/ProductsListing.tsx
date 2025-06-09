import { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import slugify from "slugify";
import ProductCard from "../Products/ProductCard";
import { FilterSidebar } from "./FilterSidebar";
import { Brand } from "../types";
import { useProducts } from "../../hooks/hookProducts";
import { useCategories } from "../../hooks/hookCategory";
import { useSearchParams } from "react-router-dom";

const ProductsListing = () => {
  const { products, loading } = useProducts();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q")?.toLowerCase() || "";

  const { name, category, subcategory } = useParams<{
    name?: string;
    category?: string;
    subcategory?: string;
  }>();

  const routeCategory = name ?? subcategory ?? category;

  const { categories } = useCategories();
  const maxPrice = Math.max(...products.map((p) => p.price), 2000);

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeSubCategory, setActiveSubCategory] = useState<string>("All");
  const [activeBrands, setActiveBrands] = useState<Brand[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortOption, setSortOption] = useState<string>("default");

  const displayedBrands = useMemo(() => {
    const uniqueBrands = Array.from(
      new Map(products.map((p) => [p.brand.id, p.brand])).values()
    );
    return uniqueBrands;
  }, [products]);

  const displayedSubcategories = useMemo(() => {
    if (activeCategory === "All") return [];
    const categoryObj = categories.find((cat) => cat.name === activeCategory);
    return categoryObj?.subcategories ?? [];
  }, [activeCategory, categories]);

  const resetFilters = () => {
    setActiveCategory("All");
    setActiveSubCategory("All");
    setActiveBrands([]);
    setPriceRange([0, maxPrice]);
    setMinRating(0);
  };

  useEffect(() => {
    resetFilters();

    if (routeCategory) {
      const decoded = decodeURIComponent(routeCategory);
      const decodedSlug = slugify(decoded, { lower: true });

      const categoryObj = categories.find((cat) => {
        const catSlug = slugify(cat.name, { lower: true });
        if (catSlug === decodedSlug) return true;
        return (cat.subcategories ?? []).some(
          (sub) => slugify(sub.name, { lower: true }) === decodedSlug
        );
      });

      if (categoryObj) {
        const catSlug = slugify(categoryObj.name, { lower: true });
        if (catSlug === decodedSlug) {
          setActiveCategory(categoryObj.name);
          setActiveSubCategory("All");
        } else {
          const matchedSub = (categoryObj.subcategories ?? []).find(
            (sub) => slugify(sub.name, { lower: true }) === decodedSlug
          );
          setActiveCategory(categoryObj.name);
          setActiveSubCategory(matchedSub ? matchedSub.name : "All");
        }
      }
    }
  }, [routeCategory, maxPrice, categories]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory =
        activeCategory === "All" || product.category.name === activeCategory;

      const matchSubCategory =
        activeSubCategory === "All" ||
        (product.subcategory && product.subcategory.name === activeSubCategory);

      const matchBrand =
        activeBrands.length === 0 ||
        activeBrands.some((b) => b.id === product.brand.id);

      const matchPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      const matchRating = product.rating >= minRating;

      const matchQuery =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery);

      return (
        matchCategory &&
        matchSubCategory &&
        matchBrand &&
        matchPrice &&
        matchRating &&
        matchQuery
      );
    });
  }, [
    products,
    activeCategory,
    activeBrands,
    activeSubCategory,
    priceRange,
    minRating,
    searchQuery, // ← important
  ]);

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

  // Pagination
  const productsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    activeCategory,
    activeSubCategory,
    activeBrands,
    priceRange,
    minRating,
    sortOption,
  ]);

  if (loading) return <p>Loading...</p>;

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
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex flex-wrap justify-center items-center mt-6 gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded bg-blue-500 text-white disabled:opacity-50"
                >
                  Previous
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((pageNum) => {
                  const shouldShow =
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    Math.abs(pageNum - currentPage) <= 1;

                  if (!shouldShow && Math.abs(pageNum - currentPage) === 2) {
                    return (
                      <span key={`ellipsis-${pageNum}`} className="px-2">
                        ...
                      </span>
                    );
                  }

                  if (!shouldShow) return null;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1 rounded ${
                        currentPage === pageNum
                          ? "bg-blue-700 text-white"
                          : "bg-white border text-blue-500"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded bg-blue-500 text-white disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
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
