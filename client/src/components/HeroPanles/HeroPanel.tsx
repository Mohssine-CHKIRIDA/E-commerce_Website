import React, { useEffect, useState, useCallback } from "react";

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
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [slides.length, interval, isPaused]);

  // Handle manual slide selection
  const handleSelect = useCallback((selectedIndex: number) => {
    setActiveIndex(selectedIndex);
  }, []);

  // Pause slider on hover, resume on mouse leave
  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Handle previous/next navigation
  const goToPrevious = useCallback(() => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  }, [slides.length]);

  const goToNext = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevious, goToNext]);

  return (
    <div
      className="relative w-full h-[400px] lg:h-[500px] overflow-hidden rounded-lg shadow-md mt-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0 relative h-full">
            <img
              src={slide.image}
              alt={slide.title || `Slide ${slide.id}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {(slide.title || slide.subtitle) && (
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60 flex flex-col justify-end p-8 text-white">
                {slide.title && (
                  <h3 className="text-2xl md:text-3xl font-bold">
                    {slide.title}
                  </h3>
                )}
                {slide.subtitle && (
                  <p className="text-base md:text-lg mt-2 max-w-2xl">
                    {slide.subtitle}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Navigation arrows */}
      {slides.length > 1 && isPaused && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/30 text-white rounded-full hover:bg-black/50 focus:outline-none"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/30 text-white rounded-full hover:bg-black/50 focus:outline-none"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              className={`w-3 h-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white ${
                activeIndex === index
                  ? "bg-white"
                  : "bg-gray-400 hover:bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={activeIndex === index ? "true" : "false"}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroPanel;
