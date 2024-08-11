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

  useEffect(() => {
    if (isAuthenticated == false) {
      router.push("/login");
    }
  }, [isAuthenticated]);

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
      const res = await fetch(`http://127.0.0.1:8000/api/customer/logout/`, {
        credentials: "include",
        cache: "no-cache",
      });
      const data = await res.json();
      if (res.ok) {
        setIsAuthenticated(false);
        router.push("/");
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
            className={`cursor-pointer p-3 text-center md:text-left rounded-md hover:bg-gray-100 ${
              activeTab === "Profile" ? "bg-gray-200 hover:bg-gray-200" : ""
            }`}
            onClick={() => {
              setActiveTab("Profile");
            }}
          >
            Profile
          </div>
          <div
            className={`cursor-pointer p-3 text-center md:text-left rounded-md hover:bg-gray-100 ${
              activeTab === "Addresses" ? "bg-gray-200 hover:bg-gray-200" : ""
            }`}
            onClick={() => setActiveTab("Addresses")}
          >
            Addresses
          </div>
          <div
            className={`cursor-pointer p-3 text-center md:text-left rounded-md hover:bg-gray-100 ${
              activeTab === "Orders" ? "bg-gray-200 hover:bg-gray-200" : ""
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
          </div>
        </div>
        <div className="w-full md:w-[70%]">
          {activeTab === "Profile" && (
            <ProfileDetails closeActiveTab={closeActiveTab} />
          )}
          {activeTab === "Addresses" && (
            <Addresses closeActiveTab={closeActiveTab} />
          )}
          {activeTab === "Orders" && <Orders closeActiveTab={closeActiveTab} />}
        </div>
      </div>
    </LoadingSpinner>
  );
};

export default ProfilePage;
