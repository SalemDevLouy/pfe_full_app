import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001/api/v1";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await fetch(`${BACKEND_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) return null;

          const data = await res.json();

          return {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            backendToken: data.accessToken,
          } as User & { backendToken: string };
        } catch {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User & { backendToken?: string } }) {
      if (user) {
        token.id = user.id;
        token.backendToken = user.backendToken ?? "";
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      return {
        ...session,
        backendToken: token.backendToken as string,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
