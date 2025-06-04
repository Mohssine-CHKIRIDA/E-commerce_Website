import React, { useState } from "react";
import { Plus, CreditCard } from "lucide-react";
import { PaymentMethod } from "./types";

interface PaymentMethodsComponentProps {
  paymentMethods: PaymentMethod[];
  setPaymentMethods: (paymentMethods: PaymentMethod[]) => void;
}

const PaymentMethodsComponent: React.FC<PaymentMethodsComponentProps> = ({
  paymentMethods,
  setPaymentMethods,
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Partial<PaymentMethod>>({
    type: "",
    last4: "",
    expiry: "",
    isDefault: false,
  });

  const removePaymentMethod = (id: number): void => {
    setPaymentMethods(paymentMethods.filter((pm) => pm.id !== id));
  };

  const handleAddNewCard = (): void => {
    setShowAddForm(true);
    setEditingId(null);
    setFormData({ type: "", last4: "", expiry: "", isDefault: false });
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
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFormSubmit = () => {
    if (!formData.type || !formData.last4 || !formData.expiry) {
      alert("Please complete all fields.");
      return;
    }

    if (formData.last4.length !== 4 || isNaN(Number(formData.last4))) {
      alert("Last 4 digits must be a 4-digit number.");
      return;
    }

    const updatedPaymentMethods = paymentMethods.map((pm) =>
      formData.isDefault ? { ...pm, isDefault: false } : pm
    );

    if (editingId !== null) {
      setPaymentMethods(
        updatedPaymentMethods.map((pm) =>
          pm.id === editingId ? { ...pm, ...formData, id: editingId } : pm
        )
      );
      setEditingId(null);
    } else {
      const newPayment: PaymentMethod = {
        id: Date.now(),
        type: formData.type || "",
        last4: formData.last4 || "",
        expiry: formData.expiry || "",
        isDefault: formData.isDefault || false,
      };
      setPaymentMethods([...updatedPaymentMethods, newPayment]);
    }

    setFormData({ type: "", last4: "", expiry: "", isDefault: false });
    setShowAddForm(false);
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({ type: "", last4: "", expiry: "", isDefault: false });
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
          Add New Card
        </button>
      </div>

      {(showAddForm || editingId !== null) && (
        <div className="mb-6 space-y-4 border p-4 rounded-lg">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Card Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleFormChange}
              className="border p-2 rounded"
            >
              <option value="">Select card type</option>
              <option value="Visa">Visa</option>
              <option value="MasterCard">MasterCard</option>
              <option value="American Express">American Express</option>
              <option value="Discover">Discover</option>
            </select>

            <label className="text-sm font-medium">Expiry Date</label>
            <div className="flex gap-2">
              <select
                name="expiryMonth"
                value={formData.expiry?.split("/")[0] || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    expiry: `${e.target.value}/${
                      prev.expiry?.split("/")[1] || ""
                    }`,
                  }))
                }
                className="border p-2 rounded w-1/2"
              >
                <option value="">MM</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={String(i + 1).padStart(2, "0")}>
                    {String(i + 1).padStart(2, "0")}
                  </option>
                ))}
              </select>

              <select
                name="expiryYear"
                value={formData.expiry?.split("/")[1] || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    expiry: `${prev.expiry?.split("/")[0] || ""}/${
                      e.target.value
                    }`,
                  }))
                }
                className="border p-2 rounded w-1/2"
              >
                <option value="">YY</option>
                {Array.from({ length: 10 }, (_, i) => {
                  const year = new Date().getFullYear() + i;
                  return (
                    <option key={i} value={String(year).slice(2)}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>

            <input
              name="last4"
              value={formData.last4}
              onChange={handleFormChange}
              placeholder="Last 4 digits"
              className="border p-2 rounded"
            />

            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleFormChange}
              />
              Default
            </label>
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
        {paymentMethods.map((payment) => (
          <div
            key={payment.id}
            className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                <CreditCard size={16} className="text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {payment.type} •••• {payment.last4}
                </p>
                <p className="text-sm text-gray-600">
                  Expires {payment.expiry}
                </p>
                {payment.isDefault && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Default
                  </span>
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
