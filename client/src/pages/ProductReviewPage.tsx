import { useParams } from "react-router-dom";
import ProductReviewP from "../components/ProductReview/ProductReviewP";
import ErrorPage from "./ErrorPage";
import { useProducts } from "../hooks/hookProducts";

export default function ProductReviewPage() {
  const { id } = useParams<{ id: string }>();
  const { products, loading } = useProducts();
  if (loading) return <p>Loading...</p>;
  const productSelected = products.find((product) => product.id === Number(id));

  if (!productSelected) return <ErrorPage />;
  return <ProductReviewP product={productSelected} />;
}
