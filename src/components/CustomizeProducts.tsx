"use client";

import { useState, useEffect } from "react";
const CustomizeProducts = ({
  product,
  selectedColor,
  selectedSize,
  setSelectedColor,
  setSelectedSize,
}: {
  product: any;
  selectedColor: string | null;
  selectedSize: string | null;
  setSelectedColor: (color: string) => void;
  setSelectedSize: (size: string) => void;
}) => {
  useEffect(() => {
    const initialColor = product.variants.find(
      (variant: any) => variant.quantity > 0
    )?.color;

    const initialSize = product.variants.find(
      (variant: any) => variant.quantity > 0
    )?.size;

    if (initialColor) {
      setSelectedColor(initialColor);
    }

    if (initialSize) {
      setSelectedSize(initialSize);
    }
  }, [product]);

  const getAvailableSizes = (color: string) => {
    return product.variants
      .filter((variant: any) => variant.color === color && variant.quantity > 0)
      .map((variant: any) => variant.size);
  };

  const getAvailableColors = (size: string) => {
    return product.variants
      .filter((variant: any) => variant.size === size && variant.quantity > 0)
      .map((variant: any) => variant.color);
  };

  const availableSizes = selectedColor
    ? getAvailableSizes(selectedColor)
    : ["S", "M", "L"];
  const availableColors = selectedSize
    ? getAvailableColors(selectedSize)
    : ["Red", "Blue", "Green"];

  return (
    <div className="flex flex-col gap-6">
      <h4 className="font-medium">Choose a color</h4>
      <ul className="flex items-center gap-3">
        {["Red", "Blue", "Green"].map((color, index) => {
          return (
            <li
              key={color}
              className={`w-8 h-8 rounded-full ring-1 ring-gray-300 relative ${
                index == 0
                  ? "bg-red-500"
                  : index == 1
                  ? "bg-blue-500"
                  : "bg-green-500"
              } ${
                availableColors.includes(color)
                  ? "cursor-pointer"
                  : "cursor-not-allowed"
              }`}
              onClick={() =>
                availableColors.includes(color) && setSelectedColor(color)
              }
            >
              {selectedColor === color && (
                <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              )}
              {!availableColors.includes(color) && (
                <div className="absolute w-10 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              )}
            </li>
          );
        })}
      </ul>
      <h4 className="font-medium">Choose a size</h4>
      <ul className="flex items-center gap-3">
        {["S", "M", "L"].map((size) => (
          <li
            key={size}
            className={`ring-1  ${
              selectedSize === size ? "ring-primary text-white bg-primary" : ""
            } rounded-md py-1 px-4 text-sm ${
              availableSizes.includes(size)
                ? "ring-primary text-primary cursor-pointer"
                : "ring-pink-200 text-white bg-pink-200 cursor-not-allowed"
            }`}
            onClick={() =>
              availableSizes.includes(size) && setSelectedSize(size)
            }
          >
            {size === "S" ? "Small" : size === "M" ? "Medium" : "Large"}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CustomizeProducts;
