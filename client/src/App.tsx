import "./App.css";

import Header from "./components/Header";
import { categories } from "./components/Categories/cat";
import Hero from "./components/Hero";
import CategoriesSlider from "./components/Categories/CategoriesSlider";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <Header />
      <Hero />
      <CategoriesSlider categorie={categories} />
      <Footer />
    </>
  );
}

export default App;
