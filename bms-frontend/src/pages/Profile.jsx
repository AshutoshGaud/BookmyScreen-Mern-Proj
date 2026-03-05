 import React from "react";
import { tabs } from "../utils/constants";
import { IoMdAdd, IoIosLogOut } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import BookingHistory from "../components/profile/BookingHistory";

const Profile = () => {
  const [activeTab, setActiveTab] = React.useState("Profile");

  return (
    <>
      {/* Tabs */}
      <div className="bg-[#e5e5e5]">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-6 py-2 text-sm font-medium">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-1 cursor-pointer ${
                activeTab === tab
                  ? "text-[#f74565] border-b-2 border-[#f74565]"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Profile Page */}
      <div className="min-h-screen py-10 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          {activeTab === "Profile" && (
            <>
              {/* Header */}
              <div className="bg-gradient-to-r from-gray-800 to-[#f74565] rounded-md px-6 py-6 flex items-center gap-6 text-white">
                <div className="relative w-20 h-20 border-4 border-white rounded-full flex items-center justify-center bg-white text-gray-600">
                  <IoMdAdd size={24} />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">Hi, Ashutosh</h2>
                  <button className="underline text-sm mt-1 flex items-center gap-1 hover:text-gray-200">
                    <IoIosLogOut size={18} /> Logout
                  </button>
                </div>
              </div>

              {/* Account Details */}
              <div className="bg-white px-8 py-6 rounded-md mt-4">
                <h3 className="text-lg font-semibold mb-4">Account Details</h3>

                <div className="flex items-center justify-between mb-3">
                  <p className="text-gray-700">Email Address</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">testemail@gmail.com</span>
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-[2px] rounded">
                      Verified
                    </span>
                    <FiEdit className="text-pink-500 cursor-pointer" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-gray-700">Mobile Number</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">+91-9825436486</span>
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-[2px] rounded">
                      Verified
                    </span>
                    <FiEdit className="text-pink-500 cursor-pointer" />
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="bg-white p-8 mt-4 rounded-md">
                <h3 className="text-lg font-semibold mb-4">Personal Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <input
                      type="text"
                      value="Ashutosh Gaud"
                      readOnly
                      className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Birth Date (Optional)
                    </label>
                    <input
                      type="date"
                      className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Identity (Optional)
                    </label>
                    <div className="flex gap-3 mt-1">
                      <button className="px-4 py-1 border border-gray-200 rounded-lg bg-white hover:bg-gray-100">
                        Woman
                      </button>
                      <button className="px-4 py-1 border border-gray-200 rounded-lg bg-white hover:bg-gray-100">
                        Man
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Married? (Optional)
                    </label>
                    <div className="flex gap-3 mt-1">
                      <button className="px-4 py-1 border border-gray-200 rounded-lg bg-white hover:bg-gray-100">
                        Yes
                      </button>
                      <button className="px-4 py-1 border border-gray-200 rounded-lg bg-white hover:bg-gray-100">
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

            {/* Booking Section */}
            {activeTab === "Your Orders" && <BookingHistory />}
        </div>
      </div>
    </>
  );
};

export default Profile;
