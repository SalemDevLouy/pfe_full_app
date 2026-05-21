"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { markSignedIn, markQuizCompleted, QUIZ_PROFILE_STORAGE_KEY } from "@/app/lib/session-flow";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      // Read quiz profile before the request (localStorage is browser-only)
      const savedProfile = localStorage.getItem(QUIZ_PROFILE_STORAGE_KEY);
      const quizProfile = savedProfile ? JSON.parse(savedProfile) : null;

      // 1. Register via backend — quiz profile is sent in the same request so
      //    the server can persist it immediately with the fresh session token
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          quizProfile,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "An error occurred during signup");
        setIsLoading(false);
        return;
      }

      // Clear stored quiz profile now that the server has processed it
      if (quizProfile) {
        localStorage.removeItem(QUIZ_PROFILE_STORAGE_KEY);
      }

      // Log partial onboarding failures so they appear in the browser console
      if (data.onboardingErrors?.length > 0) {
        console.warn("[signup] Onboarding partial failure:", data.onboardingErrors);
      }

      setSuccess("Account created! Signing you in...");

      // 3. Sign in via NextAuth (creates the frontend session with backendToken)
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.ok) {
        markSignedIn();
        markQuizCompleted();
        router.push("/main/dashboard");
        router.refresh();
      } else {
        // Account exists but auto-signin failed — send to sign-in page
        router.push("/signin");
      }
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
        <p className="text-[10px] uppercase tracking-[0.3em] text-green-700 font-bold">Join Us</p>
        <h1 className="mt-3 text-3xl font-headline font-extrabold text-stone-900">Create account</h1>
        <p className="mt-4 text-sm text-stone-600 leading-relaxed">
          Set up your profile to start using the personalized app experience.
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}

          {success && (
            <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3">
              <p className="text-sm font-medium text-green-800">{success}</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-stone-700">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-600/10"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-stone-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-600/10"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
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
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-600/10"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
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
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-600/10"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full rounded-xl bg-gradient-to-br from-primary to-primary-container px-4 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-primary/20 transition-transform hover:scale-[1.01] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Creating account..." : "Sign up and continue"}
          </button>

          <p className="pt-2 text-center text-sm text-stone-600">
            Already have an account?{" "}
            <Link href="/signin" className="font-bold text-green-700 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
