import { useEffect, useState, useCallback } from "react";
import {
  getProfile,
  updateProfile as updateProfileApi,
  addAddress as addAddressApi,
  deleteAddress as deleteAddressApi,
  updateAddress as updateAddressApi,
  getPaymentMethod as getPaymentMethodApi,
  addPaymentMethod as addPaymentMethodApi,
  deletePaymentMethod as deletePaymentMethodApi,
  updatePaymentMethod as updatePaymentMethodApi,
  getUserOrders as getUserOrdersApi,
  getAddress,
} from "../api/profile";
import { Address, PaymentMethod, Profile, Order } from "../components/types";

export function useProfileHook() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProfile();
      setProfile(data);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      setError("Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPaymentMethods = useCallback(async () => {
    try {
      const data = await getPaymentMethodApi();
      const paymentsArray = Array.isArray(data) ? data : data ? [data] : [];
      setPaymentMethods(paymentsArray);
    } catch (err) {
      console.error("Failed to fetch payment methods:", err);
    }
  }, []);
  const fetchAddresses = useCallback(async () => {
    try {
      const data = await getAddress();
      const  addressesArray = Array.isArray(data) ? data : data ? [data] : [];
      setAddresses(addressesArray);
    } catch (err) {
      console.error("Failed to fetch payment methods:", err);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
    fetchPaymentMethods();
    fetchAddresses();
  }, [fetchProfile, fetchPaymentMethods, fetchAddresses]);

  const updateProfile = useCallback(async (updatedProfile: Partial<Profile>) => {
    try {
      setError(null);
      const data = await updateProfileApi(updatedProfile as Profile);
      setProfile(data);
      return data;
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError("Failed to update profile");
      throw err;
    }
  }, []);

  const addAddress = useCallback(async (data: Omit<Address, "id">) => {
    try {
      const newAddress = await addAddressApi(data);
      setProfile((prev) =>
        prev
          ? { ...prev, addresses: [...(prev.addresses || []), newAddress] }
          : prev
      );
      return newAddress;
    } catch (err) {
      console.error("Failed to add address:", err);
      throw err;
    }
  }, []);

  const deleteAddress = useCallback(async (id: number) => {
    try {
      await deleteAddressApi(id);
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              addresses: (prev.addresses || []).filter((addr) => addr.id !== id),
            }
          : prev
      );
    } catch (err) {
      console.error("Failed to delete address:", err);
      throw err;
    }
  }, []);

  const editAddress = useCallback(async (id: number, updatedData: Partial<Address>) => {
    try {
      const updated = await updateAddressApi(id, updatedData);
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              addresses: (prev.addresses || []).map((addr) =>
                addr.id === id ? updated : addr
              ),
            }
          : prev
      );
      return updated;
    } catch (err) {
      console.error("Failed to update address:", err);
      throw err;
    }
  }, []);

  const addPaymentMethod = useCallback(async (data: Omit<PaymentMethod, "id">) => {
    try {
      const newPayment = await addPaymentMethodApi(data);
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              paymentMethods: [...(prev.paymentMethods || []), newPayment],
            }
          : prev
      );
      setPaymentMethods((prev) => [...prev, newPayment]);
      return newPayment;
    } catch (err) {
      console.error("Failed to add payment method:", err);
      throw err;
    }
  }, []);

  const deletePaymentMethod = useCallback(async (id: number) => {
    try {
      await deletePaymentMethodApi(id);
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              paymentMethods: (prev.paymentMethods || []).filter((pm) => pm.id !== id),
            }
          : prev
      );
      setPaymentMethods((prev) => prev.filter((pm) => pm.id !== id));
    } catch (err) {
      console.error("Failed to delete payment method:", err);
      throw err;
    }
  }, []);

  const editPaymentMethod = useCallback(async (id: number, updatedData: Partial<PaymentMethod>) => {
    try {
      const updated = await updatePaymentMethodApi(id, updatedData);
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              paymentMethods: (prev.paymentMethods || []).map((pm) =>
                pm.id === id ? updated : pm
              ),
            }
          : prev
      );
      setPaymentMethods((prev) =>
        prev.map((pm) => (pm.id === id ? updated : pm))
      );
      return updated;
    } catch (err) {
      console.error("Failed to update payment method:", err);
      throw err;
    }
  }, []);


  const fetchOrders = useCallback(async () => {
    try {
      const ordersData = await getUserOrdersApi();
      setProfile((prev) =>
        prev ? { ...prev, orders: ordersData } : prev
      );
      return ordersData;
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      throw err;
    }
  }, []);

  const orders: Order[] = profile?.orders ?? [];

  return {
    profile,
    paymentMethods,
    orders,
    loading,
    error,
    updateProfile,
    refetch: fetchProfile,
    addresses,
    addAddress,
    deleteAddress,
    editAddress,
    addPaymentMethod,
    deletePaymentMethod,
    editPaymentMethod,
    fetchPaymentMethods,
    fetchOrders,
  };
}
