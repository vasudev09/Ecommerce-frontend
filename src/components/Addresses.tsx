import { useEffect, useState } from "react";
import Image from "next/image";

const Addresses = ({ closeActiveTab }: any) => {
  const [addressMessage, setAddressMessage] = useState("");
  const [addAddress, setAddAddress] = useState(false);
  const [editForm, setEditForm] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    building: "",
    area: "",
    pincode: "",
    city: "",
    state: "",
  });

  let addresses = [
    {
      name: "Home",
      building: "123A/45, First Floor",
      area: "Main Street, ABC Colony",
      pincode: "560001",
      city: "Banglore",
      state: "KA",
    },
    {
      name: "Home2",
      building: "123A/45, First Floor",
      area: "Main Street, ABC Colony",
      pincode: "560001",
      city: "Hyderabad",
      state: "AP",
    },
  ];
  useEffect(() => {
    fetchAddresses();
  }, []);

  function fetchAddresses() {
    fetch("http://127.0.0.1/api/addresses", {
      credentials: "include",
      cache: "no-cache",
    })
      .then((response) => response.json())
      .then((body) => (addresses = body))
      .catch((error) => console.log(error));
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function submitAddress(e: any) {
    e.preventDefault();
    let data = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      data.append(key, value);
    }
    try {
      const res = await fetch("http://127.0.0.1/api/address", {
        method: "POST",
        credentials: "include",
        body: data,
      });
      const resData = await res.json();
      if (res.ok) {
        setAddressMessage("Address added successfully!");
      }
    } catch (e) {
      console.log(e);
    }
  }

  function handleEdit(index: number) {
    setAddAddress(false);
    setEditForm(index);
    setFormData(addresses[index]);
  }

  async function handleDelete(index: number) {
    console.log(index);
  }

  async function editFormSubmit(e: any) {
    e.preventDefault();
  }

  const addressform = [
    {
      label: "Address Name :",
      type: "text",
      name: "name",
      placeholder: "Home",
    },
    {
      label: "Building, House No., Flat, Floor :",
      type: "text",
      name: "building",
      placeholder: "123A/45, First Floor",
    },
    {
      label: "Street, Area, Village :",
      type: "text",
      name: "area",
      placeholder: "Main Street, ABC Colony",
    },
    {
      label: "Pincode :",
      type: "text",
      name: "pincode",
      placeholder: "560001",
    },
    {
      label: "City/Town :",
      type: "text",
      name: "city",
      placeholder: "Banglore",
    },
    {
      label: "State :",
      type: "select",
      name: "state",
      placeholder: "",
    },
  ];

  const states = [
    { value: "", label: "Select State" },
    { value: "AP", label: "Andhra Pradesh" },
    { value: "AR", label: "Arunachal Pradesh" },
    { value: "AS", label: "Assam" },
    { value: "BR", label: "Bihar" },
    { value: "CG", label: "Chhattisgarh" },
    { value: "GA", label: "Goa" },
    { value: "GJ", label: "Gujarat" },
    { value: "HR", label: "Haryana" },
    { value: "HP", label: "Himachal Pradesh" },
    { value: "JH", label: "Jharkhand" },
    { value: "KA", label: "Karnataka" },
    { value: "KL", label: "Kerala" },
    { value: "MP", label: "Madhya Pradesh" },
    { value: "MH", label: "Maharashtra" },
    { value: "MN", label: "Manipur" },
    { value: "ML", label: "Meghalaya" },
    { value: "MZ", label: "Mizoram" },
    { value: "NL", label: "Nagaland" },
    { value: "OR", label: "Odisha" },
    { value: "PB", label: "Punjab" },
    { value: "RJ", label: "Rajasthan" },
    { value: "SK", label: "Sikkim" },
    { value: "TN", label: "Tamil Nadu" },
    { value: "TG", label: "Telangana" },
    { value: "TR", label: "Tripura" },
    { value: "UP", label: "Uttar Pradesh" },
    { value: "UT", label: "Uttarakhand" },
    { value: "WB", label: "West Bengal" },
    { value: "AN", label: "Andaman and Nicobar Islands" },
    { value: "CH", label: "Chandigarh" },
    { value: "DN", label: "Dadra and Nagar Haveli and Daman and Diu" },
    { value: "LD", label: "Lakshadweep" },
    { value: "DL", label: "Delhi" },
    { value: "PY", label: "Puducherry" },
  ];

  return (
    <div className="py-4 w-full min-h-screen md:min-h-0 rounded-md bg-white absolute top-0 left-0 md:static">
      <div className="flex flex-row items-center justify-between mb-4 pr-4 md:pr-0">
        <div className="flex flex-row items-center">
          <div
            className="block md:hidden cursor-pointer w-fit px-4 py-2"
            onClick={closeActiveTab}
          >
            <Image
              className="block"
              src="/arrow-left.png"
              width={24}
              height={24}
              alt=""
            />
          </div>
          <h2 className="text-xl font-semibold">Addresses</h2>
        </div>
        <button
          type="button"
          disabled={addAddress}
          className="p-1.5 bg-primary text-white rounded disabled:bg-pink-200 disabled:cursor-not-allowed"
          onClick={() => {
            setAddAddress(true);
            setEditForm(null);
            setFormData({
              name: "",
              building: "",
              area: "",
              pincode: "",
              city: "",
              state: "",
            });
          }}
        >
          + Add New
        </button>
      </div>
      {addressMessage && (
        <div className="p-2 text-center">Address added successfully!</div>
      )}

      {addAddress && (
        <form
          onSubmit={(e) => submitAddress(e)}
          className="border-b rounded-md px-2"
        >
          {addressform.map((field, index) => (
            <div key={index} className="flex flex-col gap-2 p-2">
              <label className="text-sm text-gray-700 font-semibold">
                {field.label}
              </label>
              {field.type == "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleInputChange}
                  className="ring-2 ring-gray-300 rounded-md p-1.5 w-full sm:w-3/4 md:w-3/5"
                  required
                >
                  {states.map((state) => (
                    <option key={state.value} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleInputChange}
                  required
                  className="ring-2 ring-gray-300 rounded-md p-1.5 w-full sm:w-3/4 md:w-3/5"
                />
              )}
            </div>
          ))}
          <div className="p-2 flex flex-row justify-between items-center">
            <button
              type="submit"
              className="py-2 px-4 bg-primary rounded-md text-white"
            >
              ADD
            </button>
            <button
              type="reset"
              className="p-2 border rounded-md"
              onClick={() => {
                setAddAddress(false);
                setFormData({
                  name: "",
                  building: "",
                  area: "",
                  pincode: "",
                  city: "",
                  state: "",
                });
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {addresses.length > 0 ? (
        <ul>
          {addresses.map((address, index) => (
            <li key={index} className="border-b py-3 text-sm px-4 md:px-2">
              <div className="flex flex-row items-center justify-between flex-wrap">
                <div className="mr-2">
                  <p className=" font-semibold">{address.name}</p>
                  <p>
                    {address.building}
                    {", "}
                    {address.area}
                  </p>
                  <p>
                    {address.city}
                    {", "}
                    {
                      states.find((state) => state.value === address.state)
                        ?.label
                    }
                  </p>
                  <p>{address.pincode}</p>
                </div>
                <div className="my-2">
                  <button
                    disabled={index == editForm}
                    className="py-1.5 px-4 border rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    disabled={index == editForm}
                    className="p-1.5 ml-2 bg-primary  text-white rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {index == editForm && (
                <form
                  onSubmit={(e) => editFormSubmit(e)}
                  className="border rounded-md"
                >
                  {addressform.map((field, index) => (
                    <div key={index} className="flex flex-col gap-2 p-2">
                      <label className="text-sm text-gray-700 font-semibold">
                        {field.label}
                      </label>
                      {field.type == "select" ? (
                        <select
                          id={field.name}
                          name={field.name}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleInputChange}
                          className="ring-2 ring-gray-300 rounded-md p-1.5 w-full sm:w-3/4 md:w-3/5"
                          required
                        >
                          {states.map((state) => (
                            <option key={state.value} value={state.value}>
                              {state.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          placeholder={field.placeholder}
                          value={formData[field.name as keyof typeof formData]}
                          onChange={handleInputChange}
                          required
                          className="ring-2 ring-gray-300 rounded-md p-1.5 w-full sm:w-3/4 md:w-3/5"
                        />
                      )}
                    </div>
                  ))}
                  <div className="p-2 flex flex-row justify-between items-center">
                    <button
                      type="submit"
                      className="py-2 px-4 bg-primary rounded-md text-white"
                    >
                      Update
                    </button>
                    <button
                      type="reset"
                      className="p-2 border rounded-md"
                      onClick={() => {
                        setEditForm(null);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="px-4 md:px-0">No address found.</div>
      )}
    </div>
  );
};

export default Addresses;
