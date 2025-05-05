import { Clock } from "lucide-react";
export function HeroPromo() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 to-indigo-700 text-white">
      <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-indigo-500 opacity-30"></div>
      <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-indigo-500 opacity-30"></div>

      <div className="container mx-auto px-4 py-12 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <span className="inline-block px-3 py-1 bg-indigo-500 bg-opacity-30 rounded-full text-sm font-medium">
              Limited Time Offer
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Summer Collection 2025
            </h1>
            <p className="text-lg text-indigo-100 max-w-md">
              Discover our new summer styles with up to 40% off. Fresh looks for
              the season ahead.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-3 bg-white text-indigo-700 rounded-md font-medium hover:bg-indigo-50 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200 focus:outline-none">
                Shop Now
              </button>
              <button className="px-8 py-3 border border-white text-white rounded-md font-medium hover:bg-white hover:bg-opacity-10 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200 focus:outline-none">
                View Lookbook
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-lg bg-opacity-50">
              <img
                src="https://www.uniqlo.com/jp/ja/special-feature/lifewear-collection/common_25ss/img/top/style/second_tips_01.webp"
                alt="Summer collection featured product"
                className="w-full h-full object-cover object-center mix-blend-overlay"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 md:bottom-6 md:left-auto md:-right-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-500">Limited Edition</span>
                <span className="text-indigo-700 font-bold">40% OFF</span>
                <div className="flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm text-gray-700">Ends in 3 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
