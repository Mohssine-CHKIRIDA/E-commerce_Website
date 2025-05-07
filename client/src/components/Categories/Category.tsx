import { useState } from "react";

interface Category {
  name: string;
  icon: React.ElementType;
  subcategories: string[];
}

interface Props {
  categories: Category[];
  interval?: number;

  onSelected: (item: string) => void;
}

export default function CategoryMenu({ categories, onSelected }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative w-[280px] bg-white rounded-lg shadow-md m-2 overflow-visible">
      <ul className="list-none p-0 m-0 z-10 relative">
        {categories.map((cat, index) => {
          const Icon = cat.icon;

          return (
            <div
              key={cat.name}
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Category Item */}
              <li
                onClick={() => onSelected(cat.name)}
                className={`flex justify-between items-center px-5 py-3 text-sm cursor-pointer transition-colors ${
                  hoveredIndex === index
                    ? "bg-gray-100 text-orange-500"
                    : "text-gray-800"
                } hover:bg-gray-100 hover:text-orange-500`}
              >
                <span className="flex items-center gap-2">
                  <Icon
                    size={16}
                    color={hoveredIndex === index ? "#f68b1e" : "#333"}
                  />
                  {cat.name}
                </span>
                <span>&gt;</span>
              </li>

              {hoveredIndex === index && cat.subcategories.length > 0 && (
                <ul className="absolute left-full top-0 w-44 max-h-[300px] overflow-y-auto bg-white border-l border-gray-200 shadow-lg z-50 transition-all duration-200">
                  {cat.subcategories.map((sub) => (
                    <li
                      key={sub}
                      onClick={() => onSelected(sub)}
                      className="px-5 py-3 text-sm text-gray-800 hover:bg-gray-100 hover:text-orange-500 cursor-pointer"
                    >
                      {sub}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </ul>
    </div>
  );
}
