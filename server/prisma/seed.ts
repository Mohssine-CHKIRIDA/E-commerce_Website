import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const Reviews = [
  // iPhone 14 Pro Max - id: 1
  {
    productId: 1,
    rating: 5,
    title: "Incroyable téléphone",
    author: "Amélie D.",
    date: "May 12, 2025",
    content: "Le meilleur iPhone que j’ai eu jusqu’à présent. Rapide, fluide, et superbe écran.",
  },
  {
    productId: 1,
    rating: 4,
    title: "Excellent mais cher",
    author: "Marc L.",
    date: "May 10, 2025",
    content: "Très bon produit, mais le prix reste un peu élevé.",
  },

  // TV Samsung QLED 55” - id: 2
  {
    productId: 2,
    rating: 5,
    title: "Image magnifique",
    author: "Julie P.",
    date: "May 11, 2025",
    content: "Couleurs éclatantes, parfait pour les films. Installation simple.",
  },
  {
    productId: 2,
    rating: 4,
    title: "Bonne TV",
    author: "Thomas R.",
    date: "May 6, 2025",
    content: "Fonctionne bien, son correct. Je suis satisfait.",
  },

  // Dell XPS 13 - id: 3
  {
    productId: 3,
    rating: 5,
    title: "Ultra-portable génial",
    author: "Lucie V.",
    date: "May 8, 2025",
    content: "Très léger et rapide, idéal pour le travail nomade.",
  },
  {
    productId: 3,
    rating: 4,
    title: "Excellent design",
    author: "Nicolas B.",
    date: "May 3, 2025",
    content: "Le design est top, mais chauffe un peu parfois.",
  },

  // Blender Moulinex - id: 4
  {
    productId: 4,
    rating: 5,
    title: "Simple et efficace",
    author: "Claire M.",
    date: "May 2, 2025",
    content: "Je fais des smoothies tous les jours, il est parfait.",
  },
  {
    productId: 4,
    rating: 4,
    title: "Bon rapport qualité/prix",
    author: "Damien H.",
    date: "April 30, 2025",
    content: "Petit mais puissant, bonne surprise pour le prix.",
  },

  // Chaussures Nike - id: 5
  {
    productId: 5,
    rating: 5,
    title: "Très confortables",
    author: "Sophie R.",
    date: "May 7, 2025",
    content: "Je cours avec tous les jours, super maintien et légèreté.",
  },
  {
    productId: 5,
    rating: 4,
    title: "Bonnes chaussures de sport",
    author: "Antoine C.",
    date: "May 4, 2025",
    content: "Confortables mais un peu serrées au début.",
  },

  // Palette L'Oréal - id: 6
  {
    productId: 6,
    rating: 5,
    title: "Super couleurs",
    author: "Nina L.",
    date: "May 9, 2025",
    content: "Les teintes sont sublimes et tiennent bien.",
  },
  {
    productId: 6,
    rating: 4,
    title: "Très jolie palette",
    author: "Eva T.",
    date: "May 1, 2025",
    content: "Bon produit, manque juste un miroir.",
  },

  // PlayStation 5 - id: 7
  {
    productId: 7,
    rating: 5,
    title: "Expérience de jeu incroyable",
    author: "Hugo F.",
    date: "May 12, 2025",
    content: "Graphismes et fluidité au top, la console de rêve.",
  },
  {
    productId: 7,
    rating: 4,
    title: "Très satisfait",
    author: "Mathilde S.",
    date: "May 8, 2025",
    content: "Temps de chargement rapide, interface agréable.",
  },

  // Perceuse Bosch - id: 8
  {
    productId: 8,
    rating: 5,
    title: "Parfaite pour les petits travaux",
    author: "Julien M.",
    date: "May 5, 2025",
    content: "Bonne autonomie et très pratique pour le bricolage.",
  },
  {
    productId: 8,
    rating: 4,
    title: "Très bon outil",
    author: "Léa G.",
    date: "May 2, 2025",
    content: "Facile à utiliser, un peu lourde à la longue.",
  },

  // Tapis de yoga - id: 9
  {
    productId: 9,
    rating: 5,
    title: "Confort optimal",
    author: "Emma B.",
    date: "April 29, 2025",
    content: "Moelleux mais stable, parfait pour mes séances quotidiennes.",
  },
  {
    productId: 9,
    rating: 4,
    title: "Bon produit",
    author: "Sami K.",
    date: "April 27, 2025",
    content: "Antidérapant et facile à nettoyer, rien à redire.",
  },

  {
    productId: 10,
    rating: 5,
    title: "Très pratique",
    author: "Laura C.",
    date: "May 10, 2025",
    content: "Confortable pour mon bébé et facile à plier.",
  },
  {
    productId: 10,
    rating: 4,
    title: "Bonne poussette",
    author: "Olivier P.",
    date: "May 3, 2025",
    content: "Bien conçue et polyvalente. Un bon achat.",
  },
];
const users = [
  { name: "Amélie D.", email: "amelie@example.com" },
  { name: "Marc L.", email: "marc@example.com" },
  { name: "Julie P.", email: "julie@example.com" },
  { name: "Thomas R.", email: "thomas@example.com" },
  { name: "Lucie V.", email: "lucie@example.com" },
  { name: "Nicolas B.", email: "nicolas@example.com" },
  { name: "Claire M.", email: "claire@example.com" },
  { name: "Damien H.", email: "damien@example.com" },
  { name: "Sophie R.", email: "sophie@example.com" },
  { name: "Antoine C.", email: "antoine@example.com" },
  { name: "Nina L.", email: "nina@example.com" },
  { name: "Eva T.", email: "eva@example.com" },
  { name: "Hugo F.", email: "hugo@example.com" },
  { name: "Mathilde S.", email: "mathilde@example.com" },
  { name: "Julien M.", email: "julien@example.com" },
  { name: "Léa G.", email: "lea@example.com" },
  { name: "Emma B.", email: "emma@example.com" },
  { name: "Sami K.", email: "sami@example.com" },
  { name: "Laura C.", email: "laura@example.com" },
  { name: "Olivier P.", email: "olivier@example.com" },
];

const userMap: Record<string, number> = {};




async function seedUsers() {
  for (const user of users) {
    const hashedPassword = await bcrypt.hash("password123", 10);
    const created = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword, // utilise bcrypt si besoin
      },
    });
    userMap[user.name] = created.id;
  }
}

async function seedReviews() {
  for (const review of Reviews) {
    const userId = userMap[review.author]; // Associe le bon auteur

    if (!userId) continue; // Ignore si l'utilisateur n'existe pas

    await prisma.review.create({
      data: {
        title: review.title,
        content: review.content,
        rating: review.rating,
        date: new Date(review.date),
        userId: userId,
        productId: review.productId,
      },
    });
  }
}
async function main() {
  await seedUsers();
  await seedReviews();
}
main()
  .then(() => {
    console.log("Seeding completed.");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect();
  });