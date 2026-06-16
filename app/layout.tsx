import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NOCTIS | Premium Streetwear",
  description: "NOCTIS resmi mağazası",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <main className="flex-1">
          {children}
        </main>

        <footer className="border-t border-white/10 bg-black/30 px-6 py-6 text-center text-sm text-gray-400">
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/iade-ve-degisim"
              className="hover:text-white transition"
            >
              İade ve Değişim Politikası
            </a>

            <span>•</span>

            <span>NOCTIS © 2026</span>
          </div>
        </footer>
      </body>
    </html>
  );
}