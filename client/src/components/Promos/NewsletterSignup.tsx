import { useState } from "react";
import { CalendarDays } from "lucide-react";
export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
              <CalendarDays className="w-6 h-6" />
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Stay Updated with New Arrivals & Exclusive Offers
          </h2>

          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors"
            >
              Subscribe
            </button>
          </form>

          {subscribed && (
            <div className="mt-4 p-2 bg-green-100 text-green-700 rounded-md">
              Thank you for subscribing!
            </div>
          )}

          <p className="text-xs text-gray-500 mt-6">
            By subscribing you agree to our Privacy Policy and receive our
            promotional emails. You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
