"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resetLink, setResetLink] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");
    setResetLink("");

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "An error occurred");
        setIsLoading(false);
        return;
      }

      setMessage(data.message);
      if (data.resetLink) {
        setResetLink(data.resetLink);
      }
      setEmail("");
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
        <h1 className="mt-3 text-3xl font-headline font-extrabold text-stone-900">Forgot password</h1>
        <p className="mt-4 text-sm text-stone-600 leading-relaxed">
          Enter your email and we will send a secure reset link.
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
              {resetLink && (
                <p className="mt-2 text-xs text-green-900 break-all">
                  Development reset link: <a href={resetLink} className="underline font-semibold">{resetLink}</a>
                </p>
              )}
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-stone-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-600/10"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full rounded-xl bg-gradient-to-br from-primary to-primary-container px-4 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-primary/20 transition-transform hover:scale-[1.01] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Sending..." : "Send reset link"}
          </button>

          <p className="pt-2 text-center text-sm text-stone-600">
            Remember your password?{" "}
            <Link href="/signin" className="font-bold text-green-700 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
