import Link from "next/link";
import { redirect } from "next/navigation";

const OrderPage = async ({ params }: { params: { id: string } }) => {
  let error = false;
  let order = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/order/${params.id}/`,
      {
        cache: "no-cache",
        credentials: "include",
      }
    );

    if (res.status === 401) {
      redirect("/login");
    }
    if (res.ok) {
      order = await res.json();
    } else {
      error = true;
    }
  } catch (e) {
    console.log(e);
    error = true;
  }

  if (error) {
    return <div className="text-center py-2">Order Not Found!</div>;
  } else {
    return (
      <div className="flex flex-col my-4 items-center justify-center">
        <div className="md:shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] md:px-40 md:py-20">
          <h1 className="text-xl">Order Details</h1>
          <div className="mt-12 flex flex-col gap-6">
            <div className="">
              <span className="font-medium">Order Id: </span>
              <span>{order.id}</span>
            </div>
            <div className="">
              <span className="font-medium">Order Date: </span>
              <span>{order.order_time}</span>
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
              <span className="font-medium">Order Items: </span>
              <span>{"order items"}</span>
            </div>
            <div className="">
              <span className="font-medium">Price: </span>
              <span>{Number(order.total_amount).toFixed(2)}</span>
            </div>
            <div className="">
              <span className="font-medium">Payment Status: </span>
              <span>{order.payment_staus}</span>
            </div>
            <div className="">
              <span className="font-medium">Order Status: </span>
              <span>{order.order_status}</span>
            </div>
            <div className="">
              <span className="font-medium">Delivery Address: </span>
              <span>{order.address}</span>
            </div>
          </div>
        </div>
        <Link href="/contact" className="underline mt-6">
          Have a problem? Contact us
        </Link>
      </div>
    );
  }
};

export default OrderPage;
