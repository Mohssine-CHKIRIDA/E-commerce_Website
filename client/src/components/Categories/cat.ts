import {
    FaMobileAlt,
    FaTv,
    FaLaptop,
    FaHome,
    FaPlug,
    FaTshirt,
    FaHeart,
    FaGamepad,
    FaTools,
    FaFootballBall,
    FaBaby,
    FaThLarge,
  } from "react-icons/fa";
  
  export const categories = [
    {
      id: 1,
      name: "Téléphone & Tablette",
      icon: FaMobileAlt,
      imageUrl: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg", // Smartphone
      subcategories: ["Smartphones", "Tablettes", "Accessoires"],
    },
    {
      id: 2,
      name: "TV & HIGH TECH",
      icon: FaTv,
      imageUrl: "https://images.pexels.com/photos/3945653/pexels-photo-3945653.jpeg", // TV
      subcategories: ["TVs", "Projecteurs", "Audio"],
    },
    {
      id: 3,
      name: "Informatique",
      icon: FaLaptop,
      imageUrl: "https://images.pexels.com/photos/18105/pexels-photo.jpg", // Laptop
      subcategories: ["PC", "Imprimantes", "Stockage"],
    },
    {
      id: 4,
      name: "Maison, cuisine & bureau",
      icon: FaHome,
      imageUrl: "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg", // Home decor
      subcategories: ["Décoration", "Cuisine", "Meubles"],
    },
    {
      id: 5,
      name: "Électroménager",
      icon: FaPlug,
      imageUrl: "https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg", // Appliances (Kitchen)
      subcategories: ["Réfrigérateur", "Micro-onde", "Lave-linge"],
    },
    {
      id: 6,
      name: "Vêtements & Chaussures",
      icon: FaTshirt,
      imageUrl: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg", // Clothes
      subcategories: ["Homme", "Femme", "Enfant"],
    },
    {
      id: 7,
      name: "Beauté & Santé",
      icon: FaHeart,
      imageUrl: "https://images.pexels.com/photos/3865556/pexels-photo-3865556.jpeg", // Makeup and beauty
      subcategories: ["Soins", "Maquillage", "Santé"],
    },
    {
      id: 8,
      name: "Jeux vidéos & Consoles",
      icon: FaGamepad,
      imageUrl: "https://images.pexels.com/photos/1293269/pexels-photo-1293269.jpeg", // Gaming
      subcategories: ["PS5", "Xbox", "Nintendo"],
    },
    {
      id: 9,
      name: "Bricolage",
      icon: FaTools,
      imageUrl: "https://images.pexels.com/photos/209235/pexels-photo-209235.jpeg", // Tools
      subcategories: ["Outils", "Électricité", "Plomberie"],
    },
    {
      id: 10,
      name: "Sports & Loisirs",
      icon: FaFootballBall,
      imageUrl: "https://images.pexels.com/photos/3991877/pexels-photo-3991877.jpeg", // Sport/Fitness
      subcategories: ["Fitness", "Camping", "Vélos"],
    },
    {
      id: 11,
      name: "Bébé & Jouets",
      icon: FaBaby,
      imageUrl: "https://images.pexels.com/photos/3933275/pexels-photo-3933275.jpeg", // Baby toys
      subcategories: ["Jouets", "Poussettes", "Vêtements bébé"],
    },
    {
      id: 12,
      name: "Autres catégorie",
      icon: FaThLarge,
      imageUrl: "https://images.pexels.com/photos/315191/pexels-photo-315191.jpeg", // Misc
      subcategories: ["Divers", "Autres"],
    },
  ];
  