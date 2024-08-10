"use client";

import { useState, useEffect } from "react";
import CustomizeProducts from "@/components/CustomizeProducts";
import Add from "@/components/Add";

const ClientSideComponent = ({ product }: { product: any }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <>
      <CustomizeProducts
        product={product}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        setSelectedColor={setSelectedColor}
        setSelectedSize={setSelectedSize}
      />
      <Add product={product} color={selectedColor} size={selectedSize} />
    </>
  );
};

export default ClientSideComponent;
