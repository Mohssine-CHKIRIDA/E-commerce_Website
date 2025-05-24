import { useParams } from "react-router-dom";
import ProductReviewP from "../components/ProductReview/ProductReviewP";
import { Products } from "../components/Products/Products";
import ErrorPage from "./ErrorPage";

export default function ProductReviewPage() {
  const { id } = useParams<{ id: string }>();
  const productSelected = Products.find((product) => product.id === Number(id));

  if (!productSelected) return <ErrorPage />;
  return <ProductReviewP product={productSelected} />;
}
