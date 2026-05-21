"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token || !email) {
      setError("Invalid or missing reset link");
    }
  }, [token, email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    // Validation
    if (!password || !confirmPassword) {
      setError("Both password fields are required");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/reset-password/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          token,
          newPassword: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "An error occurred");
        setIsLoading(false);
        return;
      }

      setMessage("Password reset successfully! Redirecting...");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-[radial-gradient(circle_at_20%_20%,rgba(13,99,27,0.15),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(46,125,50,0.12),transparent_40%),#f7f8f7]">
      <div className="w-full max-w-md rounded-3xl border border-outline-variant/30 bg-white/90 backdrop-blur-xl p-8 md:p-10 shadow-[0_20px_48px_rgba(17,24,39,0.08)]">
        <p className="text-[10px] uppercase tracking-[0.3em] text-green-700 font-bold">Recovery</p>
        <h1 className="mt-3 text-3xl font-headline font-extrabold text-stone-900">Create new password</h1>
        <p className="mt-4 text-sm text-stone-600 leading-relaxed">
          Choose a strong password to secure your account.
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}

          {message && (
            <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3">
              <p className="text-sm font-medium text-green-800">{message}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-stone-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                disabled={!token}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-600/10 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-stone-700">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                disabled={!token}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-600/10 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !token}
            className="mt-4 w-full rounded-xl bg-gradient-to-br from-primary to-primary-container px-4 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-primary/20 transition-transform hover:scale-[1.01] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Resetting..." : "Reset password"}
          </button>

          <p className="pt-2 text-center text-sm text-stone-600">
            <Link href="/signin" className="font-bold text-green-700 hover:underline">
              Back to sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-[radial-gradient(circle_at_20%_20%,rgba(13,99,27,0.15),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(46,125,50,0.12),transparent_40%),#f7f8f7]">
          <div className="w-full max-w-md rounded-3xl border border-outline-variant/30 bg-white/90 backdrop-blur-xl p-8 md:p-10 shadow-[0_20px_48px_rgba(17,24,39,0.08)]">
            <p className="text-sm text-stone-600">Loading reset form...</p>
          </div>
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
