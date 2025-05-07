import React, { useState } from "react";
import { CartItem as product, useCart } from "./CartContext";

interface CartItemProps {
  item: product;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
}
const CartItem: React.FC<CartItemProps> = ({
  item,
  updateQuantity,
  removeItem,
}) => {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuantity = parseInt(e.target.value);

    updateQuantity(item.id, newQuantity);
  };

  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="flex-shrink-0 w-20 h-20 mr-4">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <div className="flex-grow">
        <h3 className="font-medium text-gray-800">{item.name}</h3>
        <p className="text-blue-600 font-medium mt-1">
          ${item.price.toFixed(2)}
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <div>
          <label htmlFor={`quantity-${item.id}`} className="sr-only">
            Quantity
          </label>
          <select
            id={`quantity-${item.id}`}
            value={item.quantity}
            onChange={handleQuantityChange}
            className="border border-gray-300 rounded-md p-2 w-16"
          >
            {[...Array(item.Instock)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="w-24 text-right font-medium">
          ${(item.price * item.quantity).toFixed(2)}
        </div>

        <button
          onClick={() => removeItem(item.id)}
          className="text-red-500 hover:text-red-700"
          aria-label="Remove item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  shipping,
  total,
  onCheckout,
}) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Order Summary</h2>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 pt-2 mt-2">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
        onClick={onCheckout}
      >
        Proceed to Checkout
      </button>

      <div className="mt-4">
        <p className="text-sm text-gray-600">
          Shipping costs calculated at checkout.
        </p>
      </div>
    </div>
  );
};

interface CouponSectionProps {
  applyCoupon: (code: string) => void;
  couponApplied: boolean;
  discountAmount: number;
}

const CouponSection: React.FC<CouponSectionProps> = ({
  applyCoupon,
  couponApplied,
  discountAmount,
}) => {
  const [couponCode, setCouponCode] = useState<string>("");

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      applyCoupon(couponCode);
      setCouponCode("");
    }
  };

  return (
    <div className="mt-6">
      <h3 className="font-medium mb-2">Have a coupon?</h3>
      <div className="flex">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter coupon code"
          className="flex-grow border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleApplyCoupon}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-r-md transition-colors"
        >
          Apply
        </button>
      </div>

      {couponApplied && (
        <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md">
          <p className="font-medium">Coupon applied! 10% discount</p>
          <p className="text-sm">You saved: ${discountAmount.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

const CartPageIntern: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [couponApplied, setCouponApplied] = useState<boolean>(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = subtotal > 100 ? 0 : 10;
  const discountAmount = couponApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shippingCost - discountAmount;

  const applyCoupon = (code: string) => {
    if (code === "DISCOUNT10") {
      setCouponApplied(true);
      alert("Coupon applied successfully! 10% discount added.");
    } else {
      alert("Invalid coupon code.");
    }
  };

  const handleCheckout = () => {
    alert(
      "Proceeding to checkout with " +
        cartItems.length +
        " items for a total of $" +
        total.toFixed(2)
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

      {cartItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart items list */}
          <div className="lg:w-2/3">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-bold mb-4">
                Cart Items (
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>

              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  updateQuantity={updateQuantity}
                  removeItem={removeFromCart}
                />
              ))}

              <div className="flex justify-between mt-6">
                <button
                  className="text-blue-600 hover:text-blue-800 font-medium"
                  onClick={() => window.history.back()}
                >
                  Continue Shopping
                </button>

                <button
                  className="text-red-600 hover:text-red-800 font-medium"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <CouponSection
                applyCoupon={applyCoupon}
                couponApplied={couponApplied}
                discountAmount={discountAmount}
              />
            </div>
          </div>

          <div className="lg:w-1/3">
            <OrderSummary
              subtotal={subtotal}
              shipping={shippingCost}
              total={total}
              onCheckout={handleCheckout}
            />

            {/* Shipping info */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="font-medium mb-2">Shipping Information</h3>
              <p className="text-sm text-gray-600">
                Orders over $100 qualify for free shipping. Standard delivery
                takes 3-5 business days.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-12 rounded-lg shadow-md text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any products to your cart yet.
          </p>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
            onClick={() => window.history.back()}
          >
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPageIntern;
