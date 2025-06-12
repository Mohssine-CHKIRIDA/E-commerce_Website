import { Request, Response } from 'express';
import * as cartService from '../services/cart.service';

export const getCart = async (req: Request, res: Response) => {
  const userId = (req.user as { id: number }).id;
  try {
    const cartItems = await cartService.getCartItems(userId);
    res.json(cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get cart' });
  }
};

export const addItemToCart = async (req: Request, res: Response) => {
  const userId = (req.user as { id: number }).id;
  const { productId, quantity = 1, colorId = null, sizeId = null } = req.body;

  // Validation simple
  if (!productId || typeof productId !== 'number') {
     res.status(400).json({ error: 'Invalid or missing productId' });
     return;
  }
  if (quantity && (typeof quantity !== 'number' || quantity <= 0)) {
     res.status(400).json({ error: 'Quantity must be a positive number' });
     return;
  }

  try {
    const cartItem = await cartService.addToCart(userId, {
      productId,
      quantity,
      colorId: colorId !== null ? Number(colorId) : null,
      sizeId: sizeId !== null ? Number(sizeId) : null,
    });
    res.status(201).json(cartItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  const userId = (req.user as { id: number }).id;
  const cartItemId = parseInt(req.params.id);
  const { quantity } = req.body;

  if (!quantity || typeof quantity !== 'number') {
     res.status(400).json({ error: 'Invalid or missing quantity' });
     return;
  }

  try {
    if (quantity <= 0) {
      // Supprime l’item si quantité <= 0
      await cartService.removeCartItem(userId, cartItemId);
       res.json({ message: 'Cart item removed due to zero quantity' });
       return;
    }

    const updated = await cartService.updateCartItem(userId, cartItemId, quantity);
    // Retourne l’item mis à jour (updateMany renvoie un count, on peut améliorer côté service)
    res.json({ message: 'Cart item updated', updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
};

export const removeCartItem = async (req: Request, res: Response) => {
  const userId = (req.user as { id: number }).id;
  const cartItemId = parseInt(req.params.id);

  try {
    await cartService.removeCartItem(userId, cartItemId);
    res.json({ message: 'Cart item removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove cart item' });
  }
};

export const clearUserCart = async (req: Request, res: Response) => {
  const userId = (req.user as { id: number }).id;

  try {
    await cartService.clearCart(userId);
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to clear cart' });
  }
};
