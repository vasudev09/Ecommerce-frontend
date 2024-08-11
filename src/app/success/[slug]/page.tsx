"use client";

import Confetti from "react-confetti";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useState, useEffect } from "react";

const SuccessPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [orderId, setOrderId] = useState("");
  const [screenWidth, setScreenWidth] = useState<number>(0);

  useEffect(() => {
    if (isAuthenticated == false) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (window) {
      setScreenWidth(window.innerWidth);
    }
  }, []);

  return (
    <LoadingSpinner addCondition={"authFalse"}>
      <div className="flex flex-col gap-6 items-center justify-center h-[calc(100vh)]">
        <Confetti width={screenWidth} height={1000} />
        <h1 className="text-6xl text-green-700">Successful</h1>
        <h2 className="text-xl font-medium">
          We sent the invoice to your e-mail
        </h2>
        <h3 className="">You are being redirected to the order page...</h3>
      </div>
    </LoadingSpinner>
  );
};

export default SuccessPage;
