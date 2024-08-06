"use client";

import Confetti from "react-confetti";
import { useRouter } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-6 items-center justify-center h-[calc(100vh)]">
      <Confetti width={2000} height={1000} />
      <h1 className="text-6xl text-green-700">Successful</h1>
      <h2 className="text-xl font-medium">
        We sent the invoice to your e-mail
      </h2>
      <h3 className="">You are being redirected to the orders page...</h3>
    </div>
  );
};

export default SuccessPage;
