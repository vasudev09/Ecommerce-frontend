import Add from "@/components/Add";
import CustomizeProducts from "@/components/CustomizeProducts";
import ProductImages from "@/components/ProductImages";

const SinglePage = async ({ params }: { params: { slug: string } }) => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages />
      </div>
      {/* TEXTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">Product Name</h1>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
        <div className="h-[2px] bg-gray-100" />
        <div className="flex items-center gap-4">
          <h3 className="text-xl text-gray-500 line-through">$59</h3>
          <h2 className="font-medium text-2xl">$49</h2>
        </div>
        <div className="h-[2px] bg-gray-100" />
        <CustomizeProducts />
        <Add />
        <div className="h-[2px] bg-gray-100" />
        <div className="text-sm">
          <h4 className="font-medium mb-4">PRODUCT INFO</h4>
          <p>
            I'm a product detail. I'm a great place to add more information
            about your product such as sizing, material, care and cleaning
            instructions. This is also great space to write what makes this
            product special and how your customers can benefit from this item.
          </p>
        </div>
        <div className="text-sm">
          <h4 className="font-medium mb-4">RETURN & REFUND POLICY</h4>
          <p>
            I'm a Return and Refund policy. I'm a great place to let your
            customers know what to do in case they are dissatified with their
            purchase. Having a straight forward refund or exchange policy is a
            great way to build trust and reassure your customers that they can
            buy with confidence.
          </p>
        </div>
        <div className="text-sm">
          <h4 className="font-medium mb-4">SHIPPING INFO</h4>
          <p>
            I'm a shipping policy. I'm a great place to add more information
            about your shipping methods, packaging and cost. Providing straight
            forward information about your shipping policy is a great way to
            build trust and reassure your customers that they can buy with
            confidence.
          </p>
        </div>
      </div>
    </div>
  );
};
export default SinglePage;
