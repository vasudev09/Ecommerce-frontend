"use client";
import Image from "next/image";
import { useState } from "react";

const ProductImages = ({ images }: { images: any }) => {
  const [index, setIndex] = useState(0);
  return (
    <div>
      <div className="h-[500px] relative">
        <Image
          src={images[index]}
          alt=""
          fill
          sizes="50vw"
          quality={100}
          className="object-contain rounded-md"
        />
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {images.map((url: string, i: number) => (
          <div
            className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer"
            key={i}
            onClick={() => setIndex(i)}
          >
            <Image
              src={url}
              alt=""
              fill
              sizes="30vw"
              quality={100}
              className="object-contain rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
