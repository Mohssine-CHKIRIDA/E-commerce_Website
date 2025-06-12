import { useState } from "react";
import { useCart } from "../../Context/CartContext";
import Footer from "../Footer";
import Header from "../Header";
import { Star, ShoppingCart, ArrowLeft, ChevronRight } from "lucide-react";
import ReviewField from "./ReviewField";
import { Link } from "react-router-dom";
import { routes } from "../../Routing/Routing";
import { Product, Color } from "../types";

function classNames(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

interface ProductReviewProps {
  product: Product;
}
type ProductSize = string | number;

export default function ProductReviewP({ product }: ProductReviewProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<ProductSize>("M");
  const [quantity, setQuantity] = useState(1);
  const productColors = product.productColors?.map((pc) => pc.color);
  const productSizes = product.productSizes?.map((ps) => ps.size);
  const [selectedColor, setSelectedColor] = useState<Color | undefined>(
    productColors != null ? productColors[0] : undefined
  );
  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      Instock: product.inStock,
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
                  to={routes.category(product.category.name)}
                  className="text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  {product.category.name}
                </Link>
              </li>

              {product.subcategory && (
                <>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  <li>
                    <Link
                      to={routes.subcategory(
                        product.category.name,
                        product.subcategory.name
                      )}
                      className="text-sm font-medium text-gray-500 hover:text-gray-900"
                    >
                      {product.subcategory.name}
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
                    {product.brand.name}
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
                {productColors && (
                  <div className="mt-6">
                    <h2 className="text-sm font-medium text-gray-900">Color</h2>
                    <div className="mt-3 flex space-x-2">
                      {productColors?.map((color) => (
                        <button
                          key={color.id}
                          type="button"
                          className={classNames(
                            "relative h-8 w-8 rounded-full border border-gray-300",
                            selectedColor?.hex === color.hex &&
                              "ring-2 ring-indigo-500 ring-offset-2"
                          )}
                          style={{ backgroundColor: color.hex }}
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
                {productSizes && (
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
                      {productSizes.map((size) => (
                        <button
                          key={size.id}
                          onClick={() => setSelectedSize(size.value)}
                          className={classNames(
                            selectedSize === size.value
                              ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                              : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
                            "flex items-center justify-center rounded-md border py-2 text-sm font-medium uppercase"
                          )}
                        >
                          {size.value}
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
                        quantity < product.inStock
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
                    disabled={product.inStock <= 0}
                    className="mt-4 bg-blue-500 hover:bg-yellow-500 text-black font-medium rounded py-2 px-4 text-sm disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <ShoppingCart />
                    {product.inStock > 0 ? "Add to Cart" : "Out of Stock"}
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
          <ReviewField productId={product.id} />
        </div>
      </div>
      <Footer />
    </>
  );
}
