import React from "react";
import { Heart } from "lucide-react";

const WishlistComponent: React.FC = () => {
  const handleStartShopping = (): void => {
    console.log("Start shopping");
    // Navigation to shopping page would go here
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h2>
      <div className="text-center py-12">
        <Heart size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Your wishlist is empty
        </h3>
        <p className="text-gray-600 mb-4">
          Save items you love to buy them later
        </p>
        <button
          onClick={handleStartShopping}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Shopping
        </button>
      </div>
    </div>
  );
};

export default WishlistComponent;
