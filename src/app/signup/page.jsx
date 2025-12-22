'use client'
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FiUser, FiMail, FiLock, FiCalendar, FiEye, FiEyeOff } from "react-icons/fi";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("https://hubcredo-backend-de0y.onrender.com/api/user/register", {
        name,
        email,
        dob,
        password,
      });
      localStorage.setItem("usertoken", res.data.token);
      router.push("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
return (
  <div className="min-h-screen bg-gradient-to-b from-teal-400 to-teal-600 flex items-center justify-center p-6">
    <div className="max-w-md w-full relative">
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-teal-300 px-10 py-4 text-teal-900 font-bold tracking-wide shadow-md">
        SIGN UP
      </div>
      <div className="bg-[#0f1724]/90 rounded-2xl shadow-2xl p-6 pt-12">
        <h2 className="text-white mt-2 text-2xl font-bold text-center">
          Create your account
        </h2>
        {error && (
          <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-4 mt-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <Input
            icon={<FiUser />}
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            icon={<FiMail />}
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            icon={<FiCalendar />}
            placeholder="Date of Birth"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
          <Input
            icon={<FiLock />}
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition cursor-pointer ${
              loading
                ? "bg-teal-300/60 cursor-not-allowed"
                : "bg-teal-300 hover:bg-teal-200 text-teal-900"
            }`}
          >
            {loading ? "Creating..." : "REGISTER"}
          </button>
        </form>
        <div className="text-center mt-4 text-sm text-teal-200">
          Already have an account?{" "}
          <Link href="/signin" className="text-white underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  </div>
);

}


function Input({ icon, placeholder, type = "text", value, onChange, required }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <label className="relative flex items-center bg-white/70 rounded-md px-5 py-4 border border-gray-300 shadow-sm">
      <div className="text-gray-600 mr-3 text-lg">{icon}</div>
      <input
        type={isPassword ? (show ? "text" : "password") : type}
        placeholder={placeholder}
        className="bg-transparent outline-none w-full text-gray-800 placeholder-gray-500"
        value={value}
        onChange={onChange}
        required={required}
      />
      {isPassword && (
        <div
          onClick={() => setShow(!show)}
          className="absolute right-3 text-gray-500 cursor-pointer text-xl"
        >
          {show ? <FiEyeOff /> : <FiEye />}
        </div>
      )}
    </label>
  );
}
