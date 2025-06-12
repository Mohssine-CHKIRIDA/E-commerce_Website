import Header from "../components/Header";
import Hero from "../components/Promos/Hero";
import CategoriesSlider from "../components/Categories/CategoriesSlider";
import Footer from "../components/Footer";
import BestSellingProduct from "../components/Products/BestSellingProduct";
import { CartProvider } from "../Context/CartContext";
import { HeroPromo } from "../components/Promos/HeroPromo";
import { DiscountBanner } from "../components/Promos/DiscountBanner";
import { FeaturesGrid } from "../components/Promos/FeaturesGrid";
import { NewsletterSignup } from "../components/Promos/NewsletterSignup";
import { useCategories } from "../hooks/hookCategory";
import { Toaster } from "react-hot-toast";
function MainPage() {
  const { categories } = useCategories();
  return (
    <>
      <CartProvider>
        <Header />
        <Toaster position="top-right" />
        <HeroPromo />
        <Hero />
        <CategoriesSlider categorie={categories} />
        <DiscountBanner />
        <BestSellingProduct />
        <FeaturesGrid />
        <NewsletterSignup />
        <Footer />
      </CartProvider>
    </>
  );
}

export default MainPage;
