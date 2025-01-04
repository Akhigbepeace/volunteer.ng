"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SelectRole = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const router = useRouter();

  return (
    <div className="relative h-screen bg-tertiary flex items-center justify-center">
      <div className="absolute top-0 left-0 p-4 z-0">
        <Image
          src="/assets/logo.png"
          alt="logo"
          width={300}
          height={50}
          className="blur-sm opacity-50"
        />
      </div>

      <div className="relative bg-primary text-white p-8 rounded-lg shadow-lg z-10 w-[400px]">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Select Your Role
        </h2>
        <form className="flex flex-col gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="volunteer"
              checked={selectedRole === "volunteer"}
              onChange={(e) => {
                localStorage.setItem("role", e.target.value);
                setSelectedRole(e.target.value);
              }}
              className="w-4 h-4"
            />
            Are you a Volunteer?
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="organization"
              checked={selectedRole === "organization"}
              onChange={(e) => {
                localStorage.setItem("role", e.target.value);
                setSelectedRole(e.target.value);
              }}
              className="w-4 h-4"
            />
            Are you an Organization?
          </label>

          <Link
            href={
              selectedRole === "volunteer" ? "/home/volunteer" : "/home/org"
            }
          >
            <button
              disabled={!selectedRole}
              className={`mt-6 py-2 rounded w-full ${
                selectedRole
                  ? "bg-secondary hover:bg-opacity-70 transition"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SelectRole;
