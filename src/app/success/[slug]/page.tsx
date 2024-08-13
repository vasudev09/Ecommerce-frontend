"use client";

import Confetti from "react-confetti";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useState, useEffect } from "react";

const SuccessPage = ({ params }: { params: any }) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [orderId, setOrderId] = useState("");
  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [error, setError] = useState<boolean | null>(null);

  const slug = params?.slug as string;

  useEffect(() => {
    if (isAuthenticated == false) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (window) {
      setScreenWidth(window.innerWidth);
    }
    getOrderID(slug);
  }, []);

  useEffect(() => {
    if (orderId) {
      const timer = setTimeout(() => {
        router.push(`/orders/${orderId}`);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [orderId]);

  async function getOrderID(slug: string) {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/get-order-id/", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ session_id: slug }),
      });
      if (res.ok) {
        const data = await res.json();
        setOrderId(data.order_id);
        setError(false);
      } else {
        setError(true);
      }
      localStorage.removeItem("cart");
    } catch (e) {
      setError(true);
    }
  }

  return (
    <LoadingSpinner addCondition={"authFalse"}>
      <div className="flex flex-col gap-6 items-center justify-center h-[calc(100vh)]">
        {error == false && <Confetti width={screenWidth} height={1000} />}
        {error == null && <h1 className="text-2xl">Processing...</h1>}
        {error == true && (
          <h1 className="text-xl text-red-600">
            Something went wrong. We will get back your order.
          </h1>
        )}
        {error == false && (
          <>
            <h1 className="text-6xl text-green-700">Successful</h1>
            <h2 className="text-xl font-medium">
              We sent the invoice to your e-mail
            </h2>
            <h3 className="">You are being redirected to the order page...</h3>
          </>
        )}
      </div>
    </LoadingSpinner>
  );
};

export default SuccessPage;
