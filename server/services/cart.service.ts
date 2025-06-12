import prisma from '../prisma/client';
import { Prisma } from "@prisma/client";

interface AddToCartParams {
  productId: number;
  quantity?: number;
  colorId?: number | null;
  sizeId?: number | null;
}

type CartItemWithRelations = Prisma.CartItemGetPayload<{
  include: {
    product: {
      select: {
        id: true;
        name: true;
        price: true;
        imageUrl: true;
        inStock: true;
      };
    };
    color: {
      select: {
        id: true;
        name: true;
        hex: true;
      };
    };
    size: {
      select: {
        id: true;
        value: true;
      };
    };
  };
}>;

export const getCartItems = async (userId: number): Promise<CartItemWithRelations[]> => {
  return prisma.cartItem.findMany({
    where: { userId },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          price: true,
          imageUrl: true,
          inStock: true,
        },
      },
      color: {
        select: {
          id: true,
          name: true,
          hex: true,
        },
      },
      size: {
        select: {
          id: true,
          value: true,
        },
      },
    },
  });
};

export const addToCart = async (userId: number, params: AddToCartParams): Promise<CartItemWithRelations> => {
  const { productId, quantity = 1, colorId, sizeId } = params;

  // Préparer la condition de recherche
  const whereCondition: Prisma.CartItemWhereInput = {
    userId,
    productId,
    ...(colorId !== null && colorId !== undefined ? { colorId } : {}),
    ...(sizeId !== null && sizeId !== undefined ? { sizeId } : {}),
  };

  // Vérifier si l'item existe déjà dans le panier
  const existing = await prisma.cartItem.findFirst({ where: whereCondition });

  if (existing) {
    return prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            imageUrl: true,
            inStock: true,
          },
        },
        color: {
          select: {
            id: true,
            name: true,
            hex: true,
          },
        },
        size: {
          select: {
            id: true,
            value: true,
          },
        },
      },
    });
  }

  // Créer un nouvel item dans le panier
  const data: any = {
    userId,
    productId,
    quantity,
  };

  // Only add colorId and sizeId if they have actual numeric values
  if (colorId !== null && colorId !== undefined) {
    data.colorId = colorId;
  }
  
  if (sizeId !== null && sizeId !== undefined) {
    data.sizeId = sizeId;
  }

  return prisma.cartItem.create({
    data,
    include: {
      product: {
        select: {
          id: true,
          name: true,
          price: true,
          imageUrl: true,
          inStock: true,
        },
      },
      color: {
        select: {
          id: true,
          name: true,
          hex: true,
        },
      },
      size: {
        select: {
          id: true,
          value: true,
        },
      },
    },
  });
};

export const updateCartItem = async (userId: number, cartItemId: number, quantity: number): Promise<CartItemWithRelations> => {
  // First verify the item belongs to the user
  const cartItem = await prisma.cartItem.findFirst({
    where: { id: cartItemId, userId }
  });

  if (!cartItem) {
    throw new Error('Cart item not found or does not belong to user');
  }

  return prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          price: true,
          imageUrl: true,
          inStock: true,
        },
      },
      color: {
        select: {
          id: true,
          name: true,
          hex: true,
        },
      },
      size: {
        select: {
          id: true,
          value: true,
        },
      },
    },
  });
};

export const removeCartItem = async (userId: number, cartItemId: number): Promise<CartItemWithRelations> => {
  // First verify the item belongs to the user
  const cartItem = await prisma.cartItem.findFirst({
    where: { id: cartItemId, userId }
  });

  if (!cartItem) {
    throw new Error('Cart item not found or does not belong to user');
  }

  return prisma.cartItem.delete({
    where: { id: cartItemId },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          price: true,
          imageUrl: true,
          inStock: true,
        },
      },
      color: {
        select: {
          id: true,
          name: true,
          hex: true,
        },
      },
      size: {
        select: {
          id: true,
          value: true,
        },
      },
    },
  });
};

export const clearCart = async (userId: number): Promise<{ count: number }> => {
  return prisma.cartItem.deleteMany({
    where: { userId },
  });
};