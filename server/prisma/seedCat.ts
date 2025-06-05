import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



const categories = [
  {
    id: 1,
    name: "Phones & Tablets",

    imageUrl: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg",
    subcategories: ["Smartphones", "Tablets", "Accessories"],
    brands: ["Apple", "Samsung", "Xiaomi", "Huawei"],
  },
  {
    id: 2,
    name: "TV & High Tech",

    imageUrl: "https://images.pexels.com/photos/3945653/pexels-photo-3945653.jpeg",
    subcategories: ["TVs", "Projectors", "Audio"],
    brands: ["Samsung", "LG", "Sony", "TCL"],
  },
  {
    id: 3,
    name: "Computing",

    imageUrl: "https://images.pexels.com/photos/18105/pexels-photo.jpg",
    subcategories: ["PCs", "Printers", "Storage"],
    brands: ["Dell", "HP", "Asus", "Lenovo"],
  },
  {
    id: 4,
    name: "Home, Kitchen & Office",

    imageUrl: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg",
    subcategories: ["Decoration", "Kitchen", "Furniture"],
    brands: ["Ikea", "Conforama", "But", "Maisons du Monde"],
  },
  {
    id: 5,
    name: "Home Appliances",

    imageUrl: "https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg",
    subcategories: ["Refrigerators", "Microwaves", "Washing Machines"],
    brands: ["Moulinex", "Bosch", "Whirlpool", "Beko"],
  },
  {
    id: 6,
    name: "Clothing & Shoes",

    imageUrl: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg",
    subcategories: ["Men", "Women", "Kids"],
    brands: ["Nike", "Adidas", "Zara", "H&M"],
  },
  {
    id: 7,
    name: "Beauty & Health",

    imageUrl: "https://images.pexels.com/photos/3865556/pexels-photo-3865556.jpeg",
    subcategories: ["Care", "Makeup", "Health"],
    brands: ["L'Oréal", "Nivea", "Garnier", "Sephora"],
  },
  {
    id: 8,
    name: "Video Games & Consoles",

    imageUrl: "https://images.pexels.com/photos/1293269/pexels-photo-1293269.jpeg",
    subcategories: ["PS5", "Xbox", "Nintendo"],
    brands: ["Sony", "Microsoft", "Nintendo"],
  },
  {
    id: 9,
    name: "DIY & Tools",

    imageUrl: "https://images.pexels.com/photos/209235/pexels-photo-209235.jpeg",
    subcategories: ["Tools", "Electricity", "Plumbing"],
    brands: ["Bosch", "Black & Decker", "Makita", "Dexter"],
  },
  {
    id: 10,
    name: "Sports & Leisure",
    
    imageUrl: "https://images.pexels.com/photos/3991877/pexels-photo-3991877.jpeg",
    subcategories: ["Fitness", "Camping", "Bikes"],
    brands: ["Decathlon", "Domyos", "Adidas", "Nike"],
  },
  {
    id: 11,
    name: "Baby & Toys",
    imageUrl: "https://images.pexels.com/photos/3933275/pexels-photo-3933275.jpeg",
    subcategories: ["Toys", "Strollers", "Baby Clothes"],
    brands: ["Chicco", "Fisher-Price", "Bébé Confort", "Playmobil"],
  },
  {
    id: 12,
    name: "Other Categories",
    imageUrl: "https://images.pexels.com/photos/315191/pexels-photo-315191.jpeg",
    subcategories: ["Miscellaneous", "Others"],
    brands: ["Other"],
  },
];


async function main() {
  for (const category of categories) {
    const createdCategory = await prisma.category.create({
      data: {
        name: category.name,
      },
    });


    for (const subName of category.subcategories) {
      await prisma.subcategory.create({
        data: {
          name: subName,
          categoryId: createdCategory.id,
        },
      });
    }

    for (const brandName of category.brands) {
      // chercher ou créer la marque
      let brand = await prisma.brand.findUnique({
        where: { name: brandName },
      });

      if (!brand) {
        brand = await prisma.brand.create({
          data: { name: brandName },
        });
      }

      // maintenant relier la marque à la catégorie (N-N)
      await prisma.category.update({
        where: { id: createdCategory.id },
        data: {
          brands: {
            connect: { id: brand.id },
          },
        },
      });
    }

    console.log(`Inserted category ${createdCategory.name} with subcategories and brands`);
  }
}


main()
  .then(() => {
    console.log('Seeding completed.');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect();
  })
