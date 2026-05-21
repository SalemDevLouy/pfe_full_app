import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    backendToken: string;
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
  }

  interface User {
    backendToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    backendToken: string;
  }
}
