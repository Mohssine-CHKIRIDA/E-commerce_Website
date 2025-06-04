import React, { useState } from "react";
import {
  ShoppingCart,
  Eye,
  Edit,
  Trash2,
  Search,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Dialog } from "@headlessui/react";

type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  orderDate: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: number;
  shippingAddress: string;
  products?: { name: string; quantity: number; price: number }[];
};

const sampleOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "John Doe",
    customerEmail: "john.doe@email.com",
    orderDate: "2025-06-01",
    status: "delivered",
    total: 299.99,
    items: 3,
    shippingAddress: "123 Main St, New York, NY",
    products: [
      { name: "Laptop", quantity: 1, price: 199.99 },
      { name: "Mouse", quantity: 2, price: 50 },
    ],
  },
  {
    id: "ORD-002",
    customerName: "Jane Smith",
    customerEmail: "jane.smith@email.com",
    orderDate: "2025-06-01",
    status: "shipped",
    total: 149.5,
    items: 2,
    shippingAddress: "456 Oak Ave, Los Angeles, CA",
    products: [{ name: "Headphones", quantity: 2, price: 74.75 }],
  },
];

export const OrdersTablePage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<Order["status"]>("pending");

  const handleDelete = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const handleEditStatus = () => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === editingOrder?.id ? { ...order, status: newStatus } : order
      )
    );
    setEditingOrder(null);
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "processing":
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case "shipped":
        return <Package className="w-4 h-4 text-purple-500" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusBadgeClass = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900">Orders Management</h2>
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Order ID",
                "Customer",
                "Date",
                "Status",
                "Items",
                "Total",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium">
                    {order.customerName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {order.customerEmail}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                      order.status
                    )}`}
                  >
                    {getStatusIcon(order.status)}
                    <span className="ml-1 capitalize">{order.status}</span>
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{order.items}</td>
                <td className="px-6 py-4 text-sm font-medium">
                  ${order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewingOrder(order)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setEditingOrder(order);
                        setNewStatus(order.status);
                      }}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Dialog */}
      <Dialog
        open={!!viewingOrder}
        onClose={() => setViewingOrder(null)}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
            <Dialog.Title className="text-lg font-bold">
              Order Details
            </Dialog.Title>
            {viewingOrder && (
              <div className="mt-4 space-y-2">
                <p>
                  <strong>Customer:</strong> {viewingOrder.customerName} (
                  {viewingOrder.customerEmail})
                </p>
                <p>
                  <strong>Address:</strong> {viewingOrder.shippingAddress}
                </p>
                <p>
                  <strong>Status:</strong> {viewingOrder.status}
                </p>
                <p>
                  <strong>Total:</strong> ${viewingOrder.total.toFixed(2)}
                </p>
                <hr />
                <p className="font-semibold mt-2">Products:</p>
                <ul className="list-disc pl-5">
                  {viewingOrder.products?.map((p, idx) => (
                    <li key={idx}>
                      {p.name} x{p.quantity} — ${p.price.toFixed(2)}
                    </li>
                  )) || <li>No product details</li>}
                </ul>
              </div>
            )}
            <div className="mt-4 text-right">
              <button
                className="text-sm text-blue-600"
                onClick={() => setViewingOrder(null)}
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={!!editingOrder}
        onClose={() => setEditingOrder(null)}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <Dialog.Title className="text-lg font-bold">
              Edit Order Status
            </Dialog.Title>
            <div className="mt-4">
              <select
                value={newStatus}
                onChange={(e) =>
                  setNewStatus(e.target.value as Order["status"])
                }
                className="w-full p-2 border rounded"
              >
                {[
                  "pending",
                  "processing",
                  "shipped",
                  "delivered",
                  "cancelled",
                ].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setEditingOrder(null)}
                className="text-sm text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleEditStatus}
                className="bg-blue-600 text-white px-4 py-2 rounded text-sm"
              >
                Save
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No orders found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};
