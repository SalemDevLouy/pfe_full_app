import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import AosProvider from "./_components/aos-provider";
import { AuthProvider } from "./_components/auth-provider";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "sihatek market",
  description: "Your digital sanctuary for personalized care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full antialiased light`}
    >
      <head>
          <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
          <style>{`
            .material-symbols-outlined {
                font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            }
            .wellness-glow {
                box-shadow: 0 8px 24px rgba(26, 28, 28, 0.04);
            }
            .editorial-gradient {
                background: linear-gradient(135deg, #0d631b 0%, #2e7d32 100%);
            }
            .glass-panel {
                background: rgba(243, 243, 243, 0.8);
                backdrop-filter: blur(24px);
            }
          `}</style>
      </head>
      <body className="min-h-screen bg-background text-on-background font-body">
        <AuthProvider>
          <AosProvider />
          <Toaster position="bottom-right" richColors />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
