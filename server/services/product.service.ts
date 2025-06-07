import prisma from '../prisma/client';

interface ProductInput {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  rating: number;
  categoryId: number;
  subcategoryId: number;
  brandName: string;  // marque en string libre
  inStock: number;
  colors: { name: string; hex: string }[];
  sizes: (number | string)[];
}

export const createProduct = async (data: ProductInput) => {
  // 1. Gérer les tailles : créer si elles n'existent pas, puis préparer les connexions
  const sizeConnections = await Promise.all(
    data.sizes.map(async (sizeValue) => {
      const value = typeof sizeValue === 'number' ? String(sizeValue) : sizeValue;

      const size = await prisma.size.upsert({
        where: { value },
        update: {},
        create: { value },
      });

      return {
        size: { connect: { id: size.id } },
      };
    })
  );

  // 2. Gérer la marque : récupérer ou créer et connecter à la catégorie
  let brand = await prisma.brand.findUnique({
    where: { name: data.brandName },
    include: { categories: true },
  });

  if (!brand) {
    brand = await prisma.brand.create({
      data: {
        name: data.brandName,
        categories: {
          connect: { id: data.categoryId },
        },
      },
      include: { categories: true },
    });
  } else {
    const isLinkedToCategory = brand.categories.some(cat => cat.id === data.categoryId);
    if (!isLinkedToCategory) {
      await prisma.brand.update({
        where: { id: brand.id },
        data: {
          categories: {
            connect: { id: data.categoryId },
          },
        },
      });
    }
  }

  // 3. Créer les couleurs : créer si besoin, puis préparer les connexions
  const colorCreates = await Promise.all(
    data.colors.map(async ({ name, hex }) => {
      let color = await prisma.color.findUnique({ where: { name } });
      if (!color) {
        color = await prisma.color.create({ data: { name, hex } });
      }
      return {
        color: { connect: { id: color.id } },
      };
    })
  );

  // 4. Créer le produit avec toutes les relations
  return await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      imageUrl: data.imageUrl,
      rating: data.rating,
      categoryId: data.categoryId,
      subcategoryId: data.subcategoryId,
      brandId: brand.id,
      inStock: data.inStock,
      productColors: { create: colorCreates },
      productSizes: { create: sizeConnections },
    },
    include: {
      brand: true,
      category: true,
      subcategory: true,
      productColors: { include: { color: true } },
      productSizes: { include: { size: true } },
    },
  });
};


export const getAllProducts = async () => {
  return await prisma.product.findMany({
    include: {
      category: true,
      subcategory: true,
      brand: true,
      productColors: { include: { color: true } },
      productSizes: { include: { size: true } },
    },
  });
};

export const getProductById = async (id: number) => {
  return await prisma.product.findUnique({
    where: { id },
    include: {
      brand: true,
      category: true,
      subcategory: true,
      productColors: { include: { color: true } },
      productSizes: { include: { size: true } },
      reviews: true,
    },
  });
};
