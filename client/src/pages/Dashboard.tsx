import { useState } from "react";
import { Sidebar } from "../components/AdminDashboard/Sidebar";
import { Header } from "../components/AdminDashboard/Header";
import { OverviewTab } from "../components/AdminDashboard/OverviewTab";
import { ProductsTable } from "../components/AdminDashboard/ProductsList";
import { OrdersTablePage } from "../components/AdminDashboard/OrdersTablePage";
import {
  TabType,
  Order,
  SalesData,
  CategoryData,
} from "../components/AdminDashboard/types";
import { CustomersTable } from "../components/AdminDashboard/CustomersTable";
import { ProductCreationForm } from "../components/AdminDashboard/ProductCreatePage";
import { useProducts } from "../hooks/hookProducts";
import { Product } from "../components/types";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { products, loading } = useProducts();

  if (loading) return <p>Loading...</p>;
  const salesData: SalesData[] = [];
  const categoryData: CategoryData[] = [];
  const recentOrders: Order[] = [];
  const topProducts: Product[] = products.filter(
    (product) => product.rating > 4
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <OverviewTab
            salesData={salesData}
            categoryData={categoryData}
            recentOrders={recentOrders}
          />
        );
      case "products-list":
        return (
          <ProductsTable
            products={topProducts}
            setEditingProduct={setEditingProduct}
            setActiveTab={setActiveTab}
          />
        );
      case "products-create":
        return <ProductCreationForm />;
      case "products-edit":
        return <ProductCreationForm productEdit={editingProduct} />;
      case "orders":
        return <OrdersTablePage />;
      case "customers":
        return <CustomersTable />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header activeTab={activeTab} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-auto p-6">{renderTabContent()}</main>
      </div>
    </div>
  );
};

export default Dashboard;
