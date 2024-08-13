"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import CartModal from "./CartModal";
import { useAuth } from "@/context/AuthContext";

const NavIcons = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

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
      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <Image src="/cart.png" alt="" width={22} height={22} />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-primary rounded-full text-white text-sm flex items-center justify-center">
          {cartCount}
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  );
};
export default NavIcons;
