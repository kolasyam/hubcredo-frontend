"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiSettings, FiX } from "react-icons/fi";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  // Dummy Users Table Data
  const tableData = [
    {
      id: 1,
      name: "Michael Holz",
      avatar: "https://i.pravatar.cc/40?img=1",
      date: "04/10/2013",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Paula Wilson",
      avatar: "https://i.pravatar.cc/40?img=5",
      date: "05/08/2014",
      role: "Publisher",
      status: "Active",
    },
    {
      id: 3,
      name: "Antonio Moreno",
      avatar: "https://i.pravatar.cc/40?img=3",
      date: "11/05/2015",
      role: "Publisher",
      status: "Suspended",
    },
    {
      id: 4,
      name: "Mary Saveley",
      avatar: "https://i.pravatar.cc/40?img=10",
      date: "06/09/2016",
      role: "Reviewer",
      status: "Active",
    },
    {
      id: 5,
      name: "Martin Sommer",
      avatar: "https://i.pravatar.cc/40?img=15",
      date: "12/08/2017",
      role: "Moderator",
      status: "Inactive",
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("usertoken");
      if (!token) {
        router.push("/signin");
        return;
      }
      try {
        const userResponse = await fetch(
          "https://quantum-backend-1-0tpn.onrender.com/api/user/profile",
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
      {/* TABLE */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-8 w-full overflow-x-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-800">User List</h2>

            <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
                <tr className="text-gray-600 border-b">
                <th className="py-3">#</th>
                <th className="px-3 py-3">Name</th>
                <th className="py-3">Date Created</th>
                <th className="py-3">Role</th>
                <th className="py-3">Status</th>
                <th className="py-3">Action</th>
                </tr>
            </thead>

            <tbody>
                {tableData.map((row) => (
                <tr
                    key={row.id}
                    className="border-b hover:bg-gray-50 transition"
                >
                    <td className="py-3 text-black">{row.id}</td>

                    <td className="px-4 py-3 flex items-center gap-3">
                    <img
                        src={row.avatar}
                        alt={row.name}
                        className="w-10 h-10 rounded-full"
                    />
                    <span className="font-semibold text-gray-800">
                        {row.name}
                    </span>
                    </td>

                    <td className="py-3 text-gray-600">{row.date}</td>
                    <td className="py-3 text-gray-700">{row.role}</td>

                    <td className="py-3">
                    <span
                        className={`flex items-center gap-2 ${
                        row.status === "Active"
                            ? "text-green-600"
                            : row.status === "Suspended"
                            ? "text-red-500"
                            : "text-yellow-600"
                        }`}
                    >
                        <span
                        className={`w-3 h-3 rounded-full ${
                            row.status === "Active"
                            ? "bg-green-500"
                            : row.status === "Suspended"
                            ? "bg-red-500"
                            : "bg-yellow-500"
                        }`}
                        ></span>
                        {row.status}
                    </span>
                    </td>
                    <td className="py-3 flex items-center gap-4 text-xl">
                    <FiSettings className="text-blue-500 cursor-pointer hover:text-blue-700" />
                    <FiX className="text-red-500 cursor-pointer hover:text-red-700" />
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    </div>
  );
}
