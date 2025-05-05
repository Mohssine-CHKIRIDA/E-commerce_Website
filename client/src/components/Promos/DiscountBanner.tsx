import { useEffect, useMemo, useState } from "react";
import { Gift } from "lucide-react";

export function DiscountBanner() {
  // Calcule la date de fin une seule fois au montage
  const deadline = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2); // 2 jours à partir de maintenant
    return d;
  }, []);

  function getTimeRemaining() {
    const now = new Date();
    const total = deadline.getTime() - now.getTime();

    const seconds = Math.max(Math.floor((total / 1000) % 60), 0);
    const minutes = Math.max(Math.floor((total / 1000 / 60) % 60), 0);
    const hours = Math.max(Math.floor((total / (1000 * 60 * 60)) % 24), 0);
    const days = Math.max(Math.floor(total / (1000 * 60 * 60 * 24)), 0);

    return { days, hours, minutes, seconds };
  }

  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = getTimeRemaining();
      setTimeLeft(remaining);

      if (
        remaining.days <= 0 &&
        remaining.hours <= 0 &&
        remaining.minutes <= 0 &&
        remaining.seconds <= 0
      ) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deadline]);

  return (
    <section className="bg-indigo-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left max-w-lg">
            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
              Special Offer
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Get 25% Off Your First Purchase
            </h2>
            <p className="text-gray-600 mb-6">
              Use code{" "}
              <span className="font-mono bg-white px-2 py-1 rounded border border-indigo-100 font-semibold text-indigo-700">
                WELCOME25
              </span>{" "}
              at checkout for 25% off your first order.
            </p>
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors">
              Shop the Sale
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-auto">
            <div className="text-center mb-4">
              <Gift className="w-6 h-6 mx-auto text-indigo-600" />
              <p className="text-gray-600 mt-2">Sale Ends In:</p>
            </div>

            <div className="flex gap-4">
              {["days", "hours", "minutes", "seconds"].map((unit) => (
                <div key={unit} className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-2xl font-bold text-indigo-700">
                    {timeLeft[unit as keyof typeof timeLeft]
                      .toString()
                      .padStart(2, "0")}
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
