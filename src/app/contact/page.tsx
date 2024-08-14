"use client";
import DotPulseButton from "@/components/DotPulseButton";
import { useState } from "react";
const ContactPage = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      let data = new FormData();
      data.append("user_name", username);
      data.append("email", email);
      data.append("description", description);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/customer/contact/`,
        {
          method: "POST",
          credentials: "include",
          body: data,
        }
      );
      if (res.ok) {
        setMessage("Successful.");
      } else {
        setMessage("Something went wrong.");
      }
    } catch (e) {
      console.log(e);
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center min-h-[100vh-40px] py-8 px-2 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="max-w-screen-sm min-w-[360px] md:min-w-[450px] border shadow-lg py-4 px-6 rounded-md">
        <div className="text-center text-3xl my-2">Contact Us</div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="User name"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="p-2 mt-4 border-2 rounded-md w-full"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-2 mt-4 border-2 rounded-md w-full"
            />
          </div>
          <div>
            <textarea
              name="description"
              placeholder="Description"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="p-2 mt-4 border-2 rounded-md w-full"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-3 py-2 text-white bg-black rounded-md my-3 relative"
          >
            {"SUBMIT"}
            {loading && (
              <DotPulseButton
                color="white"
                bgColor="black"
                borderRadius="6px"
              />
            )}
          </button>
        </form>
        {message && <div className="py-2 text-center">{message}</div>}
      </div>
    </div>
  );
};

export default ContactPage;
