import React, { useState } from "react";
import {
  TrendingUp,
  ShoppingCart,
  Package,
  Users,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { TabType } from "./types";

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (id: string) => {
    setOpenSubmenu((prev) => (prev === id ? null : id));
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
    >
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">My Brand Admin</h1>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          ×
        </button>
      </div>

      <nav className="mt-6">
        {/* Overview */}
        <button
          onClick={() => setActiveTab("overview")}
          className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
            activeTab === "overview"
              ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
              : "text-gray-700"
          }`}
        >
          <TrendingUp className="w-5 h-5" />
          <span className="ml-3 font-medium">Overview</span>
        </button>

        {/* Orders */}
        <button
          onClick={() => setActiveTab("orders")}
          className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
            activeTab === "orders"
              ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
              : "text-gray-700"
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="ml-3 font-medium">Orders</span>
        </button>

        {/* Products with submenu */}
        <div>
          <button
            onClick={() => toggleSubmenu("products")}
            className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
              activeTab.startsWith("products")
                ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                : "text-gray-700"
            }`}
          >
            <Package className="w-5 h-5" />
            <span className="ml-3 font-medium flex-1 text-left">Products</span>
            {openSubmenu === "products" ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {/* Submenu items */}
          {openSubmenu === "products" && (
            <div className="ml-12 mt-1 space-y-1">
              {["list", "edit", "create"].map((action) => (
                <button
                  key={action}
                  onClick={() => setActiveTab(`products-${action}` as TabType)}
                  className={`block w-full text-left text-sm px-3 py-2 rounded hover:bg-gray-100 transition-colors ${
                    activeTab === `products-${action}`
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600"
                  }`}
                >
                  {action[0].toUpperCase() + action.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Customers */}
        <button
          onClick={() => setActiveTab("customers")}
          className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
            activeTab === "customers"
              ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
              : "text-gray-700"
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="ml-3 font-medium">Customers</span>
        </button>
      </nav>
    </div>
  );
};
