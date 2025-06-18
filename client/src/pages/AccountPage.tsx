import React, { JSX, useState } from "react";

import SidebarNavigation from "../components/profile/SidebarNavigation";
import ProfileComponent from "../components/profile/ProfileComponent";
import OrderHistoryComponent from "../components/profile/OrderHistoryComponent";
import AddressesComponent from "../components/profile/AddressesComponent";
import PaymentMethodsComponent from "../components/profile/PaymentMethodsComponent";
import WishlistComponent from "../components/profile/WishlistComponent";
import RewardsComponent from "../components/profile/RewardsComponent";
import GenericSectionComponent from "../components/profile/GenericSectionComponent";

import { Address, PaymentMethod, Profile } from "../components/types";

import Header from "../components/Header";
import { useProfileHook } from "../hooks/hookProfile";

type SectionType =
  | "profile"
  | "orders"
  | "addresses"
  | "payments"
  | "wishlist"
  | "rewards"
  | "notifications"
  | "security"
  | "settings";

const AccountPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>("profile");

  const {
    profile,
    loading,
    error,
    orders,
    updateProfile,
    addresses,
    addAddress,
    deleteAddress,
    editAddress,
    addPaymentMethod,
    deletePaymentMethod,
    editPaymentMethod,
    paymentMethods,
  } = useProfileHook();

  // === Handlers ===

  const handleProfileChange = async (updated: Partial<Profile>) => {
    try {
      await updateProfile(updated);
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  const handleAddAddress = async (data: Omit<Address, "id">) => {
    try {
      await addAddress(data);
    } catch (err) {
      console.error("Failed to add address", err);
    }
  };

  const handleAddressUpdate = async (id: number, data: Partial<Address>) => {
    try {
      await editAddress(id, data);
    } catch (err) {
      console.error("Failed to update address", err);
    }
  };

  const handleDeleteAddress = async (id: number) => {
    try {
      await deleteAddress(id);
    } catch (err) {
      console.error("Failed to delete address", err);
    }
  };

  const handleAddPaymentMethod = async (data: Omit<PaymentMethod, "id">) => {
    try {
      await addPaymentMethod(data);
    } catch (err) {
      console.error("Failed to add payment method", err);
    }
  };

  const handlePaymentMethodUpdate = async (
    id: number,
    data: Partial<PaymentMethod>
  ) => {
    try {
      await editPaymentMethod(id, data);
    } catch (err) {
      console.error("Failed to update payment method", err);
    }
  };

  const handleDeletePaymentMethod = async (id: number) => {
    try {
      await deletePaymentMethod(id);
    } catch (err) {
      console.error("Failed to delete payment method", err);
    }
  };

  // === Rendering Section ===

  const renderContent = (): JSX.Element => {
    if (loading) return <div className="p-6">Loading profile...</div>;
    if (error) return <div className="p-6 text-red-500">{error}</div>;
    if (!profile) return <div className="p-6">No profile data found.</div>;

    const sectionMap: Record<SectionType, JSX.Element> = {
      profile: (
        <ProfileComponent profile={profile} setProfile={handleProfileChange} />
      ),
      orders: <OrderHistoryComponent orders={orders} />,
      addresses: (
        <AddressesComponent
          addresses={addresses}
          onAddAddress={handleAddAddress}
          onUpdateAddress={handleAddressUpdate}
          onDeleteAddress={handleDeleteAddress}
        />
      ),
      payments: (
        <PaymentMethodsComponent
          paymentMethods={paymentMethods}
          onAddPaymentMethod={handleAddPaymentMethod}
          onUpdatePaymentMethod={handlePaymentMethodUpdate}
          onDeletePaymentMethod={handleDeletePaymentMethod}
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

  // === Final Render ===

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
            {profile && (
              <SidebarNavigation
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                profile={profile}
              />
            )}
            <div className="flex-1">{renderContent()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
