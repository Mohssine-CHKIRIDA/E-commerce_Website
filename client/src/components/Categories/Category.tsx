import { useState } from "react";
import { Link } from "react-router-dom";
import { routes } from "../../Routing/Routing";
import { Category } from "../types";

interface Props {
  categories: Category[];
}

export default function CategoryMenu({ categories }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav className="relative w-[280px] bg-white rounded-lg shadow-md m-2">
      <ul className="list-none p-0 m-0">
        {categories.map((cat, index) => {
          return (
            <li
              key={cat.name}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group"
            >
              <Link
                to={routes.category(cat.name)}
                className={`text-left flex justify-between items-center px-5 py-3 text-sm transition-colors duration-200 ${
                  hoveredIndex === index
                    ? "bg-gray-100 text-orange-500"
                    : "text-gray-800"
                } hover:bg-gray-100 hover:text-orange-500`}
              >
                <span className="flex items-center gap-2">{cat.name}</span>
                <span>&gt;</span>
              </Link>

              {hoveredIndex === index && cat.subcategories != null && (
                <ul className="absolute left-full top-0 w-44 max-h-[300px] overflow-y-auto bg-white border-l border-gray-200 shadow-lg z-50">
                  {cat.subcategories.map((sub) => (
                    <li key={sub.id}>
                      <Link
                        to={routes.subcategory(cat.name, sub.name)}
                        className="block w-full text-left px-5 py-3 text-sm text-gray-800 hover:bg-gray-100 hover:text-orange-500 transition-colors duration-200"
                      >
                        {sub.name}
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
