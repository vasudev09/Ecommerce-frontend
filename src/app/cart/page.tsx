"use client";
import Image from "next/image";
let cartItems = [
  {
    product: {
      id: "12",
      name: "boAt Airdopes 141 ANC TWS in-Ear Earbuds w/32 dB ANC, 42 Hrs Playback",
      image:
        "https://images.pexels.com/photos/934055/pexels-photo-934055.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    quantity: 2,
    total_price: 90,
  },
  {
    product: {
      id: "13",
      name: "IPhone boAt Airdopes 141 ANC TWS in-Ear Earbuds w/32 dB ANC, 42 Hrs Playback",
      image:
        "https://images.pexels.com/photos/934055/pexels-photo-934055.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    quantity: 1,
    total_price: 100,
  },
];
const CartPage = () => {
  return (
    <div className="pt-8 pb-28 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="text-2xl pb-4">Your Cart</div>
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
      {cartItems.map((item, index) => (
        <div
          key={index}
          className="w-full px-2 py-4 flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-0 border-b"
        >
          <div className="w-full md:w-[65%] flex flex-row items-start">
            <div className="w-[70%] md:w-[60%] flex flex-row gap-2">
              <div className="relative min-w-24 min-h-20 max-w-24 max-h-20">
                <Image
                  src={item.product.image}
                  alt=""
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex flex-col">
                <div className="text-sm font-semibold">{item.product.name}</div>
                <div className="text-sm">size: s</div>
                <div className="text-sm">color: blue</div>
              </div>
            </div>
            <div className="w-[30%] md:w-[40%] text-right md:text-center">
              ₹{item.total_price.toFixed(2)}
            </div>
          </div>
          <div className="w-full md:w-[35%] flex flex-row items-center">
            <div className="w-[75%] flex items-center justify-start md:justify-center">
              <div className="border rounded-sm flex items-center justify-center w-min">
                <button
                  type="button"
                  className="py-2 px-4 bg-slate-100 rounded-sm"
                >
                  -
                </button>
                <div className="py-2 px-4">{item.quantity}</div>
                <button
                  type="button"
                  className="py-2 px-4 bg-slate-100 rounded-sm"
                >
                  +
                </button>
              </div>
            </div>
            <div className="w-[25%] flex items-center justify-end md:justify-center">
              <div className="block md:hidden text-primary p-2">Remove</div>
              <div className="hidden md:block cursor-pointer w-fit p-2">
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
        <button type="button" className="py-2 px-4 bg-primary text-white">
          CONTINUE SHOPPING
        </button>
        <button type="button" className="py-2 px-4 bg-black text-white">
          PROCEED
        </button>
      </div>
    </div>
  );
};

export default CartPage;
