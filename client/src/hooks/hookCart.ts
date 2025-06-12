import { useEffect, useState, useCallback, useRef } from "react";
import cartApi, { AddToCartRequest, CartItemResponse } from "../api/cart";

export interface UseCartServerReturn {
  cartItems: CartItemResponse[];
  loading: boolean;
  error: string | null;
  addToCart: (data: AddToCartRequest) => Promise<void>;
  updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  isGuestMode: boolean;
}

// Utility to check if user is authenticated
const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  return !!token;
};

export const useCartServer = (): UseCartServerReturn => {
  const [cartItems, setCartItems] = useState<CartItemResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGuestMode, setIsGuestMode] = useState(!isAuthenticated());
  
  // Refs to track ongoing operations and prevent race conditions
  const abortControllerRef = useRef<AbortController | null>(null);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Monitor authentication state changes
  useEffect(() => {
    const checkAuthState = () => {
      const currentAuthState = isAuthenticated();
      const wasGuestMode = isGuestMode;
      
      setIsGuestMode(!currentAuthState);
      
      // If user just logged in, handle cart transfer
      if (wasGuestMode && currentAuthState) {
        handleAuthStateChange();
      }
    };

    // Check auth state on mount and set up listener
    checkAuthState();
    
    // Listen for storage changes (auth state changes)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth_token' || e.key === 'user_data') {
        checkAuthState();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab auth changes
    const handleAuthChange = () => checkAuthState();
    window.addEventListener('authStateChanged', handleAuthChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authStateChanged', handleAuthChange);
    };
  }, [isGuestMode]);

  // Load cart items on mount and auth state changes
  useEffect(() => {
    loadCartItems();
    
    // Cleanup on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, [isGuestMode]);

  const handleAuthStateChange = useCallback(async () => {
    try {
      setLoading(true);
      await cartApi.handleAuthStateChange();
      await loadCartItems(); // Reload cart after transfer
    } catch (error) {
      console.error('Error handling auth state change:', error);
      setError('Failed to sync cart data');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadCartItems = useCallback(async () => {
    try {
      // Cancel previous request if still pending
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      const controller = new AbortController();
      abortControllerRef.current = controller;
      
      setLoading(true);
      setError(null);
      
      const items = await cartApi.getCartItems();
      
      // Only update if request wasn't cancelled
      if (!controller.signal.aborted) {
        setCartItems(items);
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(err.message || 'Failed to load cart items');
        console.error('Error loading cart items:', err);
      }
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, []);

  const addToCart = useCallback(async (data: AddToCartRequest) => {
    try {
      setLoading(true);
      setError(null);
      const newItem = await cartApi.addToCart(data);
      
      // Update local state optimistically
      setCartItems(prev => {
        const existingIndex = prev.findIndex(item => 
          item.productId === newItem.productId &&
          item.colorId === newItem.colorId &&
          item.sizeId === newItem.sizeId
        );
        
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = newItem;
          return updated;
        } else {
          return [...prev, newItem];
        }
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add item to cart';
      setError(errorMessage);
      console.error('Error adding to cart:', err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced quantity update to prevent excessive API calls
  const updateQuantity = useCallback(async (cartItemId: number, quantity: number) => {
    try {
      setError(null);
      
      // Clear existing timeout
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
      
      // Update UI immediately for better UX
      setCartItems(prev => 
        prev.map(item => 
          item.id === cartItemId ? { ...item, quantity } : item
        )
      );
      
      // For guest mode, update immediately without debouncing
      if (isGuestMode) {
        try {
          setLoading(true);
          const updatedItem = await cartApi.updateCartItem(cartItemId, { quantity });
          
          // Update with response
          setCartItems(prev => 
            prev.map(item => 
              item.id === cartItemId ? updatedItem : item
            )
          );
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to update quantity';
          setError(errorMessage);
          console.error('Error updating quantity:', err);
          
          // Revert optimistic update on error
          await loadCartItems();
          throw new Error(errorMessage);
        } finally {
          setLoading(false);
        }
        return;
      }
      
      // Debounce the actual API call for authenticated users
      updateTimeoutRef.current = setTimeout(async () => {
        try {
          setLoading(true);
          const updatedItem = await cartApi.updateCartItem(cartItemId, { quantity });
          
          // Update with server response
          setCartItems(prev => 
            prev.map(item => 
              item.id === cartItemId ? updatedItem : item
            )
          );
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to update quantity';
          setError(errorMessage);
          console.error('Error updating quantity:', err);
          
          // Revert optimistic update on error
          await loadCartItems();
          throw new Error(errorMessage);
        } finally {
          setLoading(false);
        }
      }, 500); // 500ms debounce
      
    } catch (err) {
      console.error('Error in updateQuantity:', err);
    }
  }, [isGuestMode, loadCartItems]);

  const removeFromCart = useCallback(async (cartItemId: number) => {
    try {
      setLoading(true);
      setError(null);
      
      // Optimistic update
      setCartItems(prev => prev.filter(item => item.id !== cartItemId));
      
      await cartApi.removeCartItem(cartItemId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to remove item';
      setError(errorMessage);
      console.error('Error removing from cart:', err);
      
      // Revert on error
      await loadCartItems();
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [loadCartItems]);

  const clearCart = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Optimistic update
      setCartItems([]);
      
      await cartApi.clearCart();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to clear cart';
      setError(errorMessage);
      console.error('Error clearing cart:', err);
      
      // Revert on error
      await loadCartItems();
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [loadCartItems]);

  const refreshCart = useCallback(async () => {
    await loadCartItems();
  }, [loadCartItems]);

  return {
    cartItems,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refreshCart,
    isGuestMode,
  };
};