"use client";

import { useAuth } from "@/lib/hooks/use-auth";
import Link from "next/link";

export function AuthMenu() {
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex gap-4">
        <Link href="/signin" className="px-4 py-2 text-blue-600 hover:text-blue-700">
          Sign In
        </Link>
        <Link
          href="/signup"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-gray-600">
        Welcome, <span className="font-semibold">{user?.name || user?.email}</span>
      </span>
      <button
        onClick={logout}
        className="px-4 py-2 text-red-600 hover:text-red-700 font-medium"
      >
        Logout
      </button>
    </div>
  );
}
