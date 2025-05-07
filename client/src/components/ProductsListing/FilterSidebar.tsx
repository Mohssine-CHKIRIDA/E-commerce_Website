interface FilterSidebarProps {
  categories: string[];
  brands: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  activeBrands: string[];
  setActiveBrands: (brands: string[]) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  maxPrice: number;
  minRating: number;
  setMinRating: (rating: number) => void;
  onResetFilters: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  brands,
  activeCategory,
  setActiveCategory,
  activeBrands,
  setActiveBrands,
  priceRange,
  setPriceRange,
  maxPrice,
  minRating,
  setMinRating,
  onResetFilters,
}) => {
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleBrandToggle = (brand: string) => {
    if (activeBrands.includes(brand)) {
      setActiveBrands(activeBrands.filter((b) => b !== brand));
    } else {
      setActiveBrands([...activeBrands, brand]);
    }
  };

  const handlePriceChange = (value: number, isMax: boolean) => {
    if (isMax) {
      setPriceRange([priceRange[0], value]);
    } else {
      setPriceRange([value, priceRange[1]]);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Filters</h2>

      {/* Categories */}
      <fieldset className="mb-6">
        <legend className="font-medium mb-2">Categories</legend>
        <div className="flex flex-col space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="category"
              checked={activeCategory === "All"}
              onChange={() => handleCategoryChange("All")}
              className="mr-2"
              aria-label="All categories"
            />
            All
          </label>
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                checked={activeCategory === category}
                onChange={() => handleCategoryChange(category)}
                className="mr-2"
                aria-label={category}
              />
              {category}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Brands */}
      <fieldset className="mb-6">
        <legend className="font-medium mb-2">Brands</legend>
        <div className="flex flex-col space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center">
              <input
                type="checkbox"
                checked={activeBrands.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
                className="mr-2"
                aria-label={brand}
              />
              {brand}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Price Range */}
      <fieldset className="mb-6">
        <legend className="font-medium mb-2">Price Range</legend>
        <div className="flex items-center space-x-2 mb-2">
          <span>${priceRange[0].toFixed(2)}</span>
          <span>-</span>
          <span>${priceRange[1].toFixed(2)}</span>
        </div>
        <div className="space-y-2">
          <input
            type="range"
            min={0}
            max={maxPrice}
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(Number(e.target.value), false)}
            className="w-full"
            aria-label="Minimum price"
          />
          <input
            type="range"
            min={0}
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(Number(e.target.value), true)}
            className="w-full"
            aria-label="Maximum price"
          />
        </div>
      </fieldset>

      {/* Minimum Rating */}
      <fieldset>
        <legend className="font-medium mb-2">Minimum Rating</legend>
        <div className="flex items-center space-x-2">
          <input
            type="range"
            min={0}
            max={5}
            step={0.5}
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="w-full"
            aria-label="Minimum rating"
          />
          <span>{minRating.toFixed(1)}★</span>
        </div>
      </fieldset>

      {/* Reset Filters */}
      <button
        onClick={onResetFilters}
        className="mt-4 text-sm text-blue-600 hover:underline"
        aria-label="Reset all filters"
      >
        Reset Filters
      </button>
    </div>
  );
};
