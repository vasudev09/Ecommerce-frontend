// LocalCartContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

interface CartItem {
  id: number;
  color: string;
  size: string;
  product: any;
  quantity: number;
}

interface LocalCartContextType {
  localCart: CartItem[];
  setLocalCart: (cart: CartItem[]) => void;
}

const LocalCartContext = createContext<LocalCartContextType | undefined>(
  undefined
);

export const LocalCartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [localCart, setLocalCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setLocalCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(localCart));
  }, [localCart]);

  const updateLocalCart = (newCart: CartItem[]) => {
    setLocalCart(newCart);
  };

  return (
    <LocalCartContext.Provider
      value={{ localCart, setLocalCart: updateLocalCart }}
    >
      {children}
    </LocalCartContext.Provider>
  );
};

export const useLocalCart = (): LocalCartContextType => {
  const context = useContext(LocalCartContext);
  if (!context) {
    throw new Error("useLocalCart must be used within a LocalCartProvider");
  }
  return context;
};
