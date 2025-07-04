import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const products = [
  {
    id: 1,
    name: "iPhone 14 Pro Max",
    category: "Phones & Tablets",
    subcategory: "Smartphones",
    imageUrl: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg",
    price: 1299,
    InStock: 8,
    brand: "Apple",
    rating: 4.8,
    numReviews: 154,
    description: "High-end smartphone with Super Retina XDR display and A16 Bionic chip.",
    colors: [
      { name: "Silver", hex: "#D1D5DB" },
      { name: "Space Black", hex: "#111827" },
      { name: "Gold", hex: "#FACC15" },
      { name: "Deep Purple", hex: "#6B21A8" },
    ],
        sizes: [],

  },
  {
    id: 2,
    name: "Samsung QLED 55” TV",
    category: "TV & High Tech",
    subcategory: "TVs",
    imageUrl: "https://images.pexels.com/photos/3945653/pexels-photo-3945653.jpeg",
    price: 849,
    InStock: 12,
    brand: "Samsung",
    rating: 4.6,
    numReviews: 78,
    description: "QLED TV with 4K resolution and HDR 10+ technology for vibrant images.",
    colors: [],
sizes: [],

  },
  {
    id: 3,
    name: "Dell XPS 13 Laptop",
    category: "Computing",
    subcategory: "Laptops",
    imageUrl: "https://images.pexels.com/photos/18105/pexels-photo.jpg",
    price: 1099,
    InStock: 5,
    brand: "Dell",
    rating: 4.7,
    numReviews: 65,
    description: "Lightweight ultrabook with InfinityEdge display and Intel Core i7 processor.",
    colors: [
      { name: "Silver", hex: "#D1D5DB" },
      { name: "Black", hex: "#1F2937" },
    ],
        sizes: [],

  },
  {
    id: 4,
    name: "Moulinex Easy Mix Blender",
    category: "Home Appliances",
    subcategory: "Blenders",
    imageUrl: "https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg",
    price: 49,
    InStock: 25,
    brand: "Moulinex",
    rating: 4.4,
    numReviews: 33,
    description: "Compact and powerful blender, perfect for smoothies and soups.",
      colors: [],
sizes: [],
  },
  {
    id: 5,
    name: "Nike Air Zoom Running Shoes",
    category: "Clothing & Shoes",
    subcategory: "Sports Shoes",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/4b476e07-8dce-4d55-8ff7-49299ab0696f/NIKE+PEGASUS+PREMIUM.png",
    price: 89,
    InStock: 18,
    brand: "Nike",
    rating: 4.5,
    numReviews: 112,
    description: "Lightweight and comfortable shoes ideal for running and sports.",
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Blue", hex: "#2563EB" },
      { name: "Red", hex: "#DC2626" },
    ],
    sizes: [38, 39, 40, 41, 42, 43, 44],
  },
  {
    id: 6,
    name: "L'Oréal Makeup Palette",
    category: "Beauty & Health",
    subcategory: "Makeup",
    imageUrl: "https://www.loreal-paris.fr/dw/image/v2/BHHX_PRD/on/demandware.static/-/Sites-lorealparis-fr-catalog/default/dw98323331/ProductImages/OAP7043/3600523873821/3600523873821-01.jpg?sw=465&sh=465&sm=cut&sfrm=jpg&q=70",
    price: 29,
    InStock: 50,
    brand: "L'Oréal",
    rating: 4.3,
    numReviews: 47,
    description: "Complete palette with natural and glittering shades for every look.",
      colors: [],
sizes: [],
  },
  {
    id: 7,
    name: "PlayStation 5 Console",
    category: "Video Games & Consoles",
    subcategory: "Gaming Consoles",
    imageUrl: "https://images.pexels.com/photos/1293269/pexels-photo-1293269.jpeg",
    price: 599,
    InStock: 10,
    brand: "Sony",
    rating: 4.9,
    numReviews: 210,
    description: "Next-gen console with exceptional gaming performance and ultra-fast SSD.",
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#000000" },
    ],
        sizes: [],

  },
  {
    id: 8,
    name: "Bosch Cordless Drill",
    category: "DIY",
    subcategory: "Power Tools",
    imageUrl: "https://images.pexels.com/photos/209235/pexels-photo-209235.jpeg",
    price: 79,
    InStock: 22,
    brand: "Bosch",
    rating: 4.6,
    numReviews: 89,
    description: "Powerful drill/driver with long-lasting battery and fast charging.",
      colors: [],
sizes: [],
  },
  {
    id: 9,
    name: "Non-Slip Yoga Mat",
    category: "Sports & Leisure",
    subcategory: "Fitness Accessories",
    imageUrl: "https://images.pexels.com/photos/3991877/pexels-photo-3991877.jpeg",
    price: 25,
    InStock: 30,
    brand: "Decathlon",
    rating: 4.2,
    numReviews: 41,
    description: "Comfortable and lightweight mat for yoga or fitness practice.",
    colors: [
      { name: "Purple", hex: "#9333EA" },
      { name: "Blue", hex: "#2563EB" },
      { name: "Green", hex: "#16A34A" },
      { name: "Gray", hex: "#9CA3AF" },
    ],
    sizes: [],

  },
  {
    id: 10,
    name: "3-in-1 Baby Stroller",
    category: "Baby & Toys",
    subcategory: "Strollers",
    imageUrl: "https://images.pexels.com/photos/3933275/pexels-photo-3933275.jpeg",
    price: 199,
    InStock: 7,
    brand: "Chicco",
    rating: 4.7,
    numReviews: 36,
    description: "Comfortable multifunction stroller, easy to fold and suitable from birth.",
    colors: [
      { name: "Gray", hex: "#9CA3AF" },
      { name: "Black", hex: "#000000" },
      { name: "Navy Blue", hex: "#1E3A8A" },
    ],
    sizes: [],

  },
];
async function getOrCreateCategory(name: string) {
  return prisma.category.upsert({
    where: { name },
    update: {},
    create: { name },
  });
}

