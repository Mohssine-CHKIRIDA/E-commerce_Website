import ProductCard from "./ProductCard";
import { useProducts } from "../../hooks/hookProducts";

export default function BestSellingProducts() {
  const { products, loading } = useProducts();

  if (loading) return <p>Loading...</p>;
  return (
    <div className="px-6 py-12 bg-gray-100">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Our Best-Selling Products
        </h2>
        <p className="text-center text-lg text-gray-600 mb-10">
          Discover the most popular products loved by our customers.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map(
            (product) =>
              product.rating > 4.5 && (
                <div
                  key={product.id}
                  className="transition-transform transform hover:scale-105 duration-300 ease-in-out"
                >
                  <ProductCard product={product} />
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}
