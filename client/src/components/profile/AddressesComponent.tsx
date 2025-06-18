import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Address } from "../types";

interface AddressesComponentProps {
  addresses: Address[];
  onAddAddress: (address: Omit<Address, "id">) => Promise<void>;
  onUpdateAddress: (id: number, address: Partial<Address>) => Promise<void>;
  onDeleteAddress: (id: number) => Promise<void>;
}

const AddressesComponent: React.FC<AddressesComponentProps> = ({
  addresses,
  onAddAddress,
  onUpdateAddress,
  onDeleteAddress,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Address>>({
    city: "",
    address: "",
    name: "",
    isDefault: false,
    type: "HOME", // <- Ajout ici
  });

  const removeAddress = async (id: number): Promise<void> => {
    try {
      await onDeleteAddress(id);
    } catch (error) {
      console.error("Failed to remove address:", error);
    }
  };

  const handleAddNewAddress = (): void => {
    setShowForm(true);
    setEditingId(null);
    setFormData({
      city: "",
      address: "",
      name: "",
      isDefault: false,
      type: "HOME",
    });
  };

  const handleEditAddress = (id: number): void => {
    const addr = addresses.find((a) => a.id === id);
    if (addr) {
      setShowForm(true);
      setEditingId(id);
      setFormData(addr);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: "",
      city: "",
      address: "",
      type: "HOME",
      isDefault: false,
    });
  };

  const handleSubmit = async () => {
    const { name, city, address, type } = formData;
    if (!name || !city || !address || !type) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      if (editingId !== null) {
        await onUpdateAddress(editingId, formData);
      } else {
        await onAddAddress(formData as Omit<Address, "id">);
      }
      handleCancel();
    } catch (error) {
      console.error("Failed to save address:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
        <button
          onClick={handleAddNewAddress}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} />
          Add New Address
        </button>
      </div>

      {showForm && (
        <div className="border p-4 rounded-lg mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              placeholder="name"
              className="border p-2 rounded md:col-span-2"
            />
            <input
              name="city"
              value={formData.city || ""}
              onChange={handleChange}
              placeholder="City"
              className="border p-2 rounded"
            />
            <input
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              placeholder="address"
              className="border p-2 rounded"
            />
            <select
              name="type"
              value={formData.type || ""}
              onChange={handleChange}
              className="border p-2 rounded md:col-span-2"
            >
              <option value="" disabled>
                Select Address Type
              </option>
              <option value="HOME">Home</option>
              <option value="WORK">Work</option>
              <option value="OTHER">Other</option>
            </select>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault || false}
                onChange={handleChange}
              />
              Set as default
            </label>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-medium text-blue-600">Address</span>
              {address.isDefault && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Default
                </span>
              )}
            </div>
            <p className="text-gray-600 text-sm">{address.isDefault}</p>
            <p className="text-gray-600 text-sm">
              {address.city}, {address.address}
            </p>
            <p className="text-gray-600 text-sm">{address.type}</p>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEditAddress(address.id)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => removeAddress(address.id)}
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

export default AddressesComponent;
