import { useState } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../Routing/Routing";

interface Category {
  name: string;
  icon: React.ElementType;
  subcategories: string[];
}

interface Props {
  categories: Category[];
  onSelected: (item: string) => void;
}

export default function CategoryMenu({ categories, onSelected }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav className="relative w-[280px] bg-white rounded-lg shadow-md m-2">
      <ul className="list-none p-0 m-0">
        {categories.map((cat, index) => {
          const Icon = cat.icon;

          return (
            <li
              key={cat.name}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative"
            >
              <Link
                to={routes.category(cat.name)}
                onClick={() => onSelected(cat.name)}
                className={` text-left flex justify-between items-center px-5 py-3 text-sm transition-colors ${
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
              </Link>

              {hoveredIndex === index && cat.subcategories.length > 0 && (
                <ul className="absolute left-full top-0 w-44 max-h-[300px] overflow-y-auto bg-white border-l border-gray-200 shadow-lg z-50">
                  {cat.subcategories.map((sub) => (
                    <li key={sub}>
                      <Link
                        to={routes.subcategory(cat.name, sub)}
                        onClick={() => onSelected(sub)}
                        className="block w-full text-left px-5 py-3 text-sm text-gray-800 hover:bg-gray-100 hover:text-orange-500"
                      >
                        {sub}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
