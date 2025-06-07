import prisma from "../prisma/client";

// === CATEGORY ===

export const getAllCategories = () => prisma.category.findMany({
  include: { subcategories: true, brands: true }
});

export const getCategoryById = (id: number) => prisma.category.findUnique({
  where: { id },
  include: { subcategories: true, brands: true }
});

export const createCategory = (data: { name: string; imageUrl?: string }) =>
  prisma.category.create({ data });

export const updateCategory = (id: number, data: { name?: string; imageUrl?: string }) =>
  prisma.category.update({ where: { id }, data });

export const deleteCategory = (id: number) =>
  prisma.category.delete({ where: { id } });

// === SUBCATEGORY ===
export const getAllSubcategories = () => prisma.subcategory.findMany({ include: { category: true } });

export const createSubcategory = (data: { name: string; categoryId: number }) =>
  prisma.subcategory.create({ data });

export const updateSubcategory = (id: number, data: { name?: string; categoryId?: number }) =>
  prisma.subcategory.update({ where: { id }, data });

export const deleteSubcategory = (id: number) =>
  prisma.subcategory.delete({ where: { id } });

// === BRAND ===
export const getAllBrands = () => prisma.brand.findMany({ include: { categories: true } });

export const createBrand = (data: { name: string; categoryIds: number[] }) =>
  prisma.brand.create({
    data: {
      name: data.name,
      categories: {
        connect: data.categoryIds.map((id) => ({ id }))
      }
    }
  });

export const updateBrand = (id: number, data: { name?: string; categoryIds?: number[] }) =>
  prisma.brand.update({
    where: { id },
    data: {
      name: data.name,
      categories: data.categoryIds
        ? { set: data.categoryIds.map((id) => ({ id })) }
        : undefined
    }
  });

export const deleteBrand = (id: number) =>
  prisma.brand.delete({ where: { id } });
