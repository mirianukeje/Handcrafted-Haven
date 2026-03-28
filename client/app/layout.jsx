// app/layout.jsx
import "./globals.css";
import { Inter } from "next/font/google";

// Google Fonts
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Handcrafted Haven",
  description: "Discover unique handcrafted products",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#FFF8F0] text-[#333333]`}>
        {children}
      </body>
    </html>
  );
}