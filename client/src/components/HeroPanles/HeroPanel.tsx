import React, { useEffect, useState } from "react";

type Slide = {
  id: number;
  image: string;
  title?: string;
  subtitle?: string;
};

interface HeroSliderProps {
  slides: Slide[];
  interval?: number;
}

const HeroPanel: React.FC<HeroSliderProps> = ({ slides, interval = 5000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [slides.length, interval]);

  const handleSelect = (selectedIndex: number) => {
    setActiveIndex(selectedIndex);
  };

  return (
    <div className="relative w-full h-[400px] lg:h-[500px] overflow-hidden rounded-lg shadow-md mt-4">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-full flex-shrink-0 relative h-[400px] lg:h-[500px]"
          >
            <img
              src={slide.image}
              alt={`Slide ${slide.id}`}
              className="w-full h-full object-cover"
            />
            {(slide.title || slide.subtitle) && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-8 text-white">
                {slide.title && (
                  <h3 className="text-3xl font-bold">{slide.title}</h3>
                )}
                {slide.subtitle && (
                  <p className="text-lg mt-2">{slide.subtitle}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              activeIndex === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroPanel;
