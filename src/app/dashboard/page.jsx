"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiSettings, FiX } from "react-icons/fi";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("usertoken");
      if (!token) {
        router.push("/signin");
        return;
      }
      try {
        const userResponse = await fetch(
          "https://hubcredo-backend-1.onrender.com/api/user/profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!userResponse.ok) throw new Error("Failed to fetch user profile");
        const userData = await userResponse.json();
        setUser(userData);
      } catch (error) {
        localStorage.removeItem("usertoken");
        router.push("/signin");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);
  const handleLogout = () => {
    localStorage.removeItem("usertoken");
    router.push("/signin");
  };
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }
  return (
    <div className="min-h-screen pt-4 px-6 bg-gray-100">
      <div className="flex justify-end mb-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow cursor-pointer"
        >
          Logout
        </button>
      </div>
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 mb-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
          Welcome, {user?.name} 👋
        </h1>
        <div className="space-y-4 text-lg text-gray-900">
          <p>
            <span className="font-semibold text-gray-700">Name:</span>{" "}
            {user?.name}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Email:</span>{" "}
            {user?.email}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Date of Birth:</span>{" "}
            {new Date(user?.dob).toLocaleDateString("en-GB")}
          </p>
        </div>
      </div>
    </div>
  );
}
