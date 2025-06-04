import React from "react";

interface RewardActivity {
  description: string;
  points: number;
}

interface EarningRule {
  description: string;
}

const RewardsComponent: React.FC = () => {
  const currentPoints: number = 2340;
  const pointsValue: number = currentPoints / 100; // $1 per 100 points

  const earningRules: EarningRule[] = [
    { description: "$1 spent = 1 point" },
    { description: "Product reviews = 50 points" },
    { description: "Birthday bonus = 200 points" },
  ];

  const recentActivity: RewardActivity[] = [
    { description: "Purchase #ORD-2024-001", points: 128 },
    { description: "Product Review", points: 50 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Rewards & Points
      </h2>
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white mb-6">
        <h3 className="text-2xl font-bold mb-2">
          {currentPoints.toLocaleString()} Points
        </h3>
        <p className="opacity-90">Worth ${pointsValue.toFixed(2)} in rewards</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">
            How to Earn Points
          </h3>
          <ul className="space-y-2">
            {earningRules.map((rule, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                {rule.description}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-2">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-600">{activity.description}</span>
                <span className="text-green-600">+{activity.points} pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsComponent;
