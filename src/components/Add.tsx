"use client";
import { useState, useEffect } from "react";
import { useLocalCart } from "@/context/CartContext";

const Add = ({
  product,
  color,
  size,
}: {
  product: any;
  color: string | null;
  size: string | null;
}) => {
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState<number>(0);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const { localCart, setLocalCart } = useLocalCart();

  useEffect(() => {
    if (product && color && size) {
      const variant = product.variants.find(
        (v: any) => v.color === color && v.size === size
      );
      if (variant) {
        setStock(variant.quantity);
        const cartItem = localCart.find((item: any) => item.id === variant.id);
        if (cartItem) {
          setQuantity(cartItem.quantity);
        } else {
          setQuantity(1);
        }
      }
    }
  }, [product, color, size, localCart]);

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    if (color && size) {
      const variant = product.variants.find(
        (v: any) => v.color === color && v.size === size
      );
      if (variant) {
        const existingItemIndex = localCart.findIndex(
          (item: any) => item.id === variant.id
        );

        const updatedCart = [...localCart];
        if (existingItemIndex >= 0) {
          updatedCart[existingItemIndex].quantity = quantity;
        } else {
          updatedCart.push({
            product: product,
            id: variant.id,
            color,
            size,
            quantity,
          });
        }

        setLocalCart(updatedCart);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 2000);
      }
    }
  };

  return (
    <div className="relative flex flex-col gap-4">
      <div
        className={`absolute top-[-40px] left-0 w-full text-center py-2 rounded-md transition-transform duration-300 ease-in-out ${
          showMessage
            ? "translate-y-[15px] opacity-100"
            : "translate-y-[30px] opacity-0"
        }`}
      >
        <div className="bg-green-500 text-white px-4 py-2 rounded-md">
          Added to Cart
        </div>
      </div>
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl"
              onClick={() => handleQuantity("d")}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl"
              onClick={() => handleQuantity("i")}
            >
              +
            </button>
          </div>
          {stock <= 5 && stock > 0 && (
            <div className="text-xs">
              Only <span className="text-orange-500">{stock} items</span> left!
              <br /> {"Don't"} miss it
            </div>
          )}
        </div>
        <button
          onClick={handleAddToCart}
          disabled={quantity > stock}
          className="w-36 text-sm rounded-3xl ring-1 ring-primary text-primary py-2 px-4 hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white disabled:ring-none"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Add;
