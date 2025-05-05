import { ShoppingBag, TruckIcon, CreditCard, Repeat } from "lucide-react";
export function FeaturesGrid() {
  const features = [
    {
      icon: <TruckIcon className="w-6 h-6" />,
      title: "Free Shipping",
      description: "Free shipping on all orders over $50",
    },
    {
      icon: <Repeat className="w-6 h-6" />,
      title: "Easy Returns",
      description: "30-day easy return policy",
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Secure Payment",
      description: "Multiple secure payment methods",
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "Exclusive Deals",
      description: "Member-only discounts and offers",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-6 border border-gray-200 rounded-lg bg-white hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
