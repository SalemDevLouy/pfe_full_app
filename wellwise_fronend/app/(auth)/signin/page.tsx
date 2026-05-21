"use client";

import { signIn } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { markSignedIn } from "@/app/lib/session-flow";

function getAuthErrorMessage(errorCode: string | null) {
  switch (errorCode) {
    case "CredentialsSignin":
      return "Invalid email or password";
    case "AccessDenied":
      return "Access denied";
    default:
      return errorCode ? "Sign in failed. Please try again." : "";
  }
}

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const callbackUrl = searchParams.get("callbackUrl") || "/main/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setErrorMessage(getAuthErrorMessage(error));
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setMessage("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: callbackUrl,
      });

      if (result?.error) {
        setErrorMessage(getAuthErrorMessage(result.error));
        return;
      }

      if (result?.ok) {
        markSignedIn();
        setMessage("Login successful, redirecting...");
        router.push(result.url || callbackUrl);
        router.refresh();
        return;
      }

      setErrorMessage("Sign in failed. Please try again.");
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-[radial-gradient(circle_at_20%_20%,rgba(13,99,27,0.15),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(46,125,50,0.12),transparent_40%),#f7f8f7]">
      <div className="w-full max-w-md rounded-3xl border border-outline-variant/30 bg-white/90 backdrop-blur-xl p-8 md:p-10 shadow-[0_20px_48px_rgba(17,24,39,0.08)]">
        <p className="text-[10px] uppercase tracking-[0.3em] text-green-700 font-bold">Welcome Back</p>
        <h1 className="mt-3 text-3xl font-headline font-extrabold text-stone-900">Sign in</h1>
        <p className="mt-4 text-sm text-stone-600 leading-relaxed">
          Access your account to continue with the personalized app experience.
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm font-medium text-red-800">{errorMessage}</p>
            </div>
          )}

          {message && (
            <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3">
              <p className="text-sm font-medium text-green-800">{message}</p>
            </div>
          )}

          <div className="space-y-4">
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

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-stone-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-600/10"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-1">
            <label className="flex items-center gap-2 text-sm text-stone-600">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-stone-300 text-green-700 focus:ring-green-600"
              />
              Remember me
            </label>

            <Link href="/forgot-password" className="text-sm font-medium text-green-700 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full rounded-xl bg-gradient-to-br from-primary to-primary-container px-4 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-primary/20 transition-transform hover:scale-[1.01] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Signing in..." : "Sign in and open app"}
          </button>

          <p className="pt-2 text-center text-sm text-stone-600">
            New here?{" "}
            <Link href="/signup" className="font-bold text-green-700 hover:underline">
              Create account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-[radial-gradient(circle_at_20%_20%,rgba(13,99,27,0.15),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(46,125,50,0.12),transparent_40%),#f7f8f7]">
          <div className="w-full max-w-md rounded-3xl border border-outline-variant/30 bg-white/90 backdrop-blur-xl p-8 md:p-10 shadow-[0_20px_48px_rgba(17,24,39,0.08)]">
            <p className="text-sm text-stone-600">Loading sign-in...</p>
          </div>
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}
