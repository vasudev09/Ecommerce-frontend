import Link from "next/link";

const OrderPage = async ({ params }: { params: { id: string } }) => {
  let error = false;
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/order/`, {
      cache: "no-cache",
    });
    const body = await res.json();
  } catch (e) {
    console.log(e);
    error = true;
  }
  if (error) {
    return <>Order Not Found!</>;
  } else {
    return (
      <div className="flex flex-col my-4 items-center justify-center">
        <div className="md:shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] md:px-40 md:py-20">
          <h1 className="text-xl">Order Details</h1>
          <div className="mt-12 flex flex-col gap-6">
            <div className="">
              <span className="font-medium">Order Id: </span>
              <span>{"order id"}</span>
            </div>
            <div className="">
              <span className="font-medium">Order Date: </span>
              <span>{"order date"}</span>
            </div>
            <div className="">
              <span className="font-medium">Receiver Name: </span>
              <span>{"first name + last name"}</span>
            </div>
            <div className="">
              <span className="font-medium">Receiver Email: </span>
              <span>{"email"}</span>
            </div>
            <div className="">
              <span className="font-medium">Price: </span>
              <span>{"amount"}</span>
            </div>
            <div className="">
              <span className="font-medium">Payment Status: </span>
              <span>{"status"}</span>
            </div>
            <div className="">
              <span className="font-medium">Order Status: </span>
              <span>{"status"}</span>
            </div>
            <div className="">
              <span className="font-medium">Delivery Address: </span>
              <span>{"address"}</span>
            </div>
          </div>
        </div>
        <Link href="/" className="underline mt-6">
          Have a problem? Contact us
        </Link>
      </div>
    );
  }
};

export default OrderPage;
