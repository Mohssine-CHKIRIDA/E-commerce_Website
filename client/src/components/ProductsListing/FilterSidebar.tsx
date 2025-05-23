import { Link } from "react-router-dom";
import { routes } from "../../Routing/Routing";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";
interface CategoryData {
  id: number;
  name: string;
  icon: React.ElementType;
  imageUrl: string;
  subcategories: string[];
  brands: string[]; // Ajout ici
}

interface FilterSidebarProps {
  categories: CategoryData[];
  brands: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  subcategories: string[]; // ➕
  activeSubCategory: string; // ➕
  setActiveSubCategory: (subcat: string) => void; // ➕
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
  activeSubCategory,
  setActiveSubCategory,
  activeBrands,
  setActiveBrands,
  priceRange,
  setPriceRange,
  maxPrice,
  minRating,
  setMinRating,
  onResetFilters,
}) => {
  const [openSub, setOpenSub] = useState<string | null>(null);

  const handleBrandToggle = (brand: string) => {
    if (activeBrands.includes(brand)) {
      setActiveBrands(activeBrands.filter((b) => b !== brand));
    } else {
      setActiveBrands([...activeBrands, brand]);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Filters</h2>

      {/* Categories */}
      <fieldset className="mb-6">
        <legend className="font-medium mb-2">Categories</legend>
        <div className="flex flex-col space-y-2">
          <Link
            to={routes.all}
            onClick={() => setActiveCategory("All")}
            className={`block px-2 py-1 rounded hover:bg-gray-200 transition-colors ${
              activeCategory === "All" ? "bg-blue-100 font-semibold" : ""
            }`}
          >
            All
          </Link>
          {categories.map((cat) => {
            const isOpen = openSub === cat.name;

            return (
              <div key={cat.name}>
                <div className="flex justify-between items-center">
                  <Link
                    to={routes.category(cat.name)}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`block px-2 py-1 rounded w-full hover:bg-gray-200 transition-colors ${
                      activeCategory === cat.name
                        ? "bg-blue-100 font-semibold"
                        : ""
                    }`}
                  >
                    {cat.name}
                  </Link>
                  <button
                    className="ml-2 text-gray-500"
                    onClick={() => setOpenSub(isOpen ? null : cat.name)}
                  >
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
                {isOpen && cat.subcategories.length > 0 && (
                  <ul className="ml-4 mt-1 space-y-1">
                    {cat.subcategories.map((sub) => (
                      <li key={sub}>
                        <Link
                          to={routes.subcategory(cat.name, sub)}
                          onClick={() => {
                            setActiveCategory(cat.name);
                            setActiveSubCategory(sub);
                          }}
                          className={`block px-2 py-1 text-sm rounded ${
                            activeSubCategory === sub
                              ? "bg-blue-100 font-semibold"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {sub}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
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
              />
              {brand}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Price Range */}
      <fieldset className="mb-6">
        <legend className="font-medium mb-2">Price Range</legend>
        <div className="space-y-2">
          <input
            type="range"
            min={0}
            max={maxPrice}
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
          />
          <input
            type="range"
            min={0}
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
          />
          <div className="text-sm">
            ${priceRange[0]} - ${priceRange[1]}
          </div>
        </div>
      </fieldset>

      {/* Rating */}
      <fieldset className="mb-6">
        <legend className="font-medium mb-2">Minimum Rating</legend>
        <input
          type="range"
          min={0}
          max={5}
          step={0.5}
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
        />
        <div className="text-sm">{minRating}★</div>
      </fieldset>

      <button
        onClick={onResetFilters}
        className="mt-4 text-sm text-blue-600 hover:underline"
      >
        Reset Filters
      </button>
    </div>
  );
};
