import { useState } from "react";
import { Sidebar } from "../components/AdminDashboard/Sidebar";
import { Header } from "../components/AdminDashboard/Header";
import { OverviewTab } from "../components/AdminDashboard/OverviewTab";
import { ProductsTable } from "../components/AdminDashboard/ProductsList";
import { OrdersTablePage } from "../components/AdminDashboard/OrdersTablePage";
import {
  TabType,
  Order,
  Product,
  SalesData,
  CategoryData,
} from "../components/AdminDashboard/types";
import { Products } from "../components/Products/Products";
import { CustomersTable } from "../components/AdminDashboard/CustomersTable";
import { ProductCreationForm } from "../components/AdminDashboard/ProductCreatePage";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Sample data
  const salesData: SalesData[] = [];
  const categoryData: CategoryData[] = [];
  const recentOrders: Order[] = [];
  const topProducts: Product[] = Products;

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
