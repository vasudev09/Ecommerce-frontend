"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import DotPulseButton from "./DotPulseButton";
import { useLocalCart } from "@/context/CartContext";

const CartModal = () => {
  const { localCart, setLocalCart } = useLocalCart();
  const [subTotal, setSubTotal] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  useEffect(() => {
    const total = localCart.reduce((sum, item) => {
      const price = Number(item.product.price);
      return sum + price * item.quantity;
    }, 0);
    setSubTotal(total);
  }, [localCart]);

  function handleRemove(id: any) {
    let updatedCart = localCart.filter((item) => item.id !== id);
    setLocalCart(updatedCart);
  }
  return (
    <div className="w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
      {localCart.length == 0 ? (
        <div>Cart is Empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          {/* LIST */}
          <div className="flex flex-col gap-8 max-w-96">
            {localCart.slice(-2).map((item: any) => (
              <div key={item.id} className="flex gap-4">
                <Image
                  src={item.product.images[0]}
                  alt=""
                  width={72}
                  height={96}
                  className="object-contain rounded-md"
                />
                <div className="flex flex-col justify-between w-full">
                  {/* TOP */}
                  <div className="">
                    <div className="flex items-center justify-between gap-4">
                      <h3
                        className="font-semibold text-sm hover:underline cursor-pointer"
                        onClick={() => router.push("/" + item.product.slug)}
                      >
                        {item.product.title}
                      </h3>
                      <div className="p-1 bg-gray-50 rounded-sm">
                        ₹{item.product.price}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">available</div>
                  </div>
                  {/* BOTTOM */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Qty. {item.quantity}</span>
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* BOTTOM */}
          <div className="">
            <div className="flex items-center justify-between font-semibold">
              <span className="">Subtotal</span>
              <span className="">₹{subTotal.toFixed(2)}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex justify-between text-sm">
              {pathname !== "/cart" && (
                <button
                  className="rounded-md py-3 px-4 ring-1 ring-gray-300 relative"
                  disabled={loading2}
                  onClick={() => {
                    setLoading1(true);
                    router.push("/cart");
                  }}
                >
                  {"View Cart"}
                  {loading1 && (
                    <DotPulseButton
                      color="black"
                      bgColor="white"
                      borderRadius="6px"
                    />
                  )}
                </button>
              )}
              <button
                className="rounded-md py-3 px-4 bg-black text-white ml-auto relative"
                disabled={loading1}
                onClick={() => {
                  setLoading2(true);
                  router.push("/checkout");
                }}
              >
                {"Checkout"}
                {loading2 && (
                  <DotPulseButton
                    color="white"
                    bgColor="black"
                    borderRadius="6px"
                  />
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default CartModal;
