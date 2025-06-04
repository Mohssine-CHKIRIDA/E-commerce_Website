import React, { useState } from "react";
import { Order } from "./types";

interface OrderHistoryComponentProps {
  orders: Order[];
}

const OrderHistoryComponent: React.FC<OrderHistoryComponentProps> = ({
  orders,
}) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [reorderMessage, setReorderMessage] = useState<string | null>(null);

  const getStatusColor = (status: Order["status"]): string => {
    switch (status) {
      case "Delivered":
        return "text-green-600 bg-green-100";
      case "In Transit":
        return "text-blue-600 bg-blue-100";
      case "Processing":
        return "text-orange-600 bg-orange-100";
      case "Cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const handleViewDetails = (order: Order): void => {
    setSelectedOrder(order);
  };

  const handleReorder = (orderId: string): void => {
    setReorderMessage(`Order ${orderId} has been re-added to your cart.`);
    setTimeout(() => setReorderMessage(null), 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>

      {reorderMessage && (
        <div className="mb-4 p-3 bg-green-50 text-green-800 rounded-md">
          {reorderMessage}
        </div>
      )}

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">{order.id}</h3>
                <p className="text-sm text-gray-600">
                  Placed on {new Date(order.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  {order.items} item{order.items !== 1 && "s"}
                </p>
              </div>
              <div className="text-right">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
                <p className="text-lg font-bold text-gray-900 mt-2">
                  {order.total}
                </p>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => handleViewDetails(order)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Details
              </button>
              <button
                onClick={() => handleReorder(order.id)}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Reorder
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
            <h3 className="text-xl font-semibold mb-2">
              Order #{selectedOrder.id}
            </h3>
            <p className="text-gray-700 text-sm mb-1">
              Placed on: {new Date(selectedOrder.date).toLocaleDateString()}
            </p>
            <p className="text-gray-700 text-sm mb-1">
              Items: {selectedOrder.items}
            </p>
            <p className="text-gray-700 text-sm mb-1">
              Total: {selectedOrder.total}
            </p>
            <p className="text-gray-700 text-sm mb-4">
              Status:{" "}
              <span
                className={`font-medium ${getStatusColor(
                  selectedOrder.status
                )}`}
              >
                {selectedOrder.status}
              </span>
            </p>
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              ×
            </button>
            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistoryComponent;
