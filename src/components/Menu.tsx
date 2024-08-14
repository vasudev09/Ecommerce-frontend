"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocalCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const { localCart } = useLocalCart();
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="">
      <Image
        src="/menu.png"
        alt=""
        width={28}
        height={28}
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className="absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl z-20">
          <Link href="/">Homepage</Link>
          <Link href="/list">Shop</Link>
          <Link href="/list?tag=1">Deals</Link>
          <Link href="/">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/profile">Account</Link>
          <Link href="/cart">
            Cart{localCart.length > 0 ? `(${localCart.length})` : ""}
          </Link>
        </div>
      )}
    </div>
  );
};
export default Menu;
