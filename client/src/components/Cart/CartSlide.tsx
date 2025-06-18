import {
  FaTrash,
  FaShoppingCart,
  FaArrowRight,
  FaExclamationTriangle,
} from "react-icons/fa";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import { useCart } from "../../Context/CartContext";
import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function CartSlide({ isOpen, setIsOpen }: Props) {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    loading,
    error,
    totalPrice,
    totalItems,
    isEmpty,
    clearError,
  } = useCart();

  const [removingItemId, setRemovingItemId] = useState<number | null>(null);
  const [updatingItemId, setUpdatingItemId] = useState<number | null>(null);
  const [showErrorDetails, setShowErrorDetails] = useState(false);

  // Auto-hide error after 5 seconds
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (error) {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
      errorTimeoutRef.current = setTimeout(() => {
        clearError();
      }, 5000);
    }

    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, [error, clearError]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    clearError();
  }, [setIsOpen, clearError]);

  const handleQuantityUpdate = useCallback(
    async (cartItemId: number, newQty: number) => {
      if (newQty < 0) return;

      setUpdatingItemId(cartItemId);
      try {
        await updateQuantity(cartItemId, newQty);
      } catch (error) {
        console.error("Failed to update item quantity:", error);
        // Error is handled by context, no need for alert
      } finally {
        setUpdatingItemId(null);
      }
    },
    [updateQuantity]
  );
  const navigate = useNavigate(); // Call the hook at the top level

  const handleRemoveItem = useCallback(
    async (cartItemId: number) => {
      setRemovingItemId(cartItemId);
      try {
        await removeFromCart(cartItemId);
      } catch (error) {
        console.error("Failed to remove item from cart:", error);
        // Error is handled by context, no need for alert
      } finally {
        setRemovingItemId(null);
      }
    },
    [removeFromCart]
  );

  const handleClearAllItems = useCallback(async () => {
    if (isEmpty) return;

    const confirmed = window.confirm(
      "Are you sure you want to clear all items from your cart?"
    );
    if (!confirmed) return;

    try {
      await clearCart();
    } catch (error) {
      console.error("Failed to clear cart:", error);
      // Error is handled by context
    }
  }, [isEmpty, clearCart]);

  // Enhanced empty cart component
  const EmptyCart = () => (
    <div className="flex-1 flex flex-col justify-center items-center text-center p-8">
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full p-6 mb-4">
        <FaShoppingCart className="h-12 w-12 text-indigo-400" />
      </div>
      <p className="text-xl font-semibold text-gray-800 mb-2">
        Your cart is empty
      </p>
      <p className="text-gray-500 max-w-xs mb-6">
        Looks like you haven't added anything yet. Browse our products and find
        something you love.
      </p>
      <button
        onClick={handleClose}
        className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
      >
        Continue Shopping
        <FaArrowRight className="ml-2 h-4 w-4" />
      </button>
    </div>
  );

  // Enhanced error display component
  const ErrorDisplay = () => (
    <div className="mx-4 mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <FaExclamationTriangle className="h-4 w-4 text-red-400 mt-0.5" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm text-red-800">{error}</p>
          {error && error.length > 50 && (
            <button
              onClick={() => setShowErrorDetails(!showErrorDetails)}
              className="text-xs text-red-600 hover:text-red-800 underline mt-1"
            >
              {showErrorDetails ? "Show less" : "Show details"}
            </button>
          )}
        </div>
        <div className="ml-3 flex-shrink-0">
          <button
            onClick={clearError}
            className="text-red-400 hover:text-red-600 text-sm"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl border-l z-50 transform transition-transform duration-300 ease-in-out"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50">
          <h2 className="flex items-center text-lg font-semibold text-indigo-800">
            <FaShoppingCart className="mr-2" /> Your Cart
            {totalItems > 0 && (
              <span className="ml-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs rounded-full px-2 py-1 animate-pulse">
                {totalItems}
              </span>
            )}
          </h2>

          {/* Clear all button */}
          {!isEmpty && (
            <button
              onClick={handleClearAllItems}
              disabled={loading}
              className="text-xs text-gray-500 hover:text-red-600 transition-colors disabled:opacity-50"
              title="Clear all items"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Error Display */}
        {error && <ErrorDisplay />}

        {/* Loading State */}
        {loading && (
          <div className="p-4 text-center border-b bg-blue-50">
            <div className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-indigo-600 border-t-transparent"></div>
            <p className="mt-2 text-sm text-indigo-600">Updating cart...</p>
          </div>
        )}

        {isEmpty && !loading ? (
          <EmptyCart />
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                <ul className="divide-y divide-gray-100">
                  {cartItems.map((item) => {
                    const isRemoving = removingItemId === item.cartItemId;
                    const isUpdating = updatingItemId === item.cartItemId;
                    const isItemLoading = isRemoving || isUpdating;

                    return (
                      <li
                        key={`${item.cartItemId}-${item.colorId}-${item.sizeId}`}
                        className={`py-6 first:pt-0 last:pb-0 transition-all duration-200 ${
                          isItemLoading ? "opacity-60" : "opacity-100"
                        } ${isRemoving ? "transform scale-95" : ""}`}
                      >
                        <div className="flex items-center">
                          {/* Product Image */}
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 shadow-sm">
                            <img
                              src={item.imageUrl || "/placeholder.png"}
                              alt={item.name || "Product image"}
                              className="h-full w-full object-cover object-center transition-transform hover:scale-110"
                              loading="lazy"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="ml-4 flex flex-1 flex-col">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-medium text-gray-800 hover:text-indigo-600 transition-colors">
                                  {item.name}
                                </h3>

                                {/* Color and Size Display */}
                                <div className="flex items-center gap-3 mt-1">
                                  {item.color && (
                                    <div className="flex items-center text-xs text-gray-500">
                                      <div
                                        className="w-3 h-3 rounded-full mr-1 border border-gray-300 shadow-sm"
                                        style={{
                                          backgroundColor: item.color.hex,
                                        }}
                                        title={item.color.name}
                                      />
                                      {item.color.name}
                                    </div>
                                  )}
                                  {item.size && (
                                    <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                      {item.size.value}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="text-right">
                                <p className="font-semibold text-indigo-600 text-lg">
                                  ${item.price.toFixed(2)}
                                </p>
                                {item.quantity > 1 && (
                                  <p className="text-xs text-gray-500">
                                    ${(item.price * item.quantity).toFixed(2)}{" "}
                                    total
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Quantity Controls and Remove Button */}
                            <div className="flex items-center justify-between mt-4">
                              {/* Quantity Controls */}
                              <div className="flex items-center border border-gray-200 rounded-lg shadow-sm bg-white">
                                <button
                                  onClick={() =>
                                    handleQuantityUpdate(
                                      item.cartItemId,
                                      item.quantity - 1
                                    )
                                  }
                                  disabled={item.quantity <= 1 || isItemLoading}
                                  className="px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded-l-lg"
                                  aria-label="Decrease quantity"
                                >
                                  <HiMinusSm className="h-4 w-4" />
                                </button>

                                <div className="px-4 py-2 text-center min-w-[3rem] border-x border-gray-200 bg-gray-50">
                                  {isUpdating ? (
                                    <div className="animate-spin rounded-full h-4 w-4 border border-indigo-600 border-t-transparent mx-auto"></div>
                                  ) : (
                                    <span className="font-medium">
                                      {item.quantity}
                                    </span>
                                  )}
                                </div>

                                <button
                                  onClick={() =>
                                    handleQuantityUpdate(
                                      item.cartItemId,
                                      item.quantity + 1
                                    )
                                  }
                                  disabled={
                                    item.quantity >= item.inStock ||
                                    isItemLoading
                                  }
                                  className="px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded-r-lg"
                                  aria-label="Increase quantity"
                                >
                                  <HiPlusSm className="h-4 w-4" />
                                </button>
                              </div>

                              {/* Remove Button */}
                              <button
                                onClick={() =>
                                  handleRemoveItem(item.cartItemId)
                                }
                                disabled={isItemLoading}
                                className="flex items-center text-gray-500 hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed px-2 py-1 rounded hover:bg-red-50"
                                aria-label={`Remove ${item.name} from cart`}
                              >
                                {isRemoving ? (
                                  <div className="animate-spin rounded-full h-3 w-3 border border-red-600 border-t-transparent mr-1"></div>
                                ) : (
                                  <FaTrash className="h-3 w-3 mr-1" />
                                )}
                                <span className="text-sm">Remove</span>
                              </button>
                            </div>

                            {/* Stock Warning and Item Status */}
                            <div className="mt-2 space-y-1">
                              {item.quantity >= item.inStock && (
                                <p className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded flex items-center">
                                  <FaExclamationTriangle className="h-3 w-3 mr-1" />
                                  Only {item.inStock} left in stock
                                </p>
                              )}

                              {item.inStock === 0 && (
                                <p className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                                  Out of stock
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Footer with Checkout */}
            <div className="border-t border-gray-200 bg-gradient-to-r from-gray-50 to-indigo-50 p-6 space-y-4">
              {/* Order Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <p>
                    Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"}
                    )
                  </p>
                  <p className="font-medium">${totalPrice.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Shipping estimate</p>
                  <p className="font-medium">$5.00</p>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <p>Tax estimate</p>
                  <p className="font-medium">
                    ${(totalPrice * 0.08).toFixed(2)}
                  </p>
                </div>
                <div className="border-t border-gray-300 pt-2">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <p>Order total</p>
                    <p className="text-indigo-600">
                      ${(totalPrice + 5 + totalPrice * 0.08).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate("/cart")}
                disabled={loading || isEmpty}
                className="w-full flex items-center justify-center px-6 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <FaShoppingCart className="mr-2 h-4 w-4" />
                    Checkout
                  </>
                )}
              </button>

              {/* Security Badge */}
              <p className="text-xs text-center text-gray-500 flex items-center justify-center">
                <span className="mr-1">🔒</span>
                Secure checkout powered by SSL encryption
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
