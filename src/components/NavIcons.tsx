"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import CartModal from "./CartModal";
import { useAuth } from "@/context/AuthContext";
import { useLocalCart } from "@/context/CartContext";

const NavIcons = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { localCart, setLocalCart } = useLocalCart();

  const router = useRouter();
  const pathname = usePathname();

  const { isAuthenticated } = useAuth();

  const handleProfile = () => {
    if (isAuthenticated) {
      setIsCartOpen(false);
      router.push("/profile");
    } else {
      setIsCartOpen(false);
      router.push("/login");
    }
  };

  const handleCartOpen = () => {
    if (localCart.length > 0) {
      setIsCartOpen((prev) => !prev);
    } else {
      router.push("/cart");
    }
  };

  useEffect(() => {
    setIsCartOpen(false);
  }, [pathname]);

  if (pathname === "/checkout") {
    return (
      <div className="flex items-center gap-4 xl:gap-6">
        <Image
          src="/profile.png"
          alt=""
          width={22}
          height={22}
          className="cursor-pointer"
          onClick={handleProfile}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <Image
        src="/profile.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
        onClick={handleProfile}
      />
      <div className="relative cursor-pointer" onClick={() => handleCartOpen()}>
        <Image src="/cart.png" alt="" width={22} height={22} />
        {localCart?.length > 0 && (
          <div className="absolute -top-4 -right-4 w-6 h-6 bg-primary rounded-full text-white text-sm flex items-center justify-center">
            {localCart.length}
          </div>
        )}
      </div>
      {isCartOpen && localCart.length > 0 && <CartModal />}
    </div>
  );
};
export default NavIcons;
