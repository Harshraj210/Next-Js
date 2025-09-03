"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
// better than fetch --> auto JSON coversion

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onLogIn = () => {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Log In
        </h1>
        <hr className="dark:border-gray-600" />
        <div className="space-y-4">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter E-mail"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white font-sans"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full p-3 font-sans border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
        </div>

        <button
          onClick={onLogIn}
          className="w-full py-3 px-4 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
        >
         Login
        </button>

        <div className="text-center">
          {/* directing it to login page */}
          <Link
            href="/signup"
            className="text-sm text-blue-500 hover:underline dark:text-blue-400"
          >
           Visit Signup Page
          </Link>
        </div>
      </div>
    </div>
  );
}
