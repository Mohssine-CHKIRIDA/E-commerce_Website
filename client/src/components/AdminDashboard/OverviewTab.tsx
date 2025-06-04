import React from "react";
import { DollarSign, ShoppingCart, Users, Package } from "lucide-react";
import { StatCard } from "./StatCard";
import { SalesChart } from "./SalesChart";
import { CategoryChart } from "./CategoryChart";
import { OrdersTable } from "./OrdersTable";
import { Order, SalesData, CategoryData } from "./types";

interface OverviewTabProps {
  salesData: SalesData[];
  categoryData: CategoryData[];
  recentOrders: Order[];
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  salesData,
  categoryData,
  recentOrders,
}) => (
  <div className="space-y-6">
    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Revenue"
        value="0"
        change="%"
        trend="up"
        icon={<DollarSign className="w-6 h-6 text-blue-600" />}
      />
      <StatCard
        title="Orders"
        value={"0"}
        change="%"
        trend="up"
        icon={<ShoppingCart className="w-6 h-6 text-blue-600" />}
      />
      <StatCard
        title="Customers"
        value={"0"}
        change="%"
        trend="up"
        icon={<Users className="w-6 h-6 text-blue-600" />}
      />
      <StatCard
        title="Products"
        value={"0"}
        change="%"
        trend="down"
        icon={<Package className="w-6 h-6 text-blue-600" />}
      />
    </div>

    {/* Charts Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SalesChart data={salesData} />
      <CategoryChart data={categoryData} />
    </div>

    {/* Recent Orders */}
    <OrdersTable orders={recentOrders} />
  </div>
);
