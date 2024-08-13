import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import Image from "next/image";
import { Suspense } from "react";
import Skeleton from "@/components/Skeleton";

const ListPage = async ({ searchParams }: { searchParams: any }) => {
  let categoryName = "";
  if (searchParams.category) {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/category/${searchParams.category}/`,
        {
          cache: "no-cache",
        }
      );
      if (res.ok) {
        const category = await res.json();
        categoryName = category.title;
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* CAMPAIGN */}
      <div className="hidden bg-pink-50 px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            Grab up to 50% off on
            <br /> Selected Products
          </h1>
          <button className="rounded-3xl bg-primary text-white w-max py-3 px-5 text-sm">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3">
          <Image src="/woman.png" alt="" fill className="object-contain" />
        </div>
      </div>
      {/* FILTER */}
      <Filter />
      {/* PRODUCTS */}
      <h1 className="mt-12 text-xl font-semibold">
        {(categoryName ? categoryName : "All Products") + " For You!"}
      </h1>
      <Suspense fallback={<Skeleton />}>
        <ProductList searchParams={searchParams} />
      </Suspense>
    </div>
  );
};
export default ListPage;
