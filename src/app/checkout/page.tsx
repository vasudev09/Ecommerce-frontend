"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import { loadStripe } from "@stripe/stripe-js";
import DotPulseButton from "@/components/DotPulseButton";

const CheckoutPage = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const [emptyCart, setEmptyCart] = useState<boolean | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [selectedPayment, setSelectedPayment] = useState(0);
  const [addresses, setAddresses] = useState<any | null>(null);
  const [addressError, setAddressError] = useState<boolean | null>(null);
  const [verifiedBill, setVerifiedBill] = useState<any>();
  const [billError, setBillError] = useState<boolean | null>(null);
  const [loading1, setLoading1] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);
  useEffect(() => {
    if (isAuthenticated == false) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (localCart.length == 0) {
      setEmptyCart(true);
    } else {
      setEmptyCart(false);
      getAddresses();
      verifyCart(localCart);
    }
  }, []);

  async function verifyCart(cart: any) {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/bill/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }),
      });
      if (res.ok) {
        const data = await res.json();
        setVerifiedBill(data);
        setBillError(false);
      } else {
        setBillError(true);
      }
    } catch (e) {
      console.log(e);
      setBillError(true);
    }
  }

  async function getAddresses() {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/address/ ", {
        cache: "no-cache",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        if (data.count > 0) {
          setAddresses(data.data.slice(0, 2));
          setSelectedAddress(data.data[0].id);
          setAddressError(false);
        } else {
          setAddressError(true);
        }
      } else {
        setAddressError(true);
      }
    } catch (e) {
      console.log(e);
      setAddressError(true);
    }
  }
  const formatPrice = (price: any) => {
    const numberPrice = Number(price);
    return isNaN(numberPrice) ? "0.00" : numberPrice.toFixed(2);
  };

  const makePayment = async () => {
    if (selectedPayment == 0) {
      setLoading2(true);
      const stripe = await loadStripe(
        "pk_test_51PmQNY07N87X9gnQd0cMOPdfjHezcHo4LcsFr9Tnmw5VkWntuXuar9WjnSSkBKt1OlkPiSgH0YvYBeblJdRh0ayH00dDJx5eVZ"
      );
      const addressedBill = {
        ...verifiedBill,
        address_id: selectedAddress,
      };
      try {
        const res = await fetch(
          "http://127.0.0.1:8000/api/stripe-checkout-session/",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ addressedBill }),
          }
        );
        const session = await res.json();
        const result = await stripe?.redirectToCheckout({
          sessionId: session.id,
        });
      } catch (e) {
        console.log("Payment error:", e);
      } finally {
        setLoading2(false);
      }
    }
  };

  return (
    <LoadingSpinner addCondition={"authFalse"}>
      <div className="flex justify-center min-h-[100vh-40px] py-8 px-2 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <div className="max-w-screen-sm min-w-80 md:min-w-[450px] border shadow-lg py-4 px-6 rounded-md">
          <div className="text-2xl font-medium py-2 border-b">Checkout</div>
          {emptyCart === null ? (
            <div className="py-2 text-center">Loading...</div>
          ) : emptyCart === true ? (
            <div className="py-2 text-center">
              Please add items to the cart.
            </div>
          ) : addressError === null || billError === null ? (
            <div className="py-2 text-center">Loading...</div>
          ) : addressError === true ? (
            <div className="py-2 text-center">
              Please add Address in profile page.
            </div>
          ) : billError === true ? (
            <div className="py-2 text-center">
              Something went wrong with your bill.
            </div>
          ) : (
            <>
              <div>
                <div className="py-2 font-semibold">Address :</div>
                {addresses.map((address: any) => (
                  <div
                    key={address.name}
                    className={`cursor-pointer ring-2 rounded-md text-sm py-1 mb-4 px-2 ${
                      selectedAddress == address.id
                        ? "ring-blue-400"
                        : "ring-gray-300"
                    }`}
                    onClick={() => setSelectedAddress(address.id)}
                  >
                    <p className="font-semibold">{address.address_name}</p>
                    <p>{address.building + address.area}</p>
                    <p>
                      {address.city +
                        ", " +
                        address.state +
                        ", " +
                        address.pincode}
                    </p>
                  </div>
                ))}
              </div>
              <div>
                <div className="py-2 font-semibold border-t">Bill :</div>
                {verifiedBill.products.map((product: any) => (
                  <div className="flex flex-row items-start justify-between gap-10 text-sm mt-2">
                    <div className="max-w-[275px]">
                      {product.product_title} x{product.quantity}
                    </div>
                    <div>
                      {"₹" + formatPrice(product.price * product.quantity)}
                    </div>
                  </div>
                ))}
                <div className="flex flex-row items-center justify-between text-sm mt-2">
                  <div>Taxes</div>
                  <div>{"₹" + formatPrice(verifiedBill.taxes)}</div>
                </div>
                <div className="flex flex-row items-center justify-between text-sm mt-2">
                  <div>Shipping Fee</div>
                  <div>{"₹" + formatPrice(verifiedBill.shipping_fee)}</div>
                </div>
                <div className="flex flex-row items-center justify-between font-bold mt-2 mb-4">
                  <div>Total</div>
                  <div>{"₹" + formatPrice(verifiedBill.total_price)}</div>
                </div>
              </div>
              <div>
                <div className="py-2 border-t  font-semibold">
                  Payment method :
                </div>
                <div>
                  <div
                    className={`py-2 px-3 mt-2 font-medium flex flex-row items-center cursor-pointer hover:bg-slate-100 ${
                      selectedPayment == 0
                        ? "border-primary border-2"
                        : "border"
                    }`}
                    onClick={() => setSelectedPayment(0)}
                  >
                    <div className="relative w-20 h-10">
                      <Image
                        src="/stripe_logo.png"
                        className="object-contain"
                        fill
                        alt=""
                      />
                    </div>
                    <div className="pl-3">Pay with Stripe</div>
                  </div>
                  <div
                    className={`py-2 px-3 mt-2 font-medium flex flex-row items-center cursor-pointer hover:bg-slate-100 ${
                      selectedPayment == 1
                        ? "border-primary border-2"
                        : "border"
                    }`}
                    onClick={() => setSelectedPayment(1)}
                  >
                    <div className="relative w-20 h-10">
                      <Image
                        src="/razorpay_logo.png"
                        className="object-contain"
                        fill
                        alt=""
                      />
                    </div>
                    <div className="pl-3">Pay with Razorpay</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center justify-between py-4 my-4 border-t">
                <button
                  type="button"
                  className="py-2 px-3 border rounded-md relative"
                  onClick={() => {
                    setLoading1(true);
                    router.push("/list");
                  }}
                  disabled={loading2}
                >
                  {"Cancel"}
                  {loading1 && (
                    <DotPulseButton
                      color="black"
                      bgColor="white"
                      borderRadius="6px"
                    />
                  )}
                </button>
                <button
                  type="button"
                  className="py-2 px-3 text-white bg-black border rounded-md relative"
                  onClick={makePayment}
                  disabled={loading1 || loading2}
                >
                  {"Proceed"}
                  {loading2 && (
                    <DotPulseButton
                      color="white"
                      bgColor="black"
                      borderRadius="6px"
                    />
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </LoadingSpinner>
  );
};

export default CheckoutPage;
