"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DotPulseButton from "@/components/DotPulseButton";
import { useLocalCart } from "@/context/CartContext";

const CartPage = () => {
  const [cart, setCart] = useState<any | null>(null);
  const router = useRouter();
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const { localCart, setLocalCart } = useLocalCart();

  useEffect(() => {
    setCart(localCart);
  }, [localCart]);

  const handleRemoveItem = (id: number) => {
    const updatedCart = cart.filter((item: any) => item.id !== id);
    setCart(updatedCart);
    setLocalCart(updatedCart);
  };

  const handleQuantityChange = (id: number, type: "increase" | "decrease") => {
    const updatedCart = cart.map((item: any) => {
      if (item.id === id) {
        const variant = item.product.variants.find((v: any) => v.id === id);
        const newQuantity =
          type === "increase"
            ? Math.min(item.quantity + 1, variant.quantity)
            : Math.max(item.quantity - 1, 1);

        return {
          ...item,
          quantity: newQuantity,
        };
      }
      return item;
    });
    setCart(updatedCart);
    setLocalCart(updatedCart);
  };

  return (
    <div className="pt-8 pb-28 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="text-2xl pb-4">Your Cart</div>
      {cart === null && (
        <div className="py-4 text-center border-t">Loading...</div>
      )}
      {cart !== null && cart.length === 0 && (
        <div className="py-4 text-center border-t">Cart is Empty</div>
      )}
      {cart && cart.length > 0 && (
        <div className="w-full hidden md:block">
          <div className="py-4 flex flex-row items-start font-medium border-y">
            <div className="w-[65%] flex flex-row items-start">
              <div className="w-[60%] text-left">Item</div>
              <div className="w-[40%] text-center">Price</div>
            </div>
            <div className="w-[35%] flex flex-row items-start">
              <div className="w-[75%] text-center">Quantity</div>
              <div className="w-[25%] text-right">Remove</div>
            </div>
          </div>
        </div>
      )}
      {cart &&
        cart.length > 0 &&
        cart.map((item: any, index: number) => (
          <div
            key={index}
            className="w-full px-2 py-4 flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-0 border-b"
          >
            <div className="w-full md:w-[65%] flex flex-row items-start">
              <div className="w-[70%] md:w-[60%] flex flex-row gap-2">
                <div className="relative min-w-24 min-h-20 max-w-24 max-h-20">
                  <Image
                    src={item.product.images[0]}
                    alt=""
                    fill
                    className="object-contain rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <div
                    className="text-sm font-semibold cursor-pointer hover:underline"
                    onClick={() => router.push("/" + item.product.slug)}
                  >
                    {item.product.title}
                  </div>
                  <div className="text-sm">size: {item.size.toLowerCase()}</div>
                  <div className="text-sm">
                    color: {item.color.toLowerCase()}
                  </div>
                </div>
              </div>
              <div className="w-[30%] md:w-[40%] text-right md:text-center">
                ₹{(item.product.price * item.quantity).toFixed(2)}
              </div>
            </div>
            <div className="w-full md:w-[35%] flex flex-row items-center">
              <div className="w-[75%] flex items-center justify-start md:justify-center">
                <div className="border rounded-sm flex items-center justify-center w-min">
                  <button
                    type="button"
                    className="py-2 px-4 bg-slate-300 rounded-sm disabled:cursor-not-allowed disabled:bg-slate-100"
                    disabled={item.quantity <= 1}
                    onClick={() => handleQuantityChange(item.id, "decrease")}
                  >
                    -
                  </button>
                  <div className="py-2 px-4">{item.quantity}</div>
                  <button
                    type="button"
                    className="py-2 px-4 bg-slate-300 rounded-sm disabled:cursor-not-allowed disabled:bg-slate-100"
                    disabled={
                      item.quantity >=
                      item.product.variants.find((v: any) => v.id === item.id)
                        .quantity
                    }
                    onClick={() => handleQuantityChange(item.id, "increase")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="w-[25%] flex items-center justify-end md:justify-center">
                <div
                  className="block md:hidden text-primary p-2 cursor-pointer"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </div>
                <div
                  className="hidden md:block cursor-pointer w-fit p-2"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <Image
                    className="block"
                    src="/cancel.png"
                    width={22}
                    height={22}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

      <div className="flex flex-row items-center justify-between mx-2 my-4">
        <button
          type="button"
          className="py-2 px-4 bg-primary text-white relative"
          disabled={loading2}
          onClick={() => {
            setLoading1(true);
            router.push("/list");
          }}
        >
          {"CONTINUE SHOPPING"}
          {loading1 && (
            <DotPulseButton
              color="white"
              bgColor="#F35C7A"
              borderRadius="0px"
            />
          )}
        </button>
        {cart && cart.length > 0 && (
          <button
            type="button"
            className="py-2 px-4 bg-black text-white relative"
            disabled={loading1}
            onClick={() => {
              setLoading2(true);
              router.push("/checkout");
            }}
          >
            {"PROCEED"}
            {loading2 && (
              <DotPulseButton
                color="white"
                bgColor="black"
                borderRadius="0px"
              />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default CartPage;
