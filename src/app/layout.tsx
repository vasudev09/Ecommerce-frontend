import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { LocalCartProvider } from "@/context/CartContext";
import LoadingSpinner from "@/components/LoadingSpinner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EZYSHOP - Shop Your Favourite Brands",
  description:
    "EZYSHOP is an online e-commerce platform offering a convenient shopping experience for a wide range of products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <LocalCartProvider>
            {/* <LoadingSpinner> */} {/*SEO Problem*/}
            <Navbar />
            {children}
            <Footer />
            {/* </LoadingSpinner> */}
          </LocalCartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
