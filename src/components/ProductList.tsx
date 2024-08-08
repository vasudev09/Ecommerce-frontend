import Link from "next/link";
import Image from "next/image";
import Pagination from "./Pagination";

const ProductList = async ({
  tag,
  limit,
  searchParams,
}: {
  tag?: string;
  limit?: string;
  searchParams?: any;
}) => {
  //FILTERS
  let filters = {
    page: "",
    category: "",
    tag: "",
    limit: "",
  };
  if (tag && limit) {
    filters.tag = tag;
    filters.limit = limit;
  } else if (searchParams) {
    if (searchParams.page) {
      filters.page = searchParams.page;
    }
    if (searchParams.category) {
      filters.category = searchParams.category;
    }
    if (searchParams.tag) {
      filters.tag = searchParams.tag;
    }
  }

  let error = false;
  //FETCH
  async function getProducts({ page, tag, category, limit }: any) {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/products/?page=${page ? page : 1}${
          tag ? "&tag=" + tag : ""
        }${category ? "&category=" + category : ""}${
          limit ? "&limit=" + limit : ""
        }`,
        {
          cache: "no-cache",
        }
      );
      if (!res.ok) {
        error = true;
        return res;
      }
      return res.json();
    } catch (e) {
      error = true;
    }
  }
  const data = await getProducts(filters);

  if (error || data.count == 0) {
    return <>No Products Found!</>;
  }

  // PAGINATION
  let hasPrev = false;
  let hasNext = false;
  if (searchParams) {
    if (searchParams.page) {
      if (data.count > searchParams.page * 12) {
        hasNext = true;
      }
      if (searchParams.page > 1) {
        hasPrev = true;
      }
    } else {
      if (data.count > 12) {
        hasNext = true;
      }
      hasPrev = false;
    }
  }

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 flex-wrap">
      {data.data.map((product: any, index: number) => {
        const hasDiscount = product.tags.some((tag: any) =>
          [1, 2, 3].includes(tag.id)
        );
        return (
          <div
            key={index}
            className="w-full flex flex-col justify-between gap-4 sm:w-[45%] lg:w-[22%]"
          >
            <Link href={"/" + product.slug} className="flex flex-col gap-3">
              <div className="relative w-full h-80">
                <Image
                  src={product.images[0]}
                  alt=""
                  fill
                  sizes="25vw"
                  quality={100}
                  className="absolute object-contain bg-white rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
                />
                <Image
                  src={product.images[1]}
                  alt=""
                  fill
                  sizes="25vw"
                  quality={100}
                  className="absolute object-contain rounded-md"
                />
              </div>
              <div className="flex gap-1 justify-between">
                <span className="font-medium">{product.title}</span>
                <span className="font-semibold">
                  ₹{Math.floor(product.price)}
                </span>
              </div>
              {hasDiscount && (
                <div className="text-sm text-green-600">50% off</div>
              )}
              {product.short_info && (
                <div className="text-sm text-gray-500">
                  {product.short_info}
                </div>
              )}
            </Link>
            <button className="rounded-2xl ring-1 ring-primary text-primary w-max py-2 px-4 text-xs hover:bg-primary hover:text-white">
              Add to Cart
            </button>
          </div>
        );
      })}
      {searchParams && (
        <Pagination
          currentPage={searchParams?.page || 1}
          hasPrev={hasPrev}
          hasNext={hasNext}
        />
      )}
    </div>
  );
};

export default ProductList;
