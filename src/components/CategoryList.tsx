import Image from "next/image";
import Link from "next/link";

const CategoryList = async () => {
  let data;
  let error = false;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories/`,
      {
        credentials: "include",
        cache: "no-cache",
      }
    );
    if (!res.ok) {
      error = true;
    } else {
      data = await res.json();
    }
  } catch (e) {
    error = true;
    console.log(e);
  }

  if (error || data?.count == 0) {
    return <>No Categories Found!</>;
  }
  return (
    <div className="px-4 overflow-x-scroll scrollbar-hide">
      <div className="flex gap-4 md:gap-8">
        {data.data.map((cat: any, index: number) => (
          <Link
            key={index}
            href={`/list?category=${cat.id}`}
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
          >
            <div className="relative bg-slate-100 w-full h-96">
              <Image
                src={cat.image}
                alt=""
                fill
                sizes="20vw"
                className="object-cover"
              />
            </div>
            <h1 className="mt-8 font-light text-cl tracking-wide">
              {cat.title}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
