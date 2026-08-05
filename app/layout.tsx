import type { Metadata } from "next";
import { Poppins, Nunito, Pacifico } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Leiva Group — Property Management | South Bay, CA",
  description:
    "Full-service property management for the South Bay: Manhattan Beach, Torrance, Hermosa Beach, Redondo Beach, El Segundo, and Lawndale. Tenant screening, rent collection, maintenance, and 24/7 support.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} ${nunito.variable} ${pacifico.variable}`}>
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header />
        <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
