import Header from "../components/Header";
import { categories } from "../components/Categories/cat";
import Hero from "../components/Promos/Hero";
import CategoriesSlider from "../components/Categories/CategoriesSlider";
import Footer from "../components/Footer";
import BestSellingProduct from "../components/Products/BestSellingProduct";
import { CartProvider } from "../components/Cart/CartContext";
import { HeroPromo } from "../components/Promos/HeroPromo";
import { DiscountBanner } from "../components/Promos/DiscountBanner";
import { FeaturesGrid } from "../components/Promos/FeaturesGrid";
import { NewsletterSignup } from "../components/Promos/NewsletterSignup";
function MainPage() {
  return (
    <>
      <CartProvider>
        <Header />
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
