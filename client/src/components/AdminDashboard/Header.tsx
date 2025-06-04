import React from "react";
import { Menu, Bell, Settings } from "lucide-react";
import { TabType } from "./types";

interface HeaderProps {
  activeTab: TabType;
  setSidebarOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setSidebarOpen,
}) => (
  <header className="bg-white shadow-sm border-b border-gray-200">
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 mr-2"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900 capitalize">
          {activeTab}
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-400 hover:text-gray-600 relative">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-400 hover:text-gray-600">
          <Settings className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">A</span>
        </div>
      </div>
    </div>
  </header>
);
