"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";

const OrderPage = ({ params }: { params: { id: string } }) => {
  const [order, setOrder] = useState<any>();
  const [error, setError] = useState<boolean | null>(null);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === false) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchOrder();
  }, []);

  async function fetchOrder() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/order/${params.id}/`,
        {
          credentials: "include",
        }
      );
      if (res.ok) {
        const data = await res.json();
        setOrder(data);
        setError(false);
      } else {
        setError(true);
      }
    } catch (e) {
      console.log(e);
      setError(true);
    }
  }

  return (
    <LoadingSpinner addCondition="authFalse">
      {error === null && (
        <div className="text-center py-2">Getting Your Order...</div>
      )}
      {error === true && (
        <div className="text-center py-2">Order Not Found.</div>
      )}
      {error === false && (
        <div className="flex flex-col my-4 items-center justify-center">
          <div className="md:shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] px-4 md:px-40 md:py-20">
            <h1 className="text-xl">Order Details</h1>
            <div className="mt-12 flex flex-col gap-6">
              <div className="">
                <span className="font-medium">Order Id: </span>
                <span>{order.order.id}</span>
              </div>
              <div className="">
                <span className="font-medium">Order Date: </span>
                <span>{order.order.order_time}</span>
              </div>
              <div className="">
                <span className="font-medium">Receiver Name: </span>
                <span>{order.user.username}</span>
              </div>
              <div className="">
                <span className="font-medium">Receiver Email: </span>
                <span>{order.user.email}</span>
              </div>
              <div className="">
                <span className="font-medium">Order Items: </span>
                <ul>
                  {order.order.order_items.map((item: any) => (
                    <li key={item.id} className="py-1">
                      {item.product_name} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="">
                <span className="font-medium">Price: </span>
                <span>₹{Number(order.order.total_amount).toFixed(2)}</span>
              </div>
              <div className="">
                <span className="font-medium">Payment Status: </span>
                <span>{order.order.payment_status}</span>
              </div>
              <div className="">
                <span className="font-medium">Order Status: </span>
                <span>{order.order.order_status}</span>
              </div>
              <div className="">
                <span className="font-medium">Delivery Address: </span>
                <span>{order.order.address}</span>
              </div>
            </div>
          </div>
          <Link href="/contact" className="underline mt-6">
            Have a problem? Contact us
          </Link>
        </div>
      )}
    </LoadingSpinner>
  );
};

export default OrderPage;
