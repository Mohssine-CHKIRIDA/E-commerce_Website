import React, { useState } from "react";
import { Plus, CreditCard } from "lucide-react";
import { PaymentMethod } from "../types";

interface PaymentMethodsComponentProps {
  paymentMethods: PaymentMethod[];
  onAddPaymentMethod: (
    paymentMethod: Omit<PaymentMethod, "id">
  ) => Promise<void>;
  onUpdatePaymentMethod: (
    id: number,
    paymentMethod: Partial<PaymentMethod>
  ) => Promise<void>;
  onDeletePaymentMethod: (id: number) => Promise<void>;
}

const PaymentMethodsComponent: React.FC<PaymentMethodsComponentProps> = ({
  paymentMethods,
  onAddPaymentMethod,
  onUpdatePaymentMethod,
  onDeletePaymentMethod,
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Partial<PaymentMethod>>({
    type: "",
    last4: "",
    isDefault: false,
    expiry: "",
  });

  const removePaymentMethod = async (id: number): Promise<void> => {
    try {
      await onDeletePaymentMethod(id);
    } catch (error) {
      console.error("Failed to remove payment method:", error);
    }
  };

  const handleAddNewCard = (): void => {
    setShowAddForm(true);
    setEditingId(null);
    setFormData({
      type: "",
      last4: "",
      isDefault: false,
      expiry: "",
    });
  };

  const handleEditPaymentMethod = (id: number): void => {
    const payment = paymentMethods.find((pm) => pm.id === id);
    if (payment) {
      setEditingId(id);
      setShowAddForm(true);
      setFormData(payment);
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async () => {
    if (!formData.type || !formData.last4 || !formData.expiry) {
      alert("Please complete all required fields.");
      return;
    }

    if (formData.last4 && formData.last4.length < 4) {
      alert("Account number must be at least 4 characters.");
      return;
    }

    try {
      if (editingId !== null) {
        await onUpdatePaymentMethod(editingId, formData);
        setEditingId(null);
      } else {
        await onAddPaymentMethod(formData as Omit<PaymentMethod, "id">);
      }

      setFormData({
        type: "",
        last4: "",
        isDefault: false,
        expiry: "",
      });
      setShowAddForm(false);
    } catch (error) {
      console.error("Failed to save payment method:", error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({
      type: "",
      last4: "",
      isDefault: false,
      expiry: "",
    });
  };

  const getDisplayAccountNumber = (last4?: string) => {
    if (!last4) return "";
    return last4.length > 4 ? `••••${last4.slice(-4)}` : last4;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
        <button
          onClick={handleAddNewCard}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Add New Payment Method
        </button>
      </div>

      {(showAddForm || editingId !== null) && (
        <div className="mb-6 space-y-4 border p-4 rounded-lg">
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Payment Type
              </label>
              <select
                name="type"
                value={formData.type || ""}
                onChange={handleFormChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select payment type</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Bank Account">Bank Account</option>
                <option value="Digital Wallet">Digital Wallet</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                {formData.type === "Bank Account"
                  ? "Account Number"
                  : "Card Number (last 4 digits)"}
              </label>
              <input
                name="last4"
                value={formData.last4 || ""}
                onChange={handleFormChange}
                placeholder={
                  formData.type === "Bank Account"
                    ? "Account number"
                    : "Last 4 digits"
                }
                className="w-full border p-2 rounded"
              />
            </div>

            {(formData.type === "Credit Card" ||
              formData.type === "Debit Card") && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Expiry Date
                </label>
                <input
                  name="expiry"
                  type="month"
                  value={formData.expiry || ""}
                  onChange={handleFormChange}
                  className="w-full border p-2 rounded"
                />
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleFormSubmit}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {editingId !== null ? "Update" : "Add"}
            </button>
            <button
              onClick={handleCancel}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {paymentMethods.map((payment, index) => (
          <div
            key={payment.id ?? `temp-${index}`}
            className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                <CreditCard size={16} className="text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{payment.type}</p>
                <p className="text-sm text-gray-600">
                  {getDisplayAccountNumber(payment.last4)}
                </p>
                {payment.expiry && (
                  <p className="text-sm text-gray-600">
                    Expires {payment.expiry}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEditPaymentMethod(payment.id)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => removePaymentMethod(payment.id)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodsComponent;
