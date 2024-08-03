import React from "react";
import Image from "next/image";

let orders = [
  {
    id: "12345",
    orderDate: "2024-07-15",
    orderTotal: 99.99,
    status: "Shipped",
  },
  {
    id: "67890",
    orderDate: "2024-07-16",
    orderTotal: 49.99,
    status: "Delivered",
  },
];

const Orders = ({ closeActiveTab }: any) => {
  return (
    <div className="py-4 w-full min-h-screen md:min-h-0 bg-white absolute top-0 left-0 md:static">
      <div className="flex flex-row items-center mb-4">
        <div
          className="block md:hidden cursor-pointer w-fit px-4 py-2"
          onClick={closeActiveTab}
        >
          <Image
            className="block"
            src="/arrow-left.png"
            width={24}
            height={24}
            alt=""
          />
        </div>
        <h2 className="text-xl font-semibold">Your Orders</h2>
      </div>
      {orders.length > 0 ? (
        <table className="min-w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">
                Order ID
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">
                Order Date
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">
                Order Total
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id} className="even:bg-slate-100">
                <td className="p-4 text-sm text-gray-700">{order.id}</td>
                <td className="p-4 text-sm text-gray-700">{order.orderDate}</td>
                <td className="p-4 text-sm text-gray-700">
                  ₹{order.orderTotal.toFixed(2)}
                </td>
                <td className="p-4 text-sm text-gray-700">{order.status}</td>
                <td
                  className="text-xs text-primary font-semibold cursor-pointer"
                  onClick={() => window.open(`/orders/${order.id}`, "_blank")}
                >
                  View Details
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="px-4 md:px-0">No orders found.</div>
      )}
    </div>
  );
};

export default Orders;
