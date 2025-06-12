import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { CartItemResponse, AddToCartRequest } from "../api/cart";
import { useCartServer } from "../hooks/hookCart";

export interface CartItem {
  id: number;
  cartItemId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  inStock: number;
  colorId?: number | null;
  sizeId?: number | null;
  color?: {
    id: number;
    name: string;
    hex: string;
  };
  size?: {
    id: number;
    value: string;
  };
}

interface CartContextType {
  cartItems: CartItem[];
  loading: boolean;
  error: string | null;
  isGuestMode: boolean;
  addToCart: (item: Omit<CartItem, "cartItemId">) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  clearError: () => void;
  totalItems: number;
  totalPrice: number;
  isEmpty: boolean;
  isInCart: (
    productId: number,
    colorId?: number | null,
    sizeId?: number | null
  ) => boolean;
  getCartItemQuantity: (
    productId: number,
    colorId?: number | null,
    sizeId?: number | null
  ) => number;
  promptLogin: () => void;
  showGuestCartWarning: boolean;
  dismissGuestCartWarning: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const transformCartItem = (serverItem: CartItemResponse): CartItem => {
  try {
    return {
      id: serverItem.product?.id || serverItem.productId,
      cartItemId: serverItem.id,
      name: serverItem.product?.name || "Unknown Product",
      price: serverItem.product?.price || 0,
      quantity: Math.max(serverItem.quantity, 0),
      imageUrl: serverItem.product?.imageUrl || "",
      inStock: serverItem.product?.inStock || 0,
      colorId: serverItem.colorId,
      sizeId: serverItem.sizeId,
      color: serverItem.color || undefined,
      size: serverItem.size || undefined,
    };
  } catch (error) {
    console.error("Error transforming cart item:", error, serverItem);
    throw new Error("Invalid cart item data received from server");
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    cartItems: serverCartItems,
    loading,
    error: serverError,
    isGuestMode,
    addToCart: serverAddToCart,
    updateQuantity: serverUpdateQuantity,
    removeFromCart: serverRemoveFromCart,
    clearCart: serverClearCart,
    refreshCart,
  } = useCartServer();

  const [localError, setLocalError] = useState<string | null>(null);
  const [showGuestCartWarning, setShowGuestCartWarning] = useState(false);

  useEffect(() => {
    if (isGuestMode && serverCartItems.length > 0) {
      const hasShownWarning = localStorage.getItem("guest_cart_warning_shown");
      if (!hasShownWarning) {
        setShowGuestCartWarning(true);
      }
    }
  }, [isGuestMode, serverCartItems.length]);

  const cartItems = useMemo(() => {
    try {
      return serverCartItems.map(transformCartItem);
    } catch (error) {
      setLocalError(
        error instanceof Error ? error.message : "Failed to process cart items"
      );
      return [];
    }
  }, [serverCartItems]);

  const error = serverError || localError;

  const addToCart = useCallback(
    async (item: Omit<CartItem, "cartItemId">) => {
      try {
        setLocalError(null);

        if (!item.id || item.quantity <= 0) {
          throw new Error("Invalid item data");
        }

        if (item.quantity > item.inStock) {
          throw new Error(`Only ${item.inStock} items available in stock`);
        }

        const addRequest: AddToCartRequest = {
          productId: item.id,
          quantity: item.quantity,
          colorId: item.colorId,
          sizeId: item.sizeId,
        };

        await serverAddToCart(addRequest);

        if (isGuestMode) {
          setShowGuestCartWarning(true);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to add item to cart";
        setLocalError(errorMessage);
        throw new Error(errorMessage);
      }
    },
    [serverAddToCart, isGuestMode]
  );

  const removeFromCart = useCallback(
    async (cartItemId: number) => {
      try {
        setLocalError(null);
        await serverRemoveFromCart(cartItemId);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to remove item from cart";
        setLocalError(errorMessage);
        throw new Error(errorMessage);
      }
    },
    [serverRemoveFromCart]
  );

  const updateQuantity = useCallback(
    async (cartItemId: number, quantity: number) => {
      try {
        setLocalError(null);

        if (quantity < 0) {
          throw new Error("Quantity cannot be negative");
        }

        if (quantity === 0) {
          await removeFromCart(cartItemId);
          return;
        }

        const cartItem = cartItems.find(
          (item) => item.cartItemId === cartItemId
        );
        if (cartItem && quantity > cartItem.inStock) {
          throw new Error(`Only ${cartItem.inStock} items available in stock`);
        }

        await serverUpdateQuantity(cartItemId, quantity);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to update quantity";
        setLocalError(errorMessage);
        throw new Error(errorMessage);
      }
    },
    [serverUpdateQuantity, removeFromCart, cartItems]
  );

  const clearCart = useCallback(async () => {
    try {
      setLocalError(null);
      await serverClearCart();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to clear cart";
      setLocalError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [serverClearCart]);

  const clearError = useCallback(() => {
    setLocalError(null);
  }, []);

  const promptLogin = useCallback(() => {
    window.dispatchEvent(
      new CustomEvent("promptLogin", {
        detail: { reason: "cart_save", source: "cart" },
      })
    );
  }, []);

  const dismissGuestCartWarning = useCallback(() => {
    setShowGuestCartWarning(false);
    localStorage.setItem("guest_cart_warning_shown", "true");
  }, []);

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const isEmpty = useMemo(() => cartItems.length === 0, [cartItems]);

  const isInCart = useCallback(
    (productId: number, colorId?: number | null, sizeId?: number | null) => {
      return cartItems.some(
        (item) =>
          item.id === productId &&
          item.colorId === (colorId ?? null) &&
          item.sizeId === (sizeId ?? null)
      );
    },
    [cartItems]
  );

  const getCartItemQuantity = useCallback(
    (productId: number, colorId?: number | null, sizeId?: number | null) => {
      const foundItem = cartItems.find(
        (item) =>
          item.id === productId &&
          item.colorId === (colorId ?? null) &&
          item.sizeId === (sizeId ?? null)
      );
      return foundItem ? foundItem.quantity : 0;
    },
    [cartItems]
  );

  const value: CartContextType = {
    cartItems,
    loading,
    error,
    isGuestMode,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    refreshCart,
    clearError,
    totalItems,
    totalPrice,
    isEmpty,
    isInCart,
    getCartItemQuantity,
    promptLogin,
    showGuestCartWarning,
    dismissGuestCartWarning,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
