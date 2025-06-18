import { useState } from "react";
import { Sidebar } from "../components/AdminDashboard/Sidebar";
import { Header } from "../components/AdminDashboard/Header";
import { ProductsTable } from "../components/AdminDashboard/ProductsList";
import { OrdersTablePage } from "../components/AdminDashboard/OrdersTablePage";
import { TabType } from "../components/AdminDashboard/types";
import { CustomersTable } from "../components/AdminDashboard/CustomersTable";
import { ProductCreationForm } from "../components/AdminDashboard/ProductCreatePage";
import { useProducts } from "../hooks/hookProducts";
import { AdminOrderDetailed, Product } from "../components/types";
import { useOrders } from "../hooks/hookOrder";
import { useCustomer } from "../hooks/hookCustomer";

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { customers } = useCustomer();
  const { products, loading } = useProducts();
  const { orders } = useOrders();

  const recentOrders: AdminOrderDetailed[] = orders.map((order) => ({
    id: order.id,
    customerName: order.shippingAddress.split(",")[0] || "N/A", // à ajuster selon ton format
    customerEmail: "unknown@example.com", // si `user` est lié à la commande
    shippingAddress: order.shippingAddress,
    orderDate: order.createdAt,
    totalAmount: order.totalAmount,
    status: order.status, // Assure-toi que c’est bien du type OrderStatus
    orderItems: order.orderItems,
  }));

  if (loading) return <p>Loading...</p>;

  const topProducts: Product[] = products.filter(
    (product) => product.rating > 4
  );

  const renderTabContent = () => {
    switch (activeTab) {
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
        return <OrdersTablePage initialOrders={recentOrders} />; // ✅ PASSING DATA
      case "customers":
        return <CustomersTable customers={customers} />;
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
