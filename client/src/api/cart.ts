import api from "./axiosInstance";

export interface CartItemResponse {
  id: number;
  userId?: number;
  productId: number;
  quantity: number;
  colorId: number | null;
  sizeId: number | null;
  addedAt: string;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    inStock: number;
  };
  color: {
    id: number;
    name: string;
    hex: string;
  } | null;
  size: {
    id: number;
    value: string;
  } | null;
}

export interface AddToCartRequest {
  productId: number;
  quantity?: number;
  colorId?: number | null;
  sizeId?: number | null;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export interface GuestCartItem {
  id: number;
  productId: number;
  quantity: number;
  colorId: number | null;
  sizeId: number | null;
  addedAt: string;
}

// Guest cart storage key
const GUEST_CART_KEY = 'guest_cart_items';

// Utility to check if user is authenticated
const isAuthenticated = (): boolean => {
  // Check for auth token or user data in localStorage/sessionStorage
  const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  return !!token;
};

// Guest cart utilities
const guestCartUtils = {
  getItems: (): GuestCartItem[] => {
    try {
      const items = localStorage.getItem(GUEST_CART_KEY);
      return items ? JSON.parse(items) : [];
    } catch (error) {
      console.error('Error reading guest cart:', error);
      return [];
    }
  },

  setItems: (items: GuestCartItem[]): void => {
    try {
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving guest cart:', error);
    }
  },

  generateId: (): number => {
    return Date.now() + Math.random();
  },

  clearItems: (): void => {
    try {
      localStorage.removeItem(GUEST_CART_KEY);
    } catch (error) {
      console.error('Error clearing guest cart:', error);
    }
  }
};

// Fetch product details for guest cart items
const fetchProductDetails = async (productId: number): Promise<CartItemResponse['product']> => {
  try {
    const response = await api.get(`/products/${productId}`);
    return {
      id: response.data.id,
      name: response.data.name,
      price: response.data.price,
      imageUrl: response.data.imageUrl,
      inStock: response.data.inStock
    };
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    // Return fallback data
    return {
      id: productId,
      name: 'Unknown Product',
      price: 0,
      imageUrl: '',
      inStock: 0
    };
  }
};

// Fetch color details
const fetchColorDetails = async (colorId: number): Promise<CartItemResponse['color']> => {
  try {
    const response = await api.get(`/colors/${colorId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching color ${colorId}:`, error);
    return null;
  }
};

// Fetch size details
const fetchSizeDetails = async (sizeId: number): Promise<CartItemResponse['size']> => {
  try {
    const response = await api.get(`/sizes/${sizeId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching size ${sizeId}:`, error);
    return null;
  }
};

// Convert guest cart item to full cart item response
const enrichGuestCartItem = async (guestItem: GuestCartItem): Promise<CartItemResponse> => {
  const [product, color, size] = await Promise.all([
    fetchProductDetails(guestItem.productId),
    guestItem.colorId ? fetchColorDetails(guestItem.colorId) : Promise.resolve(null),
    guestItem.sizeId ? fetchSizeDetails(guestItem.sizeId) : Promise.resolve(null)
  ]);

  return {
    id: guestItem.id,
    productId: guestItem.productId,
    quantity: guestItem.quantity,
    colorId: guestItem.colorId,
    sizeId: guestItem.sizeId,
    addedAt: guestItem.addedAt,
    product,
    color,
    size
  };
};

// Retry utility for failed requests
const retryRequest = async <T>(
  requestFn: () => Promise<T>,
  maxRetries: number = 2,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error;
 
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Request failed');
     
      if (i < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
 
  throw lastError!;
};

// Transfer guest cart to user account
const transferGuestCartToUser = async (): Promise<void> => {
  const guestItems = guestCartUtils.getItems();
  if (guestItems.length === 0) return;

  try {
    // Add each guest item to user's cart
    for (const guestItem of guestItems) {
      await retryRequest(async () => {
        await api.post('/cart', {
          productId: guestItem.productId,
          quantity: guestItem.quantity,
          colorId: guestItem.colorId,
          sizeId: guestItem.sizeId
        });
      });
    }
    
    // Clear guest cart after successful transfer
    guestCartUtils.clearItems();
  } catch (error) {
    console.error('Error transferring guest cart:', error);
    // Don't clear guest cart if transfer fails
  }
};

export const cartApi = {
  // Check if user just logged in and transfer guest cart
  handleAuthStateChange: async (): Promise<void> => {
    if (isAuthenticated()) {
      await transferGuestCartToUser();
    }
  },

  getCartItems: async (): Promise<CartItemResponse[]> => {
    if (!isAuthenticated()) {
      // Handle guest cart
      const guestItems = guestCartUtils.getItems();
      const enrichedItems = await Promise.all(
        guestItems.map(item => enrichGuestCartItem(item))
      );
      return enrichedItems;
    }

    // Handle authenticated user cart
    return retryRequest(async () => {
      const response = await api.get('/cart');
      if (!Array.isArray(response.data)) {
        throw new Error('Invalid cart data received from server');
      }
      return response.data;
    });
  },

  addToCart: async (data: AddToCartRequest): Promise<CartItemResponse> => {
    if (!data.productId || (data.quantity !== undefined && data.quantity <= 0)) {
      throw new Error('Invalid cart item data');
    }

    if (!isAuthenticated()) {
      // Handle guest cart
      const guestItems = guestCartUtils.getItems();
      const existingItemIndex = guestItems.findIndex(item => 
        item.productId === data.productId &&
        item.colorId === data.colorId &&
        item.sizeId === data.sizeId
      );

      const quantity = data.quantity || 1;
      let guestItem: GuestCartItem;

      if (existingItemIndex >= 0) {
        // Update existing item
        guestItems[existingItemIndex].quantity += quantity;
        guestItem = guestItems[existingItemIndex];
      } else {
        // Add new item
        guestItem = {
          id: guestCartUtils.generateId(),
          productId: data.productId,
          quantity,
          colorId: data.colorId || null,
          sizeId: data.sizeId || null,
          addedAt: new Date().toISOString()
        };
        guestItems.push(guestItem);
      }

      guestCartUtils.setItems(guestItems);
      return await enrichGuestCartItem(guestItem);
    }

    // Handle authenticated user cart
    return retryRequest(async () => {
      const response = await api.post('/cart', {
        ...data,
        quantity: data.quantity || 1,
      });
      return response.data;
    });
  },

  updateCartItem: async (
    cartItemId: number,
    data: UpdateCartItemRequest
  ): Promise<CartItemResponse> => {
    if (!cartItemId || data.quantity < 0) {
      throw new Error('Invalid update data');
    }

    if (!isAuthenticated()) {
      // Handle guest cart
      const guestItems = guestCartUtils.getItems();
      const itemIndex = guestItems.findIndex(item => item.id === cartItemId);
      
      if (itemIndex === -1) {
        throw new Error('Cart item not found');
      }

      guestItems[itemIndex].quantity = data.quantity;
      guestCartUtils.setItems(guestItems);
      
      return await enrichGuestCartItem(guestItems[itemIndex]);
    }

    // Handle authenticated user cart
    return retryRequest(async () => {
      const response = await api.patch(`/cart/${cartItemId}`, data);
      return response.data;
    });
  },

  removeCartItem: async (cartItemId: number): Promise<void> => {
    if (!cartItemId) {
      throw new Error('Invalid cart item ID');
    }

    if (!isAuthenticated()) {
      // Handle guest cart
      const guestItems = guestCartUtils.getItems();
      const filteredItems = guestItems.filter(item => item.id !== cartItemId);
      guestCartUtils.setItems(filteredItems);
      return;
    }

    // Handle authenticated user cart
    return retryRequest(async () => {
      await api.delete(`/cart/${cartItemId}`);
    });
  },

  clearCart: async (): Promise<void> => {
    if (!isAuthenticated()) {
      // Handle guest cart
      guestCartUtils.clearItems();
      return;
    }

    // Handle authenticated user cart
    return retryRequest(async () => {
      await api.delete('/cart');
    });
  },

  // Utility to get cart item count without full data
  getCartItemCount: (): number => {
    if (!isAuthenticated()) {
      const guestItems = guestCartUtils.getItems();
      return guestItems.reduce((sum, item) => sum + item.quantity, 0);
    }
    // For authenticated users, this would typically be handled by the full cart state
    return 0;
  },

  // Utility to merge guest cart with user cart (for scenarios where both exist)
  mergeGuestCartWithUserCart: async (): Promise<void> => {
    if (!isAuthenticated()) return;
    
    const guestItems = guestCartUtils.getItems();
    if (guestItems.length === 0) return;

    try {
      // Get current user cart
      const userCart = await retryRequest(async () => {
        const response = await api.get('/cart');
        return response.data;
      });

      // Merge logic: add guest items that don't exist in user cart
      for (const guestItem of guestItems) {
        const existsInUserCart = userCart.some((userItem: CartItemResponse) => 
          userItem.productId === guestItem.productId &&
          userItem.colorId === guestItem.colorId &&
          userItem.sizeId === guestItem.sizeId
        );

        if (!existsInUserCart) {
          await retryRequest(async () => {
            await api.post('/cart', {
              productId: guestItem.productId,
              quantity: guestItem.quantity,
              colorId: guestItem.colorId,
              sizeId: guestItem.sizeId
            });
          });
        }
      }

      // Clear guest cart after merge
      guestCartUtils.clearItems();
    } catch (error) {
      console.error('Error merging guest cart with user cart:', error);
    }
  }
};

export default cartApi;