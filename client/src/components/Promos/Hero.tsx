import HeroSlider from "../HeroPanles/HeroPanel";
import CategoryMenu from "../Categories/Category";
import { slides } from "../HeroPanles/panels";
import { useCategories } from "../../hooks/hookCategory";

export default function Hero() {
  const { categories } = useCategories();

  return (
    <section className="bg-gray-100 px-5 py-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-5">
        {/* Category Menu */}
        <div className="w-full lg:w-[280px] shrink-0">
          <CategoryMenu categories={categories} />
        </div>

        <div className="flex-1">
          <HeroSlider slides={slides} interval={3000} />
        </div>
      </div>
    </section>
  );
}
