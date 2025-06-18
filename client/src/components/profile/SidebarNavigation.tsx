import React from "react";
import {
  User,
  Package,
  MapPin,
  CreditCard,
  Settings,
  Bell,
  Heart,
  Gift,
  Shield,
  ChevronRight,
} from "lucide-react";
import { Profile, MenuItem, SectionType } from "./types";

interface SidebarNavigationProps {
  activeSection: SectionType;
  setActiveSection: (section: SectionType) => void;
  profile: Profile;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  activeSection,
  setActiveSection,
  profile,
}) => {
  const menuItems: MenuItem[] = [
    { id: "profile", label: "Profile Information", icon: User },
    { id: "orders", label: "Order History", icon: Package },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "payments", label: "Payment Methods", icon: CreditCard },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "rewards", label: "Rewards & Points", icon: Gift },
    { id: "security", label: "Security", icon: Shield },
    { id: "settings", label: "Account Settings", icon: Settings },
  ];

  const getUserInitials = (name?: string): string => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="lg:w-64">
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
            {getUserInitials(profile.name)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{profile.name}</h3>
            <p className="text-sm text-gray-600">Premium Member</p>
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as SectionType)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{item.label}</span>
                {isActive && <ChevronRight size={16} className="ml-auto" />}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default SidebarNavigation;
