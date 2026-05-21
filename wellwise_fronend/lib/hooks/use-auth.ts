import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";
  const user = session?.user;

  const logout = async () => {
    const { signOut } = await import("next-auth/react");
    await signOut({ redirect: false });
    router.push("/signin");
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    logout,
    session,
  };
}
