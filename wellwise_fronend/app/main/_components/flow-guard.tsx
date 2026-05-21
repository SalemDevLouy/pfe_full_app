"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isAuthenticated, isQuizCompleted } from "@/app/lib/session-flow";

type FlowGuardProps = {
  children: React.ReactNode;
};

export default function FlowGuard({ children }: FlowGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  const isQuizRoute = useMemo(() => pathname === "/quiz" || pathname.startsWith("/quiz/"), [pathname]);

  useEffect(() => {
    const authenticated = isAuthenticated();

    if (!authenticated) {
      setReady(false);
      router.replace("/login");
      return;
    }

    const quizCompleted = isQuizCompleted();

    if (!quizCompleted && !isQuizRoute) {
      setReady(false);
      router.replace("/quiz");
      return;
    }

    if (quizCompleted && isQuizRoute) {
      setReady(false);
      router.replace("/main/dashboard");
      return;
    }

    setReady(true);
  }, [isQuizRoute, router]);

  if (!ready) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background text-on-background">
        <p className="text-sm font-semibold uppercase tracking-widest text-stone-500">Loading your journey...</p>
      </div>
    );
  }

  return <>{children}</>;
}
