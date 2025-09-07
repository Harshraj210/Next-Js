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
    setToken(urltoken)
  }, []);
  useEffect(() => {
    if (token.length > 0) {
      verifyuseremail();
    }
  }, [token]);
  return 
  <div
}
