import React, { useState } from "react";
import { Order, OrderStatus } from "../types";

interface OrderHistoryComponentProps {
  orders: Order[];
}

const OrderHistoryComponent: React.FC<OrderHistoryComponentProps> = ({
  orders,
}) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [reorderMessage, setReorderMessage] = useState<string | null>(null);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case OrderStatus.DELIVERED:
        return "text-green-600 bg-green-100";
      case OrderStatus.SHIPPED:
        return "text-blue-600 bg-blue-100";
      case OrderStatus.PROCESSING:
        return "text-orange-600 bg-orange-100";
      case OrderStatus.CANCELLED:
        return "text-red-600 bg-red-100";
      case OrderStatus.PENDING:
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const handleViewDetails = (order: Order): void => {
    setSelectedOrder(order);
  };

  const handleReorder = (orderId: number): void => {
    setReorderMessage(
      `Order #${orderId} items have been re-added to your cart.`
    );
    setTimeout(() => setReorderMessage(null), 3000);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
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
                <h3 className="font-semibold text-gray-900">
                  Order #{order.id}
                </h3>
                <p className="text-sm text-gray-600">
                  Placed on {formatDate(order.createdAt)}
                </p>
                <p className="text-sm text-gray-600">
                  {order.orderItems.length} item
                  {order.orderItems.length !== 1 && "s"}
                </p>
                <p className="text-sm text-gray-600">
                  Shipping to: {order.shippingAddress}
                </p>
              </div>
              <div className="text-right">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    order.paymentIntent?.status || "PENDING"
                  )}`}
                >
                  {order.paymentIntent?.status || "PENDING"}
                </span>
                <p className="text-lg font-bold text-gray-900 mt-2">
                  {formatCurrency(order.totalAmount)}
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
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl shadow-lg relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-xl"
            >
              ×
            </button>

            <h3 className="text-xl font-semibold mb-4">
              Order #{selectedOrder.id}
            </h3>

            <div className="space-y-3 mb-6">
              <p className="text-gray-700">
                <span className="font-medium">Placed on:</span>{" "}
                {formatDate(selectedOrder.createdAt)}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Total:</span>{" "}
                {formatCurrency(selectedOrder.totalAmount)}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Shipping Address:</span>{" "}
                {selectedOrder.shippingAddress}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`font-medium ${getStatusColor(
                    selectedOrder.paymentIntent?.status || "PENDING"
                  )}`}
                >
                  {selectedOrder.paymentIntent?.status || "PENDING"}
                </span>
              </p>
              {selectedOrder.paymentIntent && (
                <p className="text-gray-700">
                  <span className="font-medium">Payment:</span>{" "}
                  {selectedOrder.paymentIntent.currency.toUpperCase()}{" "}
                  {formatCurrency(selectedOrder.paymentIntent.amount)}
                </p>
              )}
            </div>

            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Order Items</h4>
              <div className="space-y-2">
                {selectedOrder.orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-2 border-b border-gray-100"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        Product ID: {item.productId}
                      </p>
                      <p className="text-xs text-gray-600">
                        Quantity: {item.quantity}
                        {item.color && ` • Color: ${item.color}`}
                        {item.size && ` • Size: ${item.size}`}
                      </p>
                    </div>
                    <p className="text-sm font-medium">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
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
