import { useState } from "react";
import Image from "next/image";
const ProfileDetails = ({ closeActiveTab }: any) => {
  const [profileMessage, setProfileMessage] = useState("");
  const [changePasswordInput, setChangePasswordInput] = useState(false);
  const [changeMobileInput, setChangeMobileInput] = useState(false);

  async function changePassword() {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/customer/logout/`, {
        credentials: "include",
        cache: "no-cache",
      });
      const data = await res.json();
      if (res.ok) {
        // setIsAuthenticated(false);
        // router.push("/");
        setProfileMessage("Password Change Successfull!");
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function changeMobile() {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/customer/logout/`, {
        credentials: "include",
        cache: "no-cache",
      });
      const data = await res.json();
      if (res.ok) {
        // setIsAuthenticated(false);
        // router.push("/");
        setProfileMessage("Mobile Change Successfull!");
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="bg-white w-full min-h-screen md:min-h-0 rounded-md md:border pt-5 absolute top-0 left-0 md:static">
      <div
        className="block md:hidden cursor-pointer w-fit px-4 py-2"
        onClick={closeActiveTab}
      >
        <Image
          className="block"
          src="/arrow-left.png"
          width={26}
          height={26}
          alt=""
        />
      </div>
      {profileMessage && <div className="p-2 text-center">profile message</div>}
      <div className="relative w-32 h-32 mx-auto">
        <Image src="/user.png" fill alt="" className="object-contain" />
      </div>
      <div className="pt-16 md:pl-[10%]">
        <div className="mb-8 px-4 flex flex-col md:flex-row">
          <div className="min-w-36 mb-1 font-semibold">Username :</div>
          <div className="">John Doe</div>
        </div>
        <div className="mb-10 px-4 flex flex-col md:flex-row">
          <div className="min-w-36 mb-1 font-semibold">Email :</div>
          <div className="">johndoe1234@gmail.com</div>
        </div>
        <div className="mb-10 px-4 flex flex-col md:flex-row">
          <div className="min-w-36 mb-1 font-semibold">Password :</div>
          {changePasswordInput ? (
            <div className="flex flex-col items-start gap-4 md:flex-row">
              <input
                type="text"
                name="password"
                placeholder="Enter new password"
                className="ring-1 ring-gray-300 rounded-md p-1.5"
              />
              <div>
                <button
                  type="button"
                  className="cursor-pointer bg-primary text-white rounded-md py-1.5 px-2"
                  onClick={() => changePassword()}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="cursor-pointer rounded-md py-1.5 px-2"
                  onClick={() => setChangePasswordInput(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <span className="leading-8 align-middle">********</span>
              <span
                className="ml-6 text-primary cursor-pointer"
                onClick={() => setChangePasswordInput(true)}
              >
                change
              </span>
            </div>
          )}
        </div>
        <div className="mb-10 px-4 flex flex-col md:flex-row">
          <div className="min-w-36 mb-1 font-semibold">Mobile :</div>
          {changeMobileInput ? (
            <div className="flex flex-col items-start gap-4 md:flex-row">
              <input
                type="text"
                name="password"
                placeholder="Enter new mobile"
                className="ring-1 ring-gray-300 rounded-md p-1.5"
              />
              <div>
                <button
                  type="button"
                  className="cursor-pointer bg-primary text-white rounded-md py-1.5 px-2"
                  onClick={() => changeMobile()}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="cursor-pointer rounded-md py-1.5 px-2"
                  onClick={() => setChangeMobileInput(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <span>+91 - {"9091836476"}</span>
              <span
                className="ml-6 text-primary cursor-pointer"
                onClick={() => setChangeMobileInput(true)}
              >
                change
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProfileDetails;
