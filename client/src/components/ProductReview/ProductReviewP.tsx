import { useState } from "react";
import { useCart } from "../../Context/CartContext";
import Footer from "../Footer";
import Header from "../Header";
import { Star, ShoppingCart, ArrowLeft, ChevronRight } from "lucide-react";
import ReviewField from "./ReviewField";
import { Link } from "react-router-dom";
import { routes } from "../../Routing/Routing";

function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

interface ProductReviewProps {
  product: ProductProps;
}
type ProductSize = string | number;
type ProductColor = {
  name: string;
  bgColor: string;
  selectedColor: string;
};
interface ProductProps {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  imageUrl: string;
  price: number;
  InStock: number;
  brand: string;
  rating: number;
  numReviews: number;
  description: string;
  sizes?: (string | number)[];
  colors?: ProductColor[];
  comments?: string[];
}

export default function ProductReviewP({ product }: ProductReviewProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<ProductSize>("M");
  const [quantity, setQuantity] = useState(1);
  const productColors = product?.colors || [];
  const [selectedColor, setSelectedColor] = useState<ProductColor | undefined>(
    productColors.length > 0 ? productColors[0] : undefined
  );
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      Instock: product.InStock,
      quantity: quantity,
    });
  };

  return (
    <>
      <Header />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:max-w-7xl lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 mb-6">
              <li>
                <Link
                  to="/"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to shop
                </Link>
              </li>

              <ChevronRight className="w-4 h-4 text-gray-400" />

              <li>
                <Link
                  to={routes.category(product.category)}
                  className="text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  {product.category}
                </Link>
              </li>

              {product.subcategory && (
                <>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  <li>
                    <Link
                      to={routes.subcategory(
                        product.category,
                        product.subcategory
                      )}
                      className="text-sm font-medium text-gray-500 hover:text-gray-900"
                    >
                      {product.subcategory}
                    </Link>
                  </li>
                </>
              )}

              <ChevronRight className="w-4 h-4 text-gray-400" />

              <li className="text-sm" aria-current="page">
                <span className="font-medium text-gray-900">
                  {product.name}
                </span>
              </li>
            </ol>
          </nav>

          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
            {/* Product Gallery */}
            <div className="lg:col-span-1">
              <div className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square overflow-hidden rounded-lg"
                  >
                    <img
                      src={product.imageUrl}
                      alt={`${product.name} view ${i + 1}`}
                      className="h-full w-full object-cover object-center cursor-pointer hover:opacity-75 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="mt-10 lg:mt-0 lg:col-span-1">
              <div>
                <div className="flex justify-between">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {product.name}
                  </h1>
                  <p className="text-2xl font-bold text-gray-900">
                    ${product.price}
                  </p>
                </div>

                {/* Reviews */}
                <div className="mt-4">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={classNames(
                            product.rating > i
                              ? "text-yellow-500"
                              : "text-gray-200",
                            "h-5 w-5"
                          )}
                          fill="currentColor"
                        />
                      ))}
                    </div>
                    <a
                      href="#reviews"
                      className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      {product.numReviews} reviews
                    </a>
                  </div>
                </div>

                <div className="mt-4">
                  <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {product.brand}
                  </span>
                </div>

                <div className="mt-6">
                  <h2 className="text-sm font-medium text-gray-900">
                    Description
                  </h2>
                  <p className="mt-2 text-sm text-gray-700">
                    {product.description}
                  </p>
                </div>

                {/* Color Picker */}
                {product.colors && (
                  <div className="mt-6">
                    <h2 className="text-sm font-medium text-gray-900">Color</h2>
                    <div className="mt-3 flex space-x-2">
                      {productColors.map((color) => (
                        <button
                          key={color.name}
                          type="button"
                          className={classNames(
                            color.bgColor,
                            "relative h-8 w-8 rounded-full",
                            selectedColor?.name === color.name &&
                              "ring-2 ring-indigo-500 ring-offset-2"
                          )}
                          onClick={() => setSelectedColor(color)}
                          aria-label={color.name}
                        >
                          <span className="sr-only">{color.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Picker */}
                {product.sizes?.length && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm font-medium text-gray-900">
                        Size
                      </h2>
                      <a
                        href="#"
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Size guide
                      </a>
                    </div>
                    <div className="mt-3 grid grid-cols-6 gap-3">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={classNames(
                            selectedSize === size
                              ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                              : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
                            "flex items-center justify-center rounded-md border py-2 text-sm font-medium uppercase"
                          )}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Picker */}
                <div className="mt-6">
                  <h2 className="text-sm font-medium text-gray-900">
                    Quantity
                  </h2>
                  <div className="mt-2 flex items-center">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="rounded-l-md border border-gray-300 px-3 py-1 text-gray-900 hover:bg-gray-50"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="w-16 border-y border-gray-300 px-3 py-1 text-center text-gray-900"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        quantity < product.InStock
                          ? setQuantity(quantity + 1)
                          : setQuantity(quantity)
                      }
                      className="rounded-r-md border border-gray-300 px-3 py-1 text-gray-900 hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.InStock <= 0}
                    className="mt-4 bg-blue-500 hover:bg-yellow-500 text-black font-medium rounded py-2 px-4 text-sm disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <ShoppingCart />
                    {product.InStock > 0 ? "Add to Cart" : "Out of Stock"}
                  </button>
                </div>

                <div className="mt-8 border-t border-gray-200 pt-6">
                  <h2 className="text-sm font-medium text-gray-900">Details</h2>
                  <ul className="mt-4 space-y-2 text-sm text-gray-600">
                    <li>Made from premium materials</li>
                    <li>Ethically sourced</li>
                    <li>Free shipping on orders over $50</li>
                    <li>30-day money-back guarantee</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <ReviewField />
        </div>
      </div>
      <Footer />
    </>
  );
}
