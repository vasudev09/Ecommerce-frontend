import { useState } from "react";
import Image from "next/image";
import DotPulseButton from "./DotPulseButton";
const ProfileDetails = ({ closeActiveTab, profile }: any) => {
  const [profileMessage, setProfileMessage] = useState("");
  const [changePasswordInput, setChangePasswordInput] = useState(false);
  const [changeMobileInput, setChangeMobileInput] = useState(false);
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  async function changePassword() {
    if (password.length > 7) {
      try {
        setLoading1(true);
        let data = new FormData();
        data.append("password", password);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customer/change-password/`,
          {
            method: "POST",
            credentials: "include",
            body: data,
          }
        );
        if (res.ok) {
          setProfileMessage("Password Change Successfull!");
          setPassword("");
        } else {
          setProfileMessage("Something went wrong while updating password.");
        }
      } catch (e) {
        console.log(e);
        setProfileMessage("Something went wrong while updating password.");
      } finally {
        setLoading1(false);
      }
    } else {
      setProfileMessage("Please enter atleast 8 characters.");
    }
  }

  async function changeMobile() {
    let isnum = /^\d+$/.test(mobile);
    if (mobile.length == 10 && isnum) {
      try {
        setLoading2(true);
        let data = new FormData();
        data.append("mobile", mobile);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customer/change-mobile/`,
          {
            method: "POST",
            credentials: "include",
            body: data,
          }
        );
        if (res.ok) {
          setProfileMessage("Mobile Change Successfull!");
          setMobile("");
          window.location.reload();
        } else {
          setProfileMessage("Something went wrong while updating mobile.");
        }
      } catch (e) {
        console.log(e);
        setProfileMessage("Something went wrong while updating mobile.");
      } finally {
        setLoading2(false);
      }
    } else {
      setProfileMessage("Please enter 10 digits.");
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
      {profileMessage && (
        <div className="p-2 text-center">{profileMessage}</div>
      )}
      <div className="relative w-32 h-32 mx-auto">
        <Image src="/user.png" fill alt="" className="object-contain" />
      </div>
      <div className="pt-16 md:pl-[10%]">
        <div className="mb-8 px-4 flex flex-col md:flex-row">
          <div className="min-w-36 mb-1 font-semibold">Username :</div>
          <div className="">
            {profile?.username ? profile.username : "**username**"}
          </div>
        </div>
        <div className="mb-10 px-4 flex flex-col md:flex-row">
          <div className="min-w-36 mb-1 font-semibold">Email :</div>
          <div className="">{profile?.email ? profile.email : "**email**"}</div>
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div>
                <button
                  type="button"
                  className="cursor-pointer bg-primary text-white rounded-md py-1.5 px-2 relative"
                  onClick={() => changePassword()}
                  disabled={loading1}
                >
                  Update
                  {loading1 && (
                    <DotPulseButton
                      color="white"
                      bgColor="#F35C7A"
                      borderRadius="6px"
                    />
                  )}
                </button>
                <button
                  type="button"
                  className="cursor-pointer rounded-md py-1.5 px-2"
                  onClick={() => {
                    setChangePasswordInput(false);
                    setPassword("");
                    setProfileMessage("");
                  }}
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
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <div>
                <button
                  type="button"
                  className="cursor-pointer bg-primary text-white rounded-md py-1.5 px-2 relative"
                  onClick={() => changeMobile()}
                  disabled={loading2}
                >
                  Update
                  {loading2 && (
                    <DotPulseButton
                      color="white"
                      bgColor="#F35C7A"
                      borderRadius="6px"
                    />
                  )}
                </button>
                <button
                  type="button"
                  className="cursor-pointer rounded-md py-1.5 px-2"
                  onClick={() => {
                    setChangeMobileInput(false);
                    setProfileMessage("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <span>+91 - {profile?.mobile ? profile.mobile : ""}</span>
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
