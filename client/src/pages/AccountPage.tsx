import React, { JSX, useState } from "react";

import SidebarNavigation from "../components/profile/SidebarNavigation";
import ProfileComponent from "../components/profile/ProfileComponent";
import OrderHistoryComponent from "../components/profile/OrderHistoryComponent";
import AddressesComponent from "../components/profile/AddressesComponent";
import PaymentMethodsComponent from "../components/profile/PaymentMethodsComponent";
import WishlistComponent from "../components/profile/WishlistComponent";
import RewardsComponent from "../components/profile/RewardsComponent";
import GenericSectionComponent from "../components/profile/GenericSectionComponent";
import {
  Address,
  PaymentMethod,
  Order,
  SectionType,
} from "../components/profile/types";
import Header from "../components/Header";
import { useAuth } from "../Context/AuthContext";

const AccountPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>("profile");
  const { userProfile, updateProfile } = useAuth();
  const [profile, setProfile] = useState(userProfile!); // Assume non-null if logged in

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      type: "Home",
      name: "Sarah Johnson",
      address: "123 Main Street, Apt 4B",
      city: "New York, NY 10001",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      name: "Sarah Johnson",
      address: "456 Business Ave, Suite 200",
      city: "New York, NY 10002",
      isDefault: false,
    },
  ]);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 1,
      type: "Visa",
      last4: "4532",
      expiry: "12/26",
      isDefault: true,
    },
    {
      id: 2,
      type: "Mastercard",
      last4: "8901",
      expiry: "08/25",
      isDefault: false,
    },
  ]);

  const orders: Order[] = [
    {
      id: "#ORD-2024-001",
      date: "2024-05-20",
      status: "Delivered",
      total: "$127.99",
      items: 3,
    },
    {
      id: "#ORD-2024-002",
      date: "2024-05-15",
      status: "In Transit",
      total: "$89.50",
      items: 2,
    },
    {
      id: "#ORD-2024-003",
      date: "2024-05-10",
      status: "Processing",
      total: "$256.00",
      items: 1,
    },
  ];
  const handleProfileChange = (updated: typeof profile) => {
    setProfile(updated);
    updateProfile(updated); // synchronisation avec le contexte
  };

  const renderContent = (): JSX.Element => {
    const sectionMap: Record<SectionType, JSX.Element> = {
      profile: (
        <ProfileComponent profile={profile} setProfile={handleProfileChange} />
      ),
      orders: <OrderHistoryComponent orders={orders} />,
      addresses: (
        <AddressesComponent addresses={addresses} setAddresses={setAddresses} />
      ),
      payments: (
        <PaymentMethodsComponent
          paymentMethods={paymentMethods}
          setPaymentMethods={setPaymentMethods}
        />
      ),
      wishlist: <WishlistComponent />,
      rewards: <RewardsComponent />,
      notifications: <GenericSectionComponent title="Notifications" />,
      security: <GenericSectionComponent title="Security" />,
      settings: <GenericSectionComponent title="Account Settings" />,
    };

    return sectionMap[activeSection];
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
            <p className="text-gray-600 mt-2">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <SidebarNavigation
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              profile={profile}
            />

            <div className="flex-1">{renderContent()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
