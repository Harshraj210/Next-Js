"use client";
import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const Logout = async () => {
    try {
      await axios.get("/api/users/logout"); 
      toast.success("Logout Successful");
      router.push("/login");
    } catch (error) {
      console.log("Logout failed", error);
      toast.error("Logout Failed. Please try again");
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");  
      console.log(res.data);

      // Adjust based on API response structure
      setData(res.data?.data?._id || "no id found");
    } catch (error) {
      console.error("Failed to fetch user", error);
      toast.error("Failed to fetch user details");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100 dark:bg-gray-900">
      <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Profile Page
        </h1>
        <hr className="w-full max-w-xs mb-4 border-gray-300 dark:border-gray-600" />
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Welcome to your profile!
        </p>

        {/*  Show user link only if we have data */}
        {data !== "nothing" ? (
          <Link href={`/profile/${data}`} className="text-black underline bg-green-300">
            {data}
          </Link>
        ) : (
          <p className="text-gray-500">No user data yet</p>
        )}

        <div className="flex gap-4 mt-6">
          <button
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            onClick={Logout}
          >
            Log Out
          </button>
          <button
            className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            onClick={getUserDetails}
          >
            Get User Details
          </button>
        </div>
      </div>
    </div>
  );
}
