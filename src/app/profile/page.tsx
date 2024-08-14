"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Addresses from "@/components/Addresses";
import Orders from "@/components/Orders";
import ProfileDetails from "@/components/ProfileDetails";
import LoadingSpinner from "@/components/LoadingSpinner";

const ProfilePage = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const router = useRouter();

  const [screenWidth, setScreenWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  const [profile, setProfile] = useState<any | null>(null);
  const [addresses, setAddresses] = useState<any | null>(null);
  const [orders, setOrders] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    getCustomer();
    getOrders();
    getAddresses();
  }, []);

  useEffect(() => {
    if (isAuthenticated == false) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (screenWidth < 768) {
      setActiveTab(null);
    } else {
      if (activeTab == null) {
        setActiveTab("Profile");
      } else {
        setActiveTab((prev) => {
          return prev;
        });
      }
    }
  }, [screenWidth]);

  function closeActiveTab() {
    setActiveTab(null);
  }

  async function handleLogout() {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customer/logout/`,
        {
          credentials: "include",
          cache: "no-cache",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setIsAuthenticated(false);
        router.push("/");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  async function getCustomer() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customer/profile/`,
        {
          cache: "no-cache",
          credentials: "include",
        }
      );
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async function getAddresses() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/address/`,
        {
          cache: "no-cache",
          credentials: "include",
        }
      );
      if (res.ok) {
        const data = await res.json();
        setAddresses(data);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async function getOrders() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/orders/`,
        {
          cache: "no-cache",
          credentials: "include",
        }
      );
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <LoadingSpinner addCondition={"authFalse"}>
      <div className="flex flex-col md:flex-row justify-between items-start relative pt-8 pb-28 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <div className="w-full py-8 block md:hidden">
          <div className="relative w-32 h-32 mx-auto">
            <Image src="/user.png" fill alt="" className="object-contain" />
          </div>
        </div>
        <div className="w-full md:w-[25%] border font-medium md:font-normal rounded-md md:border-none">
          <div
            className={`cursor-pointer p-3 text-center md:text-left rounded-md ${
              activeTab === "Profile"
                ? "bg-gray-200 hover:bg-gray-200"
                : "hover:bg-gray-100"
            }`}
            onClick={() => {
              setActiveTab("Profile");
            }}
          >
            Profile
          </div>
          <div
            className={`cursor-pointer p-3 text-center md:text-left rounded-md  ${
              activeTab === "Addresses"
                ? "bg-gray-200 hover:bg-gray-200"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("Addresses")}
          >
            Addresses
          </div>
          <div
            className={`cursor-pointer p-3 text-center md:text-left rounded-md  ${
              activeTab === "Orders"
                ? "bg-gray-200 hover:bg-gray-200"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setActiveTab("Orders")}
          >
            Orders
          </div>
          <div
            className="cursor-pointer p-3 text-center md:text-left text-primary rounded-md hover:bg-gray-100"
            onClick={() => handleLogout()}
          >
            Logout
            {loading && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2em"
                height="1.2em"
                viewBox="0 0 24 24"
                className="inline-block ml-4"
              >
                <path
                  fill="#f35c7a"
                  d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"
                >
                  <animateTransform
                    attributeName="transform"
                    dur="0.75s"
                    repeatCount="indefinite"
                    type="rotate"
                    values="0 12 12;360 12 12"
                  />
                </path>
              </svg>
            )}
          </div>
        </div>
        <div className="w-full md:w-[70%]">
          {activeTab === "Profile" && (
            <ProfileDetails profile={profile} closeActiveTab={closeActiveTab} />
          )}
          {activeTab === "Addresses" && (
            <Addresses addresses={addresses} closeActiveTab={closeActiveTab} />
          )}
          {activeTab === "Orders" && (
            <Orders orders={orders} closeActiveTab={closeActiveTab} />
          )}
        </div>
      </div>
    </LoadingSpinner>
  );
};

export default ProfilePage;
