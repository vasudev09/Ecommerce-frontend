import ProductImages from "@/components/ProductImages";
import ClientSideComponent from "@/components/ClientSideComponent";

const SinglePage = async ({ params }: { params: any }) => {
  const slug = params?.slug as string;
  let product = null;
  let error = true;

  try {
    const res = await fetch(`http://127.0.0.1:8000/api/product/${slug}/`, {
      cache: "no-cache",
    });
    if (res.ok) {
      product = await res.json();
      error = false;
    }
  } catch (e) {
    console.log(e);
  }

  if (error) {
    return <>Product Not Found!</>;
  } else
    return (
      <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 flex flex-col lg:flex-row gap-16 pt-8">
        {/* IMG */}
        <div className="w-full lg:w-1/2 h-max">
          <ProductImages images={product.images} />
        </div>
        {/* TEXTS */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <h1 className="text-4xl font-medium">{product.title}</h1>
          <p className="text-gray-500">{product.detail}</p>
          <div className="h-[2px] bg-gray-100" />
          <div className="flex items-center gap-4">
            <h3 className="text-xl text-gray-500 line-through">
              ₹{Math.round(Number(product.price) * 1.5).toFixed(2)}
            </h3>
            <h2 className="font-medium text-2xl">₹{product.price}</h2>
          </div>
          <div className="h-[2px] bg-gray-100" />
          <ClientSideComponent product={product} />
          <div className="h-[2px] bg-gray-100" />
          <div className="text-sm">
            <h4 className="font-medium mb-4">PRODUCT INFO</h4>
            <p>{product.information}</p>
          </div>
          <div className="text-sm">
            <h4 className="font-medium mb-4">RETURN & REFUND POLICY</h4>
            <p>
              Return Policy: Products can be returned within 30 days of receipt
              for a full refund or exchange. Items must be unused, in original
              packaging, and accompanied by a receipt.
            </p>
            <p className="mt-2">
              Refund Policy: Refunds will be processed within 5-7 business days
              after receiving the returned product. Shipping costs are
              non-refundable.
            </p>
          </div>
          <div className="text-sm">
            <h4 className="font-medium mb-4">SHIPPING INFO</h4>
            <p>
              Orders are processed within 1-2 business days and shipped via
              standard delivery. Delivery times vary by location, typically
              ranging from 3-7 business days. Shipping costs are calculated at
              checkout. Free shipping is available for orders above a specified
              amount. Tracking information will be provided once your order has
              shipped.
            </p>
          </div>
        </div>
      </div>
    );
};
export default SinglePage;