async function getOrCreateBrand(name: string) {
  return prisma.brand.upsert({
    where: { name },
    update: {},
    create: { name },
  });
}

async function getOrCreateSubcategory(name: string,categoryId: number) {
  return prisma.subcategory.upsert({
    where: { name },
    update: {},
     create: {
      name,
      category: { connect: { id: categoryId } }, // ✅ liaison avec la catégorie
    },
  });
}

async function getOrCreateColor({ name, hex }: { name: string; hex: string }) {
  return prisma.color.upsert({
    where: { name },
    update: {},
    create: { name, hex },
  });
}

async function getOrCreateSize(value: number) {
  return prisma.size.upsert({
    where: { value: value.toString() },
    update: {},
    create: { value:value.toString() },
  });
}

async function main() {
  for (const product of products) {
    const brand = await getOrCreateBrand(product.brand);
    const category = await getOrCreateCategory(product.category);
    const subcategory = await getOrCreateSubcategory(product.subcategory,category.id);

    const createdProduct = await prisma.product.create({
      data: {
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        inStock: product.InStock,
        rating: product.rating,
        numReviews: product.numReviews,
        description: product.description,
        category: { connect: { id: category.id } },
        brand: { connect: { id: brand.id } },
        subcategory: { connect: { id: subcategory.id } },
      },
    });

    for (const color of product.colors || []) {
      const colorEntry = await getOrCreateColor(color);
      await prisma.productColor.create({
        data: {
          productId: createdProduct.id,
          colorId: colorEntry.id,
        },
      });
    }

    for (const size of product.sizes || []) {
      const sizeEntry = await getOrCreateSize(size);
      await prisma.productSize.create({
        data: {
          productId: createdProduct.id,
          sizeId: sizeEntry.id,
        },
      });
    }
  }
}

main()
  .then(() => {
    console.log("✅ Seeded successfully");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect();
  });
