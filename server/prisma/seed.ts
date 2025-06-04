import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a test user
  const user = await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    }
  });

  // Create a test category
  const category = await prisma.category.create({
    data: {
      name: 'Test Category'
    }
  });

  // Create a test product
  const product = await prisma.product.create({
    data: {
      name: 'Test Product',
      description: 'A test product',
      price: 99.99,
      imageUrl: 'https://example.com/image.jpg',
      categoryId: category.id,
      subcategory: 'Test Subcategory',
      brand: 'Test Brand',
      inStock: 10
    }
  });

  // Create a test order
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      totalAmount: 99.99,
      items: {
        create: {
          productId: product.id,
          quantity: 1,
          price: 99.99
        }
      }
    }
  });

  console.log('Test data created:', { user, category, product, order });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 