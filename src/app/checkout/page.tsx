"use client";
import Image from "next/image";
import { useState } from "react";

const CheckoutPage = () => {
  let addresses = [
    {
      name: "Home",
      building: "123A/45, First Floor",
      area: "Main Street, ABC Colony",
      pincode: "560001",
      city: "Banglore",
      state: "KA",
    },
    {
      name: "Home2",
      building: "123A/45, First Floor",
      area: "Main Street, ABC Colony",
      pincode: "560001",
      city: "Hyderabad",
      state: "AP",
    },
  ];

  const [address, setAddress] = useState(0);
  const [payment, setPayment] = useState(0);

  return (
    <div className="flex justify-center min-h-[100vh-40px] py-8 px-2 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="max-w-screen-sm min-w-80 md:min-w-[450px] border shadow-lg py-4 px-6 rounded-md">
        <div className="text-2xl font-medium py-2 border-b">Checkout</div>
        <div>
          <div className="py-2 font-semibold">Address :</div>
          <div
            className={`cursor-pointer ring-2 ring-gray-300 rounded-md text-sm py-1 px-2 ${
              address == 0 ? "ring-blue-400" : ""
            }`}
            onClick={() => setAddress(0)}
          >
            <p>{addresses[0].name}</p>
            <p>{addresses[0].building + addresses[0].area}</p>
            <p>
              {addresses[0].city +
                ", " +
                addresses[0].state +
                ", " +
                addresses[0].pincode}
            </p>
          </div>
          <div
            className={`cursor-pointer ring-2 ring-gray-300 rounded-md text-sm py-1 px-2 mt-2 mb-4 ${
              address == 1 ? "ring-blue-400" : ""
            }`}
            onClick={() => setAddress(1)}
          >
            <p>{addresses[1].name}</p>
            <p>{addresses[1].building + addresses[0].area}</p>
            <p>
              {addresses[1].city +
                ", " +
                addresses[1].state +
                ", " +
                addresses[1].pincode}
            </p>
          </div>
        </div>
        <div>
          <div className="py-2 font-semibold border-t">Bill :</div>
          <div className="flex flex-row items-center justify-between text-sm mt-2">
            <div>Item1</div>
            <div>Price</div>
          </div>
          <div className="flex flex-row items-center justify-between text-sm mt-2">
            <div>Taxes</div>
            <div>Price</div>
          </div>
          <div className="flex flex-row items-center justify-between text-sm mt-2">
            <div>Shipping Fee</div>
            <div>Price</div>
          </div>
          <div className="flex flex-row items-center justify-between font-bold mt-2 mb-4">
            <div>Total</div>
            <div>Price</div>
          </div>
        </div>
        <div>
          <div className="py-2 border-t  font-semibold">Payment method :</div>
          <div>
            <div
              className={`py-2 px-3 mt-2 font-medium border flex flex-row items-center cursor-pointer hover:bg-slate-100 ${
                payment == 0 ? "border-primary border-2" : ""
              }`}
              onClick={() => setPayment(0)}
            >
              <div className="relative w-20 h-10">
                <Image
                  src="/stripe_logo.png"
                  className="object-contain"
                  fill
                  alt=""
                />
              </div>
              <div className="pl-3">Pay with Stripe</div>
            </div>
            <div
              className={`py-2 px-3 mt-2 font-medium border flex flex-row items-center cursor-pointer hover:bg-slate-100 ${
                payment == 1 ? "border-primary border-2" : ""
              }`}
              onClick={() => setPayment(1)}
            >
              <div className="relative w-20 h-10">
                <Image
                  src="/razorpay_logo.png"
                  className="object-contain"
                  fill
                  alt=""
                />
              </div>
              <div className="pl-3">Pay with Razorpay</div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between py-4 my-4 border-t">
          <button type="button" className="py-2 px-3 border rounded-md">
            Cancel
          </button>
          <button
            type="button"
            className="py-2 px-3 text-white bg-black border rounded-md"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
