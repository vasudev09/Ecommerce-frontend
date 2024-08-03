"use client";
import { useState } from "react";
const ContactPage = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  return (
    <div className="flex justify-center min-h-[100vh-40px] py-8 px-2 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <div className="max-w-screen-sm min-w-[360px] md:min-w-[450px] border shadow-lg py-4 px-6 rounded-md">
        <div className="text-center text-3xl my-2">Contact Us</div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <input
              type="text"
              placeholder="User name"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="p-2 mt-4 border-2 rounded-md w-full"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              className="p-2 mt-4 border-2 rounded-md w-full"
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-3 py-2 text-white bg-black rounded-md my-3"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
