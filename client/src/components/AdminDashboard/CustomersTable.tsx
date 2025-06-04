import React, { useState } from "react";
import {
  Users,
  Eye,
  Edit,
  Search,
  CheckCircle,
  XCircle,
  Save,
  X,
} from "lucide-react";
import { Customer } from "./types";

const sampleCustomers: Customer[] = [
  {
    id: "CUST-001",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    joinDate: "2024-03-15",
    totalOrders: 12,
    totalSpent: 2450.8,
    status: "active",
    lastOrder: "2025-06-01",
  },
  {
    id: "CUST-002",
    name: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+1 (555) 234-5678",
    joinDate: "2024-01-22",
    totalOrders: 8,
    totalSpent: 1875.5,
    status: "active",
    lastOrder: "2025-06-01",
  },
  {
    id: "CUST-003",
    name: "Mike Johnson",
    email: "mike.j@email.com",
    phone: "+1 (555) 345-6789",
    joinDate: "2024-05-10",
    totalOrders: 5,
    totalSpent: 925.75,
    status: "active",
    lastOrder: "2025-05-31",
  },
  {
    id: "CUST-004",
    name: "Sarah Wilson",
    email: "sarah.w@email.com",
    phone: "+1 (555) 456-7890",
    joinDate: "2023-11-08",
    totalOrders: 15,
    totalSpent: 3200.25,
    status: "active",
    lastOrder: "2025-05-30",
  },
  {
    id: "CUST-005",
    name: "Tom Brown",
    email: "tom.brown@email.com",
    phone: "+1 (555) 567-8901",
    joinDate: "2024-02-14",
    totalOrders: 3,
    totalSpent: 450.0,
    status: "inactive",
    lastOrder: "2025-03-15",
  },
];

export const CustomersTable: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(sampleCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [editingCustomerId, setEditingCustomerId] = useState<string | null>(
    null
  );
  const [editedStatus, setEditedStatus] = useState<"active" | "inactive">(
    "active"
  );

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEditClick = (customer: Customer) => {
    setEditingCustomerId(customer.id);
    setEditedStatus(customer.status);
  };

  const handleSaveStatus = (id: string) => {
    setCustomers((prev) =>
      prev.map((cust) =>
        cust.id === id ? { ...cust, status: editedStatus } : cust
      )
    );
    setEditingCustomerId(null);
  };

  const handleCancelEdit = () => {
    setEditingCustomerId(null);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Customer Management
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Manage customer accounts and information
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Join Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Orders
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Spent
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {customer.name}
                    </div>
                    <div className="text-sm text-gray-500">{customer.id}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm text-gray-900">
                      {customer.email}
                    </div>
                    <div className="text-sm text-gray-500">
                      {customer.phone}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(customer.joinDate).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {customer.totalOrders}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    ${customer.totalSpent.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingCustomerId === customer.id ? (
                    <select
                      value={editedStatus}
                      onChange={(e) =>
                        setEditedStatus(e.target.value as "active" | "inactive")
                      }
                      className="px-2 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  ) : (
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        customer.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {customer.status === "active" ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <XCircle className="w-3 h-3 mr-1" />
                      )}
                      {customer.status}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="w-4 h-4" />
                    </button>
                    {editingCustomerId === customer.id ? (
                      <>
                        <button
                          className="text-green-600 hover:text-green-900"
                          onClick={() => handleSaveStatus(customer.id)}
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={handleCancelEdit}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <button
                        className="text-gray-600 hover:text-gray-900"
                        onClick={() => handleEditClick(customer)}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No customers found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};
