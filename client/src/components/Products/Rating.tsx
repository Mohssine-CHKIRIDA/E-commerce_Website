import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface Props {
  rating: number;
  numReviews: number;
  caption?: string;
}

const Rating = ({ rating, numReviews, caption }: Props) => {
  const renderStar = (index: number) => {
    if (rating >= index) {
      return <FaStar />;
    } else if (rating >= index - 0.5) {
      return <FaStarHalfAlt />;
    } else {
      return <FaRegStar />;
    }
  };

  return (
    <div className="rating flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i}>{renderStar(i)}</span>
      ))}
      <span className="ml-2 text-sm">
        {caption ? caption : `${numReviews} reviews`}
      </span>
    </div>
  );
};

export default Rating;
