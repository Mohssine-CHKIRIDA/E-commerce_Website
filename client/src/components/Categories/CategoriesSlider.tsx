import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { HiArrowSmallRight, HiArrowSmallLeft } from "react-icons/hi2";

interface Cat {
  id: number;
  name: string;
  imageUrl: string;
  subtitle?: string;
}

interface Props {
  categorie: Cat[];
  interval?: number;
}

export default function SubHero({ categorie, interval = 5000 }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleItems = 3;

  useEffect(() => {
    if (categorie.length === 0) return;
    const timer = setInterval(() => {
      setActiveIndex(
        (prevIndex) =>
          (prevIndex + 1) % Math.ceil(categorie.length / visibleItems)
      );
    }, interval);
    return () => clearInterval(timer);
  }, [categorie.length, interval, visibleItems]);

  const totalSlides = Math.ceil(categorie.length / visibleItems);

  const goNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const goPrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Shop by Category
          </h2>
          <p className="text-gray-600 mt-2">Explore our curated collections</p>
        </div>

        <a
          href="/products"
          className="group mt-4 md:mt-0 flex items-center text-indigo-600 font-medium"
        >
          View all categories
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
      <div className="relative w-full overflow-hidden rounded-lg shadow-md mt-4">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${activeIndex * (100 / visibleItems)}%)`,
          }}
        >
          {categorie.map((cate) => (
            <div
              key={cate.id}
              className="flex-shrink-0 w-[calc(100%/3)] p-4" // If you change visibleItems, change here too
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-md h-full flex flex-col hover:scale-105 transition-transform">
                <div className="h-48 w-full overflow-hidden">
                  <img
                    src={cate.imageUrl}
                    alt={`cate ${cate.id}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h3 className="text-xl font-bold mb-2">{cate.name}</h3>
                  {cate.subtitle && (
                    <p className="text-gray-600 text-sm">{cate.subtitle}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={goPrev}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
          aria-label="Previous Slide"
        >
          <HiArrowSmallLeft className="w-6 h-6" />
        </button>

        <button
          onClick={goNext}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition"
          aria-label="Next Slide"
        >
          <HiArrowSmallRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
