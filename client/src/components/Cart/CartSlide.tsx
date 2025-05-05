import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { FaTrash, FaShoppingCart, FaArrowRight } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { useCart } from "./CartContext";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function CartSlide({ isOpen, setIsOpen }: Props) {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleClose = () => setIsOpen(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      alert("Proceeding to checkout");
      setIsCheckingOut(false);
    }, 800);
  };

  const EmptyCart = () => (
    <div className="flex-1 flex flex-col justify-center items-center text-center p-8">
      <div className="bg-gray-100 rounded-full p-6 mb-4">
        <FaShoppingCart className="h-12 w-12 text-gray-400" />
      </div>
      <p className="text-xl font-semibold text-gray-800">Your cart is empty</p>
      <p className="mt-2 text-gray-500 max-w-xs">
        Looks like you haven't added anything yet. Browse our products and find
        something you love.
      </p>
      <button
        onClick={handleClose}
        className="mt-6 inline-flex items-center px-6 py-3 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-sm"
      >
        Continue Shopping
        <FaArrowRight className="ml-2 h-4 w-4" />
      </button>
    </div>
  );

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel className="pointer-events-auto w-screen max-w-md transform transition ease-out duration-300 translate-x-0">
              <div className="flex h-full flex-col overflow-hidden bg-white shadow-xl rounded-l-2xl">
                <div className="flex items-center justify-between px-6 py-4 bg-indigo-50 border-b border-indigo-100">
                  <DialogTitle className="text-lg font-semibold text-indigo-900 flex items-center">
                    <FaShoppingCart className="mr-2 h-5 w-5 text-indigo-600" />
                    Your Shopping Cart
                  </DialogTitle>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-full p-1"
                    aria-label="Close panel"
                  >
                    <AiOutlineClose className="h-5 w-5" />
                  </button>
                </div>

                {cartItems.length === 0 ? (
                  <EmptyCart />
                ) : (
                  <>
                    <div className="flex-1 overflow-y-auto p-6">
                      <ul className="divide-y divide-gray-200">
                        {cartItems.map((product) => (
                          <li
                            key={product.id}
                            className="py-6 first:pt-0 last:pb-0"
                          >
                            <div className="flex items-center">
                              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                                <img
                                  src={product.imageUrl}
                                  alt={product.name}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div className="flex justify-between">
                                  <h3 className="font-medium text-gray-800">
                                    {product.name}
                                  </h3>
                                  <p className="font-semibold text-indigo-600">
                                    ${product.price.toFixed(2)}
                                  </p>
                                </div>

                                <div className="flex items-center justify-between mt-3 text-sm">
                                  <div className="flex items-center border rounded-md">
                                    <button
                                      onClick={() => {
                                        updateQuantity(
                                          product.id,
                                          (product.quantity || 1) - 1
                                        );
                                      }}
                                      disabled={(product.quantity || 1) <= 1}
                                      className="px-2 py-1 text-gray-600 hover:text-indigo-600 disabled:opacity-30"
                                    >
                                      <HiMinusSm className="h-4 w-4" />
                                    </button>
                                    <p>{product.quantity}</p>

                                    <button
                                      onClick={() => {
                                        if (
                                          product.Instock > product.quantity
                                        ) {
                                          updateQuantity(
                                            product.id,
                                            (product.quantity || 1) + 1
                                          );
                                        }
                                      }}
                                      className="px-2 py-1 text-gray-600 hover:text-indigo-600"
                                    >
                                      <HiPlusSm className="h-4 w-4" />
                                    </button>
                                  </div>
                                  <button
                                    onClick={() => removeFromCart(product.id)}
                                    className="flex items-center text-gray-500 hover:text-red-600 transition-colors"
                                    aria-label={`Remove ${product.name} from cart`}
                                  >
                                    <FaTrash className="h-3 w-3 mr-1" />
                                    <span>Remove</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-gray-200 bg-gray-50 p-6 space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-600">
                          <p>Subtotal</p>
                          <p>${subtotal.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <p>Shipping estimate</p>
                          <p>Free</p>
                        </div>

                        <div className="h-px bg-gray-200 my-2"></div>
                        <div className="flex justify-between font-semibold text-gray-900">
                          <p>Order total</p>
                          <p>${subtotal.toFixed(2)}</p>
                        </div>
                      </div>

                      <button
                        onClick={handleCheckout}
                        disabled={isCheckingOut}
                        className="w-full rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70"
                      >
                        {isCheckingOut ? "Processing..." : "Checkout"}
                      </button>

                      <div className="text-center">
                        <button
                          type="button"
                          onClick={handleClose}
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
                        >
                          Continue Shopping{" "}
                          <FaArrowRight className="inline ml-1 h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
