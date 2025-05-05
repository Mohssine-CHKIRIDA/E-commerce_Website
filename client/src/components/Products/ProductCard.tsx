import Rating from "./Rating";
import { useCart } from "../Cart/CartContext";

export interface ProductProps {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
  price: number;
  InStock: number;
  brand: string;
  rating: number;
  numReviews: number;
  description: string;
}

interface CardProps {
  product: ProductProps;
}

export default function Product({ product }: CardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      Instock: product.InStock,
      quantity: 1,
    });
  };

  return (
    <div className="w-full max-w-xs mx-auto border rounded-md bg-white hover:shadow-lg transition p-3 flex flex-col text-sm">
      {product.rating >= 4.5 && (
        <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs px-2 py-0.5 font-semibold rounded-sm shadow-sm">
          Best Seller
        </div>
      )}

      <div className="w-full aspect-[4/5] bg-white flex items-center justify-center overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="max-h-full object-contain transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-2 flex flex-col gap-1">
        <h3 className="font-medium text-gray-800 leading-snug line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500">
          {product.brand} • {product.category}
        </p>

        <Rating rating={product.rating} numReviews={product.numReviews} />

        <p className="text-lg font-bold text-red-600 mt-1">
          ${product.price.toFixed(2)}
        </p>

        {product.InStock > 0 ? (
          <p className="text-xs text-green-600">In stock</p>
        ) : (
          <p className="text-xs text-red-600">Currently unavailable</p>
        )}
      </div>

      <button
        onClick={handleAddToCart}
        disabled={product.InStock <= 0}
        className="mt-3 bg-blue-500 hover:bg-yellow-500 text-black font-medium rounded py-2 text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {product.InStock > 0 ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}
