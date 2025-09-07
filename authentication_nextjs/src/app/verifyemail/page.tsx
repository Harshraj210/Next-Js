"sue client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function verifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyuseremail = async () => {
    try {
      await axios.post("/api/user/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true), console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urltoken = window.location.search.split("=")[1];
    setToken(urltoken || "")
  }, []);
  useEffect(() => {
    if (token.length > 0) {
      verifyuseremail();
    }
  }, [token]);
  return 
  <div className="flex flex-col justify-center items-center py-4 min-h-screen">
    <h1 className="text-4xl">Verify email</h1>
    <h2 className=" py-2 bg-blue-200 text-white">{token ? `${token}` :"notoken"}</h2>
    {verified && (
      <div>
        <h2 className="text-2xl">Email Verified</h2>
        <Link href="/login">
         
            Login
          
        </Link>
        </div>
    )}
        {error && (
      <div>
        <h2 className="text-2xl bg-red-400 text-black">error</h2>
        <Link href="/login">
         
            Login
          
        </Link>
        </div>

    )}
  </div>
}
